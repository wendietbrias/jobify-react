const authModel = require("../db/schema/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, `${process.env.SECRET}`, { expiresIn: "1d" });
}

const SignInHandler = async (req, res) => {
  const { email, password } = req.body;
  const checkAccount = await authModel.findOne({ email: { $eq: email } });

  if (!checkAccount) {
    return res.status(401).json({ msg: "Account is not exists" });
  }

  bcrypt.compare(password, checkAccount.password, (err, result) => {
    if (err) {
      return res.status(500).json({ msg: "Uppss something went wrong" });
    }

    if (!result) {
      return res.status(401).json({ msg: "Password is wrong" });
    }

    const token = generateToken({
      _id: checkAccount?._id,
      name: checkAccount?.name,
      email: checkAccount?.email,
    });

    return res.status(200).json(token);
  });
};

const SignUpHandler = async (req, res) => {
  const { email, password, name } = req.body;
  const checkAccount = await authModel.findOne({ email: { $eq: email } });

  if (checkAccount) {
    return res.status(401).json({ msg: "Account is exists" });
  }

  const setupUser = new authModel({
    name,
    email,
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(500).json({ msg: "Something went wrong" });
    }

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        return res.status(500).json({ msg: "Something went wrong" });
      }

      setupUser.password = hash;
      const saved = await setupUser.save();
      const token = generateToken({
        _id: setupUser?._id,
        name: setupUser?.name,
        email: setupUser?.email,
      });

      return res.status(200).json(token);
    });
  });
};

const UpdateProfile = async (req, res) => {
  const { name, email, location, lastName } = req.body;
  const checkAccount = await authModel.findOne({ email: email });

  if (!checkAccount) {
    return res.status(401).json({ msg: "Account is not found" });
  }

  checkAccount.name = checkAccount.name.concat(` ${lastName}`);
  checkAccount.location = location;
  checkAccount.email = email;

  try {
    const updated = await checkAccount.save();
    if (updated) {
      const token = generateToken({
        name,
        email,
        location,
        _id: checkAccount?._id,
      });

      return res.status(200).json(token);
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = { SignInHandler, SignUpHandler, UpdateProfile };

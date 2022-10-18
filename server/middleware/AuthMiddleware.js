const jwt = require("jsonwebtoken");
const authModel = require("../db/schema/auth");

const AuthMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  jwt.verify(token, `${process.env.SECRET}`, async (err, decoded) => {
    if (err) {
      return res.status(500).json({ msg: "uppss somethingg went wrong" });
    }

    const findAccount = await authModel.findById(decoded?._id);

    if (findAccount) {
      req.userId = decoded?._id;
      next();
    }
  });
};

module.exports = AuthMiddleware;

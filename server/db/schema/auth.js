const mongoose = require("mongoose");
const { Schema } = mongoose;

const authSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: true,
    min: [6, "Password min 6 length"],
  },
  location: {
    type: String,
  },
});

module.exports = mongoose.model("user", authSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userRoles = ["company", "candidate"];

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: userRoles,
    required: true,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});
const User = mongoose.model("user", UserSchema);

module.exports = User;

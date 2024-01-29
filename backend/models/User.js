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
});
const User = mongoose.model("user", UserSchema);

module.exports = User;

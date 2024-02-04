require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Candidate = require("../models/Candidate");
const Company = require("../models/Company");

const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, `process.env.JWT_KEY`);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please log in again" });
    }
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

router.get("/userinfo", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let userInfo;

    if (user.role === "candidate") {
      userInfo = await Candidate.findOne({ userId: user._id });
    } else if (user.role === "company") {
      userInfo = await Company.findOne({ userId: user._id });
    }

    if (!userInfo) {
      return res.status(404).json({ message: "User information not found" });
    }

    res.json({ userInfo, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

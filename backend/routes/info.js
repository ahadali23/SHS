require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Candidate = require("../models/Candidate");
const Company = require("../models/Company");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put(
  "/updateprofile",
  verifyToken,
  upload.single("picture"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const role = user.role;
      if (role !== "candidate" && role !== "company") {
        return res.status(400).json({ message: "Invalid user role" });
      }

      const { firstName, lastName, email, phone, city, country, address } =
        req.body;
      const picture = req.file;

      let updatedInfo = {
        firstName,
        lastName,
        email,
        phoneNumber: phone,
        city,
        country,
        address,
      };

      if (picture) {
        updatedInfo.picture = {
          data: picture.buffer,
          contentType: picture.mimetype,
        };
      }

      if (role === "candidate") {
        const up = await Candidate.findOneAndUpdate(
          { userId: user._id },
          updatedInfo
        );
        console.log(up);
      } else if (role === "company") {
        await Company.findOneAndUpdate({ userId: user._id }, updatedInfo);
      }

      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;

require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Candidate = require("../models/Candidate");
const Company = require("../models/Company");
const upload = require("../storage"); // Import multer config
const path = require("path");
const fs = require("fs");

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

    if (userInfo.picture) {
      const filePath = path.join(__dirname, "..", userInfo.picture);
      const fileData = fs.readFileSync(filePath);
      const base64Image = `data:image/png;base64,${fileData.toString(
        "base64"
      )}`;
      userInfo.picture = base64Image;
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
        updatedInfo.picture = path.join(
          "uploads",
          req.user.userId.toString(),
          picture.filename
        ); // Store the file path
      }

      if (role === "candidate") {
        await Candidate.findOneAndUpdate({ userId: user._id }, updatedInfo);
      } else if (role === "company") {
        await Company.findOneAndUpdate({ userId: user._id }, updatedInfo);
      }

      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.put("/updatesocials", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const role = user.role;
    if (role !== "candidate" && role !== "company") {
      return res.status(400).json({ message: "Invalid user role" });
    }

    const { github, linkedIn, whatsapp } = req.body;

    let updatedInfo = {
      github,
      linkedIn,
      whatsapp,
    };

    if (role === "candidate") {
      await Candidate.findOneAndUpdate({ userId: user._id }, updatedInfo);
    } else if (role === "company") {
      await Company.findOneAndUpdate({ userId: user._id }, updatedInfo);
    }

    res.status(200).json({ message: "Social links updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/updatebio", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const role = user.role;
    if (role !== "candidate" && role !== "company") {
      return res.status(400).json({ message: "Invalid user role" });
    }

    const { bio } = req.body;

    let updatedInfo = {
      bio: bio,
    };

    if (role === "candidate") {
      await Candidate.findOneAndUpdate({ userId: user._id }, updatedInfo);
    } else if (role === "company") {
      await Company.findOneAndUpdate({ userId: user._id }, updatedInfo);
    }

    res.status(200).json({ message: "Social links updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/changepassword", verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash the new password and update it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/files/:userId/:fileName", verifyToken, (req, res) => {
  const userId = req.params.userId;
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "..", "uploads", userId, fileName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "File not found" });
    }

    res.sendFile(filePath);
  });
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const Candidate = require("../models/Candidate");
const Company = require("../models/Company");
const nodemailer = require("nodemailer");

JWT_SECRET = "SHSSHSSHS";
const JWT_EXPIRATION = "1h";
EMAIL_USER = "smarthiringsystem7@gmail.com";
EMAIL_PASSWORD = "hhvl yjmy gbgw wlna";

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service
  auth: {
    user: EMAIL_USER, // Your email
    pass: EMAIL_PASSWORD, // Your email password
  },
});

router.post("/login", async (req, res) => {
  let success = false;
  try {
    const { username, password, rememberMe } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    let expiresIn = rememberMe ? 7 * 24 * 60 * 60 : "1d";

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      `process.env.JWT_KEY`,
      {
        expiresIn: "7d",
      }
    );
    success = true;
    res.json({
      message: "Login Successfully",
      token,
      success,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/candidatesignup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      city,
      country,
      role,
    } = req.body;

    const existingUser = await User.findOne({ username: email });

    if (existingUser) {
      return res.json({ message: "User Already Exists" });
    }

    const saltRounds = 15;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username: email,
      password: hashedPassword,
      role: role,
    });

    const savedUser = await user.save();

    const token = jwt.sign(
      {
        userId: savedUser._id,
        username: savedUser.username,
        role: savedUser.role,
      },
      `process.env.JWT_KEY`,
      {
        expiresIn: "7d",
      }
    );

    const candidate = new Candidate({
      firstName,
      lastName,
      email,
      phoneNumber,
      city,
      country,
      picture: undefined,
      userId: savedUser._id,
    });

    await candidate.save();

    res.json({
      message: "Signup Successfully",
      token,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/companysignup", async (req, res) => {
  try {
    const {
      companyName,
      hrName,
      email,
      password,
      address,
      city,
      country,
      role,
    } = req.body;

    const existingUser = await User.findOne({ username: email });

    if (existingUser) {
      return res.json({ message: "User Already Exists" });
    }

    const saltRounds = 15;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username: email,
      password: hashedPassword,
      role: role,
    });
    console.log(user);

    const savedUser = await user.save();

    const token = jwt.sign(
      {
        userId: savedUser._id,
        username: savedUser.username,
        role: savedUser.role,
      },
      `process.env.JWT_KEY`,
      {
        expiresIn: "7d",
      }
    );

    const company = new Company({
      companyName,
      hrName,
      email,
      address,
      city,
      country,
      userId: savedUser._id,
    });

    await company.save();

    res.json({
      message: "Signup Successfully",
      token,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { username } = req.body;
  console.log(username);
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    // Save the reset token and its expiration time in the database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send the reset token to the user's email address
    const resetUrl = `https://localhost:5173/reset-password/${resetToken}`;
    const mailOptions = {
      to: user.username, // Assuming username is the email
      from: EMAIL_USER,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${resetUrl}\n\n
      This link will expires in 1 hour.\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error handling forgot password request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid token or user not found" });
    }

    const saltRounds = 10;
    user.password = await bcrypt.hash(password, saltRounds);
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const Candidate = require("../models/Candidate");
const Company = require("../models/Company");
const nodemailer = require("nodemailer");

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
      picture: null,
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
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let userInfo;

    if (user.role === "candidate") {
      userInfo = await Candidate.findOne({ userId: user._id });
    } else if (user.role === "company") {
      userInfo = await Company.findOne({ userId: user._id });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ userId: user._id }, `process.env.JWT_KEY`, {
      expiresIn: "10m",
    });

    // Save the reset token and its expiration time in the database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send the reset token to the user's email address
    const resetUrl = `https://localhost:5173/reset-password/${resetToken}`;
    const mailOptions = {
      to: user.username,
      from: EMAIL_USER,
      subject: "Password Reset",
      html: `
        <p>Hi ${userInfo.firstName} ${userInfo.lastName},</p>
        <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on the following button to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #018a82; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>This link will expire in 10 min.</p>
        <p>If the button is not working, paste this URL into your browser to complete the process:</p>
        <p>${resetUrl}</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
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
    const decoded = jwt.verify(token, `process.env.JWT_KEY`);
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

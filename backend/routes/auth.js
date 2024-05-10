require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const Candidate = require("../models/Candidate");
const Company = require("../models/Company");

JWT_SECRET = "SHSSHSSHS";

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

module.exports = router;

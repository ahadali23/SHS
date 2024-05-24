const express = require("express");
const router = express.Router();
const JobPosting = require("../models/JobPosting");

router.get("/get", async (req, res) => {
  try {
    const jobPostings = await JobPosting.find();
    res.json(jobPostings);
  } catch (err) {
    console.error("Error fetching job postings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/get/:companyName", async (req, res) => {
  const { companyName } = req.params;
  try {
    const jobPostings = await JobPosting.find({ companyName });
    res.json(jobPostings);
  } catch (err) {
    console.error("Error fetching job postings:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// POST route to create a new job posting
router.post("/post", async (req, res) => {
  try {
    const {
      jobTitle,
      jobDescription,
      city,
      country,
      jobType,
      salary,
      skills,
      experience,
      education,
      companyName,
    } = req.body;

    const newJobPosting = new JobPosting({
      jobTitle,
      jobDescription,
      location: {
        city,
        country,
      },
      jobType,
      salary,
      skills,
      experience,
      education,
      companyName,
    });

    const savedJobPosting = await newJobPosting.save();
    res.status(201).json(savedJobPosting);
  } catch (err) {
    console.error("Error creating job posting:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

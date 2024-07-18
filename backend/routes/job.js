const express = require("express");
const router = express.Router();
const JobPosting = require("../models/JobPosting");
const ApplyJob = require("../models/ApplyJob");

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
    const jobPostingsWithCounts = await Promise.all(
      jobPostings.map(async (job) => {
        const applicantCount = await ApplyJob.countDocuments({
          jobID: job._id,
        });
        return { ...job.toObject(), applicantCount };
      })
    );
    res.json(jobPostingsWithCounts);
  } catch (err) {
    console.error("Error fetching job postings:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// POST route to create a new job posting
router.post("/post", async (req, res) => {
  try {
    const {
      companyName,
      jobTitle,
      position,
      jobIndustry,
      jobType,
      vacancy,
      experience,
      skills,
      postedDate,
      lastDateToApply,
      closeDate,
      gender,
      salaryFrom,
      salaryTo,
      city,
      state,
      country,
      educationLevel,
      description,
      status,
    } = req.body;

    const newJobPosting = new JobPosting({
      companyName,
      jobTitle,
      position,
      jobIndustry,
      jobType,
      vacancy,
      experience,
      skills,
      postedDate,
      lastDateToApply,
      closeDate,
      gender,
      salaryFrom,
      salaryTo,
      location: { city, state, country },
      educationLevel,
      description,
      status,
    });

    const savedJobPosting = await newJobPosting.save();
    res.status(201).json(savedJobPosting);
  } catch (err) {
    console.error("Error creating job posting:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

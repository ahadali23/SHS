require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { spawn } = require("child_process");
const ApplyJob = require("../models/ApplyJob");
const JobPost = require("../models/JobPosting");
const upload = require("../storage");
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

router.get("find/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("Fetch", userId)
  try {
    const applicant = await ApplyJob.find({ userID: userId });
    res.json(applicant);
  } catch (err) {
    console.error("Error fetching applicants:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/get/job/:jobId", async (req, res) => {
  const { jobId } = req.params;
  try {
    const applicants = await ApplyJob.find({ jobID: jobId });
    const updatedApplicants = await Promise.all(
      applicants.map(async (applicant) => {
        if (applicant.file) {
          const filePath = path.join(__dirname, "..", applicant.file);
          const fileData = fs.readFileSync(filePath);
          const base64PDF = `data:application/pdf;base64,${fileData.toString(
            "base64"
          )}`;
          applicant.file = base64PDF;
        }
        return applicant;
      })
    );
    res.json(updatedApplicants);
  } catch (err) {
    console.error("Error fetching applicants:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post(
  "/application",
  verifyToken,
  upload.single("file"),
  async (req, res) => {
    try {
      const { firstName, lastName, email, jobID, userID } = req.body;

      if (!firstName || !lastName || !email || !jobID || !userID) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const jobPost = await JobPost.findById(jobID);
      if (!jobPost) {
        return res.status(404).json({ error: "Job post not found" });
      }

      const relativeFilePath = path.join(
        "uploads",
        req.user.userId.toString(),
        req.file.filename
      );

      const jobApplication = new ApplyJob({
        firstName,
        lastName,
        email,
        jobID,
        userID,
        file: relativeFilePath,
        cvScore: null,
      });

      const savedApplication = await jobApplication.save();

      const analyzeCV = (filePath, jobDescription, applicationId) => {
        const pythonProcess = spawn(
          "python",
          ["ml/cvAnalysis.py", filePath, jobDescription],
          {
            stdio: ["pipe", "pipe", process.stderr],
          }
        );

        let result = "";
        pythonProcess.stdout.on("data", (data) => {
          result += data;
        });

        pythonProcess.on("close", async (code) => {
          if (code !== 0) {
            console.error(`Python process exited with code ${code}`);
            return;
          }

          try {
            const analysisResult = JSON.parse(result);
            const cvScore = Math.round(analysisResult.score * 100);

            await ApplyJob.findByIdAndUpdate(applicationId, {
              cvScore: cvScore,
            });

            console.log(`Application ${applicationId} updated with CV score`);
          } catch (parseError) {
            console.error("Error parsing Python script output:", parseError);
          }
        });
      };

      if (savedApplication.file) {
        const filePath = path.join(__dirname, "..", savedApplication.file);
        analyzeCV(filePath, jobPost.description, savedApplication._id);
      }

      res.json({ message: "Application received and being processed." });
    } catch (error) {
      console.error("Error processing application:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;

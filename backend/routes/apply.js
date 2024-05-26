const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { spawn } = require("child_process");
const ApplyJob = require("../models/ApplyJob");
const JobPost = require("../models/JobPosting");

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // Limit to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("file");

// Check file type
function checkFileType(file, cb) {
  const filetypes = /pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: PDFs Only!");
  }
}

router.get("/get", async (req, res) => {
  try {
    const Applicants = await ApplyJob.find();
    res.json(Applicants);
  } catch (err) {
    console.error("Error fetching  Applicants:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Endpoint to submit a job application
router.post("/application", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(400).json({ error: err });
    }

    try {
      const { firstName, lastName, email, jobID, userID } = req.body;

      // Validate request data
      if (!firstName || !lastName || !email || !jobID || !userID) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Fetch job requirements from the database
      const jobPost = await JobPost.findById(jobID);
      if (!jobPost) {
        return res.status(404).json({ error: "Job post not found" });
      }

      const pythonProcess = spawn("python", [
        "ml/cvAnalysis.py",
        req.file.path,
        jobPost.jobDescription,
      ]);

      let result = "";

      pythonProcess.stdout.on("data", (data) => {
        result += data;
      });

      pythonProcess.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      pythonProcess.on("close", async (code) => {
        if (code !== 0) {
          console.error(`Python process exited with code ${code}`);
          return res.status(500).json({ error: "Internal server error" });
        }

        try {
          const analysisResult = JSON.parse(result);

          // Save application data to MongoDB
          const jobApplication = new ApplyJob({
            firstName: firstName,
            lastName: lastName,
            email: email,
            jobID: jobID,
            userID: userID,
            file: req.file.path,
            cvScore: analysisResult.score,
          });

          await jobApplication.save();

          res.json(analysisResult);
        } catch (parseError) {
          console.error("Error parsing Python script output:", parseError);
          res.status(500).json({ error: "Internal server error" });
        }
      });
    } catch (error) {
      console.error("Error processing application:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
});

module.exports = router;

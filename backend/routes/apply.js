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

router.get("/get/:jobId", async (req, res) => {
  const { jobId } = req.params;
  try {
    const applicants = await ApplyJob.find({ jobID: jobId });
    res.json(applicants);
  } catch (err) {
    console.error("Error fetching Applicants:", err);
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

      // Save initial application data to MongoDB
      const jobApplication = new ApplyJob({
        firstName,
        lastName,
        email,
        jobID,
        userID,
        file: req.file.path,
        cvScore: null,
      });

      const savedApplication = await jobApplication.save();

      // Function to run the Python script and update the application
      const analyzeCV = (filePath, jobDescription, applicationId) => {
        const pythonProcess = spawn("python", [
          "ml/cvAnalysis.py",
          filePath,
          jobDescription,
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
            return;
          }

          try {
            const analysisResult = JSON.parse(result);
            // Convert the CV score and round it
            const cvScore = Math.round(analysisResult.score * 100);

            // Update the application data with the CV score
            await ApplyJob.findByIdAndUpdate(applicationId, {
              cvScore: cvScore,
            });

            console.log(`Application ${applicationId} updated with CV score`);
          } catch (parseError) {
            console.error("Error parsing Python script output:", parseError);
          }
        });
      };

      // Call the analyzeCV function
      analyzeCV(req.file.path, jobPost.jobDescription, savedApplication._id);

      res.json({ message: "Application received and being processed." });
    } catch (error) {
      console.error("Error processing application:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const ApplyJob = require("../models/ApplyJob");
const JobPost = require("../models/JobPosting");
const upload = require("../storage");
const { gfs } = require("../config/db");

router.post("/application", upload.single("file"), async (req, res) => {
  try {
    const { firstName, lastName, email, jobID, userID } = req.body;

    if (!firstName || !lastName || !email || !jobID || !userID) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const jobPost = await JobPost.findById(jobID);
    if (!jobPost) {
      return res.status(404).json({ error: "Job post not found" });
    }

    console.log("File uploaded:", req.file);

    const jobApplication = new ApplyJob({
      firstName,
      lastName,
      email,
      jobID,
      userID,
      file: req.file.id, // Store GridFS file ID
      cvScore: null,
    });

    const savedApplication = await jobApplication.save();

    const analyzeCV = (fileId, jobDescription, applicationId) => {
      const readstream = gfs.createReadStream({ _id: fileId, root: "uploads" });

      let result = "";

      const pythonProcess = spawn(
        "python",
        ["ml/cvAnalysis.py", jobDescription],
        {
          stdio: ["pipe", "pipe", process.stderr],
        }
      );

      readstream.pipe(pythonProcess.stdin);

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

    analyzeCV(req.file.id, jobPost.jobDescription, savedApplication._id);

    res.json({ message: "Application received and being processed." });
  } catch (error) {
    console.error("Error processing application:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

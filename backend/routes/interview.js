const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const ApplyJob = require("../models/ApplyJob");
const upload = require("../storage"); // Import multer config
const { spawn } = require("child_process");

const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, `process.env.JWT_KEY`); // Fix token verification
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

router.post(
  "/upload-video",
  verifyToken,
  upload.single("video"),
  async (req, res) => {
    const userId = req.user.userId.toString();
    const jobID = req.body.jobID;
    const filePath = req.file.path;

    const analyzeVideo = (filePath, applicationId) => {
      let result = "";

      const pythonProcess = spawn("python", ["ml/analyzeVideo.py", filePath], {
        stdio: ["pipe", "pipe", process.stderr],
      });

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

          await ApplyJob.findByIdAndUpdate(applicationId, {
            interviewScores: {
              score: analysisResult.interview_score,
              emotionAnalysis: analysisResult.emotion_analysis,
              gestureAnalysis: analysisResult.gesture_analysis,
              audioAnalysis: analysisResult.audio_analysis,
            },
          });

          console.log(
            `Application ${applicationId} updated with interview scores`
          );
        } catch (parseError) {
          console.error("Error parsing Python script output:", parseError);
        }
      });
    };

    try {
      // Log the userId and jobID to ensure they are correct
      console.log("UserID:", userId);
      console.log("JobID:", jobID);

      // Check if the job application exists
      const jobApplication = await ApplyJob.findOne({
        userID: userId,
      });
      console.log(jobApplication)

      if (!jobApplication) {
        return res.status(404).json({ message: "Job application not found" });
      }

      // Update the job application with the file path
      // await ApplyJob.findByIdAndUpdate(jobApplication._id, { file: filePath });

      analyzeVideo(filePath, jobApplication._id);

      res.json({ message: "Video uploaded and being analyzed." });
    } catch (error) {
      console.error("Error processing video upload:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;

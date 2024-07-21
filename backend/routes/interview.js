const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const ApplyJob = require("../models/ApplyJob");
const InterviewSchedule = require("../models/Interview");
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

router.get("/interview-schedules", async (req, res) => {
  try {
    const schedules = await InterviewSchedule.find();
    res.json(schedules);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching interview schedules", error });
  }
});

// Route to add a new interview schedule
router.post("/interview-schedules", async (req, res) => {
  const {
    interviewDate,
    interviewWindowStart,
    interviewWindowEnd,
    interviewDuration,
    job_id,
  } = req.body;

  const newSchedule = new InterviewSchedule({
    interviewDate,
    interviewWindowStart,
    interviewWindowEnd,
    interviewDuration,
    questions: [],
    job_id,
  });

  try {
    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    res.status(400).json({ message: "Error saving interview schedule", error });
  }
});

// Route to add a question to an interview schedule
router.post("/interview-schedules/:id/questions", async (req, res) => {
  const { id } = req.params;
  const { question } = req.body;

  try {
    const schedule = await InterviewSchedule.findOne({ job_id: id });

    if (!schedule) {
      return res.status(404).json({ message: "Interview schedule not found" });
    }

    schedule.questions.push(question);
    await schedule.save();

    res.json(schedule);
  } catch (error) {
    res.status(400).json({ message: "Error adding question", error });
  }
});

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
      console.log(jobApplication);

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

router.put(
  "/interview-schedules/:scheduleId/questions/:questionId",
  async (req, res) => {
    const { scheduleId, questionId } = req.params;
    const { question } = req.body;

    try {
      const schedule = await InterviewSchedule.findById(scheduleId);

      if (!schedule) {
        return res
          .status(404)
          .json({ message: "Interview schedule not found" });
      }

      const questionIndex = schedule.questions.findIndex(
        (q) => q._id.toString() === questionId
      );
      if (questionIndex === -1) {
        return res.status(404).json({ message: "Question not found" });
      }

      schedule.questions[questionIndex].text = question;
      await schedule.save();

      res.json(schedule);
    } catch (error) {
      res.status(400).json({ message: "Error updating question", error });
    }
  }
);

router.delete(
  "/interview-schedules/:scheduleId/questions/:questionId",
  async (req, res) => {
    const { scheduleId, questionId } = req.params;

    try {
      const schedule = await InterviewSchedule.findById(scheduleId);

      if (!schedule) {
        return res
          .status(404)
          .json({ message: "Interview schedule not found" });
      }

      schedule.questions = schedule.questions.filter(
        (q) => q._id.toString() !== questionId
      );
      await schedule.save();

      res.json(schedule);
    } catch (error) {
      res.status(400).json({ message: "Error deleting question", error });
    }
  }
);

module.exports = router;

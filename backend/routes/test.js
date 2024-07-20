const express = require("express");
const TestAdd = require("../models/Test");
const Question = require("../models/Questions");
const JobPosting = require("../models/JobPosting");
const router = express.Router();
const OpenAI = require("openai");

// const OPENAI_API_KEY = "";
const openai = new OpenAI({ apiKey: `process.env.OPENAI_API_KEY` });
const aiModel = "gpt-3.5-turbo";

router.get("/get", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST route to create a new test and generate questions
router.post("/add-test", async (req, res) => {
  try {
    const {
      testDate,
      testWindowStart,
      testWindowEnd,
      testDuration,
      testType,
      numberOfQuestions,
      job_id,
    } = req.body;

    // Check if job_id is present in the request
    if (!job_id) {
      return res.status(400).json({ message: "job_id is required" });
    }

    // Find the job posting by job_id
    const job = await JobPosting.findOne({ _id: job_id });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const test = new TestAdd({
      testDate,
      testWindowStart,
      testWindowEnd,
      testDuration,
      testType,
      numberOfQuestions,
      job_id,
    });

    await test.save();

    // Generate questions using OpenAI API
    const messageContent = `Generate ${numberOfQuestions} questions of ${testType} for the ${job.jobTitle}. Also provide answers separately. The response should be in the following format {"questions":[{"id":0,"questionType":"","question":"","options":[],"answer":""},...]}`;
    const messages = [
      {
        role: "system",
        content: messageContent,
      },
    ];

    const chatCompletion = await openai.chat.completions.create({
      model: aiModel,
      messages,
    });

    const aiResponse = chatCompletion.choices[0].message.content;
    const jsonResponse = JSON.parse(aiResponse);
    console.log(jsonResponse)

    if (jsonResponse.questions && jsonResponse.questions.length > 0) {
      const questionsData = jsonResponse.questions.map((q, index) => ({
        id: index,
        questionType: q.questionType,
        question: q.question,
        options: q.options || [],
        answer: q.answer,
      }));

      const newQuestion = new Question({
        test: test._id,
        questions: questionsData,
        job_id: job._id,
      });

      const savedQuestion = await newQuestion.save();

      return res.status(200).json({
        message: "Test added successfully.",
        questions: savedQuestion.questions,
      });
    }

    return res.status(500).json({ message: "Failed to generate questions" });
  } catch (err) {
    console.error("Error creating job posting:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

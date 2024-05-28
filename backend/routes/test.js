const express = require("express");
const OpenAI = require("openai");
const TestAdd = require("../models/Test");
const Question = require("../models/Questions");
const JobPosting = require("../models/JobPosting");
const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST route to create a new job posting
router.post("/add-questions", async (req, res) => {
  try {
    const {
      testDate,
      testWindowStart,
      testWindowEnd,
      testDuration,
      testType,
      numberOfQuestions,
      customQuestion,
      answer,
      job_id,
    } = req.body;

    // Log the incoming request body to debug
    console.log("Request body:", req.body);

    // Check if job_id is present in the request
    if (!job_id) {
      return res.status(400).json({ message: "job_id is required" });
    }

    // Find the job posting by job_id
    const job = await JobPosting.findOne({ _id: job_id });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Create a new test document
    const test = new TestAdd({
      testDate,
      testWindowStart,
      testWindowEnd,
      testDuration,
      testType,
      numberOfQuestions,
      customQuestion,
      answer,
      job_id,
    });

    // Save the test document
    await test.save();

    // const OPENAI_API_KEY =
    //   "";
    // const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

    // const aiModel = "gpt-3.5-turbo"; // Use a model you have access to

    // // Construct the message for the AI model
    // const messageContent = `Generate ${numberOfQuestions} questions of ${testType} for the ${job.jobTitle}. Also provide answers separately. The response should be in the following format {"questions":[{"id":0,"question":"","options":[],"answer":""},...]}`;
    // const messages = [
    //   {
    //     role: "system",
    //     content: messageContent,
    //   },
    // ];

    // // Generate the questions using OpenAI API
    // const chatCompletion = await openai.chat.completions.create({
    //   model: aiModel,
    //   messages,
    // });

    // const aiResponse = chatCompletion.choices[0].message.content;
    // const jsonResponse = JSON.parse(aiResponse);

    // console.log(jsonResponse);

    // if (jsonResponse.questions && jsonResponse.questions.length > 0) {
    //   // Save each generated question to the Question schema
    //   const savedQuestions = [];
    //   for (const q of jsonResponse.questions) {
    //     const newQuestion = new Question({
    //       test: test._id,
    //       question: q.question,
    //       options: q.options || [], // Add options, if not provided
    //       answer: q.answer,
    //       job_id: job_id, // Add job_id
    //     });
    //     const savedQuestion = await newQuestion.save();
    //     savedQuestions.push(savedQuestion);
    //   }
    //   res.status(200).json({
    //     message: "Test added successfully.",
    //     questions: savedQuestions,
    //   });
    // } else {
    //   // If questions cannot be generated, provide sample questions and save them

    // }
    const sampleQuestions = [
      {
        id: 0,
        question:
          "Which of the following is not a programming language commonly used in full-stack development?",
        options: ["Java", "Python", "HTML", "C#"],
        answer: "HTML",
      },
      {
        id: 1,
        question:
          "Which database type is often associated with full-stack development?",
        options: ["Relational", "NoSQL", "Both", "Neither"],
        answer: "Both",
      },
      {
        id: 2,
        question: "What does CSS stand for in web development?",
        options: [
          "Cascading Style Sheet",
          "Creative Style Sheet",
          "Computer Style Sheet",
          "Coded Style Sheet",
        ],
        answer: "Cascading Style Sheet",
      },
      {
        id: 3,
        question: "Which of the following is not a JavaScript framework?",
        options: ["React", "Vue.js", "Angular", "Hibernate"],
        answer: "Hibernate",
      },
      {
        id: 4,
        question:
          "Which protocol is commonly used for communication between a web server and a client?",
        options: ["HTTP", "FTP", "SSH", "SMTP"],
        answer: "HTTP",
      },
      {
        id: 5,
        question:
          "What is the purpose of RESTful API in full-stack development?",
        options: [
          "To handle server-side operations",
          "To manage databases",
          "To format web pages",
          "To enhance security",
        ],
        answer: "To handle server-side operations",
      },
      {
        id: 6,
        question: "What does MVC stand for in the context of web development?",
        options: [
          "Model View Controller",
          "Most Valuable Code",
          "Master Visual Components",
          "Multiple View Configuration",
        ],
        answer: "Model View Controller",
      },
      {
        id: 7,
        question: "Which of the following is not a version control system?",
        options: ["Git", "Mercurial", "SVN", "HTTP"],
        answer: "HTTP",
      },
      {
        id: 8,
        question: "What does API stand for in web development?",
        options: [
          "Application Programming Interface",
          "Advanced Programming Interaction",
          "Automated Process Integration",
          "All Purpose Interface",
        ],
        answer: "Application Programming Interface",
      },
      {
        id: 9,
        question: "Which of the following is a server-side scripting language?",
        options: ["HTML", "CSS", "JavaScript", "PHP"],
        answer: "PHP",
      },
    ];

    // Save each sample question to the Question schema
    const savedQuestions = [];
    for (const q of sampleQuestions) {
      const newQuestion = new Question({
        test: test._id,
        question: q.question,
        options: q.options || [], // Add options, if not provided
        answer: q.answer,
        job_id: job_id, // Add job_id
      });
      const savedQuestion = await newQuestion.save();
      savedQuestions.push(savedQuestion);
    }

    res.status(200).json({
      message: "Test added successfully.",
      questions: savedQuestions,
    });
  } catch (err) {
    console.error("Error creating job posting:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

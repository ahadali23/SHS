const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  questionType: {
    type: String,
    enum: ["multiple-choice", "true-false", "short-answer"], // Assuming these are the question types
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // Array of strings for options
    validate: {
      validator: function (v) {
        return this.questionType !== "short-answer" || v.length === 0;
      },
      message: "Options should be empty for short-answer type questions",
    },
  },
  answer: {
    type: String,
    required: true,
  },
});

const TestQuestionSchema = new Schema({
  test: {
    type: Schema.Types.ObjectId,
    ref: "Test",
  },
  questions: [QuestionSchema],
  job_id: {
    type: Schema.Types.ObjectId,
    ref: "JobPosting",
    required: true,
  },
});

const Question = mongoose.model("QuestionsAdded", TestQuestionSchema);

module.exports = Question;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestQuestionSchema = new Schema({
  test: {
    type: Schema.Types.ObjectId,
    ref: "Test",
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // Array of strings for options
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  job_id: {
    type: Schema.Types.ObjectId,
    ref: "JobPosting",
    required: true,
  },
});

const Question = mongoose.model("QuestionsAdded", TestQuestionSchema);

module.exports = Question;

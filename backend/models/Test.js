const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestSchema = new Schema({
  testDate: { type: Date, required: true },
  testWindowStart: { type: String, required: true },
  testWindowEnd: { type: String, required: true },
  testDuration: { type: Number, required: true },
  testType: { type: String, required: true },
  numberOfQuestions: { type: Number, required: true },
  customQuestion: { type: String },
  answer: { type: String },
  submittedAt: { type: Date, default: Date.now },
  job_id: { type: String, required: true },
});

const TestAdd = mongoose.model("Test", TestSchema);

module.exports = TestAdd;

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const interviewScheduleSchema = new mongoose.Schema({
  interviewDate: { type: Date, required: true },
  interviewWindowStart: { type: String, required: true },
  interviewWindowEnd: { type: String, required: true },
  interviewDuration: { type: Number, required: true },
  questions: [questionSchema],
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
});

const InterviewSchedule = mongoose.model(
  "InterviewSchedule",
  interviewScheduleSchema
);

module.exports = InterviewSchedule;

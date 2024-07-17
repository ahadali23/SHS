const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplySchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  file: String,
  cvScore: String,
  testScore: String,
  interviewScores: {
    score: { type: Number },
    emotionAnalysis: { type: Object },
    gestureAnalysis: { type: Number },
    audioAnalysis: { type: Number },
  },
  jobID: String,
  userID: String,
  date: { type: Date, default: Date.now },
});

const Cv = mongoose.model("ApplyJob", ApplySchema);

module.exports = Cv;

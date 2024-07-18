const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobPostingSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  position: String,
  jobIndustry: String,
  jobType: String,
  vacancy: Number,
  experience: String,
  skills: [String],
  postedDate: {
    type: Date,
    default: Date.now,
  },
  lastDateToApply: Date,
  closeDate: Date,
  gender: String,
  salaryFrom: Number,
  salaryTo: Number,
  location: { city: String, state: String, country: String },
  educationLevel: String,
  description: String,
  status: String,
});

const JobPost = mongoose.model("JobsPosted", JobPostingSchema);

module.exports = JobPost;

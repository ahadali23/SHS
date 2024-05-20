const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobPostingSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  location: {
    city: String,
    country: String,
  },
  jobType: String,
  salary: String,
  skills: [String],
  experience: String,
  education: String,
  // company: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Company",
  //   required: true,
  // },
});

const JobPost = mongoose.model("JobsPosted", JobPostingSchema);

module.exports = JobPost;

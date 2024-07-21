const mongoose = require("mongoose");
const { Schema } = mongoose;

const CandidateSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
  },
  picture: {
    type: String,
  },
  bio: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  whatsapp: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;

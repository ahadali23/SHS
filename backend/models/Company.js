const mongoose = require("mongoose");
const { Schema } = mongoose;

const CompanySchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  hrName: {
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
  picture: {
    type: String,
  },
  bio: {
    type: String,
  },
  github: {
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

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;

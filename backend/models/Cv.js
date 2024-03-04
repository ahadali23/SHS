const mongoose = require("mongoose");
const { Schema } = mongoose;

const CvSchema = new Schema({
  candidateId: {
    type: Schema.Types.ObjectId,
    ref: "Candidate",
  },
  fileName: String,
  file: {
    data: Buffer,
    contentType: String,
  },
});

const Cv = mongoose.model("Cv", CvSchema);

module.exports = Cv;

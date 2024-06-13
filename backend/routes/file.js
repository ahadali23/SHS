const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { gfs } = require("../config/db");

router.get("/file/:id", (req, res) => {
  gfs.files.findOne(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({ err: "No file exists" });
      }

      // Check if the file is an image or a PDF
      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png" ||
        file.contentType === "application/pdf"
      ) {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({ err: "Not an image or PDF" });
      }
    }
  );
});

module.exports = router;

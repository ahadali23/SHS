// Import required modules
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Cv = require("../models/Cv");
const Candidate = require("../models/Candidate");

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET route to fetch CV file by candidate ID
router.get("/get/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Find the CV document by candidateId
    const cv = await Cv.findOne({ candidateId: id });

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    // Send both the fileName and the file content as JSON response
    res.json({ fileName: cv.fileName, file: cv.file.data });
  } catch (error) {
    console.error("Error fetching CV:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST route to upload CV file
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { candidateId } = req.body;

    if (!candidateId) {
      return res.status(400).json({ message: "Candidate ID is required" });
    }

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const { originalname, mimetype, buffer } = req.file;

    let cv = await Cv.findOne({ candidateId });

    if (cv) {
      // If CV already exists, update it
      cv.fileName = originalname;
      cv.file.data = mimetype;
      cv.file.contentType = buffer;
    } else {
      const cv = new Cv({
        candidateId: candidate._id,
        fileName: originalname,
        file: {
          data: buffer,
          contentType: mimetype,
        },
      });
    }

    // const cv = new Cv({
    //   candidateId: candidate._id,
    //   fileName: originalname,
    //   file: {
    //     data: buffer,
    //     contentType: mimetype,
    //   },
    // });

    await cv.save();

    res.status(201).json({ message: "CV uploaded successfully", cv });
  } catch (error) {
    console.error("Error uploading CV:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update/:id", upload.single("file"), async (req, res) => {
  try {
    const id = req.params.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { originalname, mimetype, buffer } = req.file;

    // Find the CV document by candidateId
    let cv = await Cv.findOne({ candidateId: id });

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    // Update CV details
    cv.fileName = originalname;
    cv.file = {
      data: buffer,
      contentType: mimetype,
    };

    await cv.save();

    res.status(200).json({ message: "CV updated successfully", cv });
  } catch (error) {
    console.error("Error updating CV:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Export the router
module.exports = router;

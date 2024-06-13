const path = require("path");
const fs = require("fs");

const uploadFile = (req, res) => {
  try {
    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to upload file",
      error: error.message,
    });
  }
};

const getFile = (req, res) => {
  const userId = req.params.userId;
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "uploads", userId, fileName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "File not found" });
    }

    res.sendFile(filePath);
  });
};

module.exports = {
  uploadFile,
  getFile,
};

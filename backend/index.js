require('dotenv').config();
const express = require("express");
const connect = require("./config/db");
const { conn, gfs } = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const multer = require("multer");
const fs = require("fs");
const upload = require("./storage"); // Ensure this line is included

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/info"));
app.use("/files", require("./routes/file"));
app.use("/job", require("./routes/job"));
app.use("/test", require("./routes/test"));
app.use("/apply", require("./routes/apply"));

app.listen(port, () => {
  console.log(`SHS Backend Running on port ${port}`);
});

// const upload = multer({ dest: "uploads/" });

// const validCodes = ["1234", "5678"]; // Example valid codes

// app.post("/verify-code", (req, res) => {
//   const { code } = req.body;
//   if (validCodes.includes(code)) {
//     res.json({ success: true });
//   } else {
//     res.json({ success: false });
//   }
// });

// app.post("/upload-video", upload.single("video"), (req, res) => {
//   const videoPath = req.file.path;

//   // Call the Python script with the uploaded video file
//   const pythonProcess = spawn("python", ["ml/analyzeVideo.py", videoPath]);

//   let resultData = "";

//   pythonProcess.stdout.on("data", (data) => {
//     resultData += data.toString();
//   });

//   pythonProcess.stderr.on("data", (data) => {
//     console.error(`stderr: ${data}`);
//   });

//   pythonProcess.on("close", (code) => {
//     console.log(`child process exited with code ${code}`);
//     if (code === 0) {
//       const analysisResults = JSON.parse(resultData);
//       if (analysisResults.error) {
//         res.status(500).json({
//           message: "Error processing video",
//           error: analysisResults.error,
//         });
//       } else {
//         // Here you can store the results in your database
//         // For example, using a placeholder function saveResults(analysisResults)
//         saveResults(analysisResults)
//           .then(() => {
//             res.status(200).json({
//               message: "Video processed successfully",
//               results: analysisResults,
//             });
//           })
//           .catch((err) => {
//             res
//               .status(500)
//               .json({ message: "Error storing results", error: err });
//           });
//       }
//     } else {
//       res.status(500).json({ message: "Error processing video" });
//     }

//     // Clean up uploaded file
//     fs.unlink(videoPath, (err) => {
//       if (err) console.error(`Error deleting file: ${err}`);
//     });
//   });
// });

// const saveResults = async (results) => {
//   // Placeholder function to save results in a database
//   // Implement your database saving logic here
//   console.log("Saving results to the database:", results);
// };

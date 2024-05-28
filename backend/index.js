const express = require("express");
const connect = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const validCodes = ["1234", "5678"]; // Example valid codes

app.post("/verify-code", (req, res) => {
  const { code } = req.body;
  if (validCodes.includes(code)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/info"));
app.use("/file", require("./routes/file"));
app.use("/job", require("./routes/job"));
app.use("/test", require("./routes/test"));
app.use("/apply", require("./routes/apply"));

app.listen(port, () => {
  console.log(`SHS Backend Running on port ${port}`);
});

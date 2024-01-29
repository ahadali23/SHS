const express = require("express");
const connect = require("./config/db");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/info"));

app.listen(port, () => {
  console.log(`SHS Backend Running on port ${port}`);
});

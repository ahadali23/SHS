const mongoose = require("mongoose");

// const mongoURI = "mongodb://127.0.0.1:27017/SHS";
const mongoURI =
  "mongodb+srv://smarthiringsystem7:uL72aorgdO9kijkc@shsclus1.9mpdqua.mongodb.net/?retryWrites=true&w=majority&appName=shsClus1";

const connect = mongoose.connect(mongoURI);

connect
  .then(() => {
    console.log("Database Connected");
  })
  .catch(() => {
    console.log("Database Not Connected");
  });

module.exports = connect;

const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://127.0.0.1:27017/SHS");

connect
  .then(() => {
    console.log("Database Connected");
  })
  .catch(() => {
    console.log("Database Not Connected");
  });

module.exports = connect;

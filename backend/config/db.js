const mongoose = require("mongoose");

// const mongoURI = "mongodb://127.0.0.1:27017/SHS";

// const connect = mongoose.connect(mongoURI);
const connect = mongoose.connect(`process.env.MONGODB_URL`);

connect
  .then(() => {
    console.log("Database Connected");
  })
  .catch(() => {
    console.log("Database Not Connected");
  });

module.exports = connect;

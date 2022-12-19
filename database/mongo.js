require("dotenv").config();
const mongoose = require("mongoose");
module.exports = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGODB_URL);

  let db = mongoose.connection;

  db.on("error", () => {
    console.error("MongoDB connection error");
  });

  db.once("open", () => {
    console.log("MongoDB connection oppened");
  });

  db.once("close", () => {
    console.log("MongoDB connection closed");
  });
};

const express = require("express");
const app = express();

require("dotenv").config();

////////////////////////////////MongoDB////////////////////////
const mongoose = require("mongoose");
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
///////////////////////MongoDB/////////////////
const startServer = require("./controllers/startController");
const productsRoutes = require("./routes/productsRoutes");
app.use("/products", express.json(), productsRoutes);
app.listen(process.env.PORT, startServer(process.env.PORT));

const express = require("express");
const app = express();

require("dotenv").config();

const databaseConnection = require("./database/mongo");
databaseConnection();

const startServer = require("./controllers/startController");
const productsRoutes = require("./routes/productsRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
app.use("/products", express.json(), productsRoutes);
app.use("/category", express.json(), categoryRoutes);
app.listen(process.env.PORT, startServer(process.env.PORT));

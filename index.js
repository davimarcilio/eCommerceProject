const express = require("express");
const app = express();

require("dotenv").config();

const databaseConnection = require("./database/mongo");
databaseConnection();

const startServer = require("./controllers/startController");

const productsRoutes = require("./routes/productsRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const joinRoutes = require("./collectionsJoin/index");
const searchRoutes = require("./search/index");

app.use("/products", express.json(), productsRoutes);
app.use("/category", express.json(), categoryRoutes);
app.use("/user", express.json(), userRoutes);
app.use("/cart", express.json(), cartRoutes);
app.use("/join", express.json(), joinRoutes);
app.use("/search", express.json(), searchRoutes);
app.listen(process.env.PORT, startServer(process.env.PORT));

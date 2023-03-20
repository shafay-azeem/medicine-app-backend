const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();


app.use(express.json());

app.use(cors());

const product = require("./routes/ProductRoutes");
const user = require("./routes/UserRoutes");



app.use("/api/product/V1", product);

app.use("/api/user/V1", user);





module.exports = app;

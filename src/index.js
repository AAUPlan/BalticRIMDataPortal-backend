"use strict";
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth");
const dataRoute = require("./routes/data");
const pandataRoute = require("./routes/pandata");
const publicRoute = require("./routes/public");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/data", dataRoute);
app.use("/api/pandata", pandataRoute);

app.listen(3000, () => console.log("Server running at port 3000"));

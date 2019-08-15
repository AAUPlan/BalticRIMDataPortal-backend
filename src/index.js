"use strict";
const express = require("express");
const authRoute = require("./routes/auth");
const dataRoute = require("./routes/data");
const publicRoute = require("./routes/public");

const app = express();

app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/data", dataRoute);

app.listen(3000, () => console.log("Server running at port 3000"));

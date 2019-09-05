"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const authRoute = require("./routes/auth");
const dataRoute = require("./routes/data");
const pandataRoute = require("./routes/pandata");
const publicRoute = require("./routes/public");

const metadataRoute = require("./database/metadataqueries");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", authRoute);
app.use("/api/data", dataRoute);
app.use("/api/data", pandataRoute);

app.use("/api/metadata", metadataRoute );

app.listen(3000, () => console.log("Server running at port 3000"));

const express = require("express");

const { fileRouter } = require("./routes/file");

const app = express();

app.use("/v1", fileRouter);

module.exports = app;

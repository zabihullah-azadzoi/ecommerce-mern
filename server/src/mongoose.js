const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const databaseURL = process.env.DATABASE_URL;
console.log();
mongoose
  .connect(databaseURL, {})
  .then(() => {
    console.log("Database is connected.");
  })
  .catch(() => {
    console.log("Database couldn't connect!");
  });

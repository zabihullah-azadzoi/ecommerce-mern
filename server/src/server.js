const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

//requiring routers
const userRouter = require("./routes/userRoutes");

//starting the database
require("./mongoose");

const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

//routes
app.use(userRouter);

//starting the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("server is running on port: ", port);
});

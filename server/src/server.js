const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

//requiring routers
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const subRouter = require("./routes/subRoutes");
const productRouter = require("./routes/productRoutes");
const cloudinaryRouter = require("./routes/cloudinaryRoutes");
const cartRouter = require("./routes/cartRoutes");
const couponRouter = require("./routes/couponRoutes");
const stripeRouter = require("./routes/stripeRoutes");
const orderRouter = require("./routes/orderRoutes");
const wishlistRouter = require("./routes/wishlistRoutes");
const settingsRouter = require("./routes/settingsRoutes");

//starting the database
require("./mongoose");

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // one hour
  max: 200,
  message: "Too many requests from this IP address, please try again later!",
});

//global middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use("/api", limiter);
app.use(bodyParser.json({ limit: "4mb" }));
app.use(mongoSanitize());
app.use(xss()); // avoiding cross-side-scripting attacks
app.use(hpp()); //avoiding http parameter pollution (or duplicate query strings in url)
app.use(morgan("dev"));

//routes
app.use(userRouter);
app.use(categoryRouter);
app.use(subRouter);
app.use(productRouter);
app.use(cloudinaryRouter);
app.use(cartRouter);
app.use(couponRouter);
app.use(stripeRouter);
app.use(orderRouter);
app.use(wishlistRouter);
app.use(settingsRouter);

//handling none available end points
app.all("*", (req, res) => {
  res.status(404).json({
    message:
      "the end point you are looking for is not available on this server!",
  });
});

//starting the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("server is running on port: ", port);
});

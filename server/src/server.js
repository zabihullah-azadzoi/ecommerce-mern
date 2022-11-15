const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

//requiring routers
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const subRouter = require("./routes/subRoutes");
const productRouter = require("./routes/productRoutes");
const imagesUploadRouter = require("./routes/imagesUploadRoutes");
const cartRouter = require("./routes/cartRoutes");
const couponRouter = require("./routes/couponRoutes");
const stripeRouter = require("./routes/stripeRoutes");
const orderRouter = require("./routes/orderRoutes");
const wishlistRouter = require("./routes/wishlistRoutes");

//starting the database
require("./mongoose");

const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "4mb" }));
app.use(morgan("dev"));

//routes
app.use(userRouter);
app.use(categoryRouter);
app.use(subRouter);
app.use(productRouter);
app.use(imagesUploadRouter);
app.use(cartRouter);
app.use(couponRouter);
app.use(stripeRouter);
app.use(orderRouter);
app.use(wishlistRouter);

//starting the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("server is running on port: ", port);
});

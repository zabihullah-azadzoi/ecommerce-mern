const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { v4: uuidv4 } = require("uuid");

exports.createOrder = async (req, res) => {
  try {
    const { paymentIntent } = req.body;
    const user = await User.findOne({ email: req.user.email });
    const userCart = await Cart.findOne({ orderedBy: user._id });

    //if coupon applied calculating the payable amount
    let payable = 0;
    if (userCart.totalAfterDiscount && userCart.totalAfterDiscount > 0) {
      payable = userCart.totalAfterDiscount;
    } else {
      payable = userCart.cartTotal;
    }

    let paymentIntentObject = {};

    if (paymentIntent === null) {
      paymentIntentObject = {
        id: uuidv4(),
        amount: payable * 100,
        createdAt: new Date(),
        currency: "inr",
        payment_method_types: ["cash"],
        status: "cash on delivery",
      };
    } else {
      paymentIntentObject = paymentIntent;
    }

    const order = {
      products: userCart.products,
      paymentIntent: paymentIntentObject,
      orderedBy: user._id,
    };

    const createdOrder = await new Order(order).save();

    //decrement product quantity and increment sold
    const productsToBeUpdated = userCart.products.map((product) => {
      return {
        updateOne: {
          filter: { _id: product.product._id },
          update: { $inc: { quantity: -product.count, sold: +product.count } },
        },
      };
    });

    await Product.bulkWrite(productsToBeUpdated, {});

    res.json(createdOrder);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const orders = await Order.find({ orderedBy: user._id })
      .sort({ createdAt: -1 })
      .populate("products.product");

    res.json(orders);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

//admin routes controllers
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("products.product");
    res.json(orders);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: orderId },
      { orderStatus: req.body.orderStatus },
      { new: true }
    );
    if (!updatedOrder) res.json({ message: "Order not found!" });
    res.json(updatedOrder);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

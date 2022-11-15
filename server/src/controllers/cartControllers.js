const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const Coupon = require("../models/Coupon");

exports.createCart = async (req, res) => {
  try {
    const cart = req.body.cart;
    const user = await User.findOne({ email: req.user.email });

    //checking if user's cart already exist
    const existingUserCart = await Cart.findOne({ orderedBy: user._id });
    if (existingUserCart) await existingUserCart.remove();

    if (cart) {
      let products = [];
      for (let i = 0; i < cart.length; i++) {
        const productObject = {};
        const { price } = await Product.findById(cart[i]._id);

        productObject.product = cart[i]._id;
        productObject.count = cart[i].count;
        productObject.color = cart[i].color;
        productObject.price = price;

        products.push(productObject);
      }

      //calculating cart total
      const cartTotal = products.reduce((a, b) => {
        return a + b.price * b.count;
      }, 0);

      const response = await Cart({
        products,
        cartTotal,
        orderedBy: user._id,
      }).save();
      res.json("order saved to DB successfully");
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const cart = await Cart.findOne({ orderedBy: user._id }).populate({
      path: "products.product",
      select: ["_id", "title"],
    });
    res.json(cart);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const removedCart = await Cart.findOneAndRemove({ orderedBy: user._id });
    res.json(removedCart);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

exports.applyCoupon = async (req, res) => {
  try {
    const { coupon } = req.body;

    //verify coupon validity
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (!validCoupon) {
      return res.json({
        message: "Coupon is invalid or expired!",
      });
    }

    //apply coupon on cart total
    const user = await User.findOne({ email: req.user.email });
    const userCart = await Cart.findOne({ orderedBy: user._id });
    if (userCart) {
      const totalAfterDiscount =
        userCart.cartTotal - (userCart.cartTotal * validCoupon.discount) / 100;
      const updatedCart = await Cart.findOneAndUpdate(
        { orderedBy: user._id },
        { totalAfterDiscount },
        { new: true }
      );
      res.json(updatedCart);
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

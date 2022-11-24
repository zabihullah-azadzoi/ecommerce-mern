const stripe = require("stripe")(process.env.STRIPE_SECRET);
const User = require("../models/User");
const Cart = require("../models/Cart");

exports.createPaymentIntent = async (req, res) => {
  try {
    const { couponApplied } = req.body;

    const user = await User.findOne({ email: req.user.email });
    const userCart = await Cart.findOne({
      orderedBy: user._id,
    });

    if (!userCart) return;
    const { cartTotal, totalAfterDiscount } = userCart;

    //if coupon applied calculating the payable amount
    let payable = 0;
    if (couponApplied && totalAfterDiscount) {
      payable = totalAfterDiscount;
    } else {
      payable = cartTotal;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: payable * 100,
      currency: "inr",
    });

    const clientSecret = paymentIntent.client_secret;
    res.send({ clientSecret, cartTotal, payable });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

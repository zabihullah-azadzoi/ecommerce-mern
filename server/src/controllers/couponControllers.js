const { rawListeners } = require("../models/Coupon");
const Coupon = require("../models/Coupon");

exports.createCoupon = async (req, res) => {
  try {
    const { name, discount, expireDate } = req.body.coupon;
    const coupon = await new Coupon({ name, discount, expireDate }).save();
    res.json(coupon);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndRemove({
      _id: req.params.id,
    });
    res.json(deletedCoupon);
  } catch (e) {
    json.status(400).json({
      error: e.message,
    });
  }
};
exports.getAllCoupons = async (req, res) => {
  try {
    const allCoupons = await Coupon.find({}).exec();
    res.json(allCoupons);
  } catch (e) {
    json.status(400).json({
      error: e.message,
    });
  }
};

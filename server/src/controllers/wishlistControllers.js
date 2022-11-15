const { remove } = require("../models/User");
const User = require("../models/User");

exports.addToWishlist = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { email: req.user.email },
      { $addToSet: { wishlist: req.body.productId } }
    );

    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await User.findOne({ email: req.user.email })
      .select("wishlist")
      .populate("wishlist");

    res.json(wishlist);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const removedProduct = await User.findOneAndUpdate(
      { email: req.user.email },
      { $pull: { wishlist: req.params.id } }
    );
    if (!removedProduct) return res.json({ message: "Not found!" });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

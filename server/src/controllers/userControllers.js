const { findOneAndUpdate } = require("../models/User");
const User = require("../models/User");

exports.createOrUpdateUser = async (req, res) => {
  try {
    const { name, email, picture } = req.user;
    const user = await User.findOneAndUpdate(
      { email },
      { name, email, picture },
      { new: true }
    );
    if (user) {
      res.json({
        user,
      });
    } else {
      const newUser = await new User({ name, email, picture }).save();
      res.json({ user: newUser });
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      { address: req.body.address },
      { new: true }
    );
    res.json(updatedUser);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.currentUser = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });
    if (user) {
      res.json({
        user,
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

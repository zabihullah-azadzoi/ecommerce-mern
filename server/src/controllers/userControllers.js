const User = require("../models/User");

exports.createOrUpdateUser = async (req, res) => {
  try {
    if (req.body.userData) {
      const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { ...req.body.userData },
        { new: true, runValidators: true }
      );
      if (user) {
        res.json({
          user,
        });
        return;
      }
    }
    const { name, email } = req.user;
    const user = await User.findOneAndUpdate(
      { email },
      { name, email },
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

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.json(allUsers);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

exports.currentUser = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email }).select([
      "_id",
      "name",
      "email",
      "occupation",
      "phone",
      "birthDate",
      "image",
      "role",
      "company",
    ]);
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

const Settings = require("../models/Settings");
const User = require("../models/User");

exports.UpdateSettings = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const updatedSettings = await Settings.findOneAndUpdate(
      { manager: user._id },
      {
        ...req.body.settings,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (updatedSettings) {
      return res.json(this.updateSettings);
    }

    const newSettings = await new Settings({
      ...req.body.settings,
      manager: user._id,
    }).save();
    res.json(newSettings);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.find({}).select([
      "name",
      "description",
      "logo",
      "bannerPhotos",
    ]);
    if (!settings) {
      return res.status(404).json({ message: "no settings available" });
    }
    res.json(settings[0]);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

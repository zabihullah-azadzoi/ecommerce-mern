const mongoose = require("mongoose");

const settingsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: [5, "name is too short!"],
    maxLength: [48, "name is too long!"],
  },
  description: {
    type: String,
    minLength: [10, "description is too short!"],
    maxLength: [200, "description is too long!"],
  },
  logo: {
    type: {},
  },
  bannerPhotos: [{}],
  manager: { type: mongoose.ObjectId },
});

module.exports = mongoose.model("Settings", settingsSchema);

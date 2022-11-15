const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: [2, "length is too short!"],
      maxLength: [32, "length is too long!"],
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);

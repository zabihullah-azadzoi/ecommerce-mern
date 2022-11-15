const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;
const subSchema = new mongoose.Schema(
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
    parent: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sub", subSchema);

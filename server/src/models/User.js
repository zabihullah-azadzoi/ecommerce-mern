const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    company: {
      type: String,
      trim: true,
      maxLength: [16, "company name length can't exceed 16 characters!"],
    },
    birthDate: Date,
    occupation: {
      type: String,
      trim: true,
    },
    phone: {
      type: Number,
      maxlength: 10,
    },
    image: {},
    role: {
      type: String,
      default: "subscriber",
    },
    address: String,
    wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

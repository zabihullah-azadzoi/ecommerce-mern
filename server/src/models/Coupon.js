const mongoose = require("mongoose");

const couponSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      uppercase: true,
      unique: true,
      maxlength: [24, "name length is too long!"],
      minlength: [6, "name length is too short"],
    },
    discount: {
      type: Number,
      required: true,
    },
    expireDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);

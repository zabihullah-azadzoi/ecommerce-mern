const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 1000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 16,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      validate: [imagesValidate, "Only 4 images can be stored for a product!"],
    },

    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["Black", "White", "Red", "Silver", "Blue"],
    },
    brand: {
      type: String,
      enum: ["Apple", "Samsung", "Hp", "Dell", "Toshiba"],
    },
    ratings: [
      {
        star: Number,
        postedBy: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

//validating images array size
function imagesValidate(value) {
  return value.length <= 4;
}

//validating rating number to be smaller than 5

productSchema
  .path("ratings")
  .schema.path("star")
  .validate(function (value) {
    if (value <= 5) {
      return true;
    } else {
      return false;
    }
  }, "Rating number should be smaller or equal to 5");

module.exports = mongoose.model("Product", productSchema);

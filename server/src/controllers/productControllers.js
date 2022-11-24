const Product = require("../models/Product");
const User = require("../models/User");
const Sub = require("../models/Sub");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    const existed = await Product.findOne({ slug: slugify(req.body.title) });
    if (existed) throw new Error(`${existed.title} already exist!`);
    else {
      req.body.slug = slugify(req.body.title);
      const product = await new Product(req.body).save();
      res.json(product);
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  const limit = req.query.limit || {};
  const page = req.query.page || 1;
  const perPage = req.query.limit || 3;
  const sort = req.query.sort ? { [req.query.sort]: -1 } : { createdAt: -1 }; //exp --> sold or createdAt
  try {
    const products = await Product.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("category")
      .populate("subs")
      .sort(sort)
      .exec();
    res.json(products);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.getProductsCount = async (req, res) => {
  try {
    const totalProducts = await Product.estimatedDocumentCount();
    res.json(totalProducts);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category")
      .populate("subs")
      .exec();
    if (!product) {
      return res.status(404).json("Product is not available!");
    }
    {
      res.json(product);
    }
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndRemove({
      slug: req.params.slug,
    });
    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(400).json({
        message: "couldn't process at the moment, please try again later!",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if (req.body) {
      req.body.product.slug = slugify(req.body.product.title);
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body.product,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json("couldn't find the product");
    } else {
      res.json(updatedProduct);
    }
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

exports.ratingProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const rating = parseInt(req.body.rating);
    const user = await User.findOne({ email: req.user.email }).exec();
    const product = await Product.findById(productId).exec();

    if (!product) {
      return res.status(404).json("No Product found!");
    }

    //checking if user already left rating for this product
    const existingUserRating = product.ratings.find(
      (rating) => rating.postedBy.toString() === user._id.toString()
    );

    //if user rating doesn't exist, push the new rating to product rating array
    if (!existingUserRating) {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $push: { ratings: { star: rating, postedBy: user._id } },
        },
        { new: true, runValidators: true }
      );

      res.json(updatedProduct);
    }
    //if user already left rating, update his existing rating for product
    else {
      const updatedProduct = await Product.updateOne(
        { ratings: { $elemMatch: existingUserRating } },
        {
          $set: { "ratings.$.star": rating },
        },
        { new: true, runValidators: true }
      );
      res.json(updatedProduct);
    }
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

exports.getProductSubs = async (req, res) => {
  try {
    const subs = await Sub.find({ parent: req.params.id }).exec();
    res.json(subs);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

// filtering products
const filterHandler = async (req, res, query) => {
  try {
    const products = await Product.find(query)
      .populate("category")
      .populate("subs")
      .populate({
        path: "ratings",
        populate: {
          path: "postedBy",
          select: ["_id", "name"],
        },
      })
      .exec();

    res.json(products);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

// filtering based on rating
const ratingFilterHandler = async (req, res, rating) => {
  try {
    const aggregation = await Product.aggregate([
      { $project: { floorValue: { $floor: { $avg: "$ratings.star" } } } },
      { $match: { floorValue: rating } },
    ]);

    await filterHandler(req, res, { _id: aggregation });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.filterProducts = async (req, res) => {
  let query = "";
  try {
    const { text, price, categories, rating, sub, brand, color, shipping } =
      req.body.query;
    if (text) {
      query = { $text: { $search: text } };
      await filterHandler(req, res, query);
    }
    if (price) {
      query = {
        price: {
          $gte: price[0],
          $lte: price[1],
        },
      };
      await filterHandler(req, res, query);
    }
    if (categories) {
      query = { category: categories };
      await filterHandler(req, res, query);
    }
    if (rating) {
      ratingFilterHandler(req, res, rating);
    }
    if (sub) {
      query = { subs: sub };
      await filterHandler(req, res, query);
    }
    if (brand) {
      query = { brand };
      await filterHandler(req, res, query);
    }
    if (color) {
      query = { color };
      await filterHandler(req, res, query);
    }
    if (shipping) {
      query = { shipping };
      await filterHandler(req, res, query);
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

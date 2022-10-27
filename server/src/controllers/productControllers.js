const Product = require("../models/Product");
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
  try {
    const products = await Product.find({})
      .limit(parseInt(req.params.limit))
      .populate("category")
      .populate("subs")
      .sort({ createdAt: -1 })
      .exec();
    res.json(products);
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

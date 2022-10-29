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
  // console.log(req.query);
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

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).exec();
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
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json("coudn't find the product");
    } else {
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

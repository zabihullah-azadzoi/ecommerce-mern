const Category = require("../models/Category");
const slugify = require("slugify");

exports.getCategory = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOne({ slug });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: "couldn't found!" });
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }).exec();
    if (categories) {
      res.json(categories);
    } else {
      res.status(404).json({ message: "couldn't found any data!" });
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const existed = await Category.findOne({ slug: slugify(req.body.name) });
    if (existed) throw new Error(`${existed.name} already exist!`);
    else {
    }
    const category = await new Category({
      name: req.body.name,
      slug: slugify(req.body.name),
    }).save();
    res.json(category);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOneAndDelete({ slug });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: "couldn't found!" });
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOneAndUpdate(
      { slug },
      { name: req.body.name, slug: slugify(req.body.name) },
      { new: true }
    );
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: "couldn't found!" });
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

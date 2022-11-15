const Sub = require("../models/Sub");
const slugify = require("slugify");

exports.getSub = async (req, res) => {
  const { slug } = req.params;
  try {
    const sub = await Sub.findOne({ slug });
    if (sub) {
      res.json(sub);
    } else {
      res.status(404).json({ message: "couldn't found!" });
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.getAllSubs = async (req, res) => {
  try {
    const subs = await Sub.find().sort({ createdAt: -1 }).exec();
    if (subs) {
      res.json(subs);
    } else {
      res.status(404).json({ message: "couldn't found any data!" });
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.createSub = async (req, res) => {
  try {
    const existed = await Sub.findOne({ slug: slugify(req.body.name) });
    if (existed) throw new Error(`${existed.name} already exist!`);
    else {
    }
    const sub = await new Sub({
      name: req.body.name,
      parent: req.body.parent,
      slug: slugify(req.body.name),
    }).save();
    res.json(sub);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.deleteSub = async (req, res) => {
  const { slug } = req.params;
  try {
    const sub = await Sub.findOneAndDelete({ slug });
    if (sub) {
      res.json(sub);
    } else {
      res.status(404).json({ message: "couldn't found!" });
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

exports.updateSub = async (req, res) => {
  const { slug } = req.params;
  try {
    const sub = await Sub.findOneAndUpdate(
      { slug },
      {
        name: req.body.name,
        parent: req.body.parent,
        slug: slugify(req.body.name),
      },
      { new: true }
    );
    if (sub) {
      res.json(sub);
    } else {
      res.status(404).json({ message: "couldn't found!" });
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

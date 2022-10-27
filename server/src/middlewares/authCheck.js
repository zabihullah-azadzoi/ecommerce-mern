const admin = require("../firebase/index");
const User = require("../models/User");

exports.authCheck = async (req, res, next) => {
  try {
    console.log(req.headers.authtoken);
    const user = await admin.auth().verifyIdToken(req.headers.authtoken);
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({
      error: e.message,
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });
    if (user.role !== "admin") {
      res.status(403).json({
        message: "Admin resources, Access denied!",
      });
    } else {
      next();
    }
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
};

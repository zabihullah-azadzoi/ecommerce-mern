const admin = require("../firebase/index");

exports.authCheck = async (req, res, next) => {
  try {
    const user = await admin.auth().verifyIdToken(req.headers.authtoken);
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({
      err: "Invalid or expired Token!",
    });
  }
};

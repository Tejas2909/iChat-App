const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.auth;
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    try {
      const user = await User.findOne({ _id: verify._id });
      if (!user) {
        res.json({ status: 400, msg: "not yet registered" });
      } else {
        res.json({
          status: 200,
          msg: "authenticated",
          username: user.username,
          token: token,
        });
      }
    } catch (err) {
      res.json({ status: 500, msg: "something went wrong" });
    }
  } catch (err) {
    res.json({ status: 400, msg: "not logged in" });
  }
};
module.exports = Auth;

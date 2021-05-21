const jwt = require("jsonwebtoken");
const bycryptjs = require("bcryptjs");
const User = require("../models/Users");
const Login = async (req, res) => {
  try {
    const userExist = await User.findOne({ username: req.body.username });
    if (!userExist) {
      res.json({ status: 400, msg: "invalid credentials" });
    } else {
      const isMatch = await bycryptjs.compare(
        req.body.password,
        userExist.password
      );
      if (!isMatch) {
        res.json({ status: 400, msg: "invalid credentials" });
      } else {
        try {
          const token = jwt.sign(
            { _id: userExist._id },
            process.env.SECRET_KEY
          );
          res.cookie("auth", token, {
            expires: new Date(Date.now() + 9999),
          });
          res.json(userExist);
        } catch (err) {
          res.json({ status: 400, msg: "not logged in" });
        }
      }
    }
  } catch (err) {
    res.json({ status: 500, msg: "something went wrong" });
  }
};
module.exports = Login;

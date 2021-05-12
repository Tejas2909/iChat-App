const jwt = require("jsonwebtoken");
const bycryptjs = require("bcryptjs");
const User = require("../models/registerSchema");
const Login = async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });
  if (!userExist) {
    res.status(400).json({ msg: "invalid credentials" });
  } else {
    const isMatch = await bycryptjs.compare(
      req.body.password,
      userExist.password
    );
    if (!isMatch) {
      res.status(400).json({ msg: "invalid credentials" });
    } else {
      try {
        const token = jwt.sign({ _id: userExist._id }, process.env.SECRET_KEY);
        res.cookie("ecommerce-auth", token, {
          expires: new Date(Date.now() + 9999),
        });
        res.status(200).json(userExist);
      } catch (err) {
        res.status(400).json({ msg: "invalid credentials" });
      }
    }
  }
};
module.exports = Login;

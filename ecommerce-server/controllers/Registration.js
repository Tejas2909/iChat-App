const User = require("../models/registerSchema");
const Registeration = async (req, res) => {
  const user = new User(req.body);
  const userExist = await User.findOne({ email: req.body.email });

  if (!userExist) {
    user
      .save()
      .then(() => {
        res.status(200).json({ status: 200, msg: "success" });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, msg: "failure" });
      });
  } else {
    res.status(400).json({ status: 400, msg: "user alerady exists" });
  }
};
module.exports = Registeration;

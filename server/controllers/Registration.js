const User = require("../models/Users");
const Registeration = async (req, res) => {
  const user = new User(req.body);
  const userExist = await User.findOne({ username: req.body.username });

  if (!userExist) {
    user
      .save()
      .then(() => {
        res.json({ status: 200, msg: "success" });
      })
      .catch((err) => {
        res.json({ status: 500, msg: "failure" });
      });
  } else {
    res.json({ status: 400, msg: "user alerady exists" });
  }
};
module.exports = Registeration;

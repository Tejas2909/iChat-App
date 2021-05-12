const bycryptjs = require("bcryptjs");
const Hashing = async function (req, res, next) {
  this.password = await bycryptjs.hash(this.password, 12);
  next();
};
module.exports = Hashing;

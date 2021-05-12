const Logout = (req, res) => {
  res.clearCookie("ecommerce-auth");
  res.status(200).json({ msg: "logged out" });
};
module.exports = Logout;

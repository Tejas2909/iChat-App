const Logout = (req, res) => {
  res.clearCookie("auth");
  res.status(200).json({ msg: "logged out" });
};
module.exports = Logout;

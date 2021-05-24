const checkAuthentication = (req, res) => {
  res.json({
    status: 200,
    message: "authenticated",
    token: res.token,
    username: res.username,
  });
};
module.exports = checkAuthentication;

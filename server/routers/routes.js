const express = require("express");
router = express.Router();
const Registration = require("../controllers/Registration");
const Login = require("../controllers/Login");
const Logout = require("../controllers/Logout");
router.post("/register", Registration);
router.post("/login", Login);
router.post("/logout", Logout);
module.exports = router;

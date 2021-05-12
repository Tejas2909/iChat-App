const mongoose = require("mongoose");
const Hashing = require("../middlewares/Hashing");
const User = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  history: {
    type: Array,
    required: true,
    default: [],
  },
});
User.pre("save", Hashing);
module.exports = mongoose.model("User", User);

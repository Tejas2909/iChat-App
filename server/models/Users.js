const mongoose = require("mongoose");
const bycryptjs = require("bcryptjs");
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rooms: [
    {
      room: {
        type: String,
        required: true,
      },
    },
  ],
});
UserSchema.pre("save", async function (req, res, next) {
  this.password = await bycryptjs.hash(this.password, 12);
  next();
});
const User = mongoose.model("User", UserSchema);
module.exports = User;

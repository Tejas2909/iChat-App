const mongoose = require("mongoose");
const MessageSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;

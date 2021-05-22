const Message = require("../models/Messages");
const Chat = async (req, res) => {
  const messages = await Message.find();
  res.json({ status: 200, messages: messages });
};
module.exports = Chat;

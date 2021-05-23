const Message = require("../models/Messages");
const Chat = async (req, res) => {
  const messages = await Message.find();
  res.status(200).json({ status: 200, messages: messages });
};
module.exports = Chat;

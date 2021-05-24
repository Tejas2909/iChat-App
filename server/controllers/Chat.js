const Message = require("../models/Messages");
const Chat = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json({ status: 200, messages: messages });
  } catch (err) {
    res.json({ status: 250, msg: "error" });
  }
};
module.exports = Chat;

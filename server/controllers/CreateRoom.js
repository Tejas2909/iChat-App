const Room = require("../models/Rooms");
const CreateRoom = (req, res) => {
  console.log(req.body);
  res.json({ status: 200, msg: "room created" });
};
module.exports = CreateRoom;

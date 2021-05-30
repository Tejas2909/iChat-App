const Room = require("../models/Rooms");
const JoinRoom = (req, res) => {
  console.log(req.body);
  res.json({ status: 200, msg: "room joined" });
};
module.exports = JoinRoom;

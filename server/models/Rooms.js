const mongoose = require("mongoose");
const RoomSchema = mongoose.Schema({
  roomname: {
    type: String,
    required: true,
  },
  messages: [
    {
      message: {
        type: Object,
        required: true,
      },
    },
  ],
});
const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;

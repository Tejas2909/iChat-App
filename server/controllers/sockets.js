const socket = require("socket.io");
const Message = require("../models/Messages");
const sockets = (server) => {
  const io = socket(server);
  io.on("connection", (socket) => {
    socket.on("send-message", (msg) => {
      console.log(msg);
      if (msg.username !== null || msg !== undefined) {
        const message = Message(msg);
        message
          .save()
          .then(() => {
            socket.broadcast.emit("recieve-message", msg);
          })
          .catch((err) => {
            socket.broadcast.emit("recieve-error", {
              username: "error",
              message: "error",
            });
          });
      }
    });
  });
};
module.exports = sockets;

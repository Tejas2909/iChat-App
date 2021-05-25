const socket = require("socket.io");
const Message = require("../models/Messages");
let users = {};
const sockets = (server) => {
  const io = socket(server);
  io.on("connection", (socket) => {
    socket.on("user-joined", (name) => {
      users[socket.id] = name;
      socket.broadcast.emit("new-user-joined", name);
    });
    socket.on("send-message", (msg) => {
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
    socket.on("disconnect", () => {
      socket.broadcast.emit("user-left", users[socket.id]);
    });
  });
};
module.exports = sockets;

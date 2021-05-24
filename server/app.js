const express = require("express");
const dotenv = require("dotenv");
const socket = require("socket.io");
const cookieParser = require("cookie-parser");
const dbConnect = require("./db/connect");
const router = require("./routers/routes");
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();
app.use("/api", router);
const server = app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
const io = socket(server);
let users = {};
io.on("connection", (socket) => {
  socket.on("user-joined", (name) => {
    users[socket.id] = name;
    if (name !== null) {
      socket.broadcast.emit("new-user-joined", name);
    }
  });
  socket.on("send-message", (msg) => {
    if (msg.username !== null) {
      socket.broadcast.emit("recieve-message", msg);
    }
  });
  socket.on("disconnect", () => {
    if (users[socket.id] !== null) {
      socket.broadcast.emit("user-left", users[socket.id]);
    }
  });
});

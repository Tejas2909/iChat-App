const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const dbConnect = require("./db/connect");
const router = require("./routers/routes");
const sockets = require("./controllers/sockets");
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
sockets(server);

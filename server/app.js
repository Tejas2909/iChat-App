const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const dbConnect = require("./db/connect");
const router = require("./routers/routes");
const sockets = require("./controllers/sockets");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.use("/api", router);
const server = app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
sockets(server);

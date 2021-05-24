const mongoose = require("mongoose");
const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection Successful");
    })
    .catch((err) => {
      console.log("Unable to connect to database");
    });
};
module.exports = dbConnect;

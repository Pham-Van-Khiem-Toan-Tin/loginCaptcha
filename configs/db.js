const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  await mongoose
    .connect('mongodb://localhost:27017/class', {
      useNewUrlParser: true,
       useUnifiedTopology: true,
    })
    .then(() => {
      console.log("database connected successfully!");
    })
    .catch((err) => {
      console.log("Connect database fail \n" + err);
    });
};

module.exports = connect;

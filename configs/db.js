const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("database connected successfully!");
  } catch (error) {
    console.log("Connect database fail \n" + error);
  }
};
module.exports = connect;

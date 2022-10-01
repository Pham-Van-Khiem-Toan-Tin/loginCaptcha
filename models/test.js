const mongoose = require("mongoose");

const test = new mongoose.Schema({
    email: String,
})
const testModel = mongoose.model("tests", test);
module.exports = testModel
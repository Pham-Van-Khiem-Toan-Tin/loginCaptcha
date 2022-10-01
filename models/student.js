const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const studentSchema = new mongoose.Schema({
    id: {
        type: ObjectId,
        ref: "users"
    },
    class: {
        type: String,
        required: true,
    },
    score: {
        type: String,
        required: true,
        default: "0",
    },
    ranking: {
        type: String,
        required: true,
        default: "Iron"
    },
    achievements: String
});

const studentModel = mongoose.model("students", studentSchema);
module.exports = studentModel;

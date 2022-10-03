const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
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

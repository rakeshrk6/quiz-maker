const mongoose = require("mongoose")
const { Schema } = mongoose

// question model
const quizModel = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, default: "" },
  questions: { type: Array, default: [] },
  answers: { type: Array, default: [] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date().toLocaleString() },
})

module.exports = mongoose.model("Quiz", quizModel)

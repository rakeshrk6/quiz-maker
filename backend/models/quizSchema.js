const mongoose = require("mongoose")
const { Schema } = mongoose

// question model
const quizModel = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, default: "" },
  questions: { type: Array, default: [] },
  answers: { type: Array, default: [] },
  userId: { type: String, require: true, unique: true },
  createdAt: { type: Date, default: Date().toLocaleString() },
})

module.exports = mongoose.model("Quiz", quizModel)

const mongoose = require("mongoose")
const { Schema } = mongoose

// question model
const quizModel = new Schema({
  // id: { type: String, default: "" },
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, default: "" },
  questions: { type: Array, default: [] },
  answers: { type: Array, default: [] },
  time_limit: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date().toLocaleString() },
})

module.exports = mongoose.model("Question", quizModel)

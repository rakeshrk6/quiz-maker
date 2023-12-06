const mongoose = require("mongoose")
const { Schema } = mongoose

// result model
const resultModel = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  username: { type: String },
  optionSelected: { type: Array, default: [] },
  score: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("result", resultModel)

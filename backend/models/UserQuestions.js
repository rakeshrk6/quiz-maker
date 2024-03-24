const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  userId: { type: String, require: true, unique: true },
  Questions: { type: Array },
  Answers: { type: Array },
})

module.exports = mongoose.model("UserQuestions", userSchema)

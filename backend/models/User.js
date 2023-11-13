const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
})

module.exports = mongoose.model("user", userSchema)

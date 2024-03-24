const mongoose = require("mongoose")
const { ObjectId } = require("mongodb")
const { success, error } = require("../utils/responseWrapper")
const UserQuestions = require("../models/UserQuestions")

async function insertQuestion(req, res) {
  try {
    const userId = req.params.userId
    const { question, answer } = req.body

    let user = await UserQuestions.findOne({ userId })

    if (!user) {
      // If user does not exist, create a new one
      user = new UserQuestions({ userId, Questions: [], Answers: [] })
    }

    // Push the new question and answer
    user.Questions.push(question)
    user.Answers.push(answer)

    // Save the user
    const updatedUserQuestion = await user.save()
    console.log("res", updatedUserQuestion)

    if (!updatedUserQuestion) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(success(200, { updatedUserQuestion }))
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

async function getUserQuestions(req, res) {
  try {
    const userId = req.params.userId

    const response = await UserQuestions.findOne({ userId })

    if (!response) {
      return res.json(error(404, "User not found"))
    }
    const { Questions, Answers } = response
    res.json(success(200, { Questions, Answers }))
  } catch (error) {
    res.json(error)
  }
}

async function deleteQuestion(req, res) {
  try {
    const userId = req.params.userId
    const index = parseInt(req.query.param1)
    const userDoc = await UserQuestions.findOne({ userId: userId })

    if (!userDoc) {
      return res.status(404).json({ error: "User not found" })
    }

    const updatedQuestions = removeElementAtIndex(userDoc.Questions, index)
    const updatedAnswers = removeElementAtIndex(userDoc.Answers, index)

    const response = await UserQuestions.updateOne(
      { userId: userId },
      { $set: { Questions: updatedQuestions, Answers: updatedAnswers } }
    )

    res.json(success(200, { response }))
  } catch (e) {
    res.json(error(400, e.message))
  }
}

// Helper function to remove an element at a specific index from an array
function removeElementAtIndex(array, index) {
  return array.filter((_, i) => i !== index)
}

async function deleteAllQuestions(req, res) {
  try {
    const userId = req.params.userId

    const response = await UserQuestions.deleteOne({ userId })

    if (!response) {
      return res.status(404).json({ error: "User not found" })
    }
    res.json(success(200, response))
  } catch (e) {
    res.json(error(400, e.message))
  }
}

module.exports = {
  insertQuestion,
  getUserQuestions,
  deleteQuestion,
  deleteAllQuestions,
}

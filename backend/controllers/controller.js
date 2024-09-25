const Quizs = require("../models/quizSchema")
const Results = require("../models/resultSchema")
const mongoose = require("mongoose")
const { ObjectId } = require("mongodb")
const { success, error } = require("../utils/responseWrapper")
const UserQuestions = require("../models/UserQuestions")
// ObjectID = require("mongodb").ObjectID

// get all questions
async function getQuizs(req, res) {
  try {
    const q = await Quizs.find()
    res.json(q)
  } catch (error) {
    res.json({ error })
  }
}

// post all questions
async function insertQuiz(req, res) {
  try {
    const { quizName } = req.body
    const userId = req.params.userId
    const response = await UserQuestions.findOne({ userId })
    const { Questions, Answers } = response
    // console.log(response)
    const respond = await Quizs.insertMany({
      name: quizName,
      questions: Questions,
      answers: Answers,
      userId,
    })
    res.json(success(200, respond))
    console.log("data saved successfully")
  } catch (e) {
    res.json(error(400, e.message))
  }
}
async function insertQuizByGemini(req, res) {
  try {
    const { quiz_name, questions, answers } = req.body
    const userId = req.params.userId

    const respond = await Quizs.insertMany({
      name: quiz_name,
      questions: questions,
      answers: answers,
      userId,
    })
    res.json(success(200, respond))
    console.log("data saved successfully")
  } catch (e) {
    res.json(error(400, e.message))
  }
}

// delete a quiz
async function dropQuiz(req, res) {
  try {
    const id = req.params._id
    const _id = new ObjectId(id)
    const response = await Quizs.findByIdAndDelete(_id)
    console.log(response)
    res.json(success(200, { response }))
  } catch (error) {
    res.json({ error })
  }
}

// get all result
async function getResult(req, res) {
  try {
    const r = await Results.find()
    res.json(success(200, { r }))
  } catch (error) {
    res.json({ error })
  }
}

// post all result
async function postResult(req, res) {
  try {
    const { username, result, attempts, points, percentage } = req.body
    if (!username && !result) throw new Error("data not provided..!")

    await Results.create({ username, result, attempts, points, percentage })
    res.json(success(200, "result saved successfully"))
  } catch (error) {
    res.json({ error })
  }
}

// delete all result
async function dropResult(req, res) {
  res.json("result api delete request")
}

// get question for take quiz
async function getQuestions(req, res) {
  try {
    const quesId = req.params.id

    const id = new ObjectId(quesId)

    const quiz = await Quizs.findOne({ _id: id })
    if (!quiz) {
      return res.send(success(404, "Quiz not found"))
    }
    if (!res.headersSent) {
      // Send the response only if it hasn't been sent yet
      res.json(success(201, { quiz }))
    }
  } catch (e) {
    console.error(`Error in getQuestions: ${e}`)
    res.send(error(500, "Internal server error"))
  }
}

// get quizes of a user
async function getUserQuizes(req, res) {
  try {
    const userId = req.params.userId

    const quiz = await Quizs.find({ userId })
    if (!quiz) {
      return res.send(success(404, "Quiz not found"))
    }
    if (!res.headersSent) {
      // Send the response only if it hasn't been sent yet
      res.json(success(201, { quiz }))
    }
  } catch (e) {
    console.error(`Error in getQuiz: ${e}`)
    res.send(error(500, "Internal server error"))
  }
}

module.exports = {
  getQuizs,
  insertQuiz,
  dropQuiz,
  postResult,
  getResult,
  dropResult,
  getQuestions,
  getUserQuizes,
  insertQuizByGemini,
}

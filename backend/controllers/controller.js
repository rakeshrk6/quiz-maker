const Quizs = require("../models/quizSchema")
const Results = require("../models/resultSchema")
const mongoose = require("mongoose")
const { ObjectId } = require("mongodb")
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
    const { id, name, questions, answers, time_limit } = req.body
    await Quizs.insertMany({ id, name, questions, answers, time_limit })

    res.json("data saved successfully")
  } catch (error) {
    res.json({ error })
  }
}

// delete all questions
async function dropQuiz(req, res) {
  res.json("questions api delete request")
}

// get all result
async function getResult(req, res) {
  try {
    const r = await Results.find()
    res.json(r)
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
    res.json("result saved successfully")
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
      return res.status(404).json({ message: "Quiz not found" })
    }
    if (!res.headersSent) {
      // Send the response only if it hasn't been sent yet
      res.json(quiz)
    }
  } catch (error) {
    console.error(`Error in getQuestions: ${error}`)
    res.status(500).json({ message: "Internal server error" })
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
}

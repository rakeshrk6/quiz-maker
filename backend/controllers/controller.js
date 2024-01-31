const Quizs = require("../models/quizSchema")
const Results = require("../models/resultSchema")
const mongoose = require("mongoose")
const { ObjectId } = require("mongodb")
const { success, error } = require("../utils/responseWrapper")
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
    const { _id, name, questions, answers } = req.body

    await Quizs.insertMany({ _id, name, questions, answers })
    console.log("data saved successfully")
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

module.exports = {
  getQuizs,
  insertQuiz,
  dropQuiz,
  postResult,
  getResult,
  dropResult,
  getQuestions,
}

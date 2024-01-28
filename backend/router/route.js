const router = require("express").Router()
const {
  getQuizs,
  insertQuiz,
  dropQuiz,
  getResult,
  postResult,
  dropResult,
  getQuestions,
} = require("../controllers/controller")

const { chatgpt } = require("../controllers/openai")

//fetch questions for quiz routes API
router.route("/questions/:id").get(getQuestions)
// .post(insertQuestions)
// .delete(dropQuestions)

// fetch or create quizes for home page
router.route("/quiz").post(insertQuiz).delete(dropQuiz)
router.route("/").get(getQuizs)

// result routes API
router.route("/result").get(getResult).post(postResult).delete(dropResult)

// chatgpt api
router.route("/ai").post(chatgpt)

module.exports = router

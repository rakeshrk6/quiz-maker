const router = require("express").Router()
const {
  insertQuestion,
  getUserQuestions,
  deleteQuestion,
  deleteAllQuestions,
} = require("../controllers/addQuestion")
const {
  getQuizs,
  insertQuiz,
  dropQuiz,
  getResult,
  postResult,
  dropResult,
  getQuestions,
  getUserQuizes,
} = require("../controllers/controller")
const { gemini } = require("../controllers/gemini")

const { chatgpt } = require("../controllers/openai")

//fetch questions for quiz routes API
router.route("/questions/:id").get(getQuestions)

// fetch and update user quizes
router.route("/quizes/:userId").get(getUserQuizes)
router.route("/quiz/:_id").delete(dropQuiz)

// fetch and update user questions
router
  .route("/question/:userId")
  .post(insertQuestion)
  .get(getUserQuestions)
  .delete(deleteQuestion)

router.route("/deleteAll/:userId").delete(deleteAllQuestions)
// fetch or create quizes for home page
router.route("/quiz/:userId").post(insertQuiz)
router.route("/").get(getQuizs)

// result routes API
router.route("/result").get(getResult).post(postResult).delete(dropResult)

// chatgpt api
// router.route("/ai").post(chatgpt)

//gemini api
router.route("/ai").post(gemini)

module.exports = router

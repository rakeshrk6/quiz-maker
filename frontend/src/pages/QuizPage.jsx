import React, { useRef } from "react"
import AddQuestion from "../components/create quiz page/AddQuestion"
import QuestionCard from "../components/create quiz page/QuestionCard"
import { useDispatch, useSelector } from "react-redux"
import { deleteQuestions } from "../redux/slices/QuestionSlice"
import TextField from "@mui/material/TextField"
import { PublishQuiz } from "../hooks/setResult"
import toast from "react-hot-toast"

function QuizPage() {
  const { questions, answers } = useSelector((state) => state.question)
  const dispatch = useDispatch()

  const quiz_name = useRef("")

  function HandleSubmit() {
    const quizName = quiz_name.current.value

    if (quizName === "") {
      toast.error("Please Provide Quiz Name", {
        duration: 3000,
        style: {
          padding: "10px",
          background: "#333",
          color: "#fff",
        },
      })
      return
    }
    const quiz = {
      name: quizName,
      questions,
      answers,
    }

    // post the quiz to database
    PublishQuiz(quiz)
    toast.success("Quiz added", {
      duration: 4000,
      style: {
        padding: "10px",
        background: "#333",
        color: "#fff",
      },
    })
    //delete the redux temporary added questions
    dispatch(deleteQuestions())
  }

  return (
    <div className="mt-[70px]">
      <div>
        <QuestionCard />
      </div>
      <div>
        <AddQuestion />
      </div>
      <div className=" flex items-center justify-center gap-6 text-center m-10 max-w-md mx-auto">
        <div className="w-44">
          <TextField
            inputRef={quiz_name}
            fullWidth
            size="small"
            label="Quiz Name"
            variant="outlined"
          />
        </div>

        <button
          onClick={HandleSubmit}
          className="bg-[#1ba050] py-2 px-9 rounded-md text-white"
          type="button"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default QuizPage

import React, { useRef } from "react"
import AddQuestion from "../components/create quiz page/AddQuestion"
import QuestionCard from "../components/create quiz page/QuestionCard"
import { useDispatch, useSelector } from "react-redux"
import { deleteQuestions } from "../redux/slices/QuestionSlice"
import TextField from "@mui/material/TextField"
import { usePublishQuiz } from "../hooks/setResult"
import toast, { Toaster } from "react-hot-toast"

function QuizPage() {
  const { questions, answers } = useSelector((state) => state.question)
  const dispatch = useDispatch()

  const quiz_name = useRef(null)

  const HandleSubmit = () => {
    console.log("clicked")

    const quizName = quiz_name.current.value

    if (quizName === "") {
      alert("Please provide name")
    }

    const quiz = {
      name: quizName,
      questions,
      answers,
    }

    usePublishQuiz(quiz)
    toast.success("Quiz added", { duration: 4000 })
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
          type="submit"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default QuizPage

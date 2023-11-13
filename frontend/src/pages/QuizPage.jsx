import React, { useEffect, useRef } from "react"
import AddQuestion from "../components/create quiz page/AddQuestion"
import QuestionCard from "../components/create quiz page/QuestionCard"
import { useDispatch, useSelector } from "react-redux"
import { deleteQuestions } from "../redux/slices/QuestionSlice"
import TextField from "@mui/material/TextField"
import { usePublishQuiz } from "../hooks/setResult"
import { nanoid } from "@reduxjs/toolkit"
import Navbar from "../components/header/Navbar"

function QuizPage() {
  const { questions, answers } = useSelector((state) => state.question)
  const dispatch = useDispatch()
  const { quiz } = useSelector((state) => state)

  const quiz_name = useRef(null)
  const time_limit = useRef(null)

  const HandleSubmit = () => {
    console.log("clicked")

    const id = nanoid()
    const quizName = quiz_name.current.value
    const timeLimit = time_limit.current.value
    if (quizName === "" || timeLimit === 0) {
      alert("Please provide name and time")
    }

    const quiz = {
      id,
      name: quizName,
      time_limit: timeLimit,
      questions,
      answers,
    }

    usePublishQuiz(quiz)
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
      <div className=" grid grid-cols-3 gap-6 text-center m-10 max-w-md mx-auto">
        <TextField
          inputRef={quiz_name}
          fullWidth
          size="small"
          label="Quiz Name"
          variant="outlined"
        />
        <TextField
          inputRef={time_limit}
          fullWidth
          size="small"
          label="Time Limit (min)"
          variant="outlined"
        />
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

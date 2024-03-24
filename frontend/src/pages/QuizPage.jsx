import React, { useEffect, useRef, useState } from "react"
import AddQuestion from "../components/create quiz page/AddQuestion"
import QuestionCard from "../components/create quiz page/QuestionCard"
import { useDispatch, useSelector } from "react-redux"
import { deleteQuestions } from "../redux/slices/QuestionSlice"
import TextField from "@mui/material/TextField"
import { PublishQuiz } from "../hooks/setResult"
import toast from "react-hot-toast"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext"
import useUserQuestions from "../hooks/fetchUserQuestions"

function QuizPage() {
  // const { questions, answers } = useSelector((state) => state.question)
  const [isOpen, setOpen] = useState(false)
  const { questions, fetchData } = useUserQuestions()
  const { currentUser } = useAuth()
  const dispatch = useDispatch()

  const quiz_name = useRef("")

  async function HandleSubmit() {
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

    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/api/quiz/${currentUser.uid}`,
      { quizName }
    )

    if (res.data.statusCode !== 200) {
      console.log("quiz not saved")
      return
    }

    toast.success("Quiz added", {
      duration: 4000,
      style: {
        padding: "10px",
        background: "#333",
        color: "#fff",
      },
    })
    await fetchData()
  }

  const toggleComponent = () => {
    setOpen(!isOpen)
  }

  useEffect(() => {
    async function updateQuestions() {
      await fetchData()
    }
    updateQuestions()
    // console.log("ques", questions)
  }, [])

  return (
    <div className="mt-[70px]">
      <div className=" flex items-center justify-between gap-6 fixed mb-10 mt-24 sm:w-[50vw] w-[96vw] bg-slate-100 sm:py-5 py-4 -top-4 left-1/2 transform -translate-x-1/2 sm:px-8 px-2 rounded-md outline outline-1 outline-gray-300">
        <button
          onClick={toggleComponent}
          className="hidden sm:flex sm:p-3 p-1 sm:text-md text-xs sm:px-8 px-2 rounded-full hover:bg-blue-600 text-white bg-[#0071f2] "
        >
          Add Question
        </button>
        {/* for mobile */}
        <button
          onClick={toggleComponent}
          className="sm:hidden p-2 text-xs px-4 rounded-full hover:bg-blue-600 text-white bg-[#0071f2] "
        >
          Add Q.
        </button>
        <div className="flex items-center gap-5">
          <div className="sm:w-50 w-40 bg-white">
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
            className="bg-[#1ba050] sm:py-2 py-1 sm:px-9 px-3 text-sm rounded-md text-white"
            type="button"
          >
            Submit
          </button>
        </div>
      </div>

      {isOpen && <AddQuestion Open={isOpen} close={toggleComponent} />}

      <QuestionCard />
    </div>
  )
}

export default QuizPage

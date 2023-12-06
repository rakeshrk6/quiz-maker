import QuizQuestionCard from "../components/display quiz ques/QuizQuestionCard"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  moveNextAction,
  movePrevAction,
  reset,
} from "../redux/slices/QuestionReducer"
import { PushAnswer } from "../hooks/setResult"
import { Link, useNavigate } from "react-router-dom"

function DisplayQuiz() {
  const { queue, trace, answers } = useSelector(
    (state) => state.rootreducer.questions
  )
  const { result, userId } = useSelector((state) => state.rootreducer.result)
  // const userId = useSelector((state) => state.rootreducer.userId)
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(undefined)
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (trace < queue.length) {
  //     const intervalId = setInterval(() => {
  //       dispatch(moveNextAction())
  //     }, 2000)

  //     if (result.length <= trace) {
  //       dispatch(PushAnswer(checked))
  //     }
  //     return () => {
  //       clearInterval(intervalId)
  //     }
  //   }
  //   if (trace >= queue.length) {
  //     navigate("/result")
  //     dispatch(reset())
  //   }
  //   // setChecked(undefined)
  // }, [trace])

  // function onChecked(check) {
  //   setChecked(check)
  // }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-green-200 p-12">
      <div className="h-full w-full rounded-lg bg-[#F3FDE8] shadow-2xl flex flex-col justify-center items-center">
        {/* <div className="flex flex-col w-full h-full justify-center items-center"> */}
        <QuizQuestionCard />
        {/* </div> */}
      </div>
    </div>
  )
}

export default DisplayQuiz

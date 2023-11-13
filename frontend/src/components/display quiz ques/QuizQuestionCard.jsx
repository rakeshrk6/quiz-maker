import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { updateResult } from "../../hooks/setResult"
import { moveNextAction, reset } from "../../redux/slices/QuestionReducer"
import { useNavigate } from "react-router-dom"

function QuizQuestionCard() {
  const [checked, setChecked] = useState(undefined)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState("wrong")
  const { queue, trace, answers } = useSelector(
    (state) => state.rootreducer.questions
  )

  const { result } = useSelector((state) => state.rootreducer.result)
  const questions = queue[trace]
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(updateResult({ trace, checked }))
  }, [checked])

  useEffect(() => {
    if (trace < queue.length) {
      const intervalId = setTimeout(() => {
        moveNext()
        // setChecked(undefined)
      }, 5000)

      // if (result.length <= trace) {
      //   dispatch(PushAnswer(checked))
      // }
      return () => {
        clearInterval(intervalId)
      }
    }
    if (trace >= queue.length) {
      navigate("/result")
      dispatch(reset())
    }
  }, [trace])

  function moveNext() {
    setShowFeedback(true)

    setTimeout(() => {
      dispatch(moveNextAction())
      setShowFeedback(false)
      setFeedback("wrong")
      setChecked(undefined)
    }, 3000)
  }

  function onSelect(i) {
    const selectedOption = i

    setChecked(selectedOption)

    if (answers[trace] === selectedOption) {
      setFeedback("true")
    }
    // setChecked(undefined)
    setTimeout(() => {
      moveNext()
    }, 2000)

    // dispatch(updateResult({ trace, checked }))
  }

  return (
    <div className="h-full w-full px-5 pt-20">
      {!showFeedback ? (
        <div>
          <h2 className=" text-2xl font-medium text-center">
            {questions?.question}
          </h2>
          <ul key={questions?.id} className="flex flex-wrap mt-28">
            {questions?.options.map((opt, ind) => (
              <li key={ind} className="w-1/2 p-3">
                <div
                  className={`p-4 pl-8 ${
                    checked === ind + 1 ? "bg-[#29802d]" : "bg-blue-500"
                  } rounded-lg text-white font-medium text-lg cursor-pointer transition duration-200 ease-in-out`}
                  onClick={() => onSelect(ind + 1)}
                >
                  {opt}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>{feedback}</div>
      )}
    </div>
  )
}

export default QuizQuestionCard

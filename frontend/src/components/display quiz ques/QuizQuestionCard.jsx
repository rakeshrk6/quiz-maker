import React, { useEffect, useRef } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { moveNextAction } from "../../redux/slices/QuestionReducer"
import { useNavigate } from "react-router-dom"
import { addScore, updateResultAction } from "../../redux/slices/ResultReducer"

function QuizQuestionCard() {
  const [checked, setChecked] = useState(undefined)
  const [countdown, setCountdown] = useState(10)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState("Wrong")
  const intervalId = useRef(null)
  const timeoutId = useRef(null)
  const { queue, trace, answers } = useSelector(
    (state) => state.rootreducer.questions
  )

  const {
    result: { optionsSelected },
  } = useSelector((state) => state.rootreducer)

  const result = useSelector((state) => state.rootreducer.result)
  const questions = queue[trace]
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (trace < queue.length) {
      timeoutId.current = setTimeout(() => {
        if (checked === undefined) {
          clearTimeout(timeoutId.current)
          moveNext()
        }
        // console.log(trace)
        // console.log(optionsSelected)
      }, 10000)

      return () => {
        clearTimeout(timeoutId.current)
      }
    }

    if (trace >= queue.length) {
      navigate("/result")
    }
  }, [trace, navigate, checked])

  useEffect(() => {
    intervalId.current = setInterval(() => {
      if (!showFeedback) {
        setCountdown((prevCountdown) => prevCountdown - 1)
      } else {
        clearInterval(intervalId.current)
        setCountdown(10)
      }
    }, 1000)

    return () => {
      clearInterval(intervalId.current)
    }
  }, [showFeedback])

  function moveNext() {
    setShowFeedback(true)

    setTimeout(() => {
      setChecked(undefined)
      dispatch(moveNextAction())

      setShowFeedback(false)
      setFeedback("Wrong")
    }, 4000)
  }

  async function onSelect(i) {
    const selectedOption = i
    setChecked(selectedOption)
    dispatch(updateResultAction({ trace, selectedOption }))

    if (answers[trace] === selectedOption) {
      dispatch(addScore(100))
      setFeedback("Correct")
    }

    setTimeout(() => {
      moveNext()
    }, 1000)
  }

  return (
    <div className="lg:px-10 pt-8 lg:pt-10 flex items-center justify-between">
      {!showFeedback && (
        <div className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-lg outline outline-4 outline-green-700 font-bold rounded-full">
          {countdown}
        </div>
      )}
      {!showFeedback ? (
        <div>
          <h2 className="text-md lg:text-2xl font-medium text-center px-14">
            {questions?.question}
          </h2>
          <div className="pt-32 lg:pt-52">
            <ul key={questions?.id} className="flex flex-wrap">
              {questions?.options.map((opt, ind) => (
                <li key={ind} className="w-1/2 p-3">
                  <div
                    className={`lg:p-5 py-4 lg:pl-8 text-center ${
                      checked === ind + 1 ? "bg-[#29802d]" : "bg-blue-500"
                    } rounded-lg text-white font-medium text-sm lg:text-lg cursor-pointer transition duration-200 ease-in-out`}
                    onClick={() => onSelect(ind + 1)}
                  >
                    {opt}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div
          className={`md:mb-20 sm:mb-10 rounded-2xl text-center md:px-32 px-20 md:py-14 py-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${
            feedback === "Correct" ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {feedback === "Correct" ? (
            <div className=" text-green-700 text-6xl ">
              <i className="uis uis-check-circle"></i>
            </div>
          ) : (
            <div className=" text-red-700 text-6xl ">
              <i className="uis uis-times-circle"></i>
            </div>
          )}

          <div className="text-2xl pt-2 pb-5">{feedback}</div>

          <div className="text-[#151515] text-xl font-medium pb-3 pl-3 flex">
            Score
            {feedback === "Correct" && (
              <div className="text-green-700">
                <i className="uil uil-plus-circle mr-1 ml-2"></i>100
              </div>
            )}
          </div>
          <div className="text-3xl font-semibold">{result.score}</div>
        </div>
      )}
    </div>
  )
}

export default QuizQuestionCard

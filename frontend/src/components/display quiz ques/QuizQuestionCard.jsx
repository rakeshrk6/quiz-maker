import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { moveNextAction } from "../../redux/slices/QuestionReducer"
import { useNavigate } from "react-router-dom"
import { addScore, updateResultAction } from "../../redux/slices/ResultReducer"

function QuizQuestionCard() {
  const [checked, setChecked] = useState(undefined)

  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState("Wrong")
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
  let timeOutId

  useEffect(() => {
    if (trace < queue.length) {
      const timeOutId = setTimeout(() => {
        // console.log(trace)
        // console.log(optionsSelected)

        moveNext()
      }, 10000)

      return () => {
        clearTimeout(timeOutId)
      }
    }

    if (trace >= queue.length) {
      navigate("/result")
    }
  }, [trace, queue.length, navigate])

  function moveNext() {
    setShowFeedback(true)

    setTimeout(() => {
      setChecked(undefined)
      dispatch(moveNextAction())

      setShowFeedback(false)
      setFeedback("Wrong")
    }, 5000)
  }

  async function onSelect(i) {
    const selectedOption = i
    await setChecked(selectedOption)
    await dispatch(updateResultAction({ trace, selectedOption }))

    if (answers[trace] === selectedOption) {
      dispatch(addScore(100))
      setFeedback("Correct")
    }

    // setTimeout(() => {
    //   // clearInterval(timeOutId)
    //   moveNext()
    // }, 1000)
  }

  return (
    <div className="px-10 pt-10 flex items-center justify-between">
      {!showFeedback ? (
        <div>
          <h2 className=" text-2xl font-medium text-center px-14">
            {questions?.question}
          </h2>
          <div className=" pt-52">
            <ul key={questions?.id} className="flex flex-wrap">
              {questions?.options.map((opt, ind) => (
                <li key={ind} className="w-1/2 p-3">
                  <div
                    className={`p-5 pl-8 ${
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
        </div>
      ) : (
        <div
          className={`mb-20 rounded-2xl text-center px-32 py-14 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ${
            feedback === "Correct" ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {feedback === "Correct" ? (
            <div className=" text-green-700 text-6xl ">
              <i class="uis uis-check-circle"></i>
            </div>
          ) : (
            <div className=" text-red-700 text-6xl ">
              <i class="uis uis-times-circle"></i>
            </div>
          )}

          <div className="text-2xl pt-2 pb-5">{feedback}</div>

          <div className="text-[#151515] text-xl font-medium pb-3 pl-3 flex">
            Score
            {feedback === "Correct" && (
              <div className="text-green-700">
                <i class="uil uil-plus-circle mr-1 ml-2"></i>100
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

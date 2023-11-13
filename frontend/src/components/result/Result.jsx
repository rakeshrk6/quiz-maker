import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { countAttempts, countPoints } from "../helper/helper"
import { usePublishResult } from "../../hooks/setResult"
import { resetResult } from "../../redux/slices/ResultReducer"

function Result() {
  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state.rootreducer)

  const questions = useSelector((state) => state.rootreducer.questions)
  const totalPoints = queue.length * 2
  const attempts = countAttempts(result)
  const earnPoints = countPoints(result, answers, 2)
  const percentage = (earnPoints / totalPoints) * 100
  const dispatch = useDispatch()

  // store user result
  usePublishResult({
    result,
    username: userId,
    attempts,
    points: earnPoints,
    percentage,
  })

  useEffect(() => {
    console.log(questions)
    return () => {
      dispatch(resetResult())
    }
  }, [])

  return (
    <div>
      <div>
        <div className="flex flex-col outline max-w-md p-10 mx-auto mt-20">
          <div className="flex items-center justify-between">
            <span>UserName</span>
            <span>{userId}</span>
          </div>

          <div className="flex items-center justify-between">
            <span>Total Questions : </span>
            <span>{queue.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total Quiz Points : </span>
            <span>{totalPoints}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total Attempts : </span>
            <span>{attempts}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total Earn Points : </span>
            <span>{earnPoints}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Percentage(%) Score : </span>
            <span>{percentage}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result

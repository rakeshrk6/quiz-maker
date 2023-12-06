import React, { useEffect, useState } from "react"
import QuizItem from "./QuizItem"
import { useDispatch, useSelector } from "react-redux"
import { useFetchAllQuizs } from "../../hooks/FetchAllQuizs"
import { deleteOnUnmount } from "../../redux/slices/QuizSlice"
import QuizInstructions from "../QuizInstructions"

function Quizes() {
  const quiz = useSelector((state) => state.quiz)
  const open = useSelector((state) => state.instruction.open)
  const [getData, fetchQuiz] = useFetchAllQuizs()

  const dispatch = useDispatch()

  useEffect(() => {
    fetchQuiz()
    return () => {
      dispatch(deleteOnUnmount())
    }
  }, [])
  return (
    <div className="py-[5rem]" id="quizes">
      <div className="text-center text-[1.7rem] leading-7 font-semibold text-gray-800">
        Get started with these <span className=" text-amber-500">popular</span>{" "}
        online quizzes
      </div>
      <div className="flex justify-center max-w-5xl items-center mx-auto py-16">
        <div className="grid grid-cols-4 justify-center gap-10 w-full">
          {quiz.length > 0 ? (
            quiz.map((obj, ind) => <QuizItem items={obj} key={obj.id} />)
          ) : (
            <div>No quiz available</div>
          )}
        </div>
      </div>
      {open && <QuizInstructions />}
    </div>
  )
}

export default Quizes

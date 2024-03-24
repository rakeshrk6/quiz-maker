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
    <div className="sm:pt-[5rem] py-[2rem]" id="quizes">
      <div className="text-center text-xl sm:text-[1.7rem] leading-7 font-semibold text-gray-800">
        Get started with these <span className=" text-amber-500">popular</span>{" "}
        online quizzes
      </div>
      <div className="flex justify-center sm:max-w-5xl items-center mx-auto sm:py-16 py-9">
        <div className="grid sm:grid-cols-4 justify-center sm:gap-10 gap-5 w-full">
          {quiz.length > 0 ? (
            quiz.map((obj) => <QuizItem items={obj} key={obj.id} />)
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

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteItem } from "../../redux/slices/QuestionSlice"
import useUserQuestions from "../../hooks/fetchUserQuestions"
import { startExamAction } from "../../redux/slices/QuestionReducer"
import axios from "axios"
import { useAuth } from "../../contexts/AuthContext"

function QuestionCard() {
  const questions = useSelector((state) => state.question.questions)
  const { fetchData } = useUserQuestions()
  const { currentUser } = useAuth()

  async function deleteQuestion(ind) {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/question/${currentUser.uid}?param1=${ind}`
      )

      await fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteAll() {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/deleteAll/${currentUser.uid}`
      )
      console.log("res", res)
      await fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {questions.length > 0 ? (
        <div className="sm:py-24 py-32 sm:px-[8rem] bg-[#f2f2f2]">
          <button
            onClick={deleteAll}
            className="bg-red-400 sm:py-1 py-0.5 px-2 sm:px-3 sm:text-sm text-xs rounded-md absolute right-32 text-gray-100 sm:top-32 top-[11rem]"
          >
            Delete All
          </button>
          <div className="outline outline-1 outline-gray-300 sm:px-14 px-3 sm:py-3 bg-white rounded-md">
            {questions.map((obj, ind) => (
              <div
                key={ind}
                className="sm:py-6 py-3 border-b-[1.4px] border-solid border-gray-300"
              >
                <div className="flex items-center justify-between">
                  <h2 className=" pb-3 text-sm sm:text-lg">{`${ind + 1}. ${
                    obj.question
                  }`}</h2>
                  <div
                    className="sm:text-[1rem] text-[0.7rem] font-md text-gray-700 cursor-pointer"
                    onClick={() => deleteQuestion(ind)}
                  >
                    <i className="uil uil-minus-circle text-red-500 px-1 "></i>
                    Delete
                  </div>
                </div>

                <ul>
                  {obj.options.map((opt, ind) => (
                    <li key={ind} className="px-3 py-2 flex items-center">
                      <input
                        className="w-[1.1rem] h-[1.1rem] cursor-pointer"
                        type="radio"
                        name="options"
                        id={`option${ind + 1}`}
                      />
                      <label
                        className="px-3 sm:text-base text-xs text-gray-700"
                        htmlFor={`option${ind + 1}`}
                      >
                        {opt}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mt-80">No Questions found</div>
      )}
    </>
  )
}

export default QuestionCard

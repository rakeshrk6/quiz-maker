import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteItem } from "../../redux/slices/QuestionSlice"

function QuestionCard() {
  const { questions } = useSelector((state) => state.question)
  const dispatch = useDispatch()

  function deleteQuestion(ind) {
    dispatch(deleteItem(ind))
  }

  return (
    <>
      {questions.length > 0 ? (
        <div className="py-16 px-[8rem] bg-[#f2f2f2]">
          <div className="outline outline-1 outline-gray-300 px-14 py-8 bg-white rounded-md">
            {questions.map((obj, ind) => (
              <div
                key={ind}
                className="py-8 border-b-[1.4px] border-solid border-gray-300"
              >
                <div className="flex items-center justify-between">
                  <h2 className=" pb-3 text-lg">{`${ind + 1}. ${
                    obj.question
                  }`}</h2>
                  <div
                    className="text-[1rem] font-md text-gray-700 cursor-pointer"
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
                        className="px-3 text-base text-gray-700"
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
        <div></div>
      )}
    </>
  )
}

export default QuestionCard

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { countCorrect } from "../helper/helper"
import { usePublishResult } from "../../hooks/setResult"
import { resetResult } from "../../redux/slices/ResultReducer"
import { reset } from "../../redux/slices/QuestionReducer"

function Result() {
  const {
    questions: { queue, answers },
    result: { optionsSelected, userId, score },
  } = useSelector((state) => state.rootreducer)

  const correct = countCorrect(optionsSelected, answers)
  const percentage = ((correct / queue.length) * 100).toFixed(1)
  const dispatch = useDispatch()

  // // store user result
  // usePublishResult({
  //   optionsSelected,
  //   username: userId,
  //   score: score,
  //   percentage,
  // })

  useEffect(() => {
    console.log("attemps:", optionsSelected)
    console.log("answers:", answers)
    return () => {
      dispatch(resetResult())
      dispatch(reset())
    }
  }, [optionsSelected, answers, dispatch])

  return (
    <div className="flex pt-12 sm:pt-0 sm:items-center justify-center bg-gradient-to-r from-indigo-500 to-green-200 h-screen">
      <div className=" w-[38vh] h-[55vh] sm:h-[78vh] sm:w-[36%] rounded-xl bg-black bg-opacity-60 mt-[5rem]">
        <div className=" p-7 flex flex-col gap-5 text-sm">
          <div className="text-[#dbdbdb] text-center text-lg -mt-2">Result</div>
          <div className="  bg-[#151515] flex items-center text-white rounded-xl">
            <img
              className="  w-12 h-12 rounded-full my-3 ml-5 border-2 border-white"
              src="https://www.shutterstock.com/shutterstock/photos/2320286455/display_1500/stock-vector-young-man-anime-style-character-vector-illustration-design-face-young-man-anime-style-character-2320286455.jpg"
              alt="profile-pic"
            />

            <p className=" ml-5 text-base">{userId}</p>
          </div>

          <div className=" p-4 bg-[#151515] flex flex-col justify-center text-white rounded-xl">
            <span className=" text-xs">Accuracy</span>
            <div className="h-4 w-full rounded-xl flex items-center bg-red-500 mt-2 ">
              <div
                className="h-4 rounded-l-xl bg-green-500"
                style={{ width: `${percentage - 2}%` }}
              ></div>
              <div
                className=" font-semibold w-8 h-[1.4rem] bg-white text-[#343434] text-[11px] rounded-md -ml-3 flex items-center justify-center"
                style={{ left: `${percentage}px` }}
              >
                {percentage}%
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="px-5 p-3 bg-[#151515] flex flex-col justify-center text-white rounded-xl w-1/2">
              <span className=" text-xs">Rank </span>
              <span className=" text-base">0</span>
            </div>
            <div className=" px-5  bg-[#151515] flex flex-col justify-center text-white rounded-xl w-1/2">
              <span className=" text-xs">Score</span>
              <span className=" text-base">{score}</span>
            </div>
          </div>
          <div className="text-center text-white pt-9">Performance Stats</div>
          <div className="flex gap-3 text-xs">
            <div className="p-2 bg-[#151515] flex flex-col items-center justify-center text-white rounded-xl w-1/3">
              <span className=" mb-2 text-xl sm:text-2xl">{correct}</span>
              <span className="sm:text-base text-xs">Correct</span>
            </div>
            <div className="  bg-[#151515] flex flex-col items-center justify-center text-white rounded-xl w-1/3">
              <span className=" mb-2 text-xl sm:text-2xl">0</span>
              <span className="sm:text-base text-[0.6rem] text-center">
                Partially Correct
              </span>
            </div>

            <div className=" bg-[#151515] flex flex-col items-center justify-center text-white rounded-xl w-1/3">
              <span className=" mb-2 text-xl sm:text-2xl">
                {queue.length - correct}
              </span>
              <span className="sm:text-base text-xs">Incorrect</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result

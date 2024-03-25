import React from "react"
import { useNavigate } from "react-router-dom"

function GetStarted() {
  const navigate = useNavigate()
  return (
    <div
      className="bg-[#0f1048]  text-white flex items-center justify-center sm:p-20 py-10 px-6 text-center"
      id="get-started"
    >
      <div className="flex flex-col justify-between items-center gap-[1.3rem]">
        <h1 className=" sm:text-[2.25rem] text-lg leading-5 sm:leading-6 font-[400]">
          QuizCraft is a powerful online test generator
        </h1>
        <p className="text-xs sm:text-[1rem] font-[400]">
          Build your own online tests and assessments with QuizCraft for free
        </p>
        <button
          onClick={() => navigate("/create-quiz")}
          className="sm:p-3 p-1 sm:text-base text-sm sm:px-10 px-5 rounded-full hover:bg-transparent hover:outline hover:outline-1 text-white bg-[#0071f2] mt-6"
        >
          Get started for free
        </button>
      </div>
    </div>
  )
}

export default GetStarted

import React from "react"
import { useNavigate } from "react-router-dom"

function GetStarted() {
  const navigate = useNavigate()
  return (
    <div
      className="bg-[#0f1048]  text-white flex items-center justify-center p-20"
      id="get-started"
    >
      <div className="flex flex-col justify-between items-center gap-[1.3rem]">
        <h1 className=" text-[2.25rem] leading-5 font-[400]">
          QuizCraft is a powerful online test generator
        </h1>
        <p className=" text-[1rem] font-[400]">
          Build your own online tests and assessments with QuizCraft for free
        </p>
        <button
          onClick={() => navigate("/create-quiz")}
          className="p-3 text-md px-10 rounded-full hover:bg-transparent hover:outline hover:outline-1 text-white bg-[#0071f2] mt-6"
        >
          Get started for free
        </button>
      </div>
    </div>
  )
}

export default GetStarted

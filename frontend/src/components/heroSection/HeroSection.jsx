import React from "react"
import { Link } from "react-router-dom"

function HeroSection() {
  return (
    <div id="hero-section">
      <div className="bg-[#0f1048] h-[28.5rem] flex flex-col gap-9 items-center mt-[70px]">
        <div className="text-6xl font-semibold text-white mt-20">
          Free online <span className="text-amber-600">quiz maker</span>
        </div>
        <div className="text-xl text-white max-w-[52rem] text-center leading-9">
          Make a quiz with different question types to engage students in a
          classroom, train employees at work, or play trivia with friends.
        </div>
        <div className="mt-7">
          <Link to="/create-quiz">
            <button className="p-4 text-xl px-10 rounded-lg hover:bg-transparent hover:outline hover:outline-1 hover:text-white text-blue-950 bg-slate-50">
              Create a quiz
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center  py-16 bg-slate-100">
        <div className="text-3xl font-bold mb-9 text-gray-800">
          Make your own quiz with our{" "}
          <span className="text-sky-600">online quiz maker</span>
        </div>
        <div className="max-w-5xl text-xl text-center text-gray-700 leading-9  ">
          Quickly and easily create interactive online quizzes for free! With
          Quizizz, you can create a quiz that boosts engagement and
          participation with just a few clicks. Whether you’re looking to create
          a homework assignment for Math class, or an ice breaker to welcome new
          faces, there’s something here for everyone.
        </div>
      </div>
    </div>
  )
}

export default HeroSection

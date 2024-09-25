import React, { useState } from "react"
import CreatePage from "./CreatePage"

function Openai() {
  const [isOpen, setOpen] = useState(false)

  const toggleComponent = () => {
    setOpen(!isOpen)
  }

  return (
    <div>
      <div className="flex flex-col items-center py-14 sm:py-16 bg-slate-100">
        <div className="text-xl text-center px-5 sm:text-3xl font-bold mb-9 text-gray-800">
          Make your own quiz with our
          <span className="text-amber-500"> realtime</span> quiz maker using{" "}
          <span className="text-sky-600">Gemini</span>
        </div>
        <div className="max-w-5xl px-6 sm:text-xl text-center text-gray-700 sm:leading-9  ">
          A Gemini-powered online quiz maker streamlines quiz creation with
          advanced natural language processing, providing educators and
          organizations an intuitive and efficient tool to generate diverse and
          contextually relevant quiz questions.
        </div>
        <button
          onClick={toggleComponent}
          className="sm:p-4 p-2 sm:text-md text-sm sm:px-10 px-5 rounded-full hover:bg-blue-600 text-white bg-[#0071f2] sm:mt-12 mt-9 "
        >
          Create Quiz by AI
        </button>
      </div>
      {isOpen && <CreatePage Open={isOpen} close={toggleComponent} />}
    </div>
  )
}

export default Openai

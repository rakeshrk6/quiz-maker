import React, { useState } from "react"
import CreatePage from "./CreatePage"

function Openai() {
  const [isOpen, setOpen] = useState(false)

  const toggleComponent = () => {
    console.log("clicked")
    setOpen(!isOpen)
  }

  return (
    <div>
      <div className="flex flex-col items-center  py-16 bg-slate-100">
        <div className="text-3xl font-bold mb-9 text-gray-800">
          Make your own quiz with our
          <span className="text-amber-500"> realtime</span> quiz maker using{" "}
          <span className="text-sky-600">ChatGPT</span>
        </div>
        <div className="max-w-5xl text-xl text-center text-gray-700 leading-9  ">
          An OpenAI-powered online quiz maker streamlines quiz creation with
          advanced natural language processing, providing educators and
          organizations an intuitive and efficient tool to generate diverse and
          contextually relevant quiz questions.
        </div>
        <button
          onClick={toggleComponent}
          className="p-4 text-md px-10 rounded-full hover:bg-blue-600 text-white bg-[#0071f2] mt-12 "
        >
          Take Quiz by GPT
        </button>
      </div>
      {isOpen && <CreatePage Open={isOpen} close={toggleComponent} />}
    </div>
  )
}

export default Openai

import axios from "axios"
import React from "react"

const QuizCard = ({ item, Delete }) => {
  function handleDelete() {
    Delete(item)
  }

  function handleEdit() {}
  return (
    <div className="text-zinc-800 outline w-[18rem] outline-1 h-[12rem] outline-slate-300 rounded text-center">
      <p className="mt-8 text-lg font-medium">{item.name}</p>
      <p className=" text-base mt-3 ">{item.questions.length} Questions</p>
      <div className="flex justify-between mt-16 text-sm px-4">
        <p onClick={handleDelete} className="text-red-600 cursor-pointer">
          DELETE
        </p>
        <p onClick={handleEdit} className="text-green-700">
          EDIT
        </p>
      </div>
    </div>
  )
}

export default QuizCard

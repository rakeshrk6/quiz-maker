import React from "react"
import { useNavigate } from "react-router-dom"
import { useFetchQuestion } from "../../hooks/FetchQuestion"
import { useDispatch } from "react-redux"
import { setOpen } from "../../redux/slices/ShowInstruction"

function QuizItem({ items }) {
  const [fetchQuestionData] = useFetchQuestion()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleClick() {
    fetchQuestionData(items.id)
    dispatch(setOpen(true))
    // navigate("/instructions")
  }

  return (
    <div
      className="flex flex-col justify-center  items-center rounded-md w-60 hover:scale-105 transition duration-300 ease-in 
    shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
    >
      <div className="overflow-hidden rounded-t-lg">
        <img
          className=" "
          src="https://prod.smassets.net/assets/content/sm/related-content-template-grammar-quiz-use-cases-online-quiz.webp"
          alt=""
        />
      </div>

      <div className="text-xl font-semibold text-gray-800 pt-5 pb-3">
        {items.name}
      </div>

      <div className="py-5 pb-8">
        {/* <Link to="/instructions"> */}
        <button
          onClick={handleClick}
          className=" outline outline-1 py-[0.6rem] px-7 rounded-md font-[500] text-[14px] hover:bg-gray-100"
        >
          Take Quiz
        </button>
        {/* </Link> */}
      </div>
    </div>
  )
}

export default QuizItem

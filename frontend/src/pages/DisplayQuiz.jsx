import QuizQuestionCard from "../components/display quiz ques/QuizQuestionCard"

function DisplayQuiz() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-green-200 py-10 px-20">
      <div className="h-full w-full rounded-lg bg-[#F3FDE8] shadow-2xl flex flex-col justify-center items-center">
        {/* <div className="flex flex-col w-full h-full justify-center items-center"> */}
        <QuizQuestionCard />
        {/* </div> */}
      </div>
    </div>
  )
}

export default DisplayQuiz

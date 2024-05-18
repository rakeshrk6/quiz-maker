import { useEffect } from "react"
import QuizQuestionCard from "../components/display quiz ques/QuizQuestionCard"
import { useLocation } from "react-router-dom"

function DisplayQuiz() {
  const location = useLocation()

  useEffect(() => {
    const requestFullScreen = () => {
      const elem = document.documentElement
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen()
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen()
      }
    }

    const exitFullScreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen()
      }
    }

    if (location.pathname === "/quiz") {
      requestFullScreen()
    } else {
      exitFullScreen()
    }

    return () => {
      exitFullScreen()
    }
  }, [location.pathname])

  return (
    <div className=" flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-green-200 py-3 lg:py-10 lg:px-20 px-3">
      <div className=" relative h-full w-full rounded-lg bg-[#F3FDE8] shadow-2xl flex flex-col justify-center items-center">
        {/* <div className="flex flex-col w-full h-full justify-center items-center"> */}
        <QuizQuestionCard />
        {/* </div> */}
      </div>
    </div>
  )
}

export default DisplayQuiz

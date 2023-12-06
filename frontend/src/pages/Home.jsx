import React, { useEffect } from "react"
import HeroSection from "../components/heroSection/HeroSection"
import Quizes from "../components/display quizes/Quizes"
import GetStarted from "../components/GetStarted"
import Footer from "../components/footer/Footer"
import { resetResult } from "../redux/slices/ResultReducer"
import { useDispatch } from "react-redux"
import { reset } from "../redux/slices/QuestionReducer"

function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetResult())
    dispatch(reset())
  }, [])
  return (
    <div id="home">
      <HeroSection />
      <Quizes />
      <GetStarted />
      <Footer />
    </div>
  )
}

export default Home

import React from "react"
import HeroSection from "../components/heroSection/HeroSection"
import Quizes from "../components/display quizes/Quizes"
import GetStarted from "../components/GetStarted"
import Footer from "../components/footer/Footer"
import Openai from "../components/chatgpt/Openai"

function Home() {
  return (
    <div id="home">
      <HeroSection />
      <Openai />
      <Quizes />
      <GetStarted />
      <Footer />
    </div>
  )
}

export default Home

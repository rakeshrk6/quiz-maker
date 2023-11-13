import React, { useEffect } from "react"
import Navbar from "../components/header/Navbar"
import HeroSection from "../components/heroSection/HeroSection"
import Quizes from "../components/display quizes/Quizes"
import GetStarted from "../components/GetStarted"
import Footer from "../components/footer/Footer"
import { useSelector } from "react-redux"

function Home() {
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

import React from "react"
import { Link } from "react-scroll"
import GetStarted from "../GetStarted"

function Footer() {
  return (
    <div className="sm:p-16 p-5 sm:px-[7.5rem] px-8 sm:pb-2">
      <div className="hidden sm:grid grid-cols-[500px_repeat(3,1fr)] gap-6 font-medium text-sm text-gray-700">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg text-start font-semibold text-blue-950">
            QuizCraft
          </h1>
          <p className=" leading-7 text-md text-start">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis
            labore voluptatum dignissimos debitis odio vel perspiciatis
            voluptatem alias earum harum perspiciatis voluptatem alias earum
            harum.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-blue-950 font-extrabold border-l-4 border-solid border-[#0071f2] px-2 mb-2 py-0">
            Links
          </p>

          <Link to="home" smooth={true} duration={500}>
            Home
          </Link>
          <Link to="hero-section" smooth={true} duration={500}>
            Get started
          </Link>
          <Link to="" smooth={true} duration={500}>
            Services
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-blue-950 font-extrabold border-l-4 border-solid border-[#0071f2] px-2 mb-2">
            Others
          </h3>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <Link to="" smooth={true} duration={500}>
            Contact Us
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-blue-950 font-extrabold border-l-4 border-solid border-[#0071f2] px-2 mb-2">
            Social Handles
          </h3>
          <h3 className=" text-gray-900">Follow us on Social Media</h3>
          <div className=" flex items-center gap-2 text-2xl">
            <div className=" text-[#4267B2]">
              <i className="uil uil-facebook"></i>
            </div>
            <div className=" text-pink-700">
              <i className="uil uil-instagram"></i>
            </div>
            <div className=" text-[#00acee]">
              <i className="uil uil-twitter"></i>
            </div>
            <div className=" text-[#0072b1]">
              <i className="uil uil-linkedin"></i>
            </div>
          </div>
        </div>
      </div>

      {/* for mobile view */}
      <div className="sm:hidden flex flex-col items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-md text-center font-semibold text-blue-950">
            QuizCraft
          </h1>
          <p className=" leading-4 text-xs text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis
            labore voluptatum dignissimos debitis odio vel perspiciatis
            voluptatem alias earum harum perspiciatis voluptatem alias earum
            harum.
          </p>
        </div>
        <div className="flex flex-col mt-3">
          <h3 className=" text-gray-900 text-sm">Follow us on Social Media</h3>
          <div className=" flex items-center justify-center gap-2 text-lg">
            <div className=" text-[#4267B2]">
              <i className="uil uil-facebook"></i>
            </div>
            <div className=" text-pink-700">
              <i className="uil uil-instagram"></i>
            </div>
            <div className=" text-[#00acee]">
              <i className="uil uil-twitter"></i>
            </div>
            <div className=" text-[#0072b1]">
              <i className="uil uil-linkedin"></i>
            </div>
          </div>
        </div>
      </div>

      <div className=" text-center sm:mt-10 mt-5 sm:text-sm text-xs font-medium text-gray-700">
        <p>Copyright © {new Date().getFullYear()} QuizCraft Pty Ltd</p>
      </div>
    </div>
  )
}

export default Footer

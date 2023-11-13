import React, { useState, useEffect } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
} from "../../utils/localStorageManager"
import { axiosClient } from "../../utils/axiosClient"

function Navbar() {
  const accessToken = getItem(KEY_ACCESS_TOKEN)
  const [scrolled, setScrolled] = useState(false)
  const [isLogged, setLogged] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      setLogged(true)
    } else {
      setLogged(false)
    }
  })

  async function setLogOut() {
    try {
      await axiosClient.post("/auth/logout")
      removeItem(KEY_ACCESS_TOKEN)
      navigate("/login")
    } catch (e) {
      console.log(e)
    }
  }

  const location = useLocation()

  // Define an array of routes where the navigation bar should appear
  const showOnRoutes = ["/", "/create-quiz", "/login", "/signup", "/result"]

  // Conditionally render navigation links based on the current route
  const shouldShowNavigation = showOnRoutes.includes(location.pathname)

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 100) {
  //       setScrolled(true)
  //     } else {
  //       setScrolled(false)
  //     }
  //   }

  //   window.addEventListener("scroll", handleScroll)
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll)
  //   }
  // }, [])

  // window.addEventListener("scroll", function () {
  //   const header = this.document.querySelector(".fixed")
  //   if (this.scrollY >= 80) {
  //     header.classList.add("shadow-md")
  //   } else header.classList.remove("shadow-md")
  // })

  return (
    <div
      className={`bg-white fixed z-[200] top-0 w-full ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {shouldShowNavigation && (
        <nav className="flex items-center justify-between max-w-6xl h-[70px] mx-auto  ">
          <div>
            <NavLink to="/">
              <h1>LOGO</h1>
            </NavLink>
          </div>

          <div className="flex -mr-20">
            <NavLink to="/">
              <p className="mx-4">Home</p>
            </NavLink>
            <NavLink to="/about-us">
              <p className="mx-4">About Us</p>
            </NavLink>
            <NavLink to="/products">
              <p className="mx-4">Products</p>
            </NavLink>
            <NavLink to="/contact">
              <p className="mx-4">Contact Us</p>
            </NavLink>
          </div>

          <div>
            <NavLink to="/create-quiz">
              <button className="mx-2 bg-transparent outline outline-1 outline-black rounded-lg p-2 text-blue-900 px-5 font-medium hover:bg-gray-200 ">
                Create Quiz
              </button>
            </NavLink>

            {!isLogged ? (
              <>
                <NavLink to="/login">
                  <button className="mx-2 bg-green-600 rounded-lg p-2 text-white px-5">
                    Sign In
                  </button>
                </NavLink>
              </>
            ) : (
              <button
                onClick={setLogOut}
                className="mx-2 bg-green-600 rounded-lg p-2 text-white px-5"
              >
                Log Out
              </button>
            )}
          </div>
        </nav>
      )}
    </div>
  )
}

export default Navbar

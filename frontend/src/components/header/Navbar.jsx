import React, { useState, useEffect } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import LogoutDiv from "./LogoutDiv"

function Navbar() {
  const [logoutOpen, setLogoutOpen] = useState(false)
  const { currentUser } = useAuth()

  function handleLogoutDiv() {
    setLogoutOpen((prev) => !prev)
  }

  useEffect(() => {
    console.log(currentUser)
  }, [])

  const location = useLocation()
  useEffect(() => {
    function handleClickOutside(event) {
      if (logoutOpen && !event.target.closest(".logout-div")) {
        setLogoutOpen(false)
      }
    }

    document.body.addEventListener("click", handleClickOutside)

    return () => {
      document.body.removeEventListener("click", handleClickOutside)
    }
  }, [logoutOpen])

  useEffect(() => {
    setLogoutOpen(false)
  }, [location.pathname])

  // Define an array of routes where the navigation bar should appear
  const showOnRoutes = [
    "/",
    "/create-quiz",
    "/login",
    "/signup",
    "/result",
    "/profile",
  ]

  // Conditionally render navigation links based on the current route
  const shouldShowNavigation = showOnRoutes.includes(location.pathname)

  return (
    <div
      className={`bg-white fixed z-50 top-0 w-full shadow-md
      }`}
    >
      {shouldShowNavigation && (
        <nav className="flex items-center justify-between max-w-[26rem] sm:max-w-6xl h-[70px] mx-auto sm:px-0 px-5">
          <div className="text-xl font-semibold text-blue-950">
            <NavLink to="/">
              <h1>QuizCraft</h1>
            </NavLink>
          </div>

          <div className="hidden sm:flex">
            <div className="flex -mr-20">
              <NavLink to="/">
                <p
                  className={`mx-4 ${
                    location.pathname === "/"
                      ? "text-blue-950 font-semibold"
                      : ""
                  }`}
                >
                  Home
                </p>
              </NavLink>
              <NavLink to="/">
                <p className="mx-4">About Us</p>
              </NavLink>
              <NavLink to="/">
                <p className="mx-4">Products</p>
              </NavLink>
              <NavLink to="/">
                <p className="mx-4">Contact Us</p>
              </NavLink>
            </div>
          </div>
          <div className="hidden sm:flex gap-4 items-center">
            <NavLink to="/create-quiz">
              <button className="mx-2 bg-transparent outline outline-1 outline-black rounded-lg p-2 text-blue-900 px-5 font-medium hover:bg-gray-200 ">
                Create Quiz
              </button>
            </NavLink>

            {!currentUser ? (
              <>
                <NavLink to="/login">
                  <button className="mx-2 bg-green-600 hover:bg-green-700 rounded-lg p-2 text-white px-5">
                    Sign In
                  </button>
                </NavLink>
              </>
            ) : (
              <>
                <div
                  onClick={handleLogoutDiv}
                  className="logout-div cursor-pointer h-10 w-10 rounded-full  overflow-hidden"
                >
                  <img
                    src={
                      currentUser.photoURL != null
                        ? currentUser.photoURL
                        : "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
                    }
                    alt="profile-pic"
                  />
                </div>
              </>
            )}
            <LogoutDiv isOpen={logoutOpen} />
          </div>

          {/* mobile navigation */}
          <div className="sm:hidden flex gap-4 items-center justify-center">
            {!currentUser ? (
              <>
                <NavLink to="/login">
                  <button className="mx-2 text-sm bg-green-600 hover:bg-green-700 rounded-lg p-2 text-white px-5">
                    Sign In
                  </button>
                </NavLink>
              </>
            ) : (
              <>
                <div
                  onClick={handleLogoutDiv}
                  className="logout-div cursor-pointer h-10 w-10 rounded-full  overflow-hidden"
                >
                  <img
                    src={
                      currentUser.photoURL != null
                        ? currentUser.photoURL
                        : "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
                    }
                    alt="profile-pic"
                  />
                </div>
              </>
            )}
            <LogoutDiv isOpen={logoutOpen} />
          </div>
        </nav>
      )}
    </div>
  )
}

export default Navbar

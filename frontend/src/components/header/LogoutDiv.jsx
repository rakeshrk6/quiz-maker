import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const LogoutDiv = ({ isOpen }) => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  async function handleLogout() {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={`absolute right-7 bg-gray-200 top-[75px]  px-9 py-7 rounded-md shadow-md transition-all duration-1000 ease-in-out ${
        isOpen ? " " : " hidden"
      }`}
    >
      <Link to="/profile">
        <div className="mb-2 hover:text-blue-600">My Profile</div>
      </Link>

      <div
        className=" cursor-pointer hover:text-blue-600"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  )
}

export default LogoutDiv

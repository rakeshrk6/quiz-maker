import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../signup/signup.css"
import toast from "react-hot-toast"

import { useAuth } from "../../contexts/AuthContext"

function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [invalidMessage, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { signup, currentUser } = useAuth()

  const handleEmailChange = (event) => {
    const inputValue = event.target.value
    setEmail(inputValue)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setLoading(true)
      await signup(email, password)
      toast.success("You are Signed Up", {
        duration: 4000,
        style: {
          padding: "10px",
          background: "#333",
          color: "#fff",
        },
      })
      navigate("/profile")
    } catch (error) {
      console.log(error)
      setMessage("failed to sign up")
    }
    setLoading(false)
  }

  return (
    <div className="Signup mt-[20px] bg-gradient-to-r from-indigo-500 to-green-200 h-screen">
      <div className="signup-box rounded-lg bg-black bg-opacity-60">
        <h2 className="heading text-white text-xl font-medium mb-10">Signup</h2>
        <p className=" text-center text-red-400">{invalidMessage}</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="name bg-black bg-opacity-50"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={` bg-black bg-opacity-50  `}
            id="email"
            onChange={handleEmailChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password bg-black bg-opacity-50"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            disabled={loading}
            type="submit"
            value="Sign Up"
            className="submit cursor-pointer"
          />
        </form>
        <p className="subheading text-gray-400">
          Already have an account?{" "}
          <Link to="/login">
            <span className=" text-black underline">Log In</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup

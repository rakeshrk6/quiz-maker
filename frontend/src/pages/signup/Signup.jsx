import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { axiosClient } from "../../utils/axiosClient"
import "../signup/signup.css"

function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axiosClient.post("/auth/signup", {
        username,
        email,
        password,
      })
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="Signup mt-[20px] bg-gradient-to-r from-indigo-500 to-green-200 h-screen">
      <div className="signup-box rounded-lg bg-black bg-opacity-60">
        <h2 className="heading text-white text-xl font-medium mb-10">Signup</h2>
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
            className="email bg-black bg-opacity-50"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password bg-black bg-opacity-50"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" className="submit cursor-pointer" />
        </form>
        <p className="subheading text-gray-400">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup

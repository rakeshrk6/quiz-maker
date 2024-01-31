import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../login/login.css"
import { axiosClient } from "../../utils/axiosClient"
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await axiosClient.post("/auth/login", {
        email,
        password,
      })
      setItem(KEY_ACCESS_TOKEN, res.result.accessToken)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="Login mt-[10px] bg-gradient-to-r from-indigo-500 to-green-200 h-screen">
      <div className="rounded-lg login-box bg-black bg-opacity-60">
        <h2 className="heading text-white text-xl font-medium mb-10">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email ">Email</label>
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
          Do not have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login

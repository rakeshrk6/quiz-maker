import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../login/login.css"
import { axiosClient } from "../../utils/axiosClient"
import {
  KEY_ACCESS_TOKEN,
  getItem,
  setItem,
} from "../../utils/localStorageManager"
import Navbar from "../../components/header/Navbar"

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
      console.log("login response", res)
      setItem(KEY_ACCESS_TOKEN, res.result.accessToken)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="Login mt-[10px]">
      <div className="login-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" className="submit" />
        </form>
        <p className="subheading">
          Do not have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login

import React, { useState } from "react"
import { Link } from "react-router-dom"
import "../pages/login/login.css"
import toast from "react-hot-toast"
import { useAuth } from "../contexts/AuthContext"

function ForgetPassword() {
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { resetPassword } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setMessage("")
      setErrorMessage("")
      setLoading(true)
      await resetPassword(email)
      setMessage("Check your inbox for further instructions")
    } catch (error) {
      setErrorMessage("Failed to reset Password")
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <div className="Login mt-[10px] bg-gradient-to-r from-indigo-500 to-green-200 h-screen">
      <div className="rounded-lg login-box bg-black bg-opacity-60">
        <h2 className="heading text-white text-xl font-medium mb-10">
          Password Reset
        </h2>
        <p className=" text-center text-red-400">{errorMessage}</p>
        <p className=" text-center mb-7 text-sm text-green-400">{message}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email ">Email</label>
          <input
            type="email"
            className="email bg-black bg-opacity-50"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            disabled={loading}
            value="Reset Password"
            type="submit"
            className="submit cursor-pointer"
          />
        </form>

        <div className="mt-4 underline text-md text-center">
          <Link to="/login">Login</Link>
        </div>
        <p className="mt-4 text-gray-400 text-center">
          Do not have an account?{" "}
          <Link to="/signup">
            <span className=" text-black underline">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgetPassword

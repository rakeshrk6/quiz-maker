import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../login/login.css"
import toast from "react-hot-toast"
import { useAuth } from "../../contexts/AuthContext"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState()
  const navigate = useNavigate()
  const { login, currentUser, SigninWithGoogle } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setErrorMessage("")
      setLoading(true)
      await login(email, password)
      toast.success("Logged In", {
        duration: 3000,
        style: {
          padding: "10px",
          background: "#333",
          color: "#fff",
        },
      })
      navigate("/profile")
    } catch (error) {
      console.log(error)
      setErrorMessage("Failed to log in")
    }
    setLoading(false)
  }

  async function onGoogleSignin(e) {
    e.preventDefault()
    try {
      setLoading(true)
      await SigninWithGoogle()
      toast.success("Logged In", {
        duration: 3000,
        style: {
          padding: "10px",
          background: "#333",
          color: "#fff",
        },
      })
      navigate("/profile")
    } catch (error) {
      setErrorMessage("Failed to log in")
    }
  }

  return (
    <div className="Login mt-[35px] bg-gradient-to-r from-indigo-500 to-green-200 h-screen">
      <div className="rounded-lg login-box bg-black bg-opacity-60">
        <h2 className="heading text-white text-xl font-medium mb-10">Login</h2>
        <p className=" text-center text-red-400">{errorMessage}</p>
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

          <input
            disabled={loading}
            type="submit"
            value="Log In"
            className="submit cursor-pointer"
          />
        </form>

        <h2 className="text-center text-gray-200 mt-4">OR</h2>
        <div className="flex justify-center">
          <button
            onClick={onGoogleSignin}
            className="px-5 mt-4 justify-center py-2 border flex gap-2 bg-gray-200 rounded-lg text-slate-800  border-slate-400 hover:bg-slate-300 hover:shadow transition duration-150"
          >
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google logo"
            />
            <span>Sign In with Google</span>
          </button>
        </div>
        <div className="mt-4 underline text-sm text-center">
          <Link to="/forget-password">Forget Password</Link>
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

export default Login

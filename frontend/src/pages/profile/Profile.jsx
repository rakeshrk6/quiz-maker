import React, { useEffect, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import axios from "axios"
import QuizCard from "./QuizCard"
const Profile = () => {
  const [error, setError] = useState("")
  const [data, setData] = useState([])
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleDelete(item) {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/quiz/${item._id}`
      )
      await fetchQuiz()
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchQuiz() {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/api/quizes/${currentUser.uid}`
    )
    setData(response.data.result.quiz)
    console.log("quizes", response)
  }
  useEffect(() => {
    fetchQuiz()
  }, [])

  return (
    <div className="mt-[70px] justify-center flex gap-5 flex-wrap h-[100vh]">
      <div className="sm:w-[30%]">
        <div className="sm:w-[21rem] relative sm:fixed flex flex-col items-center gap-5 p-10 sm:h-[70%] mt-16 sm:m-10 outline outline-1 outline-slate-200 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md">
          <img
            className="h-32 w-32 rounded-full outline outline-1"
            src={
              currentUser.photoURL != null
                ? currentUser.photoURL
                : "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
            }
            alt="user-img"
          />
          <h1 className=" text-xl font-medium">{currentUser.displayName}</h1>
          <h1>{currentUser.email}</h1>
        </div>
      </div>

      <div className=" flex flex-col items-center gap-6 sm:mr-5 sm:mt-7 sm:w-[67%]">
        <div className=" text-2xl font-medium text-blue-950">Your Quizes</div>
        <div className="  flex flex-wrap gap-6 pb-7 justify-center">
          {data.length > 0 ? (
            data.map((item) => (
              <QuizCard item={item} key={item._id} Delete={handleDelete} />
            ))
          ) : (
            <div className="mt-[8rem]">No Quiz found</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile

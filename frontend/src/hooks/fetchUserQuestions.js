import { useState, useEffect } from "react"
import axios from "axios"

import { useDispatch } from "react-redux"
import { useAuth } from "../contexts/AuthContext"
import { addQuestion } from "../redux/slices/QuestionSlice"

const useUserQuestions = () => {
  const dispatch = useDispatch()
  const { currentUser } = useAuth()

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/question/${currentUser.uid}`
      )
      if (response.data.statusCode !== 200) {
        dispatch(addQuestion({ questions: [] }))
        return
      }
      console.log("response", response)
      dispatch(addQuestion({ questions: response.data.result.Questions }))
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  return { fetchData }
}

export default useUserQuestions

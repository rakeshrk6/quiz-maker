import { useDispatch, useSelector } from "react-redux"
import { startExamAction } from "../redux/slices/QuestionReducer"
import { axiosClient } from "../utils/axiosClient"
import { updateLength } from "../redux/slices/ResultReducer"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext"

export const useFetchQuestion = (id) => {
  const dispatch = useDispatch()
  const { currenUser } = useAuth()
  const fetchQuestionData = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions/${id}`,
        { withCredentials: true }
      )

      console.log("response", response)
      const { questions, answers } = response.data.result.quiz

      if (questions && answers && questions.length > 0) {
        dispatch(startExamAction({ questions, answers }))
        dispatch(updateLength(questions.length))
      } else {
        throw new Error("No Question Available")
      }
    } catch (error) {
      console.log("error:", error)
      if (error && error.response) {
        console.log("Error response:", error.response)
      } else {
        console.log("No error response available")
      }
    }
  }

  return [fetchQuestionData]
}

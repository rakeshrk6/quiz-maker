import { useDispatch } from "react-redux"
import { startExamAction } from "../redux/slices/QuestionReducer"
import { axiosClient } from "../utils/axiosClient"
import { updateLength } from "../redux/slices/ResultReducer"

export const useFetchQuestion = (id) => {
  const dispatch = useDispatch()

  const fetchQuestionData = async (id) => {
    try {
      const response = await axiosClient.get(`/api/questions/${id}`)
      const { questions, answers } = response.result.quiz

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

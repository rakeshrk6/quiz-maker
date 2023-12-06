import { useDispatch } from "react-redux"
import { startExamAction } from "../redux/slices/QuestionReducer"
import { axiosClient } from "../utils/axiosClient"
import { updateLength } from "../redux/slices/ResultReducer"

export const useFetchQuestion = (id) => {
  const dispatch = useDispatch()

  const fetchQuestionData = async (id) => {
    try {
      const response = await axiosClient.get(`/api/questions/${id}`)
      console.log("response", response)
      const { questions, answers } = response.data

      if (questions.length > 0) {
        dispatch(startExamAction({ questions, answers }))
        dispatch(updateLength(questions.length))
      } else {
        throw new Error("No Question Available")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [fetchQuestionData]
}

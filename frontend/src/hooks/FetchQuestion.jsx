import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { startExamAction } from "../redux/slices/QuestionReducer"
import { axiosClient } from "../utils/axiosClient"

export const useFetchQuestion = (id) => {
  const dispatch = useDispatch()

  const fetchQuestionData = async (id) => {
    try {
      // const url = `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions/${id}`
      // console.log("url:", url)

      const response = await axiosClient.get(`/api/questions/${id}`)
      console.log("response", response)
      const { questions, answers } = response.data
      // console.log("questions:", questions, answers)
      if (questions.length > 0) {
        dispatch(startExamAction({ questions, answers }))
        // console.log(questions)
      } else {
        throw new Error("No Question Available")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [fetchQuestionData]
}

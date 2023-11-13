import { useState } from "react"
import { useDispatch } from "react-redux"
import { getServerData } from "../components/helper/helper"
import { addQuizCard } from "../redux/slices/QuizSlice"
import { axiosClient } from "../utils/axiosClient"

export const useFetchAllQuizs = () => {
  const [getData, setGetData] = useState({
    isLoading: false,
    serverError: null,
  })
  const dispatch = useDispatch()

  const fetchQuiz = async () => {
    setGetData((prev) => ({ ...prev, isLoading: true }))

    try {
      // const quizes = await axiosClient.get("/get-quizes/")
      const quizes = await getServerData(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/get-quizes/`,
        (data) => data
      )
      console.log("quizes:", quizes)

      if (quizes.length > 0) {
        setGetData((prev) => ({ ...prev, isLoading: false }))

        dispatch(addQuizCard(quizes))
      } else {
        throw new Error("No Question Available")
      }
    } catch (error) {
      setGetData((prev) => ({ ...prev, isLoading: true }))
      setGetData((prev) => ({ ...prev, serverError: error }))
    }
  }

  return [getData, fetchQuiz]
}

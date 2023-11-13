import { postServerData } from "../components/helper/helper"
import {
  pushResultAction,
  updateResultAction,
} from "../redux/slices/ResultReducer"

export const PushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(pushResultAction(result))
  } catch (error) {
    console.log(error)
  }
}

export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(updateResultAction(index))
  } catch (error) {
    console.log(error)
  }
}

// insert user result
export const usePublishResult = (resultData) => {
  const { result, username } = resultData
  ;(async () => {
    try {
      if (result == [] && !username) throw new Error("couldn't get result")
      await postServerData(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`,
        resultData,
        (data) => data
      )
    } catch (error) {
      console.log(error)
    }
  })()
}
//insert quiz questions
export const usePublishQuiz = (quiz) => {
  // const { name, time_limit, question } = quiz
  ;(async () => {
    try {
      await postServerData(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/quiz`,
        quiz,
        (data) => data
      )
    } catch (error) {
      console.log(error)
    }
  })()
}

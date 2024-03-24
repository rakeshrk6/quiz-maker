import { postServerData } from "../components/helper/helper"
import { axiosClient } from "../utils/axiosClient"

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

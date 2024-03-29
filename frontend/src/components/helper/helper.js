import axios from "axios"
import { axiosClient } from "../../utils/axiosClient"

export function countAttempts(optionsSelected) {
  return optionsSelected.filter((r) => r !== undefined).length
}

export function countCorrect(optionsSelected, answers) {
  return optionsSelected.reduce((count, element, i) => {
    return count + (answers[i] === element ? 1 : 0)
  }, 0)
}

// get server data
export async function getServerData(url, callback) {
  const data = await (await axios.get(url))?.data
  return callback ? callback(data) : data
}

// post server data
export async function postServerData(url, result, callback) {
  const data = await axiosClient.post("/api/quiz", result)
  return callback ? callback(data) : data
}

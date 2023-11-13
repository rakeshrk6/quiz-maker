import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function countAttempts(result) {
  return result.filter((r) => r !== undefined).length
}

export function countPoints(result, answers, point) {
  return result
    .map((element, i) => answers[i] === element)
    .filter((i) => i)
    .map((i) => point)
    .reduce((prev, curr) => prev + curr, 0)
}

// check user auth
export function CheckUserExist({ children }) {
  const navigate = useNavigate()
  const auth = useSelector((state) => state.rootreducer.result.userId)
  return auth ? children : navigate("/instructions")
}

// get server data
export async function getServerData(url, callback) {
  const data = await (await axios.get(url))?.data
  return callback ? callback(data) : data
}

// post server data
export async function postServerData(url, result, callback) {
  const data = await (await axios.post(url, result))?.data
  // const data = await axiosClient.post("/auth/refresh")
  return callback ? callback(data) : data
}

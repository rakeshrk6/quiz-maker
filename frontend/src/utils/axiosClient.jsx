import axios from "axios"
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager"

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOSTNAME,
  withCredentials: true,
})

axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN)
  // console.log("accessToken", accessToken)

  request.headers["Authorization"] = `Bearer ${accessToken}`
  // console.log(request)
  return request
})

axiosClient.interceptors.response.use(async (response) => {
  const data = response.data
  if (data.status === "ok") {
    return data
  }

  const originalRequest = response.config
  const statusCode = data.statusCode
  const error = data.error

  // means the access token expired
  if (statusCode === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    try {
      const res = await axios
        .create({ withCredentials: true })
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/auth/refresh`)
      console.log("response from backend", res)
      if (res.data.status === "ok") {
        const newAccessToken = res.data.result.accessToken
        setItem(KEY_ACCESS_TOKEN, newAccessToken)

        // Update the request's headers with the new access token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`

        // Retry the original request
        return axios(originalRequest)
      } else {
        removeItem(KEY_ACCESS_TOKEN)
        window.location.replace("/login", "_self")
        return Promise.reject(error)
      }
    } catch (refreshError) {
      // Handle the error that occurred during token refresh
      return Promise.reject(refreshError)
    }
  }

  return Promise.reject(error)
})

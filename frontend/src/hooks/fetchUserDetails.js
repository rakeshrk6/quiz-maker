import { useState, useEffect } from "react"
import axios from "axios"

import { useDispatch } from "react-redux"
import { setStatus, setUser } from "../redux/slices/UserLoginStatus"

const useUserData = () => {
  const dispatch = useDispatch()

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/login/success", {
        withCredentials: true,
      })

      dispatch(setStatus(true))
      dispatch(setUser(response.data.user))
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  return [fetchData]
}

export default useUserData

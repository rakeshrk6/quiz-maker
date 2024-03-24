import React from "react"
import { useAuth } from "../contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

function OnlyIfNotLogged() {
  const { currentUser } = useAuth()
  return currentUser ? <Navigate to="/" /> : <Outlet />
}

export default OnlyIfNotLogged

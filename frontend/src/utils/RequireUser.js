import React from "react"

import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

function RequireUser() {
  const { currentUser } = useAuth()

  return currentUser ? <Outlet /> : <Navigate to="/login" />
}

export default RequireUser

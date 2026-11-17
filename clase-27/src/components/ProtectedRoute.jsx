import { useState } from "react"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(true)
  const path = useLocation().pathname;

  console.log(user && path === "/login")

  if (user && path === "/login") {
    return <Navigate to="/" replace />
  }

  if (!user && path === "/") {
    return <Navigate to="/login" replace />
  }

  return children
}

export { ProtectedRoute }
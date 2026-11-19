import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const path = useLocation().pathname;

  const { token } = useContext(AuthContext)

  if (token && path === "/login") {
    return <Navigate to="/" replace />
  }

  if (!token && path === "/") {
    return <Navigate to="/login" replace />
  }

  return children
}

export { ProtectedRoute }
import { createContext, useState } from "react"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  // estado que maneje la info del usuario
  const [token, setToken] = useState(localStorage.getItem("token"))

  // login 
  const loginUser = (newToken) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
  }

  // logout
  const logoutUser = () => {
    localStorage.removeItem("token")
    setToken(undefined)
  }

  return (
    <AuthContext.Provider value={{ token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
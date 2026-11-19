import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Header = () => {
  const { token, logoutUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate("/login")
  }

  return <header>
    <nav>
      <ul>
        {
          !token && <li>
            <Link to={"/login"}>Login</Link>
          </li>
        }
        {
          token && <>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </li>
          </>
        }
      </ul>
    </nav>
  </header>
}

export { Header }
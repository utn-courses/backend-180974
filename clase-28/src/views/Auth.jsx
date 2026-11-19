import { Eye } from "lucide-react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Auth = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("login")
  const [showPassword, setShowPassword] = useState(false)

  const { loginUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleRegister = () => {
    setMode(mode === "register" ? "login" : "register")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const urlApi = "https://api-utn-films.onrender.com/users"

    const response = await fetch(mode === "register"
      ? `${urlApi}/register`
      : `${urlApi}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: mode === "register"
        ? JSON.stringify({ name, email, password })
        : JSON.stringify({ email, password })
    })

    if (!response.ok) {
      alert("Ocurrió un error")
      return
    }

    const info = await response.json()

    if (mode === "login") {
      // redirigir al usuario al home
      // mediante la funcion del contexto "avisarle" a la app que hay usuario logueado
      loginUser(info.data.token)
      navigate("/")
    }

    if (mode === "register") {
      alert("Registrado con éxito :)")
      setMode("login")
    }

    setName("")
    setEmail("")
    setPassword("")
  }

  return (
    <main>
      <h1>{mode === "login" ? "Bienvenido, inicia sesión" : "Bienvenido, registrate"}</h1>
      <form onSubmit={handleSubmit}>
        {
          mode === "register" && <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        }
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="cont-password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Eye
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {
          <button
            type="submit"
            disabled={!email || !password}>
            {
              mode === "register" ? "Registrate" : "Iniciar sesión"
            }
          </button>
        }
        <button
          type="button"
          onClick={handleRegister}>
          {
            mode === "register"
              ? "Quiero iniciar sesión"
              : "Quiero registrame"
          }
        </button>
      </form>
    </main>
  )
}

export { Auth }
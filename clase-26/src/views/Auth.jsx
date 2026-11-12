import { useState } from "react"

const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("login")

  const handleRegister = () => {
    setMode("register")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <main>
      <h1>Bienvenido, inicia sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>{mode !== "register" ? "Inciar sesión" : "Registrate"}</button>
        {mode !== "register" && <button type="button" onClick={handleRegister}>Registrarme</button>}
      </form>
    </main>
  )
}

export { Auth }
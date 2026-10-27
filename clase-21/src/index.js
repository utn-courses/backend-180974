import express from "express"
import cors from "cors"
import { filmsRouter } from "./routes/filmsRouter.js"
import { connectMongoDb } from "./config/connectMongoDb.js"
import { usersRouter } from "./routes/usersRouter.js"

process.loadEnvFile()
const PORT = process.env.PORT
const URI_DB = process.env.URI_DB

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  try {
    res.json({
      status: {
        ok: true,
        description: "All Systems Operational"
      }
    })
  } catch (error) {
    res.status(500).json({ error: "Nuestros servicios están caidos" })
  }
})

// http://localhost:3000/users/login
app.use("/films", filmsRouter)
app.use("/users", usersRouter)

app.use("", (req, res) => {
  res.status(404).json({ message: "No se encuentra el recurso" })
})

app.listen(PORT, () => {
  connectMongoDb(URI_DB)
  console.log(`Servidor en escucha por el puerto http://localhost:${PORT}`)
})

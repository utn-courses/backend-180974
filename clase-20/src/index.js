import express from "express"
import cors from "cors"
import { filmsRouter } from "./routes/filmsRouter.js"
import { connectMongoDb } from "./config/connectMongoDb.js"

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

// films
// Servidor si detectas una petición x en /films ejecuta el router de las pelis
app.use("/films", filmsRouter)

// users
// Servidor si detectas una petición x en /users ejecuta el router de las users

// series
// Servidor si detectas una petición x en /series ejecuta el router de las series

app.use("", (req, res) => {
  res.status(404).json({ message: "No se encuentra el recurso" })
})

app.listen(PORT, () => {
  connectMongoDb(URI_DB)
  console.log(`Servidor en escucha por el puerto http://localhost:${PORT}`)
})
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { HTTP_MESSAGES } from "./constants/index.js"

process.loadEnvFile()
const PORT = process.env.PORT
const URI_DB = process.env.URI_DB

const app = express()
app.use(express.json())
app.use(cors())

const connectMongoDb = async (uri) => {
  try {
    await mongoose.connect(uri)
    console.log("Conectado a MongoDb")
  } catch (error) {
    console.log("No se pudo conectar a MongoDb")
  }
}

// 1 - schema → esquema que valida los datos de cada propiedad
const filmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, default: "generica" },
}, {
  versionKey: false
})

// Film.find({title: body.title, producer: body.producer})

// 2 - model → me permite utilizar los métodos de Mongodb
const Film = mongoose.model("Film", filmSchema)

app.get("/", (req, res) => {
  res.json({
    status: {
      ok: true,
      description: "All Systems Operational"
    }
  })
})

app.get("/films/search", async (req, res) => {
  const { title, genre } = req.query
  const filters = {}

  if (title) {
    filters.title = new RegExp(title, "i")
  }

  if (genre) {
    filters.genre = new RegExp(genre, "i")
  }

  const films = await Film.find(filters)
  res.json(films)
})

// endopoints
// Get films
app.get("/films", async (req, res) => {
  try {
    const films = await Film.find()
    res.json(films)
  } catch (error) {
    if (error.name === "MongooseError") {
      return res.status(500).json({ error: HTTP_MESSAGES.mongooseError })
    }
    res.status(500).json({ error: HTTP_MESSAGES.getErrorFilms })
  }
})

// Create film
// POST http://localhost:3000/films → data de nueva pelicula
app.post("/films", async (req, res) => {
  try {
    const body = req.body
    const currentYear = new Date().getFullYear()

    const { title, year } = body

    if (!title || !year) {
      return res.status(400).json({ error: "Datos invalidos, para crear una pelicula se requiere al menos título y año de estreno" })
    }

    if (year < 1888 || year > currentYear) {
      return res.status(400).json({ error: `El año de estreno tiene que ser entre 1888 y ${currentYear}` })
    }

    const foundFilm = await Film.findOne({ title })

    if (foundFilm) {
      return res.status(409).json({ error: "La pelicula ya existe en la base de datos" })
    }

    const newFilm = await Film.create(body)
    res.status(201).json(newFilm)
  } catch (error) {
    res.status(500).json({ error: HTTP_MESSAGES.createErrorFilm })
  }
})

app.patch("/films/:id", async (req, res) => {
  try {
    const id = req.params.id
    const body = req.body

    if (!mongoose.isValidObjectId(id)) {
      const error = new Error("ID no valido")
      error.name = "invalidId"
      throw error
    }

    const updatedFilm = await Film.findByIdAndUpdate(id, body, { new: true })
    if (!updatedFilm) {
      return res.status(404).json({ error: "La pelicula no se encuentra en nuestra base de datos" })
    }
    res.json(updatedFilm)
  } catch (error) {
    if (error.name === "invalidId") {
      return res.status(400).json({ error: "ID invalido, debería ser en formato ObjectId" })
    }
    res.status(500).json({ error: HTTP_MESSAGES.patchErrorFilm })
  }
})

app.delete("/films/:id", async (req, res) => {
  try {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "ID invalido, debería ser en formato ObjectId" })
    }

    const deletedFilm = await Film.findByIdAndDelete(id)

    if (!deletedFilm) {
      return res.status(404).json({ error: "La pelicula no se encuentra en nuestra base de datos" })
    }
    res.json({ message: "Pelicula borrada exitosamente" })
  } catch (error) {
    res.status(500).json({ error: "Disculpa, tuvimos un error, intentalo en la brevedad..." })
  }
})

app.use("", (req, res) => {
  res.status(404).json({ message: "No se encuentra el recurso" })
})

app.listen(PORT, () => {
  connectMongoDb(URI_DB)
  console.log(`Servidor en escucha por el puerto http://localhost:${PORT}`)
})
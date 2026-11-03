import { Film } from "../models/filmModel.js"
import { HTTP_MESSAGES } from "../constants/index.js"
import { successResponse } from "../utils/index.js"
import mongoose from "mongoose"
import { filmSchema } from "../validators/filmValidators.js"

const filterFilms = async (req, res) => {
  const { title, genre, year, yearFrom, yearTo, results, offset } = req.query
  const filters = {}

  // const filters = { title: /6/i }
  if (title) {
    filters.title = new RegExp(title, "i")
  }

  // const filters = { title: /6/i, genre: "probando" }
  if (genre) {
    filters.genre = genre
  }

  // const filters = {year: 2026}
  if (year) {
    filters.year = year
  }

  // { year: { $lte: undefined, $gte: 2010 } }
  if (yearFrom || yearTo) {
    filters.year = {}

    if (yearTo) {
      filters.year.$lte = Number(yearTo)
    }

    if (yearFrom) {
      filters.year.$gte = Number(yearFrom)
    }
    console.log(filters)
  }

  const films = await Film.find(filters)
    .limit(results ? results : 0)
    .skip(offset ? offset : 0)

  res.json(films)
}

const getFilms = async (req, res) => {
  try {
    const films = await Film.find()
    res.json(successResponse(films, "Peliculas recuperadas con éxito"))
  } catch (error) {
    if (error.name === "MongooseError") {
      return res.status(500).json({
        success: false,
        message: HTTP_MESSAGES.mongooseError
      })
    }
    res.status(500).json({
      success: false,
      message: HTTP_MESSAGES.getErrorFilms
    })
  }
}

const postFilm = async (req, res) => {
  try {
    const body = req.body

    // Incluir validaciones
    const validation = filmSchema.safeParse(body)

    if (!validation.success) {
      return res.status(400).json({
        error: validation.error.issues.map(e => ({
          origin: e.path[0],
          message: e.message
        }))
      })
    }

    const foundFilm = await Film.findOne({ title: body.title })

    if (foundFilm) {
      return res.status(409).json({ error: "La pelicula ya existe en la base de datos" })
    }

    const newFilm = await Film.create(body)
    res.status(201).json(successResponse(newFilm, "Pelicula creada exitosamente"))
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: HTTP_MESSAGES.createErrorFilm })
  }
}

const patchFilm = async (req, res) => {
  try {
    const id = req.params.id
    const body = req.body

    if (!mongoose.isValidObjectId(id)) {
      const error = new Error("ID no valido")
      error.name = "invalidId"
      throw error
    }

    const validation = filmSchema.partial().safeParse(body)

    if (!validation.success) {
      return res.status(400).json({
        error: validation.error.issues.map(e => ({
          origin: e.path[0],
          message: e.message
        }))
      })
    }

    const updatedFilm = await Film.findByIdAndUpdate(id, body, { new: true })
    if (!updatedFilm) {
      return res.status(404).json({ error: "La pelicula no se encuentra en nuestra base de datos" })
    }
    res.json(successResponse(updatedFilm, "Pelicula actualizada con éxito"))
  } catch (error) {
    if (error.name === "invalidId") {
      return res.status(400).json({ error: "ID invalido, debería ser en formato ObjectId" })
    }
    res.status(500).json({ error: HTTP_MESSAGES.patchErrorFilm })
  }
}

const deleteFilms = async (req, res) => {
  try {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "ID invalido, debería ser en formato ObjectId" })
    }

    const deletedFilm = await Film.findByIdAndDelete(id)

    if (!deletedFilm) {
      return res.status(404).json({ error: "La pelicula no se encuentra en nuestra base de datos" })
    }

    res.json(successResponse(deletedFilm, "Pelicula borrada con éxito"))
  } catch (error) {
    res.status(500).json({ error: "Disculpa, tuvimos un error, intentalo en la brevedad..." })
  }
}

export { filterFilms, getFilms, postFilm, patchFilm, deleteFilms }
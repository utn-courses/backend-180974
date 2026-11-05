
import { Film } from "../models/filmModel.js"
import { HTTP_MESSAGES } from "../constants/index.js"
import { successResponse, errorResponse } from "../utils/index.js"
import mongoose from "mongoose"
import { filmSchema } from "../validators/filmValidators.js"

// ==============================
// FILTRAR PELÍCULAS
// ==============================

const filterFilms = async (req, res) => {
  try {
    const {
      title,
      genre,
      year,
      yearFrom,
      yearTo,
      results,
      offset
    } = req.query

    const filters = {}

    // Filtro por título
    if (title) {
      filters.title = new RegExp(title, "i")
    }

    // Filtro por género
    if (genre) {
      filters.genre = genre
    }

    // Filtro por año exacto
    if (year) {
      filters.year = Number(year)
    }

    // Filtro por rango de años
    if (yearFrom || yearTo) {
      filters.year = {}

      if (yearFrom) {
        filters.year.$gte = Number(yearFrom)
      }

      if (yearTo) {
        filters.year.$lte = Number(yearTo)
      }
    }

    // Paginación
    const limit = results ? Number(results) : 0
    const skip = offset ? Number(offset) : 0

    const films = await Film.find(filters)
      .limit(limit)
      .skip(skip)

    return res.json(
      successResponse(
        films,
        "Películas filtradas con éxito"
      )
    )
  } catch (error) {
    console.log(error)

    return res.status(500).json(
      errorResponse(
        HTTP_MESSAGES.getErrorFilms,
        error.message
      )
    )
  }
}

// ==============================
// OBTENER TODAS LAS PELÍCULAS
// ==============================

const getFilms = async (req, res) => {
  try {
    const films = await Film.find()

    return res.json(
      successResponse(
        films,
        "Películas recuperadas con éxito"
      )
    )
  } catch (error) {
    console.log(error)

    return res.status(500).json(
      errorResponse(
        HTTP_MESSAGES.getErrorFilms,
        error.message
      )
    )
  }
}

// ==============================
// CREAR PELÍCULA
// ==============================

const postFilm = async (req, res) => {
  try {
    const body = req.body

    // Validación con Zod
    const validation = filmSchema.safeParse(body)

    if (!validation.success) {
      const errors = validation.error.issues.map(e => ({
        origin: e.path[0],
        message: e.message
      }))

      return res.status(400).json(
        errorResponse(
          "Error de validación",
          errors
        )
      )
    }

    // Buscar película existente
    const foundFilm = await Film.findOne({
      title: validation.data.title
    })

    if (foundFilm) {
      return res.status(409).json(
        errorResponse(
          "La película ya existe en la base de datos"
        )
      )
    }

    // Crear película
    const newFilm = await Film.create(validation.data)

    return res.status(201).json(
      successResponse(
        newFilm,
        "Película creada exitosamente"
      )
    )
  } catch (error) {
    console.log(error)

    // Error de validación de Mongoose
    if (error.name === "ValidationError") {
      return res.status(400).json(
        errorResponse(
          "Error de validación de Mongoose",
          error.message
        )
      )
    }

    // Error de duplicado
    if (error.code === 11000) {
      return res.status(409).json(
        errorResponse(
          "La película ya existe en la base de datos"
        )
      )
    }

    return res.status(500).json(
      errorResponse(
        HTTP_MESSAGES.createErrorFilm,
        error.message
      )
    )
  }
}

// ==============================
// ACTUALIZAR PELÍCULA
// ==============================

const patchFilm = async (req, res) => {
  try {
    const { id } = req.params
    const body = req.body

    // Validar ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json(
        errorResponse(
          "ID inválido, debería ser en formato ObjectId"
        )
      )
    }

    // Validación parcial con Zod
    const validation = filmSchema.partial().safeParse(body)

    if (!validation.success) {
      const errors = validation.error.issues.map(e => ({
        origin: e.path[0],
        message: e.message
      }))

      return res.status(400).json(
        errorResponse(
          "Error de validación",
          errors
        )
      )
    }

    // Evitar body vacío
    if (Object.keys(validation.data).length === 0) {
      return res.status(400).json(
        errorResponse(
          "Debes enviar al menos un campo para actualizar"
        )
      )
    }

    // Evitar títulos duplicados
    if (validation.data.title) {
      const foundFilm = await Film.findOne({
        title: validation.data.title,
        _id: { $ne: id }
      })

      if (foundFilm) {
        return res.status(409).json(
          errorResponse(
            "Ya existe otra película con ese título"
          )
        )
      }
    }

    // Actualizar película
    const updatedFilm = await Film.findByIdAndUpdate(
      id,
      validation.data,
      {
        new: true,
        runValidators: true
      }
    )

    if (!updatedFilm) {
      return res.status(404).json(
        errorResponse(
          "La película no se encuentra en nuestra base de datos"
        )
      )
    }

    return res.json(
      successResponse(
        updatedFilm,
        "Película actualizada con éxito"
      )
    )
  } catch (error) {
    console.log(error)

    if (error.name === "ValidationError") {
      return res.status(400).json(
        errorResponse(
          "Error de validación de Mongoose",
          error.message
        )
      )
    }

    return res.status(500).json(
      errorResponse(
        HTTP_MESSAGES.patchErrorFilm,
        error.message
      )
    )
  }
}

// ==============================
// ELIMINAR PELÍCULA
// ==============================

const deleteFilms = async (req, res) => {
  try {
    const { id } = req.params

    // Validar ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json(
        errorResponse(
          "ID inválido, debería ser en formato ObjectId"
        )
      )
    }

    // Eliminar película
    const deletedFilm = await Film.findByIdAndDelete(id)

    if (!deletedFilm) {
      return res.status(404).json(
        errorResponse(
          "La película no se encuentra en nuestra base de datos"
        )
      )
    }

    return res.json(
      successResponse(
        deletedFilm,
        "Película borrada con éxito"
      )
    )
  } catch (error) {
    console.log(error)

    return res.status(500).json(
      errorResponse(
        "Disculpa, tuvimos un error, inténtalo en la brevedad...",
        error.message
      )
    )
  }
}

// ==============================
// EXPORTACIONES
// ==============================

export {
  filterFilms,
  getFilms,
  postFilm,
  patchFilm,
  deleteFilms
}

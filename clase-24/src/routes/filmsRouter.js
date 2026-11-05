import { Router } from "express"
import { deleteFilms, filterFilms, getFilms, patchFilm, postFilm } from "../controllers/filmsControllers.js"

const filmsRouter = Router()

// método y ruta

// TODAS LA PETICIONES LLEGAN COMO http://localhost:3000/films

// http://localhost:3000/films/search
filmsRouter.get("/search", filterFilms)
filmsRouter.get("/", getFilms)
filmsRouter.post("/", postFilm)
filmsRouter.patch("/:id", patchFilm)
filmsRouter.delete("/:id", deleteFilms)

export { filmsRouter }
import express from "express"
import cors from "cors"

const server = express()

// middleware → admite la posibilidad de recibir data desde el exterior
server.use(express.json())
server.use(cors())

let films = [
  { id: 1, title: "The Matrix", year: 1999, genre: "Ciencia ficción" },
  { id: 2, title: "Interstellar", year: 2014, genre: "Ciencia ficción" },
  { id: 3, title: "The Godfather", year: 1972, genre: "Drama" },
  { id: 4, title: "Pulp Fiction", year: 1994, genre: "Crimen" },
  { id: 5, title: "Toy Story", year: 1995, genre: "Animación" }
]

// server.get()
// server.post()
// server.patch()
// server.delete()

// 1° → ruta
// 2° → callback para manejar el input y la respuesta

// request → objeto que trae metadata del usuario (cliente) → INPUT 
// response → objeto que maneja la respuesta → OUTPUT
server.get("/films", (request, response) => {
  response.json(films)
})

server.get("/films/:id", (request, response) => {
  const id = request.params.id
  const foundFilm = films.find(film => film.id === Number(id))

  if (!foundFilm) {
    return response.status(404).json({ error: "Pelicula no encontrada" })
  }

  response.json(foundFilm)
})

// FILMS → entidad

// Protocolo HTTP
// ruta para cada entidad
// métodos que definan el acción

// GET | /films → Recuperar la lista de peliculas
// POST | /films → Agregar una pelicula

server.post("/films", (request, response) => {
  const body = request.body

  const { title, year, genre } = body

  if (!title || !year || !genre) {
    return response.status(400).json({ error: "El titulo, el año y el género son obligatorios" })
  }

  // Implementar validadores
  // if (typeof body.title !== "string") {
  //   return response.status(400).json({ error: "Información invalida, el nombre debería ser un texto" })
  // }

  const newFilm = {
    id: films.length + 1,
    title,
    year,
    genre
  }

  films.push(newFilm)

  response.json({ message: "Pelicula agregada con éxito" })
})

server.patch("/films/:id", (request, response) => {
  const id = request.params.id
  const body = request.body

  const { title, year, genre } = body

  const foundFilm = films.find(film => film.id === Number(id))

  if (!foundFilm) {
    return response.status(404).json({ error: "Pelicula no encontrada" })
  }

  if (title) {
    foundFilm.title = title
  }
  if (year) {
    foundFilm.year = year
  }
  if (genre) {
    foundFilm.genre = genre
  }

  response.json({ message: "Pelicula actualizada exitosamente" })
})

// DESAFIO DE JS: Como comunico que la pelicula que quiere borrar el cliente no existe?
server.delete("/films/:id", (request, response) => {
  const id = request.params.id
  films = films.filter(film => film.id !== Number(id))
  response.json({ message: "Pelicula borrada exitosamente" })
})

// 1 - 65000
server.listen(1234, () => {
  console.log(`Servidor en escucha en el puerto http://localhost:1234`)
})
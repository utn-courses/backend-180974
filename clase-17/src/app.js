import express from "express"
import fs from "node:fs"

const server = express();
server.use(express.json())
const port = 3000;
const pathFilmFile = "./src/data/films.json"

const films = JSON.parse(fs.readFileSync(pathFilmFile))

// endpoints → puntos finales
// get post update delete

// Agregar una peli
// Ver las pelis de Wes Anderson
// Actualizar el nombre de una peli
// Tirar/borrar un peli

server.get("/films", (request, response) => {
  response.status(200).json(films)
})

server.get("/films/:id", (request, response) => {
  const id = request.params.id

  // id → vaca
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return response.status(400).json({ error: "Invalid UUID" })
  }

  const foundFilm = films.find(film => film.id === id)
  if (!foundFilm) {
    return response.status(404).json({ error: "Film not found" })
  }
  response.json(foundFilm)
})

server.post("/films", (request, response) => {
  const body = request.body
  const { title, genre, year } = body

  const foundFilm = films.find(film => film.title.toLowerCase().trim() === title.toLowerCase().trim())

  if (foundFilm) {
    return response.status(409).json({ error: "Movie already in our database" })
  }

  const newFilm = {
    id: crypto.randomUUID(),
    title,
    year,
    genre
  }

  films.push(newFilm)
  fs.writeFileSync(pathFilmFile, JSON.stringify(films))
  response.status(201).json(newFilm)
})

// server.patch()

// server.delete()

server.use("", (request, response) => {
  response.status(404).json({ "error": "There is nothing here." })
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
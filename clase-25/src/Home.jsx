import { useEffect, useState } from "react"
import "./styles/Home.css"

function Home() {
  const [films, setFilms] = useState([])
  const [title, setTitle] = useState("")
  const [year, setYear] = useState(0)
  const [genre, setGenre] = useState("")

  const fetchFilms = async () => {
    const response = await fetch("https://api-utn-films.onrender.com/films", {
      method: "GET",
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZWNlMjMyMGY4OTg1NDRhOWVmZTE0ZiIsIm5hbWUiOiJndXN0YXZvIiwiZW1haWwiOiJndXN0YXZvQGdtYWlsLmNvbSIsImlhdCI6MTc5NDM0MTI3MiwiZXhwIjoxNzk0MzQ0ODcyfQ.pykkZ9wWbPXfKRWASGQgalwTDU397pgipyXzZYnufbQ"
      }
    })
    if (response.ok) {
      const info = await response.json()
      setFilms(info.data)
    }
  }

  useEffect(() => {
    fetchFilms()
  }, [])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const newFilm = { title, year, genre }

      const response = await fetch("https://api-utn-films.onrender.com/films", {
        method: "POST",
        headers: {
          authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZWNlMjMyMGY4OTg1NDRhOWVmZTE0ZiIsIm5hbWUiOiJndXN0YXZvIiwiZW1haWwiOiJndXN0YXZvQGdtYWlsLmNvbSIsImlhdCI6MTc5NDM0MTI3MiwiZXhwIjoxNzk0MzQ0ODcyfQ.pykkZ9wWbPXfKRWASGQgalwTDU397pgipyXzZYnufbQ",
          "content-type": "application/json"
        },
        body: JSON.stringify(newFilm)
      })

      if (response.ok) {
        const info = await response.json()
        // info.data
        console.log(info.data)
        setFilms([...films, info.data])
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <main id="home">
        <h1>Mis peliculas</h1>
        <section id="form">
          <h2>Agregar pelicula</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre de la pelicula"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="Año de estreno"
              onChange={(e) => setYear(e.target.value)}
            />
            <input
              type="text"
              placeholder="Género de la pelicula"
              onChange={(e) => setGenre(e.target.value)}
            />
            <button>Agregar pelicula</button>
          </form>
        </section>
        <section id="films">
          {
            films.map((film) => {
              return <div key={film._id}>
                <h2>{film.title}</h2>
                <h3>Año de estreno: {film.year}</h3>
                <p>Genero: {film.genre}</p>
              </div>
            })
          }
        </section>
      </main>
    </>
  )
}

export { Home }

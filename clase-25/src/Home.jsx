import { useEffect, useState } from "react"
import "./styles/Home.css"

function Home() {
  const [films, setFilms] = useState([])

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

  return (
    <>
      <main id="home">
        <h1>Mis peliculas</h1>
        <section>
          {
            films.map((film) => {
              return <div>
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

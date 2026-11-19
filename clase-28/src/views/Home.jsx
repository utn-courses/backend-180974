import { useContext, useEffect, useState } from "react"
import "../styles/Home.css"
import { AuthContext } from "../context/AuthContext"

const Home = () => {
  const [films, setFilms] = useState([])
  const [title, setTitle] = useState("")
  const [year, setYear] = useState("")
  const [genre, setGenre] = useState("")
  const [editingId, setEditingId] = useState(null)

  const { token } = useContext(AuthContext)

  const fetchFilms = async () => {
    const response = await fetch("https://api-utn-films.onrender.com/films", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`
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

      // agregar validaciones de input

      const newFilm = { title, year, genre }

      const urlApi = "https://api-utn-films.onrender.com/films"

      const response = await fetch(editingId ? `${urlApi}/${editingId}` : urlApi, {
        method: editingId ? "PATCH" : "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        body: JSON.stringify(newFilm)
      })

      if (response.ok) {
        const info = await response.json()
        if (!editingId) {
          setFilms([...films, info.data])
          alert("Pelicula agregada exitosamente")
        } else {
          setFilms(films.map((film) => film._id === editingId ? info.data : film))
          alert("Pelicula actualizada exitosamente")
        }
      }

      handleResetForm()
      setEditingId(null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateFilm = (film) => {
    setEditingId(film._id)
    setTitle(film.title)
    setYear(film.year)
    setGenre(film.genre)
  }

  const handleDeleteFilm = async (id) => {
    if (confirm("Está seguro que quiere borrar la pelicula?")) {
      const urlApi = `https://api-utn-films.onrender.com/films/${id}`
      const response = await fetch(urlApi, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        const info = await response.json()
        alert(info.message)
        fetchFilms()
      }
    } else {
      alert("ok, ten cuidadito...")
    }
  }

  const handleCancelEditingFilm = () => {
    setEditingId(null)
    handleResetForm()
  }

  const handleResetForm = () => {
    setTitle("")
    setYear("")
    setGenre("")
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
              value={title}
            />
            <input
              type="number"
              placeholder="Año de estreno"
              onChange={(e) => setYear(e.target.value)}
              value={year}
            />
            <input
              type="text"
              placeholder="Género de la pelicula"
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
            />
            <button type="submit">{editingId ? "Actualizar pelicula" : "Agregar pelicula"}</button>
            {editingId && <button type="button" onClick={handleCancelEditingFilm}>Cancelar</button>}
          </form>
        </section>
        <section id="films">
          {
            films.map((film) => {
              return <div key={film._id}>
                <h2>{film.title}</h2>
                <h3>Año de estreno: {film.year}</h3>
                <p>Genero: {film.genre}</p>
                <button
                  className="btn-update"
                  onClick={() => handleUpdateFilm(film)}>
                  Actulizar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteFilm(film._id)}>
                  Borrar
                </button>
              </div>
            })
          }
        </section>
      </main>
    </>
  )
}

export { Home }

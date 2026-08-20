const Header = () => {
  const fecha = new Date().toLocaleString("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return <header>
    <h1>Lista de alumnos</h1>
    <p>{fecha}</p>
  </header>
}

export { Header }
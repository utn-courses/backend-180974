const Alumno = ({ alumno }) => {
  const { nombre, edad, nota, activo } = alumno

  return <li>{nombre} - {edad} años | Nota {nota} - {activo ? "Activo" : "Inactivo"}</li>
}

export { Alumno }
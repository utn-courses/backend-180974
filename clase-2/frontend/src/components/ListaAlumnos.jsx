import { alumnos } from "../data/alumnos.js"
import { Alumno } from "./Alumno"

const ListaAlumnos = () => {
  return <ul>
    {
      alumnos.map((alumno) =>
        <Alumno
          key={alumno.id}
          alumno={alumno}
        />)
    }
  </ul>
}

export { ListaAlumnos }
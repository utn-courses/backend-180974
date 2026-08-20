const alumnos = [
  {
    id: 1,
    nombre: "Juan Pérez",
    edad: 22,
    nota: 8,
    activo: true
  },
  {
    id: 2,
    nombre: "María González",
    edad: 25,
    nota: 9,
    activo: true
  },
  {
    id: 3,
    nombre: "Lucas Rodríguez",
    edad: 20,
    nota: 6,
    activo: false
  },
  {
    id: 4,
    nombre: "Sofía Martínez",
    edad: 23,
    nota: 10,
    activo: true
  },
  {
    id: 5,
    nombre: "Pedro López",
    edad: 28,
    nota: 5,
    activo: false
  },
  {
    id: 6,
    nombre: "Camila Fernández",
    edad: 21,
    nota: 7,
    activo: true
  }
];

// console.log(alumnos)

// // 1
// alumnos.forEach((alumno) => {
//   console.log(alumno)
// })

// 2
const nombres = alumnos.map((alumno) => alumno.nombre)

// const desaprobados = []
// // 3
// const aprobados = alumnos.filter((alumno) => {
//   if (alumno.nota >= 6) {
//     return alumno
//   } else {
//     desaprobados.push(alumno)
//   }
// })

// const aprobados = []
// const desaprobados = []

// alumnos.forEach(alumno => alumno.nota >= 6 ? aprobados.push(alumno) : desaprobados.push(alumno))

// console.log(aprobados)
// console.log(desaprobados)

// alumno id 1

const id = 123

const alumno = alumnos.find((alumno) => alumno.id === id)
alumno ? console.log(alumno.nombre) : console.log("Usuario no encontrado")

// Mostrar solamente los alumnos cuyo atributo activo sea true.
const logueados = alumnos.filter(alumno => alumno.activo)
console.log(logueados)

const notasTotalidad = alumnos.reduce((acumulador, alumno) => acumulador + alumno.nota, 0)
// console.log(notasTotalidad)

// let contador = 0
// alumnos.forEach(alumno => {
//   contador = contador + alumno.nota
// })

// console.log(contador)

// alumnos.push({ id: 7, nombre: "Santino", edad: 24, nota: 8, activo: true })

// const promedio = +(notasTotalidad / alumnos.length).toFixed(2)

// console.log(promedio)


// Crear una función llamada:

const data = { id: 7, nombre: "Santino", edad: 24, nota: 8, activo: false }

const mostrarAlumno = ({ nombre, edad, nota, activo }) => {
  console.log(`
  Alumno: ${nombre}
  Edad: ${edad}
  Nota: ${nota}
  Estado: ${activo ? "Activo" : "Inactivo"}`)
}

mostrarAlumno(data)

// La función deberá recibir un alumno y mostrar un resultado similar al siguiente:

// Alumno: Juan
// Edad: 22
// Nota: 8
// Estado: Activo

// La función deberá determinar si el alumno está activo o inactivo utilizando el valor de la propiedad activo.

// Desafío adicional

const nombre = "sofía Martínez"

const buscarAlumnosPorNombre = (nombre) => alumnos.filter(alumno => alumno.nombre.toLowerCase() === nombre.toLowerCase())

const resultado = buscarAlumnosPorNombre(nombre)
console.log(resultado)
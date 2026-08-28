// Ejercicio 1 — Variables tipadas

// Crear variables para representar:

// Nombre de una persona.
// Edad.
// Altura.
// Si está activo.
// Una lista de hobbies.

// Asignar los tipos correspondientes.

let nombre: string = "Gabriel"
let edad: number = 32
let altura: number = 1.72
let estado: boolean = true

let hobbies: string[] = ["jugar al lol", "pasear a la arandela", "cocinar"]

// Ejercicio 2 — Función tipada
// Crear una función sumar que reciba dos números y devuelva el resultado.

const sumar = (n1: number, n2: number): string => {
  return String(`El resultado es: ${n1 + n2}`)
}

console.log(sumar(3, 4))

// Ejercicio 3 — Función que no devuelve información
// Crear una función mostrarMensaje que reciba un string y lo muestre por consola.

const mostrarMensaje = (mensaje: string): void => {
  console.log(mensaje)
}

mostrarMensaje("Esto es un mensaje.")

// Ejercicio 4 — Array tipado
// Crear un array de números y realizar las siguientes operaciones:

// Mostrar todos los números.
// Obtener solamente los números mayores a 5.
// Obtener un nuevo array con los números multiplicados por 2.

const numeros: number[] = [1, 3, 77, 11, 4, 9, 10]

// En la posición 1 esta el número 1
// En la posición 2 esta el número 3
// En la posición 3 esta el número 77

numeros.forEach((numero, indice) => console.log(`En la posición ${indice + 1} esta el número ${numero}`))

// que pregunta tienen que responder correctamente para pertenecer
const mayores = numeros.filter((numero) => numero > 5)
console.log(mayores)

// En que querés convertir a cada número?
const multiplos = numeros.map((numero) => numero * 2)
console.log(multiplos)

// Consigna
// Crear una interfaz Alumno con:
// id
// nombre
// edad
// nota
// estado

interface Alumno {
  id: string
  nombre: string
  edad: number
  nota: number
  estado: boolean
}

const alumno1: Alumno = {
  id: crypto.randomUUID(),
  nombre: "Mario",
  edad: 25,
  nota: 10,
  estado: false
}

console.log(alumno1)

type Estado = "activo" | "inactivo" | "pendiente"

const estadoBrian: Estado = "pendiente"
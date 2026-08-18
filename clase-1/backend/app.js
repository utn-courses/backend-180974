// Variables
// let y const

let dato = "Manzana"
dato = 1

const id = "abc123"
// id = 123

console.log(id)

let contador = 0

for (let index = 0; index < 10; index++) {
  contador = contador + 1
}

console.log(contador)

// ------------------------------------

const nombre = "Gabriel";     // string
const edad = 30;              // number
const activo = true;          // boolean
const usuario = null;
const dni = 123 * "Hola"

console.log(typeof nombre)
console.log(typeof edad)
console.log(typeof activo)
console.log(typeof usuario)
console.log(typeof dni)

// operadores
// aritméticos
// lógicos
// comparación

const a = 10;
const b = 5;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a ** b);
console.log(a / b);
console.log(a % b);

// AND &&
// OR ||
// negación !

// Para conducir necesitas carnet y ser mayor de edad

let carnet = true
let edadConductor = 2
let debeMultas = false
let licenciaProfesional = false
let hijoDelInspector = true

if ((carnet && edadConductor > 17 && !debeMultas) || licenciaProfesional) {
  console.log("Puede conducir")
} else if (hijoDelInspector) {
  console.log("Si si dale pasa")
} else {
  console.log("No puedes conducir")
}

// operador ternario
// validación ? caso exitoso : caso de no éxito

const numero = 0

// valide si es par o no

numero % 2 === 0 ? console.log("Par") : console.log("Impar")

// funciones

// parametros → a y b
function sumar(a, b) {
  console.log(a + b)
}

let comida = "pan"

function comer(comida) {
  if (!comida) {
    console.log("Ingrese comida")
  } else {
    console.log(`Estoy comiendo ${comida}.`)
  }
}

comer()

function crearUsername(nombre = "invitado") {
  console.log("Hola " + nombre)
}

crearUsername("Victorino123")

const createNickname1 = (name = "user") => name + "LAS"

const createNickname2 = (name = "user") => {
  const numAleatorio = Math.round(Math.random() * 10000)
  return name + numAleatorio
}

const nick = createNickname2()

console.log("Hola, mi nickname es: " + nick)

// Arrays
const nombres = [
  "Juan",
  "Pedro",
  "Ana",
  "Lucía",
  "Lucrecia",
  "Julián"
];
// ver cantidad de elementos
console.log(nombres.length)

// ingresar a un elemento por posición (-1 es el último)
console.log(nombres.at(-1))

nombres.unshift("Claudio")
nombres.push("Claudio")

nombres.shift()
nombres.pop()

nombres.splice(4, 1, "Fernando")

console.log(nombres)

nombres.forEach((nombre) => console.log(`Hola ${nombre}`))

const persona = {
  nombre: "Juan",
  edad: 25,
  email: "juan@gmail.com",
  heladoFavorito: "Coco"
};

// find
// filter
// map

const valorPosible = "heladoFavorito"

// Ingresar a valor de propiedad de obj
console.log(persona[valorPosible])

persona.mascota = "Pepito"

console.log(persona)






let test = 1

const personas = [
  {
    nombre: "Juan",
    edad: 25,
    email: "juan@gmail.com",
    heladoFavorito: "Coco"
  },
  {
    nombre: "María",
    edad: 30,
    email: "maria@gmail.com",
    heladoFavorito: "Chocolate"
  },
  {
    nombre: "Pedro",
    edad: 22,
    email: "pedro@gmail.com",
    heladoFavorito: "Vainilla"
  },
  {
    nombre: "Lucía",
    edad: 28,
    email: "lucia@gmail.com",
    heladoFavorito: "Frutilla"
  },
  {
    nombre: "Carlos",
    edad: 35,
    email: "carlos@gmail.com",
    heladoFavorito: "Dulce de leche"
  },
  {
    nombre: "Sofía",
    edad: 24,
    email: "sofia@gmail.com",
    heladoFavorito: "Limón"
  },
  {
    nombre: "Martín",
    edad: 31,
    email: "martin@gmail.com",
    heladoFavorito: "Menta granizada"
  },
  {
    nombre: "Ana",
    edad: 27,
    email: "ana@gmail.com",
    heladoFavorito: "Frambuesa"
  },
  {
    nombre: "Diego",
    edad: 29,
    email: "diego@gmail.com",
    heladoFavorito: "Crema americana"
  },
  {
    nombre: "Camila",
    edad: 26,
    email: "camila@gmail.com",
    heladoFavorito: "Pistacho"
  }
]

personas.forEach((persona) => {
  persona.mascota = ""
})

console.log(personas)

const camila = personas.find(persona => persona.nombre === "Camila")

camila.mascota = "Jacinto"

console.log(camila)
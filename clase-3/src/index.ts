// tipos básicos

let edad: number = 32
let nombre: string = "Gabriel"
let status: boolean = true

console.log(edad, nombre, status)

let mascota: string = "Arandela"

// inferencia de tipo
// mascota = 1

// const nombres: Array<string> = ["Juan", "Pedro", "Ana"]
const nombres: Array<string> = ["Juan", "Pedro", "Ana"]

nombres.push("Mariano")
nombres.push("Rafaela")
nombres.push("Luisina")
console.log(nombres)

const edades: number[] = [1, 43, 3, 65, 12]

type Persona = { edad: number, nombre: string, dni: number, tel: number, status: boolean }

const persona1: Persona = {
  edad: 13,
  nombre: "Alan",
  dni: 12345678,
  tel: 111111111,
  status: false
}

const persona2: Persona = {
  edad: 20,
  nombre: "Julieta",
  dni: 222222222,
  tel: 44444444,
  status: true
}

const mostrarInfo = (objPersona: Persona): string => {
  const { nombre, edad, dni, tel, status } = objPersona

  const saludo: string = `NOMBRE: ${nombre} | EDAD: ${edad} años | DNI: ${dni} | TEL: ${tel} | STATUS: ${status ? "ACTIVO" : "INACTIVO"}.`

  return saludo
}

const info = mostrarInfo(persona2)



const generarCupon = (nombre?: string): string | boolean => {
  if (!nombre) {
    return false
  }

  const cupon = crypto.randomUUID()
  return `Hola ${nombre} tu cupón es: ${cupon}. Éxitos :)`
}

const cuponGenerado = generarCupon("Alan")
console.log(cuponGenerado)

enum SexoAnimal {
  MACHO = "macho",
  HEMBRA = "hembra"
}

const gato1: Gato = {
  sexo: SexoAnimal.MACHO,
  nombre: "Tuerca",
  edad: "10 meses",
  gustos: {
    comida: "todo",
    juguetes: ["pelotita", "árbol"],
    cama: ["caja de carton", "silla gamer", "mesa de afuera"]
  }
}

type Gato = {
  sexo: SexoAnimal,
  nombre: string,
  edad: string | number,
  gustos: GustosGato
}

type GustosGato = {
  comida: string,
  juguetes: string[],
  cama: string[]
}

const gato2: Gato = {
  sexo: SexoAnimal.HEMBRA,
  edad: "2 meses",
  nombre: "Peperina",
  gustos: {
    comida: "pescado",
    juguetes: ["tuerca", "árbol"],
    cama: ["sillón"]
  }
}

const gatos: Gato[] = [gato1, gato2]
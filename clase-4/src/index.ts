// Clase → Modelo

const alumno1 = {
  nombre: "Juan",
  saludar: function () {
    console.log(`Hola soy ${this.nombre}`)
  }
}

const alumno2 = {
  nombre: "Mariano",
  saludar: function () {
    console.log(`Hola soy ${this.nombre}`)
  }
}

class Alumno {
  private id: string
  public nombre: string
  public edad: number
  public hobbies: string[]

  constructor(
    nombre: string,
    edad: number,
    hobbies: string[]
  ) {
    this.id = crypto.randomUUID()
    this.nombre = nombre
    this.edad = edad
    this.hobbies = hobbies
  }

  saludar() {
    console.log(`Hola! Soy ${this.nombre}.`)
  }

  cumplirAnio() {
    this.edad = this.edad + 1
  }

  agregarHobbie(hobbie: string) {
    this.hobbies.push(hobbie)
  }

  mostrarId() {
    console.log(`ID de ${this.nombre}: ${this.id}`)
  }
}

const alumno3 = new Alumno("Matías", 31, ["pescar", "caminar"])
const alumno4 = new Alumno("Alan", 22, ["cocinar", "pintar"])

// console.log(alumno3.nombre)
// console.log(alumno4.nombre)

// alumno3.saludar()
// alumno4.saludar()

// alumno3.cumplirAnio()
// console.log(alumno3.edad)

// alumno4.agregarHobbie("nadar")
// console.log(alumno4.hobbies)

alumno4.mostrarId()
const obj1 = {}
console.log(obj1)

class Objeto {
  nombre: string

  constructor(nombre: string) {
    this.nombre = nombre
  }

  saludar() {
    console.log(`Hola soy ${this.nombre}`)
  }
}

const objeto1 = new Objeto("claudio")

console.log(objeto1.nombre)
objeto1.saludar()


const objeto2 = {
  nombre: "Lalo",
  saludar: function () {
    console.log("Hola " + this.nombre)
  }
}

objeto2.saludar()
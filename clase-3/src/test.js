const nombres = ["Juan", "Pedro", "Ana"]

const validarNombre = (nombre) => {
  if (typeof nombre !== "string") {
    console.log("Nombre invalido")
  } else {
    nombres.push(nombre)
    console.log(nombres)
  }
}

validarNombre(true)
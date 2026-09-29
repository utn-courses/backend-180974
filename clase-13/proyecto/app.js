// 1 - Ver información del sistema operativo
// 2 - Consultar memoria RAM
// 3 - Ver historial de consulta
// 4 - Limpiar historial
// 5 - Salir

import fs from "node:fs"
import os from "node:os"
import readline from "node:readline"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const obtenerHistorial = () => {
  if (!fs.existsSync("historial.json")) {
    fs.writeFileSync("historial.json", JSON.stringify([]))
  }

  const historial = JSON.parse(fs.readFileSync("historial.json"))

  return historial
}

const guardarConsulta = (tipo, datos) => {
  const historial = obtenerHistorial()
  historial.push({
    tipo: tipo,
    fecha: new Date().toLocaleString(),
    datos: datos
  })

  fs.writeFileSync("historial.json", JSON.stringify(historial))
}

const mostrarSistema = () => {
  const datos = {
    sistema: os.type(),
    plataforma: os.platform(),
    arquitectura: os.arch(),
    version: os.release(),
    procesadoresLogicos: os.cpus().length,
    usuario: os.userInfo().username,
    tiempoActividad: `${Math.floor(os.uptime() / 3600)} horas y ${Math.floor((os.uptime() % 3600) / 60)} minutos`
  }

  console.log('\n=== INFORMACIÓN DEL SISTEMA ===');
  console.log(`Sistema operativo: ${datos.sistema}`);
  console.log(`Plataforma: ${datos.plataforma}`);
  console.log(`Arquitectura: ${datos.arquitectura}`);
  console.log(`Versión: ${datos.version}`);
  console.log(`Procesadores: ${datos.procesadoresLogicos}`);
  console.log(`Usuario: ${datos.usuario}`);
  console.log(`Tiempo encendida: ${datos.tiempoActividad}`);

  guardarConsulta("Ver información del sistema", datos)
}

const mostrarHistorial = () => {
  const historial = obtenerHistorial()
  console.log(historial)
}

const limpiarHistorial = () => {
  rl.question("¿Está seguro que quieres borrar el historial? Si / No ", (opcion) => {
    if (opcion.toLowerCase === "si") {
      fs.writeFileSync("historial.json", JSON.stringify([]))
      console.log("\nHistorial eliminado correctamente.")
    } else {
      console.log("Ok, tene cuidadin")
    }
  })
}

const mostrarMenu = () => {
  console.log('\n===== MONITOR DEL SISTEMA =====');
  console.log('1. Ver información del sistema');
  console.log('2. Consultar memoria RAM');
  console.log('3. Ver historial de consultas');
  console.log('4. Limpiar historial');
  console.log('5. Salir');

  rl.question("\nSeleccione una opción: ", (opcion) => {
    switch (opcion) {
      case "1":
        mostrarSistema()
        break
      case "2":
        break
      case "3":
        mostrarHistorial()
        break
      case "4":
        limpiarHistorial()
        break
      case "5":
        console.log("Aplicación finalizada.")
        rl.close()
        return
      default:
        console.log("Opción invalida. Intente nuevamente.")
        break
    }

    setTimeout(() => {
      mostrarMenu()
    }, 3000)
  })
}

mostrarMenu()

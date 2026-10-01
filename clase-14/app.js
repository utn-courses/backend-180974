import fs from "node:fs"
import os from "node:os"
import readline from "node:readline"
import colors from "colors"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const obtenerHistorial = () => {
  if (!fs.existsSync("historial.json")) {
    fs.writeFileSync("historial.json", JSON.stringify([]))
    return []
  }

  return JSON.parse(fs.readFileSync("historial.json", "utf8"))
}

const guardarConsulta = (tipo, datos) => {
  const historial = obtenerHistorial()

  const consulta = {
    tipo,
    fecha: new Date().toLocaleString(),
    datos
  }

  if (tipo === "Consultar memoria RAM") {
    consulta.usuario = os.userInfo().username
  }

  historial.push(consulta)
  fs.writeFileSync("historial.json", JSON.stringify(historial, null, 2))
}

const mostrarSistema = () => {
  const interfaces = os.networkInterfaces()

  const ips = []

  for (const nombre in interfaces) {
    for (const red of interfaces[nombre]) {
      if (red.family === "IPv4" && !red.internal) {
        ips.push(`${nombre}: ${red.address}`)
      }
    }
  }

  const datos = {
    sistema: os.type(),
    plataforma: os.platform(),
    arquitectura: os.arch(),
    version: os.release(),
    procesadoresLogicos: os.cpus().length,
    usuario: os.userInfo().username,
    ip: ips,
    tiempoActividad: `${Math.floor(os.uptime() / 3600)} horas y ${Math.floor((os.uptime() % 3600) / 60)} minutos`
  }

  console.log(colors.green("\n=== INFORMACIÓN DEL SISTEMA ==="))
  console.log(`Sistema operativo: ${datos.sistema}`)
  console.log(`Plataforma: ${datos.plataforma}`)
  console.log(`Arquitectura: ${datos.arquitectura}`)
  console.log(`Versión: ${datos.version}`)
  console.log(`Procesadores: ${datos.procesadoresLogicos}`)
  console.log(`Usuario: ${datos.usuario}`)
  console.log(`IP: ${datos.ip.join(", ")}`)
  console.log(`Tiempo encendida: ${datos.tiempoActividad}`)

  guardarConsulta("Ver información del sistema", datos)
}

const mostrarMemoria = () => {
  const total = os.totalmem()
  const libre = os.freemem()
  const usada = total - libre

  const datos = {
    totalGB: Number((total / 1024 ** 3).toFixed(2)),
    libreGB: Number((libre / 1024 ** 3).toFixed(2)),
    usadaGB: Number((usada / 1024 ** 3).toFixed(2)),
    porcentajeUso: Math.round(Number((usada / total) * 100))
  }

  console.log("\n=== MEMORIA RAM ===")
  console.log(`Memoria total: ${datos.totalGB} GB`)
  console.log(`Memoria usada: ${datos.usadaGB} GB`)
  console.log(`Memoria libre: ${datos.libreGB} GB`)
  console.log(`Porcentaje de uso: ${datos.porcentajeUso > 75 ? colors.red(datos.porcentajeUso) : colors.green(datos.porcentajeUso)}%`)

  guardarConsulta("Consultar memoria RAM", datos)
}

const mostrarHistorial = () => {
  const historial = obtenerHistorial()

  if (historial.length === 0) {
    console.log("No hay consultas realizadas.")
    return
  }

  console.log("\n=== HISTORIAL DE CONSULTAS ===")
  historial.forEach((consulta, i) => {
    console.log(`\nConsulta N° ${i + 1} | ${consulta.tipo}`)
    if (consulta.tipo === "Ver información del sistema") {
      console.log("Fecha:", consulta.fecha)
      console.log("Usuario:", consulta.datos.usuario)
    }

    if (consulta.tipo === "Consultar memoria RAM") {
      console.log("Fecha:", consulta.fecha)
      console.log("RAM en uso:", consulta.datos.porcentajeUso + "%",)
      console.log("Usuario:", consulta.usuario)
    }
  })
}

const limpiarHistorial = () => {
  rl.question("¿Está seguro de que quiere borrar el historial? (Si/No): ", (opcion) => {
    if (opcion.trim().toLowerCase() === "si") {
      fs.writeFileSync("historial.json", JSON.stringify([], null, 2))
      console.log("\nHistorial eliminado correctamente.")
    } else {
      console.log("\nOperación cancelada.")
    }

    mostrarMenu()
  })
}

const mostrarMenu = () => {
  console.log("\n===== MONITOR DEL SISTEMA =====")
  console.log("1. Ver información del sistema")
  console.log("2. Consultar memoria RAM")
  console.log("3. Ver historial de consultas")
  console.log("4. Limpiar historial")
  console.log("5. Salir")

  rl.question("\nSeleccione una opción: ", (opcion) => {
    switch (opcion) {
      case "1":
        mostrarSistema()
        break
      case "2":
        mostrarMemoria()
        break
      case "3":
        mostrarHistorial()
        break
      case "4":
        limpiarHistorial()
        return
      case "5":
        console.log("Aplicación finalizada.")
        rl.close()
        return
      default:
        console.log("Opción inválida. Intente nuevamente.")
    }

    setTimeout(() => {
      mostrarMenu()
    }, 3000)
  })
}

mostrarMenu()
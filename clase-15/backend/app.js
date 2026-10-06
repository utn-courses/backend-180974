import http from "node:http"

// servidor que funciona con el protocolo http
// ruta
// método

// ENTIDADES
// ruta → que es lo que voy a consultar
// prendas → /clothes
// usuarios → /users
// provedores → /providers
// locales  → /stores

// CRUD
// método → GET | POST | PATCH/PUT | DELETE
// Agregar un nuevo local
// Eliminar provedor viejo
// Modificar edad usuario
// Mostrar todos los buzos

const clothes = [
  { id: 1, name: "Remera", price: 12000 },
  { id: 2, name: "Pantalón", price: 25000 },
  { id: 3, name: "Campera", price: 45000 },
  { id: 4, name: "Zapatillas", price: 60000 },
  { id: 5, name: "Gorra", price: 9000 }
]

// Callback que se ejecuta cada vez que recibe una petición
const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', "*")
  response.writeHead(200, { "content-type": "application/json" })
  const method = request.method

  console.log(method)

  switch (method) {
    case "GET":
      response.end("Obtener data")
      break
    case "POST":
      response.end(JSON.stringify("Agregando data"))
      break
    case "PATCH":
      response.end(JSON.stringify("Actualizando data"))
      break
  }
})

// 65000
server.listen(2233, () => {
  console.log("Server en escucha en el puerto 1234")
})
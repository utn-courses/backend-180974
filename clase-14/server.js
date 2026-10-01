import express from "express"
import fs from "node:fs"

// servidor http
const server = express()

server.get("/historial", (request, response) => {
  const historial = JSON.parse(fs.readFileSync("./historial.json", "utf-8"))
  response.json(historial)
})

// 1 - 65000
server.listen(60000)
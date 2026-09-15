import { connect } from "mongoose"
import { MongoClient, ObjectId } from "mongodb"

const connectMongoDb = async () => {
  try {
    await connect("mongodb://localhost:11111")
    console.log("¡Conectado con éxito! :)")
  } catch (error) {
    console.log("Error al conectarse a MongoDb :(")
  }
}

const cliente = new MongoClient("mongodb://localhost:27017")

const db = cliente.db("tienda")
const productos = db.collection("productos")

const argumentos = process.argv.splice(2)
const accion = argumentos[0]
const id = argumentos[1]

const leerProductos = async () => {
  const data = await productos.find().toArray()
  return data
}

// nombre: 'Teclado Redragon',
// precio: 45000,
// stock: 15,
// categoria: 'accesorios'

const agregarProducto = async (nombre: string, precio: number, stock: number, categoria: string) => {
  const nuevoProducto = { nombre, precio, stock, categoria }
  const resultado = await productos.insertOne(nuevoProducto)
  return productos.findOne({ _id: new ObjectId(resultado.insertedId) })
}

const borrarProducto = async (id: ObjectId) => {
  console.log(await productos.findOne({ _id: new ObjectId(id) }))
  await productos.deleteOne({ _id: new ObjectId(id) })
}

interface IProducto {
  nombre: string
  precio: number
  categoria: string
  stock: number
}

const actualizarProducto = async (id: ObjectId, data: any) => {
  const resultado = await productos.updateOne(
    { _id: new ObjectId(id) },
    { $set: data })

  return resultado
}

switch (accion) {
  case "info":
    console.log(`
      read → para leer los productos
      create data → para crear un producto
      update id data → para actualizar un producto
      delete id → para borrar un producto
      `)
    break
  case "read":
    console.log(await leerProductos())
    process.exit(1)
  case "delete":
    await borrarProducto(new ObjectId(id))
    process.exit(1)
  case "update":
    console.log(await actualizarProducto(new ObjectId(id), argumentos[2]))
    process.exit(1)
  case "create":
    // node ./src/index.ts create pc 1000 10 hogar
    const nombre = argumentos[1]
    const precio = +argumentos[2]
    const stock = +argumentos[3]
    const categoria = argumentos[4]

    console.log(await agregarProducto(nombre, precio, stock, categoria))
    process.exit(1)
  default:
    console.log("Comando no existente, utiliza info para el manual de uso")
}
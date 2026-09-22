import mongoose from "mongoose"
import dotenv from "dotenv"
import { errorMonitor } from "node:events"
dotenv.config()

const URI_DB = process.env.URI_DB || ""

const connectDb = async (URI: string) => {
  try {
    await mongoose.connect(URI)
  } catch (e) {
    console.log(`Error al conectar a MongoDb :(`)
  }
}

const args = process.argv.splice(2)
const action = args[0]


interface IProduct {
  name: string
  price: number
  stock: number
  category: string
}

// creación del schema para el producto
const productSchema = new mongoose.Schema<IProduct>({
  name: String,
  price: Number,
  stock: Number,
  category: String
})

// modélo de producto
const Product = mongoose.model("product", productSchema)

// const showProducts = async () => {
//   return await Product.find()
// }

// const getProduct = async (id: string | undefined) => {
//   if (!id) {
//     return "ID is required"
//   }

//   const foundProduct = await Product.findById(id)
//   return foundProduct
// }

const generateError = (message: string, name: string) => {
  const error = new Error(message)
  error.name = name
  return error
}

const handleError = (error: Error) => {
  if (error.name === "CastError") {
    return "Invalid ID"
  }

  if (error.name === "ProductNotFound") {
    return error.message
  }
}

const getProducts = async (id: string | undefined) => {
  try {
    const validateHex = /^[0-9a-fA-F]+$/

    if (!id) {
      return await Product.find({}, { name: 1, _id: 1 })
    }

    // if (id.length !== 24 || !validateHex.test(id)) {
    //   return "Invalid ID"
    // }

    const foundProduct = await Product.findById(id)

    if (!foundProduct) throw generateError("Product not found", "ProductNotFound")

    return foundProduct
  } catch (error) {
    const e = error as Error
    handleError(e)
  }
}

const createProduct = async (data: IProduct) => {
}

const updateProduct = async (id: string, updates: string[]) => {
}

const deleteProduct = async (id: string | undefined) => {
  try {
    if (!id) {
      await Product.deleteMany({})
      return "Products deleted succefully"
    }

    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) throw generateError("Product not found", "ProductNotFound")

    return deletedProduct
  } catch (error) {
    const e = error as Error
    handleError(e)
  }
}

const main = async () => {
  connectDb(URI_DB)

  switch (action) {
    case "info":
      console.log(`
        showAll → para leer los productos
        showOne → para leer un producto
        create data → para crear un producto
        update id data → para actualizar un producto
        delete id → para borrar un producto
      `)
      break
    case "show":
      console.log(await getProducts(args[1]))
      break
    case "delete":
      console.log(await deleteProduct(args[1]))
      break
  }

  await mongoose.disconnect()
}

main()


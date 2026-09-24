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
}, {
  versionKey: false
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

  return error.message
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
    return handleError(e)
  }
}

// create --name bicicleta --price 15000 --stock 10 --category deportes
const createProduct = async (data: string[]) => {
  try {
    // --name bicicleta --price 15000 --stock 10 --category deportes
    const newProduct: IProduct = {
      name: "producto",
      price: 0,
      stock: 0,
      category: "sin categoria"
    }

    if (data[0]?.split("=")[0] !== "name" || !data[0]?.split("=")[1]) {
      console.log("Name is required")
      return
    }

    // name=bicicleta price=15000 stock=10
    for (let i = 0; i < data.length; i++) {
      const prop = data[i]?.split("=") as string[]
      const nameProp = prop[0]
      const value = prop[1]

      switch (nameProp) {
        case "name":
          newProduct.name = value as string
          break
        case "price":
          newProduct.price = value ? Number(value) : newProduct.price
          break
        case "stock":
          newProduct.stock = value ? Number(value) : newProduct.stock
          break
        case "category":
          newProduct.category = value ? value : newProduct.category
          break
        default:
          throw generateError("Invalid data to create product", "InvalidData")
      }
    }
    return await Product.create(newProduct)
  } catch (error) {
    const e = error as Error
    return handleError(e)
  }
}

const updateProduct = async (id: string | undefined, updates: string[]) => {
  try {
    const data: Partial<IProduct> = {}

    for (const update of updates) {
      const [prop, value] = update.split("=")

      if (!value) {
        throw generateError(`Invalid data for ${prop}`, "InvalidData")
      }

      switch (prop) {
        case "name":
          data.name = value
          break
        case "price":
          data.price = +value
          break
        case "stock":
          data.stock = +value
          break
        case "category":
          data.category = value
          break
        default:
          throw generateError("Invalid data to update product", "InvalidData")
      }
    }

    return await Product.findByIdAndUpdate(id, data, { new: true })
  } catch (error) {
    const e = error as Error
    return handleError(e)
  }
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
    return handleError(e)
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
    case "create":
      // --name bicicleta --price 15000 --stock 10 --category deportes
      console.log(await createProduct(args.splice(1)))
      break
    case "update":
      // update 1111111111111 --name="bicicleta LL"
      console.log(await updateProduct(args[1], args.slice(2)))
      break
    case "delete":
      console.log(await deleteProduct(args[1]))
      break
    default:
      console.log("commands: <show | create | update | delete>")
  }

  await mongoose.disconnect()
}

main()


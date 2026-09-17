import mongoose from "mongoose"
process.loadEnvFile()

const URI_DB = process.env.URI_DB || ""

const connectDb = async (URI: string) => {
  try {
    await mongoose.connect(URI)
    console.log("Conectado a MongoDb con éxito :)")
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

const productSchema = new mongoose.Schema<IProduct>({
  name: String,
  price: Number,
  stock: Number,
  category: String
})

const Product = mongoose.model("product", productSchema)

const getProducts = async () => {
  return await Product.find()
}

const getProduct = async (id: string) => {
}

const createProduct = async (data: IProduct) => {
}

const updateProduct = async (id: string, updates: string[]) => {
}

const deleteProduct = async (id: string) => {
}

const main = async () => {
  connectDb(URI_DB)

  switch (action) {
    case "info":
      console.log(`
        read → para leer los productos
        create data → para crear un producto
        update id data → para actualizar un producto
        delete id → para borrar un producto
      `)
      break
    case "read":
      console.log(await getProducts())
      break
  }

  await mongoose.disconnect()
}

main()


import mongoose from "mongoose"

const connectMongoDb = async (uri) => {
  try {
    await mongoose.connect(uri)
    console.log("Conectado a MongoDb")
  } catch (error) {
    console.log("No se pudo conectar a MongoDb")
  }
}

export { connectMongoDb }
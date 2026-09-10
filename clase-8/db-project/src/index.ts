import { connect } from "mongoose"

const connectMongoDb = async () => {
  try {
    await connect("mongodb://localhost:27017")
    console.log("¡Conectado con éxito! :)")
  } catch (error) {
    console.log("Error al conectarse a MongoDb :(")
  }
}

connectMongoDb()
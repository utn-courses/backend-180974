import mongoose from "mongoose"

// 1 - schema → esquema que valida los datos de cada propiedad
const filmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, default: "generica" }
}, {
  versionKey: false
})

// Film.find({title: body.title, producer: body.producer})

// 2 - model → me permite utilizar los métodos de Mongodb
const Film = mongoose.model("Film", filmSchema)

export { Film }
import mongoose from "mongoose"

const filmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, default: "generica" }
}, {
  versionKey: false
})

const Film = mongoose.model("Film", filmSchema)

export { Film }
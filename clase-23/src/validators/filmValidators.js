import z from "zod"

const filmSchema = z.object({
  title: z.string().trim().min(4, "El titulo no puede estar vacio"),
  year: z.coerce.number().int("El año de estreno debe ser un número entero"),
  genre: z.enum(["fantasía", "drama"], "El género debe estar dentro de las posibilidades")
})

export { filmSchema }
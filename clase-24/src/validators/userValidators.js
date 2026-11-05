
import z from "zod"

const registerSchema = z.object({
  name: z.string().trim().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().trim().email("El correo electrónico no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
})

const loginSchema = z.object({
  email: z.string().trim().email("El correo electrónico no es válido"),
  password: z.string().min(1, "La contraseña es obligatoria")
})

export { registerSchema, loginSchema }

import { User } from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const getUsers = async (req, res) => {
  const users = await User.find()
  res.json(users)
}

const registerUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Para agregar un usuario necesitas información" })
    }

    const body = req.body
    const { name, email, password } = body

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos los datos son requeridos" })
    }

    const foundUser = await User.findOne({ email })

    if (foundUser) {
      return res.status(409).json({ error: "Este correo ya se encuentra en uso" })
    }

    const passwordEncrypted = await bcryptjs.hash(password, 10)

    // OK
    const newUser = await User.create({
      name,
      email,
      password: passwordEncrypted
    })

    return res.json(newUser)
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "El correo y la contraseña son obligatorios" })
    }

    // validación de datos
    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({ error: "El correo solo valido con gmail" })
    }

    const foundUser = await User.findOne({ email })

    if (!foundUser) {
      return res.status(401).json({ error: "Credenciales invalidas" })
    }

    const passwordValidated = await bcryptjs.compare(password, foundUser.password)

    if (!passwordValidated) {
      return res.status(401).json({ error: "Credenciales invalidas" })
    }

    // payload → quien es el que se logueo
    // secret_key → autentica el token 
    // opciones de configuración → defina el vencimiento
    const token = jwt.sign({ name: foundUser.name }, "contraseñasupersecreta", { expiresIn: "1h" })

    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

export { getUsers, registerUser, loginUser }
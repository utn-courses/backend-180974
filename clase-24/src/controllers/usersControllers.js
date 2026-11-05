
import { User } from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { successResponse, errorResponse } from "../utils/index.js"
import { registerSchema, loginSchema } from "../validators/userValidators.js"

process.loadEnvFile()

// ==============================
// OBTENER USUARIOS
// ==============================

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password")

    return res.json(
      successResponse(users, "Usuarios recuperados con éxito")
    )
  } catch (error) {
    console.log(error)

    return res.status(500).json(
      errorResponse("Error al recuperar los usuarios", error.message)
    )
  }
}

// ==============================
// REGISTRAR USUARIO
// ==============================

const registerUser = async (req, res) => {
  try {
    // Validar información con Zod
    const validation = registerSchema.safeParse(req.body)

    if (!validation.success) {
      const errors = validation.error.issues.map(e => ({
        origin: e.path[0],
        message: e.message
      }))

      return res.status(400).json(
        errorResponse("Error de validación", errors)
      )
    }

    const { name, email, password } = validation.data

    // Buscar usuario existente
    const foundUser = await User.findOne({ email })

    if (foundUser) {
      return res.status(409).json(
        errorResponse("Este correo ya se encuentra en uso")
      )
    }

    // Encriptar contraseña
    const passwordEncrypted = await bcryptjs.hash(password, 10)

    // Crear usuario
    const newUser = await User.create({
      name,
      email,
      password: passwordEncrypted
    })

    // Excluir contraseña
    const userResponse = newUser.toObject()
    delete userResponse.password

    return res.status(201).json(
      successResponse(userResponse, "Usuario creado exitosamente")
    )
  } catch (error) {
    console.log(error)

    if (error.code === 11000) {
      return res.status(409).json(
        errorResponse("Este correo ya se encuentra en uso")
      )
    }

    if (error.name === "ValidationError") {
      return res.status(400).json(
        errorResponse("Error de validación", error.message)
      )
    }

    return res.status(500).json(
      errorResponse("Error interno del servidor", error.message)
    )
  }
}

// ==============================
// INICIAR SESIÓN
// ==============================

const loginUser = async (req, res) => {
  try {
    // Validar información con Zod
    const validation = loginSchema.safeParse(req.body)

    if (!validation.success) {
      const errors = validation.error.issues.map(e => ({
        origin: e.path[0],
        message: e.message
      }))

      return res.status(400).json(
        errorResponse("Error de validación", errors)
      )
    }

    const { email, password } = validation.data

    // Buscar usuario
    const foundUser = await User.findOne({ email })

    if (!foundUser) {
      return res.status(401).json(
        errorResponse("Credenciales inválidas")
      )
    }

    // Comparar contraseña
    const passwordValidated = await bcryptjs.compare(
      password,
      foundUser.password
    )

    if (!passwordValidated) {
      return res.status(401).json(
        errorResponse("Credenciales inválidas")
      )
    }

    // Generar JWT
    const token = jwt.sign(
      {
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    )

    return res.json(
      successResponse(
        {
          token,
        },
        "Login exitoso"
      )
    )
  } catch (error) {
    console.log(error)

    return res.status(500).json(
      errorResponse("Error interno del servidor", error.message)
    )
  }
}

// ==============================
// EXPORTACIONES
// ==============================

export {
  getUsers,
  registerUser,
  loginUser
}

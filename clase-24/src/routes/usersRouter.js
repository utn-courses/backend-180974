import { Router } from "express"
import { getUsers, registerUser, loginUser } from "../controllers/usersControllers.js"

const usersRouter = Router()

// TODAS LA PETICIONES LLEGAN COMO http://localhost:3000/users
// TODAS LA PETICIONES LLEGAN COMO http://localhost:3000/auth

usersRouter.get("/", getUsers)

// register
usersRouter.post("/register", registerUser)

// http://localhost:3000/users/login
usersRouter.post("/login", loginUser)

export { usersRouter }
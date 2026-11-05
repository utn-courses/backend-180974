import jwt from "jsonwebtoken"

process.loadEnvFile()

const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization

    if (!header) {
      return res.status(401).json({ error: "Token requerido" })
    }

    const token = header.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "Formato de token invalido" })
    }

    const isValid = jwt.verify(token, process.env.JWT_SECRET)

    if (!isValid) {
      return res.status(401).json({ error: "Formato de token invalido" })
    }

    next()
  } catch (error) {
    console.log(error)
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token invalido" })
    }
    console.log(error)
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token vencido" })
    }
    res.status(500).json({ error: "Internal server error" })
  }
}

export { authMiddleware }
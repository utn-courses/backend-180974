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
    const isValid = jwt.verify(token, "contraseñasupersecreta")

    if (!isValid) {
      return res.status(401).json({ error: "Formato de token invalido" })
    }

    next()
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token invalido" })
    }
  }
}

export { authMiddleware }
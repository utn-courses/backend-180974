const sumar = (n1, n2) => {
  if (!n1 || !n2) {
    throw new Error("n1 y n2 son obligatorios")
  }
  return n1 + n2
}

try {
  console.log(sumar(2))
} catch (error) {
  console.log(error.message)
}
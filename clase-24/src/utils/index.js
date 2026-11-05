const successResponse = (data, message) => {
  return {
    success: true,
    data,
    message
  }
}

const errorResponse = (message, error = null) => {
  return {
    success: false,
    error,
    message
  }
}

export { successResponse, errorResponse }
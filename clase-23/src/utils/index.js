const successResponse = (data, message) => {
  return {
    success: true,
    data,
    message
  }
}

const errorResponse = () => {
  return {
    //...
  }
}

export { successResponse, errorResponse }
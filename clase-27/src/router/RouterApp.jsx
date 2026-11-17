import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Auth } from "../views/Auth"
import { Home } from "../views/Home"
import { ProtectedRoute } from "../components/ProtectedRoute"

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route path="/login" element={<ProtectedRoute>
          <Auth />
        </ProtectedRoute>} />
        <Route path="*" element={<h2>No existe la ruta - 404</h2>} />
      </Routes>
    </BrowserRouter>
  )
}

export { RouterApp }
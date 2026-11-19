import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Auth } from "../views/Auth"
import { Home } from "../views/Home"
import { ProtectedRoute } from "../components/ProtectedRoute"
import { Header } from "../components/Header"

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Header />
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
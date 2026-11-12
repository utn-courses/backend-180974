import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from './views/Home.jsx'
import "./index.css"
import { Auth } from './views/Auth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth />
  </StrictMode>,
)

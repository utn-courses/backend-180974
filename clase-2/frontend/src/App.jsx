import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { ListaAlumnos } from "./components/ListaAlumnos.jsx"

const App = () => {
  return (
    <>
      <Header />
      <main>
        <ListaAlumnos />
      </main>
      <Footer />
    </>
  )
}

export { App }
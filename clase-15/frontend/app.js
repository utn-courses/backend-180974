const form = document.querySelector("form")

const fetchingData = async () => {
  try {
    // /api/character → personajes
    const response = await fetch("https://wizard-world-api.herokuapp.com/spells", { method: "GET" })
    if (!response.ok) {
      console.log("No se pudieron conseguir los datos.")
    }
    const data = await response.json()
    const ul = document.querySelector("ul")

    const handleDeleteSpell = async () => {
      const response = await fetch("http://localhost:2233/", { method: "DELETE" })
      const data = await response.json()
      alert(data)
    }

    data.forEach(spell => ul.innerHTML += `
      <div>
        <li>${spell.name}</li>
        <button onclick="handleDeleteSpell()">Borrar nombre</button>
      </div>
      `)

    window.handleDeleteSpell = handleDeleteSpell

  } catch (error) {
    console.log(error)
  }
}

const handleSubmit = async (e) => {
  e.preventDefault()
  const response = await fetch("http://localhost:2233/", { method: "POST" })
  const data = await response.json()
  console.log(data)
}

form.addEventListener("submit", handleSubmit)

fetchingData()
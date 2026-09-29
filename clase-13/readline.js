import readline from "node:readline"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const questions = [
  "¿Cuál es tu nombre?: ",
  "¿Cuál es tu edad?: ",
  "¿Dónde vivís?: ",
  "¿Cuál es tu profesión?: ",
  "¿Cuál es tu comida favorita?: ",
  "¿Cuál es tu color favorito?: ",
  "¿Cuál es tu película favorita?: ",
  "¿Cuál es tu serie favorita?: ",
  "¿Cuál es tu hobby?: ",
  "¿Tenés mascotas?: ",
  "¿Cuál es tu música favorita?: ",
  "¿Cuál es tu lugar favorito?: "
]

const a = []

function preguntar(i) {
  if (i === questions.length) {
    console.log(`Hola ${a[0]}, tenes ${a[1]} años.`)
    console.log(`Vivís en ${a[2]} y sos ${a[3]}.`)
    console.log(`Tu comida favorita es ${a[4]} y tu color favorito es ${a[5]}.`)
    console.log(`Tu película favorita es ${a[6]} y tu serie favorita es ${a[7]}.`)
    console.log(`Tu hobby es ${a[8]} y ${a[9] === "si" ? "tenés mascotas" : "no tenés mascotas"}.`)
    console.log(`Tu música favorita es ${a[10]} y tu lugar favorito es ${a[11]}.`)
    rl.close()
    return
  }

  rl.question(questions[i], (answer) => {
    a.push(answer)
    preguntar(i + 1)
  })
}

preguntar(0)


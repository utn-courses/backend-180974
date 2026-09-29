import os from "os"

console.log(os.platform())
console.log(os.arch())
console.log(os.cpus().length)
console.log(+(os.totalmem() / 1024 ** 3).toFixed(2))
console.log(+(os.freemem() / 1024 ** 3).toFixed(2))


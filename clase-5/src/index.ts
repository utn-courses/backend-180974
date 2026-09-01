class Cuenta {
  public numero: number
  public titular: string
  private saldo: number

  constructor(numero: number, titular: string, saldo: number) {
    this.numero = numero
    this.titular = titular
    this.saldo = saldo
  }

  formatearSaldo(monto?: number) {
    if (monto) {
      return monto.toLocaleString("es-AR")
    }
    return this.saldo.toLocaleString("es-AR")
  }

  mostrarInformacion() {
    console.log(`Número cuenta: ${this.numero}\nTitular: ${this.titular}\nSaldo: ${this.saldo === 0 ? "Sin saldo" : `$${this.formatearSaldo()}`}\n`)
  }

  consultarSaldo() {
    return `${this.saldo === 0 ? "Sin saldo" : `$${this.formatearSaldo()}`}`
  }

  depositarSaldo(monto: number) {
    if (monto <= 0) {
      console.log("El monto a depositar debe ser mayor a 0")
      return
    }

    this.saldo += monto

    console.log(`Nuevo saldo: ${this.consultarSaldo()}`)
  }

  retirarSaldo(monto: number) {
    if (monto <= 0) {
      console.log("El monto a retirar debe ser mayor a 0")
      return
    }

    if (monto > this.saldo) {
      console.log(`Saldo insuficiente, te falta $${this.formatearSaldo(monto - this.saldo)}.`)
      return
    }

    this.saldo -= monto

    console.log(`Nuevo saldo: ${this.consultarSaldo()}`)
  }

  transferirSaldo(cuentaDestino: Cuenta, monto: number) {
    if (monto <= 0) {
      console.log("El monto a transferir debe ser mayor a 0")
      return
    }

    if (monto > this.saldo) {
      console.log(`Saldo insuficiente, te falta $${this.formatearSaldo(monto - this.saldo)}.`)
      return
    }

    this.saldo -= monto

    cuentaDestino.saldo += monto

    console.log(`Tranferencia de $${monto} realizada correctamente.`)
  }
}

// const cuenta1 = new Cuenta("Gabriel Alberini", 1000)

// const resumen = cuenta1.mostrarInformacion()
// console.log(resumen)

// Consultar saldo
// console.log(cuenta1.consultarSaldo())

// Depositar Saldo
// cuenta1.depositarSaldo(1000)
// cuenta1.depositarSaldo(100)
// cuenta1.depositarSaldo(4000)

// Retirar Saldo 
// cuenta1.retirarSaldo(100)

const cuentas: Cuenta[] = []

const crearUsuario = (numero: number, nombre: string, saldo: number) => {
  return new Cuenta(numero, nombre, saldo)
}

const mariano = crearUsuario(1, "Mariano", 2000)
const agustina = crearUsuario(2, "Agustina", 4000)
const jose = crearUsuario(3, "José", 10000)

cuentas.push(mariano, agustina, jose)


// Mostrar información de todos los usuarios
const mostrarInfoCuentas = () => {
  cuentas.forEach(cuenta => cuenta.mostrarInformacion())
}

mostrarInfoCuentas()

// Buscar un cuenta
const buscarCuenta = (numero: number): Cuenta | undefined => {
  return cuentas.find((cuenta) => cuenta.numero === numero)
}

const cuentaEncontrada = buscarCuenta(12)

if (!cuentaEncontrada) {
  console.log("No se encuentra la cuenta")
} else {
  console.log(cuentaEncontrada)
}

console.log(cuentas[0]?.consultarSaldo())
cuentas[1]?.depositarSaldo(1000)
cuentas[2]?.retirarSaldo(9999)

// Transferencia
mariano.transferirSaldo(agustina, 1000)
agustina.mostrarInformacion()
mariano.mostrarInformacion()







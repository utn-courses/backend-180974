"use strict";
// tipos básicos
Object.defineProperty(exports, "__esModule", { value: true });
let edad = 32;
let nombre = "Gabriel";
let status = true;
console.log(edad, nombre, status);
let mascota = "Arandela";
// inferencia de tipo
// mascota = 1
// const nombres: Array<string> = ["Juan", "Pedro", "Ana"]
const nombres = ["Juan", "Pedro", "Ana"];
nombres.push("Mariano");
nombres.push("Rafaela");
nombres.push("Luisina");
console.log(nombres);
const edades = [1, 43, 3, 65, 12];
const persona1 = {
    edad: 13,
    nombre: "Alan",
    dni: 12345678,
    tel: 111111111,
    status: false
};
const persona2 = {
    edad: 20,
    nombre: "Julieta",
    dni: 222222222,
    tel: 44444444,
    status: true
};
const mostrarInfo = (objPersona) => {
    const { nombre, edad, dni, tel, status } = objPersona;
    const saludo = `NOMBRE: ${nombre} | EDAD: ${edad} años | DNI: ${dni} | TEL: ${tel} | STATUS: ${status ? "ACTIVO" : "INACTIVO"}.`;
    return saludo;
};
const info = mostrarInfo(persona2);
const generarCupon = (nombre) => {
    if (!nombre) {
        return false;
    }
    const cupon = crypto.randomUUID();
    return `Hola ${nombre} tu cupón es: ${cupon}. Éxitos :)`;
};
const cuponGenerado = generarCupon("Alan");
console.log(cuponGenerado);
var SexoAnimal;
(function (SexoAnimal) {
    SexoAnimal["MACHO"] = "macho";
    SexoAnimal["HEMBRA"] = "hembra";
})(SexoAnimal || (SexoAnimal = {}));
const gato1 = {
    sexo: SexoAnimal.MACHO,
    nombre: "Tuerca",
    edad: "10 meses",
    gustos: {
        comida: "todo",
        juguetes: ["pelotita", "árbol"],
        cama: ["caja de carton", "silla gamer", "mesa de afuera"]
    }
};
const gato2 = {
    sexo: SexoAnimal.HEMBRA,
    edad: "2 meses",
    nombre: "Peperina",
    gustos: {
        comida: "pescado",
        juguetes: ["tuerca", "árbol"],
        cama: ["sillón"]
    }
};
const gatos = [gato1, gato2];

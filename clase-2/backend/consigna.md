Actividad Práctica Integradora - Nivelación JavaScript
Objetivo

Aplicar los conceptos fundamentales de JavaScript trabajados en clase:

Variables
Funciones
Condicionales
Arrays
Objetos
forEach
map
filter
find
reduce
Funciones flecha
Manipulación de strings

Consigna

Crear un pequeño sistema de gestión de alumnos utilizando JavaScript.

Cada alumno deberá estar representado mediante un objeto con la siguiente estructura:

{
    id: 1,
    nombre: "Juan",
    edad: 22,
    nota: 8,
    activo: true
}

Crear un array llamado alumnos que contenga al menos 6 registros.

Ejemplo:

const alumnos = [
    {
        id: 1,
        nombre: "Juan",
        edad: 22,
        nota: 8,
        activo: true
    },
    {
        id: 2,
        nombre: "Ana",
        edad: 19,
        nota: 10,
        activo: true
    },
    {
        id: 3,
        nombre: "Pedro",
        edad: 24,
        nota: 5,
        activo: false
    }
];
Actividades

1. Mostrar todos los alumnos

Recorrer el array utilizando forEach y mostrar la información de cada alumno por consola.

2. Obtener solamente los nombres

Crear un nuevo array que contenga únicamente los nombres de los alumnos utilizando map.

Resultado esperado:

["Juan", "Ana", "Pedro"]
3. Obtener los alumnos aprobados

Mostrar únicamente los alumnos cuya nota sea mayor o igual a 6.

Utilizar filter.

4. Buscar un alumno por ID

Solicitar un ID y obtener el alumno correspondiente utilizando find.

Ejemplo:

const alumno = alumnos.find(alumno => alumno.id === 2);
5. Obtener los alumnos activos

Mostrar solamente los alumnos cuyo atributo activo sea true.

Utilizar filter.

6. Calcular el promedio de notas

Obtener el promedio general de notas del curso.

Se puede resolver utilizando un ciclo tradicional o el método reduce.

Resultado esperado:

Promedio general: 7.5
7. Crear una función para mostrar información

Crear una función llamada:

mostrarAlumno(alumno)

La función deberá recibir un alumno y mostrar un resultado similar al siguiente:

Alumno: Juan
Edad: 22
Nota: 8
Estado: Activo

La función deberá determinar si el alumno está activo o inactivo utilizando el valor de la propiedad activo.

Desafío adicional

Crear una función llamada:

buscarAlumnosPorNombre(nombre)

La búsqueda debe funcionar sin importar mayúsculas o minúsculas.

Ejemplos válidos:

Ana
ana
ANA
aNa
Pista

Podés utilizar:

toLowerCase()

Ejemplo:

nombre.toLowerCase()
Conceptos aplicados

Al finalizar la actividad, el sistema deberá permitir poner en práctica:

let y const
Variables
Objetos
Arrays
Funciones
Condicionales
forEach
map
filter
find
reduce
Funciones flecha
Manipulación de strings
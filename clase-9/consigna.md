## Consigna: CRUD de libros con MongoDB

Desarrollá una aplicación de consola en TypeScript que permita administrar una colección de **libros** utilizando MongoDB.

La aplicación deberá conectarse a una base de datos llamada `biblioteca` y trabajar con una colección llamada `libros`.

Cada libro deberá contener, como mínimo, los siguientes datos:

* `titulo`
* `autor`
* `precio`
* `stock`

La aplicación deberá permitir realizar las siguientes operaciones desde la consola:

**Crear:** recibir los datos de un libro mediante argumentos de la terminal y guardarlo en MongoDB.

**Leer:** mostrar todos los libros almacenados en la colección.

**Actualizar:** recibir el `ObjectId` de un libro y nuevos datos mediante argumentos, modificar el documento correspondiente y mostrar en consola el libro actualizado.

**Eliminar:** recibir el `ObjectId` de un libro, eliminarlo de la colección y mostrar un mensaje indicando el resultado de la operación.

Las operaciones deberán ejecutarse utilizando argumentos de la línea de comandos, por ejemplo:

```bash
node index.js create "El Principito" "Antoine de Saint-Exupéry" 15000 10
node index.js read
node index.js update ID "El Principito" "Antoine de Saint-Exupéry" 18000 15
node index.js delete ID
```

Utilizá el paquete oficial `mongodb` y `ObjectId` para identificar los documentos.

El objetivo es reproducir el CRUD trabajado anteriormente, pero aplicándolo a una entidad diferente y comprendiendo cómo se realizan las operaciones de creación, consulta, modificación y eliminación directamente sobre MongoDB.

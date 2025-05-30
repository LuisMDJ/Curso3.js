const readline = require('readline');
let biblioteca = {
  libros: [
    {
      id: 1,
      titulo: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      genero: "Realismo mágico",
      disponible: true
    },
    {
      id: 2,
      titulo: "1984",
      autor: "George Orwell",
      genero: "Ciencia ficción",
      disponible: false
    },
    {
      id: 3,
      titulo: "El Principito",
      autor: "Antoine de Saint-Exupéry",
      genero: "Literatura infantil",
      disponible: true
    }
  ],
  ultimoId: 3
};
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function mostrarMenu() {
  console.log("\n=== Gestión de Biblioteca ===");
  console.log("1. Consultar todos los libros");
  console.log("2. Agregar un nuevo libro");
  console.log("3. Actualizar disponibilidad de libro");
  console.log("4. Salir");
  rl.question("Seleccione una opción (1-4): ", (opcion) => {
    switch(opcion) {
      case '1':
        consultarLibros();
        break;
      case '2':
        agregarLibro();
        break;
      case '3':
        actualizarDisponibilidad();
        break;
      case '4':
        console.log("Saliendo del sistema...");
        rl.close();
        return;
      default:
        console.log("Opción no válida. Intente nuevamente.");
        mostrarMenu();
    }
  });
}
function leerDatos(callback) {
  console.log("\nLeyendo datos de la biblioteca...");
  setTimeout(() => {
    callback(null, biblioteca);
  }, 1000);
}
function escribirDatos(nuevosDatos, callback) {
  console.log("\nGuardando cambios en la biblioteca...");
  setTimeout(() => {
    biblioteca = nuevosDatos;
    callback(null, "Datos guardados exitosamente");
  }, 1500);
}
function consultarLibros() {
  leerDatos((error, datos) => {
    if (error) {
      console.error("Error al leer los datos:", error);
      mostrarMenu();
      return;
    }
    console.log("\n=== Libros en la biblioteca ===");
    datos.libros.forEach(libro => {
      console.log(`ID: ${libro.id}`);
      console.log(`Título: ${libro.titulo}`);
      console.log(`Autor: ${libro.autor}`);
      console.log(`Género: ${libro.genero}`);
      console.log(`Disponible: ${libro.disponible ? 'Sí' : 'No'}`);
      console.log("-----------------------");
    });
    mostrarMenu();
  });
}
function agregarLibro() {
  rl.question("Título del libro: ", (titulo) => {
    rl.question("Autor: ", (autor) => {
      rl.question("Género: ", (genero) => {
        leerDatos((error, datos) => {
          if (error) {
            console.error("Error al leer los datos:", error);
            mostrarMenu();
            return;
          }
          const nuevoLibro = {
            id: datos.ultimoId + 1,
            titulo,
            autor,
            genero,
            disponible: true
          };
          const nuevosDatos = {
            libros: [...datos.libros, nuevoLibro],
            ultimoId: datos.ultimoId + 1
          };
          escribirDatos(nuevosDatos, (error, mensaje) => {
            if (error) {
              console.error("Error al guardar los datos:", error);
            } else {
              console.log(`Libro "${titulo}" agregado exitosamente con ID ${nuevoLibro.id}`);
            }
            mostrarMenu();
          });
        });
      });
    });
  });
}
function actualizarDisponibilidad() {
  consultarLibros();
  rl.question("\nIngrese el ID del libro a actualizar: ", (id) => {
    const idNum = parseInt(id);
    leerDatos((error, datos) => {
      if (error) {
        console.error("Error al leer los datos:", error);
        mostrarMenu();
        return;
      }
      const libro = datos.libros.find(l => l.id === idNum);
      if (!libro) {
        console.log("No se encontró un libro con ese ID");
        mostrarMenu();
        return;
      }
      rl.question(`Cambiar disponibilidad de "${libro.titulo}" (actual: ${libro.disponible ? 'disponible' : 'prestado'}). ¿Cambiar a ${libro.disponible ? 'prestado' : 'disponible'}? (s/n): `, (respuesta) => {
        if (respuesta.toLowerCase() === 's') {
          const nuevosLibros = datos.libros.map(l => {
            if (l.id === idNum) {
              return { ...l, disponible: !l.disponible };
            }
            return l;
          });
          const nuevosDatos = {
            libros: nuevosLibros,
            ultimoId: datos.ultimoId
          };
          escribirDatos(nuevosDatos, (error, mensaje) => {
            if (error) {
              console.error("Error al guardar los datos:", error);
            } else {
              console.log(`Disponibilidad del libro "${libro.titulo}" actualizada exitosamente`);
            }
            mostrarMenu();
          });
        } else {
          console.log("Operación cancelada");
          mostrarMenu();
        }
      });
    });
  });
}
console.log("Bienvenido al Sistema de Gestión de Biblioteca");
mostrarMenu();
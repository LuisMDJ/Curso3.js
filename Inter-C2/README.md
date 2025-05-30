Estructura modular:

Funciones separadas para cada operación (consultar, agregar, actualizar)
Manejo claro de callbacks para operaciones asíncronas simuladas


Simulación de operaciones de archivo:

leerDatos() simula la lectura asíncrona con un retraso de 1 segundo
escribirDatos() simula la escritura asíncrona con un retraso de 1.5 segundos


Interfaz de usuario:

Menú interactivo con readline
Validación básica de entradas
Confirmación antes de cambios importantes


Gestión de datos:

Sistema de IDs automáticos
Inmutabilidad al actualizar datos (no se modifican los objetos directamente)
Estado completo de la biblioteca mantenido en memoria


La estructura esta dada de la siguiente manera:
Consultar libros: Muestra todos los libros con sus detalles

Agregar libros: Permite ingresar título, autor y género, asignando un ID automático

Actualizar disponibilidad: Permite cambiar el estado entre disponible/prestado

Persistencia simulada: Usa callbacks para simular lectura/escritura asíncrona
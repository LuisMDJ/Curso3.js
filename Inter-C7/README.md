Introducción:

La aplicación simula un registro científico de descubrimientos planetarios, permitiendo almacenar y visualizar información sobre diferentes cuerpos celestes. Utilicé un enfoque full-stack básico, combinando un backend con Node.js y un frontend sencillo con HTML/CSS.



Desarrollo Técnico:

El proyecto se estructura en tres componentes principales:

Backend Node.js/Express:
Implementé un servidor con rutas RESTful (/planets)
Diseñé un sistema CRUD básico usando un archivo JSON como base de datos
Configuré middlewares para el manejo de datos y archivos estáticos

Frontend Interactivo:
Desarrollé dos vistas principales: catálogo y formulario
Implementé fetch API para la comunicación cliente-servidor
Diseñé una interfaz responsive con temática espacial

Persistencia de Datos:
Utilicé el módulo fs de Node para leer/escribir en planets.json
Implementé validaciones básicas de datos en el servidor
Agregué manejo de errores para casos comunes



Aprendizajes y Conclusiones:

Este proyecto me permitió consolidar varios conceptos clave:

El ciclo completo de una aplicación web simple
Manejo de rutas y peticiones HTTP con Express
Interacción entre frontend y backend
Persistencia de datos sin bases de datos tradicionales

Las principales dificultades que enfrenté fueron la configuración inicial del proyecto y el manejo de CORS, lo que me llevó a investigar y aprender sobre estos temas en profundidad.


Instrucciones de Uso...

Clonar repositorio
Ejecutar: npm install
Iniciar con: npm run dev
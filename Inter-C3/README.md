Explicación:


API utilizada:

Usé la API Ergast Developer (https://ergast.com/mrd/) que proporciona datos históricos de Fórmula 1.



Mejoras implementadas:

Diseño temático de F1 con colores rojos característicos.

Tarjetas de pilotos con su número, nombre, equipo y nacionalidad.

Colores representativos de cada equipo (Red Bull azul, Ferrari rojo, etc.).

Ordenamiento de pilotos por número.

Efectos hover para mejorar la interactividad.

Indicador de carga mientras se obtienen los datos.



Funcionalidad:

Dos botones para obtener datos (con Fetch y con Axios).

Muestra información básica de cada piloto.

Enlace a más información en la Wikipedia.

Manejo de errores con mensajes claros.



Nota sobre los datos:

La API no proporciona directamente el equipo de cada piloto en este endpoint, por lo que implementé una solución básica.

Para una implementación más completa, sería necesario hacer otra solicitud a la API para obtener los equipos.

Estructura HTML:

Se creo una interfaz simple con un botón para agregar pedidos y un contenedor para mostrarlos.

Cada pedido se muestra en una tarjeta con su número, item, estado y tiempo estimado.

Generación de pedidos:

Al hacer clic en el botón, se genera un nuevo pedido con un ID único.

Se selecciona un ítem aleatorio del menú.

El pedido se añade inmediatamente a la interfaz con estado "En Proceso".

Procesamiento asíncrono:

Cada pedido se procesa con un tiempo aleatorio entre 2 y 10 segundos.

Se usa el setTimeout dentro de una Promise para simular el tiempo de preparación.

Se utiliza async/await para manejar la asincronía de manera limpia.

Actualización de estado:

Cuando termina el tiempo de preparación, el estado del pedido cambia a "Completado".

La interfaz se actualiza en tiempo real reflejando este cambio.

Características adicionales implementadas:

Tiempo estimado de preparación que se muestra y actualiza.

Manejo de errores con try/catch.
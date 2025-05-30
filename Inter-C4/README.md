Características del codigo visto:


Verificación de disponibilidad:
Función verificarDisponibilidad() que devuelve una promesa
Rechaza la promesa si no hay mesas suficientes
Actualiza el contador de mesas disponibles al reservar


Envío de confirmación:
Función enviarConfirmacionReserva() con probabilidad de error configurable
Simula el envío asíncrono con setTimeout


Función principal:
hacerReserva() como función async que usa await
Manejo de errores completo con try/catch
Liberación de mesas si falla el envío del correo


Manejo de errores robusto:
Diferentes mensajes para cada tipo de error
Recuperación de recursos (mesas) en caso de fallo posterior
Objeto de retorno con estado y mensaje


Sistema de pruebas:
Función ejecutarPruebas() con casos de prueba
Función mostrarEstado() para ver mesas disponibles

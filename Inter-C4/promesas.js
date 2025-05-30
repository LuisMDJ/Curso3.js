const configuracion = {
    mesasDisponibles: 10,
    probabilidadErrorEnvio: 0.2
  };
  function verificarDisponibilidad(mesasSolicitadas) {
    return new Promise((resolve, reject) => { 
      setTimeout(() => {
        if (mesasSolicitadas <= configuracion.mesasDisponibles) {
          configuracion.mesasDisponibles -= mesasSolicitadas;
          resolve(`Mesas reservadas: ${mesasSolicitadas}. Mesas restantes: ${configuracion.mesasDisponibles}`);
        } else {
          reject(`No hay suficientes mesas disponibles. Solicitud: ${mesasSolicitadas}, Disponibles: ${configuracion.mesasDisponibles}`);
        }
      }, 1000);
    });
  }
  function enviarConfirmacionReserva(nombreCliente) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exito = Math.random() > configuracion.probabilidadErrorEnvio;
        
        if (exito) {
          resolve(`Correo de confirmación enviado a ${nombreCliente}`);
        } else {
          reject(`Error al enviar el correo a ${nombreCliente}`);
        }
      }, 1500);
    });
  }
  async function hacerReserva(nombreCliente, mesasSolicitadas) {
    console.log(`\nIniciando reserva para ${nombreCliente} (${mesasSolicitadas} mesas)`);
    
    try {
      const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);
      console.log(disponibilidad);
      
      const confirmacion = await enviarConfirmacionReserva(nombreCliente);
      console.log(confirmacion);
      
      console.log(`Reserva completada con éxito para ${nombreCliente}`);
      return { success: true, message: 'Reserva exitosa' };
      
    } catch (error) {
      console.error(`Error en la reserva: ${error}`);
      if (error.includes('Error al enviar el correo')) {
        configuracion.mesasDisponibles += mesasSolicitadas;
        console.log(`Mesas liberadas debido a fallo en envío. Disponibles: ${configuracion.mesasDisponibles}`);
      }
      
      return { success: false, message: error };
    }
  }
  function mostrarEstado() {
    console.log(`\nEstado actual: Mesas disponibles: ${configuracion.mesasDisponibles}`);
  }
  async function ejecutarPruebas() {
    mostrarEstado();
    
    await hacerReserva("Juan Pérez", 3);
    mostrarEstado();
    
    await hacerReserva("María García", 12);
    mostrarEstado();
    
    await hacerReserva("Carlos López", 4);
    mostrarEstado();
    
    await hacerReserva("Ana Martínez", 2);
    mostrarEstado();
  }
  
  ejecutarPruebas();
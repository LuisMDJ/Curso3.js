const configuracion = {
    productos: [
      'Café Expreso',
      'Latte Macchiato',
      'Capuchino Vienés',
      'Mocha Blanco',
      'Té Chai',
      'Chocolate Especial',
      'Croissant de Almendra',
      'Panini Integral',
      'Tarta de Manzana'
    ],
    tiempoMinimo: 2000, 
    tiempoMaximo: 10000 
  };
  
  const estadoApp = {
    contadorPedidos: 1,
    pedidosActivos: new Map()
  };
  
  const elementos = {
    botonNuevoPedido: document.getElementById('btn-nuevo-pedido'),
    panelPedidos: document.getElementById('panel-pedidos')
  };
  
  function inicializarApp() {
    elementos.botonNuevoPedido.addEventListener('click', manejarNuevoPedido);
    console.log('Aplicación inicializada correctamente');
  }
  
  function manejarNuevoPedido() {
    const idPedido = generarIdUnico();
    const producto = seleccionarProductoAleatorio();
    
    crearTarjetaPedido(idPedido, producto);
    procesarPedido(idPedido);
  }
  
  function generarIdUnico() {
    return `ped-${Date.now()}-${estadoApp.contadorPedidos++}`;
  }
  
  function seleccionarProductoAleatorio() {
    const indice = Math.floor(Math.random() * configuracion.productos.length);
    return configuracion.productos[indice];
  }
  
  function crearTarjetaPedido(id, producto) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-pedido';
    tarjeta.id = id;
    tarjeta.innerHTML = `
      <h3>Pedido #${id.split('-')[2]}</h3>
      <p><strong>Producto:</strong> ${producto}</p>
      <p><strong>Estado:</strong> <span class="estado estado-proceso">En preparación</span></p>
      <p class="tiempo-estimado">Tiempo estimado: calculando...</p>
    `;
    
    elementos.panelPedidos.appendChild(tarjeta);
    estadoApp.pedidosActivos.set(id, { elemento: tarjeta, completado: false });
  }
  
  async function procesarPedido(idPedido) {
    try {
      const tiempoPreparacion = calcularTiempoPreparacion();
      const tarjeta = estadoApp.pedidosActivos.get(idPedido).elemento;
      
      actualizarTiempoEstimado(tarjeta, tiempoPreparacion);
      
      await esperarTiempoPreparacion(tiempoPreparacion);
      
      marcarPedidoCompletado(idPedido, tarjeta);
      
    } catch (error) {
      console.error(`Error procesando pedido ${idPedido}:`, error);
      mostrarErrorEnTarjeta(idPedido);
    }
  }
  
  function calcularTiempoPreparacion() {
    return Math.floor(
      Math.random() * (configuracion.tiempoMaximo - configuracion.tiempoMinimo + 1)
    ) + configuracion.tiempoMinimo;
  }
  
  function actualizarTiempoEstimado(tarjeta, tiempoMs) {
    const elemento = tarjeta.querySelector('.tiempo-estimado');
    const segundos = (tiempoMs / 1000).toFixed(1);
    elemento.textContent = `Tiempo estimado: ${segundos} segundos`;
  }
  
  function esperarTiempoPreparacion(tiempo) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, tiempo);
    });
  }
  
  function marcarPedidoCompletado(idPedido, tarjeta) {
    const estado = tarjeta.querySelector('.estado');
    const tiempo = tarjeta.querySelector('.tiempo-estimado');
    
    estado.textContent = 'Completado';
    estado.classList.remove('estado-proceso');
    estado.classList.add('estado-completado');
    
    tiempo.textContent = 'Pedido listo para servir';
    estadoApp.pedidosActivos.get(idPedido).completado = true;
  }
  
  function mostrarErrorEnTarjeta(idPedido) {
    const tarjeta = estadoApp.pedidosActivos.get(idPedido).elemento;
    const estado = tarjeta.querySelector('.estado');
    
    estado.textContent = 'Error en preparación';
    estado.style.color = 'red';
  }
  
  document.addEventListener('DOMContentLoaded', inicializarApp);
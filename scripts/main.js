document.addEventListener('DOMContentLoaded', () => {
  const elementos = obtenerElementosUI();
  console.log('Canvas:', elementos.canvas);
  console.log('Slider ángulo:', elementos.slAngulo);
  console.log('Slider velocidad:', elementos.slVelocidad);
  console.log('Slider altura:', elementos.slAltura);
  console.log('Slider gravedad:', elementos.slGravedad);
  console.log('Botón lanzar:', elementos.btnLanzar);
  console.log('Botón reset:', elementos.btnReset);
  console.log('Dato tiempo:', elementos.dTiempo);
  console.log('Dato X:', elementos.dX);
  console.log('Dato Y:', elementos.dY);

  const interfazValida = validarElementosUI(elementos);

  if(!interfazValida){
    console.error('La interfaz no pudo inicializarse correctamente');
    return;
  }

  const ctx = obtenerContextoCanvas(elementos.canvas);

  if(!ctx){
    return;
  }

  actualizarValoresControles(elementos);
  reiniciarDatosTiempoReal(elementos);

  const parametrosIniciales = leerParametrosUI(elementos);
  dibujarEscenaInicial(ctx, elementos.canvas, parametrosIniciales);

  enlazarEventosControles(elementos, (parametrosActualizados) => {
    dibujarEscenaInicial(ctx, elementos.canvas, parametrosActualizados);
  });

  console.log('main.js cargado correctamente');

  const parametrosPrueba = {
    angulo: 45,
    velocidadInicial: 20,
    alturaIncial: 0,
    gravedad: 9.8
  };

  console.log('==============Pruebas del Motor físico========')
  console.log('Parámetros de prueba:', parametrosPrueba);
  console.log('componentes de velocidad:', calcularComponentesVelocidad(20, 45));
  console.log('tiempo de vuelo:', calcularTiempoVuelo(20, 45, 0, 9.8));
  console.log('Altura máxima:', calcularAlturaMaxima(20, 45, 0, 9.8));
  console.log('Alcance horizontal:', calcularAlcanceHorizontal(20, 45, 0, 9.8));
  console.log('Estado en t=1s:', calcularEstadoProyectil(parametrosPrueba, 1));
});
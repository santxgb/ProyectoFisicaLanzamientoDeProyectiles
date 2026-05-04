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

  if (!interfazValida) {
    console.error('La interfaz no pudo inicializarse correctamente');
    return;
  }

  const ctx = obtenerContextoCanvas(elementos.canvas);

  if (!ctx) {
    return;
  }

  let animacionId = null;
  let simulando = false;
  let tiempoActual = 0;
  let trayectoria = [];
  let alturaMaximaRegistrada = 0;

  const deltaTiempo = 0.02;

  actualizarValoresControles(elementos);
  reiniciarDatosTiempoReal(elementos);
  limpiarResultados(elementos);

  const parametrosIniciales = leerParametrosUI(elementos);
  dibujarEscenaInicial(ctx, elementos.canvas, parametrosIniciales);

  enlazarEventosControles(elementos, (parametrosActualizados) => {
    if (!simulando) {
      dibujarEscenaInicial(ctx, elementos.canvas, parametrosActualizados);
    }
  });

  function finalizarSimulacion(estadoFinal) {
    simulando = false;
    animacionId = null;
    cambiarEstadoBotones(elementos, false);

    mostrarResultados(elementos, {
      alcance: estadoFinal.x,
      alturaMaxima: alturaMaximaRegistrada,
      tiempoVuelo: estadoFinal.tiempo
    });

    console.log('Simulación finalizada');
    console.log('Resultados finales:', {
      alcance: estadoFinal.x,
      alturaMaxima: alturaMaximaRegistrada,
      tiempoVuelo: estadoFinal.tiempo
    });
  }

  function iniciarSimulacion() {
    if (simulando) {
      return;
    }

    simulando = true;
    tiempoActual = 0;
    trayectoria = [];

    const parametros = leerParametrosUI(elementos);
    alturaMaximaRegistrada = parametros.alturaInicial;

    reiniciarDatosTiempoReal(elementos);
    limpiarResultados(elementos);
    cambiarEstadoBotones(elementos, true);

    function frameSimulacion() {
      const estado = calcularEstadoProyectil(parametros, tiempoActual);

      if (estado.y > alturaMaximaRegistrada) {
        alturaMaximaRegistrada = estado.y;
      }

      trayectoria.push({
        x: estado.x,
        y: Math.max(estado.y, 0)
      });

      actualizarDatosTiempoReal(elementos, estado);
      dibujarEscenaSimulacion(
        ctx,
        elementos.canvas,
        parametros,
        estado,
        trayectoria
      );

      if (estado.y <= 0 && tiempoActual > 0) {
        actualizarDatosTiempoReal(elementos, {
          ...estado,
          y: 0
        });

        dibujarEscenaSimulacion(
          ctx,
          elementos.canvas,
          parametros,
          {
            ...estado,
            y: 0
          },
          trayectoria
        );

        finalizarSimulacion({
          ...estado,
          y: 0
        });
        return;
      }

      tiempoActual += deltaTiempo;
      animacionId = requestAnimationFrame(frameSimulacion);
    }

    animacionId = requestAnimationFrame(frameSimulacion);
  }

  function reiniciarSimulacion() {
    if (animacionId) {
      cancelAnimationFrame(animacionId);
      animacionId = null;
    }

    simulando = false;
    tiempoActual = 0;
    trayectoria = [];
    alturaMaximaRegistrada = 0;

    cambiarEstadoBotones(elementos, false);
    reiniciarDatosTiempoReal(elementos);
    limpiarResultados(elementos);

    const parametros = leerParametrosUI(elementos);
    dibujarEscenaInicial(ctx, elementos.canvas, parametros);

    console.log('Simulación reiniciada');
  }

  elementos.btnLanzar.addEventListener('click', iniciarSimulacion);
  elementos.btnReset.addEventListener('click', reiniciarSimulacion);

  console.log('main.js cargado correctamente');
});
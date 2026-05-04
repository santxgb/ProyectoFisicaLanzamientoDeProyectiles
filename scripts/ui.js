function obtenerElementosUI() {
  const elementos = {
    canvas: document.getElementById('canvas'),

    slAngulo: document.getElementById('sl-angulo'),
    slVelocidad: document.getElementById('sl-velocidad'),
    slAltura: document.getElementById('sl-altura'),
    slGravedad: document.getElementById('sl-gravedad'),

    valAngulo: document.getElementById('val-angulo'),
    valVelocidad: document.getElementById('val-velocidad'),
    valAltura: document.getElementById('val-altura'),
    valGravedad: document.getElementById('val-gravedad'),

    btnLanzar: document.getElementById('btn-lanzar'),
    btnReset: document.getElementById('btn-reset'),

    dTiempo: document.getElementById('d-tiempo'),
    dX: document.getElementById('d-x'),
    dY: document.getElementById('d-y'),
    dVx: document.getElementById('d-vx'),
    dVy: document.getElementById('d-vy'),
    dVm: document.getElementById('d-vm'),

    resultados: document.getElementById('resultados'),
    resultadosPlaceholder: document.getElementById('resultados-placeholder'),
    rAlcance: document.getElementById('r-alcance'),
    rHmax: document.getElementById('r-hmax'),
    rTvuelo: document.getElementById('r-tvuelo')
  };

  return elementos;
}

function validarElementosUI(elementos) {
  let todoCorrecto = true;

  for (const [nombre, elemento] of Object.entries(elementos)) {
    if (!elemento) {
      console.error(`No se encontró el elemento: ${nombre}`);
      todoCorrecto = false;
    }
  }

  return todoCorrecto;
}

function actualizarValoresControles(elementos) {
  elementos.valAngulo.textContent = `${elementos.slAngulo.value}°`;
  elementos.valVelocidad.textContent = `${elementos.slVelocidad.value} m/s`;
  elementos.valAltura.textContent = `${elementos.slAltura.value} m`;
  elementos.valGravedad.textContent = `${Number(elementos.slGravedad.value).toFixed(1)} m/s²`;
}

function leerParametrosUI(elementos) {
  return {
    angulo: Number(elementos.slAngulo.value),
    velocidadInicial: Number(elementos.slVelocidad.value),
    alturaInicial: Number(elementos.slAltura.value),
    gravedad: Number(elementos.slGravedad.value)
  };
}

function enlazarEventosControles(elementos, alCambiar = null) {
  const controles = [
    elementos.slAngulo,
    elementos.slVelocidad,
    elementos.slAltura,
    elementos.slGravedad
  ];

  controles.forEach((control) => {
    control.addEventListener('input', () => {
      actualizarValoresControles(elementos);

      if (typeof alCambiar === 'function') {
        alCambiar(leerParametrosUI(elementos));
      }
    });
  });
}

function reiniciarDatosTiempoReal(elementos) {
  elementos.dTiempo.textContent = '0.00';
  elementos.dX.textContent = '0.00';
  elementos.dY.textContent = '0.00';
  elementos.dVx.textContent = '0.00';
  elementos.dVy.textContent = '0.00';
  elementos.dVm.textContent = '0.00';
}

function actualizarDatosTiempoReal(elementos, estado) {
  elementos.dTiempo.textContent = estado.tiempo.toFixed(2);
  elementos.dX.textContent = estado.x.toFixed(2);
  elementos.dY.textContent = Math.max(estado.y, 0).toFixed(2);
  elementos.dVx.textContent = estado.vx.toFixed(2);
  elementos.dVy.textContent = estado.vy.toFixed(2);
  elementos.dVm.textContent = estado.velocidad.toFixed(2);
}

function limpiarResultados(elementos) {
  elementos.rAlcance.textContent = '—';
  elementos.rHmax.textContent = '—';
  elementos.rTvuelo.textContent = '—';

  elementos.resultados.style.display = 'none';
  elementos.resultadosPlaceholder.style.display = 'block';
}

function mostrarResultados(elementos, resultados) {
  elementos.rAlcance.textContent = `${resultados.alcance.toFixed(2)} m`;
  elementos.rHmax.textContent = `${resultados.alturaMaxima.toFixed(2)} m`;
  elementos.rTvuelo.textContent = `${resultados.tiempoVuelo.toFixed(2)} s`;

  elementos.resultados.style.display = 'block';
  elementos.resultadosPlaceholder.style.display = 'none';
}

function cambiarEstadoBotones(elementos, simulando) {
  elementos.btnLanzar.disabled = simulando;
}
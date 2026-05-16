function obtenerContextoCanvas(canvas) {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('No se pudo obtener el contexto 2D del canvas');
    return null;
  }

  return ctx;
}

function limpiarCanvas(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function obtenerAlturaMaximaSlider() {
  const sliderAltura = document.getElementById('sl-altura');
  return sliderAltura ? Number(sliderAltura.max) : 80;
}

function calcularEscalaAlturaInicial(canvas) {
  const sueloY = canvas.height - 40;
  const altoDisponible = sueloY - 30;
  const alturaMaximaSlider = obtenerAlturaMaximaSlider();
  const margenVisual = 1.15;

  return altoDisponible / Math.max(alturaMaximaSlider * margenVisual, 1);
}

function calcularEscalaCanvas(canvas, parametros) {
  const origenX = 60;
  const sueloY = canvas.height - 40;

  const anchoDisponible = canvas.width - origenX - 30;
  const altoDisponible = sueloY - 30;

  const alcanceTeorico = calcularAlcanceHorizontal(
    parametros.velocidadInicial,
    parametros.angulo,
    parametros.alturaInicial,
    parametros.gravedad
  );

  const alturaMaximaTeorica = calcularAlturaMaxima(
    parametros.velocidadInicial,
    parametros.angulo,
    parametros.alturaInicial,
    parametros.gravedad
  );

  const margenVisual = 1.15;

  const escalaX = anchoDisponible / Math.max(alcanceTeorico * margenVisual, 1);
  const escalaY = altoDisponible / Math.max(alturaMaximaTeorica * margenVisual, 1);

  return Math.min(escalaX, escalaY, 12);
}

function calcularVistaCanvas(canvas, parametros) {
  const escala = calcularEscalaCanvas(canvas, parametros);
  const escalaAlturaInicial = calcularEscalaAlturaInicial(canvas);

  const alturaInicialVisual = parametros.alturaInicial * escalaAlturaInicial;
  const alturaInicialConEscalaReal = parametros.alturaInicial * escala;

  const desplazamientoY = alturaInicialConEscalaReal - alturaInicialVisual;

  return {
    escala,
    desplazamientoY
  };
}

function convertirCoordenadasAMundoCanvas(canvas, x, y, vista) {
  const origenX = 60;
  const sueloY = canvas.height - 40;

  const escala = typeof vista === 'number' ? vista : vista.escala;
  const desplazamientoY = typeof vista === 'number' ? 0 : vista.desplazamientoY;

  return {
    canvasX: origenX + x * escala,
    canvasY: sueloY - y * escala + desplazamientoY
  };
}

function dibujarCuadricula(ctx, canvas, origenX, origenY) {
  const paso = 50;

  ctx.save();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;

  for (let x = origenX; x <= canvas.width; x += paso) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let x = origenX - paso; x >= 0; x -= paso) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = origenY; y >= 0; y -= paso) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  for (let y = origenY + paso; y <= canvas.height; y += paso) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(100, 160, 255, 0.22)';
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(0, origenY);
  ctx.lineTo(canvas.width, origenY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(origenX, 0);
  ctx.lineTo(origenX, canvas.height);
  ctx.stroke();

  ctx.restore();
}

function dibujarFondo(ctx, canvas) {
  ctx.fillStyle = '#111827';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const origenX = 60;
  const sueloY = canvas.height - 40;

  dibujarCuadricula(ctx, canvas, origenX, sueloY);

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(0, sueloY);
  ctx.lineTo(canvas.width, sueloY);
  ctx.stroke();
}

function dibujarTextoParametros(ctx, parametros) {
  ctx.fillStyle = '#e5e7eb';
  ctx.font = '16px Arial';
  ctx.fillText('Vista del lanzamiento', 20, 30);

  ctx.font = '14px Arial';
  ctx.fillText(`Ángulo: ${parametros.angulo}°`, 20, 55);
  ctx.fillText(`Velocidad inicial: ${parametros.velocidadInicial} m/s`, 20, 75);
  ctx.fillText(`Altura inicial: ${parametros.alturaInicial} m`, 20, 95);
  ctx.fillText(`Gravedad: ${parametros.gravedad.toFixed(1)} m/s²`, 20, 115);
  ctx.fillText('Cámara ajustada sin mover el punto inicial', 20, 135);
}

function dibujarGuiaAngulo(ctx, canvas, parametros, vista) {
  const anguloRad = (parametros.angulo * Math.PI) / 180;

  const inicio = convertirCoordenadasAMundoCanvas(
    canvas,
    0,
    parametros.alturaInicial,
    vista
  );

  const longitudGuia = 60;

  const finX = inicio.canvasX + Math.cos(anguloRad) * longitudGuia;
  const finY = inicio.canvasY - Math.sin(anguloRad) * longitudGuia;

  ctx.save();

  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(inicio.canvasX, inicio.canvasY);
  ctx.lineTo(finX, finY);
  ctx.stroke();

  ctx.restore();
}

function dibujarTrayectoria(ctx, canvas, trayectoria, vista) {
  if (!trayectoria || trayectoria.length < 2) {
    return;
  }

  ctx.save();

  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 2;
  ctx.beginPath();

  trayectoria.forEach((punto, indice) => {
    const { canvasX, canvasY } = convertirCoordenadasAMundoCanvas(
      canvas,
      punto.x,
      punto.y,
      vista
    );

    if (indice === 0) {
      ctx.moveTo(canvasX, canvasY);
    } else {
      ctx.lineTo(canvasX, canvasY);
    }
  });

  ctx.stroke();

  ctx.restore();
}

function dibujarGuiasProyectil(ctx, canvas, estado, vista) {
  const x = estado.x;
  const y = Math.max(estado.y, 0);

  const posicion = convertirCoordenadasAMundoCanvas(canvas, x, y, vista);
  const origen = convertirCoordenadasAMundoCanvas(canvas, 0, 0, vista);

  ctx.save();

  ctx.strokeStyle = 'rgba(251, 191, 36, 0.65)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 6]);

  ctx.beginPath();
  ctx.moveTo(posicion.canvasX, posicion.canvasY);
  ctx.lineTo(posicion.canvasX, origen.canvasY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(origen.canvasX, posicion.canvasY);
  ctx.lineTo(posicion.canvasX, posicion.canvasY);
  ctx.stroke();

  ctx.setLineDash([]);

  ctx.fillStyle = '#fbbf24';
  ctx.font = '12px Arial';

  ctx.fillText(`x = ${x.toFixed(2)} m`, posicion.canvasX + 8, origen.canvasY - 8);
  ctx.fillText(`y = ${y.toFixed(2)} m`, origen.canvasX + 8, posicion.canvasY - 8);

  ctx.restore();
}

function dibujarProyectil(ctx, canvas, x, y, vista) {
  const { canvasX, canvasY } = convertirCoordenadasAMundoCanvas(
    canvas,
    x,
    y,
    vista
  );

  ctx.save();

  ctx.beginPath();
  ctx.arc(canvasX, canvasY, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#f97316';
  ctx.fill();

  ctx.restore();
}

function dibujarEscenaInicial(ctx, canvas, parametros, vista = null) {
  limpiarCanvas(ctx, canvas);

  const vistaUsada = vista || calcularVistaCanvas(canvas, parametros);

  dibujarFondo(ctx, canvas);
  dibujarTextoParametros(ctx, parametros);
  dibujarGuiaAngulo(ctx, canvas, parametros, vistaUsada);
  dibujarProyectil(ctx, canvas, 0, parametros.alturaInicial, vistaUsada);
}

function dibujarEscenaSimulacion(
  ctx,
  canvas,
  parametros,
  estado,
  trayectoria = [],
  vista = null
) {
  limpiarCanvas(ctx, canvas);

  const vistaUsada = vista || calcularVistaCanvas(canvas, parametros);

  dibujarFondo(ctx, canvas);
  dibujarTextoParametros(ctx, parametros);
  dibujarTrayectoria(ctx, canvas, trayectoria, vistaUsada);
  dibujarGuiasProyectil(ctx, canvas, estado, vistaUsada);
  dibujarProyectil(ctx, canvas, estado.x, Math.max(estado.y, 0), vistaUsada);
}
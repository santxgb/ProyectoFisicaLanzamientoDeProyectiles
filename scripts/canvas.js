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

  const escalaX = anchoDisponible / Math.max(alcanceTeorico, 1);
  const escalaY = altoDisponible / Math.max(alturaMaximaTeorica, 1);

  return Math.min(escalaX, escalaY, 12);
}

function convertirCoordenadasAMundoCanvas(canvas, x, y, escala) {
  const origenX = 60;
  const sueloY = canvas.height - 40;

  return {
    canvasX: origenX + x * escala,
    canvasY: sueloY - y * escala
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

function dibujarTextoParametros(ctx, parametros, escala) {
  ctx.fillStyle = '#e5e7eb';
  ctx.font = '16px Arial';
  ctx.fillText('Vista del lanzamiento', 20, 30);

  ctx.font = '14px Arial';
  ctx.fillText(`Ángulo: ${parametros.angulo}°`, 20, 55);
  ctx.fillText(`Velocidad inicial: ${parametros.velocidadInicial} m/s`, 20, 75);
  ctx.fillText(`Altura inicial: ${parametros.alturaInicial} m`, 20, 95);
  ctx.fillText(`Gravedad: ${parametros.gravedad.toFixed(1)} m/s²`, 20, 115);
  ctx.fillText(`Escala: ${escala.toFixed(2)} px/m`, 20, 135);
}

function dibujarGuiaAngulo(ctx, canvas, parametros, escala) {
  const anguloRad = (parametros.angulo * Math.PI) / 180;

  const inicio = convertirCoordenadasAMundoCanvas(
    canvas,
    0,
    parametros.alturaInicial,
    escala
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

function dibujarTrayectoria(ctx, canvas, trayectoria, escala) {
  if (!trayectoria || trayectoria.length < 2) {
    return;
  }

  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 2;
  ctx.beginPath();

  trayectoria.forEach((punto, indice) => {
    const { canvasX, canvasY } = convertirCoordenadasAMundoCanvas(
      canvas,
      punto.x,
      punto.y,
      escala
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

function dibujarProyectil(ctx, canvas, x, y, escala) {
  const { canvasX, canvasY } = convertirCoordenadasAMundoCanvas(
    canvas,
    x,
    y,
    escala
  );

  ctx.beginPath();
  ctx.arc(canvasX, canvasY, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#f97316';
  ctx.fill();
}

function dibujarEscenaInicial(ctx, canvas, parametros) {
  limpiarCanvas(ctx, canvas);

  const escala = calcularEscalaCanvas(canvas, parametros);

  dibujarFondo(ctx, canvas);
  dibujarTextoParametros(ctx, parametros, escala);
  dibujarGuiaAngulo(ctx, canvas, parametros, escala);
  dibujarProyectil(ctx, canvas, 0, parametros.alturaInicial, escala);
}

function dibujarEscenaSimulacion(ctx, canvas, parametros, estado, trayectoria = []) {
  limpiarCanvas(ctx, canvas);

  const escala = calcularEscalaCanvas(canvas, parametros);

  dibujarFondo(ctx, canvas);
  dibujarTextoParametros(ctx, parametros, escala);
  dibujarTrayectoria(ctx, canvas, trayectoria, escala);
  dibujarGuiasProyectil(ctx, canvas, estado, escala);
  dibujarProyectil(ctx, canvas, estado.x, Math.max(estado.y, 0), escala);
}
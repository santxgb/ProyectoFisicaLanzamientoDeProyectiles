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

function convertirCoordenadasAMundoCanvas(canvas, x, y) {
  const origenX = 60;
  const sueloY = canvas.height - 40;
  const escala = 8;

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

function dibujarTextoParametros(ctx, parametros) {
  ctx.fillStyle = '#e5e7eb';
  ctx.font = '16px Arial';
  ctx.fillText('Vista del lanzamiento', 20, 30);

  ctx.font = '14px Arial';
  ctx.fillText(`Ángulo: ${parametros.angulo}°`, 20, 55);
  ctx.fillText(`Velocidad inicial: ${parametros.velocidadInicial} m/s`, 20, 75);
  ctx.fillText(`Altura inicial: ${parametros.alturaInicial} m`, 20, 95);
  ctx.fillText(`Gravedad: ${parametros.gravedad.toFixed(1)} m/s²`, 20, 115);
}

function dibujarGuiaAngulo(ctx, canvas, parametros) {
  const origenX = 60;
  const sueloY = canvas.height - 40;
  const escala = 8;
  const origenY = sueloY - parametros.alturaInicial * escala;

  const longitudGuia = 60;
  const anguloRad = (parametros.angulo * Math.PI) / 180;
  const finX = origenX + Math.cos(anguloRad) * longitudGuia;
  const finY = origenY - Math.sin(anguloRad) * longitudGuia;

  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(origenX, origenY);
  ctx.lineTo(finX, finY);
  ctx.stroke();
}

function dibujarTrayectoria(ctx, canvas, trayectoria) {
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
      punto.y
    );

    if (indice === 0) {
      ctx.moveTo(canvasX, canvasY);
    } else {
      ctx.lineTo(canvasX, canvasY);
    }
  });

  ctx.stroke();
}

function dibujarProyectil(ctx, canvas, x, y) {
  const { canvasX, canvasY } = convertirCoordenadasAMundoCanvas(canvas, x, y);

  ctx.beginPath();
  ctx.arc(canvasX, canvasY, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#f97316';
  ctx.fill();
}

function dibujarEscenaInicial(ctx, canvas, parametros) {
  limpiarCanvas(ctx, canvas);
  dibujarFondo(ctx, canvas);
  dibujarTextoParametros(ctx, parametros);
  dibujarGuiaAngulo(ctx, canvas, parametros);
  dibujarProyectil(ctx, canvas, 0, parametros.alturaInicial);
}

function dibujarEscenaSimulacion(ctx, canvas, parametros, estado, trayectoria = []) {
  limpiarCanvas(ctx, canvas);
  dibujarFondo(ctx, canvas);
  dibujarTextoParametros(ctx, parametros);
  dibujarTrayectoria(ctx, canvas, trayectoria);
  dibujarProyectil(ctx, canvas, estado.x, Math.max(estado.y, 0));
}
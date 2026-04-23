function obtenerContextoCanvas(canvas){
    const ctx = canvas.getContext('2d');

    if(!ctx){
        console.error('No se pudo obtener el contexto 2D del canvas');
        return null;
    }

    return ctx;
}

function limpiarCanvas(ctx, canvas){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarEscenaInicial(ctx, canvas, parametros){
    limpiarCanvas(ctx, canvas);

    //Fondo
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Suelo
    const sueloY = canvas.height - 40;
    ctx.stokeStryle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.beginPath();
    ctx.moveTo(0, sueloY);
    ctx.lineTo(canvas.width, sueloY);
    ctx.stroke();
    
    //Punto de lanzamieto
    const origenX = 60;
    const origenY = sueloY - parametros.alturaInicial * 3;

    ctx.beginPath();
    ctx.arc(origenX, origenY, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();

    //Línea de guía del ángulo
    const longitudGuia = 60;
    const anguloRad = (parametros.angulo * Math.PI) / 180;
    const finX = origenX + Math.cos(anguloRad) * longitudGuia;
    const finY = origenY - Math.sin(anguloRad) * longitudGuia;

    ctx.stokeStryle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(origenX, origenY);
    ctx.lineTo(finX, finY);
    ctx.stroke();

    //Info
    ctx.fillStyle = '#e5e7eb';
    ctx.font = '16px Arial';
    ctx.fillText('Vista previa del lanzamiento', 20, 30);

    ctx.font = '14px Arial';
    ctx.fillText(`Ángulo: ${parametros.angulo}°`, 20, 55);
    ctx.fillText(`Velocidad inicial: ${parametros.velocidadInicial} m/s`, 20, 75);
    ctx.fillText(`Altura inicial: ${parametros.alturaInicial} m`, 20, 95);
    ctx.fillText(`Gravedad: ${parametros.gravedad.toFixed(1)} m/s²`, 20, 115);
}
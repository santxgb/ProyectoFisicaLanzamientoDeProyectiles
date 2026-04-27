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

function dibujarCuadricula(ctx, canvas, origenX, origenY){
    const paso = 50;

    ctx.save();

    // Líneas de cuadrícula
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;

    for(let x = origenX; x <= canvas.width; x += paso){
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for(let x = origenX - paso; x >= 0; x -= paso){
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for(let y = origenY; y >= 0; y -= paso){
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
    for(let y = origenY + paso; y <= canvas.height; y += paso){
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Eje X (suelo) y eje Y (vertical del origen)
    ctx.strokeStyle = 'rgba(100, 160, 255, 0.22)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, origenY); ctx.lineTo(canvas.width, origenY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(origenX, 0); ctx.lineTo(origenX, canvas.height); ctx.stroke();

    ctx.restore();
}

function dibujarEscenaInicial(ctx, canvas, parametros){
    limpiarCanvas(ctx, canvas);

    const sueloY = canvas.height - 40;
    const origenX = 60;

    //Fondo
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    dibujarCuadricula(ctx, canvas, origenX, sueloY);

    //Suelo
    ctx.stokeStryle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, sueloY);
    ctx.lineTo(canvas.width, sueloY);
    ctx.stroke();

    //Punto de lanzamieto
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
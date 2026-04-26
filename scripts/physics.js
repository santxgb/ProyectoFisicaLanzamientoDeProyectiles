function gradosARadianes(grados){
    return (grados * Math.PI) / 180;
}

function calcularComponentesVelocidad(velocidadInicial, anguloGrados){
    const anguloRad = gradosARadianes(anguloGrados);

    return {
        vx: velocidadInicial * Math.cos(anguloRad),
        vy: velocidadInicial * Math.sin(anguloRad)
    };
}

function calcularPosicionX(velocidadInicial, anguloGrados, tiempo){
    const { vx } = calcularComponentesVelocidad(velocidadInicial, anguloGrados);
    return vx * tiempo;
}

function calcularPosicionY(velocidadInicial, anguloGrados, alturaInicial, gravedad, tiempo){
    const { vy } = calcularComponentesVelocidad(velocidadInicial, anguloGrados);
    return alturaInicial + vy * tiempo - 0.5 * gravedad * tiempo * tiempo;
}

function calcularVelocidadX(velocidadInicial, anguloGrados){
    const { vx } = calcularComponentesVelocidad(velocidadInicial, anguloGrados);
    return vx;
}

function calcularVelocidadY(velocidadInicial, anguloGrados, gravedad, tiempo){
    const { vy } = calcularComponentesVelocidad(velocidadInicial, anguloGrados);
    return vy - gravedad * tiempo;
}

function calcularMagnitudVelocidad(vx, vy){
    return Math.sqrt(vx * vx + vy * vy);
}

function calcularAlturaMaxima(velocidadInicial, anguloGrados, alturaInicial, gravedad){
    const { vy } = calcularComponentesVelocidad(velocidadInicial, anguloGrados);
    return alturaInicial + (vy * vy) / (2 * gravedad);
}

function calcularTiempoVuelo(velocidadInicial, anguloGrados, alturaInicial, gravedad){
    const { vy } = calcularComponentesVelocidad(velocidadInicial, anguloGrados);

    const discriminante = vy * vy + 2 * gravedad * alturaInicial;

    if(discriminante < 0){
        return 0;
    }

    return(vy + Math.sqrt(discriminante)) / gravedad;
}

function calcularAlcanceHorizontal(velocidadInicial, anguloGrados, alturaInicial, gravedad){
    const tiempoVuelo = calcularTiempoVuelo(velocidadInicial, anguloGrados, alturaInicial, gravedad);

    return calcularPosicionX(velocidadInicial, anguloGrados, tiempoVuelo);
}

function calcularEstadoProyectil(parametros, tiempo){
    const x = calcularPosicionX(parametros.velocidadInicial, parametros.angulo, tiempo);
    const y = calcularPosicionY(parametros.velocidadInicial, parametros.angulo, parametros.alturaInicial, parametros.gravedad, tiempo);

    const vx = calcularVelocidadX(parametros.velocidadInicial, parametros.angulo);
    const vy = calcularVelocidadY(parametros.velocidadInicial, parametros.angulo, parametros.gravedad, tiempo);

    const velocidad = calcularMagnitudVelocidad(vx, vy);

    return {
        tiempo, 
        x, 
        y,
        vx,
        vy,
        velocidad
    };
}
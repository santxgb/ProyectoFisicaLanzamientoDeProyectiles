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
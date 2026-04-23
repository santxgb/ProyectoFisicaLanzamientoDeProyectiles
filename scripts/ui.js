function obtenerElementosUI(){
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
        dY: document.getElementById('d-y')
    };
    return elementos;
}
function validarElementosUI(elementos){
    let todoCorrecto = true;

for (const [nombre, elemento] of Object.entries(elementos)){
    if(!elemento){
        console.error(`No se encontró el elemento: ${nombre}`);
        todoCorrecto = false;
        }
    }
    return todoCorrecto;
}
function actualizarValoresControles(elementos){ 
    elementos.valAngulo.textContent = `${elementos.slAngulo.value}°`;
    elementos.valVelocidad.textContent = `${elementos.slVelocidad.value}m/s`;
    elementos.valAltura.textContent = `${elementos.slAltura.value}m`;
    elementos.valGravedad.textContent = `${Number(elementos.slGravedad.value).toFixed(1)} m/s²`
    }

const canvas = document.getElementById('canvas');

const slAngulo = document.getElementById('sl-angulo');
const slVelocidad = document.getElementById('sl-velocidad');
const slAltura = document.getElementById('sl-altura');
const slGravedad = document.getElementById('sl-gravedad');

const valAngulo = document.getElementById('val-angulo');
const valVelocidad = document.getElementById('val-velocidad');
const valAltura = document.getElementById('val-altura');
const valGravedad = document.getElementById('val-gravedad');

const btnLanzar = document.getElementById('btn-lanzar');
const btnReset = document.getElementById('btn-reset');

const dTiempo = document.getElementById('d-tiempo');
const dX = document.getElementById('d-x');
const dY = document.getElementById('d-y');

console.log('Canvas:', canvas);
console.log('Slider ángulo:', slAngulo);
console.log('Slider velocidad:', slVelocidad);
console.log('Slider altura:', slAltura);
console.log('Slider gravedad:', slGravedad);
console.log('Botón lanzar:', btnLanzar);
console.log('Botón reset:', btnReset);
console.log('Dato tiempo:', dTiempo);
console.log('Dato X:', dX);
console.log('Dato Y:', dY);

const elementos = {
  canvas,
  slAngulo,
  slVelocidad,
  slAltura,
  slGravedad,
  valAngulo,
  valVelocidad,
  valAltura,
  valGravedad,
  btnLanzar,
  btnReset,
  dTiempo,
  dX,
  dY
};

for (const [nombre, elemento] of Object.entries(elementos)) {
  if (!elemento) {
    console.error(`No se encontró el elemento: ${nombre}`);
  }
}

console.log('Conexión inicial del DOM completada.');
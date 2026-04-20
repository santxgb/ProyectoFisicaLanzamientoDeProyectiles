# Simulador de Física Mecánica: Lanzamiento de Proyectiles

Este proyecto consiste en un Simulador Interactivo de Tiro Parabólico desarrollado para el curso de Física I de la Ingeniería de Sistemas y Computación en la UPTC (Seccional Sogamoso) El software integra modelos matemáticos de cinemática con lógica computacional para visualizar el movimiento en el plano en tiempo real

## Características Principales

* Modelado Matemático Riguroso: Implementación exacta de las ecuaciones físicas para garantizar que el modelo represente fielmente el fenómeno real
* Visualización en Tiempo Real: Panel de datos que muestra variables dinámicas como posición (x, y), tiempo (t) y componentes del vector velocidad (vx, vy).
* Interactividad Total: Uso de controles deslizantes (sliders) para modificar parámetros como ángulo de lanzamiento (θ), velocidad inicial (v0), altura inicial (y0) y gravedad (g).
* Escalado Dinámico: El lienzo (canvas) ajusta su escala automáticamente según el alcance teórico para mantener la visibilidad de la trayectoria.
* Análisis de Resultados: Resumen automático al finalizar el impacto, detallando el alcance total, altura máxima y tiempo de vuelo.

## Fundamentos Físicos

El simulador se basa en los conceptos de cinemática y movimiento en el plano estudiados en el curso:

* Componente Horizontal (MRU): $x(t) = v_0 \cdot \cos(\theta) \cdot t$
* Componente Vertical (MRUA): $y(t) = y_0 + v_0 \cdot \sin(\theta) \cdot t - \frac{1}{2}g \cdot t^2$
* Velocidad en Y: $v_y(t) = v_0 \cdot \sin(\theta) - g \cdot t$
* Velocidad Instantánea: $|V| = \sqrt{v_x^2 + v_y^2}$

## Tecnologías Utilizadas

* Lenguaje: HTML5 y JavaScript (ES6+).
* Renderizado: Canvas API para la representación gráfica y vectores.
* Estilos: CSS3 con diseño de interfaz oscuro (Dark Mode) y organizado.

## Instrucciones de Ejecución

1. Descarga los archivos del proyecto o clona el repositorio.
2. Asegúrate de que el archivo `index.html` y el código fuente estén en la misma carpeta.
3. Abre `index.html` en un navegador web moderno (Chrome, Firefox o Edge).
4. Sigue las instrucciones visibles en la interfaz para ajustar variables y ejecutar la simulación.

## Autores

* Gabriel Santiago Borda Currea - *Ingeniería de Sistemas y Computación* - [Santxgb]
* Carlos Alberto Medina Rosas - *Ingeniería de Sistemas y Computación* - [carlitosmr0213-mr]
* Carlos Manuel Tarquino Bustos - *Ingeniería de Sistemas y Computación* - [Carlos Tarquino]

--------------------------------------------------------------------------------------
Institución: Universidad Pedagógica y Tecnológica de Colombia Seccional Sogamoso (UPTC)

# Cambios en el módulo de canvas — `scripts/canvas.js`

## Objetivo
Este documento registra las modificaciones realizadas a `canvas.js` con el fin de mejorar la visualización del simulador, añadiendo una referencia visual de plano cartesiano en el fondo del canvas.

---

## Cambios estructurales

### Reorganización de `dibujarEscenaInicial`
Las constantes `sueloY` y `origenX` se movieron al inicio de la función para que estén disponibles antes de llamar a `dibujarCuadricula`.

| Antes | Después |
|-------|---------|
| `sueloY` y `origenX` se definían dentro de cada bloque | Se definen al inicio de la función, antes del fondo |

---

## Función añadida

### `dibujarCuadricula(ctx, canvas, origenX, origenY)`
Dibuja una cuadrícula de referencia cartesiana sobre el fondo del canvas, anclada al punto de origen del lanzamiento.

**Parámetros:**
- `ctx` — contexto 2D del canvas
- `canvas` — elemento canvas (para obtener `width` y `height`)
- `origenX` — coordenada X del punto de lanzamiento (fijo en 60px)
- `origenY` — coordenada Y del suelo (`canvas.height - 40`)

**Comportamiento:**

- **Cuadrícula:** líneas verticales y horizontales cada 50px en todas las direcciones desde el origen. Color `rgba(255, 255, 255, 0.04)` — blanco al 4% de opacidad, apenas perceptible para no distraer de la trayectoria.
- **Eje X:** línea horizontal sobre el nivel del suelo. Color `rgba(100, 160, 255, 0.22)` — azul tenue, más visible que la cuadrícula.
- **Eje Y:** línea vertical desde el punto de lanzamiento. Mismo color que el eje X.
- Usa `ctx.save()` y `ctx.restore()` para aislar el estado de dibujo y no afectar el resto de la escena.

**Orden de dibujo en `dibujarEscenaInicial`:**
1. Limpiar canvas
2. Rellenar fondo (`#111827`)
3. `dibujarCuadricula` ← se dibuja aquí, debajo de todo lo demás
4. Suelo, punto de lanzamiento, guía de ángulo, texto informativo

---

## Errores existentes (no corregidos en esta sesión)
- `ctx.stokeStryle` en líneas 60 y 81 — typo de `ctx.strokeStyle`. El suelo y la guía del ángulo no aplican color correctamente por este error. No se corrigió porque estaba fuera del alcance de la tarea.

---

## Estado de avance del canvas
- Contexto y limpieza: completado (desde versión anterior)
- Fondo base: completado (desde versión anterior)
- Cuadrícula cartesiana de referencia: completado
- Suelo: completado (con typo pendiente)
- Punto de lanzamiento: completado (desde versión anterior)
- Guía de ángulo: completado (con typo pendiente)
- Texto informativo de parámetros: completado (desde versión anterior)
- Animación de trayectoria: pendiente

## Conclusión
Pendiente

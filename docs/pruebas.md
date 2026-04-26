# Pruebas del simulador de tiro parabólico

## Objetivo
Este documento registra los casos de prueba realizados sobre el simulador de tiro parabólico, con el fin de verificar su funcionamiento, la correcta interacción de la interfaz y la coherencia de los resultados físicos obtenidos.

## Pruebas funcionales

## Pruebas funcionales

### Caso 1: carga inicial de la interfaz
- Resultado esperado: el simulador debe mostrar canvas, controles y datos iniciales en 0.00
- Resultado obtenido: correcto
- Observaciones: la interfaz carga sin errores y los datos iniciales se muestran correctamente.

### Caso 2: actualización de sliders
- Resultado esperado: al mover los sliders, deben actualizarse los valores visibles de ángulo, velocidad, altura y gravedad
- Resultado obtenido: correcto
- Observaciones: todos los sliders actualizan sus etiquetas en tiempo real y la gravedad se muestra con un decimal.

### Caso 3: reinicio de datos
- Resultado esperado: al presionar el botón de reinicio, los datos deben volver a sus valores iniciales
- Resultado obtenido: pendiente

### Caso 4: vista previa en canvas
- Resultado esperado: al modificar los parámetros, la vista previa del lanzamiento debe actualizarse en el canvas
- Resultado obtenido: correcto
- Observaciones: el punto inicial, la guía del ángulo y el texto informativo cambian correctamente.

### Caso 5: validación de elementos del DOM
- Resultado esperado: todos los elementos necesarios deben encontrarse correctamente desde JavaScript
- Resultado obtenido: correcto
- Observaciones: no se detectaron elementos faltantes ni errores de referencia en consola.

## Pruebas físicas

### Caso 6: lanzamiento base
- Ángulo: 45°
- Velocidad inicial: 20 m/s
- Altura inicial: 0 m
- Gravedad: 9.8 m/s²
- Resultado teórico: pendiente
- Resultado del simulador: pendiente
- Análisis: pendiente

### Caso 7: lanzamiento con altura inicial
- Ángulo: 45°
- Velocidad inicial: 20 m/s
- Altura inicial: 10 m
- Gravedad: 9.8 m/s²
- Resultado teórico: pendiente
- Resultado del simulador: pendiente
- Análisis: pendiente

## Errores encontrados y correcciones
- Se corrigió un id duplicado en el control de altura inicial.
- Se ajustó el manejo de la gravedad para trabajar con valores decimales directamente en el slider.
- Se reorganizó el código para separar interfaz, canvas y archivo principal.

## Estado de avance probado
- Módulo de interfaz: completado
- Módulo de canvas inicial: completado
- Motor físico: pendiente de implementación
- Animación completa: pendiente

## Conclusión
- Pendiente
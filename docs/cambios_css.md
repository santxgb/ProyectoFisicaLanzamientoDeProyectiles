# Cambios en la hoja de estilos — `css/styles.css`

## Objetivo
Este documento registra las correcciones y reglas añadidas a `styles.css` con el fin de establecer el diseño visual completo del simulador: layout en dos columnas, sistema de tarjetas, controles, botones, grilla de datos y tipografía de ecuaciones.

---

## Correcciones de selectores

Los selectores de los botones no coincidían con los IDs definidos en el HTML, por lo que los estilos no se aplicaban.

| Selector incorrecto | Selector corregido |
|---------------------|--------------------|
| `button#lanzar`     | `button#btn-lanzar` |
| `button#reiniciar`  | `button#btn-reset`  |

---

## Reglas añadidas

### Header — `.page-header` / `.subtitle`
- `.page-header`: alineación centrada, padding vertical y separador inferior.
- `.subtitle`: texto en mayúsculas, tamaño extra pequeño, color `--text-muted`, espaciado de letras amplio.

### Layout principal — `.layout`
- CSS Grid de dos columnas: `1fr` para la sección del canvas, `380px` fijos para el panel lateral.
- Ancho máximo de 1400px centrado con `margin: 0 auto` y padding de `1.5rem`.
- `align-items: start` para que ambas columnas arranquen desde arriba sin estirarse.

### Canvas — `.canvas-wrap` / `.canvas-label` / `canvas`
- `.canvas-wrap`: contenedor flex en columna con separación entre la etiqueta y el canvas.
- `.canvas-label`: fuente monoespaciada, color `--text-muted`, uppercase, tamaño xs.
- `canvas`: `display: block; width: 100%; height: auto` para que escale al ancho disponible.

### Panel lateral — `.panel`
- Flex en columna con separación entre tarjetas.
- `max-height: 480px` igualando la altura del canvas.
- `overflow-y: auto` para scroll vertical si el contenido desborda.
- `scrollbar-width: thin` para barra de scroll discreta.

### Tarjetas — `.card` / `.card-title`
- `.card`: fondo `--bg-panel`, borde `--bg-borde`, radio de 8px, padding interno de `1.25rem`.
- `.card-title`: tamaño xl, peso semibold, color `--text-titulo`, separador inferior con `border-bottom`.

### Controles de sliders — `.control-row` / `.control-label`
- `.control-row`: flex en columna, separación de `0.35rem` entre label y slider, margen inferior de `0.85rem` entre controles.
- `.control-label`: `justify-content: space-between` para nombre del parámetro a la izquierda y valor actual a la derecha.
- El span del valor: fuente monoespaciada, color `--acento-azul`, alineado a la derecha.
- `input[type="range"]`: `width: 100%` para ocupar todo el ancho del card.

### Botones — `.btn-row` / `#btn-lanzar` / `#btn-reset`
- `.btn-row`: flex con separación de `0.75rem`, botones con `flex: 1` para ancho igual.
- Ambos botones: `border-radius: 999px` (pill), padding `0.6rem 1.2rem`, cursor pointer.
- Hover: `opacity: 0.85` + `transform: translateY(-1px)` para efecto de elevación.
- `#btn-lanzar`: texto blanco sobre fondo `--acento-naranja`.
- `#btn-reset`: fondo transparente, borde `--bg-borde`, texto `--text-secundario`.

### Datos en tiempo real — `.datos-grid` / `.dato` / `.dato-label` / `.dato-valor`
- `.datos-grid`: grid de 3 columnas iguales con separación de `0.6rem`.
- `.dato`: mini-card con fondo `--bg-canvas`, borde, radio 6px, flex en columna.
- `.dato-label`: tamaño xs, uppercase, color `--text-muted`.
- `.dato-valor`: fuente monoespaciada, color `--acento-ambar`, peso medium.

### Ecuaciones — `.eq` / `.eq p`
- `.eq`: flex en columna con separación mínima entre líneas.
- `.eq p`: fuente monoespaciada, tamaño xs, color `--text-secundario`, `line-height: 1.8`, sin márgenes.

### Resultados — `.resultados-placeholder`
- Texto centrado, cursiva, color `--text-muted`, tamaño sm.

---

## Errores encontrados y correcciones
- Los IDs de los botones en el HTML (`#btn-lanzar`, `#btn-reset`) no coincidían con los selectores del CSS (`#lanzar`, `#reiniciar`), por lo que ningún estilo de botón se aplicaba. Corregido.

---

## Estado de avance del CSS
- Variables y tokens de diseño: completado (desde versión anterior)
- Tipografía base (h1, h2, h3, labels): completado (desde versión anterior)
- Layout principal en dos columnas: completado
- Header: completado
- Canvas y su contenedor: completado
- Panel lateral con scroll: completado
- Sistema de tarjetas: completado
- Controles de sliders: completado
- Botones con estilos correctos: completado
- Grilla de datos en tiempo real: completado
- Bloque de ecuaciones: completado
- Sección de resultados: completado

## Conclusión
La hoja de estilos cubre ahora todos los componentes definidos en el HTML. El diseño sigue el sistema de tokens de color ya establecido en `:root` sin usar valores hardcodeados.

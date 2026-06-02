---
title: Módulo Board
description: Scoreboard de lobby con placeholders, conteo de jugadores y reload en caliente.
---

Paquete: `cl.xgamers.board` · Datos: `plugins/CoreBau/board/`

## Funcionalidad

- Scoreboard visible en el lobby.
- Soporte de **PlaceholderAPI** vía la expansion propia `BoardExpansion`
  (prefijo `%board_%`).
- Conteo de jugadores por servidor backend leyendo el canal del proxy.
- Comando `/board` para alternar visibilidad por jugador y recargar.

## Comando

| Comando         | Permiso        | Descripción                          |
|-----------------|----------------|--------------------------------------|
| `/board toggle` | `board.use`    | Activa o desactiva el scoreboard.    |
| `/board reload` | `board.reload` | Recarga `board/config.yml` en vivo.  |

## Placeholders del módulo

Registrados por `cl.xgamers.board.BoardExpansion`:

| Placeholder                      | Devuelve                                                |
|----------------------------------|---------------------------------------------------------|
| `%board_online%`                 | Total de jugadores conectados en este Paper.            |
| `%board_<server>_online%`        | Jugadores online en el backend `<server>` (cache proxy).|
| `%board_<server>_connected%`     | Alias de `_online`.                                     |
| `%board_<server>_max%`           | Slots máximos del backend `<server>`.                   |

Ejemplo:

```yaml
# board/config.yml
lines:
  - "<gold><bold>CoreBau"
  - ""
  - "<gray>Online: <white>%board_online%</white>"
  - "<gray>Survival: <white>%board_survival_online%/%board_survival_max%</white>"
  - "<gray>Skywars: <white>%board_skywars_online%</white>"
```

## Glifos en la scoreboard

Si configuras una fuente custom de ItemsAdder/Nexo con namespace
`corebau:default`, puedes usar `<font:corebau:default>` en MiniMessage
dentro de las líneas. Ver [Glifos](/es/glifos/overview/).

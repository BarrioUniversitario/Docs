---
title: Módulos — visión general
description: Resumen de cada módulo de CoreBau y dónde vive en el código.
---

| Módulo    | Paquete                       | Subcarpeta              | Función |
|-----------|-------------------------------|-------------------------|---------|
| Board     | `cl.xgamers.board`            | `plugins/CoreBau/board/`    | Scoreboard de lobby con placeholders y conteo de jugadores por servidor. |
| Selector  | `cl.xgamers.selector`         | `plugins/CoreBau/selector/` | GUI brújula de servidores + cola de lobbies + ítem de cosméticos en hotbar. |
| Lobby     | `cl.xgamers.lobby`            | `plugins/CoreBau/lobby/`    | Spawn por servidor, antivoid y todas las protecciones de lobby. |
| Baúl      | `me.davidml16.baul`           | `plugins/CoreBau/baul/`     | Cosméticos, baúles de botín y subsistema **Pets** embebido. |
| NPC       | `dev.blancocl`                | `plugins/CoreBau/npc/`      | NPCs persistentes con skins, hologramas, animaciones y acciones. |
| Profile   | `cl.xgamers.profile`          | `plugins/CoreBau/profile/`  | Menú de perfil del jugador con stats, idioma, ping, etc. |
| Core      | `cl.xgamers.core` (Velocity)  | `plugins/Core/`             | Plugin del proxy que reenvía los canales entre backends. |

## Orden de carga

El orden importa: si `A` depende de `B`, registra `A` **después** de `B`. El
apagado se hace en orden inverso, garantizando que `A` se cierra antes que `B`.

El orden actual en `CoreBauPlugin.registerModules()` es:

1. Board
2. Selector
3. Lobby
4. Baúl (con Pets embebidos)
5. NPC
6. Profile

## Aislamiento de fallos

Cada `enable()` / `disable()` se ejecuta dentro de un `try/catch` en
`CoreBauPlugin`: un módulo que falla **no tira abajo** a los demás. Conviene
que cada módulo logueé los errores en su propio `enable()` para diagnosticar
rápido en consola.

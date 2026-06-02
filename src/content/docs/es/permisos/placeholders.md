---
title: Placeholders nativos
description: Todos los placeholders PAPI que registra CoreBau.
---

CoreBau registra una expansion de PlaceholderAPI por cada módulo que
expone datos al exterior. Todas se cargan automáticamente si
`PlaceholderAPI` está presente como `softdepend`.

## `%baul_%` — módulo Baúl

Registrada por `me.davidml16.baul.PlaceholderHook`.

| Placeholder                  | Devuelve                                     |
|------------------------------|----------------------------------------------|
| `%baul_points%`              | Puntos de botín del jugador.                 |
| `%baul_available%`           | Total de baúles en posesión.                 |
| `%baul_available_<tipo>%`    | Baúles del tipo `<tipo>` (`example`, etc.).  |
| `%baul_owned%`               | Total de cosméticos desbloqueados.           |
| `%baul_equipped%`            | Total de cosméticos actualmente equipados.   |

## `%BetterPets_%` — subsistema de pets

Registrada por `me.davidml16.baul.pets.hooks.PAPIHook`. El identificador
se mantiene como `BetterPets` por compatibilidad histórica con boards
existentes.

| Placeholder                       | Devuelve                                |
|-----------------------------------|-----------------------------------------|
| `%BetterPets_is_active_pet%`      | `true` / `false` si tiene pet activa.   |
| `%BetterPets_pet_name%`           | Nombre serializado de la pet activa.    |
| `%BetterPets_pet_level%`          | Nivel actual.                           |
| `%BetterPets_pet_rarity%`         | Rareza (`COMMON`, `EPIC`, ...).         |
| `%BetterPets_pet_xp%`             | XP actual.                              |
| `%BetterPets_pet_xp_required%`    | XP requerida para subir de nivel.       |
| `%BetterPets_total_pets%`         | Total de pets que posee.                |

## `%board_%` — módulo Board

Registrada por `cl.xgamers.board.BoardExpansion`.

| Placeholder                  | Devuelve                                              |
|------------------------------|-------------------------------------------------------|
| `%board_online%`             | Jugadores conectados en este Paper.                   |
| `%board_<server>_online%`    | Jugadores online en el backend `<server>` (caché).    |
| `%board_<server>_connected%` | Alias de `_online`.                                   |
| `%board_<server>_max%`       | Slots máximos del backend `<server>`.                 |

## `%npc_%` — módulo NPC

Registrada por `dev.blancocl.integration.papi.NpcExpansion`.

| Placeholder                  | Devuelve                                              |
|------------------------------|-------------------------------------------------------|
| `%npc_count%`                | NPCs registrados en este Paper.                       |
| `%npc_server_count_<name>%`  | Conteo cacheado del backend `<name>` (vía proxy).     |
| `%npc_proxy_detected%`       | `true` / `false`.                                     |

## `%profile_%` — módulo Profile

Registrada por `cl.xgamers.profile.ProfileExpansion`.

| Placeholder                  | Devuelve                                                 |
|------------------------------|----------------------------------------------------------|
| `%profile_language%`         | Idioma seleccionado por el jugador.                      |
| `%profile_ping%`             | Ping actual.                                             |
| `%profile_playtime%`         | Tiempo jugado (`Xd Yh Zm`).                              |
| `%profile_playtime_hours%`   | Horas jugadas (entero).                                  |
| `%profile_playtime_minutes%` | Minutos jugados.                                         |
| `%profile_first_join%`       | Primera conexión (`yyyy-MM-dd`).                         |
| `%profile_last_join%`        | Última conexión (`yyyy-MM-dd`).                          |
| `%profile_rank%`             | Grupo primario de LuckPerms o `default`.                 |
| `%profile_server%`           | `gui.head.current-server-name` del config.              |

## Cómo usarlos

Cualquier lugar que acepte placeholders de PAPI sirve: boards, holograms,
GUIs custom, comandos `/papi parse <player> ...`, mensajes de
MiniMessage. Ejemplo en `board/config.yml`:

```yaml
lines:
  - "<gradient:#ff66ff:#66ffff>%player_name%"
  - "<gray>Rango: <white>%profile_rank%"
  - "<gray>Tiempo: <white>%profile_playtime%"
  - "<gray>Pets: <white>%BetterPets_total_pets%"
  - "<gray>Online (red): <white>%board_online%"
```

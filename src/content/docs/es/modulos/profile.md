---
title: Módulo Profile
description: Menú de perfil del jugador con stats, idioma, ping y rango.
---

Paquete: `cl.xgamers.profile` · Datos: `plugins/CoreBau/profile/`

Pequeño módulo que añade un menú de perfil del jugador y una expansion
PAPI con stats útiles para usar en boards, GUIs y holograms.

## Comando

| Comando             | Permiso        | Descripción                       |
|---------------------|----------------|-----------------------------------|
| `/perfil` (`/profile`) | `profile.use` | Abre el menú de perfil del jugador. |

## Placeholders del módulo

Registrados por `cl.xgamers.profile.ProfileExpansion` (`%profile_%`):

| Placeholder                  | Devuelve                                                 |
|------------------------------|----------------------------------------------------------|
| `%profile_language%`         | Idioma seleccionado por el jugador.                      |
| `%profile_ping%`             | Ping actual del jugador en este Paper.                   |
| `%profile_playtime%`         | Tiempo jugado, formato `Xd Yh Zm`.                       |
| `%profile_playtime_hours%`   | Horas jugadas (entero).                                  |
| `%profile_playtime_minutes%` | Minutos jugados.                                         |
| `%profile_first_join%`       | Fecha del primer login (`yyyy-MM-dd`).                   |
| `%profile_last_join%`        | Fecha del último login (`yyyy-MM-dd`).                   |
| `%profile_rank%`             | Grupo primario de LuckPerms o `default`.                 |
| `%profile_server%`           | Nombre del servidor según `gui.head.current-server-name`.|

## Integraciones opcionales

- **LuckPerms** — si está cargado, `%profile_rank%` devuelve el grupo
  primario. Sin LuckPerms devuelve `default`.
- **PlaceholderAPI** — la expansion se registra automáticamente si PAPI
  está presente.

## Idiomas

Las traducciones del menú se cargan desde
`plugins/CoreBau/profile/language/`. Para agregar un idioma copia el YAML
de referencia y cambia la clave de idioma; los jugadores podrán
cambiarse de idioma desde el propio menú.

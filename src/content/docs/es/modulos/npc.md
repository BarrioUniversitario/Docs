---
title: Módulo NPC
description: NPCs persistentes con skins, hologramas, animaciones y acciones de servidor.
---

Paquete: `dev.blancocl` · Datos: `plugins/CoreBau/npc/`

NPCs persistentes basados en `packetevents`. Soportan skins de Mojang,
hologramas (DecentHolograms / HolographicDisplays), animaciones, y
acciones (conectar a servidor, ejecutar comando, etc.).

## Comando raíz

`/npc` (alias: `/npcs`, `/lobbynpc`). Permiso base: `npc.command.use`.

| Subcomando         | Permiso                  | Descripción                                    |
|--------------------|--------------------------|------------------------------------------------|
| `/npc create`      | `npc.command.create`     | Crea un NPC en tu ubicación.                   |
| `/npc edit`        | `npc.command.edit`       | Edita propiedades de un NPC existente.         |
| `/npc remove`      | `npc.command.remove`     | Elimina un NPC.                                |
| `/npc list`        | `npc.command.list`       | Lista todos los NPCs.                          |
| `/npc tp`          | `npc.command.tp`         | TP al NPC.                                     |
| `/npc move`        | `npc.command.move`       | Mueve un NPC a tu ubicación.                   |
| `/npc skin`        | `npc.command.skin`       | Cambia la skin (nombre Mojang).                |
| `/npc hologram`    | `npc.command.hologram`   | Edita el holograma asociado.                   |
| `/npc animation`   | `npc.command.animation`  | Reproduce / asigna animaciones.                |
| `/npc server`      | `npc.command.server`     | Asigna acción de conectar a un backend.        |
| `/npc reload`      | `npc.command.reload`     | Recarga `config.yml`, `messages.yml`, `npcs.yml`. |
| `/npc migrate`     | `npc.command.migrate`    | Migra entre backends de persistencia (YAML ↔ MySQL). |

## Config principal

```yaml
# npc/config.yml
persistence:
  backend: yaml             # yaml | mysql
  mysql:
    host: localhost
    port: 3306
    database: npcs
    user: npc
    password: ""

velocity:
  enabled: true
  channel: "bungeecord:main"

skin:
  fallback: "MHF_Steve"
  preload: []                # nombres a precachear al arrancar

integrations:
  placeholderapi: true
  luckperms: true
  metrics: true

debug:
  enabled: false
```

## Persistencia

- **YAML** (default): `npcs.yml` en la carpeta del módulo.
- **MySQL**: se conecta con HikariCP. La migración entre ambos se hace con
  `/npc migrate`.

## Placeholders del módulo

Registrados por `dev.blancocl.integration.papi.NpcExpansion` (`%npc_%`):

| Placeholder                  | Devuelve                                           |
|------------------------------|----------------------------------------------------|
| `%npc_count%`                | Número de NPCs registrados.                        |
| `%npc_server_count_<name>%`  | Conteo cacheado del backend `<name>` (vía proxy).  |
| `%npc_proxy_detected%`       | `true` / `false`.                                  |

## Acciones soportadas

- **ConnectAction** — usa el canal definido en `velocity.channel`
  (`bungeecord:main` por defecto, compatible con BungeeCord/Velocity).
- **CommandAction** — ejecuta un comando como el jugador o consola.
- **MessageAction** — envía MiniMessage al jugador.

Cada NPC se serializa con su `NpcSnapshotJson` que incluye posición,
skin, hologramas y la lista de acciones por tipo de click.

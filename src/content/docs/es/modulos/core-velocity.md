---
title: Core (Velocity)
description: Plugin de Velocity que reenvía canales y mantiene el estado entre backends.
---

Paquete: `cl.xgamers.core` · Artefacto: `Core-1.0.0.jar`

`Core` es el plugin de Velocity del monorepo. Es **separado** del paper
porque las APIs de Velocity y Bukkit/Paper son incompatibles a nivel de
classloader y entry point (`@Plugin` vs `JavaPlugin`).

## Responsabilidades

- Reenviar los canales **`serverconnector:main`** (Selector / NPC) entre
  backends. El paper envía `connect <serverId>` y el proxy ejecuta el
  cambio sin necesidad de comandos del cliente.
- Reenviar **`baul:sync`** para sincronizar puntos / cosméticos del Baúl
  entre backends.
- Mantener un **cache de conteos** de jugadores por servidor, expuesto al
  paper para que `%board_<server>_online%` y `%npc_server_count_<name>%`
  respondan al instante sin hacer round-trips.

## Estructura

```
velocity/
  build.gradle.kts
  src/main/java/cl/xgamers/core/
  src/main/resources/
    config.properties         (velocity-plugin.json lo genera @Plugin)
```

No usa `plugin.yml`; el `velocity-plugin.json` se genera automáticamente
desde la anotación `@Plugin` del entry point.

## Instalación

1. Construir con `./gradlew :velocity:build`.
2. Copiar `velocity/build/libs/Core-1.0.0.jar` a `plugins/` del proxy.
3. Reiniciar el proxy. Los canales `serverconnector:main` y `baul:sync`
   quedan registrados automáticamente en el `ChannelRegistrar`.

## Configuración

Mínima. Si necesitas tunear el cache de jugadores u otros parámetros, vive
en `plugins/Core/config.properties` (se genera al primer arranque).

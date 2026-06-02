---
title: Módulo Selector
description: Brújula de servidores, cola de lobbies e ítem de cosméticos en el hotbar.
---

Paquete: `cl.xgamers.selector` · Datos: `plugins/CoreBau/selector/`

## Ítems del hotbar

El Selector coloca automáticamente tres ítems al entrar:

| Slot | Material      | Función                                  | NamespacedKey       |
|------|---------------|------------------------------------------|---------------------|
| 0    | `ENDER_CHEST` | Abre el menú de cosméticos del Baúl      | `cosmetics-opener`  |
| 4    | `COMPASS`     | Abre el selector de servidores           | `selector`          |
| 8    | `EMERALD`     | Abre la cola de lobbies                  | `lobby-opener`      |

Todos son configurables en `plugins/CoreBau/selector/config.yml`.

## Comandos

| Comando        | Permiso           | Descripción                                |
|----------------|-------------------|--------------------------------------------|
| `/servidores`  | `selector.use`    | Abre el GUI de selector de servidores.     |
| `/lobbies`     | `selector.use`    | Abre el GUI de cola de lobbies.            |
| `/reload`      | `selector.reload` | Recarga `selector/config.yml` en vivo.     |

## Configuración del ítem de cosméticos

```yaml
# selector/config.yml
cosmetics-item:
  enabled: true
  slot: 0
  material: ENDER_CHEST
  title: "<light_purple><bold>Cosméticos"
  lore:
    - ""
    - "<gray>Administra tus cosméticos"
    - "<light_purple>Click para abrir"
  glowing: false
  click-command: "baul cosmetics"
```

El click ejecuta `click-command` como si el jugador lo escribiera. Por
defecto abre el menú principal del Baúl.

## Conexión vía canal del proxy

El selector envía al jugador al backend usando el canal
`serverconnector:main`. El proxy Velocity (Core) reenvía el mensaje y conecta
al jugador al servidor pedido. Por eso, el cliente no necesita permisos de
proxy para usar el selector.

## Mensajes y sonidos

```yaml
messages:
  welcome: "<gold>¡Bienvenido al lobby!"
  connecting: "<#55FF55>Conectando a <#FFFFFF>{server}<#55FF55>..."

titles:
  enabled: true
  title:    "<#FFAA00><bold>Conectando..."
  subtitle: "<#55FFFF>{server}"
  stay: 40

sounds:
  enabled: true
  connect: ENTITY_ENDERMAN_TELEPORT
```

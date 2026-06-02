---
title: Permisos por módulo
description: Listado completo de permisos del core y de cada módulo.
---

Todos los permisos se conceden con LuckPerms (o cualquier otro gestor
compatible). Los permisos comodín (`*`) deben otorgarse con cuidado
porque dan acceso a comandos administrativos.

## Board

| Permiso         | Otorga                                          |
|-----------------|-------------------------------------------------|
| `board.use`     | Comando `/board toggle` (mostrar/ocultar).      |
| `board.reload`  | Comando `/board reload`.                        |

## Selector

| Permiso            | Otorga                                       |
|--------------------|----------------------------------------------|
| `selector.use`     | `/servidores`, `/lobbies`.                   |
| `selector.reload`  | `/reload` del módulo Selector.               |

## Lobby

| Permiso                       | Otorga                                                      |
|-------------------------------|-------------------------------------------------------------|
| `lobby.setspawn`              | `/setspawn` para guardar el spawn del lobby actual.         |
| `lobby.admin`                 | `/lobbyreload`.                                             |
| `lobby.bypass.drop`           | Soltar ítems con `anti-drop` activo.                        |
| `lobby.bypass.inventory`      | Mover ítems en el inventario.                               |
| `lobby.bypass.build`          | Romper / colocar bloques, cubetas, armor stands.            |
| `lobby.bypass.projectiles`    | Lanzar proyectiles.                                         |

## Baúl

| Permiso                          | Otorga                                                  |
|----------------------------------|---------------------------------------------------------|
| `baul.admin`                     | Comandos administrativos del Baúl (dar baúles, puntos, etc.). |
| `baul.cosmetics.*`               | Acceso a todos los cosméticos (ignora `permission` por entrada). |
| `baul.cosmetic.<id>`             | Acceso al cosmético concreto declarado en su YAML.      |
| `baul.cosmetic.wings.<id>`       | Acceso a una skin de alas concreta (rainbow, halo, etc.). |
| `baul.cosmetic.<species>`        | Acceso a una mascota concreta (`dragon`, `phoenix`, etc.). |
| `baul.animations.*`              | Acceso a todas las animaciones del baúl.                |
| `baul.animations.animation<N>`   | Acceso a la animación número `N`.                       |
| `baul.gadget.<id>`               | Acceso a un gadget concreto (`colorbomb`, `melon`, `paintball`). |

Permisos por entrada de cosmético los define **el YAML del propio
cosmético** en su campo `permission:`. Dejarlo vacío equivale a libre.

## NPC

| Permiso                  | Otorga                                          |
|--------------------------|-------------------------------------------------|
| `npc.command.use`        | Acceso base al comando `/npc`.                  |
| `npc.command.create`     | `/npc create`.                                  |
| `npc.command.edit`       | `/npc edit`.                                    |
| `npc.command.remove`     | `/npc remove`.                                  |
| `npc.command.list`       | `/npc list`.                                    |
| `npc.command.tp`         | `/npc tp`.                                      |
| `npc.command.move`       | `/npc move`.                                    |
| `npc.command.skin`       | `/npc skin`.                                    |
| `npc.command.hologram`   | `/npc hologram`.                                |
| `npc.command.animation`  | `/npc animation`.                               |
| `npc.command.server`     | `/npc server` (acción de conectar a backend).   |
| `npc.command.reload`     | `/npc reload`.                                  |
| `npc.command.migrate`    | `/npc migrate` (YAML ↔ MySQL).                  |

## Profile

| Permiso        | Otorga                                  |
|----------------|-----------------------------------------|
| `profile.use`  | Comando `/perfil` (`/profile`).         |

## Comodines recomendados para staff

```yaml
groups:
  helper:
    permissions:
      - board.use
      - selector.use
      - profile.use
  builder:
    permissions:
      - lobby.bypass.build
      - lobby.bypass.inventory
  npc-editor:
    permissions:
      - npc.command.use
      - npc.command.create
      - npc.command.edit
      - npc.command.move
      - npc.command.skin
      - npc.command.hologram
      - npc.command.list
      - npc.command.tp
  admin:
    permissions:
      - board.*
      - selector.*
      - lobby.*
      - baul.admin
      - baul.cosmetics.*
      - npc.command.*
      - profile.use
```

---
title: Módulo Lobby
description: Spawn por servidor, antivoid y protecciones para que cada Paper sea un lobby.
---

Paquete: `cl.xgamers.lobby` · Datos: `plugins/CoreBau/lobby/`

Convierte cada paper instance en un **lobby completo**: registra el spawn,
teletransporta a jugadores y aplica todas las protecciones esenciales.

## Identificador de lobby

Cada paper debe tener su `server-id` único:

```yaml
# lobby/config.yml
server-id: "lobby1"   # en otro paper: "lobby2", "lobby3", ...
```

`/setspawn` guarda la posición bajo `spawns.<server-id>`. Dos servidores
distintos nunca pisan el mismo spawn aunque compartan el archivo.

## Comandos

| Comando        | Permiso          | Descripción                                          |
|----------------|------------------|------------------------------------------------------|
| `/setspawn`    | `lobby.setspawn` | Guarda la ubicación actual como spawn del lobby.     |
| `/spawn`       | (público)        | Teletransporta al spawn. Usado también en join/respawn. |
| `/lobbyreload` | `lobby.admin`    | Recarga `lobby/config.yml` sin reiniciar.            |

## Protecciones disponibles

| Sección                     | Efecto |
|-----------------------------|--------|
| `antivoid`                  | Devuelve al spawn si el jugador cae bajo `min-y`. |
| `anti-damage`               | Cancela todo daño (incluye VOID si `cancel-void: true`). |
| `anti-hunger`               | Comida y saturación al máximo. |
| `anti-death.keep-inventory` | Activa keep inventory, limpia drops y XP. |
| `anti-drop`                 | Bloquea soltar ítems. `protected-items-only: true` solo bloquea ítems del lobby. |
| `anti-inventory-move`       | Bloquea mover ítems fuera de creativo. |
| `anti-build`                | Bloquea romper/colocar bloques, cubetas, portales, armor stands. |
| `anti-weather`              | Cancela cambios a lluvia/tormenta. |
| `anti-mob-target`           | Impide que los mobs ataquen al jugador. |
| `anti-item-damage`          | Sin pérdida de durabilidad. |
| `anti-projectiles`          | Bloquea lanzar proyectiles. |
| `on-join`                   | TP a spawn + heal completo + `ADVENTURE` + flight on/off. |

## Permisos de bypass

| Permiso                       | Efecto                                              |
|-------------------------------|-----------------------------------------------------|
| `lobby.bypass.drop`           | Permite soltar ítems aun con `anti-drop`.           |
| `lobby.bypass.inventory`      | Permite mover ítems en el inventario.               |
| `lobby.bypass.build`          | Permite construir, romper, cubetas, armor stands.   |
| `lobby.bypass.projectiles`    | Permite lanzar proyectiles.                         |

## Ítems del Selector siempre protegidos

Las tres `NamespacedKey` del Selector (`selector`, `lobby-opener`,
`cosmetics-opener`) **no se pueden soltar ni mover** nunca,
independientemente de `anti-drop.protected-items-only`.

## Config por defecto resumida

```yaml
server-id: "lobby1"
spawns: {}             # lo rellena /setspawn

on-join:
  teleport-to-spawn: true
  heal: true
  gamemode-adventure: true
  allow-flight: false

antivoid:
  enabled: true
  min-y: 0.0
  check-interval-ticks: 10

anti-damage:        { enabled: true, cancel-void: true }
anti-hunger:        { enabled: true }
anti-death:         { keep-inventory: true }
anti-drop:          { enabled: true, protected-items-only: false }
anti-inventory-move:{ enabled: true }
anti-build:         { enabled: true }
anti-weather:       { enabled: true }
anti-mob-target:    { enabled: true }
anti-item-damage:   { enabled: true }
anti-projectiles:   { enabled: true }
```

## Multi-lobby

Para un segundo lobby:

1. Copia el mismo `CoreBau-1.0.0.jar` en el segundo paper.
2. Edita `lobby/config.yml` y pon `server-id: "lobby2"`.
3. Entra como admin y ejecuta `/setspawn`.

`spawns.lobby2` queda aislado de `spawns.lobby1`.

---
title: Arquitectura
description: Cómo se organiza CoreBau — Paper backend + Velocity proxy, módulos bajo un solo JavaPlugin.
---

CoreBau es un **monorepo Gradle** que produce dos artefactos distintos porque
un plugin de Velocity y uno de Paper no pueden ser el mismo `.jar` (APIs y
entry points distintos):

- `CoreBau-1.0.0.jar` — Paper (servidores backend). Fusiona los módulos
  **Board**, **Selector**, **Lobby**, **Baúl** (con el subsistema embebido de
  **Pets**) y **NPC** bajo un único `JavaPlugin`.
- `Core-1.0.0.jar` — Velocity (proxy). Plugin del proxy, separado por
  plataforma.

## Diagrama

```
                         +--------------------------+
                         |   Velocity (proxy)       |
                         |   Core-1.0.0.jar         |
                         +------------+-------------+
                                      |  canal "serverconnector:main"
                                      |  canal "baul:sync"
                         +------------v-------------+
                         |   Paper (backend)        |
                         |   CoreBau-1.0.0.jar      |
                         |  +--------------------+  |
                         |  | Módulo: Board      |  |
                         |  | Módulo: Selector   |  |
                         |  | Módulo: Lobby      |  |
                         |  | Módulo: Baul       |  |
                         |  |  └─ pets (subsis.) |  |
                         |  | Módulo: Npc        |  |
                         |  | Módulo: Profile    |  |
                         |  +--------------------+  |
                         +--------------------------+
```

## Estructura del repo

```
CoreBau/
  settings.gradle.kts     Incluye :common, :velocity, :paper
  build.gradle.kts        Configuración común (Java 21, repos, versión)
  gradle.properties       Versiones centralizadas (paper-api, hikari, etc.)
  gradlew / gradlew.bat   Wrapper de Gradle

  common/                 Código neutral compartido (sin API de plataforma)
    src/main/java/cl/xgamers/corebau/common/protocol/

  velocity/               Core-1.0.0.jar (proxy)
    build.gradle.kts
    src/main/java/cl/xgamers/core/
    src/main/resources/

  paper/                  CoreBau-1.0.0.jar (backend)
    build.gradle.kts      shadowJar + relocations
    src/main/java/
      cl/xgamers/corebau/CoreBauPlugin.java   Main único (JavaPlugin)
      cl/xgamers/corebau/module/Module.java   Interfaz de módulo
      cl/xgamers/board/                       Módulo Board
      cl/xgamers/selector/                    Módulo Selector
      cl/xgamers/lobby/                       Módulo Lobby
      cl/xgamers/profile/                     Módulo Profile
      me/davidml16/baul/                      Módulo Baúl
        └─ pets/                              Subsistema de pets embebido
      dev/blancocl/                           Módulo NPC
    src/main/resources/
      plugin.yml                              Fusionado (todos los comandos)
      board/  selector/  lobby/  baul/  npc/  Recursos por módulo
```

## Interfaz `Module`

El contrato es simple:

```java
// paper/src/main/java/cl/xgamers/corebau/module/Module.java
public interface Module {
    String id();                          // ej. "board" -> subcarpeta de datos
    void enable(CoreBauPlugin plugin);    // se llama en onEnable, en orden
    void disable();                       // se llama en onDisable, en orden inverso
}
```

`CoreBauPlugin` los registra y habilita:

```java
private void registerModules() {
    modules.add(new cl.xgamers.board.Board());
    modules.add(new cl.xgamers.selector.Selector());
    modules.add(new cl.xgamers.lobby.LobbyModule());
    modules.add(new me.davidml16.baul.Main());
    modules.add(new dev.blancocl.NpcPlugin());
}
```

Cada módulo conserva su **paquete original** y su **subcarpeta de datos**
(`plugins/CoreBau/<id>/`). No se renombró nada para no invalidar configs,
nombres de tablas ni datos previos.

## Canales entre Paper y Velocity

- `serverconnector:main` — usado por Selector / NPC para enviar al jugador al
  backend correcto sin pasar por comandos.
- `baul:sync` — sincronización de datos del baúl/cosméticos entre instancias.

El proxy reenvía ambos canales; los módulos del Paper los registran como
`PluginMessageListener`.

---
title: Cómo se hizo el monorepo
description: Decisiones de diseño detrás del unificado en CoreBau.
---

CoreBau partió de varios plugins independientes (Board, Selector, Lobby,
Baúl, Pets, NPC) que compartían usuarios, configs y servidores. La
necesidad fue clara: **una sola release**, una sola fuente de verdad y
menos fricción al desplegar.

## Restricción dura: Paper ≠ Velocity

Un `.jar` no puede ser plugin de Paper **y** de Velocity a la vez. Son
APIs incompatibles y entry points distintos:

- Paper: `extends JavaPlugin` + `plugin.yml`.
- Velocity: anotación `@Plugin` + `velocity-plugin.json`.

Por eso el monorepo genera **dos artefactos**: `CoreBau-1.0.0.jar`
(paper) y `Core-1.0.0.jar` (velocity). El módulo `:common` aloja código
neutral que no depende de ninguna plataforma (estructuras de protocolo,
constantes de canal, etc.).

## Cero rename de paquetes

Al unificar, cada plugin conservó su **paquete original**:

- `cl.xgamers.board`
- `cl.xgamers.selector`
- `cl.xgamers.lobby`
- `me.davidml16.baul`
- `dev.blancocl` (NPC)

¿Por qué? Porque renombrar:

- Invalidaría nombres de tabla de SQL (en SQLite del Baúl o MySQL de NPC).
- Rompería NamespacedKeys ya guardadas en items y entidades.
- Forzaría una migración de datos para cada usuario.

Mantener el paquete fue la regla **número uno** del unificado.

## Interfaz `Module`

El contrato compartido es minúsculo:

```java
public interface Module {
    String id();
    void enable(CoreBauPlugin plugin);
    void disable();
}
```

`CoreBauPlugin` registra todos los módulos, los habilita en orden y
guarda referencias para deshabilitarlos en orden inverso. Cada
`enable()` / `disable()` se ejecuta en un `try/catch`: un módulo que
falla no derriba al resto.

## Dos estilos de porting

Plugins distintos tienen tamaños distintos. Se permiten dos estilos:

### Estilo A — clase liviana (Board, Selector, Lobby)

La clase principal pasa de `extends JavaPlugin` a `implements Module` y
añade helpers delegados (`getServer`, `getLogger`, `getConfig` scopeado
a la subcarpeta del módulo). El resto del código no se toca.

### Estilo B — `Plugin` por delegación (Baúl, NPC)

Para plugins grandes donde 100+ APIs reciben el `Plugin` host
(scheduler, eventos, mensajería), la clase principal implementa
`org.bukkit.plugin.Plugin` **delegando todo** al `CoreBauPlugin`. Así
`this` sigue siendo un `Plugin` válido y el código existente compila
sin tocar nada. Donde una API exige un `JavaPlugin` real (bStats,
registro Brigadier), se pasa el `host` en lugar de `this`.

Ver [Agregar un módulo](/es/implementacion/agregar-modulo/) para los
detalles paso a paso.

## Una sola versión de paper-api

`gradle.properties` centraliza versiones para garantizar coherencia
entre módulos:

```properties
paperApiVersion=1.21-R0.1-SNAPSHOT
hikariVersion=5.1.0
mysqlVersion=8.4.0
adventureVersion=4.17.0
```

No se permite override por módulo.

## Shading y relocations

`paper/build.gradle.kts` usa `shadowJar` con relocations agresivas:

```kotlin
tasks.shadowJar {
    relocate("com.zaxxer.hikari",   "cl.xgamers.libs.hikari")
    relocate("org.bstats",          "cl.xgamers.libs.bstats")
    // ...
}
```

Reglas:

- Adventure / MiniMessage / paper-api → `compileOnly`. **Nunca shadear.**
- HikariCP, MariaDB driver, bStats → shaded + relocated.
- MySQL driver → cargado vía `libraries:` en `plugin.yml` (Paper lo
  baja al primer arranque).

## Canales con Velocity

El paper y el proxy se comunican por dos canales:

- `serverconnector:main` — para conexiones (Selector, NPC actions).
- `baul:sync` — para sincronizar baúl/cosméticos.

El código del canal vive en `:common` para que ambas plataformas
compartan la misma estructura.

## Resultado

- Un único `CoreBau-1.0.0.jar` a desplegar en cada paper.
- Un único `Core-1.0.0.jar` en el proxy.
- Configs por módulo en `plugins/CoreBau/<id>/` sin colisiones.
- Datos previos preservados gracias a no renombrar paquetes ni tablas.

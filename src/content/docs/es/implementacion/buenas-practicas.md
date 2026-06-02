---
title: Buenas prácticas
description: Reglas no negociables y recomendaciones para colaborar en CoreBau.
---

## Un módulo, una subcarpeta

Siempre escribe archivos en `plugin.getModuleFolder("<id>")`, **nunca**
en la raíz de `plugins/CoreBau/`. Esto evita colisiones de `config.yml`
entre módulos.

```java
File file = new File(plugin.getModuleFolder("welcome"), "config.yml");
```

## Recursos con namespace

Los recursos del JAR van bajo `resources/<id>/...` y se leen con la ruta
`"<id>/archivo.yml"`. El `host` los redirige a tu subcarpeta cuando
llamas `saveResource(...)`.

## No shadear lo que provee la plataforma

| Librería               | Estrategia       |
|------------------------|------------------|
| paper-api              | `compileOnly`    |
| Adventure / MiniMessage| `compileOnly`    |
| PlaceholderAPI         | `compileOnly`    |
| packetevents / ProtocolLib | `compileOnly` |
| HikariCP / bStats / drivers | `implementation` + relocate |

Shadear Adventure rompe el classloader del servidor.

## Relocar todo lo que sí se shadea

Si dos módulos traen Hikari, sin reloca acaban en `com.zaxxer.hikari` y
chocan. Únifica versión en `gradle.properties` y reloca a
`cl.xgamers.libs.<algo>`.

## Una sola versión de paper-api

Definida en `gradle.properties` (`paperApiVersion`). No la
sobreescribas por módulo.

## Comandos en un solo lugar

Todos los comandos basados en `plugin.yml` se declaran en el
`plugin.yml` **fusionado** del módulo paper. Si tu módulo registra
comandos por reflection / `commandMap` (como Baúl), no hace falta
declararlos.

## Capturar errores por módulo

`CoreBauPlugin` ya envuelve `enable()` / `disable()` en `try/catch`,
pero no dejes que una excepción se propague sin antes loguearla con
contexto:

```java
@Override
public void enable(CoreBauPlugin plugin) {
    this.plugin = plugin;
    try {
        cargarConfig();
        registrarListeners();
    } catch (Exception ex) {
        plugin.getLogger().severe("[welcome] no se pudo arrancar: " + ex.getMessage());
        throw ex; // que CoreBauPlugin lo aísle
    }
}
```

## Deshabilitar en orden inverso

Si el módulo `A` depende de `B`, registra `A` **después** de `B`. El
apagado se hace en orden inverso: `A` se cierra antes que `B`.

## Conservar paquetes y nombres de tabla al portar

Renombrar invalida datos guardados, configs de usuarios y NamespacedKeys.
**Regla número uno.**

## Persistencia: prefiere async

Toda escritura SQL pasada por Hikari debe ir por el pool async del
módulo. Bloquear el main thread con queries síncronas es la causa
número uno de TPS drops.

```java
plugin.getServer().getScheduler().runTaskAsynchronously(plugin, () -> {
    try (Connection c = pool.getConnection()) {
        // INSERT / UPDATE
    } catch (SQLException ex) { /* log */ }
});
```

## Mensajes: MiniMessage, nunca legacy

CoreBau usa MiniMessage (Adventure). No introduzcas `ChatColor.GOLD` ni
`§6`. Todos los mensajes deben ir por el `MiniMessage.miniMessage()`
del módulo o el helper `Mini` del Baúl (`dev.blancocl.util.Mini`).

## Glifos: namespace estable

Cualquier módulo que renderice texto debe permitir
`<font:corebau:default>` o el namespace que defina el resourcepack en
producción. Ver [Glifos](/es/glifos/overview/).

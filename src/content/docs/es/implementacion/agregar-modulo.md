---
title: Agregar un módulo nuevo
description: Guía paso a paso para añadir un módulo "Welcome" desde cero.
---

Vamos a añadir un módulo de ejemplo llamado **Welcome** bajo el paquete
`cl.xgamers.welcome`.

## Paso 1 — Copiar las fuentes al módulo paper

```
paper/src/main/java/cl/xgamers/welcome/...
paper/src/main/resources/welcome/config.yml
```

Todos los recursos van bajo `welcome/` para evitar colisiones.

## Paso 2 — Convertir la clase principal a `Module`

### Forma A (plugin chico)

```java
package cl.xgamers.welcome;

import cl.xgamers.corebau.CoreBauPlugin;
import cl.xgamers.corebau.module.Module;
import org.bukkit.event.Listener;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;

import java.io.File;

public final class Welcome implements Module, Listener {

    private CoreBauPlugin plugin;
    private FileConfiguration config;

    @Override public String id() { return "welcome"; }

    @Override
    public void enable(CoreBauPlugin plugin) {
        this.plugin = plugin;
        saveDefaultConfig();
        plugin.getServer().getPluginManager().registerEvents(this, plugin);
    }

    @Override
    public void disable() {
        // cancelar tareas, cerrar recursos
    }

    private void saveDefaultConfig() {
        File f = new File(plugin.getModuleFolder("welcome"), "config.yml");
        if (!f.exists()) plugin.saveResource("welcome/config.yml", false);
        config = YamlConfiguration.loadConfiguration(f);
    }

    public FileConfiguration getConfig() {
        if (config == null) saveDefaultConfig();
        return config;
    }
}
```

### Forma B (plugin grande)

Implementa `org.bukkit.plugin.Plugin` delegando al `host`. Usar este
estilo solo si el código existente pasa el plugin a docenas de APIs.
Ver el código de `me.davidml16.baul.Main` y `dev.blancocl.NpcPlugin`
como referencia.

## Paso 3 — Registrar el módulo

En `CoreBauPlugin.registerModules()`:

```java
modules.add(new cl.xgamers.welcome.Welcome());
```

El orden importa: los módulos se habilitan de arriba hacia abajo, y se
deshabilitan en orden inverso. Pon tu módulo **después** de aquel del
que dependas.

## Paso 4 — Declarar comandos en el plugin.yml fusionado

`paper/src/main/resources/plugin.yml`:

```yaml
commands:
  welcome:
    description: Comando del módulo Welcome
    usage: /<command>
    permission: welcome.use
    permission-message: No tienes permiso para usar este comando.
```

Si tu módulo registra comandos por reflection (como Baúl), salta este
paso.

## Paso 5 — Dependencias y shading

En `paper/build.gradle.kts`:

```kotlin
dependencies {
    implementation("com.ejemplo:milib:1.0.0")
}

tasks.shadowJar {
    relocate("com.ejemplo.milib", "cl.xgamers.welcome.libs.milib")
}
```

Reglas:

- Si la librería la provee el servidor o es un plugin (PlaceholderAPI,
  ProtocolLib, packetevents), usa `compileOnly` y no la shadees.
- Adventure y MiniMessage los provee Paper: **nunca** shadees.

## Paso 6 — Compilar y probar

```powershell
.\gradlew.bat :paper:build
```

Arranca un servidor de prueba y verifica en consola:

```
[CoreBau] Módulo habilitado: welcome
```

## Paso 7 — Documentar

Añade una página en `docs/src/content/docs/modulos/welcome.md` y
regístrala en la barra lateral de `docs/astro.config.mjs`.

## Checklist final

- [ ] Paquete propio (`cl.xgamers.welcome`).
- [ ] `id()` único y consistente con la subcarpeta.
- [ ] Recursos bajo `resources/welcome/...`.
- [ ] Config en `plugins/CoreBau/welcome/`.
- [ ] Comando declarado o registrado por reflection.
- [ ] Permisos en el documento [Permisos](/es/permisos/listado/).
- [ ] Si registra placeholders, documentados en
      [Placeholders](/es/permisos/placeholders/).
- [ ] Listeners desregistrados en `disable()`.
- [ ] Sin shading de librerías de plataforma.

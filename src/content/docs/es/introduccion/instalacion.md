---
title: Instalación
description: Cómo desplegar CoreBau en Paper y Core en Velocity.
---

## Backend (Paper)

1. Copiar `CoreBau-1.0.0.jar` a `plugins/` de cada paper instance.
2. Instalar las **dependencias duras**: `ProtocolLib` y `packetevents`.
3. Dependencias **opcionales** (softdepend): `PlaceholderAPI`, `Vault`,
   `LuckPerms`, `HolographicDisplays` o `DecentHolograms`,
   `Multiverse-Core` o `Hyperverse`, `WorldGuard`.
4. Arrancar el servidor. En consola debe aparecer una línea
   `Módulo habilitado: ...` por cada módulo. Cuando el subsistema de pets se
   inicializa correctamente verás también:

   ```
   [Baul] Mascotas cosméticas: subsistema de pets embebido activo.
   ```

Cada módulo crea su propia carpeta de datos:

```
plugins/CoreBau/
  board/      config.yml
  selector/   config.yml
  lobby/      config.yml
  baul/       config.yml, crafting.yml, cosmetics/, gui_layouts/,
              language/, types/, items/, skins/, pets.db
  npc/        config.yml, messages.yml, npcs.yml
  profile/    config.yml, language/
```

:::note
La librería MySQL (`mysql-connector-j`) se descarga al primer arranque vía el
mecanismo `libraries:` del `plugin.yml`. No es necesario shadearla.
:::

## Proxy (Velocity)

1. Copiar `Core-1.0.0.jar` a la carpeta `plugins/` del proxy.
2. Arrancar el proxy. Reenvía automáticamente los canales
   `serverconnector:main` y `baul:sync` entre los servidores backend.

## Migración desde los plugins antiguos

Como los **paquetes y nombres de tablas se conservan**, los datos previos
siguen siendo válidos. Solo cambia la ruta de las configs:

```
plugins/Baul/config.yml      ->  plugins/CoreBau/baul/config.yml
plugins/Board/config.yml     ->  plugins/CoreBau/board/config.yml
plugins/Selector/config.yml  ->  plugins/CoreBau/selector/config.yml
plugins/Npc/config.yml       ->  plugins/CoreBau/npc/config.yml
```

Si no copias nada, cada módulo regenera su `config.yml` por defecto.

:::caution
Si la instalación previa usaba `BetterPets-1.0.0-shaded.jar` como plugin
separado, **bórralo** de `plugins/`. El subsistema de pets ya vive embebido
dentro de `CoreBau-1.0.0.jar` y dejar el JAR antiguo duplica comandos y
listeners.
:::

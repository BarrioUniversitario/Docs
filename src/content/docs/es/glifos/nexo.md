---
title: Glifos con Nexo Engine (1.21.11)
description: Cómo integrar glifos de Nexo Engine con CoreBau en Minecraft 1.21.11.
---

Nexo Engine (sucesor de Oraxen) gestiona los glifos en
`plugins/Nexo/glyphs/`. Cada archivo YAML define un grupo de glifos que
quedan disponibles vía `<font:nexo:default>` o `<glyph:nombre>`.

:::note
Esta guía asume Nexo 1.x compatible con Paper 1.21.11.
:::

## 1. Definir el glifo

Crea o edita `plugins/Nexo/glyphs/corebau.yml`:

```yaml
icon_logo:
  char: ""
  texture: corebau:icons/logo
  ascent: 8
  height: 16
  bitmap_width: 16
  bitmap_height: 16

icon_compass:
  char: ""
  texture: corebau:icons/compass
  ascent: 8
  height: 16
```

Coloca los PNG en:

```
plugins/Nexo/pack/assets/corebau/textures/icons/
  logo.png
  compass.png
```

Recarga Nexo:

```
/nexo pack
/nexo reload
```

Esto regenera el resourcepack y lo publica al cliente conectado.

## 2. Usar el glifo en CoreBau

Nexo emite por defecto la fuente bajo el namespace `nexo:default` (a
menos que cambies el `pack.namespace` en su config). Si quieres usar el
namespace `corebau`, configúralo en Nexo:

```yaml
# plugins/Nexo/settings.yml
Pack:
  namespace: corebau
```

Luego en CoreBau:

### Board

```yaml
# plugins/CoreBau/board/config.yml
lines:
  - "<font:corebau:default></font> <gold><bold>CoreBau"
  - "<gray>Online: <white>%board_online%"
```

### Baúl

```yaml
# plugins/CoreBau/baul/cosmetics/wings.yml
halo_dorado:
  display: "<font:corebau:default></font> <gold><bold>Halo Dorado"
  rarity: MYTHIC
  icon: NETHER_STAR
  shape: HALO
  color: "#ffcc00"
  permission: baul.cosmetic.wings.halo
  price: 12000
```

### NPC

`/npc edit hologram` y usa MiniMessage:

```
<font:corebau:default></font> <aqua>Tienda
```

## 3. Tag `<glyph:>` de Nexo

Nexo también provee un parser `<glyph:icon_logo>` para sus propios
sistemas. Como CoreBau parsea con MiniMessage estándar, **prefiere
siempre la sintaxis `<font:...>` + carácter Unicode** para no depender
del orden de parseo entre plugins.

## 4. Conflictos con ItemsAdder

Si usas **ItemsAdder y Nexo en el mismo servidor** (no recomendado),
ambos publican resourcepacks y solo uno terminará aplicado en el
cliente. Si compartes el namespace `corebau` entre los dos, los glifos
del segundo pack sobrescriben a los del primero. Lo más sano es
mantener un solo plugin de glifos por servidor.

## 5. Verificación

1. El jugador acepta el pack al entrar.
2. Comprueba en chat con `/nexo glyphs icon_logo` que el glifo se
   renderiza para tu sesión.
3. Si aparece como cuadrado vacío:
   - Revisa que `Pack.namespace` coincide con `<font:NS:default>` que usas
     en CoreBau.
   - Ejecuta `/nexo pack` después de editar el YAML.
   - Reconecta al servidor para forzar la recarga del pack.

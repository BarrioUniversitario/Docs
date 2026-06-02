---
title: Glifos con ItemsAdder (1.21.11)
description: Cómo integrar glifos de ItemsAdder con CoreBau en Minecraft 1.21.11.
---

ItemsAdder ofrece su propio sistema de **font_images** para definir
glifos por namespace. CoreBau los consume tal cual vía MiniMessage.

:::note
Esta guía asume ItemsAdder 4.x compatible con 1.21.11. En esa versión,
ItemsAdder ya usa el sistema de `<font>` nativo de Adventure y no
requiere parseos extra.
:::

## 1. Definir el glifo en ItemsAdder

Dentro de `plugins/ItemsAdder/data/items_packs/<tu_pack>/items.yml`:

```yaml
info:
  namespace: corebau

font_images:
  icon_logo:
    path: corebau:icons/logo
    y_position: 8
    height: 16
    char: ""
  icon_compass:
    path: corebau:icons/compass
    y_position: 8
    height: 16
    char: ""
```

Coloca los PNG en:

```
plugins/ItemsAdder/data/resource_pack/assets/corebau/textures/icons/
  logo.png
  compass.png
```

Tras editar, ejecuta en el servidor:

```
/iazip
/iareload
```

Esto genera el resourcepack y lo publica al cliente.

## 2. Usar el glifo en CoreBau

ItemsAdder emite la fuente bajo el namespace que pusiste en `info` (en
este ejemplo `corebau`). Usa `<font:corebau:default>` en MiniMessage.

### Board

```yaml
# plugins/CoreBau/board/config.yml
lines:
  - "<font:corebau:default></font> <gold><bold>CoreBau"
  - ""
  - "<gray>Online: <white>%board_online%"
  - "<font:corebau:default></font> <gray>Brújula"
```

### Selector

```yaml
# plugins/CoreBau/selector/config.yml
cosmetics-item:
  title: "<font:corebau:default></font> <light_purple><bold>Cosméticos"
  lore:
    - "<gray>Pulsa para abrir"
```

### Baúl (cosméticos)

```yaml
# plugins/CoreBau/baul/cosmetics/hats.yml
corona_dorada:
  display: "<font:corebau:default></font> <gold><bold>Corona Dorada"
  rarity: LEGENDARY
  icon: GOLD_INGOT
  material: GOLDEN_HELMET
```

### NPC (display name / hologram)

Edita el NPC con `/npc edit hologram` y usa el tag MiniMessage:

```
<font:corebau:default></font> <gold>Tienda
```

## 3. Alternativa con `<glyph:>`

ItemsAdder también soporta el tag custom `<glyph:icon_logo>` en sus
propios mensajes. **CoreBau emite con MiniMessage estándar**, así que
prefiere `<font:corebau:default>` + carácter Unicode para garantizar el
render en todos los módulos.

## 4. Verificación

1. El jugador entra y acepta el resourcepack (mensaje del servidor).
2. Abre `/board` o el menú del Baúl.
3. Si el glyph aparece como un cuadrado vacío, suele ser:
   - El namespace en MiniMessage no coincide con `info.namespace`.
   - El cliente no aplicó el pack (revisa la opción "Server Resource
     Packs: Enabled" en el cliente).
   - `/iazip` no se ejecutó después de editar el YAML.

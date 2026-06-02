---
title: Glifos — visión general
description: Qué son los glifos y cómo CoreBau los renderiza vía fuentes custom de Minecraft.
---

Los **glifos** son caracteres Unicode que Minecraft renderiza como
imágenes gracias a un *resourcepack* con una fuente custom
(`assets/<namespace>/font/default.json`). Esto permite mostrar iconos,
logos, barras de progreso o letras decorativas en cualquier sitio donde
Minecraft acepte texto.

CoreBau no incluye un resourcepack, pero sí está preparado para usar los
glifos que generen **ItemsAdder** o **Nexo Engine** vía el tag
MiniMessage `<font:namespace:key>`.

## ¿Dónde se pueden usar?

- Líneas del **Board** (`board/config.yml`).
- Títulos / lores de los ítems del **Selector** (`selector/config.yml`).
- Mensajes del **Lobby**.
- Menús del **Baúl**: nombres y lores de cosméticos, GUIs y crafting.
- Hologramas y display name de **NPCs**.
- Menú de **Perfil**.

## Cómo funciona el render

1. El servidor envía un componente Adventure con `font(Key.key("ns","def"))`.
2. El cliente, con el resourcepack cargado, mapea ese namespace a su
   archivo `font/default.json`.
3. Cada glyph definido en el JSON apunta a una imagen PNG dentro del
   pack.

Por tanto, **el servidor no necesita conocer los glifos**: solo emite el
texto con la font correcta y el cliente hace el render.

## Convención recomendada en CoreBau

- Namespace único para iconos del lobby: `corebau`.
- Fuente principal: `corebau:default`.
- Tags MiniMessage:
  - `<font:corebau:default>` para activar la fuente.
  - `</font>` para volver a la fuente normal.

Ejemplo en una line de board:

```yaml
lines:
  - "<font:corebau:default></font> <gold>CoreBau"
  - "<font:corebau:default></font> <gray>%board_online%"
```

Si usas **ItemsAdder** o **Nexo**, los plugins ya generan el JSON de
fuente y publican el resourcepack al cliente; tú solo tienes que
referenciar el glyph por su carácter Unicode.

## Compatibilidad 1.21.11

Tanto ItemsAdder como Nexo soportan 1.21.11. En ambas integraciones lo
único que necesitas asegurar es:

1. El servidor envía el resourcepack al cliente (los dos plugins lo
   hacen automáticamente si el jugador acepta packs).
2. El namespace que pongas en las configs de CoreBau coincida con el del
   resourcepack generado.

Ve a las guías específicas:

- [ItemsAdder (1.21.11)](/es/glifos/itemsadder/)
- [Nexo Engine (1.21.11)](/es/glifos/nexo/)

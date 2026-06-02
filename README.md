# CoreBau Docs

Sitio de documentación construido con [Starlight](https://starlight.astro.build/).

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Comandos

```bash
cd docs

npm install        # instala dependencias la primera vez
npm run dev        # servidor local en http://localhost:4321
npm run build      # genera el sitio estático en dist/
npm run preview    # sirve la build localmente
```

## Estructura

```
docs/
  astro.config.mjs          Config del sitio + barra lateral
  src/
    content.config.ts       Loader/schema de Starlight
    content/docs/           Páginas .md / .mdx
      index.mdx             Home
      introduccion/
      modulos/
      permisos/
      glifos/
      implementacion/
      compilar/
```

## Agregar una página

1. Crear un `.md` dentro de `src/content/docs/<seccion>/` con frontmatter:

   ```md
   ---
   title: Mi nueva página
   description: Resumen corto.
   ---
   ```

2. Añadirla a la barra lateral en `astro.config.mjs` (campo `sidebar`).

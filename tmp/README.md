# Barrio Universitario

Bienvenido a **Barrio Universitario**, un colectivo dedicado a construir herramientas y plugins open source para infraestructura de redes de Minecraft. Desarrollamos desde sistemas en el proxy hasta experiencias para el jugador, manteniendo el código limpio, modular y fácil de extender.

---

## Repositorios

| Repo | Descripción | Stack |
|------|-------------|-------|
| [Baul](https://github.com/BarrioUniversitario/Baul) | Plugin tipo crate con más de 25 animaciones de apertura, sistema de rarezas y gestión completa por GUI | Paper, Java |
| [Board](https://github.com/BarrioUniversitario/Board) | Plugin de scoreboard animado con títulos arcoíris y conteo de jugadores multi-servidor en tiempo real | Paper, Java |
| [Core](https://github.com/BarrioUniversitario/Core) | Plugin de proxy Velocity: conmutación entre servidores, reenvío de canales y caché de conteos | Velocity, Java |
| [Npc](https://github.com/BarrioUniversitario/Npc) | NPCs interactivos en el lobby con hologramas dinámicos, conteos en vivo y conexión cruzada al backend correspondiente | Paper, Java |
| [Selector](https://github.com/BarrioUniversitario/Selector) | GUI de selector de servidores con enrutamiento inteligente de lobby, seguimiento de slots en tiempo real y soporte MiniMessage | Paper, Java |
| [Docs](https://github.com/BarrioUniversitario/Docs) | Documentación oficial del stack, construida con Astro Starlight | Astro, Markdown |

---

## Creaciones

Todo lo que publicamos gira alrededor de una sola arquitectura de red:

```
Jugador → Velocity (Core) → Backends Paper (Board, Selector, Npc, Baul)
```

- **Core** funciona como el hub de mensajería de toda la red: enruta conexiones entre backends, sincroniza datos del Baúl y mantiene un caché de conteos de jugadores expuesto a los plugins de Paper.
- **Selector** ofrece una GUI pulida para explorar y unirse a servidores, alimentada en tiempo real por los datos que entrega Core.
- **Npc** coloca NPCs en el lobby que actúan como atajos visuales hacia cada backend: hologramas con conteos en vivo, animaciones y conexión cruzada vía Core sin pasar por la GUI del Selector.
- **Board** muestra esos mismos datos en vivo directamente en el scoreboard del jugador, con animaciones suaves.
- **Baul** recompensa a los jugadores con cofres de loot personalizables, con soporte de crafteo, regalos y un editor completo de recompensas.

En conjunto forman un stack de red completo y listo para producción.

---

## Contribuir

Aceptamos pull requests, reportes de bugs y sugerencias en todos los repositorios.

1. Hacer fork del repositorio al que se quiere contribuir.
2. Crear una rama: `git switch -c feat/tu-feature`.
3. Realizar los cambios y probarlos en un servidor local.
4. Hacer commit siguiendo [conventional commits](https://www.conventionalcommits.org/): `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.
5. Abrir un pull request describiendo qué cambió y por qué.

Si no se sabe por dónde empezar, lo mejor es abrir primero un issue para discutir el enfoque.

---

## Cambios Recientes

| Repo | Cambio |
|------|--------|
| Baul | Migrado desde ACubelets: paquetes renombrados a `me.davidml16.baul` y sistema de build actualizado |
| Board | Se añadió `BoardServerRegistry` para el mapeo de placeholders multi-servidor y `RainbowAnimator` para títulos con degradado |
| Core | Reenvío de los canales `serverconnector:main` (Selector / NPC) y `baul:sync` entre backends; caché de conteos de jugadores expuesto a Paper para que `%board_<server>_online%` y `%npc_server_count_<name>%` respondan al instante; nuevo `LobbyKickListener`; configuración externa en `plugins/Core/config.properties` generada al primer arranque; descriptor `velocity-plugin.json` generado automáticamente desde la anotación `@Plugin` (sin `plugin.yml`) |
| Npc | Hologramas dinámicos con placeholders `%npc_server_count_<name>%` alimentados por el caché de Core; conexión cruzada al backend vía canal `serverconnector:main`; soporte MiniMessage en líneas de holograma |
| Selector | Enrutamiento inteligente de lobby con cadenas de respaldo, refresco de GUI en tiempo real y formato MiniMessage |
| Docs | Sitio inicial de documentación con Astro Starlight, identidad visual del Barrio Universitario aplicada |

---

## Pendientes

- [ ] Formato unificado de configuración en todos los plugins
- [ ] Dashboard web para estadísticas de servidor (datos de Board + Core)
- [ ] Baul: soporte para historial de loot en MySQL a lo largo de la red
- [ ] Selector: flag de modo mantenimiento por servidor
- [ ] Npc: editor in-game de hologramas y acciones
- [ ] Core: soporte para balanceo de carga ponderado entre lobbies
- [ ] Documentación pública de la API para todos los plugins

---

## Despedida

Gracias por pasar. Si alguno de nuestros plugins corre en tu red, nos encantaría saberlo: no dudes en abrir una discusión o dejar una estrella en cualquier repo.

Hecho con cariño por el equipo de Barrio Universitario.

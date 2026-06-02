---
title: Workflow de cambios
description: Cómo introducir cambios sin romper datos guardados ni el resto de módulos.
---

CoreBau corre en producción: cualquier cambio debe asumir que hay
**datos guardados** (configs, baúles, NPCs, perfiles) y **otros módulos
corriendo en paralelo**. Estas son las reglas de trabajo.

## Branch por feature

Convención de ramas:

- `feat/<nombre>` — nueva funcionalidad.
- `fix/<nombre>` — bugfix.
- `chore/<nombre>` — refactor, deps, docs.

Ejemplo: `feat/lobby-system` (la rama actual de este repo).

## Antes de tocar código

1. `git status` — confirma que no haya cambios pendientes.
2. `git pull --rebase origin main` — actualiza.
3. Crear rama nueva: `git checkout -b feat/mi-cambio`.

## Reglas para no romper datos

- **No renombrar paquetes** de módulos existentes (Board, Selector,
  Lobby, Baúl, NPC). Romperías NamespacedKeys y nombres de tabla.
- **No renombrar tablas** de SQL. Si necesitas migrar, escribe una
  función de migración versionada como `ConfigMigrator` (NPC) o el
  patrón equivalente en otro módulo.
- **Compatibilidad de YAML**: si añades un campo nuevo a un YAML, dale
  un valor por defecto en código para que configs viejas sigan
  funcionando.
- **No cambiar identificadores de placeholders ya publicados** (ej.
  `%BetterPets_pet_name%`). Los usuarios los tienen en boards y
  hologramas.

## Probar localmente

1. Compila: `.\gradlew.bat :paper:shadowJar`.
2. Copia el jar al servidor de prueba: `plugins/CoreBau-1.0.0.jar`.
3. Levanta paper, mira la consola:
   - `Módulo habilitado: <id>` por cada módulo.
   - Sin stack traces.
4. Si tocas el proxy: igual con `Core-1.0.0.jar` y el servidor Velocity.

## Comandos de prueba rápidos

| Test                        | Comando                              |
|-----------------------------|--------------------------------------|
| Reload de Selector          | `/reload` (con `selector.reload`)    |
| Reload de Board             | `/board reload`                      |
| Reload de Lobby             | `/lobbyreload`                       |
| Reload de NPC               | `/npc reload`                        |
| Verificar placeholders      | `/papi parse me %baul_points%`       |
| Verificar conteo proxy      | `/papi parse me %board_survival_online%` |

## Commits

Convención de mensajes (estilo del repo, ver historial):

```
feat(<ámbito>): descripción breve

Detalle opcional en cuerpo cuando hace falta.
```

Ejemplos reales del repo:

```
feat(lobby): nuevo módulo LobbySystem con /setspawn, /spawn y protecciones
feat: Mejora en la activación de mascotas y comparación de objetos Pet.
```

## Pull Request

Cuando la rama está lista:

```powershell
git push -u origin feat/mi-cambio
gh pr create --base main --title "feat(<ámbito>): descripción"
```

El PR debe incluir:

- Qué módulos toca.
- Si modifica configs o el `plugin.yml` fusionado.
- Si introduce o cambia placeholders / permisos (para actualizar los
  docs en `docs/`).
- Pasos para probar.

## Cuando algo sale mal

- **Un módulo no arranca**: revisa el stack trace. `CoreBauPlugin`
  aísla fallos, así que el resto siguen corriendo. Corrige y reload.
- **Datos corruptos**: nunca borres archivos del jugador para
  "resetear". Investiga; los datos son la entidad más cara del sistema.
- **Conflictos de comandos**: si Bukkit logueá `Ambiguous command`,
  revisa si un plugin externo declara el mismo nombre que el `plugin.yml`
  fusionado.

## Atajos de Gradle útiles durante desarrollo

```powershell
# Compilar sin tests ni shadow para iteración rápida
.\gradlew.bat :paper:compileJava

# Empaquetar shadowJar
.\gradlew.bat :paper:shadowJar

# Limpiar todo
.\gradlew.bat clean
```

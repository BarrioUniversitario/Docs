---
title: Módulo Baúl (+ Pets embebidos)
description: Cosméticos, baúles de botín, sistema de puntos y pets con habilidades por especie.
---

Paquete: `me.davidml16.baul` · Datos: `plugins/CoreBau/baul/`

El Baúl es el módulo más grande del paper. Maneja:

- **Cosméticos** (trails, hats, wings, join effects, emotes, pets).
- **Baúles de botín** (`cubelets`) con tipos custom.
- **Sistema de puntos** (`baul_points`).
- **Recetas de crafteo** que desbloquean cosméticos gastando puntos, baúles
  o dinero (Vault).
- **Persistencia** SQLite por defecto o MySQL (`mysql-connector-j` se carga
  vía `libraries:` en el `plugin.yml`).
- **Subsistema de Pets** embebido bajo `me.davidml16.baul.pets`
  (antiguo BetterPets — ya **no** se necesita JAR separado).

## Comando

`/baul`, alias `/cosmetics`. Los subcomandos se registran por reflection
sobre el `commandMap`, así que **no aparecen en `plugin.yml`**.

Abre el menú principal de cosméticos. Desde código puedes ejecutar
`baul cosmetics` (lo que hace el ítem del Selector por defecto).

## Carpeta de cosméticos

```
plugins/CoreBau/baul/cosmetics/
  trails.yml         Senderos de partículas
  hats.yml           Sombreros (items encima de la cabeza)
  wings.yml          Alas paramétricas (mariposa, halo, ángel, ...)
  pets.yml           Mascotas con habilidades (subsistema embebido)
  join_effects.yml   Efectos al entrar al servidor
  emotes.yml         Animaciones con comandos
```

Para agregar entradas nuevas **solo se edita el YAML correspondiente**, no
hace falta tocar Java.

### Trail (sendero de partículas)

```yaml
mi_trail_fuego:
  display: "<gradient:#ff4500:#ffff00><bold>Rastro de Fuego"
  rarity: EPIC
  icon: BLAZE_POWDER
  permission: baul.cosmetic.trail.fuego
  price: 5000
  particle: FLAME
  amount: 8
  interval: 2
  speed: 0.05
```

### Hat (sombrero)

```yaml
corona_dorada:
  display: "<gold><bold>Corona Dorada"
  rarity: LEGENDARY
  icon: GOLD_INGOT
  permission: baul.cosmetic.hat.corona
  price: 8000
  material: GOLDEN_HELMET
```

### Wing (alas paramétricas)

Formas disponibles: `BUTTERFLY`, `HEART`, `INFINITY`, `STAR`, `RING`,
`HALO`, `ANGEL`, `BAT`, `DRAGONFLY`.

```yaml
mariposa_arcoiris:
  display: "<rainbow><bold>Mariposa Arcoíris"
  rarity: LEGENDARY
  icon: NETHER_STAR
  permission: baul.cosmetic.wings.rainbow
  price: 5500
  shape: BUTTERFLY
  color: "#ff0080"
  secondaryColor: "#00ffff"
  gradient: true
  dustSize: 0.7
  scale: 0.4
  density: 2.0
  interval: 2
```

Campos:

- `shape` — forma paramétrica.
- `color` — color primario (hex `#RRGGBB` o nombre).
- `secondaryColor` + `gradient: true` — mezcla animada entre dos colores.
- `dustSize` — tamaño del punto DUST (0.4 a 1.2).
- `scale` — tamaño general.
- `density` — grados entre puntos (2 denso, 6 esparcido).
- `interval` — cada cuántos ticks redibujar (2 = 10 FPS, 4 = 5 FPS).

### Pet (mascota con habilidades)

Cada entrada debe declarar `betterPets: <baseId>_<rareza>`:

```yaml
wolf:
  display: "<gradient:#aa7744:#ddccaa>Lobo"
  rarity: COMMON
  icon: BONE
  permission: ""
  price: 200
  betterPets: wolf_common

dragon:
  display: "<gradient:#ffaa00:#ff4400><bold>Dragón de Ender"
  rarity: LEGENDARY
  icon: DRAGON_HEAD
  permission: baul.cosmetic.dragon
  price: 8000
  betterPets: ender_dragon_legendary
```

**Especies disponibles** (registradas en
`me.davidml16.baul.pets.registry.PetManager.initializePets`):

| Categoría    | Especies                                                                                                                                       |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Combat       | ender_dragon, enderman, endermite, ghoul, golem, grandma_wolf, horse, hound, lion, phoenix, pigman, rock, skeleton_horse, skeleton, spider, tarantula, tiger, wolf, zombie |
| Farming      | bee, chicken, elephant, pig, rabbit                                                                                                            |
| Fishing      | blue_whale, dolphin, flying_fish, squid                                                                                                        |
| Mining       | silverfish, wither_skeleton                                                                                                                    |
| Foraging     | giraffe, monkey, ocelot                                                                                                                        |
| Alchemy      | parrot, sheep                                                                                                                                  |
| Enchanting   | guardian                                                                                                                                       |

Rarezas válidas: `COMMON`, `UNCOMMON`, `RARE`, `EPIC`, `LEGENDARY`, `MYTHIC`.
Cada especie soporta solo un subconjunto; consulta el `pets.yml` por
defecto para ver el rango por especie.

### Join effect

```yaml
explosion_arcoiris:
  display: "<rainbow>Explosión Arcoíris"
  rarity: RARE
  icon: FIREWORK_ROCKET
  permission: baul.cosmetic.joineffect.arcoiris
  price: 2000
  particle: HAPPY_VILLAGER
  amount: 60
  spread: 2.0
  sound: ENTITY_PLAYER_LEVELUP
  pitch: 1.0
  broadcast: true
```

### Emote

```yaml
baile_zombie:
  display: "<green>Baile Zombi"
  rarity: COMMON
  icon: ZOMBIE_HEAD
  permission: baul.cosmetic.emote.zombie
  price: 500
  particle: HAPPY_VILLAGER
  amount: 20
  spread: 0.5
  sound: ENTITY_ZOMBIE_AMBIENT
  pitch: 1.0
  cooldown: 30000
```

## Recetas de crafteo

`crafting.yml` permite desbloquear un cosmético gastando ingredientes:

```yaml
cosmetic-crafting:
  crafts:
    mariposa_arcoiris:
      ingredients:
        1:
          type: points
          amount: 6500
        2:
          type: cubelet
          name: example
          amount: 5
```

Tipos: `points` (puntos de botín), `cubelet` (baúles — requiere `name`),
`money` (Vault).

## Visibilidad

Trails, emotes, join effects, particles y alas se emiten con
`World.spawnParticle(..., force=true)` para ser visibles a todos en rango
extendido (~256 bloques), no solo al dueño. Para pets, la visibilidad se
gestiona por `VisibilityType` del jugador (`ALL`, `OWN`, `NONE`).

## Desbloquear cosméticos desde código

```java
me.davidml16.baul.Main baulMain = me.davidml16.baul.Main.get();
if (baulMain != null) {
    Profile profile = baulMain.getPlayerDataHandler().getData(player);
    if (profile != null) {
        profile.unlockCosmetic("lobo_cosmetico");
        baulMain.getDatabaseHandler().saveProfileAsync(profile, player.getName());
    }
}
```

## Placeholders del módulo

Registrados por `me.davidml16.baul.PlaceholderHook` (`%baul_%`):

| Placeholder                  | Devuelve                                              |
|------------------------------|-------------------------------------------------------|
| `%baul_points%`              | Puntos de botín del jugador.                          |
| `%baul_available%`           | Total de baúles que tiene.                            |
| `%baul_available_<tipo>%`    | Baúles del tipo concreto.                             |
| `%baul_owned%`               | Total de cosméticos desbloqueados.                    |
| `%baul_equipped%`            | Total de cosméticos equipados.                        |

Pets registra una expansion adicional (`%BetterPets_%`):

| Placeholder                  | Devuelve                                              |
|------------------------------|-------------------------------------------------------|
| `%BetterPets_is_active_pet%` | `true` / `false`.                                     |
| `%BetterPets_pet_name%`      | Nombre serializado de la pet activa.                  |
| `%BetterPets_pet_level%`     | Nivel actual.                                         |
| `%BetterPets_pet_rarity%`    | Rareza enum (COMMON, EPIC, ...).                      |
| `%BetterPets_pet_xp%`        | XP actual.                                            |
| `%BetterPets_pet_xp_required%` | XP requerida para subir.                            |
| `%BetterPets_total_pets%`    | Total de pets que posee.                              |

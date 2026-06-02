---
title: Builds y scripts
description: Cómo compilar CoreBau con Gradle, qué artefactos salen y cómo iterar.
---

CoreBau usa **Gradle 8+ con wrapper** (no necesitas instalar Gradle).
Requiere **JDK 21**.

## Comandos básicos

```powershell
# Windows
.\gradlew.bat build

# Linux / macOS
./gradlew build
```

Artefactos resultantes:

- `paper/build/libs/CoreBau-1.0.0.jar`
- `velocity/build/libs/Core-1.0.0.jar`

## Compilar un solo módulo

```powershell
.\gradlew.bat :paper:build
.\gradlew.bat :velocity:build
```

Sale más rápido cuando solo tocaste uno de los dos.

## Tareas útiles

| Tarea                          | Para qué sirve                                   |
|--------------------------------|--------------------------------------------------|
| `:paper:shadowJar`             | Genera el jar fat del paper con relocations.     |
| `:velocity:shadowJar`          | Genera el jar fat del proxy.                     |
| `:paper:compileJava`           | Solo compila, no empaqueta.                      |
| `clean`                        | Limpia `build/` de los tres subproyectos.        |
| `--refresh-dependencies`       | Fuerza re-descarga de dependencias.              |
| `--offline`                    | Build sin red (útil en CI con caché).            |
| `--configuration-cache`        | Acelera builds repetidos.                        |

## Build incremental para iterar

Cuando sólo cambias código del paper:

```powershell
.\gradlew.bat :paper:shadowJar
copy paper\build\libs\CoreBau-1.0.0.jar D:\servidor-test\plugins\
```

Para Velocity:

```powershell
.\gradlew.bat :velocity:shadowJar
copy velocity\build\libs\Core-1.0.0.jar D:\proxy-test\plugins\
```

## Versionado

La versión está centralizada en el `build.gradle.kts` raíz. Para
publicar `1.0.1`:

1. Editar la versión en el `build.gradle.kts` raíz.
2. `.\gradlew.bat clean build`
3. Los artefactos saldrán con el nuevo número en el nombre.

## gradle.properties — versiones compartidas

```properties
paperApiVersion=1.21-R0.1-SNAPSHOT
adventureVersion=4.17.0
hikariVersion=5.1.0
mysqlVersion=8.4.0
bstatsVersion=3.0.2
```

Nunca sobreescribas estas versiones por módulo. Si necesitas actualizar
una librería, hazlo aquí.

## Cache de Gradle

El primer build descarga unos pocos cientos de MB en `~/.gradle/caches`.
Builds posteriores son incrementales y rápidos. Si algo va raro:

```powershell
.\gradlew.bat --stop                       # mata el daemon
.\gradlew.bat clean build --refresh-dependencies
```

## Estructura de `build.gradle.kts` (paper)

```kotlin
plugins {
    java
    id("com.github.johnrengelman.shadow") version "8.1.1"
}

dependencies {
    implementation(project(":common"))
    compileOnly("io.papermc.paper:paper-api:$paperApiVersion")
    compileOnly("me.clip:placeholderapi:2.11.6")
    implementation("com.zaxxer:HikariCP:$hikariVersion")
}

tasks.shadowJar {
    archiveClassifier.set("")
    relocate("com.zaxxer.hikari", "cl.xgamers.libs.hikari")
    relocate("org.bstats",        "cl.xgamers.libs.bstats")
}

tasks.build { dependsOn(tasks.shadowJar) }
```

## Script all-in-one (opcional)

Si quieres compilar y desplegar de un golpe a un servidor de pruebas
local, crea `scripts/deploy.ps1`:

```powershell
param([string]$ServerDir = "D:\servidor-test")

.\gradlew.bat :paper:shadowJar
if ($LASTEXITCODE -ne 0) { exit 1 }

Copy-Item paper\build\libs\CoreBau-1.0.0.jar `
          (Join-Path $ServerDir "plugins\CoreBau-1.0.0.jar") -Force

Write-Host "Desplegado en $ServerDir" -ForegroundColor Green
```

Uso: `.\scripts\deploy.ps1 -ServerDir D:\paper-lobby1`.

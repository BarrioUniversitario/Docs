---
title: Ejemplos para futuro
description: Snippets reutilizables para extender CoreBau a futuro.
---

Pequeño recetario de snippets útiles cuando se añade funcionalidad nueva.

## Registrar un PlaceholderAPI expansion desde un módulo

```java
@Override
public void enable(CoreBauPlugin plugin) {
    this.plugin = plugin;
    if (Bukkit.getPluginManager().isPluginEnabled("PlaceholderAPI")) {
        new WelcomeExpansion(this).register();
    }
}
```

`WelcomeExpansion` extiende `PlaceholderExpansion` y devuelve un
identifier propio (ej. `"welcome"`).

## Acceder al config scopeado del módulo

```java
File f = new File(plugin.getModuleFolder("welcome"), "config.yml");
FileConfiguration cfg = YamlConfiguration.loadConfiguration(f);
String mensaje = cfg.getString("messages.join", "<gold>¡Bienvenido!");
```

## Enviar MiniMessage a un jugador

```java
import net.kyori.adventure.text.minimessage.MiniMessage;
import static net.kyori.adventure.text.minimessage.MiniMessage.miniMessage;

player.sendMessage(miniMessage().deserialize(
    "<gold>Hola <player>!", Placeholder.unparsed("player", player.getName())
));
```

## Programar tareas async

```java
plugin.getServer().getScheduler().runTaskAsynchronously(plugin, () -> {
    // I/O, queries SQL, llamadas HTTP, ...
    plugin.getServer().getScheduler().runTask(plugin, () -> {
        // de vuelta al main thread
        player.sendMessage("listo");
    });
});
```

## Enviar al jugador a otro backend vía proxy

```java
ByteArrayDataOutput out = ByteStreams.newDataOutput();
out.writeUTF("Connect");
out.writeUTF("survival");
player.sendPluginMessage(plugin, "serverconnector:main", out.toByteArray());
```

El canal lo reenvía `Core-1.0.0.jar` en el proxy.

## Detectar el subsistema de Pets del Baúl

```java
me.davidml16.baul.Main baul = me.davidml16.baul.Main.get();
if (baul != null) {
    PlayerPetManager pets = baul.getPlayerPetManager();
    PlayerData data = pets.getPlayerData(player);
    if (data != null && data.getActivePet() != null) {
        // jugador tiene pet activa
    }
}
```

## Hook con LuckPerms para chequear grupo

```java
if (Bukkit.getPluginManager().isPluginEnabled("LuckPerms")) {
    LuckPerms api = LuckPermsProvider.get();
    User user = api.getUserManager().getUser(player.getUniqueId());
    if (user != null && "vip".equals(user.getPrimaryGroup())) {
        // dar perks de VIP
    }
}
```

## Registrar un canal custom entre paper y velocity

Paper:

```java
plugin.getServer().getMessenger().registerOutgoingPluginChannel(plugin, "corebau:welcome");
```

Velocity:

```java
@Subscribe
public void onProxyInit(ProxyInitializeEvent ev) {
    server.getChannelRegistrar().register(MinecraftChannelIdentifier.from("corebau:welcome"));
}
```

Asegúrate de que el namespace del canal queda registrado **antes** de
enviar cualquier mensaje.

## Persistencia con HikariCP

```java
HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:mysql://localhost:3306/welcome");
config.setUsername("user");
config.setPassword("pass");
config.setMaximumPoolSize(10);

HikariDataSource ds = new HikariDataSource(config);

try (Connection c = ds.getConnection();
     PreparedStatement ps = c.prepareStatement("INSERT INTO ...")) {
    ps.setString(1, player.getUniqueId().toString());
    ps.executeUpdate();
}
```

Hikari ya viene shaded y relocated en el paper jar — no es necesario
declararlo de nuevo en tu módulo.

## Listener de join con teleport al spawn del Lobby

```java
@EventHandler
public void onJoin(PlayerJoinEvent e) {
    Player p = e.getPlayer();
    Location spawn = LobbyModule.get().getSpawn();
    if (spawn != null) p.teleport(spawn);
}
```

`LobbyModule.get()` es el patrón de acceso estático típico del paper.

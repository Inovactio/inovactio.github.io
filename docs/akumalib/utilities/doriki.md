# Doriki and Cola

`AkumaStats` reads and grants the base mod's **Doriki**, and refills a cyborg's **Cola**. `DorikiGainEffect` is an effect that raises the Doriki a player earns in fights while it lasts.

## Reading and granting

```java
double doriki = AkumaStats.getDoriki(player);
AkumaStats.addDoriki(serverPlayer, 10, StatChangeSource.NATURAL);
```

| Method | Side | Does |
|---|---|---|
| `getDoriki(player)` | both | the Doriki, `0` for an entity without stats |
| `addDoriki(ServerPlayer, amount, source)` | server | adds (a negative amount takes some) and syncs the client; `false` if refused or no stats |

It goes through `IEntityStats.alterDoriki`, which, read from the base mod's bytecode (0.11.5), does three things:

- it fires a cancelable `DorikiEvent.Pre` whose amount other mods may change;
- it clamps to the server's Doriki limit (`ServerConfig.getDorikiLimit`);
- it does **not** sync the client, as with the Belly (see [Currency](currency.md)). `addDoriki` resyncs the player itself.

## More Doriki from fights

```java
// +10 % Doriki from fights per level of the effect
public static final RegistryObject<DorikiGainEffect> FIGHTING_SPIRIT = MyRegistry.REGISTRY.registerEffect(
        "Fighting Spirit", () -> new DorikiGainEffect(0xC04030, 0.10));
```

While the effect is on a player, every Doriki gain from defeating an NPC or a player (`StatChangeSource.KILL_NPC`, `KILL_PLAYER`) is multiplied by one plus its bonus. Several such effects add up. Gains from quests, challenges or commands are left alone. The library applies it on `DorikiEvent.Pre`, so the limit still clamps the result.

## A cyborg's Cola

```java
if (AkumaStats.runsOnCola(player)) {
    int added = AkumaStats.addCola(serverPlayer, 75);
}
```

| Method | Side | Does |
|---|---|---|
| `runsOnCola(player)` | both | whether the player has the base mod's Cola Fuel passive, as a cyborg does |
| `getCola(player)` | both | the Cola, `0` without stats |
| `addCola(ServerPlayer, amount)` | server | refills a cyborg, within the base mod's limit, and syncs the gauge; returns what was actually added, `0` for anyone else |

The base mod's own drinks do the same: its Cola refills 25 and its Ultra Cola 100, read from its bytecode (0.11.5).

# Levels and XP

## Levels and the XP curve

Levels start at **1**. Going from level `L` to `L + 1` costs `round(base_xp × L ^ exponent)` XP. The default curve (`base_xp` 50, `exponent` 1.5) makes early levels fast and the last ones long:

| Level up | XP it costs |
|---|---|
| 1 → 2 | 50 |
| 10 → 11 | 1,581 |
| 99 → 100 | 49,252 |
| 1 → 100 in total | 1,975,061 |

### Overriding a curve from a data pack

A data pack can replace any profession's curve, so server owners rebalance without a recompile. The file for the profession `<namespace>:<path>` sits at `data/<namespace>/professions/<path>.json`:

```json
{ "base_xp": 40, "exponent": 1.4 }
```

!!! note "Levels follow the curve, XP stays"
    Only XP is saved; the level is computed from it. Changing a curve, then running `/reload`, moves every player's level at once, and their XP is untouched.

### Server settings: curves and XP multipliers

*Since 2.7.0.* A server admin sets the professions' XP in the world's `serverconfig/akumalib-server.toml`, next to `professionMode`, with no data pack:

```toml
[professions]
	xpMultiplier = 1.0
	curves = ["inocruise:fisher = 20, 1.25, 1", "inocruise:cook = 20, 1.25, 1"]
	curvesAsShipped = ["inocruise:fisher = 20, 1.25, 1", "inocruise:cook = 20, 1.25, 1"]
```

| Setting | Meaning |
|---|---|
| `xpMultiplier` | multiplies the XP gained in every profession: `2.0` levels twice as fast, `0.5` half as fast |
| `curves` | one line per profession: `"<id> = <base_xp>, <exponent>, <xp_multiplier>"`. The last number multiplies that profession's XP on top of `xpMultiplier`, and may be left out |
| `curvesAsShipped` | written by the library, not to be edited: see below |

- **Every installed profession is listed** when the server starts, with the curve its mod or a data pack gives it, so an admin only changes numbers.
- The config comes first, then the data pack, then the code.
- **A line nobody changed follows its mod.** `curvesAsShipped` keeps what each line said when the library wrote it. A line that still says that is rewritten when its mod's curve changes in an update, or a data pack's on `/reload`. A line the admin changed is never touched. To get the mod's curve back, delete the line.
- A line that cannot be read is logged at start and left as it is, for the admin to fix. Two lines for one profession: the later one is used, and that is logged too.
- Curves too steep for the numbers (an exponent of 9 or 10 reaches past what a long holds by level 100) are capped rather than wrapped round.
- The multipliers apply in `AkumaProfessions.addXp`, before `ProfessionXpEvent`. A fraction becomes a chance of one more point, so 1 XP at `0.5` gives 1 point half the time. `setXp` and `setLevel`, the admin writes, are not multiplied.

#### What a death costs

*Since 2.10.0.* Two more settings in the same section decide what a player's professions lose when they die:

```toml
[professions]
	deathXpLoss = "KEEP"
	deathXpLossPercent = 10.0
```

| `deathXpLoss` | On death |
|---|---|
| `KEEP` (default) | nothing is lost |
| `PERCENT` | `deathXpLossPercent` (0 to 100) of **every** profession's total XP, rounded to the point: levels can go down |
| `ALL` | every profession goes back to 0 XP, level 1 |

- Only a death costs anything: coming back from the End rebuilds the player too, and never loses XP.
- Only XP is lost. The profession a Crew player chose, the recipes learned from a recipe item and the recipes already crafted are kept.
- Levels follow the XP, and so do the [titles](../utilities/titles.md) a profession gives at a level: a player who drops below it stops holding that title until they climb back.
- The player is not told: the professions book shows the new levels.
- In code: `DeathXpLoss`, applied in the `PlayerEvent.Clone` handler after the profession data is copied over.

!!! tip "For a modpack"
    Put the file in the pack's `defaultconfigs/` folder and every new world starts with it.

!!! warning "Restart the world after editing"
    Edit the file while the world is closed. Forge can reload a server config edited while the server runs, but that was not seen to happen in testing, so do not count on it.

## Reading and granting XP

Everything goes through `AkumaProfessions`:

```java
// server side, when a fish is caught
AkumaProfessions.addXp(serverPlayer, MyProfessions.FISHER.get(), 25);

// either side
int level = AkumaProfessions.getLevel(player, MyProfessions.FISHER.get());
ProfessionProgress progress = AkumaProfessions.getProgress(player, MyProfessions.FISHER.get());
```

| Method | Side | Does |
|---|---|---|
| `getLevel`, `getXp`, `getProgress` | both | read the player's standing. On the client, the values come from the last sync |
| `addXp(ServerPlayer, Profession, long)` | server | grants XP, fires the events, syncs; returns the XP actually added |
| `setXp`, `setLevel` | server | admin writes: no event fires |
| `sync(ServerPlayer)` | server | resends the player's progress. The library already does it on login, respawn, dimension change, `/reload` and every write |

`ProfessionProgress` holds `level`, `totalXp`, `xpIntoLevel` and `xpForNextLevel` (`0` at the max level), which is what a progress bar needs.

!!! warning "The client has no curves"
    The client never computes a level: it only knows what the server last sent, for the local player. Reading another player's professions on the client returns level 1.

### Events

Both fire on the Forge event bus, server side.

| Event | When | Use it to |
|---|---|---|
| `ProfessionXpEvent` | before `addXp` applies | change the amount (an XP multiplier), or cancel the grant. Cancelable |
| `ProfessionLevelUpEvent` | after `addXp` raised the level | react to a new level. One grant can jump several levels: compare `getOldLevel()` and `getNewLevel()` |

```java
@SubscribeEvent
public static void onProfessionXp(ProfessionXpEvent event) {
    if (event.getProfession() == MyProfessions.FISHER.get() && hasFishSoupBuff(event.getEntity())) {
        event.setAmount(Math.round(event.getAmount() * 1.15));
    }
}
```

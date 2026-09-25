# Professions

AkumaLib gives an addon **professions**: trades a player levels up in by doing things, such as a cook, a fisher or a hunter. The library owns the registry, the player's XP, the levels, the client sync and a test command. Your addon declares the professions and decides what grants XP.

!!! tip "Crafting professions"
    For the block where a crafting profession makes its recipes, see [Workstations](workstations.md).

!!! info "Nothing here is tied to one addon"
    The library ships no profession of its own. Two addons can each declare theirs, and a player levels in all of them side by side.

## Declaring a profession

Professions live in the `akumalib:professions` registry. Your `AkumaRegistry` carries a `PROFESSIONS` deferred register for it:

```java
public class MyProfessions {

    public static final RegistryObject<Profession> FISHER = MyRegistry.REGISTRY.registerProfession(
            "Fisher", () -> new Profession(ProfessionKind.GATHERING));

    public static final RegistryObject<Profession> COOK = MyRegistry.REGISTRY.registerProfession(
            "Cook", () -> new Profession(ProfessionKind.CRAFTING));

    public static void init() {
    }
}
```

```java
// in your mod constructor
MyRegistry.REGISTRY.PROFESSIONS.register(modEventBus);
MyProfessions.init();
```

!!! warning "Put `PROFESSIONS` on your mod bus"
    A deferred register that never reaches the bus fails silently: the professions are simply never registered, and `/profession` does not list them.

The registry name comes from the display name (`"Fisher"` gives `fisher`). The display name is read from the key `profession.<modid>.<name>`, which your `en_us.json` must define:

```json
"profession.mymod.fisher": "Fisher"
```

| Constructor argument | Default | Meaning |
|---|---|---|
| `ProfessionKind` | required | `CRAFTING` (makes things at a workstation) or `GATHERING` (takes things from the world) |
| `maxLevel` | `100` | the last level |
| `defaultCurve` | `ProfessionCurve.DEFAULT` | the XP curve used when no data pack overrides it |

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

## The professions screen

Players see their professions in a screen listing every registered profession: its icon, name, level and an XP bar. It opens from a **Professions** plank added to the base mod's character screen, next to its abilities, quests, challenges and crew planks, or with the **Professions** key (K by default, in Controls under *AkumaLib*). The plank only appears when at least one profession is registered.

The screen wears Mine Mine no Mi's own GUI textures (its parchment and wooden planks), referenced from the base mod's jar. **Clicking a profession opens its page**, in the base mod's open book: its level and XP, its **perks** (green once the player has them, greyed with their level before), and everything it **unlocks**, level by level, a page at a time.

In Crew mode the screen shows **only the chosen profession**: a player sees the trade they practise. A player who has not chosen yet sees them all, with a **Choose** button on each, which asks for a second click to confirm. It follows the same rules as `/profession choose`, through `AkumaProfessions.chooseFirst`: a first choice only, and never in Solo mode.

Give a profession an icon with `withIcon`. It takes a supplier, because items may not be registered yet when the profession is constructed:

```java
public static final RegistryObject<Profession> FISHER = MyRegistry.REGISTRY.registerProfession("Fisher",
        () -> new Profession(ProfessionKind.GATHERING).withIcon(() -> new ItemStack(MyItems.FISH.get())));
```

For a dedicated icon that is not an item, give it a texture with `withIconTexture`: a square PNG of any size (64 x 64 reads well both in the list and in the character creator, where it is drawn large). It is drawn in place of the item icon, which stays the fallback:

```java
() -> new Profession(ProfessionKind.GATHERING)
        .withIconTexture(new ResourceLocation(MODID, "textures/gui/profession/fisher.png"))
```

## Perks and unlocks

A **perk** is a line on the profession's page: what it gives from a level on. Declare it on the profession; applying it is the addon's business, where the perk belongs.

```java
() -> new Profession(ProfessionKind.GATHERING)
        .withPerk(5, "mymod.perk.fisher.bigger_catches")                                    // a fixed line
        .withPerk(1, level -> Component.translatable("mymod.perk.bonus", 20 + level))       // a line that grows
```

The **unlocks** are built on the server and synced to every player when they join and on `/reload` (`ProfessionUnlocks`). The library lists by itself every workstation recipe (at its level), and every `ProfessionSeedsItem` and `ProfessionBlockItem` (at their minimum level: both take one, and refuse a practitioner below it with a message). Add the rest with a provider, registered once:

```java
ProfessionUnlocks.register((server, out) -> out.accept(new ProfessionUnlocks.Unlock(
        FISHER_ID, new ItemStack(MyItems.BONE_FISH.get()), MyItems.BONE_FISH.get().getDescription(), "mymod.unlock.fish", 4)));
```

## XP boosts from effects

`ProfessionXpBoostEffect` is an effect that multiplies the XP a profession earns while it lasts. It is how a dish boosts a profession:

```java
// +15 % Fisher XP per level of the effect
public static final RegistryObject<ProfessionXpBoostEffect> FISHERS_APPETITE = MyRegistry.REGISTRY.registerEffect(
        "Fisher's Appetite", () -> new ProfessionXpBoostEffect(0x3A7BD5, MyProfessions.FISHER, 0.15));
```

| Argument | Meaning |
|---|---|
| `color` | the particle colour |
| `profession` | the profession boosted, or `null` for every profession |
| `bonusPerLevel` | the bonus per level of the effect: `0.15` is +15 % at amplifier 0, +30 % at amplifier 1 |

The library applies it inside `ProfessionXpEvent`, so it multiplies whatever a source grants. Several boosts on the same profession add up: +15 % and +10 % make +25 %.

!!! warning "A multiplier, never raw XP"
    Food should boost XP, not give it. Raw XP from eating would let a cook level forever by making and eating their own dishes.

To keep only one meal buff at a time, put the boosts in an [exclusive effect group](../utilities/effects.md#exclusive-groups).

## Solo and Crew modes

A server decides whether a player may practise every profession or only one. The setting is `professionMode`, in the world's `serverconfig/akumalib-server.toml`:

| Value | Behaviour |
|---|---|
| `AUTO` (default) | `SOLO` in singleplayer **and on LAN**, `CREW` on a dedicated server |
| `SOLO` | every profession can be practised and levelled |
| `CREW` | one profession per player. XP for any other is dropped |

Read the mode in force with `AkumaProfessions.getMode(player)` (or `getMode(server)`), never from the config: `AUTO` is resolved there, and the client gets the resolved value with the rest of the sync.

### `canPractice`: the one check

```java
if (AkumaProfessions.canPractice(player, MyProfessions.COOK.get())) {
    // let the player craft at the kitchen
}
```

`canPractice` is true in Solo mode, and in Crew mode only for the player's chosen profession. It works on both sides. `addXp` already applies it, so an XP source needs no check of its own. A workstation, a tool or a screen does.

### Choosing and changing

| Method | Does |
|---|---|
| `getChosen(player)` | the chosen profession, if any |
| `choose(ServerPlayer, Profession)` | makes it the chosen one |
| `reset(ServerPlayer)` | clears the choice |

!!! danger "A change resets every profession"
    `choose` and `reset` both set **every profession's XP back to zero**, the first choice included. Both fire the cancelable `ProfessionChangeEvent` first (old and new profession, either may be `null`): cancel it to make a change cost something, such as an item or a visit to an NPC.

In Crew mode, Mine Mine no Mi's **character creator** gets a fourth tab, *Profession*, under Faction, Race and Style: its arrows cycle the registered professions (and Random), and finishing the creation makes the choice (`chooseFirst`). A player who already chose sees theirs, locked.

The choice is saved with the player in both modes, so a server moving from Solo to Crew keeps it. A player with no choice in Crew mode practises nothing until they pick one.

## The `/profession` command

| Command | Who | Does |
|---|---|---|
| `/profession choose <profession>` | any player, for themselves | takes a **first** profession in Crew mode. Refused in Solo mode, and refused once a profession is chosen: a change goes through an operator or the consumer's own item or NPC |
| `/profession mode` | any player | shows the mode and the player's profession |
| `/profession get <player> <profession>` | operators | shows level and XP |
| `/profession set <player> <profession> <level>` | operators | admin write, no event, no mode check |
| `/profession addxp <player> <profession> <amount>` | operators | goes through `addXp`: events, multipliers and the Crew check apply |
| `/profession reset <player>` | operators | clears the choice and every profession |

Operators means permission level 2.

## What is saved

The XP of each profession is stored on the player, **keyed by profession id**, and survives death, the End portal and relogging. The XP of a profession whose mod was removed is kept, and comes back if the mod does.

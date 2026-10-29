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

## In this section

| Page | What it covers |
|---|---|
| [Levels and XP](levels-and-xp.md) | the XP curve, data pack curves, server settings and XP multipliers, what a death costs, reading and granting XP, events |
| [The screen, perks and XP boosts](screen-perks-and-boosts.md) | the professions screen, perks and unlocks, XP boosts from effects |
| [Solo and Crew modes](solo-and-crew.md) | `canPractice`, choosing and changing a profession |
| [The `/profession` command and what is saved](command-and-saves.md) | the test command, the player's saved data |
| [Workstations](workstations.md) | the block where a crafting profession makes its recipes |
| [Advancements](advancements.md) | the three advancement triggers AkumaLib fires: levels, workstation crafts, creature captures |
| [Gathering](gathering.md) | fruit trees, crops and profession-only blocks |
| [Talent webs](talent-webs.md) | points spent in a profession's network of nodes |

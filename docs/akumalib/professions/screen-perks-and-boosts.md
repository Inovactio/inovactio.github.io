# The professions screen, perks and XP boosts

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

`getPerks()` gives them back as `Perk(level, text)` records, the text being worked out from the player's level; `getKind()` and `getMaxLevel()` give what the profession was declared with.

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

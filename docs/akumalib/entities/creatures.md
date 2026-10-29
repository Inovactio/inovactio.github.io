# Catchable creatures

`CatchableCreature` is the base for small creatures a player **catches** rather than kills: an insect, a lizard, a frog. Your subclass brings the model, the textures and the numbers. The base class brings the AI, rare variants, a render-distance fix and the capture itself.

| Class | For |
|---|---|
| `CatchableCreature` | a creature that walks: a lizard, a frog |
| `CatchableFlyingCreature` | a creature that flutters: a beetle, a firefly. Parrot-style flight, no fall damage |
| `CatchableCreatureRenderer` | a renderer with one texture per variant |

## What the base class does

- **AI**: wanders, looks around, and **reacts to players, unless they sneak**. Sneaking up is how a player gets close enough to catch it. Creative and spectator players never scare it. How it reacts is its [reaction](#reactions).
- **Variants**: a variant id, synced and saved, picked at spawn by `pickVariant`. By default the variant is `1` with a `getRareVariantChance()` chance, else `0`. A rare variant is a texture swap.
- **Render distance**: vanilla renders an entity within `bounding box size × 64` blocks, so a 0.1-block insect disappears past **6.4 blocks**. This class never renders nearer than a 0.75-block entity would, which is 48 blocks at default settings.
- **Capture**: `capture(player, tool)` rolls a loot table, fires `CreatureCaptureEvent`, gives the loot and removes the creature.

## Reactions

`getReaction()` says what the creature does once a player scares it:

| `CreatureReaction` | Behaviour |
|---|---|
| `FLEE` (default) | keeps its distance, and calms down once the player is gone |
| `TAKE_OFF` | the Unlimited Cruise escape: runs off fast, away from the player, for 2 to 3 seconds, then takes off, rises spinning for about a second and **vanishes for good** (the entity is removed, with the vanilla poof). Nothing stops it once started; a net can still catch it on the way |
| `ATTACK` | comes at the player and hits them every 25 ticks (`getAttackDamage()`, then your `onAttackHit(target)`: a poison, a sound), `getMaxAttacks()` times (3), then escapes as `TAKE_OFF`. It leaves a player who sneaks or runs far |

```java
@Override
public CreatureReaction getReaction() {
    return CreatureReaction.TAKE_OFF;
}
```

!!! warning "Return a constant"
    `getReaction()` is read from `registerGoals`, which the `Mob` constructor calls before any field of your subclass is set.

While it takes off, `isTakingOff()` is true on both sides (synced), so the model can animate it. `getEscapeSpeed()` (default `1.8`) sets how fast it runs. A creature caught between take-off and vanishing is not saved.

A flying creature flees **up into the air** (`FlyAwayGoal`): vanilla's flee aims at the ground, which is the sea floor for a bird at sea.

## A player's quiet step

*Since 4.6.0.* Who scares a creature, and from how far, is the creature's own. An addon can still let some players come closer - a hunter's light step - without touching any creature:

```java
// once, at mod construction
CatchableCreature.addQuietStep(player -> isHunter(player) ? 2.0D : 0.0D);   // blocks closer before it reacts
CatchableCreature.addLinger(player -> isHunter(player) ? 20 : 0);           // ticks more before it takes off
```

The answers of all addons add up, and never go under 0. A creature reacts to a player when `notices(player)` is true: he scares it, and stands within its flee distance less his quiet step. The flee, attack, fly-away and take-off goals all ask it; with no addon's say nothing changes.

!!! note
    A creature still looks at its nearest player only: one who comes quietly between it and another hides him.

## Perches

A creature can wait **still**, on a flower or a trunk, until something disturbs it. Give it a `CreaturePerch`:

```java
public static final CreaturePerch PERCH = CreaturePerch.onSide(BlockTags.LOGS);     // clings to a trunk, head up
// or CreaturePerch.onTop(MY_FLOWERS_TAG, 0.5F): sits on top of the plant

@Override
public CreaturePerch getPerch() {
    return PERCH;
}
```

- When it spawns (8 blocks around a natural spawn, 3 around a spawn egg; never for a trap's catch) it settles on a free perch, if there is one: no gravity, not pushable, pinned in place, facing the block for a side perch.
- On top of a plant it sits **on the plant's outline** (a tall plant's upper half), so a net aimed at it hits the creature, not the plant.
- **One creature to a block**: a flower or a log holds at most one; the perch search skips blocks another creature holds.
- It leaves the perch when its reaction starts or when it is hurt. **Breaking its perch** (or the block right above or below it: the other half of a tall flower, the next log) **startles** it: it flees at once, from the player who broke it even if they sneak (`startle(player)`, for 2 seconds). A perch that goes by itself makes a `TAKE_OFF` creature take off in any direction. Released creatures are not perched.
- `CatchableCreatureRenderer` draws a side-perched creature tilted nose up, its belly on the block.
- `isPerched()` and `getPerchFace()` are synced: a model can fold its wings while perched.
- `PERCH.isNear(level, pos, radius)` makes a spawn rule that only lets it spawn near a perch.

## Flying creatures that land

A `CatchableFlyingCreature` spawned in the air stays airborne. One that overrides `canLand()` to `true` (a bird, a butterfly) comes down now and then onto **solid ground** (never water: over the sea it keeps flying), rests 20 to 60 seconds, then flies again. `isResting()`, `land()` and `takeOff()` expose it.

## Released creatures

A creature item can put its creature back into the world:

```java
HerculesBeetleEntity beetle = CatchableCreature.release(MyEntities.HERCULES_BEETLE.get(), serverLevel, pos, player.getYRot(), variant);
```

A released creature (`isReleased()`, saved) **does not react to players** and never despawns. Check `isReleased()` in your `CreatureCaptureEvent` handler if catching it again should not pay twice.

Writing, registering, spawning and capturing one: [Writing a catchable creature](writing-a-creature.md).

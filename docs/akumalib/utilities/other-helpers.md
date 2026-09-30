# Other helpers

## `IBladedHandsAbility`

*Since 2.11.0.* An ability that, while active, makes the user's bare hands count as a sword for the techniques that need
one (`AbilityUseConditions.requiresSword`, and `requiresMeleeWeapon` through it): sickle nails, scissor hands, blade
arms.

```java
public class MyClawsAbility extends PunchAbility implements IBladedHandsAbility {

    @Override
    public boolean hasBladedHands(LivingEntity entity) {
        return this.continuousComponent.isContinuous();   // the claws are out
    }
}
```

- The base mod does this for one ability only, Spar Claw, written into `requiresSword` by name; AkumaLib opens the same
  door to any **equipped** ability implementing the interface.
- As for Spar Claw, it holds **only with an empty main hand**. The hand stays empty, so everything a bare hand gets
  (`PUNCH_DAMAGE` above all) is kept.
- `IBladedHandsAbility.isActive(entity)` tells whether any equipped ability makes the entity's hands blades right now.

## `FruitInjectionHelper`

Adds abilities to, or removes them from, a Devil Fruit's list of ability cores, including a fruit the base mod owns:

```java
FruitInjectionHelper.appendAbilities(fruit, MyExtraAbility.INSTANCE.get());
FruitInjectionHelper.removeAbilities(fruit, SomeAbility.INSTANCE.get());
```

- `appendAbilities` skips a core already on the fruit and ignores `null` entries.
- Both change the fruit item's own list in place and print what they changed to the console.

!!! warning "Call it once the fruit exists, and test it in game"
    The fruit is an item instance, so it has to be registered before you can pass it, and the abilities you add have to be registered too. Neither addon built on AkumaLib uses this helper today, so check in game how players who already ate the fruit are affected before relying on it.

## `RandomTeleportHelper`

Teleports a living entity to a random safe spot on the surface, within a ring around a point, **without freezing the server** to load chunks:

```java
RandomTeleportHelper.findAndTeleportAsync(
        level, target,
        200, 800,           // minimum and maximum distance, in blocks
        8,                  // candidate spots to try
        origin.x, origin.z,
        1,                  // height above the surface
        () -> { /* runs when done, whether or not it teleported */ });
```

1. It picks the candidate spots in the ring at random.
2. After a short delay, it reads their chunks from disk asynchronously, and keeps the first spot whose surface is **dry land** (the top solid block is also the ocean floor, so not water).
3. It loads that chunk fully, then teleports the target on the server thread, never below sea level, and resets its fall distance.

If no candidate is safe, or the target died in the meantime, it does nothing. The callback runs in every case, so use it to end the technique's state.

!!! warning "Only already generated terrain"
    The candidate chunks are read from what is saved on disk. A chunk that has never been generated has nothing saved, so that candidate is skipped: the teleport only ever lands in terrain someone has already explored. In a new world with a wide ring, give it more candidates.

!!! note "It takes a second"
    The teleport happens about a second after the call, once the chunks have been read. Show the technique's effect immediately, not at the teleport.

## `InoHelper`

Three small functions:

| Method | Does |
|---|---|
| `linearInterpollation(min, max, t)` | `min + (max - min) * t` |
| `colorToHex(color)` | a `java.awt.Color` as `#RRGGBB` |
| `calculateEffectDuration(user, target, min, max, dorikiThreshold)` | an effect duration from the Doriki gap: `min` at or below zero, `max` at or above the threshold, linear between. The same rule `TransmutationProjectile` uses |

## `AbilityProgress`

*Since 3.1.0.* How far along an equipped continuous ability is, for a pose or a model that follows it. Either side.

```java
float t = AbilityProgress.fraction(entity, HornTossAbility.INSTANCE.get(), HornTossAbility.HOLD, partialTick);
float lift = AbilityProgress.riseFall(t, 0.4F);   // up over the first 40%, back down over the rest
```

`continueTime` gives the ticks (plus the partial tick), `fraction` the 0-1 share of a total, both -1 when the ability is not running; `riseFall` turns that into a 0-1-0 curve.

## `SharedCooldowns`

*Since 3.1.0.* Two abilities that share one cooldown, whoever registered them - an addon technique and a base mod one included, which an `AbilityPool` cannot bind:

```java
SharedCooldowns.link(JusshiganAbility.INSTANCE, ShiganAbility.INSTANCE);   // at mod construction
```

Every tick, for a player with both equipped, when one is cooling down and the other is idle, the other starts a cooldown for what the first has left. A held stance counts as busy: its own cooldown comes when it ends.

## `GatedUnlocks`

*Since 3.1.0.* The base mod asks a fruit's gated abilities (`setUnlockCheck`) only at a few moments, so a technique unlocked by learning something else waits for the next one. This asks again every 100 ticks for the players you name:

```java
GatedUnlocks.recheck(player -> MyHelper.hasFruit(player), MyTechniqueAbility.INSTANCE);
```

## `ScreenMarkers`

*Since 3.1.0.* Markers on one player's screen pointing at places in the world, for a while: a clairvoyance, a radar, Observation Haki.

```java
ScreenMarkers.show(user, new ResourceLocation("mymod", "radar"),
        List.of(new ScreenMarkers.Marker(name, target.position(), 0xFFF3C94C)), 300);
```

Along a band at the top of the screen, each marker sits in its direction from where the player looks, with its label and distance; one behind the player goes to the edge with an arrow. A new `show` with the same source replaces that source's markers, others stay. Labels are cut at 64 characters and a packet carries at most 256 markers. Both sides need 3.1.0 (network protocol 5).

## `ThrownBodies`

*Since 3.1.0.* A body an ability has just hurled, watched for the moment it slams into something - a wall, the ground, another body - so it can be hurt by the landing.

```java
body.setDeltaMovement(look.scale(THROW));
body.hurtMarked = true;
ThrownBodies.track(body, 30, impact -> AkumaAbilityHelper.hurtBurst(impact.body(), source, damage));
```

A slam is a flight still fast a tick ago (0.8 blocks a tick or more) that stops short the next. It reads the server-side velocity, which the server keeps for a body it threw - a thrown player included. It does not see a player who moves himself (a dash): only his client moves him. A mob without AI never slams: vanilla does not move it at all.

## `SummonedAllies`

*Since 3.1.0.* The rules every mob an ability summons for its user ends up needing, whatever it extends (`TamableAnimal`, the base mod's `CloneEntity`, a plain `Mob`):

- `prepare(mob)`: the base mod adds its `PUNCH_DAMAGE` attribute to every bare-handed melee blow, a mob's too - a sting tuned at 2 hit for 5. Zeroed here;
- `wantsToAttack(owner, target, sameOwner)`: an enemy of the owner (`AkumaTargeting.isEnemy`), never the owner, never a summon of the same owner;
- `shouldLeave(owner, lifeLeft)` and `leave(mob)`: time up, or the owner gone or dead, and it vanishes in a puff.


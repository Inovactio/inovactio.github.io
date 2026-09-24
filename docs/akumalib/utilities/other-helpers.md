# Other helpers

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

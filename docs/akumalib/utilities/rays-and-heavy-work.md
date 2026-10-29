# Long rays, heavy work, the fruits taken

Four helpers that AkumaLib's own [fixes to the base mod](base-mod-fixes.md) use, and an addon can call.

**The base mod's own aiming, corrected.** With their switches on, two of `WyHelper`'s calls are already corrected for
every addon that uses them, with nothing to call:

- `WyHelper.rayTraceEntities` (guns and instant shots) stops at the first wall and hits the nearest target crossed,
  one at arm's length included (`fixHitScan`, through `HitScan.nearest`). For an addon's own aiming,
  [`AkumaTargeting`](targeting.md) remains the helper to use.
- `WyHelper.rayTraceBlocksAndEntities` no longer loads or generates chunks along a long ray (`fixAbilityWorldWork`,
  through `LoadedRay.clip`).

**`LoadedRay`: a long ray that stays in the loaded world.** `Level.clip` reads every block along the ray, and reading
a block of a chunk that is not loaded loads it, or generates it, on the server thread: a 1024-block ray over the sea
crosses some 64 chunks.

```java
BlockHitResult hit = LoadedRay.clip(level, new ClipContext(from, to, ClipContext.Block.COLLIDER, ClipContext.Fluid.NONE, user), user);
double loaded = LoadedRay.loadedShare(level, from, to);   // 0 to 1: how much of the segment runs through loaded chunks
```

What the ray meets before the first chunk that is not loaded is a hit as with `clip`; past it, a miss at the end asked
for.

**`SpreadWork`: very large work spread over a few ticks.** For a sphere of hundreds of thousands of block writes, or a
volley of hundreds of entities, in one tick:

- `SpreadWork.carve(level, placer, origin)` queues a whole sphere of the base mod's `SimpleBlockPlacer` around
  `origin`. Each tick gives the level's spheres 15 ms; blocks that are air already are passed over, the others go
  through the placer and its rule.
- `SpreadWork.add(level, entity)` queues an entity to enter the level, 64 per tick in the order they came; it answers
  what `addFreshEntity` would for a new entity.

The end result is the same, it arrives over a few ticks. Neither looks at a switch: call them where you want the work
spread.

**`FruitRegister`: the Devil Fruits that are not free.** What the `/fruits` screen shows, read from the base mod's
one-fruit-per-world record:

- `FruitRegister.ruleOn()`: whether the base mod keeps one fruit of each kind per world. Without it nothing is
  recorded.
- `FruitRegister.taken(server, operator)`: one `Entry` per fruit that is lying in the world, held, or eaten (its
  `State`), with who has it. Where it lies and when it last changed hands are filled for an operator only, as with
  the base mod's `/check_fruits`. A fruit the record calls lost is free again and left out.

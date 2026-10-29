# Torn ground

*Since 6.0.0.* `TornGroundEntity` is a mass of the world's own blocks torn out of the ground: carried over its owner's head, then thrown; or thrown at once from where it lies. It flies and falls, and bursts on the first block or body it meets, hurting its owner's enemies round it. Missing's Mountain Throw, Rock Volley and Move! and Race's Boulder Throw are all this one entity.

Unlike the other entities of this section, the library **registers it and draws it** (`akumalib:torn_ground`, `TornGroundRenderer`: each block by the game's own block renderer). Nothing to register in your addon.

## Tearing the ground

`TornGroundEntity.tear` cuts the blocks into a [`TemporaryBlocks`](../utilities/blocks.md) group and returns them as the pieces of a mass. The blocks are not lost: they come back when the group is removed, so the hole closes.

```java
TemporaryBlocks.Group hole = TemporaryBlocks.open(entity);
// 2 x half + 1 wide, high deep, from the block under `top` down
List<TornGroundEntity.Piece> pieces = TornGroundEntity.tear(level, entity, hole, top, half, high,
        (pos, state) -> state.getDestroySpeed(level, pos) <= 10.0F);
if (pieces.size() < LEAST) {
    hole.remove();
    // tell him why
    return;
}
```

- A block is taken when it is neither air nor fluid, your predicate accepts it, and the zones' rule (`CORE_FOLIAGE_ORE`) lets him cut it there.
- A piece sits from the mass's middle bottom: `x` and `z` from `-half` to `half`, `y` from 0 (the deepest layer) to `high - 1`.

## Carried, then thrown

```java
this.mass = new TornGroundEntity(level, entity, pieces, half, high)
        .blow(INSTANCE, DAMAGE, RADIUS)
        .carrying(HOLD);
level.addFreshEntity(this.mass);

// later: the second press, or the time running out
Vec3 from = this.mass.position().add(0.0D, this.mass.high() * 0.5D, 0.0D);
this.mass.hurl(AkumaTargeting.aimPoint(entity, 48.0D).subtract(from).normalize().scale(1.6D));
AkumaTickQueue.runIn(400, hole::remove);
```

A mass made with the second constructor, `new TornGroundEntity(level, entity, pieces, half, high, at)`, lies at `at` (its middle bottom) and is never carried: `hurl` it at once.

| Call | What it sets | Default |
|---|---|---|
| `blow(core, damage, radius)` | the burst: `damage` as the tooltip shows it (`scaledDamage` applied by the entity) to his enemies within `radius` blocks, a hit of `core`'s | none: without it the burst hurts nobody |
| `carrying(ticks)` | the longest it is carried: a mass nobody threw by then (and one second for the throw's swing) goes | no limit |
| `pushing(push, lift)` | how hard the burst throws a body away and up | 1.4, 0.6 |
| `falling(gravity)` | what it falls by each tick in flight | 0.02 |
| `flying(ticks)` | the longest it flies before it bursts where it is | 100 |

What the entity takes care of:

- **carried**, it follows its owner, drawn from his own place each frame; it goes when he dies or leaves;
- **thrown**, it bursts on the first body along the whole way it went in the tick (a fast chunk never flies through one), on the first block its box meets, or at the end of its flight;
- **the burst grows with its owner's size**, in the tick it bursts (`AkumaSize.reachOf` for the radius, the damage factor for the hit), and touches only the bodies `AkumaAim.mayFight` allows;
- a mass of one block (`half` 0) is a chunk of a volley: measured to a body's box, a puff and a stone sound instead of an explosion;
- **it is never saved**, and its type sits in `akumalib:size_exempt`: its size is the blocks it took. A bigger user tears more of them: size `half` and `high` yourself, `AkumaSize.reach(user, ability, base)` rounded.

!!! warning "Close the hole yourself"
    The entity does not own the group. Remove it when you want the ground back (`AkumaTickQueue.runIn(ticks, hole::remove)`), whether the mass flew or not.

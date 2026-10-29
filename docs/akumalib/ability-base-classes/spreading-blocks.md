# Spreading blocks: `SpreadingBlockAbility`

A zone that replaces the ground under it with a block of your choice as it grows, applies effects to what stands on it, optionally hardens into a second block, and **puts every original block back** when it closes.

## What to implement

```java
public class MyGroundZoneAbility extends SpreadingBlockAbility {

    public MyGroundZoneAbility(AbilityCore<MyGroundZoneAbility> core) {
        super(core);
        this.maxRadius = 30;
        this.blocksPerTick = 40;
    }

    @Override
    protected BlockState getSpreadBlock() {
        return Blocks.PACKED_ICE.defaultBlockState();
    }

    @Override
    protected void onSpreadTick(LivingEntity entity, int elapsedTicks) {
        // per-tick work while the zone is active
    }

    @Override
    protected void applyEffectToLivingEntityInZone(LivingEntity owner, LivingEntity target, int elapsedTicks) {
        // same rule as ZoneAbility: this is a pulse
    }
}
```

Optional overrides: `getHardenedBlock()` (`null` for no hardening), `onChargeEndTransition`, `easeRadiusProgress` (the shape of the expansion), `canReplaceBlock`, `canReplaceSubSurfaceBlock`, `isSurfaceBlock`, `getEffectsToClearOnEnd`, `onZoneEndBlocks`.

## Settings

| Field | Default | Meaning |
|---|---|---|
| `maxRadius` | `15` | radius at a full charge |
| `chargeTime`, `minChargeTime` | `240`, `60` | as for `ZoneAbility` |
| `zoneTime` | `600` | ticks the zone holds |
| `minCooldown`, `maxCooldown` | `2400` | the proportional cooldown only rewards an early release when `minCooldown < maxCooldown` |
| `blocksPerTick` | `3` | propagation budget, in **blocks** |
| `burstMultiplier` | `3` | cap on a single tick: `burstMultiplier x blocksPerTick` |
| `surfaceLayers` | `1` | blocks converted per column, from the surface down |
| `surfaceScanUp`, `surfaceScanDown` | `4`, `8` | vertical window searched for each column's surface |
| `hardenTicks` | `30` | ticks to lay the hardened block |
| `restoreTicks` | `30` | ticks to restore the original blocks |

## Throughput: four budgets

A large zone touches tens of thousands of blocks, and each phase has its own ceiling. Forgetting one produces a lag spike at a precise moment.

| Phase | Setting | What goes wrong |
|---|---|---|
| propagation | `blocksPerTick`, capped by `burstMultiplier` | the front never reaches the advertised radius, or a single tick places thousands of blocks |
| hardening | `hardenTicks` | the server freezes the moment the zone reaches full size |
| restore | `restoreTicks` | the default of 30 ticks is thousands of `setBlock` calls per tick on a huge zone |
| memory | `surfaceLayers` | the original state of **every** converted block is kept for the zone's lifetime |

!!! warning "`blocksPerTick` counts blocks, not columns"
    Going to three layers without raising the budget divides the speed of the front by three. The total work to reach `maxRadius` is fixed: halving `chargeTime` means doubling `blocksPerTick`.

For reference, a radius-110 zone with three layers (about 114,000 blocks) runs well at `chargeTime=110`, `blocksPerTick=520`, `burstMultiplier=2`, `hardenTicks=160`, `restoreTicks=160`. Past a radius of about 40, valleys and hollows fall outside the default `+4 / -8` surface window and stay unconverted for good: raise it to around `+8 / -32`.

## Traps

!!! warning "Three rules when you subclass it"
    1. **Reject your own blocks in `canReplaceBlock`.** The default accepts any block with a solid top face. A zone spreading over blocks another ability of the same fruit placed records them as "original" and puts them back **permanently** at the end.
    2. **Override both replacement predicates together.** Layers below the surface go through `canReplaceSubSurfaceBlock`, not `canReplaceBlock`. The surface predicate requires a solid top face, which would stop the descent at the first dirt path or leaf block. A subclass overriding one must override the other.
    3. **Take down the blocks you place yourself in `onZoneEndBlocks`.** The zone only restores what **it** converted. A wall raised from `onChargeEndTransition` is invisible to the restore and would stand forever. Take such blocks down in `onZoneEndBlocks(Level)`, which runs at a normal close **and** on the disconnect path, so it must be safe to run twice.

## Good to know

- **Zones are restored when their holder leaves.** The restore is normally driven by the ability's own ticks, which stop the moment the holder leaves: a disconnect, a dimension change, a server shutdown. The zone registers itself so it can be restored from outside, and the library's `SpreadingBlockCleanupHandler` does it on `PlayerLoggedOutEvent`, `EntityLeaveLevelEvent` and `ServerStoppingEvent`. You wire nothing. An addon that still ships its own copy of that handler, from before the library had one, can keep it until its next library update: a zone restores once and is found gone the second time.
- **Reading the zone from another ability.** `getCenterPos()` is where the zone was opened (`null` when it is closed), `getCurrentRadius()` how far it has spread, `getContinuityElapsedTicks()` how long it has been open, and `getPlacedBlocks()` every position it converted and still tracks, as a list that cannot be changed.
- **Closing zones from outside.** `SpreadingBlockAbility.restoreZonesOf(entity, level)` puts back at once every zone that entity holds, and `restoreAllZones()` every zone of the server. The library calls them itself when a holder leaves and when the server stops; call them from your own code only for a case of your own (an arena that resets, a command).
- **Eating your own zone's terrain.** To remove some of the zone's blocks during the zone, call `consumePlacedBlocks(entity, positions)`. It restores those positions and stops tracking them. Removing the blocks by hand would leave a permanent hole.
- **The ragged edge is intentional.** Conversion thins out towards the frontier on purpose, so a zone ends with a scattered rim rather than a clean disc. Genuine holes near the edge, on the other hand, mean the surface window is too small.
- **Restoring recomputes the block.** Restoring a block goes through `Block.updateFromNeighbourShapes`, so connections and properties like `snowy` are recomputed. Whatever rested on the converted surface (snow layers, flowers, torches) breaks when the block is replaced and does not come back.

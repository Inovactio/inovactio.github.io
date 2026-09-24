# Terrain

Two classes that change the world around the user in one sweep: a wave that converts blocks outward, and a flood that covers the ground after a charge.

## `BlockWaveAbility`

A radial wave. Block columns are sorted by distance from a centre and processed outward, so the conversion spreads visibly instead of appearing at once.

### What to implement

```java
public class MyWaveAbility extends BlockWaveAbility {

    public MyWaveAbility(AbilityCore<MyWaveAbility> core) {
        super(core);
        this.waveRadius = 40;
        this.followTerrain = true;
        this.crustDepth = 3;
    }

    @Override
    protected boolean canAffectBlock(LivingEntity entity, BlockPos pos, BlockState state) {
        return state.is(BlockTags.DIRT);
    }

    @Override
    protected void processBlock(LivingEntity entity, BlockPos pos, BlockState state) {
        entity.level().setBlock(pos, Blocks.SAND.defaultBlockState(), SET_BLOCK_FLAGS);
    }
}
```

Optional hooks: `onColumnStart`, `onFrontierTick(entity, frontierDistSq)` (effects on entities at the front), `onWaveComplete`, `onWaveCleanup`, `spawnFrontierParticles`, `getWaveTickSound` (played at the front every 10 ticks, `null` by default), `countsTowardsCrust`.

`SET_BLOCK_FLAGS` notifies clients without triggering neighbour reactions, which keeps a large wave from cascading block updates.

### The three column modes

Choosing the wrong mode is the most common mistake with this class.

| Mode | Shape | Vertical extent |
|---|---|---|
| default | a sphere of `waveRadius` | from `waveDepth` blocks **below the user** to the top of the sphere |
| `surfaceOnly = true` | a disc | one block per column: the surface near the user's height |
| `followTerrain = true` | a cylinder of `waveRadius` | `crustDepth` blocks below **each column's own surface** |

!!! warning "The default and `surfaceOnly` modes are measured from the user"
    Terrain 20 blocks lower than the user is never visited, even 3 blocks away: valleys, beaches and hollows stay untouched. If the wave has to follow the landscape, use `followTerrain`. It is also much cheaper at a large radius.

In `followTerrain` mode, each column is processed **from the bottom up**, so `processBlock` can rely on the block below being converted already. Return `false` from `countsTowardsCrust(state)` for blocks that should be processed without using up the crust depth, such as leaves and logs above the real ground.

### Settings

| Field | Default | Meaning |
|---|---|---|
| `waveRadius` | `80` | horizontal radius |
| `waveDepth` | `34` | depth below the user, default mode only |
| `blocksPerTick` | `20000` | processing budget |
| `innerSafeRadiusSq` | `9` | squared radius left untouched around the centre. `-1` includes the column under the user |
| `surfaceOnly` | `false` | disc mode |
| `followTerrain` | `false` | terrain mode, takes precedence over `surfaceOnly` |
| `crustDepth` | `7` | depth per column, terrain mode only |

### Driving the wave

The wave does not run itself: you call it from your ability's events.

| Method | Use |
|---|---|
| `prepareWave(entity, center)` | once, server side: sorts the columns and starts the wave |
| `tickWave(entity)` | each tick, at a fixed rate |
| `tickWaveUpToDistance(entity, maxDistSq)` | each tick, up to a squared distance, for a wave tied to a charge |
| `finishWaveInstantly(entity)` | processes everything left in one tick. Avoid on a large remainder |
| `stopWave(entity)` | cancels the wave |
| `isWaveActive()`, `isWaveDone()`, `getWaveProgress()` | state |

A wave that grows with a charge:

```java
private int chargeTicks;
private boolean chargeWasCancelled;

private void onChargeStart(LivingEntity entity, IAbility ability) {
    this.chargeTicks = 0;
    this.chargeWasCancelled = false;
    this.prepareWave(entity, entity.blockPosition());
}

private void onChargeTick(LivingEntity entity, IAbility ability) {
    this.chargeTicks++;
    if (this.isWaveActive()) {
        int target = (int) ((float) this.chargeTicks / CHARGE_TIME * this.waveRadius * this.waveRadius);
        this.tickWaveUpToDistance(entity, target);
    }
}

private void onChargeEnd(LivingEntity entity, IAbility ability) {
    if (this.chargeWasCancelled) {
        if (this.isWaveActive()) this.stopWave(entity);
        return;
    }
    if (this.isWaveActive()) this.finishWaveInstantly(entity);
}
```

!!! danger "Set the cancel flag before `stopCharging`"
    `stopCharging` fires the charge end event immediately, and that event also fires when the charge is interrupted from outside. Set `chargeWasCancelled` **before** calling `stopCharging`, or better, compare your own tick counter with the full charge time, which also catches stops you never see.

## `OceanAbility`

After a charge, fills the space above the ground around the user with a block: water, lava, or any block of your fruit.

```java
public class MyFloodAbility extends OceanAbility {

    public MyFloodAbility(AbilityCore<MyFloodAbility> core) { super(core); }

    @Override protected Block getOceanBlock(LivingEntity entity) { return Blocks.WATER; }
    @Override protected SoundEvent getChargeEndSound() { return SoundEvents.GENERIC_SPLASH; }
    @Override protected int getRadius() { return 12; }
    @Override protected float getChargeTime() { return 40.0F; }
    @Override protected int getCooldown() { return 600; }
}
```

The user is rooted and plays a crossed-arms pose while charging; both are released if the charge is stopped from outside (`IChargeInterruptible`). At the end, the block is placed above the surface of every column within `getRadius()`, within `VERTICAL_REACH` (10) blocks of the user's height:

- everything within `getGuaranteedDistance()` (default `5`) is always covered;
- further out, the chance falls off with distance, multiplied by `getBoostFactor()` (default `1.5`), which gives an irregular edge.

Placement goes through the base mod's block protection with `OceanAbility.OCEAN_COVER`, so protected areas are respected and only air and ground cover are replaced. Override `getBlockPredicate(entity)` for a different shape, `collectSurfaces(entity)` for a different set of candidates, or `getPlacementRule()` for a narrower rule.

!!! warning "`AIR_FOLIAGE` does not cover grass"
    The base mod's `AIR_FOLIAGE` is the union of two data tags: `mineminenomi:block_protection/air` (air, cave air, void air and the mod's two technical airs) and `block_protection/foliage` (leaves, small and tall flowers, saplings, vines). **Short grass, tall grass, ferns, dead bushes and crops are in neither**, so a placement through it silently skips every grassy block. `OCEAN_COVER` inherits `AIR_FOLIAGE` and adds a replace rule approving any replaceable block or plant that holds no fluid, rather than widening the base mod's tag for every ability that reads it. The rule's `check` approves a block as soon as one replace rule returns `true`.

!!! note "One surface per column"
    `collectSurfaces` walks each column inside the circle down from its height map (leaves ignored) and stops at the first solid block. Plants are not a surface: `isCoverable` treats anything replaceable **and any `BushBlock`** (flowers, ferns, saplings, crops, two-block plants) as ground cover the ocean lies over, since in 1.20.1 only short grass and snow layers are `canBeReplaced()` and a single flower used to drop its whole column. Until #378 the candidates came from a scan of the whole cube of side `2r+1`, some 90 000 positions at a radius of 32 in the tick the charge ended; the column scan reads a handful of blocks per column instead. A floor hidden under an overhang is no longer covered.

!!! warning "The placed block pays its own way"
    `OceanAbility` places hundreds or thousands of blocks at once and never removes them, so whatever the block does per tick is multiplied by that count. The base mod's `MucusBlock` ticks every tick with a flame scan, which is why the Beta Beta awakening places a block of its own that decays on a single scheduled tick.

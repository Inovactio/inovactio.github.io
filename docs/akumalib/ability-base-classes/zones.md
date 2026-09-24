# Zones

A zone is a charged area that grows around the user, holds for a while, and applies its effects to what is inside. Two classes share one parent:

| Class | For |
|---|---|
| `ZoneAbility` | a sphere that applies effects to entities inside it |
| `SpreadingBlockAbility` | a zone that also converts the ground, and restores it at the end |
| `DomainAbility` | their shared parent: the zone sounds and the "entity left the zone" tracking |

## `ZoneAbility`

### Lifecycle

1. **First press:** the user must be on the ground (unless `onGroundOnly` is `false`). A sphere is created, the charge starts, and the user is rooted for `chargeTime` ticks.
2. **During the charge:** the sphere grows. Pressing again **releases the zone early**, at the size it has reached, but only once `minChargeTime` ticks have passed.
3. **Charge end:** the zone holds for `zoneTime` ticks, applying its effects every effect interval.
4. **Pressing during the zone** closes it.
5. **Close:** effects listed for clearing are removed, the closing sound plays, and the cooldown starts **in proportion to the size reached**: `maxCooldown x (size / maxZoneSize)`, clamped between `minCooldown` and `maxCooldown`.

### A minimal zone

```java
public class MyZoneAbility extends ZoneAbility {

    public MyZoneAbility(AbilityCore<MyZoneAbility> core) {
        super(core);
        this.maxZoneSize = 20;
        this.chargeTime = 100;
        this.zoneTime = 400.0F;
        this.zoneColor = new Color(80, 160, 255, 75);
        this.setEffectsTickInterval(20);
    }

    @Override
    protected void applyEffectToLivingEntityInZone(LivingEntity owner, LivingEntity target) {
        this.applyOrRefresh(target, MobEffects.MOVEMENT_SLOWDOWN, 40, 1, false, true);
    }

    @Override
    protected List<MobEffect> getZoneEffectsToClearOnEnd() {
        return List.of(MobEffects.MOVEMENT_SLOWDOWN);
    }
}
```

### Settings

Set these from your constructor.

| Field | Default | Meaning |
|---|---|---|
| `maxZoneSize` | `128` | radius at a full charge |
| `minZoneSize` | `0` | smallest radius |
| `chargeTime` | `240` | ticks to reach `maxZoneSize` |
| `minChargeTime` | `60` | ticks before an early release is accepted |
| `zoneTime` | `1200` | ticks the zone holds after the charge |
| `minCooldown`, `maxCooldown` | `2400` | bounds of the proportional cooldown |
| `cancelCooldown` | `10` | length of the closing animation when the user closes the zone |
| `zoneColor` | white, alpha `50` | the sphere's colour |
| `onGroundOnly` | `true` | refuse the first press in mid-air |
| `applyEffectOnUser` | `false` | include the user in the zone's targets |
| `allowAnimation` | `true` | play the charging pose |
| `enableBlockOverlay` | `false` | highlight the blocks inside the zone on clients |
| `overlayArgb` | `0x50FFFFFF` | the overlay colour |
| `targetsCheck` | enemies | which living entities are affected |

Change the effect rate with `setEffectsTickInterval(ticks)`: it is safe to call from the constructor.

!!! warning "Always give `zoneColor` an alpha"
    The colour goes to the sphere as is. `new Color(r, g, b)` has an alpha of 255, which paints an **opaque dome** nobody can see out of. Use the four-argument constructor: around `50` for a saturated colour, `75` for a mid tone, `110` to `120` for a dark one.

### Hooks

| Override | Called |
|---|---|
| `applyEffectToLivingEntityInZone(owner, target)` | for each targeted living entity inside, every effect interval |
| `onEntityLeavesZone(owner, target)` | once, when an entity that was affected is no longer inside |
| `getZoneEffectsToClearOnEnd()` | at close, the effects to strip from everything that was affected |
| `endChargeBlocks`, `continuityTickBlocks`, `continuityEndBlocks` | block work at charge end, per tick, and at close |
| `applyEffectToNonLivingEntityInZone(owner, target)` | for items, arrows, orbs... only if `affectsNonLivingEntities()` returns `true` |

Useful helpers: `applyOrRefresh(target, effect, duration, amplifier, ambient, particles)`, `isEntityInZone(entity)`, `isPositionInZone(pos)`, `getZoneSize()`, `getCenterBlock()`.

!!! warning "The non-living hook needs the switch too"
    Overriding `applyEffectToNonLivingEntityInZone` alone does nothing: the scan never hands it a target. Override `affectsNonLivingEntities()` to return `true` as well. It widens every scan to every entity in the zone's box, so only do it when the zone really acts on them.

!!! danger "Zone damage is an unguarded pulse"
    `applyEffectToLivingEntityInZone` runs on every effect interval, for every target. Deal damage there with `hurtTarget`, **not** `hurtBurst`, unless the interval is longer than 10 ticks. See [Damage](../core-concepts/damage.md#which-call-to-use).

### Interrupting a charge from outside

`DomainAbility.interruptCharge(entity)` cancels a zone's charge as if it had never started, for an ability that breaks
the caster's concentration. It returns whether a charge was running; nothing is put on cooldown.

**AkumaLib calls it itself** for every `AbilityHelper.emergencyStopAbility` - kairoseki, water, handcuffs, any
`disableAbilities` caller - through `AkumaCharges.interrupt`, which is also the call to make for an interruption of
your own when the ability may not be a domain. See [Charges](../core-concepts/charges.md#a-charge-stopped-from-outside).

| Class | What it takes back |
|---|---|
| `ZoneAbility` | the sphere spawned at charge start, the charge's `MOVEMENT_BLOCKED` and pose. A closing zone (the owner shutting it) is left alone |
| `SpreadingBlockAbility` | every block the charge had already spread, through the same restore queue as a normal close (over `restoreTicks`), the lock and the pose |
| any other `DomainAbility` | nothing: the default returns `false` |

!!! danger "Neither charge-component call is safe on a domain"
    `ChargeComponent.stopCharging` runs the charge-end event, and a domain opens its zone there, at the size reached.
    `forceStopCharging` skips the event but leaves what the charge put in the world: a sphere that is never discarded,
    or blocks with no continuity left to restore them. Call `AkumaCharges.interrupt`, which picks `interruptCharge`
    for a domain.

!!! note "The spreading restore is queued"
    It used to be `restoreImmediately`, which at a large radius is tens of thousands of `setBlock` calls in one tick.
    The zone stays in `ACTIVE_ZONES` until the queue is drained, so a disconnect in between still restores everything,
    and a recast flushes whatever is left first.

## Zone sounds: `ZoneSoundSet`

`DomainAbility` plays four sounds over a zone's life. Declare them as data from your constructor:

```java
this.setZoneSounds(ZoneSoundSet.of(MySounds.ZONE_CREATE, MySounds.ZONE_CHARGE,
                MySounds.ZONE_EXPAND, MySounds.ZONE_END)
        .pitches(0.9F, 0.85F, 1.0F, 0.9F)
        .jitters(0.0F, 0.2F, 0.0F, 0.0F));
```

| Slot | When | Default volume |
|---|---|---|
| create | the charge starts | `3.0` |
| interval | repeatedly while the zone charges | `1.5` |
| charge end | the zone reaches full size | `3.0` |
| end | the zone closes | `2.0` |

Pass the `RegistryObject`s directly, without `.get()`. `.volumes(...)`, `.pitches(...)` and `.jitters(...)` take one value per slot, in that order.

!!! tip "Add jitter to the interval sound"
    A charge sound repeated for hundreds of ticks turns robotic. A pitch jitter of about `0.2` on the interval slot keeps it natural.

!!! warning "Declare the interval clip's length"
    The interval slot is replayed every **18 ticks** by default - the pace of the base mod's short Room sound. A longer clip restarted that often plays two or three copies of itself over each other for the whole charge. Give the set the clip's length and it replays it only once a play has finished:

    ```java
    this.setZoneSounds(ZoneSoundSet.of(MySounds.ZONE_CREATE, MySounds.ZONE_CHARGE,
                    MySounds.ZONE_EXPAND, MySounds.ZONE_END)
            .pitches(1.0F, 0.8F, 1.0F, 1.0F)
            .intervalClip(3.0F));   // seconds, at pitch 1
    ```

    The cadence is worked out at the slot's **base pitch**, its slowest, since jitter only raises the pitch and a lower pitch plays a clip for longer: a 3 s clip at pitch `0.8` lasts 3.75 s, so it is replayed every 75 ticks. `setZoneSounds` sets `playSoundInterval` from it; assign that field yourself only before the call, or not at all.

    A clip replayed back to back also wants a short fade at both ends, or each restart clicks.

!!! note "No sound set means the base mod's Room sounds"
    Leaving `setZoneSounds` unset plays the Ope Ope no Mi's Room sounds. That is a deliberate fallback, not a default to ship with.

## `SpreadingBlockAbility`

A zone that replaces the ground under it with a block of your choice as it grows, applies effects to what stands on it, optionally hardens into a second block, and **puts every original block back** when it closes.

### What to implement

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

### Settings

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

### Throughput: four budgets

A large zone touches tens of thousands of blocks, and each phase has its own ceiling. Forgetting one produces a lag spike at a precise moment.

| Phase | Setting | What goes wrong |
|---|---|---|
| propagation | `blocksPerTick`, capped by `burstMultiplier` | the front never reaches the advertised radius, or a single tick places thousands of blocks |
| hardening | `hardenTicks` | the server freezes the moment the zone reaches full size |
| restore | `restoreTicks` | the default of 30 ticks is thousands of `setBlock` calls per tick on a huge zone |
| memory | `surfaceLayers` | the original state of **every** converted block is kept for the zone's lifetime |

!!! warning "`blocksPerTick` counts blocks, not columns"
    Going to three layers without raising the budget divides the speed of the front by three. The total work to reach `maxRadius` is fixed: halving `chargeTime` means doubling `blocksPerTick`.

For reference, a radius-110 zone with three layers (about 114,000 blocks) runs well at `chargeTime=110`, `blocksPerTick=520`, `burstMultiplier=2`, `hardenTicks=160`, `restoreTicks=160`.

!!! tip "Large radius, uneven terrain"
    Past a radius of about 40, valleys and hollows fall outside the default `+4 / -8` surface window and stay unconverted for good. Raise it to around `+8 / -32`.

### Traps

!!! info "Zones are restored when their holder leaves"
    The restore is normally driven by the ability's own ticks, which stop the moment the holder leaves: a disconnect, a dimension change, a server shutdown. The zone registers itself so it can be restored from outside, and the library's `SpreadingBlockCleanupHandler` does it on `PlayerLoggedOutEvent`, `EntityLeaveLevelEvent` and `ServerStoppingEvent`. You wire nothing.

    An addon that still ships its own copy of that handler, from before the library had one, can keep it until its next library update: a zone restores once and is found gone the second time.

!!! warning "Reject your own blocks in `canReplaceBlock`"
    The default accepts any block with a solid top face. A zone spreading over blocks another ability of the same fruit placed records them as "original" and puts them back **permanently** at the end.

!!! warning "Override both replacement predicates together"
    Layers below the surface go through `canReplaceSubSurfaceBlock`, not `canReplaceBlock`. The surface predicate requires a solid top face, which would stop the descent at the first dirt path or leaf block. A subclass overriding one must override the other.

!!! warning "Blocks you place yourself need `onZoneEndBlocks`"
    The zone only restores what **it** converted. A wall raised from `onChargeEndTransition` is invisible to the restore and would stand forever. Take such blocks down in `onZoneEndBlocks(Level)`, which runs at a normal close **and** on the disconnect path, so it must be safe to run twice.

!!! note "Eating your own zone's terrain"
    To remove some of the zone's blocks during the zone, call `consumePlacedBlocks(entity, positions)`. It restores those positions and stops tracking them. Removing the blocks by hand would leave a permanent hole.

!!! info "The ragged edge is intentional"
    Conversion thins out towards the frontier on purpose, so a zone ends with a scattered rim rather than a clean disc. Genuine holes near the edge, on the other hand, mean the surface window is too small.

Restoring a block goes through `Block.updateFromNeighbourShapes`, so connections and properties like `snowy` are recomputed. Whatever rested on the converted surface (snow layers, flowers, torches) breaks when the block is replaced and does not come back.

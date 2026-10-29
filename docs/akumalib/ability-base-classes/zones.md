# Zones

A zone is a charged area that grows around the user, holds for a while, and applies its effects to what is inside. Two classes share one parent:

| Class | For |
|---|---|
| `ZoneAbility` | a sphere that applies effects to entities inside it |
| [`SpreadingBlockAbility`](spreading-blocks.md) | a zone that also converts the ground, and restores it at the end |
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

The non-living hook needs its switch: overriding `applyEffectToNonLivingEntityInZone` alone does nothing, because the scan never hands it a target. Override `affectsNonLivingEntities()` to return `true` as well. It widens every scan to every entity in the zone's box, so only do it when the zone really acts on them.

Useful helpers: `applyOrRefresh(target, effect, duration, amplifier, ambient, particles)`, `isEntityInZone(entity)`, `isPositionInZone(pos)`, `getZoneSize()`, `getCenterBlock()`.

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

??? note "Why the spreading restore is queued"
    It used to be `restoreImmediately`, which at a large radius is tens of thousands of `setBlock` calls in one tick.
    The zone stays in `ACTIVE_ZONES` until the queue is drained, so a disconnect in between still restores everything,
    and a recast flushes whatever is left first.

## Zone sounds: `ZoneSoundSet`

`DomainAbility` plays four sounds over a zone's life. Declare them as data from your constructor. Leaving `setZoneSounds` unset plays the Ope Ope no Mi's Room sounds: a deliberate fallback, not a default to ship with.

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

Pass the `RegistryObject`s directly, without `.get()`. `.volumes(...)`, `.pitches(...)` and `.jitters(...)` take one value per slot, in that order. Give the interval slot a pitch jitter of about `0.2`: a charge sound repeated for hundreds of ticks turns robotic, and the jitter keeps it natural.

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

The zone that also converts the ground has its own page: [Spreading blocks](spreading-blocks.md).

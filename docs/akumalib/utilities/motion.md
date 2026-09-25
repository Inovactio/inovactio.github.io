# Pulls and pushes: `AkumaMotion`

Moving a body toward a point: a target reeled in, a user thrown at an anchor, loot drawn to hand.

```java
private static final PullProfile REEL = PullProfile.builder()
        .base(0.9D).perBlock(0.05D).max(3.4D)   // grows with the gap, capped
        .lift(0.35D)
        .minDistance(0.5D)
        .build();

AkumaMotion.pullToward(target, caster.position(), REEL);         // from the mover's feet
AkumaMotion.pull(target, targetCentre, casterCentre, REEL);       // between two chosen points
```

Both return `false` and move nothing when the gap is under `minDistance`.

## The speed curve

`speed(d) = min(max, base + perBlock × d) × boost`, along the direction to the point.

| Shape | Settings |
|---|---|
| grows with the gap, capped | `base`, `perBlock`, `max` |
| linear from zero | `base(0)`, `perBlock`, and optionally `max` |
| fixed speed | `base(v)`, `perBlock(0)` |
| one technique throws harder than its siblings | `boost`, applied after the cap |

!!! warning "A flat speed does not reach a far anchor"
    Gravity and drag drop a body launched at a constant speed well short of a 50-block anchor. The technique then reads as broken rather than weak. Let the speed grow with the gap, and cap it: the cap is also what keeps a player under the server's "moved too quickly" rejection.

!!! warning "Boost, don't raise a shared cap"
    Techniques that share a curve should differ by `boost`. Raising the cap to give one of them more force quietly raises it for all of them.

## The vertical component

| `vertical` | y |
|---|---|
| `ADD_LIFT` (default) | the direction's own y, plus `lift`. A point below pulls down |
| `FORCE_UP` | `abs(y)` plus `lift`. Always a hop, for a body dragged along the floor |
| `REPLACE` | `lift` alone. A horizontal pull with a fixed hop |

## Replace or add

| `mode` | Effect |
|---|---|
| `REPLACE` (default) | the body's own motion is discarded, so a fleeing target stops fleeing |
| `ADD` | added to the current motion, as `Entity.push` does. It accumulates if applied every tick |

## What the helper takes care of

- **The velocity always goes through `AbilityHelper.setDeltaMovement`.** A player's client discards a velocity the server sets directly. The wrapper handles every entity: a player gets the motion packet, anything else gets `hurtMarked`. It also clears `onGround` for an upward velocity.
- **The degenerate direction.** `minDistance` never goes below `1.0E-4`.

!!! warning "A body carrying a rider is not synced"
    The base mod's wrapper only sets `hurtMarked` when the entity is not a vehicle. A pulled horse with a rider on it moves on the server alone.

Protection is a separate question: see [Protected areas](protection.md) before moving anybody.

## Pushing along a direction

*Since 2.6.0.* A push along a direction rather than toward a point: where the user looks, the line a gust travels, the flight of a projectile.

```java
AkumaMotion.shoveAlong(target, caster.getLookAngle(), 1.2, 0.4);   // replaces the body's motion
AkumaMotion.nudgeAlong(target, flight, 0.6, 0.3);                  // adds to it
```

| Method | Horizontal | Vertical |
|---|---|---|
| `shoveAlong` | replaced: `push` blocks a tick along the flattened direction | replaced by `lift` |
| `nudgeAlong` | `push` added to the current motion | at least `lift` |

The direction is flattened and normalised for you. ⚠️ **A direction with no horizontal part** (straight up, or a target standing exactly on the origin) is the case every hand-written push gets wrong: `Vec3.normalize` returns `ZERO`, not NaN, so the push silently does nothing. `shoveAlong` turns it into a straight lift of `max(lift, push)`; `nudgeAlong` adds nothing horizontally.

# Effect owners: `EffectOwners`

Who applied an effect to whom.

```java
EffectOwners.set(target, AwakenEffects.ENTHRALLED.get(), charmer);

if (EffectOwners.isAppliedBy(target, AwakenEffects.ENTHRALLED.get(), attacker)) {
    // the attacker is the one who charmed them
}
```

## Why it exists

A `MobEffectInstance` carries a duration and an amplifier and **nothing else** — no owner. An effect whose whole point is the relationship needs the owner kept beside it:

- *this target may not hurt the one who charmed them*;
- *this target's invulnerability frames do not hold off the surgeon who put them under, nor their side*.

| Member | Answers |
|---|---|
| `set(target, effect, owner)` | records it |
| `getId(target, effect)` | the owner's UUID, or `null` |
| `get(target, effect)` | the owner resolved to a `LivingEntity`, in **the target's** level |
| `isAppliedBy(target, effect, candidate)` | the question actually asked |
| `clear(target, effect)` | forgets it |

!!! warning "Keyed on the target's UUID, not on the target"
    The hand-rolled version of this was a `WeakHashMap<LivingEntity, UUID>`, and that loses its entry whenever the entity **object** is replaced while the effect survives on the reloaded one: a player changing dimension or respawning, a mob whose chunk unloads and comes back. The effect then keeps running with its owner gone and nothing reports it — a charm that quietly stops protecting the charmer. Both places in AwakenAwakenNoMi that did this were reachable inside the effect's own duration.

!!! warning "It does not survive a server restart, on purpose"
    Persisting to the target's NBT was the shape originally proposed. Measured, the two effects that need an owner run for **6 and 20 seconds**, which no restart fits inside — writing and evicting NBT for that would be cost with no case behind it. An effect that genuinely outlives a restart should carry its owner in its own persisted state rather than here.

## Cleanup

A read that finds the effect gone drops its own entry, so the normal path cleans up after itself. A ten-minute age cap, swept on the next `set`, is only a safety valve for an entry nothing ever reads again; the whole map is dropped on `ServerStoppedEvent`.

## What does *not* belong here

Per-carrier **scratch state** — the last tick an effect did something, the position it started from, what it has already hit. That is per-session and per-object by nature, and losing it when an entity is replaced is usually the right answer rather than a bug. Keep it in a `WeakHashMap` beside the effect and say so.

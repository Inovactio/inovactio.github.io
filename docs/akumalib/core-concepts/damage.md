# Damage

Two things stand between the damage number you write and the damage a target takes: a factor the base mod applies to every ability, and vanilla's invulnerability frames. Both are silent.

## The x0.4 factor

Mine Mine no Mi multiplies **any damage tied to an ability** by `0.4` before armour is applied. It happens inside the base mod's damage pipeline, for every source that carries an `AbilityCore`, which includes:

- `DealDamageComponent.hurtTarget`, the usual way an ability hurts something;
- any `NuProjectileEntity` fired with its `IAbility`.

So a constant of `10` deals `4`.

### Declare damage in real HP, scale at the call site

Keep every damage constant in the HP a player will actually lose, and convert it where it is used with `AkumaAbilityHelper.scaledDamage`, which divides by `0.4`:

```java
/** Real HP. Scaled at the call site. */
private static final float DAMAGE = 8.0F;

// dealing it
this.dealDamageComponent.hurtTarget(user, target, AkumaAbilityHelper.scaledDamage(DAMAGE));

// showing it in the tooltip: getTooltip applies x0.4 too, so it needs the same scaled value
.addAdvancedDescriptionLine(AbilityDescriptionLine.NEW_LINE,
        DealDamageComponent.getTooltip(AkumaAbilityHelper.scaledDamage(DAMAGE)))
```

For a projectile, pass the scaled value to `setDamage`, and use `AkumaAbilityHelper.getProjectileTooltipsScaled()` instead of `ProjectileComponent.getProjectileTooltips()`, which shows the raw, unreduced number.

!!! tip "Why real HP"
    A constant in real HP can be compared directly with the base mod's own techniques and with other addons. A constant in raw units cannot, and a file that mixes both is where a balance bug hides.

!!! warning "A value that already comes from the world is already real HP"
    An entity's health, a gauge filled from damage taken, an item's HP: passing one of these straight to `hurtTarget` silently divides it by 2.5. A pool of 100 HP deals 40. Scale it like any other constant.

### Sources the factor does not touch

The test is not what the ability looks like, but **whether the damage source carries an `AbilityCore`**. These do not, so their values are already real HP:

| Source | Why |
|---|---|
| `target.hurt(level.damageSources().magic(), value)` | a vanilla source, no ability attached |
| a `NuProjectileEntity` built without its `IAbility` | the ability is what carries the factor |
| `AbilityExplosion.setStaticDamage(value)` | it builds a vanilla explosion source |
| a custom `DamageSource` constructed with no `AbilityCore` | same reason |

!!! danger "Do not quote these through `DealDamageComponent.getTooltip`"
    `getTooltip` applies `x0.4`, so a tooltip for an unscaled source understates it by 2.5 times. Build the stat line with the base mod's `AbilityStat.Builder` instead.

## Invulnerability frames

Every hit sets `invulnerableTime = 10` on the target, and for those 10 ticks vanilla **drops any blow that is not stronger than the last one**. `LivingEntity.hurt` returns `false` and nothing else happens.

For a technique on a long cooldown, that is a real problem: if anyone hit the target half a second earlier, your burst deals **zero**, starts its cooldown anyway, and every side effect you gated on the hit silently does not happen.

### `hurtBurst`, for bursts only

`AkumaAbilityHelper.hurtBurst` clears the target's invulnerability frames, then deals the damage:

```java
if (AkumaAbilityHelper.hurtBurst(this.dealDamageComponent, user, target,
        AkumaAbilityHelper.scaledDamage(DAMAGE))) {
    // only runs when the damage actually landed
    target.addEffect(new MobEffectInstance(ModEffects.BLEEDING.get(), 100, 0));
}
```

It also:

- refuses the caster itself, a dead target, and zero damage;
- **honours `AkumaEffects.INVULNERABLE`**, so it never punches through an ability that made someone invulnerable;
- returns whether the damage was applied, which is what a mark, a heal or a push should be gated on;
- does **not** apply `scaledDamage`: scale at the call site, as everywhere else.

!!! danger "Never on a repeating pulse"
    Vanilla's invulnerability frames are what **rate-limit** damage that repeats every tick. Clearing them on every pulse multiplies the damage by the pulse rate: a zone dealing 18 every tick goes from roughly 36 damage per second to roughly 360.

### Which call to use

Decide by the **method the damage is dealt in**, not by the file:

| The damage happens in | Call | Gate side effects on the result? |
|---|---|---|
| a discrete burst: a use event, a charge end, a landing, a detonation | `hurtBurst` | **yes** |
| a recurrence guarded per target: a `HitTrackerComponent`, a private "already hit" set | `hurtBurst` | **yes** |
| an unguarded pulse: a continuity tick, a passive tick, a zone tick | `hurtTarget` | **no** |
| a cadence already longer than 10 ticks | `hurtTarget` | no, there is nothing to clear |

!!! note "`HitTrackerComponent.canHit` tests and records at once"
    There is no separate "mark as hit" method. `canHit(target)` marks the target before you know whether the damage landed, so without `hurtBurst` an invulnerable-framed target would be marked, take nothing, and be skipped for the rest of the cast. Clearing the frames is what makes the mark truthful.

!!! tip "Comment the deliberate `hurtTarget` calls"
    The two categories look identical in a search. A one-line comment on every call site that stays on `hurtTarget` on purpose saves the next reader from "fixing" it into a damage multiplier.

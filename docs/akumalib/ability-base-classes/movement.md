# Movement

Dashes, teleports, stomps, and the ground check they often need.

## `MoveAbility`

A held dash: the user is driven along their look direction for a few ticks and hurts what they pass through.

```java
public class MyChargeAbility extends MoveAbility {

    public MyChargeAbility(AbilityCore<MyChargeAbility> core) {
        super(core);
    }

    @Override public float getDashCooldown() { return 160.0F; }
    @Override public float getDamage() { return AkumaAbilityHelper.scaledDamage(6.0F); }
    @Override public float getRange() { return 1.5F; }
    @Override public double getSpeed() { return 1.8; }

    @Override
    public void onTargetHit(LivingEntity entity, LivingEntity target, float damage, DamageSource source) {
        // knockback, an effect... only called when the damage landed
    }
}
```

- Pressing starts the dash for `getHoldTime()` ticks (default `10`); pressing again stops it.
- Each tick, the user's velocity is set along the look direction at `getSpeed()`. Gravity still applies unless you call `setNoGravity()`.
- Targets within `getRange()` are hurt through `hurtBurst`, **at most once every 10 ticks each**, and `onTargetHit` runs for each hit that landed.
- The cooldown starts when the dash ends.

!!! warning "The damage is raw"
    Return `AkumaAbilityHelper.scaledDamage(realHp)` from `getDamage()`.

Override `getDamageSource(entity)` for a custom source, and `isParallel()` if the dash must run alongside other continuous abilities.

## `DashAbility`

The base mod's own `DashAbility`, with two hooks added: `startContinuityEvent` runs right **after** the native dash has moved the user, and `endContinuityEvent` right after the native stop and cooldown. Use them for animations and effects without reimplementing the dash. `onTargetHit` stays abstract.

## `InstantDashAbility`

A charged teleport: the user charges briefly, then reappears further along their look direction, hitting everything on the path.

```java
public class MyBlinkAbility extends InstantDashAbility {

    public MyBlinkAbility(AbilityCore<MyBlinkAbility> core) {
        super(core);
    }

    @Override public float GetDashDistance() { return 12.0F; }
    @Override public float GetDamage() { return AkumaAbilityHelper.scaledDamage(5.0F); }
    @Override public float GetChargeTime() { return 1.0F; }
    @Override public float GetCooldown() { return 120.0F; }
}
```

- During the charge the user is rooted, and a player's camera cannot turn more than 45 degrees away from where the charge started.
- **Pressing again during the charge cancels the dash**: no teleport, and no cooldown.
- The teleport stops at the first block on the path, and short of the first projectile in the way. Every target along the path is hit once through `hurtBurst`, over a width of `GetWidth()` blocks (default `2.5`). Override it for a narrower or wider dash.
- It plays the base mod's dash swoosh: override `hasSound()` or `PlaySound(entity)` to change it, and `hasParticles()` / `SpawnParticles(target)` for hit particles.
- The base mod's momentum check applies: a body that cannot jump cannot dash.

!!! warning "The damage is raw"
    Return `AkumaAbilityHelper.scaledDamage(realHp)` from `GetDamage()`.

!!! danger "Animations started before the cooldown are cut off"
    The cooldown start event stops the ability's `animationComponent`, right after the teleport. An animation meant to be seen as the user arrives must be started **after** that, by overriding `startCooldownEvent` and calling `super` first:

    ```java
    @Override
    public void startCooldownEvent(LivingEntity entity, IAbility ability) {
        super.startCooldownEvent(entity, ability);
        this.animationComponent.start(entity, MyAnimations.ARRIVE, 8);
    }
    ```

## `StompAbility`

A charged area stomp: the user is rooted while charging, then everything around them is hurt, and optionally the blocks around them are affected.

```java
public class MyStompAbility extends StompAbility {

    public MyStompAbility(AbilityCore<MyStompAbility> core) {
        super(core);
    }

    @Override public int getRadius() { return 6; }
    @Override public int getDamage() { return (int) AkumaAbilityHelper.scaledDamage(8.0F); }
    @Override public double getCooldown() { return 240.0; }

    @Override
    protected void applyEffectToTarget(LivingEntity owner, LivingEntity target, IAbility ability) {
        // only called when the damage landed
    }
}
```

| Override | Default | Meaning |
|---|---|---|
| `isChargeable()` | `true` | `false` stomps on the press |
| `getChargeTime()` | `20` | charge length |
| `isStuckWhileCharging()` | `true` | root the user and play the aiming pose. Both are released too when the charge is stopped from outside |
| `getRadius()` | `8` | area radius |
| `getDamage()` | `20` | damage, **raw** |
| `getCooldown()` | `200` | cooldown |
| `hasEffectOnBlock()` | `false` | whether `applyEffectOnBlock` runs on nearby blocks |
| `getBlockPredicate(entity)`, `getBlockPos(entity)` | | which blocks, around which centre |
| `afterStomp(entity, ability)` | nothing | runs after the stomp |

Targets are hurt through `hurtBurst`, and `applyEffectToTarget` only runs when the damage landed. A `blockPlacingHelper` is provided and cleared at each use, to track blocks the stomp places.

!!! warning "`getDamage()` returns an `int`, and it is raw"
    Scale and round explicitly, as above. The default of `20` deals 8 real HP.

## `GroundAbility`

A minimal base for techniques that must be used standing on the ground. It adds `ensureOnGroundOrNotify(user)`, which returns `false` in mid-air and tells a player why.

```java
private void onUseEvent(LivingEntity entity, IAbility ability) {
    if (!this.ensureOnGroundOrNotify(entity)) {
        return;
    }
    // ...
}
```

The same check is available anywhere as `AkumaAbilityHelper.ensureOnGroundOrNotify(user)`.

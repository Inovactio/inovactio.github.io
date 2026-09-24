# Grabs

`GrabAbility` takes hold of another living entity and keeps hold of it. The class owns the machinery every grab needs, so a subclass only says what it does with the body.

## What the class handles

- **One key, four outcomes**, decided by the grab's state: reach out, stop reaching, let go early, or nothing.
- **The reach window:** after a press, the first entity the user hits becomes the grabbed target, and that hit deals no damage. If something is already within arm's length, it is grabbed immediately.
- **The pull and the hold:** the target is carried to `heldDistance` in front of the user and held there, with the base mod's `GRABBED` effect.
- **The cooldown**, charged exactly once however the grab ends.
- **One grab at a time:** the ability joins the base mod's grab pool.

## What to implement

```java
public class MyGrabAbility extends GrabAbility {

    private static final float HOLD_DAMAGE = 1.0F;
    private static final float FINISH_DAMAGE = 6.0F;
    private final Interval damageInterval = new Interval(20);

    public MyGrabAbility(AbilityCore<MyGrabAbility> core) {
        // reach time, hold time, cooldown, held distance
        super(core, 20.0F, 60.0F, 200.0F, 2.0F);
    }

    @Override
    protected void onGrabbed(LivingEntity user, LivingEntity target) {
        this.damageInterval.restartIntervalToZero();
        user.level().playSound(null, target.blockPosition(), SoundEvents.PLAYER_ATTACK_STRONG,
                SoundSource.PLAYERS, 1.0F, 0.8F);
    }

    @Override
    protected void onHoldTick(LivingEntity user, LivingEntity target) {
        if (!this.damageInterval.canTick()) return;
        // a cadence of 20 ticks: already outside the i-frame window, so hurtTarget
        this.dealDamageComponent.hurtTarget(user, target, AkumaAbilityHelper.scaledDamage(HOLD_DAMAGE));
    }

    @Override
    protected void onRelease(LivingEntity user, LivingEntity target, boolean completed) {
        if (!completed) return;
        AkumaAbilityHelper.hurtBurst(this.dealDamageComponent, user, target,
                AkumaAbilityHelper.scaledDamage(FINISH_DAMAGE));
    }
}
```

| Hook | When | Notes |
|---|---|---|
| `onGrabbed(user, target)` | the target has arrived in the user's hands | server side only, target never `null` |
| `onHoldTick(user, target)` | every tick of the hold | server side only. Damage over time goes here |
| `onRelease(user, target, completed)` | the hold is over, the body still in hand | **abstract**. `completed` is `false` when the user let go early |

The protected `grabComponent`, `dealDamageComponent`, `hitTrackerComponent` and `animationComponent` are available to subclasses.

## Options

| Override | Default | Meaning |
|---|---|---|
| `getHoldAnimation()` | `null` | an animation played for the whole hold, started and stopped by the class |
| `holdsUserStill()` | `true` | root the user during the hold. `false` lets them drag the target around |
| `requiresEmptyHands()` | `true` | refuse the grab with something in hand. Return a constant: it is read from the constructor |
| `getWhiffCooldown()` | `AkumaAbilityHelper.FAILED_PRESS_COOLDOWN` (10) | cooldown when nothing was caught |

!!! tip "Keep the state in instance fields"
    Every holder of the fruit has their own ability instance. An `Interval` or a counter declared `static` would be shared between every player using the technique.

## The cooldown rules

- **Caught nothing** (the reach timed out, the user cancelled it, the target slipped loose during the pull): `getWhiffCooldown()`. Charging the full cooldown for a swing at air makes a grab unusable against a moving target.
- **Caught something**, whether the hold completed or the user let go early: the full cooldown. A grab that could be tapped and cancelled for free would be a free interrupt on anyone within reach.

## Ranged grabs: `beginGrab`

The built-in path is a melee catch. A tongue, a rope or a harpoon decides its target when a projectile lands, and can start the grab from there:

```java
// in your projectile's entity hit; getParent() returns an Optional
if (this.getParent().orElse(null) instanceof MyTongueAbility tongue) {
    tongue.startFromProjectile(owner, hitEntity);
}

// in the ability
public boolean startFromProjectile(LivingEntity user, LivingEntity target) {
    return this.beginGrab(user, target);
}
```

Everything downstream is unchanged: the pull, `onGrabbed`, the hold and `onRelease`. `beginGrab` is server side only, refuses a second grab while one is running, and applies the one-tick anti-knockback that stops the impact from knocking the target straight back out.

!!! warning "Damage cadence during the hold"
    `onHoldTick` runs every tick. Rate-limit the damage with an `Interval`, and follow [the damage table](../core-concepts/damage.md#which-call-to-use): `hurtTarget` for a cadence over 10 ticks, `hurtBurst` for the single blow in `onRelease`.

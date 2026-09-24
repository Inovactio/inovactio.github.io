# Projectiles

Both library projectiles extend the base mod's `NuProjectileEntity`. Its rules apply to them, and to any projectile of your own.

## Rules for any `NuProjectileEntity`

### Pass the ability, and scale the damage

```java
public MyProjectile(Level level, LivingEntity thrower, IAbility ability) {
    super(MyEntities.MY_PROJECTILE.get(), level, thrower, ability);
    this.setDamage(AkumaAbilityHelper.scaledDamage(DAMAGE));
    this.setMaxLife(40);
}
```

Passing the ability makes the damage source carry the `AbilityCore`, with its Haki nature, element and source types. Without it, Logias can ignore the projectile and Haki interactions do not work. It also turns on the `x0.4` factor, which is why `setDamage` takes a scaled value. See [Damage](../core-concepts/damage.md).

Quote the damage in the tooltip with `AkumaAbilityHelper.getProjectileTooltipsScaled()`.

### `onHitEntity` is the class's own method, not a hook

`NuProjectileEntity` declares `onHitEntity(EntityHitResult)` **and** a nested interface `IOnHitEntityEvent` with the same method. Writing `implements IOnHitEntityEvent` plus an `onHitEntity` method **overrides the class method**; it does not register a listener.

What `super.onHitEntity` does, and what an override without `super` silently throws away:

| Step | Lost without `super` |
|---|---|
| the protected-area check | the projectile hurts inside protected areas |
| **the damage** from `setDamage` | `setDamage` becomes dead code |
| the knockback from `setKnockback` | no knockback |
| the removal on the target | a non pass-through projectile flies on through it |

!!! danger "Call `super`, or deal the damage yourself: never neither"
    An override that adds an effect and forgets `super` lands the effect and never the damage, while the tooltip still advertises it.

!!! warning "Do not also register yourself as a listener"
    If an `onHitEntity` override calls `super`, do not add the same method with `addEntityHitEvent`: `super` dispatches the listeners, which call your method, which calls `super`, forever.

!!! warning "An entity hit can fire your block impact"
    `super.onHitEntity` also calls your `onHitBlock` at the target's position. A projectile overriding both gets its block impact triggered by an entity hit; guard it with a flag.

### Entity hits repeat every tick

Each tick, the projectile sweeps its path and calls `onHitEntity` for **every** entity it finds, keeping no record of what it already hit. The only thing that normally stops a second hit is the removal at the end of `super.onHitEntity`, and that is skipped when:

- the projectile passes through entities;
- the shot is point-blank (its first two ticks);
- the override does not call `super`.

!!! danger "A pass-through projectile hits once per target per tick"
    If the impact must happen once, track the targets yourself in a `Set<UUID>`, as `BoomerangProjectile` does.

### Block hits remove the projectile for you

After your `onHitBlock`, `onHit` removes a projectile that does not pass through blocks. You do not need `discard()` for a block impact, and an early `return` from `onHitBlock` does **not** keep the projectile alive: override `onHit` for that, as `BoomerangProjectile` does.

### An explosion needs the component on the parent ability

A projectile calling `ExplosionComponent.createExplosion(ability, ...)` depends on **the ability** having registered an `ExplosionComponent`:

```java
private final ExplosionComponent explosionComponent = new ExplosionComponent(this);
// in the ability's constructor
this.addComponents(this.projectileComponent, this.explosionComponent);
```

!!! danger "Forget it and nothing explodes"
    The helper throws, prints the stack trace to the console, and returns. The projectile flies and expires normally, and nothing reaches the log files. Treat a silent no-op from a base mod component helper as a missing `addComponents` until proven otherwise.

## `BoomerangProjectile`

A projectile that flies out, turns around and comes back to whoever threw it, **hitting on both legs** of the trip. It reuses the steering of the base mod's chakram, but extends `NuProjectileEntity`, so its damage goes through the ability pipeline like any Devil Fruit technique.

```java title="MyBoneProjectile.java"
public class MyBoneProjectile extends BoomerangProjectile {

    private static final float DAMAGE = 6.0F;

    public MyBoneProjectile(EntityType type, Level level) {
        super(type, level);
    }

    public MyBoneProjectile(Level level, LivingEntity thrower, IAbility ability) {
        super(MyEntities.BONE.get(), level, thrower, ability);
        this.setDamage(AkumaAbilityHelper.scaledDamage(DAMAGE));
        this.setOutboundTicks(15);
    }
}
```

Fire it like any projectile, through the ability's `ProjectileComponent`.

### How the trip works

| Phase | Behaviour |
|---|---|
| out | flies flat (no gravity) and passes through entities |
| turn | after `setOutboundTicks` ticks (default `20`), or when it hits a block on the way out |
| back | steers towards the thrower's eyes, slowing slightly each tick |
| end | caught within 2 blocks of the thrower, or dropped if it hits a block on the way back |

- **Each target is hit once per leg**: the record of hit targets is cleared at the turn.
- **The lifetime follows the outbound time**: four times it, so a long throw cannot expire on the way home. `setOutboundTicks` keeps both in step.
- **A thrower who died, logged out or became a spectator** makes the boomerang disappear rather than circle forever.
- `turnBack()` turns it around early; calling it twice does nothing. `isReturning()` tells which leg it is on.

!!! warning "Call `super` in your own `onHitEntity`"
    The class overrides `onHitEntity` to allow one hit per target per leg, and `super` there is what deals the damage. An override of your own must call `super.onHitEntity(result)` too.

## `TransmutationProjectile`

A projectile applying a transmutation effect, whose duration grows with the **Doriki gap** between the thrower and the target.

```java title="MyTransmutationProjectile.java"
public class MyTransmutationProjectile extends TransmutationProjectile {

    public MyTransmutationProjectile(EntityType type, Level level) {
        super(type, level);
    }

    public MyTransmutationProjectile(Level level, LivingEntity thrower, Ability ability) {
        super(MyEntities.TRANSMUTATION.get(), level, thrower, ability);
    }

    @Override
    protected MobEffect getTransmutationEffect() {
        return MyEffects.TRANSMUTED.get();
    }
}
```

The firing constructor sets a lifetime of `32` ticks and `15` real HP of damage, already scaled. On an entity hit, after `super` has dealt the damage, the effect is applied for:

| Doriki of the thrower minus the target | Duration |
|---|---|
| zero or less | `150` ticks (7.5 seconds) |
| between 0 and 10,000 | linear between the two |
| 10,000 or more | `1200` ticks (1 minute) |

Override `calculateEffectDuration(target)` for a different formula. Fire it from a [`TransmutationAbility`](../ability-base-classes/items-and-blocks.md#transmutationability).

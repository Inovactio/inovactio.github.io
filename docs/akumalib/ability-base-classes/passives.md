# Passives

Three passive base classes: bonuses under a condition, an aura, and damage by sprinting.

## `ConditionalStatPassiveAbility`

A passive that grants attribute bonuses while a condition holds: standing on a given block, the light level, the weather, the time of day. It uses attribute modifiers, not re-applied effects: a modifier with a fixed UUID leaves nothing behind when the condition ends, never clashes with a potion the player drank, and synced attributes reach the client on their own. This class is the loop that applies them correctly.

### What to implement

Declare the bonuses in the constructor, then say what tier the condition is at:

```java
public class MyGroundPassive extends ConditionalStatPassiveAbility {

    private static final UUID SPEED_UUID = UUID.fromString("...");
    private static final UUID PUNCH_UUID = UUID.fromString("...");

    public MyGroundPassive(AbilityCore<MyGroundPassive> core) {
        super(core);
        this.addStatBonus(StatBonus.of(Attributes.MOVEMENT_SPEED, SPEED_UUID, "My Speed",
                0.2, AttributeModifier.Operation.MULTIPLY_BASE));
        this.addStatBonus(StatBonus.of(ModAttributes.PUNCH_DAMAGE, PUNCH_UUID, "My Strength",
                4.0, AttributeModifier.Operation.ADDITION).fromTier(2).unscaled());
    }

    @Override
    protected int getMaxTier() {
        return 2;
    }

    @Override
    protected int getCurrentTier(LivingEntity entity) {
        BlockState below = entity.level().getBlockState(entity.blockPosition().below());
        if (below.is(Blocks.SAND)) return 2;
        if (below.is(BlockTags.SAND)) return 1;
        return 0;
    }
}
```

### Tiers

`getCurrentTier` returns `0` when the condition is absent, up to `getMaxTier()` (default `1`, a plain on/off condition).

- A bonus is worth `getTierShare(tier)` of its amount, by default `tier / maxTier`: 50% then 100% with two tiers.
- `.fromTier(n)` only applies the bonus from tier `n` upward.
- `.unscaled()` applies the full amount as soon as its tier is reached.

`StatBonus.of` takes either a resolved vanilla `Attribute` or a base mod `RegistryObject`, resolved when applied.

### Hooks

| Override | Called |
|---|---|
| `onActiveTick(entity, tier)` | every tick while the tier is above `0`: particles, an effect to refresh |
| `onInactiveTick(entity)` | every tick while the condition is absent. Reset your counters here |
| `resetBonuses(entity)` | removes every bonus. Already called when the passive is removed or disabled |

Build a tooltip line with `ConditionalStatPassiveAbility.describeState(name, state, colour)`.

### What the class already handles

- **Idempotent apply and remove.** Modifiers are persisted in NBT; transition detection would turn a conditional bonus into a permanent one after a reconnect. Applying and removing every tick costs nothing.
- **Server side only.** Rewriting synced attributes on the client causes speed jitter.
- **Disable.** A Devil Fruit passive is disabled the moment its holder touches water or kairoseki, and a disabled passive stops ticking **before** it could clean up. The class hooks the disable start and strips the bonuses.

!!! warning "Two traps with the condition"
    1. **Do not condition on `entity.onGround()`.** It flickers to `false` during a sprint stride or a stair step, so the bonus flickers with it. Test the block at the feet or just below instead.
    2. **Recompute the condition in tooltips.** Tooltips render on the client, which does not know the applied tier. Compute the condition again there.

## `AuraAbility`

A passive that affects every nearby entity on an interval, with a chance per target.

```java
public class MyAuraAbility extends AuraAbility {

    public MyAuraAbility(AbilityCore<MyAuraAbility> core) {
        super(core);
    }

    @Override
    protected void applyAuraEffect(LivingEntity owner, LivingEntity target) {
        target.addEffect(new MobEffectInstance(MobEffects.WEAKNESS, 60, 0));
    }

    @Override protected double getChance(LivingEntity owner, LivingEntity target) { return 0.5; }
    @Override protected double getAuraRadius() { return 6.0; }
    @Override protected int getEffectTickInterval() { return 20; }
}
```

Every `getEffectTickInterval()` ticks, each living entity within `getAuraRadius()` rolls `getChance`, and `applyAuraEffect` runs on a success.

| Override | Default | Use |
|---|---|---|
| `canAffectAlly()` | `false` | allies are skipped unless this returns `true` |
| `shouldSkipTarget(owner, target)` | `false` | any other exclusion |
| `spawnHitParticles`, `spawnAmbientParticles` | nothing | visuals on a hit, and around the owner |
| `getParticleTickInterval()` | `10` | ambient particle rate |

!!! danger "Register your `DealDamageComponent`"
    An aura that deals damage must call `this.addComponents(this.dealDamageComponent)` in its constructor. Without it the damage is never applied, and nothing reports it.

!!! warning "An aura is a pulse"
    Deal its damage with `hurtTarget`, not `hurtBurst`, unless the interval is longer than 10 ticks. See [Damage](../core-concepts/damage.md#which-call-to-use).

## `RunningSmashAbility`

A passive that damages and knocks back whatever the user sprints into.

```java
public class MyRamAbility extends RunningSmashAbility {

    public MyRamAbility(AbilityCore<MyRamAbility> core) {
        super(core, 2.0F, AkumaAbilityHelper.scaledDamage(4.0F));
    }

    @Override
    public boolean canSmash(LivingEntity entity) {
        return MyMorphs.WALK_POINT.get().isActive(entity);
    }
}
```

The constructor takes the width of the hit area in front of the user (default `1.5`) and the damage (default `2.0`). While the user sprints and `canSmash` returns `true`, entities in a line ahead are hurt through `hurtBurst` and thrown away from the user. Entities riding the user are ignored.

- `setDamage`, `setArea` and `setHasKnockback` change the values at runtime.
- A damage of `0` or less turns the smash off.

A target in contact is hit about twice a second: the hit tracker is cleared every 10 ticks, so each target takes the damage once per window. The knockback normally throws a target clear after the first hit. With `setHasKnockback(false)`, or against a body that cannot be pushed, a target the user keeps running into is hit again at each new window.

!!! warning "The damage is raw"
    The constructor's damage goes to the pipeline as is. Pass `AkumaAbilityHelper.scaledDamage(realHp)`.

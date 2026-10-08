# Holding spheres

*Since the next release.* `HoldingSphereEntity` is a sphere that closes over a body and holds it while its air runs out: a ball of mud, of water, of sand - whatever the fruit is made of.

It has two stages, timed from the entity's age so the client draws them from its own clock:

1. **closing** (`closeTicks()`, 6 by default): the sphere rises round the target, from nothing to its size, and shuts with a first hit;
2. **shut** (`holdTicks()`, 60): the target cannot move - it can still strike - its air runs out, and it takes a smothering hit every `smotherInterval()` ticks (20).

```java
public class MudSphereEntity extends HoldingSphereEntity {

    public MudSphereEntity(EntityType<? extends MudSphereEntity> type, Level level) {
        super(type, level);
    }

    public MudSphereEntity(EntityType<? extends MudSphereEntity> type, Level level, LivingEntity target,
                           LivingEntity owner, AbilityCore<?> ability, float closeDamage, float smotherDamage) {
        super(type, level, target, owner, ability, closeDamage, smotherDamage);
    }

    @Override
    protected void whileShut(LivingEntity target) {
        target.addEffect(new MobEffectInstance(MobEffects.BLINDNESS, 30, 0, false, false, false));
    }

    @Override
    protected void onShut(LivingEntity target) {
        this.level().playSound(null, this.blockPosition(), SoundEvents.MUD_PLACE, SoundSource.PLAYERS, 1.2F, 0.6F);
    }
}
```

The technique spawns it on its target:

```java
level.addFreshEntity(new MudSphereEntity(MyEntities.MUD_SPHERE.get(), level, target, entity, this.getCore(), 4.0F, 2.0F));
```

What the base class takes care of:

- **it follows its target** and is gone with it; it is never saved;
- **it holds the body it closed on**, not the next one to bear its number: a player who dies and is back at once is free;
- **the damage is the owner's, by the ability given**: the base mod's rules for an ability's hit all apply. The two amounts are real HP;
- `holds(target)` spares a kind of body the hold - its air still runs out and it is still hit;
- `whileShut`, `onShut` and `onSmother` are where the subclass puts what being inside does, and the sounds.

The library ships no renderer for it. Yours reads `getTarget()` and `getClose(partialTicks)` (0 open, 1 shut), and sizes the sphere on the target's box.

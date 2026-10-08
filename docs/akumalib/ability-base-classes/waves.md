# Waves

*Since the next release.* `WaveAbility` is a wave that rises in front of its user and runs ahead of him: mud, water, sand.

It leaves from his feet along where he looks, flat, `waveSpeed()` blocks a tick (1 by default) for `runTicks()` ticks, `halfWidth()` blocks to each side. Every body it reaches is hit `waveDamage()` real HP, **once**, and carried along with it. The direction is taken as it leaves: turning afterwards does not steer it. The cooldown starts when it has run.

```java
public class MudWaveAbility extends WaveAbility {

    public MudWaveAbility(AbilityCore<MudWaveAbility> core) {
        super(core);
    }

    @Override protected int runTicks() { return 10; }
    @Override protected double halfWidth() { return 2.5D; }
    @Override protected float waveDamage() { return 20.0F; }
    @Override protected float waveCooldown() { return 240.0F; }

    @Override
    protected boolean mayHit(LivingEntity user, LivingEntity target) {
        return AkumaTargeting.isEnemy(user, target) && AkumaProtection.canUseAbilityAt(target, this.getCore());
    }

    @Override
    protected void onWaveStart(LivingEntity entity, Vec3 crest, Vec3 heading) {
        if (!entity.level().isClientSide()) {
            entity.level().addFreshEntity(new MudWaveEntity(MyEntities.MUD_WAVE.get(), entity.level(), crest, heading, this.runTicks() + 1));
        }
    }

    @Override
    protected void onWaveHit(LivingEntity entity, LivingEntity target) {
        target.addEffect(new MobEffectInstance(MobEffects.MOVEMENT_SLOWDOWN, 80, 1), entity);
    }
}
```

| Hook | When | For |
|---|---|---|
| `mayHit(user, target)` | each body under the crest | the fruit's rule on who is an enemy, and the target's own protected area |
| `onWaveStart(entity, crest, heading)` | as it leaves, both sides | the entity that shows it (server side), sounds, the user's animation |
| `onWaveHit(entity, target)` | a body it struck, once, server side | what the element does to it |
| `onWaveTick(level, entity, crest, side)` | each tick it runs, server side | what it leaves on the ground, its spray |

`wavePush()` and `waveLift()` set how hard a struck body is carried along (1.3 and 0.4 by default). `crest()` and `heading()` give where it is and the way it runs.

The wave is not drawn by the library: your entity, spawned in `onWaveStart`, runs at the same speed for the same time.

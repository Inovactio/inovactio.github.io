# Carries

`CarryAbility` takes a body and carries it: the user stays free to move, fly or fight, and the body follows a point the ability names (under a flyer's talons, in a giant's fist). It is the other gesture next to [`GrabAbility`](grabs.md), which roots its user and holds the body in front of the eyes.

## What the class handles

- **The seizing**, at once or after a wind-up. With a wind-up, the target named at the press is taken at its end only if it is still in reach and does not refuse it, which gives it time to step out or to guard.
- **The hold:** every tick the body is taken to `holdPoint`, with the base mod's `GRABBED` effect, and its fall distance is cleared.
- **The ways it ends**, told apart in `onCarryEnd`: `TIMED_OUT`, `LET_GO` (a second press), `LOST` (dead, gone or out of reach), `TAKEN` (another ability called `release`) and `BROKE_FREE`.
- **The way out for the body**, set by `getEscape()`: `Escape.anyBlow()` (the default: one blow landed on the carrier), `Escape.afterDamage(total)` or `Escape.none()`. Only the carried body's own blows count.
- **The lines over the hotbar**, refreshed with the seconds left: one for the carrier, one for a carried player. Each ability writes its own text.
- **The cooldowns:** the full one when the carry ends, `getMissCooldown()` when the target got out of the seizing, half a second when the press found nobody.
- **One hold at a time:** the ability joins the base mod's grab pool.

## What to implement

```java
public class MyCarryAbility extends CarryAbility {

    public MyCarryAbility(AbilityCore<MyCarryAbility> core) {
        super(core);
    }

    @Override
    protected LivingEntity findTarget(LivingEntity user) {
        return AkumaTargeting.firstInSight(user, 4.0F);
    }

    @Override
    protected Vec3 holdPoint(LivingEntity user, LivingEntity target) {
        return user.position().add(0.0D, user.getBbHeight() + 0.2D, 0.0D);
    }

    @Override
    protected void onSeized(LivingEntity user, LivingEntity target) {
        AkumaAbilityHelper.hurtBurst(this.dealDamageComponent, user, target, 6.0F);
    }

    @Override
    protected Escape getEscape() {
        return Escape.afterDamage(8.0F);
    }

    @Override
    protected Component carriedLine(LivingEntity user, LivingEntity target, int secondsLeft) {
        return Component.translatable("ability.mymod.my_carry.carried", secondsLeft);
    }
}
```

## Settings

| Method | Default | Meaning |
|---|---|---|
| `getHoldTime()` | 80 | ticks the body is carried at most |
| `getCooldown()` | 240 | cooldown when the carry ends |
| `getWindup()` | 0 | ticks between the press and the seizing |
| `getMissCooldown()` | the full cooldown | cooldown when the target got out of the seizing or refused it |
| `getLostDistance()` | 6 | blocks from its place beyond which the body is let go |
| `getEscape()` | `Escape.anyBlow()` | how the body frees itself |
| `stillInReach(user, target)` | the target is still what `findTarget` returns | asked at the end of a wind-up |
| `isRefused(user, target)` | never | asked when the body would be seized; `CarryAbility.isGuarding(target)` is true for a raised shield or a running guard ability |

## Hooks

- `onReach(user, target)`: the press found its target. The place for the telegraph of a wind-up.
- `onSeized(user, target)`: the body is taken. Damage, sound, animation (`animationComponent` is stopped for you at the end). A body this kills is not carried.
- `onMissed(user, target, refused)`: the seizing failed.
- `onCarryTick(user, target, ticksHeld)`.
- `onCarryEnd(user, target, end)`: runs once, before the cooldown. `target` is null when the body is dead or gone.

## Taking the body over

Another ability that throws or drops the body calls `release(user)`: the carry ends with `End.TAKEN` and the body is handed back. `carried()` gives the body being carried, server side.

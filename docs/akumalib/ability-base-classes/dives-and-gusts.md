# Dives and gusts

*Since the next release.* Two gestures of a flying or leaping body, each written once.

## `DiveStrikeAbility`

A dive that ends in one blow: a bird of prey on its quarry, a beast that leaps on a body.

At the press the server takes the enemy in sight within `diveReach()` - or, with none, the point aimed at - and the user flies at it, `diveSpeed()` blocks a tick for at most `diveTicks()`. The first body `mayStrike` lets it take, within `strikeReach()` of him, is hit `diveDamage()` real HP; then he pulls out of the dive and it is over. It also ends on the ground, or at the point. The cooldown starts when it ends, and the fall it leaves is forgotten.

```java
public class SwoopAbility extends DiveStrikeAbility {

    public SwoopAbility(AbilityCore<SwoopAbility> core) {
        super(core);
        this.addCanUseCheck((entity, ability) -> entity.onGround() ? Result.fail(NEEDS_AIR) : Result.success());
    }

    @Override protected float diveReach() { return 24.0F; }
    @Override protected double diveSpeed() { return 1.8D; }
    @Override protected int diveTicks() { return 30; }
    @Override protected double strikeReach() { return 1.6D; }
    @Override protected float diveDamage() { return 12.0F; }
    @Override protected float diveCooldown() { return 160.0F; }

    @Override
    protected boolean mayStrike(LivingEntity user, LivingEntity other) {
        return !user.hasPassenger(other) && AkumaTargeting.isEnemy(user, other);
    }
}
```

| Hook | For |
|---|---|
| `mayStrike(user, other)` | who the blow may land on: every fruit has somebody to spare - a rider, a pet, a crew |
| `findQuarry(user)` | whom the dive goes for at the press; by default the first body in sight that `mayStrike` takes |
| `onDiveStart(user)`, `onStrike(level, user, hit)` | sounds and particles, server side |
| `pullOut(user, hit)` | what he does after the blow; up and away by default |
| `isDiving()` | either side: a model draws its dive pose by it |

!!! warning "The dive is driven where the body is simulated"
    A player's own client moves the player. Steered from the server, the dive was a velocity packet every tick and stuttered under latency. The target and the point are the server's, told to the player's client before the dive starts ([`ServerAim`](../utilities/other-helpers.md)); the client flies him there, and the strike and the end stay the server's.

## `GustAbility`

One great blow of air in front of its user: a beat of wings, a breath, a fan.

Every body in the cone in front - `gustRange()` blocks long, `gustHalfAngle()` degrees to each side - that he can see and that `mayStrike` lets it take is hit `gustDamage()` real HP and thrown back (`gustPush()`, `gustLift()`). **The throw goes with the blow**: a body the blow did not land on is not thrown either.

It can also turn shots back: every projectile in the cone that `turnsBack(user, projectile)` names is handed to `turnBack(projectile, user)` and leaves a little faster than it came. By default it turns none; an addon that turns shots back decides which stay their thrower's - a pearl, a hook, a thrown weapon.

`onGustHit(user, target)` and `onGust(level, user)` are where the subclass puts what else it does to a struck body, its sound and what it shows.

## `ServerAim`

`ServerAim.write` and `read` put a point in an ability's own data; `ServerAim.tell(entity, ability)` sends that data to the player who uses it, before the technique starts. For any technique that flies its user to a point the server chose.

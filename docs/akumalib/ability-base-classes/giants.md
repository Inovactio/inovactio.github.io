# Giants of matter

`MatterGiantAbility<S>` is a `MorphAbility` for a giant body built round the user out of some matter, at one of several sizes.

- The sizes are an enum that implements `MatterGiantAbility.Size`, smallest first. They are the ability's alternate modes: chosen with the mode key before the body is raised, locked while it stands. The slot shows the name of the size chosen.
- The body is a stock of matter. A blow is taken by the matter instead of the user, `hpPerUnit()` HP a unit. With none left the body falls apart and what the last blow had left goes through.
- On ground that gives matter (`groundProvides`) it grows back, `regrow(size)` units every `regrowTicks()`.
- What a size has over the smallest (fists, step, reach) is added on top of the form's own stats, and a share of the speed is taken off. Set the stats of the smallest size with [`MorphStats`](../core-concepts/morph-gates-and-stats.md) in the constructor.

```java
public class StoneGiantAbility extends MatterGiantAbility<StoneSize> {

    public StoneGiantAbility(AbilityCore<StoneGiantAbility> core) {
        super(core, StoneSize.class);
        MorphStats.on(this.statsComponent, INSTANCE, "Stone Giant").punch(20.0).stepHeight(1.5).entityReach(2.0);
    }

    @Override protected MorphInfo morphOf(StoneSize size) { return size.morph.get(); }
    @Override protected BlockState matterBlock() { return Blocks.STONE.defaultBlockState(); }
    @Override protected boolean groundProvides(LivingEntity entity) { return StoneStock.groundProvides(entity); }
    @Override protected float regrow(StoneSize size) { return size.body() / 128.0F; }
    @Override protected Result canRaise(LivingEntity entity, StoneSize size) { return StoneStock.costing(size.cost).canUse(entity, this); }
    @Override protected void onRaised(LivingEntity entity, StoneSize size) { StoneStock.pay(entity, size.cost); }
    // sizeBonusId, sizeBonusName, raiseSound, breakSound
}
```

| Hook | Default | For |
|---|---|---|
| `canRaise(entity, size)` | success | what the size costs. Asked at the use and not as a can-use check, or the size could only be changed where the body can be raised |
| `onRaised(entity, size)` | nothing | paying for it |
| `mustFall(entity)` | false | something other than blows that brings it down |
| `hpPerUnit()` | 1 | HP of blows a unit takes |
| `wholeUnits()` | false | true when a blow costs at least one whole unit |
| `regrowTicks()` | 10 | how often it grows back |

`MatterGiantAbility.passesShell(source)` says what no shell stops: the void, `/kill`, hunger, drowning, the wither effect, poison, the unavoidable sources of the base mod and what it lets through a Logia. Use it for any other shell of matter round a body (a statue, a casing).

Draw the body with [`MatterBodyMorphInfo`](../core-concepts/morph-gates-and-stats.md), one morph per size.

## A form that lasts a time, in several sizes

`TimedSizeFormAbility<S>` is for a form with a time limit that comes in sizes: a fighting golem and its giant, a mech and its colossus. The sizes are an enum that implements `TimedSizeFormAbility.Size` (`displayName`, `hold`, `cooldown`), smallest first, chosen with the mode key before the form is taken.

- Each size has its own time and its own cooldown. The cooldown is paid for the share of the time the form was held, never under `leastCooldownShare()` (a fifth by default). `spend(entity)` ends the form on its full cooldown, for a form that is broken and not let go.
- The stats of the smallest size are the form's own (`MorphStats` in the constructor). Add what a bigger size has over it in `onTaken` with `bonus(...)`, or with `giantBonuses(entity, punch, armor, slowBlows, slowWalk)` for the usual set. They are taken off when the form ends.
- `canTake(entity, size)` is asked at the use, for the same reason as `canRaise` above.
- The tooltip is your own table of sizes followed by the stats of the form. The Cooldown and Hold lines the base mod writes for a form are left out: read at rest, they would name one size only.

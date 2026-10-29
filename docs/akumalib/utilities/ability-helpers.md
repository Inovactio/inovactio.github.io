# Helpers for abilities

## `IBladedHandsAbility`

*Since 2.11.0.* An ability that, while active, makes the user's bare hands count as a sword for the techniques that need
one (`AbilityUseConditions.requiresSword`, and `requiresMeleeWeapon` through it): sickle nails, scissor hands, blade
arms.

```java
public class MyClawsAbility extends PunchAbility implements IBladedHandsAbility {

    @Override
    public boolean hasBladedHands(LivingEntity entity) {
        return this.continuousComponent.isContinuous();   // the claws are out
    }
}
```

- The base mod does this for one ability only, Spar Claw, written into `requiresSword` by name; AkumaLib opens the same
  door to any **equipped** ability implementing the interface.
- As for Spar Claw, it holds **only with an empty main hand**. The hand stays empty, so everything a bare hand gets
  (`PUNCH_DAMAGE` above all) is kept.
- `IBladedHandsAbility.isActive(entity)` tells whether any equipped ability makes the entity's hands blades right now.

## `AbilityProgress`

*Since 3.1.0.* How far along an equipped continuous ability is, for a pose or a model that follows it. Either side.

```java
float t = AbilityProgress.fraction(entity, HornTossAbility.INSTANCE.get(), HornTossAbility.HOLD, partialTick);
float lift = AbilityProgress.riseFall(t, 0.4F);   // up over the first 40%, back down over the rest
```

`continueTime` gives the ticks (plus the partial tick), `fraction` the 0-1 share of a total, both -1 when the ability is not running; `riseFall` turns that into a 0-1-0 curve.

## `SharedCooldowns`

*Since 3.1.0.* Two abilities that share one cooldown, whoever registered them - an addon technique and a base mod one included, which an `AbilityPool` cannot bind:

```java
SharedCooldowns.link(JusshiganAbility.INSTANCE, ShiganAbility.INSTANCE);   // at mod construction
```

Every tick, for a player with both equipped, when one is cooling down and the other is idle, the other starts a cooldown for what the first has left. A held stance counts as busy: its own cooldown comes when it ends.

## `GatedUnlocks`

*Since 3.1.0.* The base mod asks a fruit's gated abilities (`setUnlockCheck`) only at a few moments, so a technique unlocked by learning something else waits for the next one. This asks again every 100 ticks for the players you name:

```java
GatedUnlocks.recheck(player -> MyHelper.hasFruit(player), MyTechniqueAbility.INSTANCE);
```

## `FruitInjectionHelper`

Adds abilities to, or removes them from, a Devil Fruit's list of ability cores, including a fruit the base mod owns:

```java
FruitInjectionHelper.appendAbilities(fruit, MyExtraAbility.INSTANCE.get());
FruitInjectionHelper.removeAbilities(fruit, SomeAbility.INSTANCE.get());
```

- `appendAbilities` skips a core already on the fruit and ignores `null` entries.
- Both change the fruit item's own list in place and print what they changed to the console.

!!! warning "Call it once the fruit exists, and test it in game"
    The fruit is an item instance, so it has to be registered before you can pass it, and the abilities you add have to be registered too. Neither addon built on AkumaLib uses this helper today, so check in game how players who already ate the fruit are affected before relying on it.

## Small helpers moved from Missing Missing no Mi (4.4.0)

| Class | What it is for |
|---|---|
| `TechniqueSource` | a damage source of an ability that leaves out the fist, cut and blunt types, so the base mod adds neither the punch nor the held weapon to it |
| `Techniques` | `isRunning(entity, core)` and `endDash` |
| `Smash` | breaking through blocks by the base mod's own pipeline |
| `Holds` | carrying a held body beside its holder, never into blocks |
| `SparedFalls` | `spare(entity, ticks)`: the next fall within that time does not hurt |
| `PanelWalls` | raising a wall of panel entities in front of a body (the ability around it: `WallAbility`); a body of another size raises a man's wall grown by its size around its feet, 48 blocks wide at most |
| `GroundLayers` | laying a temporary layer on the ground of each column of an area |
| `CooldownFamily` | abilities that share one cooldown and cannot run together |

# Playing animations

Animations in Mine Mine no Mi are **code, not assets**: no Blockbench, no JSON. A pose is a class that sets the angles of a model's parts, or transforms the whole body, while an ability says when it plays.

| Page | What it covers |
|---|---|
| this page | playing an animation from an ability, and whether a technique needs one at all |
| [Choosing a pose](choosing-a-pose.md) | the base mod's poses, which ones can be held, and why a charge is not a pause |
| [Writing an animation](writing-an-animation.md) | a custom pose, its registration, and the traps in writing one |
| [Animations on morphs](morphs.md) | making a technique show on a full-form Zoan model |
| [Hands and armour](hands-and-armour.md) | hiding the first-person hand and the armour during an animation |

## `AnimationComponent`

```java
private final AnimationComponent animationComponent = new AnimationComponent(this);

public MyAbility(AbilityCore<MyAbility> core) {
    super(core);
    this.addComponents(this.animationComponent);
}

private void onUseEvent(LivingEntity entity, IAbility ability) {
    this.animationComponent.start(entity, ModAnimations.POINT_RIGHT_ARM, 10);
}
```

It also offers `stop`, `pause`, `resume`, `isPlaying`, `isStopped`, `isPaused`, `setPauseCondition`, `setStopCondition` and `getAnimationTick`.

### One-shot or held: the two `start` overloads

| Call | Ends | Use it for |
|---|---|---|
| `start(entity, id, ticks)` | on its own, after `ticks` | anything instantaneous: a press, a hit, a landing |
| `start(entity, id)` | **only when something calls `stop`** | a pose held for a state that has its own end event |

!!! danger "The two-argument `start` never ends by itself"
    A one-shot technique started with `start(entity, id)` leaves the pose playing **forever**: there is no end event to stop it from. Use the three-argument overload for everything that is not a held state, and pair every two-argument `start` with a `stop` in the end event.

!!! note "The duration also sets the speed"
    A pose that moves computes its motion as a fraction of its duration. Halving the ticks doubles the speed of the gesture.

## Does this technique want a pose?

Ask before choosing one. A pose is right when it shows something the player would otherwise miss, and "no pose" is a valid decision. It is usually wrong when:

- **the trigger is routine rather than a moment**: a toggle hit many times, a per-block loop, a passive tick. Poses punctuate; they do not narrate;
- **the effect happens far from the user**: a strike 30 blocks away, where a gesture on the caster says nothing;
- **the user cannot be seen**: underground, invisible, teleported on that very tick;
- **the visual already carries it**: an item appearing in the hand, a projectile, a visible line;
- **the cooldown is very short**: a pose on a half-second cooldown trembles under a held key.

!!! tip "One gesture per technique within a kit"
    Two techniques of the same fruit sharing one pose cannot be told apart. When you add a pose, check the poses already used by the rest of the kit, not only the one you are adding.

## Base classes that already pose

Some library base classes start an animation for their subclasses, so a subclass does not add its own for the same moment:

| Base class | Plays |
|---|---|
| `ZoneAbility` | `RYU_NO_IBUKI` during the charge, unless `allowAnimation` is `false` |
| `StompAbility` | `AIM_SNIPER` during the charge, when `isStuckWhileCharging()` |
| `OceanAbility` | `CROSSED_ARMS` during the charge |
| `TransmutationAbility` | the pose returned by `getShootAnimation()` |
| `GrabAbility` | the pose returned by `getHoldAnimation()`, for the whole hold |

!!! warning "`InstantDashAbility` stops its animation on cooldown"
    It never starts one, but its cooldown event **stops** its `animationComponent` right after the teleport. An arrival animation has to start after that: see [Movement](../ability-base-classes/movement.md#instantdashability).

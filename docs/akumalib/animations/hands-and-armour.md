# Hands and armour

Two pieces of the player's rendering can get in the way of an animation: the hand drawn in first person, and the armour drawn over the body. The library can hide both.

## Hiding the first-person hand: `IHandAnimation`

Implement `IHandAnimation` on the **ability**:

```java
public class MySpinAbility extends Ability implements IHandAnimation {

    // ...

    @Override
    public boolean DisableHandOfPlayer() {
        return true;
    }
}
```

The library subscribes to Forge's `RenderHandEvent` and cancels the hand while an equipped ability implementing `IHandAnimation` is **continuous** and `DisableHandOfPlayer()` returns `true`.

!!! note "Continuous abilities only"
    The hand is hidden for as long as the ability's continuity runs. A one-shot technique with no continuity is never matched.

!!! tip "Hiding the hand for another reason"
    To hide it for something that is not an ability, such as an effect, subscribe to `RenderHandEvent` yourself. Forge dispatches to every subscriber and the first cancellation wins, so your handler and the library's do not need to know about each other.

## Hiding the armour: `AnimationRenderTracker`

From your animation's angles hook, mark the entity:

```java
public void angles(LivingEntity entity, HumanoidModel<LivingEntity> model, float limbSwing,
                   float limbSwingAmount, float ageInTicks, float netHeadYaw, float headPitch) {
    // ... the pose ...
    AnimationRenderTracker.markNoArmor(entity.getUUID());
}
```

The library's armour layer mixin skips every armour piece of a marked entity, and the mark is **cleared after each render of that entity**.

!!! warning "Mark it every frame"
    Because the mark is cleared after every render, a single call only hides the armour for one frame. Call `markNoArmor` from the animation hook, which runs each frame for as long as the animation plays; the armour comes back on its own when the animation stops.

This is how a technique that tucks the whole body away, a shell spin for instance, keeps armour pieces from floating in the air around it.

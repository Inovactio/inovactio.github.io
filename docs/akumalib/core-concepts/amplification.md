# Amplification

A fruit's morph can make the rest of its kit stronger while it is up. The base mod does this itself: the Doku Doku no Mi's *Chloro Ball* fires three bubbles instead of one while the *Venom Demon* form is active, and renames itself *Venom Chloro Ball*.

AkumaLib gives that pattern three pieces: `IAmplifiableAbility`, `AmplifiedPresentation` and `AmplificationBus`.

## The rule: the morph tells its siblings

!!! info "Push, never poll"
    When the morph comes up or drops, **it tells the other techniques**. The techniques do not each watch the morph. This is what keeps the ability screen correct for a technique the player is not currently using.

An amplification has three axes, and a technique that only takes the first one feels like a rounding error:

| Axis | Where it is read |
|---|---|
| the **numbers**: more damage, more range | when the technique resolves |
| the **shape** of the move: more projectiles, a different area | when the technique resolves |
| the **name and icon** | pushed once by the morph, through `AmplifiedPresentation` |

## 1. Make the technique amplifiable

Hold its presentation in an `AmplifiedPresentation` and implement `IAmplifiableAbility`:

```java title="MyThrowAbility.java"
public class MyThrowAbility extends Ability implements IAmplifiableAbility {

    private static final ResourceLocation NORMAL_ICON =
            new ResourceLocation("mymod", "textures/abilities/my_throw.png");
    private static final ResourceLocation AMPLIFIED_ICON =
            new ResourceLocation("mymod", "textures/abilities/my_throw_amplified.png");
    private static final Component AMPLIFIED_NAME = Component.translatable(
            MyRegistry.REGISTRY.registerAbilityName("my_throw_amplified", "Great Throw"));

    // INSTANCE registered as usual...

    private final AmplifiedPresentation<MyHelper.Mode> amplified = AmplifiedPresentation.of(
            this, INSTANCE, MyHelper.Mode.class, MyHelper.Mode.NORMAL, MyHelper.Mode.AMPLIFIED,
            NORMAL_ICON, AMPLIFIED_ICON, AMPLIFIED_NAME);

    public MyThrowAbility(AbilityCore<MyThrowAbility> core) {
        super(core);
        this.addComponents(this.amplified.component());
        this.addUseEvent(this::onUseEvent);
    }

    @Override
    public void setAmplified(LivingEntity entity, boolean amplified) {
        this.amplified.setAmplified(entity, amplified);
    }
}
```

The mode enum belongs to your fruit, usually in its helper class:

```java
public enum Mode { NORMAL, AMPLIFIED }
```

!!! danger "Add the component, or nothing is ever renamed"
    `amplified.component()` must reach `addComponents`. A presentation whose component is missing builds, runs, and silently never changes the name or the icon.

!!! note "The player cannot switch it"
    The underlying `AltModeComponent` is built so the player's mode-switch key never cycles it. Only the morph drives it, so a technique can never present as amplified outside its form.

## 2. Read the numbers where the technique resolves

`AmplifiedPresentation` is **presentation only**. Read the actual state at the moment the technique takes effect, from the morph itself:

```java
private void onUseEvent(LivingEntity entity, IAbility ability) {
    boolean amplified = MyMorphs.HEAVY_POINT.get().isActive(entity);
    float damage = amplified ? AMPLIFIED_DAMAGE : DAMAGE;
    // ...
}
```

!!! warning "Read it late, not at the press"
    A form can drop between the key press and the effect: mid-flight, mid-charge, mid-grab. The number that matters is the one for the body that is actually there when the technique lands.

## 3. Let the morph push the state

Give your fruit's helper one method listing every amplifiable technique, and call it from the morph ability's continuity:

```java title="MyHelper.java"
public static void setAmplified(LivingEntity entity, boolean amplified) {
    AmplificationBus.push(entity, amplified,
            MyThrowAbility.INSTANCE, MySlamAbility.INSTANCE, MyDashAbility.INSTANCE);
}
```

```java title="MyHeavyPointAbility.java"
this.continuousComponent
        .addStartEvent((entity, ability) -> MyHelper.setAmplified(entity, true))
        .addEndEvent((entity, ability) -> MyHelper.setAmplified(entity, false));
```

`AmplificationBus.push` pushes the state to every listed technique **the user has equipped** and that implements `IAmplifiableAbility`. Anything else is skipped silently: a player equips what they like, and a kit may list a technique whose presentation never changes.

!!! tip "Why a list in a helper"
    Written by hand, each technique needs a lookup, a null check, a cast and a call, and the technique a kit forgets is always the newest one. A single list is something a reader can count against the fruit's abilities.

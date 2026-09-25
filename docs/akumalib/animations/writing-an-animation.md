# Writing an animation

A custom pose is a class of about twenty lines. It needs no model, no renderer and no layer.

## The class

Extend the library's `Animation`, typed on the entity and the model it poses:

```java title="ReachOutAnimation.java"
public class ReachOutAnimation extends Animation<LivingEntity, HumanoidModel<LivingEntity>> {

    private static final float START_DEG = -20.0F;
    private static final float END_DEG = -90.0F;

    public ReachOutAnimation(AnimationId<ReachOutAnimation> animId) {
        super(animId);
        this.setAnimationAngles(this::angles);
    }

    public void angles(LivingEntity entity, HumanoidModel<LivingEntity> model, float limbSwing,
                       float limbSwingAmount, float ageInTicks, float netHeadYaw, float headPitch) {
        float t = Mth.clamp(this.getAnimationCompletion(), 0.0F, 1.0F);
        float eased = 1.0F - (1.0F - t) * (1.0F - t);   // fast at first, then settles
        model.rightArm.xRot = (float) Math.toRadians(Mth.lerp(eased, START_DEG, END_DEG));
    }
}
```

`getAnimationCompletion()` counts **from 0 to 1** over the animation's duration, which is what turns a static pose into a movement. `getTime()`, `getAnimationDuration()` and `getAnimationInitialDuration()` are also available.

A moving pose, not a fixed one: a fixed pose says "a body is in this position". Most techniques are not a position: what tells a kick from standing with a leg raised is the speed at which it got there. Interpolate over `getAnimationCompletion()` for anything that should read as an action.

### The three hooks

| Hook | Receives | Use it for |
|---|---|---|
| `setAnimationAngles` | the model | rotations and offsets on `rightArm`, `leftArm`, `body`, `head`, legs |
| `setAnimationPostAngles` | the model and the `PoseStack` | transforming the whole entity: scale, rotate, translate |
| `setAnimationHeldItem` | the held item's `PoseStack` | angling or hiding the item in hand |

Set both angle hooks, even when one does nothing: an animation that only transforms the pose stack can still register an empty angles method. The base mod's dispatcher then always has a callback to call.

## Registering it

An `AnimationId` puts itself in the base mod's registry **from its own constructor**. Create the ids in a holder class:

```java title="MyAnimations.java"
public class MyAnimations {

    public static final AnimationId<ReachOutAnimation> REACH_OUT =
            register("reach_out", ReachOutAnimation::new);

    private static <A extends Animation<?, ?>> AnimationId<A> register(String name,
            AnimationId.IAnimationFactory<A> factory) {
        return new AnimationId<>(new ResourceLocation(MyMod.MODID, name), factory);
    }

    public static void init() {
    }
}
```

!!! danger "Touch the holder from your mod constructor"
    Call `MyAnimations.init()` from your mod constructor, exactly like your ability holders. An animation id that is never class-loaded **simply never plays**, with no error at all. This is quieter than the registry crash described in [Getting started](../getting-started.md#4-touch-your-holder-classes).

Poses that take a parameter are registered per use, with a lambda:

```java
public static final AnimationId<BarrelRollAnimation> DEATH_ROLL =
        register("death_roll", id -> new BarrelRollAnimation(id, 30.0F).setPivotY(1.05F));
```

`ForwardRollAnimation` (a somersault, humanoid models only) and `BarrelRollAnimation` (a roll about the body's length, any model) both take a spin speed in degrees per tick, which is why the library does not register an instance of either.

## Traps

!!! warning "Four traps"
    1. **`GetRotValue` negates its argument.** The library's `Animation.GetRotValue(value)` returns `Math.toRadians(-value)`. Mixing it with plain `Math.toRadians` in one class makes half the angles read backwards from the other half. Prefer `Math.toRadians` everywhere.
    2. **Signs are easy to get backwards.** Which way a positive `xRot` turns a part depends on how the part hangs from its pivot. On a limb hanging down, a positive `xRot` sends its end **backward**. When a sign cannot be checked, isolate it in one named constant, so a pose that plays backwards is a one-character fix.
    3. **`AnimationId` is generic, so a ternary does not compile.** `AnimationId<PointArmsAnimation>` and `AnimationId<RaiseArmsAnimation>` share no inferred type. Use `if` / `else` with two `start` calls to pick between two poses.
    4. **A `PlayerModel` needs its outer layer copied.** When you move a player's parts, copy the overlay parts too, or the outer skin layer stays behind:

    ```java
    if (model instanceof PlayerModel<?> playerModel) {
        playerModel.hat.copyFrom(playerModel.head);
        playerModel.rightSleeve.copyFrom(playerModel.rightArm);
        playerModel.leftSleeve.copyFrom(playerModel.leftArm);
        playerModel.rightPants.copyFrom(playerModel.rightLeg);
        playerModel.leftPants.copyFrom(playerModel.leftLeg);
    }
    ```

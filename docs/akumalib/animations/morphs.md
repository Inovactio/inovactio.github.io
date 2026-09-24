# Animations on morphs

A humanoid pose written against `HumanoidModel` shows on a player. Whether it shows on a morphed player depends on the morph's model.

| Morph | What a humanoid pose does |
|---|---|
| **partial** morph drawn on the player's rig | plays normally |
| **full** morph whose model extends `HumanoidMorphModel` (a winged flyer, for instance) | plays on the model's arms, which may be wings |
| **full** morph on a quadruped or other non-humanoid model | **nothing** |

## How a full morph renders an animation

The base mod's `MorphRenderer.renderModel` runs, in this order:

1. the model's own `setupAnim`: its walk cycle, tail and head;
2. the animation's **angles** hook, which **overrides** the walk cycle on the parts it touches;
3. the animation's **post angles** hook, a transform of the whole body on the pose stack.

So an animation does reach a full morph's model. A humanoid pose does nothing there because its parts do not exist on a quadruped.

!!! danger "A failed animation is invisible"
    The base mod wraps the angles callback in a `try/catch`. A pose that throws on the wrong model, a `ClassCastException` included, fails with **no crash and no log**. Everything on this page has to be checked in game.

## Pick the animation by form when the technique starts

A technique usable in two forms plays a different animation in each:

```java
if (MyMorphs.WALK_POINT.get().isActive(entity)) {
    this.animationComponent.start(entity, MyAnimations.BODY_STRETCH, 8);
} else {
    this.animationComponent.start(entity, ModAnimations.POINT_RIGHT_ARM, 8);
}
```

!!! warning "A whole-body transform would distort the humanoid form too"
    A stretch or a roll applied through the pose stack affects whatever model is drawn. Start it only in the form it was written for.

## Level 1: whole-body transforms

An animation that only uses the **post angles** hook touches no part, so one instance serves every full-form model. Type it on `EntityModel`:

```java title="BodyStretchAnimation.java"
public class BodyStretchAnimation extends Animation<LivingEntity, EntityModel<LivingEntity>> {

    public BodyStretchAnimation(AnimationId<BodyStretchAnimation> animId) {
        super(animId);
        this.setAnimationPostAngles(this::setup);
        this.setAnimationAngles(this::angles);
    }

    public void setup(LivingEntity entity, EntityModel<LivingEntity> model, PoseStack poseStack,
                      MultiBufferSource buffer, int packedLight, float partialTicks, float limbSwing,
                      float limbSwingAmount, float ageInTicks, float netHeadYaw, float headPitch) {
        float t = Mth.clamp(this.getAnimationCompletion(), 0.0F, 1.0F);
        float peak = Mth.sin(t * Mth.PI);
        poseStack.scale(1.0F - 0.15F * peak, 1.0F, 1.0F + 0.5F * peak);
    }

    public void angles(LivingEntity entity, EntityModel<LivingEntity> model, float limbSwing,
                       float limbSwingAmount, float ageInTicks, float netHeadYaw, float headPitch) {
    }
}
```

### Start with transforms that need no sign and no pivot

| Transform | Safe without testing | Why |
|---|---|---|
| scale on X and Z | **yes** | a scale does not care which way an axis points, and it happens about the entity's own vertical axis |
| rotation about Y (`Axis.YP`) | **yes** | the vertical axis passes through the entity; a symmetric swing reads the same both ways |
| scale on Y, pitch, roll, translation | **no** | they depend on a pivot height, and pitch and roll on the model's orientation |

### The pivot rule

A rotation other than about Y needs a pivot: translate to it, rotate, translate back. **The pivot is in the model's own space**, where `0` is the top of the model, **+Y points down**, and one unit is 16 model pixels.

```java
poseStack.translate(0.0D, pivotY, 0.0D);
poseStack.mulPose(Axis.ZP.rotationDegrees(angle));
poseStack.translate(0.0D, -pivotY, 0.0D);
```

**Read the pivot from the model**: take the `y` of the part the rotation should turn about, and divide by 16. A crocodile whose `body` part sits at `y = 16.8` rolls about `1.05`.

!!! warning "The default pivot is a player's"
    `BarrelRollAnimation` defaults to a pivot of `0.75`: twelve pixels, a player's waist. On any other body the model orbits around that point instead of turning on the spot. Set it for each model with `setPivotY`.

    `ForwardRollAnimation` has the same pivot hardcoded and is typed on `HumanoidModel`, so it only suits a player-shaped body.

## Level 2: animating parts

When no whole-body transform expresses a technique (a tail, pincers, wings, a hind-leg kick), animate the model's parts. The parts of `QuadrupedModel` are `protected` and a generated model's own parts are `private`, so the model needs **public accessors**:

```java title="MyWalkModel.java"
public ModelPart getRightHindLeg() {
    return this.rightHindLeg;
}
```

The animation then knows exactly one model. Type it on `EntityModel` and test for that model, so any other model is an explicit no-op instead of a swallowed `ClassCastException`:

```java
public void angles(LivingEntity entity, EntityModel<LivingEntity> model, float limbSwing,
                   float limbSwingAmount, float ageInTicks, float netHeadYaw, float headPitch) {
    if (!(model instanceof MyWalkModel<?> walk)) {
        return;
    }
    walk.getRightHindLeg().xRot = kickAngle;
}
```

Write values rather than adding to them: the walk cycle set these parts a moment earlier, and adding would put a limb wherever the two happened to sum to.

!!! tip "Keep level 2 for signature techniques"
    Each level 2 animation costs a set of accessors and works on one model only. Reach for it when the technique is central to the fruit and nothing simpler reads.

## Triggering the model's own attack gesture

Many morph models already animate an attack from `attackTime`: a bite, a pincer snap, a puff. A server-side swing plays that gesture on every client, with no animation class at all:

```java
user.swing(InteractionHand.MAIN_HAND, true);
```

It is a good fit for a grab closing on its target, or any technique whose moment is the model's attack. Models commonly skip the gesture while the user holds an item, so check that the technique is used empty-handed.

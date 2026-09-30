# First-person limbs

Package `com.inovactio.akumalib.client.firstperson` (client only).

A partial morph draws the first-person hand through the base mod's `HumanoidMorphModel.renderFirstPersonArm`. Left alone, that path has three faults, and each one shows on screen:

- **the pose**: a morph model is one instance shared by every player in the form, and its parts keep the pose of the last third-person frame. Crouching leaves the arm 3.2 px lower and a swing leaves it turned aside, so fur or claws come out shifted from the hand;
- **the Black Leg leg**: with a morph, the base mod asks the model for the first-person limb. If the model answers `false`, vanilla draws the bare **arm**, not the leg of a Black Leg user;
- **the aura**: the base mod gives an overlay (armament Haki, Diable Jambe) to the player's own limb only when no morph replaces the hand.

These classes fix all three. Before this, the code lived twice, once in InoFruits and once in Missing Missing no Mi.

## Drawing a morph limb: `FirstPersonLimbs`

Each method puts every part back to its rest pose before drawing, and restores the third-person pose afterwards.

| Method | For |
| --- | --- |
| `render(limb, adjust, stack, vertex, ...)` | a limb the form replaces entirely (a hybrid's arm) |
| `keptArm(graft, adjust, side, stack, vertex, ...)` | a form that keeps the player's arm and puts something on it; with an aura it draws the arm itself and lays the aura over it |
| `leg(graft, playerLeg, side, stack, vertex, ...)` | the first-person limb of a Black Leg user: the player's leg (unless `playerLeg` is `false`, when the form replaces the legs), with the form's part at its rest pose |
| `graftedLeg(stack, vertex, ..., side, graftLeg)` | the same leg, for a part that sits on the player's leg and must take the leg's pose (toe claws) |

`adjust` runs after the rest pose, for what a model changes per player (the slim-arm sleeve). `keptArm`, `leg` and `graftedLeg` return what `renderFirstPersonArm` should return; after `render`, return `true`.

```java
@Override
public boolean renderFirstPersonArm(PoseStack stack, VertexConsumer vertex, int packedLight, int overlay,
                                    float red, float green, float blue, float alpha, HumanoidArm side,
                                    boolean isLeg) {
    if (isLeg) {
        return FirstPersonLimbs.leg(this.getLeg(side), true, side, stack, vertex, packedLight, overlay,
                red, green, blue, alpha);
    }
    return FirstPersonLimbs.keptArm(this.getArm(side), null, side, stack, vertex, packedLight, overlay,
            red, green, blue, alpha);
}
```

!!! note "Two calls per hand"
    With an overlay showing, the base mod calls the model twice in the same hand render: the second call carries the overlay's buffer and colour. The library tells the two calls apart by itself, so answer both the same way.

## A part glued to the hand: `HandGraft`

Some parts must follow the arm exactly as vanilla has just drawn it: nails, scissors, a rotor. For these, the model implements `HandGraft` and draws nothing for the arm in `renderFirstPersonArm`, answering `false`. The library listens to `RenderArmEvent`, lets vanilla draw the arm, lays the base mod's coating over it (scaled like the base mod's), and then calls:

```java
public class ScissorsModel<T extends LivingEntity> extends HumanoidMorphModel<T> implements HandGraft {

    @Override
    public boolean graftOnHands(LivingEntity entity) {
        return true;                                  // false while the graft sits elsewhere
    }

    @Override
    public void renderGraftOn(LivingEntity entity, ModelPart playerArm, HumanoidArm side, PoseStack stack,
                              MultiBufferSource buffers, int packedLight, @Nullable AbilityOverlay coating) {
        // draw the part in playerArm's pose; lay `coating` over it too when it is not null
    }
}
```

`ArmCoating` answers which overlay the base mod shows on a limb: `onMainArm(entity)`, `onNailedLimb(entity)` (the main arm, or the main leg of a Black Leg user) and `isCoated(entity, side)`.

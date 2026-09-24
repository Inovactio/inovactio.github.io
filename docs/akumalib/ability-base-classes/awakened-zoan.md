# Awakened Zoan

The base mod gives an awakened Zoan form a scarf of animated smoke. AkumaLib provides that smoke for any addon's forms, with no client wiring.

## `AwakenZoanAbility`

Extend `AwakenZoanAbility` instead of the base mod's `MorphAbility` for an awakened form. It is a `MorphAbility` in every other respect.

```java
public class MyAwakenedPointAbility extends AwakenZoanAbility {

    public MyAwakenedPointAbility(AbilityCore<MyAwakenedPointAbility> core) {
        super(core);
    }

    @Override
    public MorphInfo getTransformation() {
        return MyMorphs.AWAKENED_POINT.get();
    }
}
```

!!! info "The smoke appears on its own"
    The library attaches its smoke layer to every living entity renderer and every player skin. While an equipped `AwakenZoanAbility` is **continuous**, the smoke is drawn around the entity. When no such ability is active, the layer returns immediately and costs nothing.

## Placing the smoke

The smoke is drawn at the model's origin, which suits a player-shaped body. For any other shape, have your form's `MorphInfo` implement one or more marker interfaces:

| Interface | Effect |
|---|---|
| `IAwakenZoanSmokeLayerHeadAnchor` | moves the smoke to the pivot of the model's head first. No method |
| `IAwakenZoanSmokeLayerYRotate` | `getSmokeLayerYRotateAngle()`: turns the smoke about the vertical axis, in degrees |
| `IAwakenZoanSmokeLayerZOffset` | `getSmokeLayerZOffset()`: moves it forward or back |
| `IAwakenZoanSmokeLayerYOffset` | `getSmokeLayerYOffset()`: moves it up or down |
| `IAwakenZoanSmokeLayerScaleSize` | `getSmokeLayerScaleSize()`: scales it |

They are applied in this order: head anchor, then the layer's own scale, rotation, Z offset, Y offset, and your scale.

```java
public class MyAwakenedPointMorphInfo extends MorphInfo
        implements IAwakenZoanSmokeLayerHeadAnchor, IAwakenZoanSmokeLayerScaleSize {

    @Override
    public float getSmokeLayerScaleSize() {
        return 1.6F;
    }

    // ... the rest of the morph
}
```

!!! tip "Anchor quadrupeds on the head"
    A four-legged model's neck is low and far ahead of the player origin, so placing the smoke with offsets alone means large numbers computed by hand, which break the moment the model moves its head. With `IAwakenZoanSmokeLayerHeadAnchor`, the offsets become small corrections around the neck.

!!! warning "The head anchor follows position, not rotation"
    Only the pivot's height and depth are followed, never its sideways position, and the head's rotation is not applied: the smoke stays on the body's midline and does not turn with where the player looks. A model that is not a `HeadedModel` ignores the marker.

!!! warning "Not on a partial morph that moves the head in `postRenderCallback`"
    A partial morph renders through the player model. If its `postRenderCallback` moves that model's head, the move comes too late for the smoke: the anchor still reads the player's own pivot, and the scarf lands where the head would have been. On Mine Mine no Mi's Mammoth Heavy Point, that is the animal's rear. Place such a form with Y and Z offsets alone, measured against where the callback puts the head. A partial morph that leaves the head alone needs no marker at all: the player's neck is already its neck.

## `AwakenZoanMorphRenderer`

A morph renderer that already carries the smoke, for a morph that **replaces the player renderer outright** and so never goes through the layers the library attaches.

```java
new AwakenZoanMorphRenderer<>(ctx, morphInfo, model);
new AwakenZoanMorphRenderer<>(ctx, morphInfo, model, innerArmor, outerArmor);
```

Pass your own armour models, or `null` for both when the form has no armour of its own: every addon keeps its morph armours in a registry of its own shape, so the library does not look them up.

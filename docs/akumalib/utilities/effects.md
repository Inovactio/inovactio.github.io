# Effects

Most effects an addon registers mark a body rather than doing something every tick: the target is poisoned, painted, salted or dizzy, and the ability that applied it reads that state elsewhere. Two base classes cover that.

## `MarkerEffect`

```java title="SaltedEffect.java"
public class SaltedEffect extends MarkerEffect {

    public SaltedEffect() {
        super(MobEffectCategory.HARMFUL, 0xE8E8E8, true);
    }
}
```

The constructor takes the category, the particle colour, and **whether milk and the base mod's cures may remove it**.

It sets four answers for you:

| Method | Value | Why |
|---|---|---|
| `shouldUpdateClient()` | `true` | **the one that matters**: see below |
| `isDurationEffectTick(...)` | `false` | a marker has no per-tick work |
| `shouldRender(...)` | `true` | visible in the inventory |
| `shouldRenderHUD(...)` | `true` | visible on the HUD |

!!! danger "Without `shouldUpdateClient`, the player never sees the effect"
    The base mod's `BaseEffect` returns `false` by default, and that gates sending the effect to clients at all: no HUD icon, no inventory entry, no body tint. The server knows the target is marked; the player does not. Extending `MarkerEffect` is what stops this from being forgotten.

Each answer is still overridable: an effect that genuinely ticks overrides `isDurationEffectTick`, one that should stay off the HUD overrides `shouldRenderHUD`.

!!! note "Removable is a design choice"
    Whether milk strips the effect is a constructor argument on purpose: an incurable debuff and a buff that washes off are both valid, and neither should be inherited by accident.

## `OverlayEffect`

A `MarkerEffect` that also **tints the body** it is on:

```java title="MarkedEffect.java"
public class MarkedEffect extends OverlayEffect {

    public MarkedEffect() {
        super(MobEffectCategory.HARMFUL, 0xD04040, true);
    }

    @Override
    public Color getBodyOverlayColor(int duration, int amplifier) {
        return new Color(208, 64, 64, 150);
    }
}
```

!!! warning "Spell out the alpha"
    `new Color(rgb)` has an alpha of 255, which paints the body a flat silhouette with no skin left underneath. Around `100` suits something the user wears and must stay readable through; around `150` a mark whose job is to be impossible to miss.

- Override `getViewOverlayColor` to tint the player's **whole view** as well. It defaults to `null`, no tint, and is a much stronger statement than tinting a body.
- The colour method receives only the duration and the amplifier. The amplifier is the only per-application value an effect instance carries, so it can encode something other than strength, such as a colour index: one registered effect for sixteen colours.

## `EffectsHelper`

```java
if (EffectsHelper.isInvulnerable(target)) {
    return;
}
```

Whether the target has the library's `INVULNERABLE` effect. `hurtBurst` already checks it; call it yourself in any other damage or control path that should respect it.

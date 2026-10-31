# A form that makes its user bigger: `FormSizes`

A form is a `SIZE` modifier (maintainer, 2026-10-28): while a declared form is on, the user's `akumalib:size` carries the form's size, by the form's mode, so everything that follows the size follows the form by AkumaLib's curves, with no factor of the form's own: reach, damage, areas, cooldowns, and the body (walk, jump, fall, health, sturdiness; maintainer, 2026-10-28: the body too).

- **Declare** each growing form once, at mod construction: `FormSizes.declare(MyMorphs.GIANT.getId(), 4.0F)` (four times a man; usually the form's standing height / 1.8). `declare(id, 1)` takes it back. Full forms only: a hybrid counts as a man.
- **Modes** (`FormSizes.Mode`, maintainer 2026-10-28). A man (SIZE 1) is the form's size in all three:

  | Mode | What it does | For | Golem x2.5 on a man / slider +0.75 / a giant (race x4) |
  |---|---|---|---|
  | `ADD` (**the default**, `declare(id, size)`) | adds `size - 1` to the wearer's **final** size, whatever made it (race, slider, effects) | a form with a body of its own: golems, a mecha, a dragon, a full Zoan | 2.5 / 3.25 / **5.5** |
  | `MULTIPLY_BASE` | a share of the attribute's base, added to the other base shares and the slider's (+75 % and +50 % make +125 %), then multiplied by the race | an ability that grows or shrinks its user himself | 2.5 / 3.25 / 10 |
  | `MULTIPLY_TOTAL` | the whole size times the form's | only a form that must follow its wearer in proportion | 2.5 / 4.375 / 10 |

  The race's base is a `MULTIPLY_TOTAL` ("Body size: race") and the creator's slider its own `MULTIPLY_BASE` ("Body size: slider", #755): a `MULTIPLY_BASE` form's share adds to the slider's, then the race multiplies the whole (a man at +0.75 in a form x2.5: 1 x (1 + 0.75 + 1.5) = 3.25; a fishman at +0.75: 1.25 x 1.75 = 2.19, as before). A save from before the split is split at the second's check, its size kept. The game would put an `ADDITION` under every multiplier: `SizeScale.get` reads an `ADD` form on top of the final size itself (read `SIZE` through `SizeScale`, never `getAttributeValue`).
- **Box, eyes, model, shadow and third-person camera** stay the form's own, written for a man in it: AkumaLib grows them by the rest of `SIZE`, the form's share left out (`SizeScale.outsideForm`, `SizeScale.formScaled`). A form 4 high on a giant x2 is 8 high, declared or not.
- **The modifier** (`FormSizes.FORM_ID`, "Form size", `MULTIPLY_TOTAL`) is transient and set each tick on both sides from the form worn: gone the tick the form ends, at death, never saved (a relog puts it back from the form still worn) and kept across a change of dimension by the same tick. The server's attribute sync shows it to the other players.
- `SizeScale.get` is the whole size, the form included; `SizeScale.formShare` the form's size for a man; `SizeScale.outsideForm` = `get / formShare`, what the form's own box, eyes and model grow by (a giant x4 in a golem x2.5 added: 5.5 / 2.5 = 2.2). `AkumaSize.size(entity, form)` of a declared form is `SizeScale.withForm(entity, declared)`: the size with that form in its mode.
- **A plain form** (`SizeTooltips.plainForms`: a man in it keeps the kit's figures, Missing #978) grows its abilities, their tooltips and cooldowns by `SizeScale.withoutDeclaredForm` = `get / formShare`: a declared plain form's share taken out, an undeclared one's height never counted. The body still follows the form.
- **The base mod's forms are not declared** (Deka, Daibutsu, the Zoan points...): they give their own speed, jump, fall and health, which the body would double. They keep the rule above: their size counts their height, their body only `SIZE`.

**Migrating an addon's form** (Missing's `FormSize`, rule A):
1. `FormSizes.declare(form, size)` for each growing form (one per size for a form in several sizes: `TimedSizeFormAbility`'s morphs); `FormSizes.declare(form, size, Mode.MULTIPLY_BASE)` for an ability that grows its user himself, `Mode.MULTIPLY_TOTAL` for a form that must follow its wearer in proportion.
2. Take out the form's own factor: no share taken back out of a hit or a reach (`FormSize`), no plain form (`SizeTooltips.plainForms`) for it, no `x size` written by hand for what AkumaLib grows (reach, damage, areas, the body's own bonuses to walk, jump, fall and health).
3. Where the kit grows something AkumaLib does not (where the hand is, a construct's size) by the form's own scale times `SIZE`, read `SizeScale.outsideForm` for the `SIZE`: `get` holds the form already, and the form's scale x `outsideForm` is the size worn.
4. A man's numbers in the form change (they follow the curves of the declared size): a balance pass per form.

## A form that keeps a man's figures: `KeptForms`

*Since 6.1.0.* A full Zoan is a bigger body, not a stronger technique. Declare it, then name it once, at setup: `KeptForms.keep(form -> form == MyMorphs.BEAST.get())`. The body follows the form's size; a technique hits and reaches as the kit says at SIZE 1, and by `SIZE` alone above it. Hits lose the form's share in `LivingHurtEvent`, components carry its inverse, `AkumaSize.reach` and the aim read it, and tooltips, searches and spawns count the form as no bigger body (`SizeTooltips.plainForms`). A declared form still reaches by its size in melee; its fist and its health do not grow by it.

# Attributes and size

## `AttributeBonusHelper`

An idempotent pair for applying and removing an attribute modifier:

```java
AttributeBonusHelper.add(entity, Attributes.MOVEMENT_SPEED, SPEED_UUID, "My Speed",
        0.2, AttributeModifier.Operation.MULTIPLY_BASE);

AttributeBonusHelper.remove(entity, Attributes.MOVEMENT_SPEED, SPEED_UUID);
```

- `add` does nothing if a modifier with that UUID is already present;
- `remove` does nothing if it is absent.

So both can be called every tick at no cost, which is the safe way to hold a conditional bonus.

!!! danger "Apply and remove every tick, never on transitions"
    `add` uses a **permanent** modifier, which is saved with the entity. A bonus applied when a condition starts and removed when it ends is kept for good if the entity logs out in between: on reconnect, your "was active" flag is gone and the modifier is not. Checking the condition every tick and calling `add` or `remove` accordingly cannot drift.

    For a passive, [`ConditionalStatPassiveAbility`](../ability-base-classes/passives.md#conditionalstatpassiveability) already does this, with tiers and disable handling. For a morph, see [`MorphStats`](../core-concepts/morph-gates-and-stats.md).

!!! warning "One UUID per attribute per bonus"
    Two modifiers with the same UUID on one attribute cannot coexist: the second is refused while the first is present. Give every bonus its own UUID.

## `SizeScale`

Reads an entity's size from the library's `SIZE` attribute:

```java
float scale = SizeScale.get(entity);   // 1.0 when the entity has no SIZE attribute
```

The value is clamped between `SizeScale.MIN_SCALE` (`0.05`) and `SizeScale.MAX_SCALE` (`50`, a body 90 blocks high), the same clamp for the box, the eyes, the drawing and the abilities. A missing attribute, `NaN` or an infinite value all read as `1.0`.

**The curve of the size** (maintainer, 2026-10-28; `[sizeSystem]` `sizeCurveStart` 4, `sizeCurveSoftness` 2, `sizeLimit` 16):
- **The base is never bent**: the attribute's base (an entity's own size: an NPC set to 6.67 stays 6.67) times its lasting body sizes (the race x the creator's slider) and a summon's grown body (`SizeScale.base`).
- **Only what is added is bent**: forms (declared or the base mod's, whose height counts) and effects. It is free while the total stays under 4. Past `S = max(base, 4)` the total `B` becomes `S + 2 ln(1 + (B - S) / 2)`.
- **A technical limit of 16**, a guard against sizes piled up by a command or a pack.
- `SizeScale.get` is the size by the curve, `SizeScale.raw` the attribute as it adds up, and `SizeScale.real(base, total)` the curve itself. `AkumaSize.size` bends the whole total. A form's own box, eyes and model grow by `SizeScale.outsideForm` (the real size / the form's own). Read `SIZE` through `SizeScale`, never through the attribute.
- Examples:
  - a man in a form +3.44 (added) is 4.40;
  - a body of 6.67 in it is 8.67;
  - 16 past the start adds 4.39;
  - a giant (race x4) in the Deka form (18.9) is 8.27, his box 15 blocks high, not 34;
  - a man in the Deka form is 4.61 (4.72 before), in Daibutsu 5.92 (7.22).
- Nothing changes up to a total of 4.
- A softness of 0 takes the curve off; a limit of 0 takes the limit off.

To stop the library resizing an entity while something else drives its dimensions, set `SizeScale.SUSPEND_FLAG` in its persistent data; `SizeScale.isSuspended(entity)` reads it. See [What the library registers](../core-concepts/library-registrations.md#driving-an-entitys-size-yourself).

### What `SIZE` does to a body

For players and every living entity, with or without a form: a full form or a hybrid is its own box grown by `SIZE` (a 12-block giant in a full form 1.7 high is 11.3 high). For abilities, a hybrid still counts as no form (see below): the body follows the hybrid, the reach and damage do not.

- **Box**: the standing, crouching and swimming boxes are grown by `SIZE`. A player's own box too (`PlayerSizeMixin`): before 6.0.0, `SIZE` grew a player's abilities and drawing but not his box.
- **Eyes**: at the real height of the grown body (a player at `SIZE` 4 sees from 6.48, not 1.62).
- **Third-person camera**: pulled back by `SIZE` (16 blocks at `SIZE` 4), still kept out of walls by the base mod.
- **Model**: drawn at the grown size, a full form too (the base mod draws a full form with its own renderer, grown in `MorphRendererSizeMixin`; a player in a form that is the player's own body, Deka, Mini, the Titan..., is drawn by the player's renderer since #651, grown like any body).
- **Shadow**: grown by `SIZE`, both ways (a shrunk body casts a smaller one). A hybrid (a partial form with a box of its own) also grows it by its height against a man's, as its box.
- **Hearing** (`[sizeSystem]` `hearing`, `hearingMargin`): a body taller than a man listens from the middle of its body, in first and third person alike, and hears at full volume up to its melee reach plus `hearingMargin` (4), then a sound fades over its usual distance: a 12-block giant hears at full volume up to 17 blocks, nothing after 33. The server sends sounds that much further to such a player. A man hears as the game does.
- **Particles and sounds of its abilities** (`[sizeSystem]` `visuals`): a particle effect of the base mod made for a big body grows by its reach factor (square root, up to x3): spread around its origin, speed and particle size; a 12-block giant's fire pillar x2.6. The sounds played while it uses or ticks an ability are heard further (volume x the same factor; the game hears a sound up to 16 blocks x its volume) and lower (pitch divided by the cube root of the size, never under 0.5: a 12-block giant, about half). A man looks and sounds as before. Particles the server sends as plain Minecraft particles, and sounds played after the ability's own tick (a projectile's impact), do not move.

For players and the creatures of `akumalib:size_followers`, once the body is taller than a man (`BigBodies`):

- **Step height**: a quarter of the standing height, never under what the body steps already and never over 6 blocks (a 12-block giant: 3; a body x50, 90 high: 6). `sizeSystem.stepHeight`. Walking speed and jump: below.
- **Walk, jump, fall and health** (`[sizeSystem]` `body`, #673 / #674, figures chosen by the maintainer 2026-10-26; `SizeBodyStats`): by the `SIZE` attribute alone (a race, an effect, a form declared in `FormSizes`, below), not the height of a form, since the base mod's forms declare their own and those add. Walking and running speed divided by size^(1/12), by 1.25 at most, and the same off the ground: the steering of a jump or a flight (`LivingEntityAirSpeedSizeMixin`), and the base mod's push forward of a sprint jump higher than a man's lifts only for the share the size gives (`AttributesHandlerJumpSizeMixin`; a form's own jump still pushes, / the same factor): a giant x4 sprint-jumped at 11.2 blocks a second, 2.5 times his sprint, now 5.7 for a 5.0 sprint (maintainer 2026-10-28: a big body is slower than a man; it replaces / size^(1/6) up to / 1.5, ground only, and before it x size^⅓ up to x2); jump 1.25 blocks x size up to 10 (the base mod's `JUMP_HEIGHT`); fall without harm 3 blocks x size up to 30 (`FALL_RESISTANCE`); max health x √size up to x3, Doriki and forms included. SIZE 1 / 2 / 4 / 6.667 / 10: walk 4.3 / 4.1 / 3.8 / 3.7 / 3.5 blocks a second (run x1.3 of it), jump 1.25 / 2.5 / 5 / 10, safe fall 3 / 6 / 12 / 30, health x1 / 1.41 / 2 / 3. Health keeps its share when the size changes (15/20 grown x2 is 30/40: no heal by growing, no death by shrinking) and is saved with the player. Each curve in the config (`walkSlowExponent`, `walkSlowCeiling`, `jumpExponent`, ...). The walk's divisor takes the whole speed (`MULTIPLY_TOTAL`): the run, a form's own speed and the effects with it. The movements of abilities (dashes, leaps, charges, `akumalib:size_moves`) keep their own curve, and swimming is not touched. A man and a smaller body as before. Bane Bane's springs bounce as a man's at every size (maintainer, 2026-10-28): while Spring Hopper's spring is on the jump (`SizeBodyStats.OWN_JUMP`), the size adds no jump and divides neither the jump's push forward nor the steering in the air; its body and damage still grow.
- **Regeneration and sturdiness** (`[sizeSystem]` `body`, maintainer 2026-10-27, the giant at SIZE 4 is "x2"): by the `SIZE` attribute alone, as the health. Each heal of the natural regeneration (a full stomach every 4 s, saturation every half second; `SizeRegen`) x √size up to x3 (`regenExponent`, `regenCeiling`), at the same rhythm and for the same hunger: potions and abilities heal as before. Every push the body takes (the knockback of a blow or a hit, and the pushes of `akumalib:size_pushes`; `SizeKnockback`) divided by √size up to 3 (`sturdinessExponent`, `sturdinessCeiling`): a giant x4 flies half as far. A division, not the knockback resistance attribute, which adds up to 1 and would cancel every push. A giant x4 hitting a giant x4 pushes x2 / 2: as a man pushes a man. SIZE 1 / 2 / 4 / 6.667 / 10: heal and sturdiness x1 / 1.41 / 2 / 2.58 / 3.
- **Spotted from farther** (`[sizeSystem]` `spotted`, `spottedExponent`, `spottedCeiling`; `SizeSpotted`): by the `SIZE` attribute alone, √size up to x3. Its visibility to mobs is multiplied by the factor (a mob spots a target within its follow range x the target's visibility: a zombie, 35 blocks, spots a giant x4 at 70), and a mob that takes it as its target gets its follow range x the factor while it keeps it, so it does not drop it at once nor stop its path short. Sneaking and invisibility still divide it.
- **Falls and sprints** (`[sizeSystem]` `body`; maintainer 2026-10-27; `SizeBodyLimits`, `PlayerSprintSizeMixin`): by the `SIZE` attribute alone. The safe height stays 3 blocks x size (above); past it each block hurts x √size up to x3 (`fallDamageExponent`, `fallDamageCeiling`: a giant x4 falls 12 blocks unhurt, then takes 2 a block). The hunger of a sprint (a sprinting move, a sprinting jump) x √size up to x3 (`sprintExponent`, `sprintCeiling`); walking, resting and healing cost as before.
- **No vanilla mount** (`mountMaxSize` 2; `SizeBodyLimits`): a body whose `SIZE` is over 2 does not get on a horse, a boat, a minecart or any vanilla vehicle (`minecraft:` types, players aside) and gets off one it rides. Mods' own mounts (Zoan forms, Cruise's vehicles) are not touched. 0: no limit.
- **Sinking** (`[sizeSystem]` `body`, `sinkExponent`, `sinkCeiling`; maintainer 2026-10-29; `LivingEntitySinkSizeMixin`): by the `SIZE` attribute alone. In water the game pulls every body down by the same gravity / 16 a tick against the same drag: a man and a giant sank at 0.5 blocks a second (18.9 s to the bottom of 10 blocks, 38.9 s of 20). While the body does not swim up (no jump key), that pull, so its sinking speed, is multiplied by √size up to x3: a giant x4 sinks at 1 block a second (9.5 s and 19.5 s). SIZE 1 / 2 / 4 / 10: x1 / 1.41 / 2 / 3. Swimming up (the jump key), a sprint swim, rising, wading on the bottom and the base mod's pull on a fruit user (8.5 blocks a second, any size) are not touched; a fruit giant reaches the bottom a tick or two sooner. Under 1, the slider's or race's share only (#748): a body of 0.5 sinks x0.71. A man as before.
- **Water**: the base mod already weakens a fruit user by the water's height on its body (strongly from half its height, lightly from a quarter, always with its eyes under), and the box grows with `SIZE`: a giant x4 in 2 blocks of water only slows (a man's half block), and sinks in deep water. Nothing added; `GiantLimitsGameTests` checks it.
- **Very big bodies** (a box of more than 4 096 blocks, about x20 and up: only with the size's limit off): the blocks the body touches are read on the shell of its box only (a block in its middle no longer acts on it), and a player's pose is checked again only when he moves or crouches. The game scanned the whole box every tick: at x50 (81 000 blocks) the server fell to 14 TPS.
- **Never suffocated**: a hit from the blocks inside its box is cancelled and the body is moved to the nearest place it fits within 8 blocks, else the first room above.
- **Menus and trades as far as it reaches** (Race #3): the menu of a block that holds things (chest, barrel, shulker box, hopper, dispenser, dropper, furnaces, brewing stand, ender chest, chiseled bookshelf, lectern) stays open 8 blocks from the feet plus what the size adds to the block reach (a giant x4: 16.2), a wandering trader's trade 4 plus what it adds to the entity reach. Workstations, horses and chest vehicles already follow the reach (Forge). A man stays at 8 and 4. A mod's own container that calls `Container.stillValidBlockEntity` keeps its 8 blocks.
- **Room on arrival**: after a change of dimension, a respawn or a teleport, a body that does not fit where it lands is moved the same way a tick later.
- **Pushes by size**: when a big body and another body push each other, the bigger one takes the push divided by how many times taller it is (a 12-block giant takes an eighth of a cow's push); the smaller one is pushed as before. Without it, a herd standing inside a giant's box held it in place. Two bodies of a man's size or less push as the game does.

Hunching and crawling under a low ceiling belong to the race that needs them (the race addon), not to the library.

### An addon's scale of the ability factors

An addon can multiply a body's ability factors for a state of its own, with `AkumaSize.addFactorScale` (Race Race no Mi #3: a giant hunched under a low roof uses his abilities at x0.5, so a giant x4 falls back to a man's reach and damage):

```java
AkumaSize.addFactorScale((entity, family) -> isHunchedGiant(entity) ? 0.5F : 1.0F);   // at setup, once
```

- Asked only for the families of abilities: `REACH`, `DAMAGE`, `MELEE_SKILL`, `EXPLOSION`, `EXPLOSION_DAMAGE`, `MOVEMENT`, `COOLDOWN`. Never for the body (`WALK`, `HEALTH`, ...) nor a plain blow (`MELEE_REACH`, `MELEE_DAMAGE`, `ATTACK_SPEED`), nor the `SIZE` attribute: the body stays its size.
- Applies wherever an ability's factor is read: `factor`, `factorFor`, `cooldownFactor`, the searches of `AbilityContext` and the spawns' stamp (`AkumaSpawnSize.of`). Answer 1 for what the state does not touch; mind that `COOLDOWN` x0.5 is a shorter wait.
- Never under a man's figures (1), nor under a small body's own factor below 1: a giant x4 at x0.5 is x1, a body x2 at x0.5 stays x1.
- Scales multiply together. `removeFactorScale` takes one back. With none registered nothing is asked and nothing costs (`FactorScaleGameTests`).

### A race's size

A race (or anything lasting) gives a body its size with a permanent `SIZE` modifier under a stable id of its own:

```java
private static final UUID GIANT = UUID.fromString("...");   // the race's own id, never changed

AkumaSize.setBodySize(player, GIANT, "giant", 12.0D / 1.8D); // a 12-block giant: box 12, eyes 10.8
AkumaSize.clearBodySize(player, GIANT);                       // back to a man
```

- It is saved with the player and kept over a relog, a change of dimension and death (AkumaLib copies every `SIZE` modifier named `AkumaSize.BODY_SIZE + ...` to the new body). Call it again when the race changes, not every tick.
- It multiplies with the rest: a full form is its own box x the race size; a passing effect multiplies too (Awaken's shrinking effect, -50 %, halves a giant to 6 blocks). Opposite sizes cancel.
- Everything else follows by itself: box, eyes, camera, model, shadow, step height, abilities, melee.

### The race's base size and the creator's slider (#746)

A race may instead declare its size to AkumaLib, which then puts it on its players itself, with the character creator's size slider around it (see [Races](races.md#size) and [Character creator](character-creator.md#size-slider)):

```java
AkumaRaces.setSize(fishman, 1.25D);                    // base 1.25, the default slider -0.25 to +0.25 by 0.125
AkumaRaces.setSize(giant, 4.0D, 0.0D, 0.2D, 0.1D);     // base 4, a slider of its own: 0 to +0.2 by 0.1
```

- **Size = base x (1 + slider).** A race that declares nothing (the base mod's four) has base 1 and the default slider: a man goes from 0.75 to 1.25 (1.35 to 2.25 blocks), 1 in the middle (maintainer, 2026-10-29).
- One permanent `SIZE` modifier (`RaceSizes.ID`, named `AkumaSize.BODY_SIZE + "race"`): kept over death, relog and a change of dimension, sent to the clients with the attribute. The slider and the race it was set for are in the player's persisted data. **A man at 0 has no modifier at all**: exactly as before #746.
- Set when the creator finishes (the base mod's `SetPlayerDetailsEvent`); the book or the command change it afterwards, as the race. Every second the server checks the race: a new race (by `/change_character`, or a mod) resets the slider to its start; a race whose declared base changed keeps its slider on the new base.
- `RaceSizes.set(player, slider)` sets it by hand (brought within the race's bounds and steps); `RaceSizes.slider(player)` reads it.
- **Two server switches** (`[sizeSystem]`, maintainer 2026-10-29), both `true` by default (exactly as before): `sizeSlider = false` drops the slider's share (and its modifier) for every player and hides the book's slider, the stored setting kept for when it is back on; `raceBaseSizes = false` puts every race at base 1, giants too, the slider (if on) then working on 1. The server reads them every second: a change (a config reload, a restart) re-checks every player online (size and box) and tells the clients (`SyncSizeRulesPacket`). `RaceSizes.sliderOn()` / `basesOn()` read them; GameTests set them in memory with `RaceSizes.setRulesForTests`, never in the world's config file. They touch only their own modifier: forms (`FormSizes`, the base mod's), abilities that grow or shrink their user, an entity's own size, summons and effects stay as they are (a giant in a golem, race bases off: 1 + the golem's 1.5).
- Three more switches, same day, `true` by default: `sizeSliderUnderOne = false` keeps a man's figures for a body the slider made smaller (every curve below 1 stays x1; only the body is smaller). `sizeInPvp = false` brings a player's hit on another player back to a man's (`SizePvp`: the attacker's factor taken off by the family that grew it) and his push too (`SizeKnockback`); against mobs and NPCs nothing changes. `bodyReachMenus = false` keeps chests and wandering traders at a man's 8 and 4 blocks (#763). Applied at a config reload; GameTests set them with `AkumaSize.setSwitchesForTests`.

**Under 1** (maintainer, 2026-10-28): a body the slider (or its race's base) makes smaller than a man follows the curves below 1 too, both ways, by the same powers, never under 1 / the ceiling: a man at 0.75 has health, regeneration, damage (blows, abilities, explosions), ability reach and its melee reach x0.87 (reach 2.48 to hit), knockback given and dashes x0.87, cooldown x0.94, swings x1.15 as often, is spotted at x0.87, takes pushes x1.15 and fall damage x0.87 a block, sprints for x0.87 the hunger, and walks x1.05 (the walk's divisor, the other way). Only the slider's share counts: a shrinking effect or a small form on top of it keeps the slider's figures (a man shrunk by anything else keeps a man's, as before). Not shrunk: the flight and box of projectiles, beams, searches written by hand (`AbilityContext`), block shapes, spawns, particles and sounds: a man's.

### A form that makes its user bigger: `FormSizes` (Missing #978)

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

### Melee

For players and `akumalib:size_followers` (`BigBodies`, `[sizeSystem]` `melee`):

- **Reach** to hit (`ENTITY_REACH`) and to break or place blocks (`BLOCK_REACH`): the body always reaches its own feet, plus an arm softened by the size: the reach is the distance from its eyes to the ground one arm away (arm = base reach x size^`meleeArmPower`), less what a man's eyes add, so a man stays at 3 and 4.5. Added to what an ability declares, grown by the arm of `SIZE` alone (#736). `meleeArmPower` 0.661 (x2.5 at SIZE 4, the giant; maintainer, 2026-10-27; it replaces `meleeArmExponent` 0.5), `meleeArmCeiling` 10. The melee skills listed in `akumalib:size_melee` (the base mod's `PunchAbility`s; addons add theirs) grow their reach by the same power under the reach's ceiling (x3; family `MELEE_SKILL`), in their ability's frame, through `AkumaSize.reachOf` (`AkumaAim.ahead`) and their range bonus; every other ability keeps the reach curve (x2). `meleeArmExponent` and `meleeArmCeiling` replaced `meleeReachExponent` and `meleeReachCeiling` (the reach in proportion, 20 and 30 for that giant), so a value written for the old rule is not read for the new one.
- **A form's own reach is the size's** (maintainer, 2026-10-29): in a full form that makes its user bigger (declared in `FormSizes`, or a form of the base mod whose height counts: Daibutsu, Deka, Shadows Asgard, Inga Zarashi, a Zoan's full point, Missing's golems), the form's own `ENTITY_REACH` / `BLOCK_REACH` bonus (an `AbilityAttributeModifier` of an ability that morphs) is dropped: the body's size gives the reach. A man in Daibutsu reaches by his size 5.92 alone, without the +12. The forms of `akumalib:form_keeps_reach` (`data/<namespace>/tags/abilities/form_keeps_reach.json`, ability ids) keep their bonus as written, a fixed figure on top of the size's reach, no longer grown with the body. Out of a form, in a hybrid, and with the size's melee off, nothing changes. The list goes to the clients with the moves (`SyncSizeMovesPacket`).
- **Strength** (`ATTACK_DAMAGE`, weapons included): square root of the size, up to x3 (`meleeDamageExponent` 0.5, `meleeDamageCeiling` 3; maintainer 2026-10-27: a giant x4 hits x2), multiplying the whole.
- **Swing** (`ATTACK_SPEED`, the counterweight of the strength): divided by the square root of the size, up to 3 (`meleeAttackSpeedExponent` 0.5, `meleeAttackSpeedCeiling` 3): a giant x4 swings half as often for x2 a blow. Same size as the strength (a full form counts).
- A smaller body never hits shorter or weaker than a man, save the creator's slider (above). A hybrid's blows do not grow (full forms and SIZE only, as for abilities).

## `AkumaSize`: abilities that follow the size of their user

The size of a body is its `SIZE` attribute times the height of its form against a man's (1.8). A race and a form are combined, and opposite sizes cancel. Each family of an ability turns that size into a multiplier, never under 1 (save the creator's slider, above):

```java
float reach = AkumaSize.factor(entity, ability, AkumaSize.Family.REACH);   // 1 for a man, 2 for a body x4
float damage = AkumaSize.factor(entity, ability, AkumaSize.Family.DAMAGE); // 1 for a man, 2 for a body x4, 3 at most
```

**An ability made for its form grows once** (`akumalib:size_form_made`, `data/<namespace>/tags/abilities/size_form_made.json`; maintainer, 2026-10-28). The base mod sized some abilities for the big form they need: Deka Trample's 5-block area and 7-block cube are a Deka giant's (8.5 high), Mammoth Trample's 3.5 and 5 a mammoth's. Counting the form again grew them twice (a man in the Deka form trampled 10.9 blocks out and ran x2.17; a fishman at SIZE 2.19 hit the x3 ceiling, 15 blocks). For the abilities listed there the form's share is taken out: they grow by `SIZE` alone (as a plain form, `SizeTooltips.plainForms`), in their reach, damage, searches (their frame), blocks scanned, pushes, run and tooltips. A man in the Deka form tramples as the base mod wrote it; a giant x4 in it, x2 (10 blocks). AkumaLib lists the two tramples; a kit adds an ability made for its own big form. The list goes to the clients with `akumalib:size_moves` (a player's game moves his own body).

Nothing has to be called for most abilities:

- the range of a `RangeComponent` (area range, line distance and width) and the damage of a `ProjectileComponent` carry a size bonus on their own bonus managers, put on every ability of a big body each tick (`SizeBonuses`), so tooltips show it;
- every hit through `DealDamageComponent.hurtTarget` is multiplied by the damage factor;
- every ability projectile hits harder once: `getNewProjectile` applies the bonus manager, and a projectile made any other way gets its owner's damage factor when it joins the world (`SizeProjectiles`).
- every ability projectile grows with its owner when it joins the world: its boxes against entities and blocks by the reach factor (square root, up to x3), and its drawing with them (the factor goes to the clients in its spawn data). It still starts from its owner's eyes, which are at a big body's real height.
- every ability projectile flies as far as its owner reaches (#685): at its first server tick its life grows by the reach factor, and its speed makes up what air drag takes from the longer life, so it covers the factor times a man's distance (a 12-block giant's Hiken x2.58). A shot that sets its own speed every tick (homing) keeps its own speed and flies x the factor too (#703). Once, saved with it. Not grown: a projectile standing still at its first tick (held, placed: its life is a duration), beams (`NuLightningEntity`, next item), and the types of `akumalib:size_life_exempt` (the base mod's weather balls, which slow down and hover; a pack adds its own). An AkumaLib boomerang's outward leg is grown the same way, not its life: it turns back x the factor as far out.
- every beam (`NuLightningEntity`: Gomu pistols, El Thor, Amaterasu...) reaches as far as its owner (#690): at its first tick its length (`maxTravelDistance`) and the speed it gets there (`travelSpeed`) grow by its stamp, so it is as long as the reach factor times a man's and reaches it in a man's ticks; its life stays a duration. Once, saved with it. The client draws the length the server sends; its own copy of the length grows from the stamp in the spawn data, and a client that starts tracking the beam later gets it grown already (the spawn data says so). Its width is its box (above). Its own tick searches as written in the ability context (below): it is sized already, it does not widen twice.
- every explosion an ability makes (`AbilityExplosion`, through its `ExplosionComponent` or built by hand) grows with its user, the exploder or the owner of an exploding projectile: the radius by the explosion factor (cube root, up to x2), which widens the area touched, the blocks broken and the particles together, and the damage by the square root up to x3 (`explosionDamageExponent`, `explosionDamageCeiling`, as the damage of abilities: a giant x4 x2), for a target at the same place in the blast. An explosion with no ability (a bomb, a dial, a creature's) does not move.
- every push a big body gives goes further (`SizeKnockback`, #671), by the knockback factor (square root, up to x3): the game's knockback of its blows and of every ability hit, in the knockback event (a projectile's counts as its owner's), and the hand-written pushes (`AbilityHelper.setDeltaMovement` on another body) of the abilities listed in `akumalib:size_pushes`, while the ability is used or ticked or in the tick its hit landed. Sideways by the factor, upwards by its square root, so the whole flight grows by the factor; a part the ability copied from the body's own motion is kept. List only abilities that launch a body, never a hold that keeps a body at a point or a push that scales the body's own motion. AkumaLib lists the base mod's (`data/akumalib/tags/abilities/size_pushes.json`); a kit adds its own in a file of the same name, or grows a push by hand with `AkumaSize.factor(user, ability, Family.KNOCKBACK)`.
- a big body's dashes, leaps and charges cover distance by its size (`SizeMoves`, #672), by the movement factor (square root, up to x3): the velocity an ability gives its own user through `AbilityHelper.setDeltaMovement` while it is used or ticked, for the abilities with the base mod's `DashComponent`, AkumaLib's `MoveAbility`s and those listed in `akumalib:size_moves` (`DiveStrikeAbility` grows its own). Sideways by the factor, upwards by its square root, so a dash goes the factor further and a leap's whole arc grows by it; a part copied from the body's own motion is kept, and the game's collisions stop a big dash at a wall. List only movements that throw the body from what the ability writes, never a flight, a glide or a swim steered every tick from the body's own motion, nor a travel to a set point. Bane Bane's Spring Hopper and Spring Snipe are not listed (maintainer, 2026-10-28): Spring Hopper reads its fall back each tick (x1.15), which grew again every tick. The list goes to every client (a player's game moves him). A kit lists its ability in its own `size_moves.json`, or grows a velocity it sets by hand with `SizeMoves.velocity(user, ability, velocity)`.
- every cooldown of a big body is a little longer (`CooldownComponentMixin`, maintainer 2026-10-27): x size^0.2165 up to x1.5 (`cooldownExponent`, `cooldownCeiling`; x1.16 at 2, x1.35 at 4, x1.5 from 6.5), players and NPCs, every ability of every mod, since all start through `CooldownComponent.startCooldown`. Grown once on the server, which sends the length to the clients, so the bar shows the real wait; a stance or a continuous ability whose cooldown comes from how long it was held grows that figure; a cooldown copied to a linked partner (`SharedCooldowns`) is not grown again. An exempt ability waits as a man's.
- no grab lifts a body more than twice its user's size (`AkumaSize.canLift`, `liftRatio` 2): `GrabEntityComponent` (every grab of the base mod and the addons that use it) finds nothing, as when no body is in reach; AkumaLib's `CarryAbility` counts it a refusal; a big body's extra grabbed bodies (`SizeGrabs.more`) skip it. A giant x4 lifts a man; a man lifts up to SIZE 2. A grab of a kit's own asks `AkumaSize.canLift(user, target)`.

A **partial form** (a hybrid) keeps a man's figures: only full forms change the size, in hits and tooltips alike.

An addon whose forms keep their own figures (it takes their height back out of every technique itself) tells the tooltips so once, at setup: `SizeTooltips.plainForms(form -> <is one of mine>, MY_SHARE_ID)`. Its forms then count as no bigger body there (size = `SIZE` alone), and the MUL bonus it puts under `MY_SHARE_ID` on the abilities' bonus managers is left out of the "other bonuses", as AkumaLib's own size bonus is. Tooltips only: hits and reaches in play stay the addon's to correct.

### Direct hits

A hit that calls `hurt` itself, or `AkumaAbilityHelper.hurtBurst` without a component, does not grow on its own. Route it through `AkumaSize`:

```java
AkumaSize.hurt(user, this, target, source, damage);          // target.hurt(source, damage x the damage factor)

float grown = AkumaSize.damage(user, this, damage);           // the grown figure, for any other path
AkumaAbilityHelper.hurtBurst(target, source, grown);
```

Pass the ability (`this`) so the exempt list applies. Never use them on a hit that goes through `DealDamageComponent.hurtTarget`: it would grow twice.

AkumaLib's own bases (`GustAbility`, `WaveAbility`, `AuraAbility`, `DiveStrikeAbility`, the blocks of `StompAbility`, `ZoneAbility`, `SpreadingBlockAbility`, `BlockWaveAbility`) already size their own areas.

### Sizes an ability writes: the size-aware blocks

A radius, a width, a reach or a round of blocks written as a number stays a man's for a giant: only the hits that go through the size path grow. **Every size an ability writes goes through AkumaLib** (#664). A man gets exactly the number written, so moving a size to these blocks changes nothing for him; an exempt ability keeps it too.

| What | Block | Before (stays a man's) | After (grows with the user) |
|---|---|---|---|
| A radius, a width, a distance | `AkumaSize.reach(user, ability, base)` | `double r = RADIUS;` | `double r = AkumaSize.reach(user, this, RADIUS);` |
| A round, a ball, a strip of blocks | `AkumaShapes.disc / ball / strip` | `for (dx = -R; dx <= R; dx++) for (dz ...) if (dx*dx + dz*dz <= R*R + 1)` | `for (BlockPos pos : AkumaShapes.disc(user, this, centre, R))` |
| A layer on the ground (cream, syrup, mud) | `AkumaShapes.layDisc(group, user, ability, level, centre, radius, layer, up, down)` | the loop above with `GroundLayers.layOn` | one call, same rules (`TemporaryBlocks`, `GroundLayers`) |
| Targets around a point that is not the user (a tentacle, a crest) | `AkumaTargeting.around(user, ability, centre, radius, filter)` | `getEntitiesOfClass(..., box.inflate(REACH), ...)` | the same bodies within the sized radius |
| The aim of a targeted technique (the one he looks at, the point he aims at) | `AkumaTargeting.firstInSight / aimPoint`, or `AkumaTargeting.aimRange(user, range)` for a ray of the kit's own | `WyHelper.rayTraceBlocksAndEntities(user, RANGE)` (inside the user's ability it grows by itself since #689; outside it, it does not) | the ray grown by the reach factor (#657): a giant aims at his feet |
| What the ability spawns (a wave, a tentacle, a construct) | `AkumaSpawnSize.sized(entity, user, ability)` | `new WaveEntity(..., HALF_WIDTH)` | `AkumaSpawnSize.sized(new WaveEntity(..., HALF_WIDTH), user, this)` |
| A wall's panels, as big as the body that raises them (maintainer, 2026-10-27) | `PanelWalls.raise(...)` (by itself), or `AkumaSpawnSize.bodySized(entity, user, ability)` and `PanelWalls.size(user)` for the spacing | panels a block wide, 2 blocks from the feet: a giant's wall in his body | a man's wall grown by `SIZE` around the feet: each panel, the gaps and the distance ahead; 48 blocks wide at most |
| That spawn's own reach | `AkumaSpawnSize.reach(spawn, base)` | `inflate(REACH)` around the tentacle | `inflate(AkumaSpawnSize.reach(this, REACH))` |

- **Every entity a player spawns inherits his size by itself** (#670): when it joins the world, an entity whose owner is a player takes his reach factor, once. The owner is read where Minecraft keeps it: a projectile's owner (arrows, tridents, snowballs and fireballs included), a tamed summon's (`OwnableEntity`), the owner a construct or a summon declares (`TraceableEntity`; AkumaLib's `TornadoEntity`, `HoldingSphereEntity` and `DecoyEntity` declare theirs). Along a chain the factor is inherited, never multiplied: a giant's turret at x3 gives x3 to its shell. Creatures of `akumalib:size_followers` count as players; other NPCs and mobs, not yet.
- An entity that keeps its owner in a field of its own, or gets it after joining the world, calls `AkumaSpawnSize.inherit(entity, owner)` right after it has one (or implements `TraceableEntity`). `sized` stamps one before it joins; neither grows an entity twice. List such types in `akumalib:size_inherits_by_call`: the GameTest `everySpawnTypeIsHandled` fails on any non-creature type of the base mod, AkumaLib or Missing that declares no owner and sits in neither tag. `/akumalib spawnsize <targets>` shows an entity's factor and where it came from.
- A change of dimension stamps nothing new: an entity that joined the world unstamped (a pet tamed after it joined) stays unstamped in the next dimension. A stamped one keeps its factor.
- What grows: the box (against entities and blocks), the drawing, on every client; the factor is saved with the entity. A grown vanilla projectile strikes the creatures its box touches; against blocks it still flies on a line from its centre.
- **A living summon is as big as its user** (#707, maintainer 2026-10-27): its body is its user's size (`SIZE` x the user's size, a small user's too: a Doru clone of a SIZE 6.667 player is 6.667 high, of a SIZE 0.5 one 0.5), so its box, drawing and eyes are those of a player of that size. The rest follows from that body once, as for that player: blows (`ATTACK_DAMAGE`) by the melee damage curve, walk and max health by `SizeBodyStats`, its own abilities through `AkumaSize.factor`, which reads its master's size. A summon of `akumalib:size_followers` gets its blows from the size rule itself, not twice. Saved once: read back from a save it does not grow again. Its own numbers keep the reach factor (below).
- Never grown: the entity types of `akumalib:size_exempt` (markers, item and XP drops, vanilla pets and mounts, what lives in a dimension of its own). A pack adds to it.
- The spawn's own numbers (a pull distance, a search box, a radius) read its factor, one line each: `AkumaSpawnSize.reach(this, base)`, `AkumaSpawnSize.factor(this, Family.DAMAGE)`. AkumaLib does it for its own bases (tornado's funnel and touch, a hold's slack and smothering hits, a decoy's call, a boomerang's catch) and for the base mod's Raigo (crater, shockwave), Ursus Shock (crater, blast, push), Dai Enkai Entei (boiled water) and MH5 (gas).
- `WaveAbility` takes the factor as its wave leaves: `waveScale()`, and `sizedHalfWidth()` for what the subclass draws or lays across the wave in `onWaveTick`. Give the entity it spawns in `onWaveStart` the same with `AkumaSpawnSize.sized(wave, user, this)`.
- An area that already uses a `RangeComponent` needs nothing: its range carries the size bonus.
- **A big body's grab holds several** (#658, `SizeGrabs`): as many bodies as the reach factor, rounded (`SizeGrabs.count`: 1 up to SIZE 2.25, 3 for a giant at 6.667 and at the cap, 1 for an exempt ability), the others nearest the user's line of sight and no further along it than the first (`SizeGrabs.more`), each taking the full blows (maintainer, 2026-10-26). `HoldingSphereEntity` closes a copy of itself on each by itself (a subclass with plain fields copies them in `copyTo`); a technique that already closes on several at once (an area) is not grown again. `GrabAbility` and `CarryAbility` hold the others beside the first and pass them every blow the user lands on it; their hooks only see the first. A grab of a kit's own takes `count` / `more` for its pick and a `SizeGrabs.Held` (`take`, `tick`, `release`) for its hold. A big user holds the grabbed body at the edge of his own, not inside his box (#705, `SizeGrabs.heldOutward`, on every `GrabEntityComponent`): out along his facing by the half-width his SIZE added. A man unchanged. A forwarded blow opens the others' frames when the first's are open (a `hurtBurst` bite lands on each). A hold that stops ticking (death, logout, unequip) forwards nothing more. A grab's first body: `SizeGrabs.firstInSight` / `SizeGrabs.inSight` (in place of `AkumaTargeting.firstInSight` / `AkumaAim.inSight`) take the body the sight meets, and for a bigger body that meets none, the one nearest his line of sight within the same lane, as far as his sight reaches (maintainer, 2026-10-27: from a giant's eyes a body at his feet is a small mark). A man, a smaller body or an exempt ability: the sight alone.

Example, a round of cream (Missing's Cream Flood):

```java
// before: a man's 8 blocks, whatever the user's size
for (int dx = -RADIUS; dx <= RADIUS; dx++)
    for (int dz = -RADIUS; dz <= RADIUS; dz++)
        if (dx * dx + dz * dz <= RADIUS * RADIUS + 1)
            GroundLayers.layOn(this.flood, entity, level, centre.offset(dx, 0, dz), cream, 2, 2);

// after: 8 blocks for a man, 16 for a body x4 (reach x2)
AkumaShapes.layDisc(this.flood, entity, this, level, centre, RADIUS, cream, 2, 2);
```

### Searches made while an ability runs: the ability context

A search for entities written by hand (`getEntitiesOfClass(..., box.inflate(4), body -> body.distanceTo(user) <= 4)`) needs no call (#676). While a player's ability runs (its use, its tick, its hit and swing triggers) and while a spawn stamped by `AkumaSpawnSize` ticks (a living summon's whole tick included), AkumaLib holds an **ability context** (`AbilityContext`). Every search made inside it:

- gets its box grown around its centre by the user's reach factor (a spawn: its own stamp); a box that holds the body's own grows only past it, since the size grew the body already: a giant's (x6.667, half-width 2) `getBoundingBox().inflate(4)` reaches 2 + 4 x 2.58 = 12.3 (#704);
- has the distances its filter measures (`Entity.distanceTo`, `distanceToSqr`, `Vec3.distanceTo`, `distanceToSqr`) read in the user's lengths, so `distanceTo(user) <= 4` reaches 4 x the factor.

A test the kit makes after the search, in its own loop, is not seen: write it with `AkumaSize.reach` (and then the search is left as written, see below).

The context reads the body as the tooltips do: in a form an addon declared plain (`SizeTooltips.plainForms`, Missing's `FormSize`), `SIZE` alone, so a man in a big form searches as a man; a form the addon does not declare counts whole (Missing: Seiryu's dragon, the Goru and Mori golems, the Ishi giant). The spawns of `AkumaSpawnSize` are stamped the same way (#704).

Left as written:

| What | Why |
|---|---|
| A man or a smaller body | the factor never goes under 1 |
| `RangeComponent` areas and lines, a beam's tick (`NuLightningEntity`, #690), AkumaLib's own bases (zones, waves, gusts, auras, dives, tornadoes, decoys) | sized already |
| A box whose radius the same frame got from `AkumaSize.reach` or `AkumaSpawnSize.reach` (`AkumaTargeting.around` too) | sized by the kit: nothing grows twice |
| A box reaching at most 1.5 past the body's own on some side (a margin round it, a box swept along its motion as a projectile's hit check), or no wider than that anywhere (a spot, a block) | a touch, which grows with the body's box |
| A box of 48 blocks or more from its centre (finding one's own summons, gates, turrets) | bookkeeping; a grown box also stops at 48 |
| A search inside `AbilityContext.fixed(() -> ...)` | the kit opted that one out |
| An ability of `akumalib:size_search_exempt` (`data/<namespace>/tags/abilities/size_search_exempt.json`) or `akumalib:size_exempt` | exempt; AkumaLib lists the base mod's six abilities it sizes by hand (Fujiazami, Grande Sables, Hanamizu Shinken, Kyokaen, Puni, Vari). Their whole context reads x1, the helpers below and the particles too: their own mixins grow their radius and their particles' spacing, which would grow twice (checked #704) |

The small helpers read the same context (#692): a kit passes the man's figure, and it grows with the user whose ability runs (`AbilityContext.factor()`, 1 outside an ability). A value sized already is never grown again (#704): inside `AbilityContext.fixed(() -> ...)`, or a value the same frame got from `AkumaSize.reach` or `AkumaSpawnSize.reach`, cut to whole blocks or not (`AbilityContext.sizedAlready`).

| Helper | What grows | Not twice |
|---|---|---|
| `AkumaAim.groundUnder(user, point, drop)` | `drop` | do not pass a drop from `AkumaSize.reach` |
| `BlockScan.sized(radius)`, the base mod's `WyHelper.getNearbyBlocks` through it | the radius, rounded, up to 48 | a radius from `AkumaSize.reach` stays |
| `GroundLayers.layOn(..., up, down)` | `up` and `down`, rounded, as `AkumaShapes.layDisc` grows them | `layDisc` passes its own sized values (`layOnSized`); a value from `AkumaSize.reach` stays |
| The base mod's placers (`SimpleBlockPlacer`, `RandomBlockPlacer`): `setSize`, `setThickness` | every size and the thickness, by one ratio: the factor, down to what keeps the longest at 48; none when one is at 48 already (Torikago's 60) | a `setSize(AkumaSize.reach(...))` in the same frame, or a placer generated inside `fixed`, stays |
| A shape that shuts its user in (`akumalib:size_body_shapes`: Candle House, a crouching Kamakura and Kamakura Jussoshi, a Barrier Ball laid on oneself, Great Cage, Torikago) | follows the **body**, not the reach: the whole size (`BlockShapeSize.factor(centre)`), 48 at most, when the shape is centred within a block of the user's box; the same ability aimed elsewhere keeps the reach factor. Candle House, laid by hand, is laid again grown (`BlockShapeSize.layRoundBody`), its walls as thick in proportion. A kit lists its ability in its own `size_body_shapes.json`; a hand-laid enclosure passes its man's blocks to `layRoundBody` | as the placers |
| `AkumaShapes.disc / ball` | the radius (`AkumaSize.reach`), up to 48 | pass the man's figure |
| `AkumaShapes.strip(..., halfWidth, length)`, `layDisc`'s `up`, `down` | by `AkumaSize.factor`, up to 48: lengths, not search radii, so not taken for a kit's sized radius | `WaveAbility.sizedHalfWidth()` or a value from `AkumaSize.reach` stays |
| `GroundLayers.spareAround(..., radius, ...)` | its search, as any search in the context | a radius from `AkumaSize.reach` (Missing's Kuri Kuri) is kept |
| The base mod's `WyHelper.getNearbyBlocks(Entity or BlockPos, ..., radius)` | the radius (or the three sizes), up to 48; the scan reads its cube | a scan inside `BlockScan.manSize(() -> ...)` stays: water, safe ground (Nekkai Jigoku's water) |

Of the base mod's 18 callers of `getNearbyBlocks`, 13 run inside an ability and grow: the tramples of Deka and Mammoth, Karakuni's fire (9; AkumaLib reads only the fire, where a chunk section may hold some), Cien Fleur Stomp and Ancient Stomp (where the stomps rise, what they break), Gourmet Snipe, Mogura Tonpo, Ivory Dart, Ryu no Ibuki, Rust Break, Takt, Hana's feet (with their stamp). Nekkai Jigoku's water (30) stays a man's. Four never run in an ability and never move: the fruit reborn in a chest, the poneglyph, the mobs' block avoidance, the Blue Sword's fire.

The base mod's rays read the same context (#689, `RaySize`): `WyHelper.rayTraceBlocksAndEntities(entity, length[, box])`, `rayTraceBlocks`, `rayTraceEntities` (the instant shot), `rayTraceBlockSafe`, and vanilla's `Entity.pick(length, ...)`, cast from the user whose ability runs, reach the length x its reach factor: a giant's ray of 4 ends 10.3 blocks from its eyes. Their callers in the base mod (40), Missing (2) and InoFruits (11), the six default-length ones aside, and Missing's 9 `pick`, follow without a change.

| Left as written | Why |
|---|---|
| A man, a smaller body, a ray outside an ability | the factor never goes under 1 |
| A ray cast from another entity than the user (a target, a spawn) | not the user's reach |
| A ray of 48 blocks or more: the default `rayTraceBlocksAndEntities(entity)` (1024), Ichi Ichi's 128 | the cap of a search (`AbilityContext.CAP`): a grown ray stops at 48 too, and so does `aimRange` |
| A length the frame already sized: `AkumaTargeting.aimRange` (#657, so `firstInSight` and `aimPoint`), `AkumaSize.reach`, the length an outer overload grew | nothing grows twice |
| A ray inside `AbilityContext.fixed(() -> ...)` | the kit opted that one out |
| `Level.clip` | a line of sight between two fixed points, not a reach |

The grown length is marked sized, so the ray's own entity search round the user is not grown a second time.

`/akumalib searchsize <player>` starts noting that player's searches (nothing is noted before it, so a server pays nothing), then lists his last searches: grown from what to what, or kept and why. In GameTests `size-guard.txt` lists the searches grown per ability, and the area test (`size-areas.txt`) measures them grown.

| Setting (`[sizeSystem]` in `akumalib-server.toml`) | Default |
|---|---|
| `enabled`, `reach`, `damage` | `true` |
| `reachExponent`, `reachCeiling` | `0.5` (square root), `3.0` |
| `damageExponent`, `damageCeiling` | `0.5` (square root), `3.0` |
| `stepHeight` | `true` |
| `hearing`, `hearingMargin` | `true`, `4.0` |
| `explosion` | `true` |
| `explosionExponent`, `explosionCeiling` | `0.333` (cube root), `2.0` |
| `explosionDamageExponent`, `explosionDamageCeiling` | `0.5` (square root), `3.0` |
| `visuals` | `true` |
| `melee` | `true` |
| `meleeArmPower`, `meleeArmCeiling` | `0.661` (x2.5 at SIZE 4), `10` |
| `meleeDamageExponent`, `meleeDamageCeiling` | `0.5` (square root), `3.0` |
| `meleeAttackSpeedExponent`, `meleeAttackSpeedCeiling` | `0.5` (square root: the swing divided by it), `3.0` |
| `body` | `true` |
| `walkSlowExponent`, `walkSlowCeiling` (what the walk and the air's steering are divided by; were `0.1667`, `1.5`, ground only; before that `walkExponent`, `walkCeiling`, x size^⅓ up to x2); `jumpExponent`, `jumpCeiling`; `fallExponent`, `fallCeiling` | `0.0833`, `1.25`; `1.0`, `8.0`; `1.0`, `10.0` |
| `healthExponent`, `healthCeiling` | `0.5` (square root), `3.0` |
| `regenExponent`, `regenCeiling` | `0.5` (square root), `3.0` |
| `sturdinessExponent`, `sturdinessCeiling` | `0.5` (square root: pushes taken divided by it), `3.0` |
| `knockback`, `knockbackExponent`, `knockbackCeiling` | `true`, `0.5` (square root), `3.0` |
| `movement`, `movementExponent`, `movementCeiling` | `true`, `0.5` (square root), `3.0` |
| `spotted`, `spottedExponent`, `spottedCeiling` | `true`, `0.5` (square root), `3.0` |
| `cooldownExponent`, `cooldownCeiling` | `0.2165` (a giant x4 waits x1.35), `1.5` |
| `fallDamageExponent`, `fallDamageCeiling` | `0.5` (square root, past the safe height), `3.0` |
| `sprintExponent`, `sprintCeiling` | `0.5` (square root), `3.0` |
| `sinkExponent`, `sinkCeiling` | `0.5` (square root: the sinking speed in water, idle, x2 at SIZE 4), `3.0` |
| `liftRatio` | `2.0` (no grab of a body more than twice the grabber's size; 0: no limit) |
| `mountMaxSize` | `2.0` (no vanilla mount over SIZE 2; 0: no limit) |
| `sizeSlider` | `true` (false: no creator slider, its share ignored, each player's setting kept) |
| `raceBaseSizes` | `true` (false: every race at a man's base 1, giants too) |
| `sizeSliderUnderOne` | `true` (false: a body the slider made smaller than a man keeps a man's figures, only its body is smaller) |
| `sizeInPvp` | `true` (false: between two players, damage and knockback as a man's; body, reach and the rest still follow; mobs and NPCs unchanged) |
| `bodyReachMenus` | `true` (false: chests and wandering traders keep a man's 8 and 4 blocks, giants too) |

- **Who follows:** players, and the creatures of the entity type tag `akumalib:size_followers` (empty by default).
- **Exempt abilities:** `data/<namespace>/tags/abilities/size_exempt.json`, read like a tag (`replace`, `values` of ability ids). AkumaLib's own file lists the base mod's Haki.
- **Value census:** the GameTest `sizeValueCensus` writes `size-census-off.csv` and `size-census-on.csv` in the run folder (every fruit, every body, every ability: range, damage shown and dealt, projectile damage, tooltip ranges, explosion radius and damage, projectile box). Run it before and after a change to the size system and compare the files; it fails when a man's dealt values move.
- **Size guard (GameTests only):** on a GameTest server, `SizeGuard` checks every hit whose source is an `AbilityDamageSource`: it must have gone through the size path in the same tick (`DealDamageComponent.hurtTarget`, `AkumaSize.hurt`, `AkumaSize.damage`, or a sized projectile). Offenders are logged as `[SIZE-GUARD]` and listed in `size-guard.txt` in the run folder. For a strict namespace the test the target stands in fails, naming the ability; the others are reported only. Strict by default: `akumalib`. An addon opts in with the JVM property `-Dakumalib.sizeGuard.strict=akumalib,<its namespace>` on its GameTest run. An ability's explosion marks it when it goes off. Not flagged: exempt abilities, sources without a living attacker. Not told apart (flagged): a damage sized in an earlier tick than the hit, damage over time dealt through the ability's own source. Off in play: nothing listens outside a GameTest server.
- **Area test (GameTests only, #664):** `SizeAreaGameTests` uses every ability as a man and as a body x4 (reach x2), each on a fresh floor, and notes the radius of every entity search it makes and how far from its user it changes blocks (`SizeAreas`). A search radius found unchanged at x4, or blocks changed no further away, is a raw size: listed in `size-areas.txt` in the run folder with what was measured, and the abilities that could not run (a form, a charge, a target they need). It fails for a strict namespace (as the size guard), reports the others. A margin of up to 1.5 around the user's own box is a touch, not an area. An addon runs it on its own abilities from a GameTest of its own: `SizeAreaCheck.run(helper, "myaddon")`, with a long timeout, in a batch of its own; once its kits use the size-aware blocks, it joins the strict list. An ability whose two runs take over 5 s is stopped and listed as too slow, and a sweep stops and fails past 9 minutes, naming the ability it was at (#757). AkumaLib's own runs in four parts, batches `akumalib_size_areas_1` to `_4` (2 to 3 minutes each, under the watchdog's 10 minutes without a finished test), which write `size-areas.txt` together; an addon can split its own the same way: `SizeAreaCheck.run(helper, "myaddon", part, parts)`. Each GameTest batch starts without the mobs the earlier batches left (`GameTestBatchCleanupMixin`, game test server only), and the sweep lets go of the chunks every finished test forced, all but its own, until its end: 740 leftover NPCs over every finished test's ground had made it ten times slower. So each part runs in a batch of its own.

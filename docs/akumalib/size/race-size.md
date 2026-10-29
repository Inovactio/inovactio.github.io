# A race's size and the creator's slider

A race (or anything lasting) gives a body its size with a permanent `SIZE` modifier under a stable id of its own:

```java
private static final UUID GIANT = UUID.fromString("...");   // the race's own id, never changed

AkumaSize.setBodySize(player, GIANT, "giant", 12.0D / 1.8D); // a 12-block giant: box 12, eyes 10.8
AkumaSize.clearBodySize(player, GIANT);                       // back to a man
```

- It is saved with the player and kept over a relog, a change of dimension and death (AkumaLib copies every `SIZE` modifier named `AkumaSize.BODY_SIZE + ...` to the new body). Call it again when the race changes, not every tick.
- It multiplies with the rest: a full form is its own box x the race size; a passing effect multiplies too (Awaken's shrinking effect, -50 %, halves a giant to 6 blocks). Opposite sizes cancel.
- Everything else follows by itself: box, eyes, camera, model, shadow, step height, abilities, melee.

## The race's base size and the creator's slider (#746)

A race may instead declare its size to AkumaLib, which then puts it on its players itself, with the character creator's size slider around it (see [Races](../utilities/races.md#size) and [Character creator](../utilities/character-creator.md#size-slider)):

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

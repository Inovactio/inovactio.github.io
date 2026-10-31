# Size settings and tests

## Settings

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

## Who follows, exemptions and test tools

- **Who follows:** players, and the creatures of the entity type tag `akumalib:size_followers` (empty by default).
- **Exempt abilities:** `data/<namespace>/tags/abilities/size_exempt.json`, read like a tag (`replace`, `values` of ability ids). AkumaLib's own file lists the base mod's Haki.
- **Value census:** the GameTest `sizeValueCensus` writes `size-census-off.csv` and `size-census-on.csv` in the run folder (every fruit, every body, every ability: range, damage shown and dealt, projectile damage, tooltip ranges, explosion radius and damage, projectile box). Run it before and after a change to the size system and compare the files; it fails when a man's dealt values move.
- **Size guard (GameTests only):** on a GameTest server, `SizeGuard` checks every hit whose source is an `AbilityDamageSource`: it must have gone through the size path in the same tick (`DealDamageComponent.hurtTarget`, `AkumaSize.hurt`, `AkumaSize.damage`, or a sized projectile). Offenders are logged as `[SIZE-GUARD]` and listed in `size-guard.txt` in the run folder. For a strict namespace the test the target stands in fails, naming the ability; the others are reported only. Strict by default: `akumalib`. An addon opts in with the JVM property `-Dakumalib.sizeGuard.strict=akumalib,<its namespace>` on its GameTest run. An ability's explosion marks it when it goes off. Not flagged: exempt abilities, sources without a living attacker. Not told apart (flagged): a damage sized in an earlier tick than the hit, damage over time dealt through the ability's own source. Off in play: nothing listens outside a GameTest server.
- **Area test (GameTests only, #664):** `SizeAreaGameTests` uses every ability as a man and as a body x4 (reach x2), each on a fresh floor, and notes the radius of every entity search it makes and how far from its user it changes blocks (`SizeAreas`). A search radius found unchanged at x4, or blocks changed no further away, is a raw size: listed in `size-areas.txt` in the run folder with what was measured, and the abilities that could not run (a charge, a target they need). An ability gated by a form is used in the first form of its namespace that lets it run, named on its line ("in ..."), a body in a form measuring as any body x4 does. It fails for a strict namespace (as the size guard), reports the others. A margin of up to 1.5 around the user's own box is a touch, not an area. An addon runs it on its own abilities from a GameTest of its own: `SizeAreaCheck.run(helper, "myaddon")`, with a long timeout, in a batch of its own; once its kits use the size-aware blocks, it joins the strict list. An ability whose two runs take over 5 s is stopped and listed as too slow, and a sweep stops and fails past 9 minutes, naming the ability it was at (#757). AkumaLib's own runs in four parts, batches `akumalib_size_areas_1` to `_4` (2 to 3 minutes each, under the watchdog's 10 minutes without a finished test), which write `size-areas.txt` together; an addon can split its own the same way: `SizeAreaCheck.run(helper, "myaddon", part, parts)`. Each GameTest batch starts without the mobs the earlier batches left (`GameTestBatchCleanupMixin`, game test server only), and the sweep lets go of the chunks every finished test forced, all but its own, until its end: 740 leftover NPCs over every finished test's ground had made it ten times slower. So each part runs in a batch of its own.

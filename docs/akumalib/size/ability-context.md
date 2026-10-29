# Searches made while an ability runs: the ability context

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

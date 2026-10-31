# Hits and sizes an ability writes by hand

## Direct hits

A hit that calls `hurt` itself, or `AkumaAbilityHelper.hurtBurst` without a component, does not grow on its own. Route it through `AkumaSize`:

```java
AkumaSize.hurt(user, this, target, source, damage);          // target.hurt(source, damage x the damage factor)

float grown = AkumaSize.damage(user, this, damage);           // the grown figure, for any other path
AkumaAbilityHelper.hurtBurst(target, source, grown);
```

Pass the ability (`this`) so the exempt list applies. Never use them on a hit that goes through `DealDamageComponent.hurtTarget`: it would grow twice.

AkumaLib's own bases (`GustAbility`, `WaveAbility`, `AuraAbility`, `DiveStrikeAbility`, the blocks of `StompAbility`, `ZoneAbility`, `SpreadingBlockAbility`, `BlockWaveAbility`) already size their own areas.

## Sizes an ability writes: the size-aware blocks

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
- `WaveAbility` takes the factor as its wave leaves: the wave is wider and, since 6.1.0, runs further by it (the crest's step x `waveScale()`). `sizedHalfWidth()` is for what the subclass draws or lays across the wave in `onWaveTick`. Give the entity it spawns in `onWaveStart` the same with `AkumaSpawnSize.sized(wave, user, this)`.
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

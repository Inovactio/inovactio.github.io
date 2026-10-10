# Blocks

## `TemporaryBlocks`

*Since 3.1.0.* Blocks an ability puts in the world for a while and takes back: a wall raised from the ground, a dome, a cage. Each cast opens a group, places through it and removes it at its end.

```java
private TemporaryBlocks.Group wall;

private void onStart(LivingEntity entity, IAbility ability) {
    this.wall = TemporaryBlocks.open(entity);
    for (BlockPos pos : shape) {
        this.wall.place(entity, pos, Blocks.DIRT.defaultBlockState(), WALL_RULE);
    }
}

private void onEnd(LivingEntity entity, IAbility ability) {
    if (this.wall != null) {
        this.wall.remove();
        this.wall = null;
    }
}
```

What it takes care of, each rule paid for once in an addon:

- **placed through the base mod's own placer** (`NuWorld.setBlockState` with your `BlockProtectionRule`): protected areas per block, griefing rules, restricted blocks;
- **never over a body**: a block raised through somebody suffocates them, so an occupied square is skipped. A block a body can stand in - a layer on the ground, a web - is laid with `lay` instead of `place`, and goes under bodies too: a pool poured with `place` had a hole under everybody it was poured on. `lay` still refuses, where a body stands, a block that has a collision shape;
- **nothing drops**: a block broken by hand or blown up goes without a drop, and no piston moves one. A temporary wall every few seconds would otherwise be a quarry;
- **only what is still ours comes down**: a block mined and replaced by somebody is theirs; within the dirt family a change still counts as ours (grass spreads, covered grass turns back to dirt);
- **plants come back**: what a block replaced (grass, flowers) is put back when the group comes down;
- **never left behind**: a group whose owner dies comes down (the base mod ends no ability on death), so does one whose owner leaves the world or the game, and every group comes down as the server stops.

`TemporaryBlocks.isTemporary(level, pos)` tells whether a block is one of them.

### Taking blocks out for a while

A group also takes blocks **out** and gives them back: a pit that opens under somebody, a gap in a wall.

```java
this.pit = TemporaryBlocks.open(entity);
for (BlockPos pos : hole) {
    this.pit.cut(entity, pos, PIT_RULE);
}
// later
this.pit.remove();
```

- **quietly**: no neighbour is told, going or coming back. Sand over the gap does not fall, a torch on the block does not pop off, water beside it does not run in;
- **back as it was** when the group is removed, with everything a group comes down by: its owner's death, his leaving the world or the game, the server's stop;
- **never over a body**: whoever or whatever is in the gap as it closes is set in the first room straight above it ([`AkumaRoom.firstRoomAbove`](other-helpers.md#akumaroom));
- **never over somebody's block**: a block set in the gap meanwhile stays; water, fire or a plant gives way;
- **never a chest**: a block with something inside it (a block entity) is refused, and so is a temporary block. No temporary block is raised in a gap either;
- `cutSize()` counts the blocks still out; `isEmpty()` is true once nothing is placed and nothing is out.

!!! warning "No gap when ability griefing is off"
    `cut` goes through the base mod's placer, which refuses to remove any block when the server has turned ability griefing off: it then returns false everywhere. Give the technique something to do without its gap.

!!! warning "Your rule decides what may be replaced"
    The group replaces whatever your `BlockProtectionRule` allows. `DefaultProtectionRules.AIR` builds into air only; add foliage to it for a wall that stands in grass and flowers, which then come back.

## `PropagationHelper`

Spreads a block operation over several ticks, outward from a centre, instead of doing it all in one tick.

It computes, once, the list of positions within a radius **in propagation order** (a breadth-first walk from the centre), and assigns each one the tick at which it should be processed, through an easing curve:

```java
private List<PropagationHelper.PropagationEntry> pending;
private int elapsed;

public void start(BlockPos center) {
    this.pending = PropagationHelper.computeWithPowerEase(center, 12, 30, 1.5);
    this.elapsed = 0;
}

// in a tick event
private void onTick(LivingEntity entity, IAbility ability) {
    if (entity.level().isClientSide() || this.pending == null) return;
    this.elapsed++;
    for (PropagationHelper.PropagationEntry entry : this.pending) {
        if (entry.tickToApply == this.elapsed) {
            // process entry.pos
        }
    }
    if (this.elapsed >= 30) this.pending = null;
}
```

| Method | Shape | Easing |
|---|---|---|
| `computeWithPowerEase(center, radius, totalTicks, power)` | sphere | `fraction ^ power`: above `1` starts slow and speeds up |
| `computeWithPowerEase(..., innerSafeRadiusSq)` | sphere, with a hole at the centre | same |
| `computePropagationEntries(center, radius, totalTicks, easing, useSphere, neighbours[, innerSafeRadiusSq])` | sphere or cube | any function from `[0, 1]` to `[0, 1]` |

- Ticks run from `1` to `totalTicks`, never `0`.
- `innerSafeRadiusSq` is a **squared** radius left untouched around the centre: `-1` includes the centre, `0` excludes only the centre block.
- `PropagationHelper.NEI_6` (the six face neighbours) is the default neighbourhood.

!!! tip "Use it to stay under the tick budget"
    Converting or destroying thousands of blocks in one tick stalls the server. Spreading the same work over 20 to 30 ticks is invisible to players and reads as a wave.

## `BlockPlacingHelper`

A plain list of positions an ability placed, so it can take them down later: `addBlockPos`, `getBlockList`, `clear`. `StompAbility` gives its subclasses one.

## `BlockHighlightManager`

Outlines a set of block positions **through terrain**, for **one player**, for a while. Made for detection techniques: ores, containers, hidden things.

```java
UUID group = UUID.nameUUIDFromBytes(("my_scan:" + player.getUUID()).getBytes());
BlockHighlightManager.show(player, group, positions, 0xA0FFD700, 160);   // 8 seconds
```

- Positions are sent as a **group** keyed by a UUID you choose, with one colour (ARGB, alpha honoured). Several colours means several groups.
- Sending the same group again **replaces** it, so a re-scan needs no clear first.
- A group **expires on its own** on the client after its duration. `BlockHighlightManager.clear(player, group)` ends it early.
- At most `MAX_POSITIONS` (512) positions per group; extra ones are dropped. Sort by what matters and send the best.
- Highlights live on the client only, are never saved, and are cleared by the library when the world unloads.

!!! info "Why not particles or glowing entities"
    Particles are hidden by terrain, which defeats a detection technique. Glowing marker entities show through walls, but a scan of any useful radius would mean hundreds of real entities per player to clean up.

## `BlockOverlayManager`

The client-side store behind `ZoneAbility`'s block overlay, which shades the blocks inside a zone. You do not normally call it: set `enableBlockOverlay = true` and `overlayArgb` on a [zone](../ability-base-classes/zones.md), and the library sends, renders and clears the overlay, including on disconnect. Players can turn the overlay off with `overlayEnabled` in `akumalib-client.toml`.

It also exposes `isSolidForOverlay` and `isFullSolidForCulling`, the block tests the overlay renderer uses.

## `EntityHighlights`

*Since 3.1.0.* An entity outlined through walls for one player only - a mind read, a scent followed - where vanilla's glowing effect shows it to everybody.

From the server, for a while:

```java
EntityHighlights.mark(user, target, 600);   // 30 seconds, for the user only
```

On the client, for whatever a vision sees right now: a provider asked every tick, registered once (a static block in a client class does):

```java
ClientEntityHighlights.addProvider(player -> visionIsOn(player)
        ? player.level().getEntitiesOfClass(LivingEntity.class, player.getBoundingBox().inflate(40), e -> e != player)
        : List.of());
```

Marks and providers add up; only what AkumaLib lit is ever put out. It is vanilla's outline, set on this client's copy of the entity every tick through `Entity#setSharedFlag` (glowing is flag 6) - `setGlowingTag` does nothing on a client.

!!! warning "Both sides need 3.1.0"
    `mark` is a packet: the network protocol went to 5 with it.

## Counting and finding blocks of a kind

For a power that feeds on what is under its user (stone, gold, plants):

- `BlockScan.countAround(entity, tag, radius, enough)` counts the blocks of a tag round and under his feet and stops at `enough`.
- `BlockScan.nearest(level, point, radius, tag)` gives the centre of the nearest one, or null.


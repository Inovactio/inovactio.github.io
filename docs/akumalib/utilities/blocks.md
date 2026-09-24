# Blocks

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

# Worldgen and dimensions

What an addon needs to shape terrain of its own, or a whole dimension: the registers for its codecs and types, and four tools for the questions worldgen code keeps running into.

## The registers

Your `AkumaRegistry` carries a deferred register for each of these, like every other kind of entry. Put every one you fill on the mod event bus, as in [Getting started](../getting-started.md#3-attach-the-deferred-registers-to-the-event-bus).

| Register | For |
|---|---|
| `FLUIDS`, `FLUID_TYPES` | fluids, and the type that says how one behaves (swimming, boats, fog) |
| `DENSITY_FUNCTION_TYPES`, `BIOME_SOURCES`, `CHUNK_GENERATORS`, `FEATURES`, `PLACEMENT_MODIFIER_TYPES` | terrain of your own: their codecs and types, the instances coming from datagen |
| `STRUCTURE_TYPES`, `STRUCTURE_PLACEMENT_TYPES`, `STRUCTURE_PIECE_TYPES` | structures; a piece type left unregistered loses its structure on reload |

## The tools

<div class="grid cards" markdown>

-   :material-grid:{ .lg .middle } **[Cell grids](../utilities/cells.md)**

    ---

    `AkumaCells`: a deterministic grid of jittered cells, so several readers agree on where a feature is.

-   :material-earth-arrow-right:{ .lg .middle } **[Asking the overworld](../utilities/overworld-lookup.md)**

    ---

    `OverworldLookup`: the overworld's biome and seed from another dimension's worldgen thread, without loading a chunk.

-   :material-rocket-launch-outline:{ .lg .middle } **[Dimension travel](../utilities/dimension-travel.md)**

    ---

    `AkumaDimensionTravel`: send a body, its vehicle and its riders to another dimension with a velocity that survives.

-   :material-puzzle-outline:{ .lg .middle } **[Jigsaw pools](../utilities/jigsaw.md)**

    ---

    `AkumaJigsaw`: add pieces (features, templates) to another mod's jigsaw pools.

</div>

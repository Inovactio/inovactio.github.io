# Cell grids

`AkumaCells` is a deterministic grid of jittered cells, each of which may hold a round feature: the shape behind "an island here, and nothing for a few thousand blocks".

```java
private static final AkumaCells ISLANDS = new AkumaCells(768, 0.25F, 96, 220);

double strength = ISLANDS.mask(worldSeed, x, z);          // 1 at a centre, 0 outside
AkumaCells.Cell cell = ISLANDS.cellAt(worldSeed, x, z);   // which cell, and where its centre landed
```

The constructor takes the grid's pitch in blocks, the share of cells that hold anything, and the smallest and largest feature radius.

Everything is a pure computation — no world, no registries — so it is safe on a worldgen thread and gives the same answer every time for a given seed. The only thing a grid holds is, for each thread, the last cells that thread rolled: see [the nine-cell scan](#the-nine-cell-scan).

## Why it exists

To be **one source of truth read from several places**. A structure placement in the overworld, a density function in another dimension and a biome source can all ask the same grid, from the same world seed, and agree. That is what keeps a geyser under the island it leads to.

Two independent placements always drift apart, and the symptom is the worst kind: everything looks right in the small, and one in ten features is wrong somewhere nobody has walked yet.

## What the caller adds

The grid knows about position, radius and whether a cell is active. It deliberately knows nothing about what the feature *is*.

`Cell.random(salt)` is there for that: it derives a `RandomSource` from the cell's own seed, salted, so the caller can roll a kind, a variant or a weighting without disturbing the grid's numbers.

```java
AkumaCells.Cell cell = ISLANDS.cellAt(worldSeed, x, z);
Kind kind = cell.random(1).nextFloat() < 0.7F ? Kind.LOW : Kind.HIGH;
```

## Features of different sizes

The constructor rolls one radius range for every cell. When one kind of feature should be larger than the rest, give the grid a `RadiusRule`: it receives each cell as rolled and returns the radius to use.

```java
private static final AkumaCells ISLANDS = new AkumaCells(704, 0.30F, 96, 220, 0.30D, 150.0D)
        .withRadiusRule(cell -> kindOf(cell) == Kind.HIGH ? 300 + cell.random(7).nextInt(41) : cell.radius());
```

The rule runs inside `cell()`, so `mask`, `featureAt` and `blend` all read the same radius. Resizing a feature in the caller, after the grid has answered, would give a second geometry the grid knows nothing about.

⚠️ A rule must be a pure function of the cell, like a filter, and its radii are held to the same nine-cell inequality as the constructor's. The grid cannot check that for a rule.

## Rejecting a cell

`Filter` vetoes a cell by where its centre landed — "only over ocean", "only above this altitude":

```java
double strength = ISLANDS.mask(worldSeed, x, z, (cx, cz) -> isOcean(cx, cz));
```

The grid applies it consistently, so a rejected cell is absent from `mask`, `featureAt` and the placement alike, and the several readers stay in agreement.

⚠️ **A filter must be a pure function of the position**, and give the same answer for the whole life of a world. One that consults something mutable — a loaded chunk, a config reloaded at runtime — makes the grid disagree with itself between two readers, which is the one failure this class exists to prevent.

## The nine-cell scan

⚠️ `mask` and `featureAt` read the **nine cells around a position, not only the one containing it**, and a reimplementation that reads one cell will look correct for a long time.

A centre is jittered by up to a quarter of the cell, and then carries a radius on top, so a feature routinely spills into its neighbours: with a pitch of 768 and radii up to 220, by as much as 28 blocks. Reading only the containing cell slices every such feature off flat along the cell border — in a landscape, a cliff in a perfectly straight line — and no test that samples a centre will ever show it.

Where two features overlap, the stronger wins rather than the two adding up. A sum would exceed 1 and raise a ridge exactly where they meet.

**The nine cells are kept.** Generation asks `mask`, `featureAt` and `blend` for every column of a chunk, and a chunk's columns all share their nine cells. Each thread keeps the last 64 cells it rolled, for each grid, so a cell is rolled once and read thereafter: on a profile of Sky Island's generation, rolling them again for every column was 6 to 12 % of a chunk's time, and keeping them took 13 % off it. Nothing to do on the caller's side — and one more reason a [radius rule](#features-of-different-sizes) must be a pure function of the cell: its answer is kept with the cell.

## The cell seed

`AkumaCells.cellSeed(worldSeed, cx, cz)` is `worldSeed ^ (cx * 341873128712L + cz * 132897987541L)`. The multipliers are vanilla's own, from `RandomSpreadStructurePlacement`: they are chosen so neighbouring cells do not produce visibly related values, which a plain `cx * 31 + cz` very much does.

⚠️ Every roll happens for every cell, active or not, and always in the same order. Skipping the position and radius rolls for an inactive cell would make a cell's numbers depend on its neighbours' outcomes, and the grid would stop being addressable at random — which is the whole point of it.

# Asking the overworld

`OverworldLookup` answers a question about the overworld from anywhere — including from a worldgen thread of another dimension.

```java
if (OverworldLookup.is(x, z, BiomeTags.IS_OCEAN)) { ... }

double howMuchSea = OverworldLookup.coverage(x, z, BiomeTags.IS_OCEAN);  // 0..1, smoothed
long seed = OverworldLookup.seed();                                      // every dimension shares it
```

A mod whose dimension is shaped by what the overworld looks like underneath it — sky islands only over the sea, a mirror world that follows the coastlines — needs this, and the naive version loads overworld chunks from a worldgen thread, which deadlocks.

## Why it is safe

`BiomeSource#getNoiseBiome` is a **pure computation** over the overworld's noise. Given its `Climate.Sampler` it answers "what biome would be here" without reading, generating or loading a single chunk.

That is also what makes it compatible with **Terralith, TerraBlender and Tectonic by construction**: it goes through whatever biome source the overworld actually has, not through a copy of vanilla's rules. Any of them whose oceans carry `minecraft:is_ocean` is supported without a line of compatibility code.

## What it returns

| Method | Answer |
|---|---|
| `overworld()` | the `ServerLevel`, or `null` when no server is running |
| `seed()` | the world seed, or `0` with no server — which in practice means datagen |
| `biomeAt(x, z)` | the biome at the overworld's sea level, or `null` |
| `is(x, z, tag)` | whether that biome carries the tag |
| `coverage(x, z, tag)` | how much of the 3×3 neighbourhood of quart cells does, from 0 to 1 |

`coverage` is the one to multiply by. A yes-or-no answer used as a mask gives a vertical wall at every coastline; a smoothed one gives a slope a few blocks wide. It costs nine samples, which is affordable once per column and ruinous once per block — **cache it per column at the call site.**

## The three traps it exists to hold

⚠️ **Resolved lazily, never in a constructor and never in a codec.** Registries load long before any level exists, and a density function's codec runs while the datapack is being read. A field initialised at construction is null for the whole life of the game.

⚠️ **Cleared when the server stops.** A single-player client can open one world, quit to the title and open another inside the same process. Without the reset the second world is asked about the first one's terrain.

⚠️ **The cache is per thread, and stamped with the world it was filled for.** Several worldgen threads call this at once, so a shared map would need locking on a path that runs for every column of every chunk. And clearing only the stopping thread's cache would leave every other worldgen thread holding the old world's answers — those threads outlive a world, so the next world would be shaped by the last one's coastlines, in a way that looks like ordinary worldgen and is never traced back. Each cache checks a generation counter and empties itself the first time it is used in a new world.

## Resolution

The quart: one answer per 4×4 blocks, which is the resolution biomes are stored at anyway. Sampled at the overworld's sea level, y = 64.

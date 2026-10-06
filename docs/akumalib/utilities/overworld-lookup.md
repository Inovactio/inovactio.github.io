# Asking the overworld

`OverworldLookup` answers a question about the overworld from anywhere — including from a worldgen thread of another dimension.

```java
if (OverworldLookup.is(x, z, BiomeTags.IS_OCEAN)) { ... }

double howMuchSea = OverworldLookup.coverage(x, z, BiomeTags.IS_OCEAN);  // 0..1, smoothed
long seed = OverworldLookup.seed();                                      // every dimension shares it
```

A mod whose dimension is shaped by what the overworld looks like underneath it — sky islands only over the sea, a mirror world that follows the coastlines — needs this, and the naive version loads overworld chunks from a worldgen thread, which deadlocks.

## Why it is safe

`BiomeSource#getNoiseBiome` is a computation over the overworld's noise. Given its `Climate.Sampler` it answers "what biome would be here" without reading, generating or loading a single chunk.

That is also what makes it compatible with **Terralith, TerraBlender and Tectonic by construction**: it goes through whatever biome source the overworld actually has, not through a copy of vanilla's rules. Any of them whose oceans carry `minecraft:is_ocean` is supported without a line of compatibility code.

## The same answer on every thread

⚠️ **The game's biome search remembers its last answer, per thread, and keeps it where two biomes are equally near.** A column whose climate falls exactly on the line two biomes share — where the ocean ends and the shore begins, where the deep ocean ends and the ocean begins — is whichever of the two the thread answered last. Left alone, such a column is an ocean to one worldgen thread and a shore to another.

It is rare: on one seed, 197 quart columns of 641 601 over a square 3 204 blocks wide, 83 of them for `minecraft:is_ocean` and 27 for `minecraft:is_deep_ocean`. But a terrain shaped by "is the overworld an ocean here" is then not quite a function of the seed.

`OverworldLookup` reads through `SteadyBiomes`, which gives the search the same last answer before each read. Which of the two biomes a tied column gets is still the game's choice; every thread is told the same one.

`SteadyBiomes` is there for your own searches too:

```java
Holder<Biome> biome = SteadyBiomes.at(level, pos);                             // as the level reads it; server thread
Holder<Biome> same = SteadyBiomes.at(source, sampler, quartX, quartY, quartZ); // no chunk touched; any thread
```

Use it wherever a search reads the biomes of columns that are not loaded and something else reads them again afterwards — a place found "at sea" must still be at sea for whoever checks it a line later. It costs one more search per read: keep a cache on a hot path, as `OverworldLookup` does. A loaded column is read off its chunk and needs none of this.

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

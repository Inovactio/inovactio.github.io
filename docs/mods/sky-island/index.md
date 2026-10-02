---
# Hidden search keywords: the search weighs them heavily; the page does not show them.
tags:
  - skypiea
  - sky island
  - dimension
---

# Sky Island

![](../../assets/icons/sky-island.png){ .mod-icon }

**Mine Mine no Mi: Sky Island** adds **Skypiea as a dimension of its own** to [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod): the sea of clouds, the Angel Islands and their Skypiean villages, the Upper Yards where the City of Gold was lost, and Weatheria, the weather scientists' floating island. The way up is a **Knock-Up Stream** erupting from the floor of the deep ocean.

| | |
|---|---|
| Version documented | **0.3.0** (beta) |
| Mod id | `inosky` |
| Download | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-sky-island) · [0.3.0](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-sky-island/files/9038332) · [changelog](changelog.md) |

!!! warning "A beta"
    Worlds are generated from this version's rules. A later version may change what stands in chunks that have not been explored yet.

## Requirements

| Mod | Version |
|---|---|
| Minecraft | 1.20.1 |
| Forge | 47 or later |
| [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod) | 0.11.5 |
| [AkumaLib](../../akumalib/index.md) | 4.0.0 or later |

Client **and** server.

!!! note "The base mod's sky islands"
    Mine Mine no Mi's own sky islands no longer generate in the overworld: Skypiea takes their place. Those already generated in an existing world stay where they are.

## The dimension

| | |
|---|---|
| **[Getting there and back](getting-there.md)** | the Knock-Up Stream, the arrival, falling back to the overworld |
| **[Getting around](getting-around.md)** | the waver, the Milky Roads between the islands |
| **[Angel Islands](angel-islands.md)** | islands of cloud: Skypiean villages, the White Berets, Angel Beach, Heaven's Gate |
| **[Upper Yards](upper-yards.md)** | the great islands of earth: the Giant Jack, Shandora, the Shandias and their camps |
| **[Weatheria](weatheria.md)** | the weather scientists' floating island: Haredas, the scientists, weather for sale |
| **[Wildlife](wildlife.md)** | the South Bird, two flying mounts, the Cloud Fox and the Giant Dog; the fish of the cloud sea; the three predators of the Upper Yards |
| **[Blocks](blocks.md)** | the clouds, the village blocks and the weather cloud in 3D, with their recipes |
| **[Configuration](configuration.md)** | the geyser's rhythm, the fall back, the dials; the `/geyser` command; the builders' tools |

Skypiea sits **above the overworld's deep oceans** and nowhere else: its islands and its sea of clouds only exist where the overworld below is deep ocean. **The cloud sea** is a sea you swim in and sail on, with a swell; boats float on it. It is **translucent**: you see the fish under you. A **fishing rod** works in it, and an empty bucket takes a block of it away (the **Sea Cloud Bucket**).

## Compatibility

- **Worldgen mods**: Skypiea reads the overworld's own biomes to find the deep oceans (`minecraft:is_deep_ocean`) and changes nothing in the overworld beyond the geyser. Checked with **Terralith** and with **TerraBlender + Biomes O' Plenty**: geysers and islands appear as usual.
- **Fishing mods**: a fishing rod works in the cloud sea, and what is caught is left to the game's own table or to any mod that listens to the fishing event. The cloud sea is still not water: it does not weaken a Devil Fruit user.
- **Biome tags**, for other mods and datapacks: `inosky:is_skypiea`, `inosky:is_cloud_sea`, `inosky:is_angel_island`, `inosky:is_upper_yard`.
- **[Valkyrien Skies 2](https://www.curseforge.com/minecraft/mc-mods/valkyrien-skies)** (optional, 2.4.11 or later): a ship sailed into an erupting Knock-Up Stream rises to Skypiea **with its crew**, lands on open cloud sea and floats on it. A ship that falls out of Skypiea goes back to the overworld with its crew. Anybody seated at the helm arrives standing on the deck. Sky Island never requires Valkyrien Skies.

---
# Hidden search keywords: the search weighs them heavily; the page does not show them.
tags:
  - impel down
  - prison
  - jail
  - dimension
---

# Impel Down

![](../../assets/icons/impel-down.png){ .mod-icon }

**Mine Mine no Mi: Impel Down** adds **the great underwater prison of the World Government** to [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod). Its prisons stand in the deep oceans, each behind a Gate of Justice. Walk in through the door and go down the seven levels of its tower, from the offices of level 0 to the Eternal Hell. Or lose a fight to the Marines as a pirate, and wake up in a cell.

| | |
|---|---|
| Version documented | **0.1.0** (beta) |
| Mod id | `inoimpel` |
| Download | [CurseForge](https://www.curseforge.com/projects/1812558) · [changelog](changelog.md) |
| Languages | English |

!!! warning "Beta"
    This is the first version. Things may still change and bugs are likely: please report them.

## Requirements

| Mod | Version |
|---|---|
| Minecraft | 1.20.1 |
| Forge | **47.4.2** or later |
| [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod) | **0.11.6** or later |
| [AkumaLib](../../akumalib/index.md) | **6.8.1** or later |
| [Race Race no Mi](../race-race-no-mi/index.md) | optional: prisoners of other races, giants included |

Client **and** server.

## The prison

| | |
|---|---|
| **[Getting there](getting-there.md)** | the prisons in the deep ocean, the Gate of Justice, the door, the way back out |
| **[The tower](the-tower.md)** | the seven levels, from the offices of level 0 to the Eternal Hell; the ways down, the lift, the hardships of each level, the alarm |
| **[The staff](staff.md)** | jailers, riflemen, hooded guards, head jailers, the chief of the guard and the warden: their strength, their weapons and techniques, their uniforms |
| **[The beasts](beasts.md)** | the Blugori, the venomous spiders, the Basilisk, the Manticores, the puzzle scorpions, the Sphinx, the four demon guards, the white wolves |
| **[The prisoners](prisoners.md)** | life in the cells, breakouts, their Devil Fruits, their races and the giants |
| **[Keys, lifts and desks](keys.md)** | the cell keys of each level, the master key and the control desk, the lift key and the staff lift |
| **[Jailed](jailed.md)** | the arrest, giving yourself up, your sentence, your gear in the depot, and the ways to escape |
| **[Blocks and items](blocks-and-items.md)** | the tower's blocks, the uniforms, the hidden hook; the loot |
| **[Advancements](advancements.md)** | the Impel Down tab, from the gate to the warden |
| **[Configuration](configuration.md)** | how many prisons, the tower's mending, the guards' strength, the alarm, the arrest; the `/impel` command |

## The tower mends itself

A tower does not stay broken. **30 minutes** after the last player leaves it, it is set back as it was built: walls, doors, chests, guards and prisoners. What you placed in it **drops as items**; what you broke comes back. Keys taken before stop working: the locks were changed. Details on [the tower's page](the-tower.md#the-tower-mends-itself).

## Compatibility

- **[Race Race no Mi](../race-race-no-mi/index.md)** (optional): with it, some prisoners are of other races (fishmen, Skypieans, minks, cyborgs...), more often the deeper, and the **giants' cells** of level 6 hold giants. Without it every prisoner is human and the giants' cells stay empty. See [the prisoners](prisoners.md#races-and-giants).
- **[Missing Missing no Mi](../missing-missing-no-mi/index.md)**: Impel Bricks count as stone for the Ishi Ishi no Mi.
- **Fruits that go through blocks** (Nuke Nuke, the Dachshund, Shima Shima...): a player found outside a tower's walls is put back inside.
- **The base mod's Marines** fight on the jailers' side, and its Marines, Pacifistas and bounty hunters can [arrest](jailed.md) a pirate instead of killing him.
- **Other mods' structures** (the base mod's ships, vanilla's ruins, a worldgen mod's buildings) never generate inside a prison or its Gate of Justice.
- **Datapacks**: where prisons may stand (the biome tag `inoimpel:gate_biomes`, deep oceans by default), the bounties that send a prisoner to each level (`data/inoimpel/arrest/level_bounties.json`) and the prisoners' races per level (`data/inoimpel/prison_races/`) can all be replaced.

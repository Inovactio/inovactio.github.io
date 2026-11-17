# Configuration

Race Race no Mi's settings live in each world's **`<world>/serverconfig/racenomi-server.toml`**, written the first time the world starts. The server sends its values to each player who joins, so the character creator shows what the server allows.

| Setting | Default | What it does |
|---|---|---|
| `giants.giantAreaBlocks` | `true` | A giant breaks and places blocks 3x3x3 (5x5x5 for an Ancient Giant). At `false`, one block at a time, as in precision mode. The zone also follows the base mod's ability griefing setting and protected areas. |
| `giants.giantCouch` | `true` | A giant sleeps on a 3x3 of hay bales or wool. At `false` the couch does nothing, and a giant can sleep in a normal bed. |
| `npcs.npcRaceScale` | `1.0` (0 to 10) | How often the base mod's generic fighters are born of one of this mod's races: each race's chance below is multiplied by it. 2 doubles them, 0 turns it off. |
| `humans.hiddenModifiedHuman` | `DRAW` | The [hidden modified human](modified-humans.md#hidden-modified-human). `DRAW`: the first time a player is a Human, a secret draw makes them one. `CHOICE`: the player picks it in the character creator, as a page of its own. `OFF`: nobody is one (those already awakened stay so). |
| `humans.hiddenModifiedChance` | `0.01` (0 to 1) | The chance of the `DRAW`: 0.01 is 1 Human in 100. |

## Taking a race out of the character creator { #creator }

Since 0.5.0 this is AkumaLib's races data pack, for every race of every mod (`giantsSelectable` and `skyPeopleSelectable` are gone: an old value left in the file is ignored). A player who already has the race keeps it. For example, `data/myserver/akumalib/races/creator.json` in a data pack:

```json
{ "remove": ["racenomi:giant", "racenomi:wotan", "racenomi:sky_people"] }
```

More in AkumaLib's [Races by data pack](../../akumalib/utilities/races-by-datapack.md).

## NPCs of our races { #npcs }

The base mod's generic fighters (grunts, brutes, snipers, captains and notorious pirates; never a boss, a named character, nor an NPC the base mod already made a fishman) may be born of one of this mod's races, once, when they first appear. They get the race's size and look. The chances are a data pack, `data/racenomi/racenomi/npc_races/`, in percent, times `npcRaceScale`; the rest stay men.

| Race | Pirates and others (`default.json`) | Marines (`marine.json`) |
|---|---|---|
| Fishmen: Octopus, Whale Shark, Pufferfish, Hammerhead | 1.5 % each | 0.3 % each |
| Skypiean | 1.25 % | 0.25 % |
| Shandia | 0.75 % | 0.15 % |
| Birkan | 0.5 % | 0.1 % |
| Oni | 0.5 % | 0.1 % |
| Elbaf Giant | 0.5 % | 0.5 % |
| Minks: Cat, Jaguar, Polar Bear, Bull | 0.5 % each | 0.1 % each |
| Buccaneer | 0.25 % | none |
| Broad and Stout Buccaneer | 0.15 % each | none |
| Great Buccaneer | 0.1 % | none |
| Tontatta | 0.25 % | 0.05 % |
| Mermaid | 0.2 % | 0.04 % |
| Great Merfolk | 0.1 % | 0.02 % |
| Lunarian | 0.05 % | none |
| Wotan, each of the seven species | 0.02 % each | none |
| Ancient Giant | 0.02 % | none |

In all, about 13 % of the pirates and others, and about 2.8 % of the Marines. A data pack file with a `factions` list applies to those factions only; addons that give their NPCs a race (Impel Down) use their own chances.

The size of each race, the creator's size slider and how far the size reaches (damage, knockback in PvP...) are AkumaLib's settings: section `sizeSystem` of `akumalib-server.toml`.

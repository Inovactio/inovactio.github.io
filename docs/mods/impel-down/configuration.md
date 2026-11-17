---
# Hidden search keywords: the search weighs them heavily; the page does not show them.
tags:
  - config
  - configuration
  - settings
  - server
  - command
  - commands
  - operator
---

# Configuration

Impel Down's settings are **per world**, in **`<world>/serverconfig/inoimpel-server.toml`**, created the first time the world is loaded with the mod.

!!! warning "Edit it with the world closed"
    Forge rewrites a world's server config when the world unloads: a change made while the game is running is lost.

## `gates`

Where the prisons are.

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether new prisons are built in the overworld. Off: no new prison, the doors of those already built do nothing, and **nobody is arrested**. |
| `cellSize` | `3072` | The size of the grid's squares, in blocks: at most one prison per square. From `512` to `16384`. |
| `activeChance` | `0.5` | The share of the squares that hold a prison. |

!!! note "Fixed when the world is made"
    A world keeps the grid it was started with (`cellSize`, `activeChance`): changing them later does nothing but write a warning in the log, so that prisons already built stay where they are.

## `tower`

| Setting | Default | What it does |
|---|---|---|
| `mendAfterMinutes` | `30` | Minutes with no player in a tower before it [mends](the-tower.md#the-tower-mends-itself). |
| `mendIdleMinutes` | `10` | A player who has not moved for this long no longer holds the mending off. |
| `mendCapHours` | `3` | Hours players inside can hold the mending off; then it comes anyway. |
| `postRadius` | `48` | A guards' post puts its people down when a player is this close. |
| `fruitBoxes` | `1.0` | The chances of a Devil Fruit box in the tower's chests, times this. `0` means no box at all, not even level 6's. |
| `prisonerFruitChances` | `0.003, 0.015, 0.05, 0.08, 0.15, 0.25` | The chance that a prisoner holds a Devil Fruit, by level 1 to 6. |
| `prisonerFruitTiers` | levels 1–2 tier 1; 3–4 mostly tier 2; 5–6 mostly tier 3 | The weights of the three fruit tiers, one row per level. |
| `escapeBounty` | `1000, 3000, 6000, 10000, 20000, 35000` | The bounty an escaped player gains, by the level of his cell; also the least bounty of a Marine who [loots the prison](jailed.md#marines-and-bounty-hunters-who-loot). |
| `jailers` | [the table on the staff page](staff.md#jailers-riflemen-and-hooded-guards) | One row per level, 0 to 6: the jailers' Doriki (from, to), blow, armour, haki and share of hoods. |
| `hoodDoriki` | `0.3` | How much more Doriki a hooded guard has: 30 %. |
| `chiefHealth` | `3.5, 3.0, 8.0` | The health of the head jailers, the chief of the guard and the warden, as times Doriki / 40. |
| `jailerHaki` | from none on level 0 to 50 % / 60 % on level 6 | The share of jailers using Busoshoku Haki, uniform and hood, per level. |
| `bosses` | one row per level | Each level's boss: Doriki, blow, armour, haki. Used by the Sphinx (level 2), the chief of the guard (row 5) and the warden (row 6). |
| `beasts` | one row per level | Each level's great beast. Used by the Basilisk (level 2) and the demon guards (level 4). |

## `hardships`

| Setting | Default | What it does |
|---|---|---|
| `starvingHunger` | `2.0` | How much faster hunger drains on level 3. |
| `freezingCold` | `1` | How fast the cold of level 5 freezes a player. `0` turns the cold off. |

## `alarm`

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether the surveillance snails see anything at all. |
| `sight` | `12` | How far a snail sees, in blocks. |
| `seconds` | `30` | How long a level's alarm lasts after the intruder was last seen. |

## `arrest`

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether a beaten pirate is jailed here. Off: beaten players die, and AkumaLib's own Marine prison takes those who give themselves up. |
| `pvp` | `true` | Whether players of the Marines and bounty hunters arrest too, not only the Marines NPCs. |
| `confiscate` | `ALL` | What the arrest takes to the depot: `ALL`, `ARMOUR_AND_HOTBAR` or `NONE`. |
| `sentence` | `true` | Whether a jailed player is let out when his time is done. Off: only an escape gets him out. |
| `roundMinutes` | `3` | About how many minutes between two rounds of a jailer past a jailed player's bars. |
| `riotMinutes` | `20` | About how many minutes of a jailed player's time between two riots. `0`: no riots. |
| `hiddenToolChance` | `0.1` | The chance that a jailed player finds a hidden hook in his cell. |
| `toolMinutes` | `3` | Minutes the hook takes to force a door. |

## Data

A datapack can replace:

- `data/inoimpel/tags/worldgen/biome/gate_biomes.json`: where prisons may stand (deep oceans);
- `data/inoimpel/arrest/level_bounties.json`: the bounties that send a prisoner to levels 2 to 6 (`15000, 50000, 75000, 100000, 250000`);
- `data/inoimpel/prison_races/level1.json` to `level6.json`: the [prisoners' races](prisoners.md#races-and-giants) per level.

## The `/impel` command

For operators (permission level 2), standing in a tower:

| Command | What it does |
|---|---|
| `/impel goto <level>` | To that level's lift landing, 0 to 6. |
| `/impel key cell <level>` | A cell key of that level, for this prison. |
| `/impel key master` | The Master Key, for this prison. |
| `/impel key lift` | The Lift Key, for this prison. |
| `/impel mend` | Mends the tower now. |
| `/impel info` | The prison, the level and its posts, freed prisoners, the alarm, and when the tower last mended. |

A key given this way works until the tower's next mending. To jail a player, see [`/akumalib faction prison send`](jailed.md#sent-by-an-operator).

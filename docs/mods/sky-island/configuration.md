# Configuration

Sky Island's settings are **per world**, in **`<world>/serverconfig/inosky-server.toml`**, created the first time the world is loaded with the mod. A save carries its own geyser rhythm.

!!! warning "Edit it with the world closed"
    Forge rewrites a world's server config when the world unloads: a change made while the game is running is lost. To see an eruption without waiting, use `/geyser now` instead.

## `geyser`

The Knock-Up Stream's rhythm. 20 ticks make a second.

| Setting | Default | What it does |
|---|---|---|
| `cycle_ticks` | `12000` (10 minutes) | Ticks between one eruption starting and the next. |
| `eruption_ticks` | `1800` (90 seconds) | How long an eruption lasts. An eruption too short to carry somebody from the sea floor to the top is lengthened. |
| `charge_ticks` | `600` (30 seconds) | The warning before an eruption: bubbles and rumbling. |

## `return`

| Setting | Default | What it does |
|---|---|---|
| `return_y` | `-32` | Below this height in Skypiea, a body is given back to the overworld, above the same place. From `-64` to `40`. |

## `angel_beach`

The dials the sea leaves on the shore of the Angel Islands.

| Setting | Default | What it does |
|---|---|---|
| `dial_chance` | `2000` | One random tick in this many, on a beach surface, lays a dial. `0` turns it off. |
| `dial_cap` | `2` | The most dials a stretch of beach (8 blocks around) holds at once. |

## For server builders

### The Knock-Up Stream block

A geyser you place by hand: **creative only** (the Skypiea tab), no recipe, and it cannot be mined or blown up in survival. Placed on the sea floor or on dry land, it follows the geysers' rhythm, answers `/geyser` and `/geyser now`, and sends whatever stands in its column to Skypiea **at its own X and Z**. The arrival is yours to build there.

### `builders`

| Setting | Default | What it does |
|---|---|---|
| `empty_skypiea` | `false` | `true` gives a Skypiea with **nothing in it**: no cloud sea, no island, no village, no animal, and no Knock-Up Stream in the overworld. The sky and the fall back to the overworld stay. Only chunks generated after the change follow it: set it before the world is first opened (in `defaultconfigs/inosky-server.toml`), or with the server stopped. |

## Commands

| Command | Permission | What it does |
|---|---|---|
| `/geyser` | operator | where the nearest geyser within 64 blocks is, what it is doing and when it erupts |
| `/geyser now` | operator | makes that geyser erupt at once |

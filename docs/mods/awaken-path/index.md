# Awaken Path

**Mine Mine no Mi: Awaken Path** gives [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod) a **survival progression for Devil Fruit awakenings**. A player's fruit awakens on its own once they are strong enough and have kept it long enough; no command needed.

| | |
|---|---|
| Version documented | **2.1.0** |
| Mod id | `mineminenomiawakenpath` |
| Download | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-awaken-path) |

It adds no abilities of its own: it decides **when** a fruit awakens. What an awakened fruit can do comes from the base mod and from addons such as [Awaken Awaken no Mi](../awaken-awaken-no-mi/index.md).

## Requirements

| Mod | Version |
|---|---|
| Minecraft | 1.20.1 |
| Forge | 47.4.18 or later |
| [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod) | 0.11.x |

AkumaLib is **not** needed.

## How a fruit awakens

With the default settings, a player's fruit awakens once **both** conditions hold:

1. **Doriki**: the player has reached the base mod's maximum Doriki.
2. **Time with the fruit**: the player has spent **one real day** (1,728,000 ticks) **online** with their current fruit. Time spent logged out does not count.

The check runs whenever the player gains Doriki, eats a fruit or logs in, and once a minute while they play. When the fruit awakens, the player sees an **Awakening** title, hears a sound and is surrounded by particles.

!!! info "The time counter follows the fruit"
    The counter starts at zero when a fruit is eaten, is kept through death, and is cleared when the player loses their fruit.

!!! note "Awakenings are switched on for you"
    The base mod has an *Enable Awakenings* option, off by default. Awaken Path forces it on unless you turn off its **Force Enable Awakenings** setting.

## Configuration

Settings live in `config/mineminenomiawakenpath-common.toml`:

| Section | Setting | Default | What it does |
|---|---|---|---|
| Unlock | Unlock with Doriki | `true` | Whether the Doriki condition applies. |
| Unlock | Doriki Threshold | `-1` | Doriki required. `-1` means the base mod's maximum Doriki. |
| Unlock | Time With Fruit Threshold | `1728000` (1 day) | Ticks a player must spend online with their fruit. `-1` removes this condition. |
| Unlock | Force Enable Awakenings | `true` | Forces the base mod's *Enable Awakenings* option on. |
| Effects | Awakening Sound | `true` | Play a sound when a fruit awakens. |
| Effects | Awakening Title | `true` | Show the *Awakening* title on screen. |
| Effects | Awakening Particles | `true` | Spawn particles around the player. |

Time is counted in ticks: **72,000 per hour**, **1,728,000 per day**. If both *Unlock with Doriki* is `false` and the time threshold is `-1`, no fruit awakens through this mod.

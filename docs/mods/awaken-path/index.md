---
# Hidden search keywords: the search weighs them heavily; the page does not show them.
tags:
  - doriki
  - awakening
  - awaken
---

# Awaken Path

![](../../assets/icons/awaken-path.png){ .mod-icon }

**Mine Mine no Mi: Awaken Path** gives [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod) a **survival progression for Devil Fruit awakenings**. A player's fruit awakens on its own once they are strong enough and have kept it long enough; no command needed.

| | |
|---|---|
| Version documented | **2.3.0** |
| Mod id | `mineminenomiawakenpath` |
| Languages | English and French, following the game's language |
| Download | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-awaken-path) |
| Changelog | [Every release](changelog.md) |

It adds no abilities of its own: it decides **when** a fruit awakens. What an awakened fruit can do comes from the base mod and from addons such as [Awaken Awaken no Mi](../awaken-awaken-no-mi/index.md), whose awakened abilities unlock the moment the fruit awakens.

## Requirements

| Mod | Version |
|---|---|
| Minecraft | 1.20.1 |
| Forge | 47.4.18 or later |
| [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod) | 0.11.5 |
| [AkumaLib](../../akumalib/index.md) | 4.0.0 or later |

Both are needed since 2.3.0, on the client and on the server.

## How a fruit awakens

With the default settings, a player's fruit awakens once **both** conditions hold:

| Condition | Default | Details |
|---|---|---|
| **Doriki** | the base mod's maximum Doriki | The base mod's *Doriki Limit* option, **10,000** by default. A fixed threshold can be set instead. |
| **Time with the fruit** | **one real day** (1,728,000 ticks) | Only time spent **online and playing** with the current fruit counts. |

Each condition can be switched off in the [configuration](configuration.md). With only one of them on, that one alone decides; with both off, no fruit awakens through this mod.

### When it is checked

The mod checks a player whenever they **gain Doriki**, **eat a Devil Fruit** or **log in**, and **once a minute** while they play. A fruit that is already awakened is not checked again.

### The time counter

- It starts at **zero when a fruit is eaten**.
- It is **kept through death and through the End**.
- It **stops while the player is idle**: after 5 minutes without moving or looking around, it waits until they move again.
- A new fruit starts from zero.
- A player who already had a fruit before Awaken Path was installed gets a counter at their next login, **starting from zero**.

## Following your progress

**`/awakenpath`** shows a player their Doriki and their time with the fruit against what is asked, in percent. A chat message also tells them when they reach **50%**, **75%** and **90%** of their awakening.

Operators have five more commands:

| Command | What it does |
|---|---|
| `/awakenpath status <player>` | Shows a player's progress. |
| `/awakenpath time set <player> <ticks>` | Sets a player's time with their fruit. |
| `/awakenpath time add <player> <ticks>` | Adds to it, or takes from it with a negative number. |
| `/awakenpath awaken <player>` | Awakens a player's fruit now, whatever the conditions. |
| `/awakenpath reset <player>` | Removes a player's awakening and puts their time back to zero. |

## The awakening

When a fruit awakens, each part of which can be turned off:

- a **heartbeat** grows faster for three seconds, then the fruit awakens with a sound and a few particles;
- a **shockwave** pushes back everything within 6 blocks, without hurting anyone;
- the **chat** lists the awakened abilities the player just unlocked, or says that the fruit has none yet;
- the player gets the **Awakened** advancement.

The base mod grants the awakened fruit's abilities straight away.

!!! note "Awakenings are switched on for you"
    The base mod has an *Enable Awakenings* option, **off by default**, in each world's `serverconfig/mineminenomi-server.toml`. Awaken Path turns it on, whatever that file says, unless you switch off its **Force Enable Awakenings** setting.

## Configuration

Every setting, its default and the exact file content are on the [Configuration](configuration.md) page.

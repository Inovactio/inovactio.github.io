# InoFruits

![](../../assets/icons/inofruits.png){ .mod-icon }

**InoFruits** adds **brand-new Devil Fruits** to [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod): fruits the base mod does not have, each with its own abilities.

| | |
|---|---|
| Version documented | **3.0.0** |
| Mod id | `inofruits` |
| Download | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/inofruits) |

## What it adds

**28 Devil Fruits**: 4 Logia, 14 Paramecia and 10 Zoan, with their abilities, morphs, projectiles and status effects.

The fruits behave like the base mod's own:

- they **drop from the base mod's Devil Fruit boxes**, each in the box matching its tier, and are drawn as often as a base mod fruit;
- the base mod's **one-fruit-per-world rule** applies to them unchanged;
- they appear in the base mod's **Devil Fruits** creative tab.

## Requirements

| Mod | Version |
|---|---|
| Minecraft | 1.20.1 |
| Forge | 47.4.18 or later |
| [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod) | 0.11.x (built against `1.20.1-0.11.5`) |
| [AkumaLib](../../akumalib/index.md) | **2.4.0 or later** |

## Getting started

1. Install Forge for Minecraft 1.20.1, then put **Mine Mine no Mi**, **AkumaLib** and **InoFruits** in your `mods` folder.
2. Find a fruit in a Devil Fruit box. Wooden, iron and golden boxes each hold the fruits of their tier, listed [below](#fruits).
3. Eat it. Its abilities appear in the base mod's ability menu, grouped under the fruit.

!!! note "Upgrading from before 3.0.0"
    The ferret fruit was renamed **Ita Ita no Mi, Model: Ferret** in 3.0.0. Older saves are remapped automatically: the fruit, its abilities and its forms carry over.

## Configuration

Settings live in `config/inofruits-common.toml`:

| Section | Setting | Default | What it does |
|---|---|---|---|
| `bai_bai_no_mi` | `fukuseiCooldown` | `6000` (5 min) | Cooldown of *Fukusei*, which makes one permanent copy of the held item. The value that most affects a server's economy. |
| `bai_bai_no_mi` | `baiBunshinCooldown` | `2400` (2 min) | Cooldown of *Bai Bunshin*, which spawns three copies of the user for 30 seconds. |
| `bai_bai_no_mi` | `baizoCooldown` | `1800` (90 s) | Cooldown of *Baizo*, which doubles the clones already standing. |
| `bai_bai_no_mi` | `baizoMaxClones` | `8` | Most clones one player may have at once. A server performance limit. |
| `yuge_yuge_no_mi` | `kumoriSuppression` | `60` (3 s) | How long *Kumori* switches off a soaked Devil Fruit user's powers. `0` removes the suppression. |

Values are in ticks (20 ticks = 1 second).

!!! warning "Ship the file to your players"
    The file is not synchronised to clients. The server always enforces its own values, but a player's ability tooltips read *their* copy. A server that changes a cooldown should give its players the same file, or their tooltips will show the defaults.

## Fruits

| Fruit | Type | Box |
|---|---|---|
| **Kaze Kaze no Mi** | Logia | Golden |
| **Shio Shio no Mi** | Logia | Golden |
| **Tsuchi Tsuchi no Mi** | Logia | Golden |
| **Yuge Yuge no Mi** | Logia | Iron |
| **Bai Bai no Mi** | Paramecia | Golden |
| **Gamu Gamu no Mi** | Paramecia | Iron |
| **Hone Hone no Mi** | Paramecia | Iron |
| **Ichi Ichi no Mi** | Paramecia | Iron |
| **Mitsu Mitsu no Mi** | Paramecia | Iron |
| **Suji Suji no Mi** | Paramecia | Iron |
| **Chiku Chiku no Mi** | Paramecia | Wooden |
| **Iro Iro no Mi** | Paramecia | Wooden |
| **Kane Kane no Mi** | Paramecia | Wooden |
| **Kiza Kiza no Mi** | Paramecia | Wooden |
| **Kobo Kobo no Mi** | Paramecia | Wooden |
| **Neji Neji no Mi** | Paramecia | Wooden |
| **Tsuri Tsuri no Mi** | Paramecia | Wooden |
| **Wata Wata no Mi** | Paramecia | Wooden |
| **Ita Ita no Mi, Model: Ferret** | Zoan | Iron |
| **Kero Kero no Mi, Model: Frog** | Zoan | Iron |
| **Mushi Mushi no Mi, Model: Mosquito** | Zoan | Iron |
| **Wani Wani no Mi, Model: Crocodile** | Zoan | Iron |
| **Zuku Zuku no Mi, Model: Owl** | Zoan | Iron |
| **Fugu Fugu no Mi, Model: Pufferfish** | Zoan | Wooden |
| **Isa Isa no Mi, Model: Whale** | Zoan | Wooden |
| **Kani Kani no Mi, Model: Crab** | Zoan | Wooden |
| **Nezu Nezu no Mi, Model: Rat** | Zoan | Wooden |
| **Usa Usa no Mi, Model: Hare** | Zoan | Wooden |

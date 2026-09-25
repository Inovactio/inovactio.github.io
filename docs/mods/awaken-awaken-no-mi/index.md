# Awaken Awaken no Mi

![](../../assets/icons/awaken-awaken-no-mi.png){ .mod-icon }

**Awaken Awaken no Mi** adds **awakenings** to the Devil Fruits of [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod): new abilities, and for Zoan fruits new awakened forms, that a fruit's user gets once their fruit is awakened.

| | |
|---|---|
| Version documented | **2.0.0** |
| Mod id | `awakenawakennomi` |
| Download | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/awaken-awaken-no-mi) |

## What it adds

- **225 awakened abilities across 70 of the base mod's Devil Fruits** (see [Fruits](fruits/index.md)).
- **Awakened Zoan forms**: the awakened version of each supported Zoan's point forms, with their own models and animations.
- **Domains**: area abilities that change the ground around the user, such as *Kenzan World*, *Smooth World* or *Sabaku no Okoku*.
- **BakuMetal gear**: a BakuMetal Ingot and a full set of BakuMetal tools and armour, each with a crafting recipe.
- Custom status effects, particles and sounds for the new abilities.

It adds **no new Devil Fruit**: every ability here belongs to a fruit the base mod already has.

## Requirements

| Mod | Version |
|---|---|
| Minecraft | 1.20.1 |
| Forge | 47.4.18 or later |
| [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod) | 0.11.x (built against `1.20.1-0.11.5`) |
| [AkumaLib](../../akumalib/index.md) | **2.4.0 or later** |

!!! warning "AkumaLib is required"
    AkumaLib is a library: it adds nothing you can see, but this mod is built on it. Without it, Forge stops on its missing-dependency screen. Since 2.0.0, Awaken Awaken no Mi needs AkumaLib **2.4.0 or newer**.

## Getting started

1. Install Forge for Minecraft 1.20.1, then put **Mine Mine no Mi**, **AkumaLib** and **Awaken Awaken no Mi** in your `mods` folder.
2. Eat one of the [supported fruits](fruits/index.md). Its awakened abilities are added to the fruit's kit, but stay **locked**.
3. **Awaken the fruit.** The awakened abilities unlock once the base mod considers your fruit awakened.

!!! info "This mod does not decide when a fruit awakens"
    Awaken Awaken no Mi contains the awakened forms and abilities only. The progression that awakens a fruit lives elsewhere:

    - **In survival**, install [Awaken Path](../awaken-path/index.md). It awakens a player's fruit once they reach a Doriki threshold and have kept the fruit long enough.
    - **Without Awaken Path**, a fruit can only be awakened by a command, or by another addon.

### Awakening with a command

The base mod's `ability` command has an `awaken` option:

```text
/ability awaken [targets]
```

Without `targets`, it applies to the player running it. It needs the command's permission, and the base mod's **Enable Awakenings** option must be on. That option is off by default; [Awaken Path](../awaken-path/index.md) switches it on for you.

!!! warning "It is a toggle"
    Run on a fruit that is already awakened, the command **removes** the awakening.

## Explore the wiki

| Page | What you'll find |
|---|---|
| **[Fruits](fruits/index.md)** | the 70 awakened fruits, one page each, with every ability's description and values |
| **[All abilities](all-abilities.md)** | every ability in one table you can sort and filter: cooldown, charge, hold, damage, range |
| **[Status effects](effects.md)** | the effects the awakenings inflict or grant, and what applies each one |
| **[Items](items.md)** | BakuMetal ingot, tools and armour, with their recipes, and Candy |
| **[Configuration](configuration.md)** | the server settings of `awakenawakennomi-common.toml` |

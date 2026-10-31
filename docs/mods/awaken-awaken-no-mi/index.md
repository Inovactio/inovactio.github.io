# Awaken Awaken no Mi

![](../../assets/icons/awaken-awaken-no-mi.png){ .mod-icon }

**Awaken Awaken no Mi** adds **awakenings** to the Devil Fruits of [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod): new abilities, and for Zoan fruits new awakened forms, that a fruit's user gets once their fruit is awakened.

| | |
|---|---|
| Version documented | **3.0.1** (beta) |
| Mod id | `awakenawakennomi` |
| Download | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/awaken-awaken-no-mi) · [3.0.1](https://www.curseforge.com/minecraft/mc-mods/awaken-awaken-no-mi/files/9380938) |
| Changelog | [Every release](changelog.md) |

!!! danger "Do not use 3.0.0"
    Awaken 3.0.0 crashes the game while it loads, in every launcher, with a mixin error (`@Shadow field model was not located`). Replace that jar with **[3.0.1](https://www.curseforge.com/minecraft/mc-mods/awaken-awaken-no-mi/files/9380938)**: nothing else changes. See the [changelog](changelog.md#v3-0-1).

## What it adds

- **239 awakened abilities across 71 of the base mod's Devil Fruits** (see [Fruits](fruits/index.md)).
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
| [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod) | 0.11.6 or newer (built against `1.20.1-0.11.6`) |
| [AkumaLib](../../akumalib/index.md) | **6.1.0 or later** |

!!! warning "AkumaLib is required"
    AkumaLib is a library: it adds nothing you can see, but this mod is built on it. Without it, Forge stops on its missing-dependency screen. Since 3.0.0, Awaken Awaken no Mi needs AkumaLib **6.1.0 or newer**.

## Your size

Since 3.0.0 awakened abilities follow your size, through [AkumaLib](../../akumalib/size/index.md): a bigger player reaches further, hits harder and throws further. At size 4 that is twice the reach and twice the damage. The figures on these pages are for a body of size 1.

- **At size 1 nothing changes**, and being smaller than a man takes nothing away: you keep a man's numbers.
- **A man in a big form** keeps the 2.4.0 numbers on the awakened abilities of that form: only your own size makes them grow, not the form. Your plain punches and your body (hit reach, strength, attack speed) do follow the size rules of AkumaLib, so they can feel different from 2.4.0.
- **Zones made to cover a whole area keep their size**, whoever uses them: Ice Epoch, Meigo no Jidai, Tenchi Hokai, Sabaku no Okoku, Ever White, Gravity Zone, Smooth World, Inga Samsara, Battlefield Resonance, Resonating World and White Night. The radius written on a zone ability tells the radius at your size.
- **Some blasts grow only up to a limit**: Blast Jump, Funshin, Inga Impact and Bomu Airburst.
- **The tornado of Glittering Storm grows with its user**, and so does the range of Eavesdrop, Iron Constitution, Overflow and Bound Hands.
- **What does not grow**: blocks and effects left behind, and the damage shared by Iron Tether and Sanctuary.

## Getting started

1. Install Forge for Minecraft 1.20.1, then put **Mine Mine no Mi**, **AkumaLib** and **Awaken Awaken no Mi** in your `mods` folder.
2. Eat one of the [supported fruits](fruits/index.md). Its awakened abilities are added to the fruit's kit, but stay **locked**.
3. **Awaken the fruit.** The awakened abilities unlock once the base mod considers your fruit awakened. They have their own tab in the abilities screen, **Awakening**, right after Devil Fruit.

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
| **[Blocks](blocks.md)** | the wax, threads, scrap and other blocks the abilities lay, in 3D |
| **[Configuration](configuration.md)** | the server settings of `awakenawakennomi-common.toml` |

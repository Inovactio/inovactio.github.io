# AkumaLib

![](../assets/icons/akumalib.png){ .mod-icon }

**AkumaLib** is a shared ability framework for [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod) addons, on Minecraft 1.20.1 with Forge.

The base mod gives an addon `Ability` and a set of components. Everything above that has to be written from scratch by each addon, and gets written slightly differently every time: a zone that charges and expands, a wave that converts terrain, a grab that holds its target, a passive that grants attribute bonuses under a condition. AkumaLib is that layer, extracted once and shared.

!!! info "A library, not a content mod"
    AkumaLib registers **no fruits, no abilities and no items** of its own. Installed alone, it does nothing a player can see. It exists so addons can build on it.

## What it provides

| Area | What you get |
|---|---|
| **Registration** | `AkumaRegistry`: every deferred register a Mine Mine no Mi addon needs, bound to your mod id, with the base mod's naming conventions |
| **Ability base classes** | zones, block waves, grabs, dashes, stomps, conditional passives, auras, item producers, transmutation, awakened Zoan forms |
| **Morphs** | `MorphGates` to lock an ability to a form, `MorphStats` for form attributes, and the amplification bus that lets a form upgrade the rest of a kit |
| **Animations** | a base `Animation` class, ready-made poses, and whole-body transforms that also reach full-form Zoan models |
| **Creatures** | `CatchableCreature`: small wandering or flying creatures that flee, take off or attack, wait on perches, spawn on the surface, with rare variants and a data-driven capture; traps |
| **Professions** | a profession registry, per-player XP and levels with data-driven curves, events for XP multipliers, Solo/Crew modes, client sync, a `/profession` command, workstations with level-locked recipes, and XP boost effects |
| **Worldgen and dimensions** | worldgen and fluid registers, `AkumaCells` (a deterministic grid of features every reader agrees on), `OverworldLookup` (the overworld read from another dimension), `AkumaDimensionTravel` (a body, its boat and its rider sent to another dimension), `AkumaJigsaw` |
| **Loot** | automatic injection of your fruits into the base mod's Devil Fruit boxes |
| **Utilities** | Belly and Extol, exclusive effect groups, targeting, i-frame-aware damage helpers, block propagation, idempotent attribute bonuses, size scaling, tooltips |

## Why the classes carry so many warnings

Most of them exist because something shipped broken first. The base classes encode fixes that are easy to get wrong and **invisible when you do**:

- a deferred register that reaches the event bus late fails without a word, and the stack trace names your class rather than the cause;
- a passive attribute bonus applied on transitions survives a reconnect and becomes permanent;
- a Devil Fruit passive is disabled the moment its holder gets wet, and stops ticking before it can clean up after itself.

You get all of that by extending the class. Departing from one is fine, but read its class comment first: it usually records what went wrong.

!!! tip "The traps are the valuable half"
    The API is mostly guessable from the signatures. What is not guessable is where it fails silently, so this documentation marks every such trap with a warning.

## Requirements

| | Version |
|---|---|
| Minecraft | 1.20.1 |
| Forge | 47.4.18 or later |
| Mine Mine no Mi | 0.11.x (built against `1.20.1-0.11.5`) |
| AkumaLib | 2.5.0 |

## Where to go next

| Section | Read it for |
|---|---|
| **[Getting started](getting-started.md)** | adding the dependency, creating your registry, registering your first ability and fruit |
| **[Core concepts](core-concepts/index.md)** | damage, what the library registers, morph gates and stats, amplification |
| **[Ability base classes](ability-base-classes/index.md)** | picking and extending the base class that matches your technique |
| **[Animations](animations/index.md)** | playing, choosing and writing poses, including on full-form Zoan models |
| **[Entities](entities/index.md)** | projectiles, boomerangs and tornadoes |
| **[Loot injection](loot-injection/index.md)** | getting fruits into boxes and items into chests |
| **[Utilities](utilities/index.md)** | targeting, attribute bonuses, block propagation, effects, highlights |
| **[Development](development.md)** | working on an addon and the library side by side, and building a release correctly |

## Addons built on AkumaLib

- [Awaken Awaken no Mi](../mods/awaken-awaken-no-mi/index.md): awakened forms for the base mod's Devil Fruits, and the addon AkumaLib was extracted from.
- [InoFruits](../mods/inofruits/index.md): brand-new Devil Fruits with their own abilities.

# AkumaLib

![](../assets/icons/akumalib.png){ .mod-icon }

**AkumaLib** is a shared ability framework for [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod) addons, on Minecraft 1.20.1 with Forge.

The base mod gives an addon `Ability` and a set of components. Everything above that has to be written from scratch by each addon, and gets written slightly differently every time: a zone that charges and expands, a wave that converts terrain, a grab that holds its target, a passive that grants attribute bonuses under a condition. AkumaLib is that layer, extracted once and shared.

!!! info "A library, not a content mod"
    AkumaLib registers **no fruits, no abilities and no items** of its own. Installed alone, it does nothing a player can see. It exists so addons can build on it.

## Start here

<div class="grid cards" markdown>

-   :material-rocket-launch:{ .lg .middle } **Getting started**

    ---

    Add the dependency, create your registry, register a first ability and a first Devil Fruit.

    [:octicons-arrow-right-24: Getting started](getting-started.md)

-   :material-shape-outline:{ .lg .middle } **Pick a base class**

    ---

    Find the class that matches your technique: a zone, a wave, a grab, a dash, a passive...

    [:octicons-arrow-right-24: Which class for which technique](ability-base-classes/index.md)

-   :material-alert-octagon-outline:{ .lg .middle } **Core concepts**

    ---

    The rules behind every class. Read them before your second ability: each describes a mistake that compiles, runs, and silently does the wrong thing.

    [:octicons-arrow-right-24: Core concepts](core-concepts/index.md)

-   :material-source-branch:{ .lg .middle } **Development**

    ---

    Work on an addon and the library side by side, and build a release jar correctly.

    [:octicons-arrow-right-24: Development](development.md)

</div>

## What's inside

<div class="grid cards" markdown>

-   :material-lightning-bolt:{ .lg .middle } **[Ability base classes](ability-base-classes/index.md)**

    ---

    Zones, block waves, grabs, dashes, stomps, conditional passives, auras, item producers, transmutation, awakened Zoan forms.

-   :material-account-convert:{ .lg .middle } **[Morphs](core-concepts/morph-gates-and-stats.md)**

    ---

    `MorphGates` to lock an ability to a form, `MorphStats` for form attributes, and the [amplification](core-concepts/amplification.md) bus that lets a form upgrade the rest of a kit.

-   :material-run-fast:{ .lg .middle } **[Animations](animations/index.md)**

    ---

    A base `Animation` class, ready-made poses, and whole-body transforms that also reach full-form Zoan models.

-   :material-ghost-outline:{ .lg .middle } **[Entities](entities/index.md)**

    ---

    Boomerang and transmutation projectiles, steerable tornadoes, catchable creatures, and traps.

-   :material-hammer-wrench:{ .lg .middle } **[Professions](professions/index.md)**

    ---

    Per-player XP and levels with data-driven curves, Solo and Crew modes, a `/profession` command, workstations with level-locked recipes, XP boosts.

-   :material-earth:{ .lg .middle } **[Worldgen and dimensions](worldgen/index.md)**

    ---

    Worldgen and fluid registers, a deterministic grid of features, the overworld read from another dimension, dimension travel, jigsaw pools.

-   :material-treasure-chest:{ .lg .middle } **[Loot injection](loot-injection/index.md)**

    ---

    Your fruits in the base mod's Devil Fruit boxes with no loot file, and your items in chests you do not own.

-   :material-toolbox-outline:{ .lg .middle } **[Utilities](utilities/index.md)**

    ---

    Targeting, effects and who applied them, Belly and Extol, Doriki, tooltips, block propagation, idempotent attribute bonuses, size scaling.

</div>

Every one of these starts from **`AkumaRegistry`**: every deferred register a Mine Mine no Mi addon needs, bound to your mod id, with the base mod's naming conventions. See [Create your registry](getting-started.md#2-create-your-registry).

## How to read this documentation

Most of the library's code exists because something shipped broken first. The classes encode fixes that are easy to get wrong and **invisible when you do**: a deferred register that reaches the event bus late fails without a word; a passive bonus applied on transitions survives a reconnect and becomes permanent; a Devil Fruit passive is disabled the moment its holder gets wet, and stops ticking before it can clean up.

You get all of that by extending the class. Departing from one is fine, but read its class comment first: it usually records what went wrong. The API is mostly guessable from the signatures; what is not guessable is where it fails silently, so every such trap has a box:

| Box | Means |
|---|---|
| :material-lightning-bolt:{ style="color: #ff1744" } **Danger** | it breaks, often without an error: read it before you ship |
| :material-alert:{ style="color: #ff9100" } **Warning** | a trap: it works, just not the way you expect |
| :material-information:{ style="color: #00b8d4" } **Info** / :material-pencil:{ style="color: #448aff" } **Note** | context: why something is the way it is |
| :material-fire:{ style="color: #00bfa5" } **Tip** | the way the existing addons do it |
| :material-check:{ style="color: #00c853" } **Success** | something the library already does for you |

## Requirements

| | Version |
|---|---|
| Minecraft | 1.20.1 |
| Forge | 47.4.18 or later |
| Mine Mine no Mi | 0.11.x (built against `1.20.1-0.11.5`) |
| AkumaLib | 2.5.0 |

## Built on AkumaLib

<div class="grid cards" markdown>

-   ![](../assets/icons/awaken-awaken-no-mi.png){ .card-icon } **[Awaken Awaken no Mi](../mods/awaken-awaken-no-mi/index.md)**

    ---

    Awakened forms for the base mod's Devil Fruits, and the addon AkumaLib was extracted from.

-   ![](../assets/icons/inofruits.png){ .card-icon } **[InoFruits](../mods/inofruits/index.md)**

    ---

    Brand-new Devil Fruits with their own abilities.

-   ![](../assets/icons/sky-island.png){ .card-icon } **[Sky Island](../mods/sky-island/index.md)**

    ---

    Skypiea as a dimension of its own, reached by a Knock-Up Stream: the cloud sea, the Angel Islands, the Upper Yards and Shandora.

</div>

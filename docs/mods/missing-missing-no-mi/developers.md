---
tags:
  - missing
  - inomissing
  - api
  - addon
  - zoan
  - developers
---

# For addon developers

Missing Missing no Mi has a small public API for other addons, in the package `com.inovactio.inomissing.api`.
Everything in that package follows [semantic versioning](https://semver.org/); nothing outside it is promised to stay
(class names of the kits, abilities and helpers can change in any release).

| | |
|---|---|
| Since | Missing **4.1.0** |
| API version | `ZoanBeasts.API_VERSION` = `1.0.0` |
| Needs | AkumaLib **5.0.0** or later, Mine Mine no Mi 0.11.6 or later |

## Zoan beasts

`ZoanBeasts` makes **any mob** fight like one of Missing's Zoans **in its full form** (the whole animal), with
Missing's own abilities. It is made for addons that summon or tame creatures. No mixin is needed: you call it, that's all.

```java
// once your creature has its owner, on the server (before or after it is added to the level)
if (ModList.get().isLoaded("inomissing")) {
    MissingZoans.give(this, new ResourceLocation("inomissing", "inu_inu_no_mi_model_wolf"));
}

// in a class of its own, only loaded when Missing is there
public final class MissingZoans {
    public static void give(Mob mob, ResourceLocation fruit) {
        ZoanBeasts.addGoals(mob, fruit);
    }
}
```

| Method | What it does |
|---|---|
| `addGoals(Mob, ResourceLocation fruit)` | Gives the mob the AI goals of the Zoan's full-form abilities (priority 2). Returns `false` and does nothing for a fruit it does not know, or on the client. |
| `addGoals(Mob, ResourceLocation fruit, int priority)` | The same, at your priority. |
| `abilities(ResourceLocation fruit)` | The abilities the mob will use, in the kit's order (to show them, or for a tooltip). |
| `fruits()` / `isZoan(ResourceLocation)` | The Zoans the API knows. |
| `remove(Mob)` | Takes the Zoan off a mob that stays in the world. Not needed before `discard()`. |
| `fruitOf(LivingEntity)` | The Zoan a mob was given, or `null`. |

### What the creature gets

- The **same goals as Missing's NPC fruit users**, without their form changes, plus a few full-form abilities only
  beasts use (the short-reach ones an NPC never had in its whole-animal form: Jaw Crush, Pin Down, Throat Hold...).
- The **fruit** itself, like an NPC (so its weaknesses too).
- A **mark** that makes the fruit's full-form checks pass. The creature **wears no morph**: it keeps its own model,
  size, hit box and attributes. Hybrid-form abilities never start.

### Targets and allies

The goals never choose a target: they use the mob's own target (`Mob.getTarget()`), so your target goals decide
(owner's target, revenge...). Abilities spare the creature's owner and the owner's other animals, like a player's allies.
They work on any target, **Monsters included**.

### Flight

A creature that **flies by itself** (no gravity, or a `FlyingPathNavigation`) keeps its own flight and gets no flight goal;
its air attacks still work. A walking creature given a flying Zoan flies like Missing's NPCs do: up a while, then down to rest.

### Damage

Like an NPC: each ability's fixed numbers, plus the creature's own attributes (its attack damage counts where a player's
would). Nothing comes from the owner. A giant Zoan's abilities reach as far as they do in the giant form, whatever the
creature's size.

### Clean-up

When the creature **dies, is discarded or unloads**, every ability it runs is stopped and what it holds is let go
(prey, carried bodies, webs). A creature **saved to disk** gets its goals back when it is read again.

### The Zoans

| Fruit id (`inomissing:`) | Full form |
|---|---|
| `inu_inu_no_mi_model_wolf` | Walk Point |
| `inu_inu_no_mi_model_tanuki` | Walk Point |
| `inu_inu_no_mi_model_kyubi_no_kitsune` | Walk Point |
| `neko_neko_no_mi_model_saber_tiger` | Walk Point |
| `kumo_kumo_no_mi_model_rosamygale_grauvogeli` | Walk Point |
| `mushi_mushi_no_mi_model_kabutomushi` | Walk Point |
| `mushi_mushi_no_mi_model_suzumebachi` | Walk Point |
| `ryu_ryu_no_mi_model_pachycephalosaurus` | Walk Point |
| `ryu_ryu_no_mi_model_spinosaurus` | Walk Point |
| `ryu_ryu_no_mi_model_triceratops` | Guard Point |
| `hebi_hebi_no_mi_model_yamata_no_orochi` | Guard Point (giant) |
| `hito_hito_no_mi_model_onyudo` | Guard Point (giant) |
| `tori_tori_no_mi_model_falcon` | Fly Point |
| `tori_tori_no_mi_model_eagle` | Fly Point |
| `tori_tori_no_mi_model_albatross` | Fly Point |
| `batto_batto_no_mi_model_vampire` | Fly Point |
| `uma_uma_no_mi_model_pegasus` | Fly Point |
| `tama_tama_no_mi` | Rooster |

### mods.toml

```toml
[[dependencies.yourmod]]
    modId = "inomissing"
    mandatory = false
    versionRange = "[4.1.0,)"
    ordering = "AFTER"
    side = "BOTH"
[[dependencies.yourmod]]
    modId = "akumalib"
    mandatory = false
    versionRange = "[5.0.0,)"
    ordering = "AFTER"
    side = "BOTH"
```

Keep the ranges open at the top: a capped range refuses the next release.

# What the library registers

AkumaLib registers a handful of things under its own `akumalib` namespace. Each one is shared **on purpose**: registering your own copy would not add a feature, it would split one mechanic into two that cannot see each other.

## Shared registrations

| Thing | What it is | Why there must be only one |
|---|---|---|
| `AkumaAttributes.SIZE` | the attribute that scales an entity's size, applied by the library's own mixin on `Entity.getDimensions` | an entity has one size. Two addons with their own attribute would each scale it by their own factor, and neither would see the other's |
| `AkumaEffects.INVULNERABLE` | a marker effect that makes a target immune to the library's damage helpers. It does not cancel damage on its own: code has to check it, as `hurtBurst` does | `hurtBurst` and `EffectsHelper.isInvulnerable` read it. A per-addon effect would let one mod damage a target another mod had made invulnerable |
| `AkumaAbilityKeys.BLOCK_TRIGGER` | the component key for `BlockTriggerComponent` | one component type, looked up under one id by everyone |
| `AkumaAnimations.RIGHT_ARM_FORWARD`, `KNEEL_PUNCH_GROUND` | two poses with no fruit identity | registered once so addons do not each repeat the same line |
| the zone block overlay | the manager, packet and renderer behind `ZoneAbility`'s block overlay | the three pieces only work together, and the overlay can be turned off by players in `akumalib-client.toml` |
| the awakened Zoan smoke layer | a render layer the library attaches to every living renderer | an addon gets the smoke without wiring anything on the client |
| the `akumalib:professions` registry | the registry every addon's professions go into, plus the player data, the sync packet and `/profession` | one registry and one player store, so one command and one screen can list every addon's professions |
| the `akumalib:workstation` menu and its screen | one menu type and one screen for every `WorkstationBlock` of every addon; the block says which profession and recipes apply | an addon gets a working workstation from a block, a recipe type and JSON, with nothing on the client to wire |
| the spreading zone restore | `SpreadingBlockCleanupHandler`, putting back the ground of every `SpreadingBlockAbility` zone whose holder logs out, changes dimension, or whose server stops | the zones share one static registry, so one handler restores them all |

!!! danger "Do not register your own size attribute or invulnerability effect"
    Use `AkumaAttributes.SIZE` and `AkumaEffects.INVULNERABLE` directly. A second copy compiles and runs, and the bug only appears when two addons touch the same entity.

### Driving an entity's size yourself

If one of your abilities sets an entity's dimensions by its own means, tell the size machinery to stay out of the way while you do:

```java
entity.getPersistentData().putBoolean(SizeScale.SUSPEND_FLAG, true);
```

The library's size mixin and both of its size event handlers return early for an entity carrying that flag. Read the current scale with `SizeScale.get(entity)`; it is clamped between `0.05` and `256`.

!!! note "Clear the flag when you are done"
    The flag is persistent data, so it survives a save and a reconnect. Remove it when your ability stops driving the entity's size, or the `SIZE` attribute will be ignored on that entity for good.

## What the library deliberately does not register

| Thing | Why not | What to do |
|---|---|---|
| `ForwardRollAnimation`, `BarrelRollAnimation` | both take a spin speed, so there is no single right instance | register your own instance, with your speed, in your own animation holder |
| a network channel for your addon | sharing one channel would make packet ids depend on which addons are installed | keep your own `SimpleChannel` |

## The library's own touch list

The library follows the same rule it asks of you on the [Getting started](../getting-started.md#4-touch-your-holder-classes) page: its holders create their entries from static initialisers, so `AkumaLibMod` touches each of them during mod construction. You do not need to touch AkumaLib's holders yourself; you do need to touch yours.

## Naming conventions

Everything the library owns outright is prefixed `Akuma`: `AkumaRegistry`, `AkumaAttributes`, `AkumaEffects`, `AkumaAnimations`, `AkumaAbilityHelper` and so on.

A few classes keep an `Awaken` prefix: `AwakenZoanAbility`, `AwakenZoanSmokeLayer`, `AwakenTooltipHelper` and the `IAwakenZoanSmokeLayer*` markers. The prefix names **awakening as a concept from the base mod**, not the addon these classes came from, and any addon can use them to give a fruit an awakened form.

!!! warning "Registry keys are contractual"
    The keys `AkumaRegistry` builds end up in your `en_us.json` and in saved worlds. An effect id that moves namespace is dropped from every world that held it, so changing how an entry is named is a breaking change, not a refactor.

# Utilities

Small helpers that encode a decision easy to get wrong once per fruit.

| Page | Helpers |
|---|---|
| [Targeting](targeting.md) | `AkumaTargeting`: the nearest target in a line, what the user is looking at, the point they aim at, a cone test, a range grown to the caster's morph, the enemy check |
| [Attributes and size](attributes-and-size.md) | `AttributeBonusHelper`, `SizeScale` |
| [Blocks](blocks.md) | `PropagationHelper`, `BlockPlacingHelper`, `BlockHighlightManager`, `BlockOverlayManager` |
| [Effects](effects.md) | `MarkerEffect`, `OverlayEffect`, `EffectsHelper`, `AkumaEffectGroups` |
| [Tooltips](tooltips.md) | `ToolTipHelper`, `AwakenTooltipHelper`, `AkumaI18n` |
| [Effect owners](effect-owners.md) | `EffectOwners`: who applied an effect to whom, which a `MobEffectInstance` cannot say |
| [Deferred work](tick-queue.md) | `AkumaTickQueue`: run something at the end of this server tick, or N ticks from now |
| [Pulls](motion.md) | `AkumaMotion`, `PullProfile`: moving a body toward a point with a tunable speed curve |
| [Protected areas](protection.md) | `AkumaProtection`: the base mod's protection and griefing rules for a target or a world change it does not check itself |
| [Lines](lines.md) | `AkumaLines`, `LineAnchor`, `LineStyle`: a rope or thread between two anchors, rendered on the client |
| [Currency](currency.md) | `AkumaCurrency`: read, give and take Belly and Extol, synced, never below zero |
| [Jigsaw pools](jigsaw.md) | `AkumaJigsaw`: add pieces (features, templates) to another mod's jigsaw pools |
| [Cell grids](cells.md) | `AkumaCells`: a deterministic grid of jittered cells, so several readers agree on where a feature is |
| [Asking the overworld](overworld-lookup.md) | `OverworldLookup`: the overworld's biome and seed from another dimension's worldgen thread, without loading a chunk |
| [Dimension travel](dimension-travel.md) | `AkumaDimensionTravel`: send a body, its vehicle and its riders to another dimension with a velocity that survives |
| [Doriki](doriki.md) | `AkumaStats`: read and grant Doriki, synced; `DorikiGainEffect`: more Doriki from fights |
| [Other helpers](other-helpers.md) | `FruitInjectionHelper`, `RandomTeleportHelper`, `InoHelper` |

The damage helpers, `AkumaAbilityHelper.scaledDamage` and `hurtBurst`, have their own page in [Core concepts](../core-concepts/damage.md).

`AkumaCharges.interrupt`, cutting a charge short without firing it or leaking what it started, is documented with [Charges](../core-concepts/charges.md#a-charge-stopped-from-outside).

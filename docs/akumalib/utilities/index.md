# Utilities

Small helpers that encode a decision easy to get wrong once per fruit.

## Targeting and protection

| Page | Helpers |
|---|---|
| [Targeting](targeting.md) | `AkumaTargeting`: the nearest target in a line, what the user is looking at, the point they aim at, a cone test, a range grown to the caster's morph, the enemy check |
| [Protected areas](protection.md) | `AkumaProtection`: the base mod's protection and griefing rules for a target or a world change it does not check itself |

## Effects

| Page | Helpers |
|---|---|
| [Effects](effects.md) | `MarkerEffect`, `OverlayEffect`, `EffectsHelper`, `AkumaEffectGroups` |
| [Effect owners](effect-owners.md) | `EffectOwners`: who applied an effect to whom, which a `MobEffectInstance` cannot say |

## Bodies and movement

| Page | Helpers |
|---|---|
| [Attributes and size](attributes-and-size.md) | `AttributeBonusHelper`, `SizeScale` |
| [Pulls and pushes](motion.md) | `AkumaMotion`, `PullProfile`: moving a body toward a point with a tunable speed curve, or along a direction |

## Blocks and visuals

| Page | Helpers |
|---|---|
| [Blocks](blocks.md) | `PropagationHelper`, `BlockPlacingHelper`, `BlockHighlightManager`, `BlockOverlayManager` |
| [Lines](lines.md) | `AkumaLines`, `LineAnchor`, `LineStyle`: a rope or thread between two anchors, rendered on the client |
| [Tooltips](tooltips.md) | `ToolTipHelper`, `AwakenTooltipHelper`, `AkumaI18n` |

## Player data

| Page | Helpers |
|---|---|
| [Currency](currency.md) | `AkumaCurrency`: read, give and take Belly and Extol, synced, never below zero |
| [Doriki and Cola](doriki.md) | `AkumaStats`: read and grant Doriki, refill a cyborg's Cola; `DorikiGainEffect`: more Doriki from fights |
| [Devil Fruits](devil-fruits.md) | `AkumaDevilFruits`: a living entity's Devil Fruit as the base mod keeps it |

## Timing and the rest

| Page | Helpers |
|---|---|
| [Deferred work](tick-queue.md) | `AkumaTickQueue`: run something at the end of this server tick, or N ticks from now |
| [Other helpers](other-helpers.md) | `FruitInjectionHelper`, `RandomTeleportHelper`, `InoHelper` |

## Documented elsewhere

- The worldgen tools, `AkumaCells`, `OverworldLookup`, `AkumaDimensionTravel` and `AkumaJigsaw`, have their own section: [Worldgen and dimensions](../worldgen/index.md).
- The damage helpers, `AkumaAbilityHelper.scaledDamage` and `hurtBurst`, have their own page in [Core concepts](../core-concepts/damage.md).
- `AkumaCharges.interrupt`, cutting a charge short without firing it or leaking what it started, is documented with [Charges](../core-concepts/charges.md#a-charge-stopped-from-outside).

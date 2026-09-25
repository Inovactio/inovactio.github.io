# Ability base classes

Every class here extends a Mine Mine no Mi type and encodes a technique shape that addons kept rewriting. Pick the one closest to your technique, extend it, and fill in what it asks for.

!!! tip "Read the class comment before departing from a base class"
    Most of the code in these classes exists because something shipped broken first. The class comments usually record what went wrong, and why the obvious simplification brings the bug back.

## Which class for which technique

| Your technique | Class | Page |
|---|---|---|
| a charged sphere that applies effects to what is inside | `ZoneAbility` | [Zones](zones.md) |
| a zone that converts the ground and restores it afterwards | `SpreadingBlockAbility` | [Zones](zones.md) |
| a radial wave converting blocks outward | `BlockWaveAbility` | [Terrain](terrain.md) |
| flooding the surroundings with a block after a charge | `OceanAbility` | [Terrain](terrain.md) |
| a passive granting attribute bonuses under a condition | `ConditionalStatPassiveAbility` | [Passives](passives.md) |
| a passive aura hitting nearby enemies | `AuraAbility` | [Passives](passives.md) |
| damage dealt by sprinting into things | `RunningSmashAbility` | [Passives](passives.md) |
| a passive holding a value shown as a HUD gauge | `GaugePassiveAbility` | [Passives](passives.md) |
| a held dash that hurts what it passes through | `MoveAbility` | [Movement](movement.md) |
| the base mod's dash, with start and end hooks | `DashAbility` | [Movement](movement.md) |
| a charged teleport that hits along its path | `InstantDashAbility` | [Movement](movement.md) |
| a charged area stomp | `StompAbility` | [Movement](movement.md) |
| anything that must be used on the ground | `GroundAbility` | [Movement](movement.md) |
| the flight of a Zoan with two flying forms | `TwoFormFlightAbility` | [Movement](movement.md) |
| catching a target and holding it | `GrabAbility` | [Grabs](grabs.md) |
| handing the user an item the fruit makes | `ProduceItemAbility` | [Items and blocks](items-and-blocks.md) |
| turning materials into an item | `CraftingAbility` | [Items and blocks](items-and-blocks.md) |
| firing a transmutation projectile | `TransmutationAbility` | [Items and blocks](items-and-blocks.md) |
| a state in which hitting blocks does something | `BlockUseAbility` | [Items and blocks](items-and-blocks.md) |
| an awakened Zoan form, with its smoke | `AwakenZoanAbility` | [Awakened Zoan](awakened-zoan.md) |

## Damage units differ between classes

Some base classes deal damage for you, from a number you return. **That number goes to the base mod's pipeline as is**, so it is reduced by `x0.4` like any ability damage (see [Damage](../core-concepts/damage.md)). Return `AkumaAbilityHelper.scaledDamage(realHp)` wherever a class asks for a damage value, unless its page says otherwise.

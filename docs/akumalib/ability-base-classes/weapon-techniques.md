# Baton and spear techniques

*Since #969.* Eight techniques of a held weapon, real abilities a player can be given and an NPC can use through its goal. AkumaLib gives them to no one: an addon unlocks them for a player, or arms its NPCs.

| Weapon | Technique | What it does | NPC goal |
|---|---|---|---|
| Baton | Knockout Blow | a cast (0.75 s), then a heavy blow in a line that stuns about 1 s | close melee |
| Baton | Flurry | three quick blows in a line | close melee |
| Baton | Sweep | a blow all around that knocks the enemies down | close melee |
| Baton | Parry | a guard (1.5 s): the first blow from in front is blocked and answered | `GuardWrapperGoal` |
| Spear | Thrust | a cast (0.5 s), then a thrust 4 blocks out | close melee |
| Spear | Spear Charge | a rush that hits and throws back what is in the way | dash |
| Spear | Spear Whirl | one turn, hitting all around | close melee |
| Spear | Spear Throw | the held spear thrown out and back; it comes back to the hand | projectile |

- **Which weapon**: the item tags `akumalib:batons` (the base mod's `mineminenomi:blunts`) and `akumalib:spears` (spear, Nonosama trident, Mogura). A pack adds its own items. Without one in the main hand a technique is refused.
- **Damage**: the written numbers only (`PHYSICAL`): the weapon held adds nothing.
- **Size**: areas and lines go through `RangeComponent`, hits through `DealDamageComponent.hurtTarget`, the rush through `DashComponent`; the six close techniques are in `akumalib:size_melee`, the pushes in `akumalib:size_pushes`. Not exempt.
- **The thrown spear** is the very item (its name and enchantments kept). It goes back to the hand when it ends near its thrower; an NPC gets it back wherever it ends; a player's that ends far away, or a dead thrower's, falls to the ground.

## Arming an NPC

```java
// a grunt draws 1, a brute 2, a captain 3, as the base mod's style kits
WeaponTechniques.draw(npc, WeaponTechniques.Weapon.BATON, 2, random, false);
// a boss knows the four, with a player's cooldowns
WeaponTechniques.giveAll(npc, WeaponTechniques.Weapon.SPEAR, true);
```

The goals go at priority 2. An NPC's cooldowns are `npcRokushikiCooldownMultiplier` (the Rokushiki's NPC multiplier, #598, x2 by default) times a player's, unless armed with `playerCooldowns` true; with `npcRokushiki` false, a player's. The goals are not saved: arm the NPC again when it is read back, from the same random seed.

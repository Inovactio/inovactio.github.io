# The civilian faction

AkumaLib makes Mine Mine no Mi's Civilian faction a player's choice in the character creator. The base mod
already keeps the Marines, the World Government, the Bounty Hunters and the Revolutionaries from hurting a
civilian. `CivilianFaction` adds the rules that end it.

## Three strikes in a game day

A civilian has **three strikes** per game day (`CivilianFaction.STRUCK_TO_TURN`). Each one is warned of,
the third makes him a pirate, and the count clears at the start of each new day. A strike is:

- **a blow on the law**: one more Marine or man of the World Government struck that day (striking the same one
  again does not count twice);
- **a theft**: something taken that is not a weapon, one strike per chest opened however many stacks he takes.

## What turns him pirate at once

Taking **a weapon or a Devil Fruit box** from a chest that is not his makes him a pirate there and then. The list
is the item tag `#akumalib:turns_civilian_pirate`:

- Mine Mine no Mi's `#mineminenomi:weapons` (swords, axes, blunts, polearms, guns, bows, crossbows, tridents);
- the ammunition: `#mineminenomi:gun_ammo`, `#mineminenomi:bazooka_ammo` (cannonballs), `#minecraft:arrows`, the
  Pop Greens;
- the weapons none of those tags holds: the cannon and the jitte;
- the wooden, iron and golden boxes.

A datapack can add to it like any tag.

## Marine chests

What a civilian takes out of a chest **in a Marine building** is stolen: the base mod's `#mineminenomi:marine`
structures (small and large bases, watch towers, battleships), read where the player stands, as Mine Mine no Mi's
own theft rule reads them. A chest counts whether he takes from its window or breaks it and lets its contents
fall. Players in creative or spectator mode are left out.

The base mod sets every Marine nearby on whoever opens a chest in their building. They could not hurt a civilian
and circled him for ever: now they leave a civilian alone. The theft that turns him pirate sets them on him.

## Reporting a theft from an addon

An addon that keeps chests of its own (a village's, a ship's) reports what a player took from one:

```java
// Server side. One call is one theft: a weapon or a fruit box turns a civilian pirate,
// anything else is one strike. Does nothing to a player who is no civilian.
CivilianFaction.stole(player, stack);
```

Call it once for each weapon taken, and once per window opened for the rest, as AkumaLib does for Marine
chests. `CivilianFaction.isCivilian(entity)` tells whether a player or an NPC is a civilian.

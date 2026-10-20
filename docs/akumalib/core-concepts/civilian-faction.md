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

## The Marine recruiter

*Since 5.1.0.* A recruiter stands at the front desk of Mine Mine no Mi's small and large Marine bases, old
worlds included: he appears when a player walks into the base. He does not move, fight or get hurt. His window
(`MarineRecruiter`) offers what applies to the player now:

- **Join the Marines**: a civilian or a bounty hunter with no bounty and in no crew becomes a Marine Chore Boy at
  loyalty 0, given the base mod's Marine hat, shirt, trousers and boots;
- **Resign**: a Marine becomes a civilian again, loyalty 0. The base mod's own desertion (a Marine whose loyalty
  falls to -5 turns pirate) is left as it is;
- anyone else is told why not (`MarineRecruiter.Refusal`): already a Marine, a pirate, a bounty, a crew.

The server decides everything: a button pressed is judged again on the server, and only from within 6 blocks of
the recruiter (`MarineRecruiter.REACH`). The window adds two messages: 5.1.0 is network protocol 10.

## Back to civilian life

*Since 5.1.0.* A pirate whose bounty **never went over 500 000** (`CivilianReturn.CAP`; dying to lower it changes
nothing) can stop being one at the same desk. They must leave their crew first. `CivilianReturn` gives the pirate's
window two buttons:

- **Amnesty**: they pay half their bounty in Belly. Their bounty goes to 0, their wanted poster is gone and they are a
  civilian.
- **Give yourself up**: they serve a sentence of 2 minutes, plus 1 per 5 000 of bounty, 30 at most, counted only
  while they are online, in a cell of a new prison, in Kairoseki handcuffs, abilities off. Their weapons and fruit
  boxes are kept and given back at the end, where they surrendered, as a civilian.

Two more rules help them get there:

- **A fading bounty**: after 3 game days online with no new bounty, it loses a fifth of what it was every game day.
  At 0 they are still a pirate, but the amnesty is free.
- **Truce**: inside a Marine base, a pirate who could go back, with no weapon in hand and no Marine struck or robbed
  in the last minute, is left alone by the Marines, so they can reach the desk.

## Adding to a pirate's window

An addon offers its own choices to a pirate at the recruiter's desk. Register them once, at set up:

```java
// Called on the server each time a pirate opens the window: return only what applies to them now.
MarineRecruiter.addPirateOptions(pirate -> List.of(
        new MarineRecruiter.Option("yourmodid:pardon", label, tooltip, open,
                asked -> reply)));
```

An `Option` is a button: its id, its label, its tooltip, and whether it may be pressed. One that may not is greyed,
its tooltip saying why. `choose` (the last argument) does what the button says, on the server, and returns what the
recruiter answers. `MarineRecruiter.removePirateOptions` takes back what was added. AkumaLib's own amnesty and
surrender come in this way.

A desk of your own uses `CivilianReturn` directly, on the server: `refusal(player)` (why a pirate cannot go back
now, or `NONE`), `price(player)` (the amnesty in Belly), `pardon(player)` and `sentence(player)`.

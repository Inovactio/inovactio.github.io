---
# Hidden search keywords: the search weighs them heavily; the page does not show them.
tags:
  - race
  - giant
  - skypiean
  - fishman
---

# Race Race no Mi

![](../../assets/icons/race-race-no-mi.png){ .mod-icon }

**Race Race no Mi** brings the races of One Piece to [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod). You pick your race and sub-race in the character creator: each one has its own body, its own passive and, for the sky people and the giants, techniques of their own in the abilities tree.

| | |
|---|---|
| Version documented | **0.1.0** (beta) |
| Mod id | `racenomi` |
| Configuration | [Server settings](configuration.md) |
| Changelog | [Every release](changelog.md) |

## Requirements

| Mod | Version |
|---|---|
| Minecraft | 1.20.1 |
| Forge | 47.4.18 or later |
| Mine Mine no Mi | 0.11.6 |
| [AkumaLib](../../akumalib/index.md) | 6.0.0 or later |
| [Sky Island](../sky-island/index.md) | optional: the sky people are at their strongest in Skypiea |

Needed on both the client and the server.

## Your size

Every race has a size, set in the character creator with a slider: a man is 1, a fishman 1.25, a giant 4. Reach, blows, health, strides and techniques all follow the body, through AkumaLib's size system: a giant's Stomp covers twice a man's ground.

## Sky People

Skypiean, Birkan and Shandia: wings on their back, at home with the dials, stronger the higher they stand. They count as humans for Rokushiki.

| Sub-race | Passive |
|---|---|
| Skypiean | +20 % speed |
| Birkan | +1 damage, +1 toughness |
| Shandia | +3 damage, +2 toughness |
| Wingless Birkan | +3 damage, +1 toughness; the strongest Mantra (x2); no wing technique |

- **Altitude**: the passive grows up to x1.5 from height 128 to 256, and is always full in Sky Island's Skypiea.
- **Dials**: the base mod's Axe, Flame, Impact, Milky and Reject Dials hit 25 % harder and recharge 25 % faster in their hands (40 % for a Skypiean).
- **Mantra**: Observation Haki grows faster and reaches farther: x1.25, x1.5 for a Birkan.
- A Birkan's wings come off only by an operator's command: `/racenomi wings remove <player>` (`restore` gives them back).

Their techniques sit in a branch of the abilities tree that only the sky people see; a sub-race's pair only for that sub-race.

| Technique | For | Cost | What it does |
|---|---|---|---|
| Axe Slash | all | 500 Doriki, 2 technology | a blade of air, cut where you look |
| Impact | all | 800 Doriki, 3 martial arts | catches half of each blow for a moment, then lets it out in a shockwave |
| Sky Leap | all, with wings | 1,250 Doriki, 5 martial arts | three bounds through the air, a safe landing |
| Breath Gale | Skypiean | 3,000 Doriki, 5 technology | a gust that throws back enemies and shots |
| Dial Blend | Skypiean | 5,000 Doriki, 10 technology | ALT: a blinding shock around you, or a jet of fire at the target |
| Mantra Mark | Birkan | 3,000 Doriki, 5 martial arts | a target seen through walls for 20 s; the next blow on it x1.5 |
| Divine Stride | Birkan, with wings | 5,000 Doriki, 10 martial arts | a dash through enemies |
| War Cry | Shandia | 3,000 Doriki, 5 martial arts | Strength for you and your allies around |
| Berserker | Shandia | 5,000 Doriki, 10 martial arts | more damage and attack speed, less armour, for a while |

A real dial carried makes the dial techniques stronger.

## Fishmen

The base mod's Saw-shark, Ray and Garfish, made whole: fins and a snout of their own, the sub-race's skin colour (in first person too), and a passive each. Fishmen are 1.25 times a man's size.

| Passive | What it does |
|---|---|
| Fishman Body (every fishman) | swims much faster; under water, endless air, night vision and haste |
| Saw-shark Body | harder blows; a bare-fisted blow may make the target bleed |
| Ray Body | a karate master: harder and faster blows with bare hands |
| Garfish Body | the fastest swimmer |

Arlong, Kuroobi and Chew carry their sub-race's passive too.

## Humans

**Human Will**: +25 % Doriki and Haki experience. Humans have no body bonus, but grow faster than anyone.

## Giants

The people of Elbaf: four times a man's size, about 7 blocks high, with a narrow slider (3.75 to 4.25). They do not count as humans for Rokushiki.

**A giant in a human world**

- **Low roofs**: he hunches under a roof too low for him, and crawls lower down (no techniques on all fours).
- **Plants**: he walks through leaves, bamboo, vines, cobwebs and berry bushes.
- **Water and portals**: he wades through water shallower than him, and goes through a portal as soon as he touches it.
- **Blocks**: he breaks and places blocks by 3x3x3, one item per block placed. The **G** key switches to precision mode, one block at a time with his long reach. Ability griefing and protected areas are followed.
- **Sleep and chests**: he sleeps on a 3x3 of hay or wool, and opens chests from his reach.

**Pride of Elbaf** (passive): weakness and despair do not take hold of him; below 30 % health he hits 25 % harder.

| Technique | Cost | What it does |
|---|---|---|
| Stomp | 500 Doriki | those around are hurt and thrown up and back |
| Giant's Grip | 1,500 Doriki | a body no taller than half of him seized in his fist; press again to throw it |
| Boulder Throw | 2,500 Doriki | a boulder of real ground torn out, held over his head and thrown; it bursts where it lands, and the hole closes again |
| Hakoku | 4,000 Doriki | a weapon in hand, a cut that flies on through every body in its path |

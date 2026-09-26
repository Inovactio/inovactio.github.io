---
# Hidden search keywords: the search weighs them heavily; the page does not show them.
tags:
  - job
  - jobs
  - profession
  - professions
  - level
  - levels
  - levelling
  - leveling
  - xp
  - experience
  - solo
  - crew
---

# Trades and levels

Cruise Cruise no Mi adds **fourteen trades**. Each has its own level, perks, advancements and page in the professions book.

- The **gatherers** bring things in from the world: [Fisher](trades/fisher.md), [Hunter](trades/hunter.md), [Farmer](trades/farmer.md), [Miner](trades/miner.md), [Lumberjack](trades/lumberjack.md) and [Navigator](trades/navigator.md).
- The **makers** turn them into something at a workstation: [Cook](trades/cook.md) (Kitchen), [Inventor](trades/inventor.md) (Workshop), [Chemist](trades/chemist.md) (Laboratory), [Blacksmith](trades/blacksmith.md) (Forge), [Carpenter](trades/carpenter.md) (Shipyard), [Tailor](trades/tailor.md) (Sewing Table) and [Musician](trades/musician.md) (Music Stand).
- The [Merchant](trades/merchant.md) makes nothing and gathers nothing: they learn by selling.

Three gatherers also have a bench of their own: the Hunter's **Tannery**, the Miner's **Masonry** and the Navigator's **Chart Table**.

## Levels and XP

Every trade starts at **level 1** and goes up to **level 100**. Most of this first version's content sits between levels 1 and 50; a few things already go further (the Musician's tier III scores, the legendary treasure maps at Merchant 75).

Every trade uses the same curve: going from one level to the next costs **20 × (current level)<sup>1.25</sup> XP**, so each level costs a little more than the last.

| Level | XP for that level | Total XP from level 1 |
|---|---|---|
| 2 | 20 | 20 |
| 5 | 113 | 260 |
| 10 | 312 | 1 407 |
| 25 | 1 062 | 11 869 |
| 30 | 1 346 | 18 026 |
| 40 | 1 949 | 34 767 |
| 50 | 2 593 | 57 768 |
| 75 | 4 341 | 144 942 |
| 100 | 6 246 | 277 937 |

A server can change each trade's curve and set an XP multiplier: see [Configuration](configuration.md).

### Where the XP comes from

| Trade | XP for |
|---|---|
| **Makers** (every workstation) | every recipe: **10 + 2 × its level** (12 XP for a level-1 recipe, 70 at level 30, 110 at level 50); the one exception is the Carpenter's Auction House (level 15, 36 XP) |
| **Fisher** | every Cruise catch (more for a bigger one), a bonus for the first of each kind, every Sea King hooked and every Sea King killed |
| **Hunter** | every creature caught (a rare variant pays more), a bonus for the first of each kind, the Tannery's recipes |
| **Farmer** | every ripe crop harvested (5 + the crop's level), every fruit picked (4 + the tree's level) |
| **Miner** | breaking ores with the right pickaxe, every find that turns up in the rock, the Masonry's recipes |
| **Lumberjack** | every log felled from a standing, naturally grown tree (1 for ordinary wood, 2 for a fruit tree, 3 Kuuigosu, 4 Burning Tree, 6 Adam), 1 for planting a sapling; placed logs pay nothing |
| **Merchant** | 1 XP for every 10 Belly of sales to Cruise's merchants or at the Auction House; every treasure dug up (100, 400 or 1 200 by the map's grade) |
| **Navigator** | 2 for each chunk never visited, 25 for each new biome in the Log Book, 50 for each new kind of place, 20 for drawing a Sea Chart, 40 for calibrating an Eternal Pose, the Chart Table's recipes |
| **Musician** | writing scores, and playing them: 10 + the tune's level + 10 for each crewmate who hears it (up to 8) |

The [Bestiary and Log Book](bestiary-and-logbook.md) also pay each time you complete a further tenth of one of their sections: Belly to anyone, plus XP in the matching trade if you practise it (50, 100, 150, 250, 400, 600, 900, 1 400, 2 200, then 6 000 XP).

### XP boosts

- Most Cruise **dishes** give an *Appetite* for 10 minutes: +15 %, +30 % or +45 % XP in one trade (the harder the dish, the bigger the boost). Only one Appetite at a time. See the [Cook](trades/cook.md).
- The Musician's ***Craftsman's Song*** gives +5 %, +10 % or +20 % XP in **every** trade (tiers I, II, III), on top of a meal's Appetite. See the [Musician](trades/musician.md).

## The professions book

The trades appear in the professions screen, drawn as Mine Mine no Mi's open book. Click a trade to open its page: its **perks**, with the level each one starts at, and everything it **unlocks** level by level, every recipe included. The Fisher's, Hunter's and Miner's pages also list every fish, creature and find in the rock at the level it needs.

- On the Fisher's and Hunter's pages, a **Bestiary** button opens the Bestiary.
- On the Navigator's page, a **Log Book** button opens the Log Book.
- The Farmer's bonus harvest and the Merchant's price and auction bonuses show their **current** values, so they grow as you level.

## Solo or Crew

The mode is a server setting ([Configuration](configuration.md)): **Solo** in single player and on LAN, **Crew** on a dedicated server, unless the server says otherwise.

- **Solo**: you practise **all fourteen trades** at once, each with its own level.
- **Crew**: each player picks **one** trade, in the *Profession* tab of Mine Mine no Mi's character creator, and practises only that one. The crew shares out the work: the Fisher's catch goes to the Cook, the Miner's ore to the Blacksmith, the Hunter's creatures to the Chemist. A player counts as level 0 in every trade they don't practise.

What that means for someone who does not practise a trade:

| Trade | What they can and cannot do |
|---|---|
| Fisher | They can fish, but only land Cruise's level-1 catches, and earn no Fisher XP. |
| Hunter | They can only catch the level-1 creatures; anything harder "slips away". The Bestiary still fills. |
| Farmer | They cannot sow Cruise's crops, nor plant fruit-tree saplings (unless they are a Lumberjack of the sapling's level); about half of the fruit they pick and the crops they harvest is spoiled. |
| Lumberjack | They cannot plant the Kuuigosu, Burning Tree or Adam saplings, nor break the Treasure Tree Adam's logs. |
| Miner | They get none of the finds in the rock, and an Explosive Rock goes off in their hands. |
| Carpenter | "Only a Carpenter can mend a hull afloat." |
| Merchant | They cannot read torn treasure maps, and get none of the Merchant's prices or bonuses. |
| Navigator | They cannot set a Log Pose, draw a Sea Chart or calibrate an Eternal Pose (anyone can follow them). |
| Musician | "Only a Musician can play a score." |
| The makers | Each workstation belongs to its trade, and its recipes open level by level. |

### Changing trade: the Potion of Forgetting

In **Crew** mode, a player can start over in another trade.

- **Made by** a Chemist of **level 30** at the Laboratory, from a Golden Matsutake, a Mystery Mushroom, Bitter Grass, a Medicinal Herb and a Glass Bottle. It is found nowhere else.
- **Drinking it** opens a book, "Choose a new trade": every trade on the left (yours greyed out), the chosen trade's icon and perks on the right, and in red: *"You will forget everything: every trade, yours included, goes back to level 0."* The button asks twice ("Become …", then "Confirm: forget all").
- **The cost**: on confirmation, **all your trade XP is wiped** (every trade, not only yours) and you take up the new trade from the start. The potion is used up only then: close the book instead and you keep it.
- In a **Solo** world there is nothing to forget: the recipe is removed, and a potion that still turns up cannot be drunk.

## Perks

Every trade has **three to six perks**, most at **levels 10, 25 and 40** (the Tailor has one more at 30; the Farmer and the Merchant also have perks that grow from level 1). Each trade's page lists them. A perk only works in a trade you practise.

## Advancements

Cruise has **185 advancements** on **15 tabs**: a main tab and one per trade.

- Each trade's tab opens at **level 1** in that trade and holds one level milestone, **Apprentice** (Apprentice Fisher, Apprentice Cook…) at level 5. Everything else is about doing things: a recipe made, a species caught, a dish eaten, a tree felled.
- The main tab's **Jack of All Trades** asks for level 5 in all fourteen trades, so it can only be earned in Solo mode.
- Notable challenges: Naturalist (catch every creature), Gourmet (taste 26 of the dishes), King of the Sea (kill a Sea King), All That Is Gold (land the Golden Whale), The Tree That Cannot Be Chopped Down (fell the Adam), SUPER! (a boat of Adam wood), Yohohoho! (forge the Soul Solid), Rumble! (a Rumble Ball), Legendary Treasure, Full House (play for three crewmates or more).

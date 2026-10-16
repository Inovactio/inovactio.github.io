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

Cruise Cruise no Mi adds **fourteen trades**. Each has its own level, its web of [talents](#talents) with its combat abilities, its advancements and its page in the professions book.

- The **gatherers** bring things in from the world: [Fisher](trades/fisher.md), [Hunter](trades/hunter.md), [Farmer](trades/farmer.md), [Miner](trades/miner.md), [Lumberjack](trades/lumberjack.md) and [Navigator](trades/navigator.md).
- The **makers** turn them into something at a workstation: [Cook](trades/cook.md) (Kitchen), [Inventor](trades/inventor.md) (Workshop), [Chemist](trades/chemist.md) (Laboratory), [Blacksmith](trades/blacksmith.md) (Forge), [Carpenter](trades/carpenter.md) (Shipyard), [Tailor](trades/tailor.md) (Sewing Table) and [Musician](trades/musician.md) (Music Stand).
- The [Merchant](trades/merchant.md) makes nothing and gathers nothing: they learn by selling.

Three gatherers also have a bench of their own: the Hunter's **Tannery**, the Miner's **Masonry** and the Navigator's **Chart Table**.

## Levels and XP

Every trade starts at **level 1** and goes up to **level 100**. Most of the content sits between levels 1 and 50; a few things already go further (the Musician's tier III scores, the legendary treasure maps at Merchant 75).

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

Every trade climbs at about the same pace: from level 1 to 50, a trade takes about **fifteen hours of work**, whichever it is. What the work of the Fisher, the Hunter, the Miner and the Farmer pays is set for that; the tables on their pages show what is really paid.

A server can change each trade's curve and set an XP multiplier: see [Configuration](configuration.md).

### Where the XP comes from

| Trade | XP for |
|---|---|
| **Makers** (every workstation) | every recipe: **10 + 2 × its level** (12 XP for a level-1 recipe, 70 at level 30, 110 at level 50); the one exception is the Carpenter's Auction House (level 15, 36 XP) |
| **Fisher** | every Cruise catch (more for a bigger one), a bonus for the first of each kind, every Sea King hooked and every Sea King killed |
| **Hunter** | every creature caught (a rare variant pays more), a bonus for the first of each kind, the Tannery's recipes; from level 30, every beast of Mine Mine no Mi hunted with a weapon, with a bonus for the first of each kind |
| **Farmer** | every ripe crop harvested (half of 5 + the crop's level), every fruit picked (half of 4 + the tree's level); a Fine or Superb harvest pays more, a plant far under your level pays less |
| **Miner** | breaking ores with the right pickaxe, every find that turns up in the rock, the Masonry's recipes |
| **Lumberjack** | every log felled from a standing, naturally grown tree (1 for ordinary wood, 2 for a fruit tree, 3 Kuuigosu, 4 Burning Tree, 6 Adam), 1 for planting a sapling; placed logs pay nothing |
| **Merchant** | 1 XP for every 10 Belly of sales to Cruise's merchants or at the Auction House; every treasure dug up (100, 400 or 1 200 by the map's grade) |
| **Navigator** | 2 for each chunk never visited, 25 for each new biome in the Log Book, 50 for each new kind of place, 20 for drawing a Sea Chart, 40 for calibrating an Eternal Pose, the Chart Table's recipes |
| **Musician** | writing scores, and playing them: 10 + the tune's level + 10 for each crewmate who hears it (up to 8) |

The [Bestiary and Log Book](bestiary-and-logbook.md) also pay each time you complete a further tenth of one of their sections: Belly to anyone, plus XP in the matching trade if you practise it (50, 100, 150, 250, 400, 600, 900, 1 400, 2 200, then 6 000 XP).

### XP boosts

- Most Cruise **dishes** give an *Appetite* for 10 minutes: +15 %, +30 % or +45 % XP in one trade (the harder the dish, the bigger the boost). Only one Appetite at a time. See the [Cook](trades/cook.md).
- The Musician's ***Craftsman's Song*** gives +5 %, +10 % or +20 % XP in **every** trade (tiers I, II, III), on top of a meal's Appetite. See the [Musician](trades/musician.md).
- A night in a town's inn leaves you **Rested**: +10 % XP in **every** trade until the next dusk, on top of a meal's Appetite. See [Towns](towns.md).

## The professions book

The trades appear in the professions screen, drawn as Mine Mine no Mi's open book. Click a trade to open its page: its **Talents** button, with the points you have left to spend, and everything it **unlocks** level by level, every recipe included. The Fisher's, Hunter's and Miner's pages also list every fish, creature and find in the rock at the level it needs.

- On the Fisher's and Hunter's pages, a **Bestiary** button opens the Bestiary.
- On the Navigator's page, a **Log Book** button opens the Log Book.
- On every trade's page, a **Guide** plank opens the Cruise Guide at that trade's chapter.
- The Farmer's bonus harvest and the Merchant's price and auction bonuses show their **current** values, so they grow as you level.

## The Cruise Guide

The **Cruise Guide** is a book that says where to start. Every player is handed one, once, the next time they come into the world.

- Its first pages list the chapters: one for each of the fourteen trades, and others on getting started, Solo and Crew, trade, the collections, the villages and what happens out in the world.
- Open a chapter and its sections are listed on the left page (for a trade: what it is, how to start, what pays, what comes later). The one you click is told on the right page, with the bench's recipe drawn where there is one.
- It opens again where you closed it.
- If you lose it, a Book and a sheet of Paper make another at a crafting table.

A server can choose not to hand the guide out (`guide` in `inocruise-common.toml`, see [Configuration](configuration.md)).

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
- **Drinking it** opens a book, "Choose a new trade": every trade on the left (yours greyed out), the chosen trade's icon on the right (and, for the Farmer and the Merchant, the bonuses that grow with their level), and in red: *"You will forget everything: every trade, yours included, goes back to level 0."* The button asks twice ("Become …", then "Confirm: forget all").
- **The cost**: on confirmation, **all your trade XP is wiped** (every trade, not only yours) and you take up the new trade from the start. The potion is used up only then: close the book instead and you keep it.
- In a **Solo** world there is nothing to forget: the recipe is removed, and a potion that still turns up cannot be drunk.

## Titles

Every trade gives a **title** at levels **25, 50, 75 and 100**, the last one a nod to the story. Wear the one you like from the **Titles** plank of the character screen, and it shows after your name in the player list, like "Steve - Chef of the Baratie". The screen lists every title by category: the ones you have, the one you wear, and how to earn the others. Click a title to wear it, click it again to take it off.

| Trade | 25 | 50 | 75 | 100 |
|---|---|---|---|---|
| [Fisher](trades/fisher.md) | Angler | Seasoned Angler | Deep-Sea Angler | **Sea King Angler** |
| [Hunter](trades/hunter.md) | Tracker | Trapper | Big Game Hunter | **King of the Beasts** |
| [Farmer](trades/farmer.md) | Planter | Grower | Orchard Keeper | **Keeper of the Tangerine Grove** |
| [Cook](trades/cook.md) | Galley Hand | Line Cook | Sous-Chef | **Chef of the Baratie** |
| [Inventor](trades/inventor.md) | Tinkerer | Mechanic | Engineer | **Genius of Egghead** |
| [Chemist](trades/chemist.md) | Herbalist | Apothecary | Physician | **Doctor of Drum Island** |
| [Miner](trades/miner.md) | Digger | Prospector | Master Miner | **Kairoseki Delver** |
| [Lumberjack](trades/lumberjack.md) | Woodcutter | Feller | Master Forester | **Feller of the Adam Tree** |
| [Carpenter](trades/carpenter.md) | Joiner | Shipwright | Master Shipwright | **Galley-La Foreman** |
| [Blacksmith](trades/blacksmith.md) | Striker | Smith | Master Smith | **Swordsmith of Wano** |
| [Merchant](trades/merchant.md) | Peddler | Trader | Wholesaler | **Golden Emperor** |
| [Tailor](trades/tailor.md) | Stitcher | Clothier | Master Tailor | **Couturier of the Grand Line** |
| [Navigator](trades/navigator.md) | Wayfinder | Pilot | Chartmaker | **Mapmaker of the World** |
| [Musician](trades/musician.md) | Busker | Minstrel | Virtuoso | **Soul King** |

Reaching level 100 in a trade is also a challenge advancement, named after its title.

Two more titles are won out in the world: **Golden Ladle**, for taking the gold at the floating restaurant's cooking contest (see the [Cook](trades/cook.md#the-cooking-contest)), and **Golden Hook**, for taking the gold at a fishing tournament (see the [Fisher](trades/fisher.md#schools-storms-and-tournaments)).

## Talents

Since 0.5.0 every trade has a **web of talents** instead of perks by level. You choose your own way through it, so two masters of one trade are not the same.

- **Points.** Every 5 levels in a trade give you **one talent point** in that trade: 10 at level 50, 20 at level 100. A level lost takes no talent back.
- **The screen.** Open it with the **Talents** button on the trade's page of the trades book, or with the **Talents** key (**J** by default, in AkumaLib's part of the Controls), which opens the web of the trade you read last. Drag the web with the mouse and zoom with the wheel. Click a talent to read it on the right, where a button spends a point on it.
- **Taking a talent.** Each costs **one point**. You can take a talent that starts the web, or one linked to a talent you already have.
- **Three kinds.** **Small** talents give a little and come several times: their values add up. **Major** talents do something new. **Ability** talents give a combat ability.
- **Only in a trade you practise.** In Crew mode, the talents of a trade you do not practise give nothing.
- **Points back.** A point stays spent. A [Potion of Second Thoughts](trades/chemist.md#the-potion-of-second-thoughts) (made by a Chemist of level 20) gives back every point of **one** trade, to spend again.
- **Players from before 0.5.0.** The perks by level are gone. The first time you play 0.5.0, your points are put for you on the talents that took the place of the perks you had. Each trade's page says which.

Two bonuses still grow with the level and are no talents: the Farmer's [bonus harvest](trades/farmer.md#the-bonus-harvest) and the Merchant's [prices and Auction House terms](trades/merchant.md#what-grows-with-your-level). The trades book shows them with their current values.

Each trade's page lists every talent of its web, what it gives and what it is linked to.

### Combat abilities

The webs hold **44 combat abilities**, three or four a trade. Taking an ability talent puts its ability in the **Profession** tab of Mine Mine no Mi's abilities screen: place it on your bar yourself. A trade's abilities cost nothing from your bag, but most ask for the trade's tool in hand or in your bag. Each trade's small "Fighting" talents make its abilities hit harder. Giving the talent back (with the potion) takes the ability off your list and your bar.

For operators, each trade's abilities are a group of Mine Mine no Mi's `/ability unlock_group`: `inocruise:fisher`, `inocruise:hunter`, `inocruise:farmer`, `inocruise:cook`, `inocruise:inventor`, `inocruise:chemist`, `inocruise:miner`, `inocruise:lumberjack`, `inocruise:carpenter`, `inocruise:blacksmith`, `inocruise:merchant`, `inocruise:tailor`, `inocruise:navigator` and `inocruise:musician`. An ability given by a command stays, whatever the player's talents.

Damage is on the base mod's scale, as in the ability screen. The trade's page has each ability's range.

| Ability | Trade | Needs | Cooldown | Damage |
|---|---|---|---|---|
| **Hammer Blow** | [Blacksmith](trades/blacksmith.md#combat-abilities) | a weapon forged by a Blacksmith in hand | 10 s | 60 |
| **Sunder** | [Blacksmith](trades/blacksmith.md#combat-abilities) | a weapon forged by a Blacksmith in hand | 14 s | 35 |
| **Tempered Guard** | [Blacksmith](trades/blacksmith.md#combat-abilities) | a weapon forged by a Blacksmith in hand | 20 s | — |
| **Mallet Swing** | [Carpenter](trades/carpenter.md#combat-abilities) | — | 10 s | 35 |
| **Nail Shot** | [Carpenter](trades/carpenter.md#combat-abilities) | — | 8 s | 30 |
| **Quick Repair** | [Carpenter](trades/carpenter.md#combat-abilities) | — | 30 s | — |
| **Acid Flask** | [Chemist](trades/chemist.md#combat-abilities) | Experiment Equipment in your bag | 12 s | 25 |
| **Field Dressing** | [Chemist](trades/chemist.md#combat-abilities) | Experiment Equipment in your bag | 25 s | — |
| **Smoke Screen** | [Chemist](trades/chemist.md#combat-abilities) | Experiment Equipment in your bag | 15 s | — |
| **Flambe** | [Cook](trades/cook.md#combat-abilities) | — | 10 s | 30 |
| **Spice Cloud** | [Cook](trades/cook.md#combat-abilities) | — | 12 s | 20 |
| **Crew Meal** | [Cook](trades/cook.md#combat-abilities) | — | 30 s | — |
| **Reap** | [Farmer](trades/farmer.md#combat-abilities) | a hoe in hand | 9 s | 35 |
| **Thorn Patch** | [Farmer](trades/farmer.md#combat-abilities) | a hoe in hand | 12 s | 25 |
| **Hay Maker** | [Farmer](trades/farmer.md#combat-abilities) | a hoe in hand | 10 s | 50 |
| **Hook Shot** | [Fisher](trades/fisher.md#combat-abilities) | a fishing rod in hand | 8 s | 20 |
| **Big Catch** | [Fisher](trades/fisher.md#combat-abilities) | a fishing rod in hand | 15 s | 50 / 25 |
| **Line Snare** | [Fisher](trades/fisher.md#combat-abilities) | a fishing rod in hand | 14 s | 10 |
| **Harpoon Throw** | [Fisher](trades/fisher.md#combat-abilities) | — | 10 s | 45 / 67.5 |
| **Net Throw** | [Hunter](trades/hunter.md#combat-abilities) | a bug net in hand | 14 s | 10 |
| **Hunter's Mark** | [Hunter](trades/hunter.md#combat-abilities) | — | 30 s | — |
| **Snap Trap** | [Hunter](trades/hunter.md#combat-abilities) | — | 20 s | 30 |
| **Hornet Swarm** | [Hunter](trades/hunter.md#combat-abilities) | — | 25 s | 45 |
| **Shock Prod** | [Inventor](trades/inventor.md#combat-abilities) | — | 10 s | 40 |
| **Magnet Pull** | [Inventor](trades/inventor.md#combat-abilities) | — | 14 s | — |
| **Jet Dash** | [Inventor](trades/inventor.md#combat-abilities) | — | 12 s | — |
| **Timber** | [Lumberjack](trades/lumberjack.md#combat-abilities) | an axe in hand | 12 s | 60 |
| **Whirling Axe** | [Lumberjack](trades/lumberjack.md#combat-abilities) | an axe in hand | 10 s | 30 |
| **Axe Throw** | [Lumberjack](trades/lumberjack.md#combat-abilities) | an axe in hand | 8 s | 35 |
| **Golden Bulwark** | [Merchant](trades/merchant.md#combat-abilities) | — | 45 s | — |
| **Coin Toss** | [Merchant](trades/merchant.md#combat-abilities) | — | 8 s | 25 |
| **Bribe** | [Merchant](trades/merchant.md#combat-abilities) | — | 20 s | — |
| **Ground Breaker** | [Miner](trades/miner.md#combat-abilities) | a pickaxe in hand | 12 s | 35 |
| **Pick Strike** | [Miner](trades/miner.md#combat-abilities) | a pickaxe in hand | 9 s | 55 |
| **Blast Rock** | [Miner](trades/miner.md#combat-abilities) | a pickaxe in hand | 12 s | 40 |
| **Sour Note** | [Musician](trades/musician.md#combat-abilities) | an instrument | 9 s | 25 |
| **Reprise** | [Musician](trades/musician.md#combat-abilities) | an instrument | 60 s | — |
| **Dissonance** | [Musician](trades/musician.md#combat-abilities) | an instrument | 14 s | 20 |
| **Thunder Call** | [Navigator](trades/navigator.md#combat-abilities) | a Barometer in your bag | 15 s | 30 |
| **Gust** | [Navigator](trades/navigator.md#combat-abilities) | a Barometer in your bag | 10 s | 20 |
| **Mirage** | [Navigator](trades/navigator.md#combat-abilities) | a Barometer in your bag | 30 s | — |
| **Patch Up** | [Tailor](trades/tailor.md#combat-abilities) | — | 30 s | — |
| **Thread Bind** | [Tailor](trades/tailor.md#combat-abilities) | — | 12 s | 20 |
| **Needle Rain** | [Tailor](trades/tailor.md#combat-abilities) | — | 9 s | 25 |

## Advancements

Cruise has **200 advancements** on **15 tabs**: a main tab and one per trade.

- Each trade's tab opens at **level 1** in that trade and holds one level milestone, **Apprentice** (Apprentice Fisher, Apprentice Cook…) at level 5. Everything else is about doing things: a recipe made, a species caught, a dish eaten, a tree felled.
- Each trade's tab also holds one **challenge for level 100**, named after the trade's top title (Chef of the Baratie, Soul King...).
- The main tab's **Jack of All Trades** asks for level 5 in all fourteen trades, so it can only be earned in Solo mode.
- Notable challenges: Naturalist (catch every creature), Gourmet (taste 26 of the dishes), King of the Sea (kill a Sea King), All That Is Gold (land the Golden Whale), The Tree That Cannot Be Chopped Down (fell the Adam), SUPER! (a boat of Adam wood), Yohohoho! (forge the Soul Solid), Rumble! (a Rumble Ball), Legendary Treasure, Full House (play for three crewmates or more).

# Cruise Cruise no Mi

![](../../assets/icons/cruise.png){ .mod-icon }

**Cruise Cruise no Mi** brings the professions and the island life of *One Piece: Unlimited Cruise 2* to [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod): fourteen trades to learn, each with its workstation, its perks and its advancements. Fish the seas down to the Sea Kings, net the island's creatures, cook the game's dishes, forge the weapons nobody could make, sew the Straw Hats' outfits, build your crew a boat - and sell it all for Belly. Names, recipes and art follow the game.

| | |
|---|---|
| Version documented | **0.1.0** |
| Mod id | `inocruise` |
| Download | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/cruise-cruise-no-mi) · [0.1.0](https://www.curseforge.com/minecraft/mc-mods/cruise-cruise-no-mi/files/8980720) · [changelog](changelog.md) |

## Requirements

| Mod | Version |
|---|---|
| Minecraft | 1.20.1 |
| Forge | 47 or later |
| [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod) | 0.11.5 |
| [AkumaLib](../../akumalib/index.md) | 2.7.0 or later |
| JEI or EMI | optional, recommended: every workstation, fish, creature and find shows in them |

Client **and** server.

## Solo or Crew

- **Solo** (single player): every trade is yours.
- **Crew** (dedicated servers): each player **chooses one trade** in Mine Mine no Mi's character creator, and needs the others. The Fisher's catch goes to the Cook, the Miner's ore to the Blacksmith, the Hunter's creatures to the Chemist.

The mode is AkumaLib's setting, in the world's `serverconfig/akumalib-server.toml`. A **Potion of Forgetting** lets a Crew player change trade, starting over.

## The fourteen trades

| Trade | Workstation | What it does |
|---|---|---|
| **[Fisher](trades/fisher.md)** | - | 37 fish with their sizes, by biome and depth, down to the lava. Better rods. The **Sea Kings**. |
| **[Hunter](trades/hunter.md)** | Tannery | Some thirty creatures, caught with the net or in traps. Leather, bait, lures. |
| **[Farmer](trades/farmer.md)** | - | Seven fruit trees, plantations, golden orchards in the sky. |
| **[Cook](trades/cook.md)** | Kitchen | The game's 29 dishes, in three qualities, each with a meal buff. |
| **[Inventor](trades/inventor.md)** | Workshop | Reels, sieves, nets, traps and their parts, dials, the Clima-Tacts, instruments. |
| **[Chemist](trades/chemist.md)** | Laboratory | Remedies, powders and battle balls, up to the Rumble Ball. |
| **[Miner](trades/miner.md)** | Masonry | Finds in the rock, from Iron Scrap to diamonds. |
| **[Lumberjack](trades/lumberjack.md)** | - | The story's trees: the Kuuigosu, the Burning Tree, the colossal Treasure Tree Adam. |
| **[Carpenter](trades/carpenter.md)** | Shipyard | Boats of four hulls and four shapes, hull parts, lockers, the Auction House. |
| **[Blacksmith](trades/blacksmith.md)** | Forge | The base mod's weapons nobody could make, up to Brook's Soul Solid. |
| **[Tailor](trades/tailor.md)** | Sewing Table | A hundred hats, capes and masks, every character outfit, the boats' sails. |
| **[Merchant](trades/merchant.md)** | - | Better prices, contracts, the Auction House, treasure hunts. |
| **[Navigator](trades/navigator.md)** | Chart Table | Log Pose, Barometer, Sea Charts, the Eternal Pose, a log book of the world. |
| **[Musician](trades/musician.md)** | Music Stand | Scores played on a flute, a violin or a guitar, to buff the whole crew. |

Every trade levels from 1 to 100, with **perks** along the way. Its page in the profession book (**K**) shows what each level unlocks. How levels, XP, Solo and Crew work: [Trades and levels](trades-and-levels.md). A server can make any trade level faster or slower: see [Configuration](configuration.md).

## Across the trades

- **Five [merchants](merchants-and-contracts.md)** come to villages and the wild - the Fishmonger, the Hunting Merchant, the Travelling Cook, the Prospector and the Materials Trader - and buy what the trades make, for Belly. Each brings **contracts** that pay above the market.
- **The [Auction House](auction-house.md)**: one market for the whole server.
- **[Treasure hunts](treasure-hunts.md)**: torn maps in chests, in fishing junk and on the merchants' stalls. A Merchant deciphers them; the X leads to a chest, and now and then to a Devil Fruit box.
- **The [Bestiary and the log book](bestiary-and-logbook.md)**: every fish, creature, land and place you find, with rewards as you fill them.
- **[Boats](boats.md)** of four hulls and four shapes, built by the Carpenter and rigged by the Tailor.
- **185 advancements**, a tab per trade, and Jack of All Trades for whoever reaches level 5 in all fourteen.

!!! note "Some of the base mod's recipes move to the trades"
    Its weapons (Jitte, Mace, Pipe, Scissors, Cannon, bullets, handcuffs) are made by the **Blacksmith**, the Clima-Tacts by the **Inventor**, the Umbrella, Medic Bag and Flag by the **Tailor**. A server can put them back on the crafting table: see [Configuration](configuration.md).

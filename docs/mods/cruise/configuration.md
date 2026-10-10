# Configuration

Cruise's own settings are in **`config/inocruise-common.toml`**, created the first time the game starts with the mod. The trades' levels and the Solo or Crew mode are **AkumaLib's**, per world.

## `recipes`

| Setting | Default | What it does |
|---|---|---|
| `takeOverBaseRecipes` | `true` | Mine Mine no Mi's own recipes for its weapons, the Clima-Tacts, the Umbrella, the Medic Bag and the Flag are taken off the crafting table and made by the trade that owns them. `false` keeps the base mod's crafting as it was; the trades still make them too. Takes effect on the next `/reload` or world load. |
| `keepBaseRecipes` | `[]` | Base mod items whose crafting-table recipe is kept even while the takeover is on, one by one, for example `["mineminenomi:bullet", "mineminenomi:clima_tact"]`. |

## `villages`

| Setting | Default | What it does |
|---|---|---|
| `withVanillaVillages` | `false` | Whether Minecraft's own villages, with their villagers, also generate beside Cruise's [villages](villages.md). Off by default: a world has Cruise's villages only, which grow in the same lands, each in its land's look, and no vanilla village starts in newly explored land. Villages already generated stay. `true` gives both kinds: the villagers and their trades, the iron golems, the raids; where a vanilla village starts, Cruise's village nearby gives way to it. Read when the server or the world starts. |
| `monstersInVillages` | `false` | Whether monsters spawn in Cruise's [villages and towns](villages.md#no-monsters). Off by default: no hostile mob appears naturally on the ground of a living village or town, and no phantom comes for a player who stands in one. Monsters still walk in from outside. Set it to `true` and villages are as any other ground. (Since 0.4.1.) |
| `villageDamage` | `MEND` | What happens to the blocks of a Cruise village. `MEND`: a village can be damaged, by abilities, explosions, fire or by hand, and puts itself back block by block once it has been left in peace for three minutes; what players build in it is cleared away and handed back to them, and breaking its blocks by hand is a crime after two warnings a day. `FORBID`: on top of that, nothing can be broken or built in a village by hand, by an explosion or by an ability. `NOTHING`: villages are not protected at all, and what is broken stays broken. A creative player is outside these rules. What a command changes (`/setblock`, `/fill`) is mended too: set it to `NOTHING` while editing a village by commands. |

!!! note "`vanillaVillages` is no longer read"
    Up to 0.3.1 this setting was called `vanillaVillages` and was `true` by default. Since 0.4.0 it is `withVanillaVillages`, `false` by default. The old line may still be in a file written by an earlier version: it does nothing any more. To keep Minecraft's villages, set `withVanillaVillages = true`.

## `guide`

| Setting | Default | What it does |
|---|---|---|
| `givenAtFirstJoin` | `true` | Whether every player is handed a Cruise Guide, once: the first time he comes into the world, or the next time in a world begun before the guide existed. With `false` nobody is handed one; it is still made from a book and paper, and still opens from every trade's page. |

## `merchants`

| Setting | Default | What it does |
|---|---|---|
| `tryEveryTicks` | `6000` (5 minutes) | How often each merchant gets one try at coming to a player (200 to 1,000,000). |

Then one section per merchant - `fishmonger`, `huntingMerchant`, `travellingCook`, `prospector`, `materialsTrader`:

| Setting | Default | What it does |
|---|---|---|
| `inVillages` | `true` | Whether he comes to a village a player is in. |
| `villageChance` | `0.35` | The chance he comes, at each try, to a player in a village. |
| `inTheWild` | `true` | Whether he also wanders the wild, near a player out under the open sky and away from villages. He leaves once nobody is within 200 blocks. |
| `wildChance` | `0.15` | The chance he comes, at each try, to a player in the wild. Only one merchant at a time comes to a player in the wild. |

## `auctionHouse`

| Setting | Default | What it does |
|---|---|---|
| `listingFee` | `0.02` (2 %) | The share of the asking price paid to list a lot, not returned (0 to 0.5). A Merchant pays less. |
| `daysUp` | `30` | How many real days a lot stays up before it comes back to its seller (1 to 365). |
| `maxListings` | `10` | How many lots a player may have up at once (1 to 1000). |

## Village events

One section for each of the [village events](village-events.md), with the same four settings. Days are in-game days (one day = 20 real minutes); the wait between two events of a kind is drawn anew each time, between the two numbers.

| Setting | `concert` | `fever` | `swordsmith` | `fishingTournament` | What it does |
|---|---|---|---|---|---|
| `enabled` | `true` | `true` | `true` | `true` | Whether the event comes at all. |
| `leastDaysBetween` | `5` | `7` | `8` | `6` | The fewest days from one to the next (1 to 365). |
| `mostDaysBetween` | `8` | `10` | `12` | `9` | The most days from one to the next (1 to 365). |
| `stayHours` | `24` | `24` | `48` | `24` | How many in-game hours it lasts (1 to 720): the stage stays up, the fever runs if nobody cures it, the swordsmith stays, the judge stays on the quay. |

## Events at sea

One section for each of the [events at sea](events-at-sea.md#at-sea). Days are in-game days (one day = 20 real minutes, one in-game hour = 50 real seconds); the wait between two events of a kind is drawn anew each time, between the two numbers. Everywhere, the days go from 1 to 365 and the hours from 1 to 720.

`merchantShip`:

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether the merchant ship comes at all. |
| `leastDaysBetween` | `4` | The fewest days from one ship to the next. |
| `mostDaysBetween` | `7` | The most days from one ship to the next. |
| `stayHours` | `24` | How many in-game hours it stays at anchor (24 = one day). |

`seaKing`:

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether a Sea King surfaces at all. |
| `leastDaysBetween` | `7` | The fewest days from one to the next. |
| `mostDaysBetween` | `10` | The most days from one to the next. |
| `stayHours` | `48` | How many in-game hours it stays up (48 = two days). |

`wreck`:

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether wrecks drift in at all. |
| `leastDaysBetween` | `5` | The fewest days from one to the next. |
| `mostDaysBetween` | `8` | The most days from one to the next. |
| `stayHours` | `24` | How many in-game hours before it sinks. |
| `guardianChance` | `0.25` | The chance a Sea King guards the wreck (0.25 = one wreck in four). |

`restaurant` - [the floating restaurant](events-at-sea.md#the-floating-restaurant):

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether the floating restaurant comes at all. |
| `leastDaysBetween` | `9` | The fewest days from one call to the next. |
| `mostDaysBetween` | `13` | The most days from one call to the next. |
| `stayHours` | `24` | How many in-game hours it stays at anchor (24 = one day). |

`ghostShip` - [the fog of the Florian Triangle](events-at-sea.md#the-fog-of-the-florian-triangle):

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether the fog falls at all. |
| `leastDaysBetween` | `7` | The fewest days from one fog to the next. |
| `mostDaysBetween` | `10` | The most days from one fog to the next. |
| `brutes` | `2` | How many of Mine Mine no Mi's pirate brutes guard the ghost ship (0 to 8). |
| `grunts` | `5` | How many of Mine Mine no Mi's pirate grunts guard the ghost ship (0 to 16). |

The fog has no `stayHours`: it falls at nightfall and lifts at dawn.

`seaStorm` - [a storm at sea](events-at-sea.md#a-storm-at-sea):

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether storms break at sea at all. |
| `leastDaysBetween` | `4` | The fewest days from one storm to the next. |
| `mostDaysBetween` | `7` | The most days from one storm to the next. |
| `leastHours` | `4` | The fewest in-game hours a storm rages. |
| `mostHours` | `6` | The most in-game hours a storm rages. |
| `barometerHours` | `12` | How many in-game hours before it breaks the Barometer knows of it (12 = half a day; 0 to 720). |

`shipInDistress` - [a ship in distress](events-at-sea.md#a-ship-in-distress):

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether ships in distress come at all. |
| `leastDaysBetween` | `8` | The fewest days from one to the next. |
| `mostDaysBetween` | `12` | The most days from one to the next. |
| `stayHours` | `24` | How many in-game hours before she sinks (24 = one day). |

`schoolOfFish` - [a school of fish](events-at-sea.md#a-school-of-fish):

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether schools of fish pass at all. |
| `leastDaysBetween` | `3` | The fewest days from one school to the next. |
| `mostDaysBetween` | `5` | The most days from one school to the next. |
| `stayHours` | `12` | How many in-game hours a school passes for (12 = half a day, 10 real minutes). |
| `fish` | `40` | How many fish a school holds, for everyone who fishes in it: with the last of them it scatters (1 to 10,000). |

## Events on land

One section for each of the [events on land](events-at-sea.md#on-land), counted as the events at sea are.

`creatureMigration` - [a creature migration](events-at-sea.md#a-creature-migration):

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether creatures migrate at all. |
| `leastDaysBetween` | `5` | The fewest days from one migration to the next. |
| `mostDaysBetween` | `8` | The most days from one migration to the next. |
| `stayHours` | `24` | How many in-game hours a migration stays (24 = one day). |
| `creatures` | `30` | How many creatures a migration holds, for everyone who hunts in it: with the last one caught it is over (1 to 10,000). |

`fallingStar` - [a falling star](events-at-sea.md#a-falling-star):

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether stars fall at all. |
| `leastDaysBetween` | `15` | The fewest days from one star to the next. |
| `mostDaysBetween` | `20` | The most days from one star to the next. |
| `stayHours` | `24` | How many in-game hours the meteorite lies there (24 = one day). |

A disabled event that is already running still ends on time. Operators can list, start and stop events with AkumaLib's `/akumalib events` command: see AkumaLib's [world events page](../../akumalib/utilities/world-events.md#for-operators).

## The trades' levels (AkumaLib)

Per world, in **`<world>/serverconfig/akumalib-server.toml`**:

- `professionMode`: `AUTO` (Solo in single player and LAN, Crew on a dedicated server), `SOLO` or `CREW`;
- `xpMultiplier`: how fast every trade levels (`2.0` twice as fast, `0.5` half as fast);
- `curves`: one line per trade, with how much each level costs and a speed of its own, for example `"inocruise:fisher = 20, 1.25, 1"`.
- `deathXpLoss`: what a death costs the trades (AkumaLib 2.10.0 or later): `KEEP` (nothing, the default), `PERCENT` (`deathXpLossPercent` of every trade's XP, 10 by default, so levels can go down) or `ALL` (every trade back to level 1). The chosen trade and the recipes learned are always kept.

Every trade is already listed there when the world starts, with its usual values. See AkumaLib's [professions page](../../akumalib/professions/index.md#server-settings-curves-and-xp-multipliers) for the details, and [What a death costs](../../akumalib/professions/index.md#what-a-death-costs).

!!! warning "Edit it with the world closed"
    A change made to a world's server config while the game is running is not reliably picked up.

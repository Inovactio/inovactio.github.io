# Configuration

Cruise has two files of settings. The trades' levels and the Solo or Crew mode are **AkumaLib's**, per world.

| File | What is in it |
|---|---|
| **`config/inocruise-common.toml`**, one for the game or the server | [`recipes`](#recipes), `withVanillaVillages` (under [`villages`](#villages)) and [`performance`](#performance) |
| **`serverconfig/inocruise-server.toml`**, in each world's folder | everything else: [the world's own settings](#inocruise-servertoml) (sides, spacing, prosperity, punishment, defence, revival), `villageDamage` and `monstersInVillages`, [`traits`](#traits), [`guide`](#guide), [`merchants`](#merchants), [`auctionHouse`](#auctionhouse), the [village events](#village-events) and the [events at sea](#events-at-sea) and [on land](#events-on-land) |

!!! note "Since 0.7.0 the world settings belong to each world"
    Village damage, monsters in villages, disabled traits, the guide, the merchants, the Auction House and every world event moved from `config/inocruise-common.toml` to each world's `serverconfig/inocruise-server.toml`, with the same section names and keys, so each single player world has its own. What you had set in the common file is **taken over once** by each world, so nothing is lost; after that, set them in the world's file. The old lines in the common file say where they went.

## `recipes`

| Setting | Default | What it does |
|---|---|---|
| `takeOverBaseRecipes` | `true` | Mine Mine no Mi's own recipes for its weapons, the Clima-Tacts, the Umbrella, the Medic Bag and the Flag are taken off the crafting table and made by the trade that owns them. `false` keeps the base mod's crafting as it was; the trades still make them too. Takes effect on the next `/reload` or world load. |
| `keepBaseRecipes` | `[]` | Base mod items whose crafting-table recipe is kept even while the takeover is on, one by one, for example `["mineminenomi:bullet", "mineminenomi:clima_tact"]`. |

## `villages`

`withVanillaVillages` is in `config/inocruise-common.toml`; `monstersInVillages` and `villageDamage` in each world's `serverconfig/inocruise-server.toml` since 0.7.0.

| Setting | Default | What it does |
|---|---|---|
| `withVanillaVillages` | `false` | Whether Minecraft's own villages, with their villagers, also generate beside Cruise's [villages](villages.md). Off by default: a world has Cruise's villages only, which grow in the same lands, each in its land's look, and no vanilla village starts in newly explored land. Villages already generated stay. `true` gives both kinds: the villagers and their trades, the iron golems, the raids; where a vanilla village starts, Cruise's village nearby gives way to it. Read when the server or the world starts. |
| `monstersInVillages` | `false` | Whether monsters spawn in Cruise's [villages and towns](villages.md#no-monsters). Off by default: no hostile mob appears naturally on the ground of a living village or town, and no phantom comes for a player who stands in one. Monsters still walk in from outside. Set it to `true` and villages are as any other ground. (Since 0.4.1.) |
| `villageDamage` | `MEND` | What happens to the blocks of a Cruise village. `MEND`: a village can be damaged, by abilities, explosions, fire or by hand, and puts itself back block by block once it has been left in peace for three minutes; what players build in it is cleared away and handed back to them, and breaking its blocks by hand is a crime after two warnings a day. `FORBID`: on top of that, nothing can be broken or built in a village by hand, by an explosion or by an ability. `NOTHING`: villages are not protected at all, and what is broken stays broken. A creative player is outside these rules. What a command changes (`/setblock`, `/fill`) is mended too: set it to `NOTHING` while editing a village by commands. |

!!! note "`vanillaVillages` is no longer read"
    Up to 0.3.1 this setting was called `vanillaVillages` and was `true` by default. Since 0.4.0 it is `withVanillaVillages`, `false` by default. The old line may still be in a file written by an earlier version: it does nothing any more. To keep Minecraft's villages, set `withVanillaVillages = true`.

## `traits`

| Setting | Default | What it does |
|---|---|---|
| `disabledTraits` | `[]` | [Traits](traits.md) turned off, by id, for example `["inocruise:blind"]`. A trait turned off is never drawn for a new character, and does nothing on one who has it. They keep it: it works again once turned back on. An id that names no trait is written in the log. (Since 0.6.0; a world setting since 0.7.0.) |

## `guide`

| Setting | Default | What it does |
|---|---|---|
| `givenAtFirstJoin` | `true` | Whether every player is handed a Cruise Guide, once: the first time he comes into the world, or the next time in a world begun before the guide existed. With `false` nobody is handed one; it is still made from a book and paper, and still opens from every trade's page. |

## `inocruise-server.toml`

Since 0.6.0 Cruise also has a file per world, **`serverconfig/inocruise-server.toml`** in the world's folder. Since 0.7.0 it also holds every section this page marks as a world setting.

| Section | Setting | Default | What it does |
|---|---|---|---|
| `factions` | `civilianStart` | `true` | Every new player starts as a [civilian](villages.md#playing-a-civilian) and earns a side by what they do; the character creator offers no side. `false` gives the choice of a side back to the character creator. |
| `villages` | `spacing` | `24` | How many chunks apart [villages and towns](villages.md#finding-one) stand (12 to 100). Saved with the world when it is made: changing it later does nothing to that world. A world made before 0.6.0 keeps 34. |
| `villages` | `townShare` | `33` | Of every hundred places, how many are [towns](towns.md) (0 to 100). Saved with the world when it is made, like `spacing`. A world made before 0.6.0 keeps 25. |

### `prosperity`

How the villages [grow with their prosperity](villages.md#prosperity-a-village-grows) (since 0.7.0).

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether villages grow: points earned and lost, new houses, workshops and town buildings that build themselves, walls once a village is a town. `false`: every place stays as it was made. |
| `prosperous` | `30` | The points a village is Prosperous at: the quarters' houses and new inhabitants, the barracks and its guards. |
| `flourishing` | `80` | The points it is Flourishing at: the missing trades' workshops, the inn, the warehouse and the market hall. |
| `town` | `150` | The points it is a Town at: its walls, the bank, the bounty office, the colosseum and the plots for sale. A town the world made starts here. |
| `perDay` | `1` | Points for each in-game day nobody harmed it. |
| `tradeBelly` | `1000` | How many Belly of trade with its merchants and stalls earn it a point. |
| `perOrder` | `5` | Points for an order or an errand done there. |
| `perRaid` | `10` | Points for a raid beaten back. |
| `giftBelly` | `500` | How many Belly given at its town hall earn it a point. |
| `perBlow` | `5` | Points a blow on one of its people costs it. A murder costs a whole step. |
| `perBlock` | `1` | Points a block of it broken by hand costs it. |
| `perRaidLost` | `20` | Points a raid lost costs it. |

### `punishment`

How [village killers are hunted](villages.md#village-killers-are-hunted) (since 0.7.0).

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether wiping out villages is punished harder. `false`: a village wiped out costs its bounty alone, as before 0.7.0. |
| `huntAfter` | `2` | How many villages a player wipes out, each within `forgetDays` of the one before, before someone is sent after them (1 to 20). The vice admiral's squad grows with each village after that. |
| `forgetDays` | `30` | After how many in-game days with no village wiped out the count falls back to zero (1 to 365). |
| `bountyMultiplier` | `2.0` | How much the bounty of each further village is multiplied: `2` gives x1, x2, x4, x8... (1 to 10). |
| `banReach` | `1000` | How far, in blocks, the villages around a village wiped out close to its killers. |
| `banDays` | `30` | For how many in-game days they stay closed to them. |
| `huntersChance` | `0.3` | The chance, each time, that bounty hunters come instead of the Marines. A Marine player always gets the hunters. |
| `huntersPerTenMillion` | `0.1` | How much that chance climbs for each 10,000,000 Belly of bounty. |
| `huntersMost` | `0.8` | The highest that chance climbs. |

### `defence`

How [a village defends itself](villages.md#a-village-defends-itself) (since 0.7.0).

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether villages have their own guards, call the Marines, and see their villagers run off from an attacker. |
| `guards` | `2` | How many guards of its own every village has, and a town beside its barracks' own (0 to 4). |
| `aidReach` | `1000` | How far, in blocks, a Marine post or base may stand from a village and still send it help. |
| `aidDelay` | `30` | How many seconds after a villager is killed the Marines land (0 to 600). |

### `revival`

How [a dead village lives again](villages.md#a-dead-village-lives-again) (since 0.7.0).

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether a dead village lives again. `false`: it stays a ruin for good, as before 0.7.0. |
| `days` | `7` | After how many in-game days it is lived in again by itself. |
| `pricePerHead` | `2000` | What bringing it back costs at its notice board, in Belly, for each of the people it was made with. |

To turn off a whole trade, see AkumaLib's `disabledProfessions`: [A trade turned off](trades-and-levels.md#a-trade-turned-off).

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

### Feast days

`feast`, for the [feast day](village-events.md#a-feast-day):

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Whether feast days are held at all. |
| `daysBetween` | `30` | How many in-game days from one feast to the next (5 to 365). |

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

## `performance`

Nothing here changes a world: only when the work is done. Both came with 0.4.2 and are there to be turned off if they ever give trouble.

| Setting | Default | What it does |
|---|---|---|
| `villageSitesAhead` | `true` | The sites of the villages about a player are worked out ahead, on a background thread, before the world gets to them. Off, each is worked out while the land is made, with a pause. |
| `seaSearchesAhead` | `true` | The sea in which a ship's, a wreck's or a Sea King's place is looked for is read on a background thread; the event begins a second or two later. Off, the server stops while it reads, up to a second. |

## The trades' levels (AkumaLib)

Per world, in **`<world>/serverconfig/akumalib-server.toml`**:

- `professionMode`: `AUTO` (Solo in single player and LAN, Crew on a dedicated server), `SOLO` or `CREW`;
- `xpMultiplier`: how fast every trade levels (`2.0` twice as fast, `0.5` half as fast);
- `curves`: one line per trade, with how much each level costs and a speed of its own, for example `"inocruise:fisher = 20, 1.25, 1"`.
- `deathXpLoss`: what a death costs the trades (AkumaLib 2.10.0 or later): `KEEP` (nothing, the default), `PERCENT` (`deathXpLossPercent` of every trade's XP, 10 by default, so levels can go down) or `ALL` (every trade back to level 1). The chosen trade and the recipes learned are always kept.

Every trade is already listed there when the world starts, with its usual values. See AkumaLib's [professions page](../../akumalib/professions/levels-and-xp.md#server-settings-curves-and-xp-multipliers) for the details, and [What a death costs](../../akumalib/professions/levels-and-xp.md#what-a-death-costs).

!!! warning "Edit it with the world closed"
    A change made to a world's server config while the game is running is not reliably picked up.

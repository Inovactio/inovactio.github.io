# Configuration

Cruise's own settings are in **`config/inocruise-common.toml`**, created the first time the game starts with the mod. The trades' levels and the Solo or Crew mode are **AkumaLib's**, per world.

## `recipes`

| Setting | Default | What it does |
|---|---|---|
| `takeOverBaseRecipes` | `true` | Mine Mine no Mi's own recipes for its weapons, the Clima-Tacts, the Umbrella, the Medic Bag and the Flag are taken off the crafting table and made by the trade that owns them. `false` keeps the base mod's crafting as it was; the trades still make them too. Takes effect on the next `/reload` or world load. |
| `keepBaseRecipes` | `[]` | Base mod items whose crafting-table recipe is kept even while the takeover is on, one by one, for example `["mineminenomi:bullet", "mineminenomi:clima_tact"]`. |

## `merchants`

| Setting | Default | What it does |
|---|---|---|
| `tryEveryTicks` | `6000` (5 minutes) | How often each merchant gets one try at coming to a player. |

Then one section per merchant - `fishmonger`, `huntingMerchant`, `travellingCook`, `prospector`, `materialsTrader`:

| Setting | Default | What it does |
|---|---|---|
| `inVillages` | `true` | Whether he comes to a village a player is in. |
| `villageChance` | `0.35` | The chance he comes, at each try, to a player in a village. |
| `inTheWild` | `true` | Whether he also wanders the wild, near a player out under the open sky. |
| `wildChance` | `0.15` | The chance he comes, at each try, to a player in the wild. |

## `auctionHouse`

| Setting | Default | What it does |
|---|---|---|
| `listingFee` | `0.02` (2 %) | The share of the asking price paid to list a lot, not returned. A Merchant pays less. |
| `daysUp` | `30` | How many real days a lot stays up before it comes back to its seller. |
| `maxListings` | `10` | How many lots a player may have up at once. |

## The trades' levels (AkumaLib)

Per world, in **`<world>/serverconfig/akumalib-server.toml`**:

- `professionMode`: `AUTO` (Solo in single player and LAN, Crew on a dedicated server), `SOLO` or `CREW`;
- `xpMultiplier`: how fast every trade levels (`2.0` twice as fast, `0.5` half as fast);
- `curves`: one line per trade, with how much each level costs and a speed of its own, for example `"inocruise:fisher = 20, 1.25, 1"`.

Every trade is already listed there when the world starts, with its usual values. See AkumaLib's [professions page](../../akumalib/professions/index.md#server-settings-curves-and-xp-multipliers) for the details.

!!! warning "Edit it with the world closed"
    A change made to a world's server config while the game is running is not reliably picked up.

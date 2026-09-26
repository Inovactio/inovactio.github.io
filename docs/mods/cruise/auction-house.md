# Auction House

The **Auction House** is where players trade with each other. Every Auction House block on the server opens **the same market**: a lot listed at one is bought at any other, by any player, and the seller need not be online when it sells.

| | |
|---|---|
| Made by | the [Carpenter](trades/carpenter.md) at the Shipyard, level 15 (36 XP) |
| Ingredients | 6 planks, 1 book, 2 gold ingots |
| Opens | right-click the counter |

![](icons/auction_house.png){ .item-icon }The block is a wooden counter that faces you when placed. Right-click it to open the market, which has three tabs: **Buy**, **Sell** and **My lots**.

## Buying

The Buy tab has categories: **Everything, Fish, Creatures, Dishes, Minerals, Materials, Equipment, Other**, and a search box. A lot is filed by what a Cruise merchant would buy it as; tools, weapons, armour and anything with durability go under Equipment, the rest under Other.

- For each kind of good and each lot size, you see **only the cheapest lot**, and how many are up.
- A "kind" is the exact item with everything about it: fish of different sizes, dishes of different quality or differently enchanted blades are different kinds.
- You cannot buy your own lot.
- If the lot you were looking at sold and the cheapest price changed, the purchase is refused: "That lot's price has changed: look again".
- What you buy goes to your inventory, or waits for you at the House if your inventory is full.

## Listing a lot

On the Sell tab:

1. Put the goods in the slot.
2. Choose a lot size: **1, 16 or 64**, never more than the item stacks to (a sword goes alone, Ender Pearls by 16).
3. Set the **price of the whole lot**, and press **List**.

The tab shows the cheapest lot of each size already up for those goods, and the fee. Goods left in the slot go back to your inventory when you close the window.

- **Listing fee**: 2 % of your asking price by default, rounded up, at least 1 Belly. It is paid when you list and **never returned**, not even if you take the lot down.
- **Lots up**: 10 at once by default.
- **Duration**: 30 **real** days by default. The clock runs even while the server is off. When the time is up, the lot comes back to you, to be collected.

## My lots and collecting

The My lots tab shows your lots up and how long each has left. **Take down** withdraws one: the goods wait to be collected, and the fee stays paid.

**Collect** gives you the Belly your sales earned and the lots that came back, as much as your Belly cap and inventory allow; the rest keeps waiting, at any Auction House.

When you log in, the Belly your lots earned while you were away is paid at once ("While you were away, your lots sold for … Belly"), and you are told how many lots came back; those you collect at any Auction House.

## For Merchants

A player who practises the [Merchant](trades/merchant.md) trade pays a lower fee, may have more lots up for longer, and from level 1 sees **"Avg. lately"**: the average price per item of the last 20 sales of that kind. Every lot of his that sells pays 1 Merchant XP per 10 Belly of its price.

With the default settings:

| Merchant level | Fee | Lots up | Days up |
|---|---|---|---|
| not a Merchant | 2 % | 10 | 30 |
| 10 | 1.7 % | 12 | 35 |
| 20 | 1.4 % | 14 | 40 |
| 25 | 1.25 % | 15 | 42 |
| 30 | 1.1 % | 16 | 45 |
| 40 | 0.8 % | 18 | 50 |
| 50 | 0.5 % | 20 | 55 |
| 100 | 0.5 % | 30 | 80 |

The fee stops falling at level 50 (a quarter of the normal fee); the extra lots and days keep growing.

## Server settings

A server can change the fee (`listingFee`, 0 to 50 %), the days a lot stays up (`daysUp`, 1 to 365) and the lots a player may have up (`maxListings`, 1 to 1 000), in the `auctionHouse` section. See [Configuration](configuration.md).

# Currency

`AkumaCurrency` reads, gives and takes the base mod's two currencies, **Belly** and **Extol**. They are values stored on the player, not items, so a shop, a reward or a fee goes through the player's stats.

```java
if (AkumaCurrency.take(player, Currency.BELLY, price)) {
    // the player paid: hand over the goods
}

AkumaCurrency.give(player, Currency.BELLY, reward);
long balance = AkumaCurrency.get(player, Currency.BELLY);
```

| Method | Side | Does |
|---|---|---|
| `get(player, currency)` | both | the balance, `0` for an entity without stats |
| `canAfford(player, currency, amount)` | both | whether the balance covers `amount` |
| `getRoom(player, currency)` | both | how much more fits under the cap |
| `give(ServerPlayer, currency, amount[, source])` | server | adds, syncs the client |
| `take(ServerPlayer, currency, amount[, source])` | server | removes **only if the player can afford it**, syncs the client |
| `sync(ServerPlayer)` | server | resends the player's stats after a change made another way |

`source` is the base mod's `StatChangeSource`, and defaults to `STORE`. `give` and `take` return `false`, changing nothing, when the amount is not positive, the player has no stats, or another mod refused the change.

## What the base mod does, and why this class exists

Read from the base mod's bytecode (0.11.5):

- `IEntityStats.alterBelly` / `alterExtol` fire a cancelable `CurrencyEvent` first. Another mod may **refuse the change or change the amount**.
- The balance is then clamped to **0 – 999,999,999**. A debit larger than the balance silently stops at zero, and a credit past the cap is silently lost. That is why `take` checks the balance first; `getRoom` tells you before a large `give`.

!!! danger "The base mod does not sync the client"
    `alterBelly` changes the server's value only. The base mod's own `/belly` command sends the stats packet itself afterwards. Call `IEntityStats` directly and the player keeps seeing their old balance. `AkumaCurrency` syncs on every write; after a direct change, call `AkumaCurrency.sync(player)`.

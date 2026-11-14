# Solo and Crew modes

A server decides whether a player may practise every profession or only one. The setting is `professionMode`, in the world's `serverconfig/akumalib-server.toml`:

| Value | Behaviour |
|---|---|
| `AUTO` (default) | `SOLO` in singleplayer **and on LAN**, `CREW` on a dedicated server |
| `SOLO` | every profession can be practised and levelled |
| `CREW` | one profession per player, or up to `maxTrades` (see below). XP for any other is dropped |

Read the mode in force with `AkumaProfessions.getMode(player)` (or `getMode(server)`), never from the config: `AUTO` is resolved there, and the client gets the resolved value with the rest of the sync.

## `canPractice`: the one check

```java
if (AkumaProfessions.canPractice(player, MyProfessions.COOK.get())) {
    // let the player craft at the kitchen
}
```

`canPractice` is true in Solo mode, and in Crew mode only for the trades the player took. It works on both sides. `addXp` already applies it, so an XP source needs no check of its own. A workstation, a tool or a screen does.

## Choosing and changing

| Method | Does |
|---|---|
| `getChosen(player)` | the first trade taken, if any (his main one) |
| `getTrades(player)` | every trade taken, first one first |
| `choose(ServerPlayer, Profession)` | makes it the chosen one |
| `reset(ServerPlayer)` | clears the choice |

!!! danger "A change resets every profession"
    `choose` and `reset` both set **every profession's XP back to zero**, the first choice included. Both fire the cancelable `ProfessionChangeEvent` first (old and new profession, either may be `null`): cancel it to make a change cost something, such as an item or a visit to an NPC.

In Crew mode, Mine Mine no Mi's **character creator** gets a fourth tab, *Profession*, under Faction, Race and Style: its arrows cycle the registered professions (and Random), and finishing the creation makes the choice (`chooseFirst`). A player who already chose sees theirs, locked.

The choice is saved with the player in both modes, so a server moving from Solo to Crew keeps it. A player with no choice in Crew mode practises nothing until they pick one.

## Several trades (Cruise #1007)

A Crew server may let a player hold more than one trade. Two settings, beside `professionMode`:

| Setting | Default | Does |
|---|---|---|
| `maxTrades` | 1 (1 to 14) | how many trades a player may hold. 1 is one trade per player, as before |
| `nextTradeLevel` | 25 (1 to 100) | the level a player needs in his **last** trade to take the next one |

Solo mode ignores both: every trade is practised there already.

| Method | Does |
|---|---|
| `canTakeNext(player, profession)` | why a next trade would be refused (`NextTrade`), or `OK`. Works on both sides |
| `takeNext(ServerPlayer, Profession)` | adds the trade, **from zero**: its XP and talents are cleared, the other trades are untouched |
| `forget(ServerPlayer, forgotten, replacement)` | puts `replacement` in `forgotten`'s place, both from zero, the others untouched. No level asked |
| `maxTrades(player)`, `nextTradeLevel(player)` | the two settings, from the config on the server, as synced on the client |

`takeNext` and `forget` fire `ProfessionChangeEvent` too (no old profession for `takeNext`).

The professions screen shows a **Take a trade** button once the player may take one: it lists the trades he may take, each with a Choose button that asks for a second click. `/profession choose` takes a next trade as well, under the same rule.

A trade turned off on the server is taken from the players who hold it; a player left with none chooses again.

**Saves.** The first trade is saved under `chosen`, the key of before, and the others under `more_trades`: a player saved before loads with his one trade, his XP and talents as they were, and a player with several trades loaded by an older AkumaLib keeps his first one.

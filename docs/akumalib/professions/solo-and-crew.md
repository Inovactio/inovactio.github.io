# Solo and Crew modes

A server decides whether a player may practise every profession or only one. The setting is `professionMode`, in the world's `serverconfig/akumalib-server.toml`:

| Value | Behaviour |
|---|---|
| `AUTO` (default) | `SOLO` in singleplayer **and on LAN**, `CREW` on a dedicated server |
| `SOLO` | every profession can be practised and levelled |
| `CREW` | one profession per player. XP for any other is dropped |

Read the mode in force with `AkumaProfessions.getMode(player)` (or `getMode(server)`), never from the config: `AUTO` is resolved there, and the client gets the resolved value with the rest of the sync.

## `canPractice`: the one check

```java
if (AkumaProfessions.canPractice(player, MyProfessions.COOK.get())) {
    // let the player craft at the kitchen
}
```

`canPractice` is true in Solo mode, and in Crew mode only for the player's chosen profession. It works on both sides. `addXp` already applies it, so an XP source needs no check of its own. A workstation, a tool or a screen does.

## Choosing and changing

| Method | Does |
|---|---|
| `getChosen(player)` | the chosen profession, if any |
| `choose(ServerPlayer, Profession)` | makes it the chosen one |
| `reset(ServerPlayer)` | clears the choice |

!!! danger "A change resets every profession"
    `choose` and `reset` both set **every profession's XP back to zero**, the first choice included. Both fire the cancelable `ProfessionChangeEvent` first (old and new profession, either may be `null`): cancel it to make a change cost something, such as an item or a visit to an NPC.

In Crew mode, Mine Mine no Mi's **character creator** gets a fourth tab, *Profession*, under Faction, Race and Style: its arrows cycle the registered professions (and Random), and finishing the creation makes the choice (`chooseFirst`). A player who already chose sees theirs, locked.

The choice is saved with the player in both modes, so a server moving from Solo to Crew keeps it. A player with no choice in Crew mode practises nothing until they pick one.

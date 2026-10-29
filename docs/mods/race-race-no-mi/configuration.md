# Configuration

Race Race no Mi's settings live in each world's **`<world>/serverconfig/racenomi-server.toml`**, written the first time the world starts. Every setting is `true` by default, so nothing changes until a server owner turns one off. The server sends its values to each player who joins, so the character creator shows what the server allows.

| Setting | When `false` |
|---|---|
| `giants.giantsSelectable` | The giants are no longer in the character creator. A player who is already a giant stays one. |
| `giants.giantAreaBlocks` | A giant breaks and places one block at a time, as in precision mode, instead of 3x3x3. The zone also follows the base mod's ability griefing setting and protected areas. |
| `giants.giantCouch` | The hay or wool couch does nothing, and a giant can sleep in a normal bed. |
| `skyPeople.skyPeopleSelectable` | The sky people are no longer in the character creator. A player who is already one stays one. |

The size of each race, the creator's size slider and how far the size reaches (damage, knockback in PvP...) are AkumaLib's settings: section `sizeSystem` of `akumalib-server.toml`.

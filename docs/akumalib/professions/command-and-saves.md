# The `/profession` command and what is saved

## The `/profession` command

| Command | Who | Does |
|---|---|---|
| `/profession choose <profession>` | any player, for themselves | takes a **first** profession in Crew mode. Refused in Solo mode, and refused once a profession is chosen: a change goes through an operator or the consumer's own item or NPC |
| `/profession mode` | any player | shows the mode and the player's profession |
| `/profession get <player> <profession>` | operators | shows level and XP |
| `/profession set <player> <profession> <level>` | operators | admin write, no event, no mode check |
| `/profession addxp <player> <profession> <amount>` | operators | goes through `addXp`: events, multipliers and the Crew check apply |
| `/profession reset <player>` | operators | clears the choice and every profession |

Operators means permission level 2.

## What is saved

The XP of each profession is stored on the player, **keyed by profession id**, and survives death, the End portal and relogging. The XP of a profession whose mod was removed is kept, and comes back if the mod does.

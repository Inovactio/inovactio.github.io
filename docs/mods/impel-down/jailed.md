---
# Hidden search keywords: the search weighs them heavily; the page does not show them.
tags:
  - arrest
  - arrested
  - jail
  - surrender
  - sentence
  - escape
  - riot
  - hook
  - depot
  - confiscation
  - bounty
---

# Jailed

## The arrest

A player of the **pirates** or of the **Revolutionary Army** beaten by the Marines is not killed: **the killing blow is stopped**, he is healed, and he wakes up **in a cell** of the nearest prison.

- **Who arrests**: the base mod's Marines (grunts, brutes, snipers, captains, vice admirals), Pacifistas, the tower's own guards, and **players of the Marines or bounty hunters** (that last one can be turned off: `arrest.pvp`).
- **No arrest** for a death in the void, by `/kill`, or by your own hand; a totem saves you first as usual. Nobody is arrested again in the **10 minutes** after getting out.
- Beaten by a guard **inside a tower**: jailed in that tower, on the level you fell on.
- No prison near enough: you die as usual.

A civilian, a Marine or a bounty hunter beaten in the tower is not arrested: he simply dies.

### Which level

By your bounty:

| Bounty | Level |
|---|---|
| under 15,000 | 1 |
| 15,000 | 2 |
| 50,000 | 3 |
| 75,000 | 4 |
| 100,000 | 5 |
| 250,000 or more | 6 |

**A giant** goes to a giants' cell of level 6, whatever his bounty. A datapack can change the thresholds: `data/inoimpel/arrest/level_bounties.json`.

## Giving yourself up

A pirate can surrender to the **Marine recruiter** of [AkumaLib](../../akumalib/index.md) (talk to him): **"Give yourself up"** sends you to a cell for your sentence, without your weapons. A surrendered pirate gets no riot and no hidden hook, but when his time is done **he walks out a civilian**. (The recruiter also offers an amnesty for half your bounty.) The Marines refuse a pirate who ever had a bounty over 500,000, and one still in a crew.

## Sent by an operator

```
/akumalib faction prison send <player> [minutes] [level]
```

jails a pirate for the given minutes, on the given level (1 to 6; by his bounty if not given). `/akumalib faction prison end <player>` lets him out as if his time were done, `/akumalib faction prison lift <player>` lets him out still a pirate.

## In the cell

- **Your gear** goes to **the depot of your level** (the chest is on the level, the chat says which way): only you, or an operator, can open its chest. It cannot be broken, blown up or emptied by a hopper. The server may take only your armour and hotbar, or nothing (`arrest.confiscate`).
- **Kairoseki cuffs** hold you while your cell is shut: **no abilities**, and if you get out of the cell some other way you are put back.
- Shut in your cell, the guards leave you alone, and you neither starve faster on level 3 nor freeze on level 5.

## Your sentence

**2 minutes, plus 1 minute for every 5,000 of bounty, 30 minutes at most**, counted only while you are online. The action bar shows what is left.

When your time is done you are set down where you were taken, **your gear back in its own slots**, your armour on. You stay a pirate (a surrendered one comes out a civilian). The server may turn sentences off (`arrest.sentence`): then only an escape gets you out.

## Escaping

| Way | How |
|---|---|
| **Snatch a key** | Every few minutes (about 3) a jailer of your level comes to your bars on his round, for about 10 seconds. **Hit him** through the bars and you snatch his **cell key**. |
| **A riot** | About every 20 minutes of your time, the prisoners riot: every cell around yours opens, yours too, and the level's alarm goes off. |
| **The hidden hook** | One time in ten, searching your cell, you find a **hook** under a flagstone. Hold it by your door for **3 minutes** and the lock gives way. |
| **A friend** | Someone opens your cell from outside: a cell key, the control desk, a pickaxe. |

Once your cell is open, your cuffs come off and your abilities come back; the chat says *"Your cell is open: get out of the prison to escape!"* — and from then on **the guards hunt you** like any intruder. Your gear is still in the depot: go and take it on your way.

**Out through the great gate** of level 0 and you have escaped: your bounty grows.

| Level | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| Bounty for the escape | 1,000 | 3,000 | 6,000 | 10,000 | 20,000 | 35,000 |

At most **one escape bounty a day** (a Minecraft day): after that, *"No more bounty for an escape today"*.

- **Back in your shut cell** (or killed, or beaten again while loose): you are a prisoner again, and your time goes on.
- Leaving the tower **some other way** than the great gate: you are free, but with no bounty for it.

## Marines and bounty hunters who loot

The Marines and bounty hunters may not loot the prison. Taking from a tower chest, breaking one, freeing prisoners, or striking a jailer counts. The first time, a warning; **the second time, you turn pirate**, with a bounty of at least that level's escape bounty. Taking back your own gear from a depot does not count.

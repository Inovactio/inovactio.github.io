# Races and fighting styles by data pack

*Since #950.* A data pack chooses which races the character creator offers, and how big they are, without any Java. It
takes races (and sub-races) out of the creator, brings in a race a loaded mod registers but keeps out of the book, and
sets a race's body size and its creator slider. It creates no race: a race that needs its own name, look or abilities
is still registered in Java by its mod.

Put a file in `data/<namespace>/akumalib/races/`, any name:

```json
{
  "remove": [ "mineminenomi:cyborg", "mineminenomi:mink_bunny" ],
  "add": [
    "racemod:wotan",
    { "id": "mineminenomi:skypiean", "icon": "mineminenomi:textures/gui/icons/human.png", "order": 50 }
  ],
  "sizes": {
    "mineminenomi:human": { "min": -0.25, "max": 0.5, "step": 0.25 },
    "mineminenomi:fishman": { "base": 1.25 }
  }
}
```

| Key | What it does |
|---|---|
| `remove` | The race or sub-race leaves the character creator (AkumaLib's book and the base mod's screen) and the base mod's random pick (Race Randomizer, the Random choice). **A player who already has it keeps it**, and `/changecharacter` can still give it (maintainer, 2026-11-13). |
| `add` | A race or sub-race a loaded mod registers in Mine Mine no Mi's `RACES` registry, but keeps out of the book, comes in. A sub-race shows under the race that lists it. `icon` and `order` are only for a race its mod gave no book details: without them it shows a question mark, after the base mod's races. `order` given to a race that has details moves it. |
| `sizes` | The race's body size (`base`, 1 a man) and its creator slider (`min`, `max`, `step`): the figures of `AkumaRaces.setSize` ([Races](races.md#size)). A figure left out keeps the one the race's mod declared, or the default (base 1, -0.25 to +0.25 by 0.125). |

**Files add up**, across mods and data packs, in the order of their ids. **Every removal applies after every
addition**, so a server pack can always take a race out. Of two files sizing the same race, the later one wins, figure
by figure. A file's sizes win over the ones the race's mod declared in Java.

Races are named by registry name. A race that no loaded mod registers is logged and skipped, so a pack may name an
addon's races in case it is installed:

```text
AkumaLib race file example:creator: no race racemod:wotan is registered (its mod is not loaded?), skipped
AkumaLib race files: 1 added, 2 removed, 2 sized
```

!!! warning "Never an empty creator"
    The base mod's random pick needs one race. Files that would remove every race are logged and their removals of
    main races dropped.

## What follows a change

- **The client.** The server sends what the files say at login and at every `/reload`: the creator's packet numbers a
  race by its place in the book, so both sides must list the same races. A client that leaves the server forgets them.
- **Players already made.** A removed race stays theirs. A size change reaches them within a second: their slider
  setting is kept and brought within the new bounds (the same check as a config change, see
  [Character creator](character-creator.md#size-slider)).
- **Book details.** A race brought in shows its mod's name and description when the mod gave some; otherwise its name
  only, and the file's icon or a question mark.

## Fighting styles

*Since #951.* The same for the fighting styles (Swordsman, Sniper, Doctor, Art of Weather, Brawler, Black Leg, and the
addons' own), in `data/<namespace>/akumalib/fighting_styles/`:

```json
{
  "remove": [ "mineminenomi:doctor" ],
  "add": [ { "id": "mineminenomi:brawler", "order": 100 } ]
}
```

`remove` and `add` work as for the races, with the same rules: files add up in id order, removals win, a removal that
would leave no style is dropped, a player who has a removed style keeps it (maintainer, 2026-11-13). A style file has
no `sizes`; a style's training affinity stays its mod's.

## Sample

A ready data pack is in [`examples/races-datapack`](https://github.com/Inovactio/AkumaLib/tree/develop/examples/races-datapack):
it removes the Cyborg and the Bunny mink, brings in the base mod's Skypiean, widens a human's slider, makes a fishman
1.25 a man, removes the Doctor style and puts the Brawler last. Copy it into a world's `datapacks/` folder and `/reload`.

## For a mod

Nothing to call: `CreatorEntryData.RACES` and `CreatorEntryData.STYLES` read the files. `AkumaRaces.size(race, subRace)` already returns the files'
figures over the declared ones; `CreatorEntryData.RACES.inBook(id)` says whether the files put a race in (true), took it
out (false) or left it to its mod (null). Code that lists the races or styles to offer should go through `Race.isInBook()` /
`FightingStyle.isInBook()`, which answer with the files, or `AkumaCreator.book(tab)`.

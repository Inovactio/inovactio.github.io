# Character creator book

AkumaLib replaces Mine Mine no Mi's character creator (one choice at a time, scrolled with arrows) with a book: a plank for each tab on the left (Faction, Race, Style, Profession), the tab's entries in a grid of 4 x 3 on the right page (Random first, page arrows under it), and the chosen entry's details on the left page: its sub-races, a preview of the character that turns when dragged, its size slider, its bonus lines and passives, its description and its techniques (name on hover).

Players who prefer the base mod's screen set `characterCreator.gridBook = false` in `akumalib-client.toml`.

## Entries

The book reads its entries where they already live; nothing is registered with AkumaLib to appear in it:

- **Factions, races, sub-races, fighting styles**: Mine Mine no Mi's `FACTIONS`, `RACES` and `FIGHTING_STYLES` registries, those with book details (`setBookDetails`), in the base book's order. The picture, the top abilities (techniques) and the bottom abilities (passives) come from the book details. A sub-race's top abilities follow its race's; its bottom abilities, when it has some, replace them.
- **Professions**: AkumaLib's profession registry, in Crew mode only. Their icons and perks ("Lv 10 ...") are shown.

Finishing sends the base mod's own `CFinishCCPacket` with the numbers its own screen would send, so its checks run as before.

## Size slider

On the Race tab, under the preview, a slider sets the body's size around the race's base (#746): "Size x1.25 (2.25 blocks)", then a notch a place. The preview follows it. A race declares its base and its slider with `AkumaRaces.setSize` ([Races](races.md#size)); one that declares nothing has base 1 and the default slider, -0.25 to +0.75 by 0.25 (5 places, 0 at the start). Choosing another race or sub-race puts its start back. Random shows none: the drawn race gets its start.

The book sends the slider (`ChooseSizePacket`) just before the finish; the server brings it within the race's bounds and steps and puts it as a permanent `SIZE` modifier, base x (1 + slider), kept over death. It changes afterwards only as the race does: the book again, or the command (a new race puts its start). The base mod's own screen (`gridBook = false`) has no slider: its race's start. See [Attributes and size](../size/race-size.md#the-races-base-size-and-the-creators-slider-746).

The server decides (`[sizeSystem]` in `akumalib-server.toml`, maintainer 2026-10-29) and tells the book at login and at each config reload:

- `sizeSlider = false`: the book shows no slider, and every player's body leaves out the slider's share, those who had set one too. Each player's setting is kept, not erased: back on `true`, everyone gets their size back. A creator finished while it is off keeps the setting stored for the same race.
- `raceBaseSizes = false`: every race has a man's base (1), giants too; the slider, when on, works on 1, and the preview shows it so.

Both apply at a config reload or a restart, to the players online too (size and box), without reconnecting.

## Describing an entry

`AkumaCreator.describe(tab, id)` gives the details of one entry; every part is optional.

```java
// common setup: the condition is checked on the server too
AkumaCreator.describe(CreatorTab.RACE, new ResourceLocation(MODID, "giant"))
        .icon(new ResourceLocation(MODID, "textures/gui/creator/giant.png"))   // the whole texture, squared
        .description(Component.translatable("race.mymod.giant.description"))
        .stat(Component.literal("Height: 12 blocks").withStyle(ChatFormatting.DARK_GREEN))
        .technique(MyAbilities.STOMP)                                           // after the book details' own
        .previewSize(6.67F)                                                     // drawn beside a man for scale (else the declared base size)
        .lockedUnless(player -> GiantRules.allowed(player), Component.literal("Not on this server"));
```

- **Icon.** Without one, the box shows the middle of the entry's picture from the base book, else its initial.
- **Description.** Without one, the lang line `<the entry's name key>.description` is read when it exists (`race.mymod.giant.description`; for a profession, its `getDescriptionId()` + `.description`). AkumaLib gives the base mod's entries theirs.
- **Locked.** A locked entry is greyed with a padlock, its reason on hover, and cannot be clicked. The server does not give it either: a locked or random choice becomes one of the open entries (`CFinishCCPacketMixin`). Sub-races too. The server's race randomizer still draws among all races.

## Forcing a tab

`AkumaCreator.force(tab, player -> ...)` makes a tab show one entry alone, locked, with a line of reason. It only shows it: making it so on the server is the addon's job. Cruise uses it for its civilian start:

```java
// client setup
AkumaCreator.force(CreatorTab.FACTION, player -> ClientCivilianStart.isOn()
        ? new AkumaCreator.Forced(ModFactions.CIVILIAN.getId(), ClientCivilianStart.LINE) : null);
```

A tab with nothing to choose is not shown: Race when the server randomizes races, Profession in Solo mode or with no profession registered. A profession already chosen shows alone, locked.

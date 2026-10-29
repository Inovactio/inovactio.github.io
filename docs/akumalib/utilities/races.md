# Races

An addon's race is registered in Mine Mine no Mi's own `RACES` registry; given book details, it shows in the Character Creator and in its random roll by itself. What the base mod does not do is treat it as anything: it compares a player's race with its four races exactly. `AkumaRaces` fills that gap. It adds no race.

```java
// common setup
ResourceLocation sky = new ResourceLocation(MODID, "sky_people");
AkumaRaces.countAs(sky, new ResourceLocation("mineminenomi", "human"));
AkumaRaces.setCategoryIcon(sky, new ResourceLocation(MODID, "textures/gui/icons/sky-people.png"));
```

**Counts as.** A race declared to count as a base race answers that race's check (`isHuman`, `isFishman`, `isCyborg`, `isMink`) and passes the ability tree's race condition, so it pays that race's price for the base mod's race techniques (Soru: 2 martial-arts points for a human, 3 for anyone else). It stays what it is for every other check. A race may count as several; `forget` takes its declarations back.

**Category icon.** The racial category of the ability screens shows the declared texture; the base mod knows one for its four races only.

Main race or sub-race, by registry name: a player matches through either, and a sub-race's icon wins over its main race's.

## Size

A race declares its body size (`SIZE`, 1 a man) and the character creator's size slider around it (#746): the body is base x (1 + slider).

```java
AkumaRaces.setSize(fishman, 1.25D);                    // the default slider: -0.25 to +0.25 by 0.125, 0 at the start (the middle)
AkumaRaces.setSize(giant, 4.0D, 0.0D, 0.2D, 0.1D);     // its own: min, max, step
```

A race that declares nothing takes base 1 and the default slider. A sub-race's declaration wins over its race's. The start is 0, or the bound nearest to it. `AkumaRaces.size(race, subRace)` reads it; `forgetSize` takes it back. AkumaLib puts the size on the players itself, kept over death; see [Attributes and size](attributes-and-size.md#the-races-base-size-and-the-creators-slider-746).

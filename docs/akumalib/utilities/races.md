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

A race that declares nothing takes base 1 and the default slider. A sub-race's declaration wins over its race's. The start is 0, or the bound nearest to it. `AkumaRaces.size(race, subRace)` reads it; `forgetSize` takes it back. AkumaLib puts the size on the players itself, kept over death; see [Attributes and size](../size/race-size.md#the-races-base-size-and-the-creators-slider-746).

## Fishman features

The features of the base mod's three fishman sub-races (the Saw-shark's muzzle and saw, the Ray's arm fins, crest and tail, the Garfish's jaws, dorsal fins, gills) belong to AkumaLib: models, textures and layer. A mod only says who wears them, in its constructor or common setup, on both sides:

```java
AkumaFishmen.players();                                                    // players, by their sub-race
AkumaFishmen.declare(MyEntities.SHARK_PIRATE);                             // an NPC, by its sub-race, none without one
AkumaFishmen.declare(MyEntities.SHARK_GUARD, AkumaFishmen.Look.SAWSHARK);  // an NPC: its sub-race's look, or this one
```

An addon's sub-race of any main race gets a look with `AkumaFishmen.declareSubRace(id, look)`; `Look.WOTAN` is an orange dorsal fin and nothing else, for a fishman-giant hybrid.

AkumaLib adds the layer to the renderers. A declared entity's renderer must have a humanoid model; one that has not is logged and left alone. The features take the skin colour the wearer chose. The base mod's own fishmen (Arlong, Chew, Kuroobi, its fishman pirates) keep the features the base mod draws: declaring them would draw both. The skin itself stays the mod's: `SkinSwaps`, see [decoys](../entities/decoys.md).

## Horns

Curved horns on a player's head (`HornsModel`, `HornsLayer`), three shapes drawn from the pictures: Kaido's, Yamato's and the young Kaido's. A mod names the races that wear them, main race or sub-race, in its constructor or common setup, on both sides:

```java
AkumaHorns.declare(new ResourceLocation(MODID, "horned_folk"));
```

The shape and the colour come from the player's UUID (`AkumaHorns.shape`, `AkumaHorns.colour`, `AkumaHorns.PALETTE`): stable, nothing to save, the same on every client. Each colour goes from the root to the tip; the skin stays the player's. A helmet does not hide the horns: they come out through it.

## Measuring a race's layers

`gradlew checkLayers` (`gametest/LayerAudit`, no game, a few seconds) measures the fishman features, the wings, the antennae and the horns from their baked cubes and real textures, on a classic and a slim player, through the animation's poses, and fails on a defect:

- **Coplanar**: two faces looking the same way in one plane, both opaque there, against the other parts and the player's own model. They flicker. Move one a tenth of a pixel off the other.
- **Open**: a slab cut out of its texture with no wall along the cut, a transparent edge where the slab is solid, or a texel solid on one side only. From some angles one looks through it. A box in `client.race` gets its walls from `SlabWalls`, which reads the texture.

Volumes that cross without sharing a plane are listed, not failed: a part's root sunk in the body is how it holds. The horns are also measured against a helmet. A new layer goes in `LayerAudit.main`.

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

## Body shape

A body with a longer neck, longer arms with elbows, longer legs or a broader chest, in real parts of the model (Race #12): no layer over a man, the man's parts are not drawn. A mod names who has it, a race or sub-race or an NPC type, in its constructor or common setup, on both sides:

```java
AkumaBody.Shape tenaga = AkumaBody.Shape.MAN.arms(20, 2);      // arm 20 pixels (a man's 12), two elbows
AkumaBody.declare(new ResourceLocation(MODID, "tenaga"), tenaga);
AkumaBody.declare(new ResourceLocation(MODID, "kubinaga"), AkumaBody.Shape.MAN.neck(6));
AkumaBody.declare(new ResourceLocation(MODID, "ashinaga"), AkumaBody.Shape.MAN.legs(28));
AkumaBody.declare(new ResourceLocation(MODID, "buccaneer"), AkumaBody.Shape.MAN.chest(2, 1));   // 2 more on each side, 1 more before and behind: 12 x 6
AkumaBody.declare(MyEntities.TENAGA_PIRATE, tenaga);           // an NPC type: its renderer must have a plain humanoid or player model
```

An NPC's type wins over its sub-race's shape, a sub-race's over its race's; `forget` takes a declaration back. Who declares nothing is drawn by the game's own model, and nothing below runs for them.

**The size stays the master.** The box and the eyes do not move: they are the size system's (`AkumaRaces.setSize`). The drawing fits them: 32 pixels high in all, whatever the neck and legs add (`Shape.fit`). A neck of 6 at size 1.2 or legs of 28 at size 1.5 keep a man's head and chest; at size 1 they would make them smaller.

**What follows the parts.** The second skin layer, Alex's thin arms, the held items (at the end of the arm), the game's armour (on the same segments, elbows included) and the Haki overlays. An armour item with a model of its own (`getHumanoidArmorModel`) is stretched to the body for its drawing, and stays straight when the elbows bend. Layers that hold on a part (the head's horns, antennae, a fishman's features) go with their part, at their old distance from the shoulder.

**Elbows.** Each elbow bends a little at rest, more with the arm's swing forward and in a blow; an arm the game or an animation raises (a bow, a technique's aim) is straight. The neck's texture is the skin's wrist rows.

**First person.** The real arm, straight, with the hand where the game puts a hand: the added length goes towards the shoulder, off screen. A Black Leg's first-person leg stays a man's.

**Forms.** Any full form or hybrid gives back a man's body at the entity's size until it ends: their models are made for a man's limbs (maintainer, 2026-11-01).

`gradlew checkLayers` measures these bodies too: no two faces of a body or of its armour in one plane, the held item's point at the end of the arm, and the arm's two ends reading the skin where a man's do.
## Dwarves

A dwarf's bushy tail and pointed nose on a humanoid (`DwarfFeaturesModel`, `DwarfFeaturesLayer`), drawn from the anime's concept art (Wicca, Flapper, Leo). A mod names the races that wear them, main race or sub-race, and any NPC types, in its constructor or common setup, on both sides:

```java
AkumaDwarves.declare(new ResourceLocation(MODID, "tontatta"));
AkumaDwarves.declare(MyEntities.DWARF_GUARD);   // whatever its race; a humanoid renderer
```

The shape and the nose come from the wearer's UUID (`AkumaDwarves.tail`, `pointedNose`): stable, nothing to save, the same on every client. The tail is a big round mass off the small of the back, in three shapes (a ball, a cloud of three, a ball whose tip curls up), in the colour of the hair of the wearer's skin (`RecolouredSkins.hairColour(entity, fallback)`, on plain pixels `SkinTones.hairColour`: the main colour of the head's top, back and sides, the skin's own left out, so a hat on top does not fool it; Leo's brown for a bald head). One wearer in two has the pointed nose: not every dwarf does. It reads the skin between the eyes.

## A people's skin and hair

`RecolouredSkins.SkinTint.skinAndHair(skin, hair)` lays a colour on the bare skin, as `SkinTint.skin`, and another on the hair: on the head's and its overlay's top, back, upper sides and fringe every pixel but the skin's own, elsewhere on the head those near `SkinTones.hairColour`, each keeping a share of its light. A bald head stays bald; a hat painted there takes the colour. Draw it instead of the skin with `SkinSwaps`.

## Lunarian wings

`WingsLayer.Kind.LUNARIAN`: King's wings, the arch up to the top of the head, the long primaries past the hips, black with a violet shade, on a texture twice as fine as the sky people's. A race mod adds the layer and picks its wearers, as for the other wings.

## Measuring a race's layers

`gradlew checkLayers` (`gametest/LayerAudit`, no game, a few seconds) measures the fishman features, the wings, the antennae, the horns and the dwarves' tail and nose from their baked cubes and real textures, on a classic and a slim player, through the animation's poses, and fails on a defect:

- **Coplanar**: two faces looking the same way in one plane, both opaque there, against the other parts and the player's own model. They flicker. Move one a tenth of a pixel off the other.
- **Open**: a slab cut out of its texture with no wall along the cut, a transparent edge where the slab is solid, or a texel solid on one side only. From some angles one looks through it. A box in `client.race` gets its walls from `SlabWalls`, which reads the texture.

Volumes that cross without sharing a plane are listed, not failed: a part's root sunk in the body is how it holds. The horns are also measured against a helmet. A new layer goes in `LayerAudit.main`.

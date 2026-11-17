# Races

An addon's race is registered in Mine Mine no Mi's own `RACES` registry; given book details, it shows in the Character Creator and in its random roll by itself. What the base mod does not do is treat it as anything: it compares a player's race with its four races exactly. `AkumaRaces` fills that gap. It adds no race.

A server or a modpack chooses which races the creator offers, and their sizes, with a data pack: [Races by data pack](races-by-datapack.md).

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

A race that declares nothing takes base 1 and the default slider. A sub-race's declaration wins over its race's. The start is 0, or the bound nearest to it. `AkumaRaces.size(race, subRace)` reads it; `forgetSize` takes it back. A data pack's `sizes` go over it ([Races by data pack](races-by-datapack.md)). AkumaLib puts the size on the players itself, kept over death; see [Attributes and size](../size/race-size.md#the-races-base-size-and-the-creators-slider-746).

## Fishman features

The features of the base mod's three fishman sub-races (the Saw-shark's muzzle and saw, the Ray's arm fins, crest and tail, the Garfish's jaws, dorsal fins, gills) belong to AkumaLib: models, textures and layer. A mod only says who wears them, in its constructor or common setup, on both sides:

```java
AkumaFishmen.players();                                                    // players, by their sub-race
AkumaFishmen.declare(MyEntities.SHARK_PIRATE);                             // an NPC, by its sub-race, none without one
AkumaFishmen.declare(MyEntities.SHARK_GUARD, AkumaFishmen.Look.SAWSHARK);  // an NPC: its sub-race's look, or this one
```

An addon's sub-race of any main race gets a look with `AkumaFishmen.declareSubRace(id, look)`; `Look.WOTAN` is an orange dorsal fin and nothing else, for a fishman-giant hybrid.

Four more looks, Race Race no Mi's sub-races (#6), are painted in their own colours rather than tinted by the wearer's (`Look.tinted()`):

| Look | What it draws |
|---|---|
| `OCTOPUS` | two more arms, the wearer's own drawn again behind his real ones, skin, sleeves and the chest piece's armour (`HumanoidArmorLayerMixin`), swinging with them |
| `WHALE_SHARK` | a broad dorsal fin and three gill slits a side; on a broader chest (`AkumaBody`) the gills and the fin move out with it |
| `PUFFERFISH` | spines on the head, chest, back and arms, lying along the skin, raised for two seconds when the wearer is struck (its hurt time, read on each client: nothing is sent) |
| `HAMMERHEAD` | the hammer, two lobes out of the head's sides with an eye at each end, gills and a tall dorsal fin |

AkumaLib adds the layer to the renderers. A declared entity's renderer must have a humanoid model; one that has not is logged and left alone. The features take the skin colour the wearer chose. The base mod's own fishmen (Arlong, Chew, Kuroobi, its fishman pirates) keep the features the base mod draws: declaring them would draw both. The skin itself stays the mod's: `SkinSwaps`, see [decoys](../entities/decoys.md).

## Mink features

AkumaLib's own mink features (`MinkFeaturesModel`, `MinkFeaturesLayer`, Race Race no Mi #125), in place of the base mod's drawing: ears, a muzzle in relief over the wearer's face, a tail, and a lion's mane or a bull's horns. Nothing is on by default. A race mod turns them on in its common setup, on both sides:

```java
AkumaMinks.players();                                          // players of the base mod's Dog, Lion and Bunny wear ours
AkumaMinks.declareSubRace(MY_CAT_MINK_ID, AkumaMinks.Look.CAT);  // an addon's sub-race, players and NPCs, or a trait of that id
```

| Look | What it draws |
|---|---|
| `DOG` | pointed ears, a long muzzle, a curled tail that wags |
| `LION` | small round ears, a mane all round the head, a long tail with a tuft |
| `BUNNY` | long ears in two joints that flop as it runs, a small muzzle with two teeth, a round tail |
| `CAT` | pointed ears, a small muzzle, a striped tail held up |
| `JAGUAR` | round ears, a spotted tail hanging low with a dark tip |
| `POLAR_BEAR` | round ears, a broad muzzle, a round stub of a tail |
| `BULL` | horns, ears out sideways, a broad muzzle, a thin tail with a tuft |

Each look has 3 or 4 canon colourings (`Look.variants()`, one texture each); the wearer's UUID picks one (`AkumaMinks.variant`): stable, nothing to save. A wearer who chose a skin tint in the book gets a light fur (`mink_<look>_tinted.png`) in that tint instead, as the base mod tints its features. The base mod's `RacialFeaturesLayer` is skipped on whoever wears ours (`RacialFeaturesLayerMinkMixin`); the base mod's own NPCs of its three sub-races keep its drawing. Once `players()` is on, a player holding the base mod's Mink Lineage wears ours too (a dog's, a lion's or a bunny's by the UUID). On a broader chest (`AkumaBody`) the tail moves back with it. Shapes and textures come from one generator (`ressources/races/minks/_gen_minks.py`); `gradlew checkLayers` measures them.

**Feral form** (*since 6.8.0*, Race #167): `AkumaMinks.feral(predicate)` names who is in their feral form now (a Sulong): read on both sides each frame, so it must read something synced. A feral wearer's features are drawn from their own texture recoloured white (its shading kept), the tail a third longer and the mane a tenth fuller, with red eyes lit in the dark over the skin's own eyes (`mink_feral_eyes.png`, the default skin's eye pixels). `AkumaMinks.furColour` gives `FERAL_FUR` then, so a race mod tinting the skin like the fur follows; whitening the skin's hair is the race mod's (`RecolouredSkins.SkinTint.skinAndHair`).

## Horns

Curved horns on a player's head (`HornsModel`, `HornsLayer`), five shapes drawn from the pictures: Kaido's, Yamato's, the young Kaido's, Harald's and Loki's, and Oars'. A mod names the races that wear them, main race or sub-race, in its constructor or common setup, on both sides:

```java
AkumaHorns.declare(new ResourceLocation(MODID, "horned_folk"));
```

The shape and the colour come from the player's UUID (`AkumaHorns.shape`, `AkumaHorns.colour`, `AkumaHorns.PALETTE`): stable, nothing to save, the same on every client. Each colour goes from the root to the tip; the skin stays the player's. A helmet does not hide the horns: they come out through it.

## Body shape

A body with a longer neck, longer arms with elbows, longer legs, a broader chest or one that flares, in real parts of the model (Race #12): no layer over a man, the man's parts are not drawn. A mod names who has it, a race or sub-race or an NPC type, in its constructor or common setup, on both sides:

```java
AkumaBody.Shape tenaga = AkumaBody.Shape.MAN.arms(20, 2);      // arm 20 pixels (a man's 12), two elbows
AkumaBody.declare(new ResourceLocation(MODID, "tenaga"), tenaga);
AkumaBody.declare(new ResourceLocation(MODID, "kubinaga"), AkumaBody.Shape.MAN.neck(6));
AkumaBody.declare(new ResourceLocation(MODID, "ashinaga"), AkumaBody.Shape.MAN.legs(28));
AkumaBody.declare(new ResourceLocation(MODID, "buccaneer"), AkumaBody.Shape.MAN.chest(2, 1));   // 2 more on each side, 1 more before and behind: 12 x 6
AkumaBody.declare(new ResourceLocation(MODID, "broad_buccaneer"), AkumaBody.Shape.MAN.chest(3, 1.5F).waist(1, 1));   // 14 x 7 above, 10 x 6 below
AkumaBody.declare(MyEntities.TENAGA_PIRATE, tenaga);           // an NPC type: its renderer must have a plain humanoid or player model
```

An NPC's type wins over its sub-race's shape, a sub-race's over its race's; `forget` takes a declaration back. Who declares nothing is drawn by the game's own model, and nothing below runs for them.

**The size stays the master.** The box and the eyes do not move: they are the size system's (`AkumaRaces.setSize`). The drawing fits them: 32 pixels high in all, whatever the neck and legs add (`Shape.fit`). A neck of 6 at size 1.2 or legs of 28 at size 1.5 keep a man's head and chest; at size 1 they would make them smaller.

**What follows the parts.** The second skin layer, Alex's thin arms, the held items (at the end of the arm), the game's armour (on the same segments, elbows included) and the Haki overlays. An armour item with a model of its own (`getHumanoidArmorModel`) is stretched to the body for its drawing, and stays straight when the elbows bend. Layers that hold on a part (the head's horns, antennae, a fishman's features) go with their part, at their old distance from the shoulder.

**A chest that flares.** `waist(wide, deep)` after `chest` gives the chest's bottom its own width and depth: the chest is drawn in three bands of four rows (the top's, between, the bottom's), each ledge closed with the skin's own top or bottom. Broad above (shoulders over a narrow waist) or broad below (a belly and hips under a smaller chest), one way for both width and depth. Arms over a waist wider than the shoulders hang out a little, clear of it. An armour item with a model of its own takes the widest band's box. A chest as wide at both ends stays one box, as before.

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

## Merfolk: a tail in the water, legs on land

`AkumaMerfolk.declare(raceOrSubRace, 0xRRGGBB)` gives a race's players a fish tail in that colour in the water (Race #70): four segments narrowing from the hips and a fluke of two lobes, grey scales tinted by the colour, waving faster as they swim.

```java
AkumaMerfolk.declare(new ResourceLocation(MODID, "mermaid"), 0xF08A8A);
```

The tail is out while `AkumaMerfolk.inTail(entity)`: in the water and swimming, off the bottom or under; standing in a shallow, the legs stay. It comes out over 8 ticks, the legs shrinking up into the hips, with a burst of bubbles; back on land it goes the same way, drops falling from the hips. Leggings and boots are not drawn while the tail is out. Players only; a whole form of the base mod has its own renderer and no tail. Swimming, breathing and the rest are the race mod's.

## A people's skin and hair

`RecolouredSkins.SkinTint.skinAndHair(skin, hair)` lays a colour on the bare skin, as `SkinTint.skin`, and another on the hair: on the head's and its overlay's top, back, upper sides and fringe every pixel but the skin's own, elsewhere on the head those near `SkinTones.hairColour`, each keeping a share of its light. A bald head stays bald; a hat painted there takes the colour. Draw it instead of the skin with `SkinSwaps`.

`RecolouredSkins.SkinTint.spotted(skin, mask, spots)` lays the colour on the bare skin, and spots in `spots` where the mask's green is, on the bare skin only (a fish's spots never land on a shirt or the hair); the mask is laid out as a player skin, its red how much of the colour each pixel takes. The whale shark's white spots and the pufferfish's brown ones (Race) are drawn so.

`RecolouredSkins.skinColour(entity, fallback)` reads the bare skin's own colour off a body's skin (on plain pixels `SkinTones.skinTone`), once per skin, as `hairColour` reads the hair's: for what is drawn over a body in its own colour, such as Race's cyborg parts covered in skin.

## Lunarian wings

`WingsLayer.Kind.LUNARIAN`: King's wings, the arch up to the top of the head, the long primaries past the hips, black with a violet shade, on a texture twice as fine as the sky people's. A race mod adds the layer and picks its wearers, as for the other wings.

## Measuring a race's layers

`gradlew checkLayers` (`gametest/LayerAudit`, no game, a few seconds) measures the fishman features, the wings, the antennae, the horns and the dwarves' tail and nose from their baked cubes and real textures, on a classic and a slim player, through the animation's poses, and fails on a defect:

- **Coplanar**: two faces looking the same way in one plane, both opaque there, against the other parts and the player's own model. They flicker. Move one a tenth of a pixel off the other.
- **Open**: a slab cut out of its texture with no wall along the cut, a transparent edge where the slab is solid, or a texel solid on one side only. From some angles one looks through it. A box in `client.race` gets its walls from `SlabWalls`, which reads the texture.

Volumes that cross without sharing a plane are listed, not failed: a part's root sunk in the body is how it holds. The horns are also measured against a helmet. A new layer goes in `LayerAudit.main`.

## NPCs of a race (#946)

An addon that places NPCs gives them a race without depending on a race mod: the race mod registers its races in `AkumaNpcRaces`, the placing addon draws one and applies it. The base mod's Fishman, Mink, Cyborg and Skypiean, and their sub-races, are registered from the start.

```java
// the race mod, common setup: a race (or a sub-race) NPCs can take, and what it adds after the stats and the size
AkumaNpcRaces.register(giant, npc -> addGiantStats(npc));

// the placing addon: weights from its own data (one Impel Down file per level)
ResourceLocation race = AkumaNpcRaces.draw(Map.of(AkumaNpcRaces.HUMAN, 70, giant, 30), level.random);
double size = AkumaNpcRaces.size(race);        // 4 for a giant: check the cell has room first
AkumaNpcRaces.apply(prisoner, race);           // false, and nothing done, for a human
```

- **Draw.** By weight; a race no one registered (the race mod absent, a typo) or one a data pack took out of the creator ([Races by data pack](races-by-datapack.md)) counts as a human: its weight goes to the human. Without a race mod, every NPC but the base mod's races is human.
- **Apply.** The main race and the sub-race in the NPC's stats (a sub-race puts its main race too), the race's base size as a lasting `SIZE` modifier (never the creator's slider, so `size` is exact; `raceBaseSizes` off, a man's), then the extras registered for the race, then for the sub-race.
- `drawable(id)` says whether a race can come out; `forget(id)` takes a registration back.

### Their look (#981)

An NPC given a race wears it as a player does, on every humanoid NPC renderer (`NpcRaceRenderers.humanoids()`: every living renderer with a humanoid model):

- **Horns, a dwarf's tail and nose**: by the NPC's race or sub-race, as declared for players (`AkumaHorns`, `AkumaDwarves`).
- **Fishman features**: an NPC no one declared wears the look of an addon's sub-race (`declareSubRace`); the base mod's three looks stay on players and declared types, since the base mod draws its own fishmen's.
- **Skin colour**: `SkinSwaps.registerLiving(priority, entity -> ...)` answers for an NPC too (`register` stays players only); the NPC's body is drawn in it (`LivingEntityRendererSkinMixin`, the texture of `getRenderType`). `RecolouredSkins.tinted` and `hair` read an NPC's own texture, the one its renderer chose.
- **A race mod's own layers** (wings, antennae): it adds them to `NpcRaceRenderers.humanoids()` in its `AddLayers`, with a wearer check that reads the entity's race.
- **Not yet**: the merfolk tail stays players only (`MerfolkTails` hides a player model's legs).

# SMILEs

*#928.* Artificial Zoan fruits made from a sample of a Zoan user. AkumaLib owns the item, what each SMILE is, how its
eater keeps it and the one-fruit rules; an addon makes them (Missing's Nomi Nomi no Mi) and declares what a failed
SMILE of its Zoans turns its eater into.

```java
ItemStack smile = Smiles.make(ModFruits.USHI_USHI_NO_MI_BISON.getId(), level.random);   // empty if not a Zoan
Optional<ResourceLocation> zoan = Smiles.sample(target);     // what a syringe takes from a Zoan user
Optional<SmileData> eaten = Smiles.of(player);               // what a player ate, on both sides
Smiles.identify(smile);                                       // its tooltip now names its Zoan
```

## What a SMILE is

One item, `akumalib:smile` (`AkumaItems.SMILE`), a plain `Item`: never a base-mod `AkumaNoMiItem`, whose constructor
puts every instance in the base mod's list of Devil Fruits and so in the One Fruit per World rules, the encyclopedia,
leaf drops and the fruit boxes. A SMILE is in none of them. What each one is lives in its data, `SmileData`, rolled
once when it is made:

| Field | Holds |
|---|---|
| `zoan` | the Zoan fruit sampled (plain, ancient, mythical or artificial), an item id |
| `success` | (sealed) true at the server's odds for the Zoan's tier (see below) |
| `form` | (sealed) a failure's form, one of those the Zoan declared; null for a success, and for a Zoan that declared none |
| `hue` | (sealed) how far a success turns the Zoan's usual colours, 40 to 320 degrees |

**The odds depend on the tier of the Zoan copied** (Missing #1295; the maintainer raised them on 2026-11-14 from 15, 8 and 3 %), read from the fruit's tier,
the same one that puts it in its Devil Fruit box. Each is set in `akumalib-server.toml`, section `smiles`:

| Zoan's tier (box) | Setting | Default |
|---|---|---|
| 1 (wooden) | `smileSuccessChanceTier1` | 50 % |
| 2 (iron) | `smileSuccessChanceTier2` | 35 % |
| 3 (golden) | `smileSuccessChanceTier3` | 15 % |

They replace the single `smileSuccessChance` (10 %) of earlier development builds. `Smiles.successChance(zoan)` gives
the chance of one Zoan, 0 to 1.

**Nothing a client can read tells a success from a failure** (the maintainer's rule, 2026-11-12): you learn it by
eating it. The item carries its Zoan, its icon colours and whether it is identified in the open; the outcome
(`success`, `form`, `hue`) is sealed with a key only the server holds, kept in the world's data (`SmileSeal`, AES-GCM,
a fresh nonce per SMILE, one length for every outcome). `Smiles.of(stack)` opens it on the server; on a client it is
empty, and `Smiles.zoanOf(stack)` is all there is. A SMILE taken to another world cannot be opened there and is not
eaten.

**Its icon** is one grey template (`textures/items/smile_skin.png`, `smile_swirls.png`, `smile_stem.png`) whose skin
and dots take two colours drawn at random for each SMILE, apart from its outcome (`Smiles.colours`): a darker skin,
light dots, as in the anime. The template was drawn by the fruit icons workshop after the SMILEs of the anime
(validated by the maintainer, 2026-11-12; its generator is `ressources/new-fruits/script/_gen_smile.py`).

A SMILE's tooltip says nothing until it is identified (`Smiles.identify`, the Nomi Nomi's analysis); then it names its
Zoan, and says when that Zoan has no failure form. Never whether it is a success.

## Eating one

- **Success**: an identical copy of the Zoan, its whole kit, the same numbers, its awakening; only its forms are drawn
  in another colour. It counts as that Zoan for every check by fruit: the base mod's `hasDevilFruit`, AkumaLib's
  `AkumaDevilFruits.fruit / hasFruit / isZoan`, `Awakenings.canUnlock`.
- **Failure with a form**: locked for good in that form, with its own two techniques and stats.
- **Failure with no form**: nothing at all, but the eater is still a fruit user.
- In every case the eater cannot swim, and cannot eat another fruit: a fruit user who eats a SMILE, or a SMILE user who
  eats a fruit or another SMILE, dies of the curse, as for a second real fruit.
- The SMILE is lost on death as the base mod loses a fruit: kept on respawn only with the base mod's "Keep Devil Fruit".
  It is never reborn in an apple: nothing of it is in the world's fruit record.
- The encyclopedia never records a SMILE, success or not (the maintainer's choice, 2026-11-12).

`Smiles.give(entity, data)` makes any living entity a SMILE user without the curse checks: an NPC given one by an addon.

## Declaring failure forms

What a failed SMILE of a Zoan turns its eater into is declared by any addon, for its own Zoans or the base mod's, with
`SmileForms.declare`, once, at mod construction. A Zoan may declare several forms; a failure draws one when the SMILE is
made, by their weights. A Zoan that declares none gives a SMILE that does nothing on failure.

```java
// the form: a DataMorphInfo like any other (#906), registered in the addon's own registry
public static final RegistryObject<MorphInfo> BISON_SMILE_HORNS = REGISTRY.registerMorph("bison_smile_horns",
        () -> new DataMorphInfo("morph.mymod.bison_smile_horns").texture(TEXTURE).partial().hidesArms());

// in the mod's constructor
SmileForms.declare(ModFruits.USHI_USHI_NO_MI_BISON, SmileForm.of(MyMorphs.BISON_SMILE_HORNS)
        .abilities(MyAbilities.HORN_RUSH, MyAbilities.STAMPEDE)       // two techniques of its own
        .stat(() -> Attributes.ARMOR, 4.0, AttributeModifier.Operation.ADDITION)
        .stat(() -> Attributes.MOVEMENT_SPEED, -0.01, AttributeModifier.Operation.ADDITION)
        .weight(3));                                                  // 3 times as often as a form of weight 1
```

- **The form** is any `MorphInfo`; a hybrid is `.partial()` and counts as a man for the size system. Its id is the
  morph's: it is what the SMILE stores, so it must not change once SMILEs of it exist.
- **The techniques**, two, new (not borrowed from the Zoan's kit), built with the category `DEVIL_FRUITS` as every
  fruit's: Seastone, water and `/removedf` read it. Their unlock checks, if any, are asked as a fruit's are.
- **The stats** are attribute modifiers held while the form is, taken off with it.
- The eater keeps the form for good: put on with `ExternalMorphs` (sent to every client that sees him, back after a
  respawn, a dimension change, a login), checked again every second, taken off when the SMILE goes (death without
  "Keep Devil Fruit", `/removedf`). No ability turns it off.
- A SMILE that names a form no longer declared (its addon removed) does nothing, as one with no form.

`SmileForms.of(zoan)`, `declares(zoan)`, `get(zoan, form)`, `current(entity)` read the declarations back;
`/akumalib smile give <targets> <zoan> failure <form>` gives a SMILE of one form, for tests.

## The other colour of a success

A success is the Zoan's power with one exception: its hybrid and full forms are always drawn in another colour
(Momonosuke's pink Uo Uo; the maintainer's rule). The SMILE's `hue`, rolled when it is made, turns the form's colours.

**Palettes.** A Zoan form texture is split into grey **channels** (fur, belly, stripes...) and a **fixed layer** drawn
as it is (eyes, teeth, horns, hooves). Each channel is coloured by a gradient, as the generated NPC skins are
(`LookPainter.ramp`: grey 128 is the colour, darker greys its shades, lighter greys half way to white). The form's usual
look is one colour per channel, its palette; a success turns every colour of the palette by its one angle, so the
channels keep their harmony. A palette is data, one JSON per form texture, under `assets/<ns>/textures/zoan_colours/`
of any mod, with its grey PNGs:

```json
{
  "texture": "mineminenomi:textures/models/morphs/bison_walk.png",
  "fixed": "akumalib:textures/zoan_colours/bison_walk/fixed.png",
  "channels": {
    "channel0": { "layer": "akumalib:textures/zoan_colours/bison_walk/channel0.png", "colour": "#6f5228" }
  }
}
```

`tools/zoan_channels.py <texture.png> <assets/<ns>/textures/zoan_colours> <texture id> --channels 4` makes one from a
texture: every pixel goes to the channel that gives it back best, greys and near-whites to the fixed layer. Look at
the result (the fixed layer should hold only what must keep its colour) and rename the channels if you like.

**Identity rule.** In its usual colours a palette must give today's texture back: `ZoanColours.check(paletteId)` reads
every file from the jars and compares pixel by pixel (at most 2 % of the pixels past 6/255 on a component, none past
24). Each palette a mod ships gets a game test that asserts `check(...).same()`; one that fails is not shipped, and the
Zoan keeps the fallback. AkumaLib ships the Bison's two forms (`SmileColourGameTests`).

**Fallback.** A texture with no palette (not done yet, or another addon's Zoan) keeps its look, and a success of it is
drawn with the whole texture's hue turned (`ZoanColours.hueShift`).

**Pale Zoans.** Every colour of a success is at least 45 % saturated (`ZoanColours.MIN_SATURATION`, the maintainer's
choice of 2026-11-13 after the Wolf barely changed): a grey takes the texture's own main hue, then turns. Blacks, and
whites with no colour (eyes, teeth), stay as they are. A palette's usual look is untouched.

**Drawing.** Only a successful SMILE user is drawn differently; everyone else, the real Zoan's user included, is drawn
from the original texture as before. The turned texture is made once per (texture, whole degree) on the client and
kept (`client/SmileColours`, 256 at most, the least recently drawn let go), never painted per frame. Three client
mixins swap the texture where the base mod draws a form: `MorphRendererSmileMixin` (a full form, and its arm in first
person), `PartialMorphFeaturesLayerSmileMixin` (a hybrid), `MorphsHandlerSmileMixin` (a hybrid's arm in first person).
A failure form is drawn as its own texture.

⚠️ **A form drawn by a renderer of its own** (a dragon, a snake in pieces) that builds its `RenderType` from a fixed
texture never goes through those mixins: it asks for its texture per body, `SmileColours.texture(entity, TEXTURE)`,
in its `render`, or a success of it keeps the Zoan's colours (Missing's Seiryu dragon, King Cobra, Anaconda, fixed in
Missing). Client side only.

**Character screen.** The base mod's character screen shows its player's fruit only when it is a base-mod fruit item;
a SMILE eater's is drawn at the same place (`PlayerStatsIntegration`): "SMILE: <Zoan>", or "Failed SMILE: <Zoan>",
gold when awakened. The eater knows the outcome: it is never shown before the SMILE is eaten.

## The One Fruit per World rule

The base mod keeps a fruit as its item id. A SMILE user's id is the SMILE item's own, `akumalib:smile`, never the real
Zoan's: the world's fruit record never sees a SMILE. A success is allowed outside the rule: any number of copies may
exist at once, and none of them uses, blocks or frees the real fruit, whatever its eater does (eats, dies, logs out,
`/removedf`). What the SMILE is rides beside the id on the same capability, so it is saved, sent to every client with
the base mod's own fruit sync, and copied on respawn with the fruit.

## For operators and tests

```
/akumalib smile give <targets> <zoan> [random]           rolled at the server's odds
/akumalib smile give <targets> <zoan> success|failure
/akumalib smile give <targets> <zoan> failure <form>       that failure form
/akumalib smile identify <targets>                       the SMILE in the main hand names its Zoan
/akumalib smile info                                     the hidden outcome of the SMILE in your hand (operators)
```

`info` is the only way to see a SMILE's outcome before eating it.

## What it adds to the base mod

Three mixins (and the three client mixins of the colours above), no packet (the SMILE rides the base mod's `SSyncDevilFruitPacket`), no change to the network protocol:

| Mixin | Target | Does |
|---|---|---|
| `DevilFruitBaseSmileMixin` | `DevilFruitBase`: both `setDevilFruit`, `serializeNBT`, `deserializeNBT`, `hasDevilFruit(AkumaNoMiItem)` | the SMILE kept beside the fruit id; a success answers `hasDevilFruit` for its Zoan |
| `DevilFruitHelperSmileMixin` | `DevilFruitHelper.respawnDevilFruit` (HEAD) | a SMILE is never reborn as a fruit (the base mod cast it to `AkumaNoMiItem`) |
| `ProgressionHandlerSmileMixin` | `ProgressionHandler.checkForPossibleFruitAbilities` (HEAD) | `/ability awaken` checks a SMILE's abilities (the base mod cast it to `AkumaNoMiItem`) |

A SMILE's abilities stay unlocked through the base mod's `UnlockAbilityEvent` (`Smiles.keepTheAbilities`), each
ability's own unlock check still asked, as the base mod asks it of a real fruit's.

# Generated NPC skins

Instead of shipping dozens of full skins for one kind of NPC, an addon declares **greyscale layers** and **palettes**; each NPC draws a **look** (a part per slot, a colour per channel) from a seed, and the client puts its skin together the first time it is drawn. Classes: `api.entities.looks.LookSet`, `Look`; the client side is AkumaLib's own (`client.LookTextures`).

## Declaring a set

```java title="MyLooks.java (common code)"
public static final LookSet PRISONER = LookSet.builder(new ResourceLocation("mymod", "prisoner"))
        .weight(24)                                                   // the set's own kind: the men
        .slot("body", AkumaLooks.BODY)
        .slot("face", AkumaLooks.MEN_FACES)
        .slot("iris", AkumaLooks.IRIS)
        .slot("mark", AkumaLooks.MARKS)
        .slot("outfit", LookSet.part("mymod:outfit/stripes", LookSet.FIXED))
        .slot("beard", AkumaLooks.BEARDS)
        .slot("hair", AkumaLooks.MEN_HAIR)
        .colours("skin", 0.04F, AkumaLooks.SKIN_TONES, AkumaLooks.SKIN_WEIGHTS)     // drawn by weight, varies by up to 4 %
        .colours("hair", 0.04F, AkumaLooks.HAIR_COLOURS, AkumaLooks.HAIR_WEIGHTS)
        .colours("iris", 0.0F, AkumaLooks.IRIS_COLOURS, AkumaLooks.IRIS_WEIGHTS)    // exact
        .together("mark", AkumaLooks.AGE, "hair", AkumaLooks.AGE_CHANCE, AkumaLooks.GREY_HAIR, AkumaLooks.WHITE_HAIR)
        .kind("woman", 6, woman -> woman.slot("face", AkumaLooks.WOMAN_FACES).slot("beard").slot("hair", AkumaLooks.WOMAN_HAIR))
        .build();
```

`AkumaLooks` holds AkumaLib's own layers, in Mine Mine no Mi's manner (the face measured on the base mod's NPC skins; ears; hair on the head layer only, as the base mod's), and their palettes. An addon adds its own parts beside them (its outfit, a haircut of its own).

- **Weights**: `colours(channel, jitter, colours, weights)` draws each colour by its weight (`AkumaLooks`: natural hair about 90 %, One Piece's vivid colours 10 %; dark eyes most common; light skins more common - a people's addon gives its own). Without weights every colour is as likely.
- **Together**: `together(slot, part, channel, chance, colours...)` makes a part and some colours come together - the age mark and grey or white hair, 60 % of the time when only one was drawn.
- The set must be built **on both sides**: keep the field in a class your mod loads at start (its main class, or the entity class itself), not one only server code reaches, or the client cannot read the looks and draws the missing texture.
- Slots are painted in the order they are declared.
- A part `"ns:path"` with channels `skin`, `hair` reads `ns:textures/look/path_skin.png` and `ns:textures/look/path_hair.png`: **128 x 128, on the humanoid skin's layout** (2 texels to a model pixel, as the base mod's NPCs), transparent where it draws nothing. A resource pack may replace any of them.
- The `brows` channel takes the colours given to it, or else the hair's, a shade darker on light natural hair (blond, ginger, auburn, grey).
- A channel with colours recolours a layer's greys by a gradient: **grey 128 is the colour itself**, darker greys its shades (115 = x0.90 on a light colour, x0.82 on a dark one: the base mod's nose), lighter greys go toward white. `LookSet.FIXED` (or a channel with no colours) draws the image as it is: the eyes' white, ink, an outfit in colour.
- **Lists only grow at their end.** A look is saved as its indices: inserting a part in the middle of a list changes the NPCs already in the worlds.

## Outfits in colour sets

Clothes are coloured from **sets that go together**, never from free colours, and each kind of NPC chooses its own outfits, details and sets (the maintainer, 2026-11-11). AkumaLib draws four outfits at the base mod's level of detail - `AkumaLooks.TUNIC`, `COAT`, `VEST`, `WORK_CLOTHES` - on three channels drawn together, `cloth`, `trim` and `gear` (belt, boots, straps), with brass buttons and buckles `fixed`; and `OUTFIT_DETAILS` (none, a print, a strap with an emblem, knee patches) for a slot of their own, drawn at random over the outfit.

```java
.slot("outfit", AkumaLooks.OUTFITS)
.slot("detail", AkumaLooks.OUTFIT_DETAILS)
.colourSets(0.03F, new String[] {"cloth", "trim", "gear"}, AkumaLooks.VILLAGER_CLOTHES)       // each colour varies by 3 %
```

An outfit that must keep sets of its own takes its own channels with `as`, so it never takes another's colours:

```java
.slot("outfit", AkumaLooks.TUNIC, AkumaLooks.COAT.as("coat_cloth", "coat_trim", "coat_gear", LookSet.FIXED))
.colourSets(0.03F, new String[] {"cloth", "trim", "gear"}, AkumaLooks.VILLAGER_CLOTHES)
.colourSets(0.03F, new String[] {"coat_cloth", "coat_trim", "coat_gear"},
        new int[] {0x23305C, 0xF2F0EA, 0x2A2420}, new int[] {0x5A2A2A, 0xD8C49A, 0x2A2420})
```

An addon's own outfit is drawn the same way: grey on its channels (128 = the colour, lower = folds and shades). One that never changes colour (Impel Down's black and white stripes) stays a `LookSet.FIXED` layer in colour.

## Wearing a look

=== "A base mod OPEntity"

    ```java
    @Override
    public SpawnGroupData finalizeSpawn(ServerLevelAccessor level, DifficultyInstance difficulty, MobSpawnType reason,
                                        @Nullable SpawnGroupData data, @Nullable CompoundTag tag) {
        data = super.finalizeSpawn(level, difficulty, reason, data, tag);
        this.setTexture(MyLooks.PRISONER.draw(this.random).texture());   // saved and sent by the base mod
        return data;
    }
    ```

    Register the base mod's `OPHumanoidRenderer.Factory` **without** `setTexture`: a texture fixed at the factory is drawn instead of the entity's own.

=== "A plain mob"

    Keep the look's name in your own synced data and save:

    ```java
    private static final EntityDataAccessor<String> LOOK = SynchedEntityData.defineId(MyMob.class, EntityDataSerializers.STRING);
    // defineSynchedData: this.entityData.define(LOOK, "");
    // finalizeSpawn:     this.entityData.set(LOOK, MyLooks.PRISONER.draw(this.getUUID()).texture().toString());
    // add/readAdditionalSaveData: the same string under a key of yours

    // its renderer
    public ResourceLocation getTextureLocation(MyMob mob) {
        return ResourceLocation.tryParse(mob.getEntityData().get(LOOK));
    }
    ```

A child (`isBaby()`): `look.withChild(true)` lays what the hat layer holds on the head, since a baby model hides its hat layer.

## A look chosen by hand

`set.look()` is the set's first look; `withPart(slot, index)`, `withColour(channel, rgb)` (any colour) and `withChild(...)` change a copy. `Look.of(texture)` reads one back, `null` for a name that is no look.

## Cost

One texture per look, shared by every NPC wearing it: 64 KiB of graphics memory, the copy in memory let go once sent. The client keeps **256 looks** at most (16 MiB), the least recently drawn let go and made again if seen again; a resource reload lets them all go. The layers read stay in memory (64 KiB each). The server only writes the texture name (about fifty characters) and never reads an image.

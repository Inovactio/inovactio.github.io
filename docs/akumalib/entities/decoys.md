# Decoys

`DecoyEntity` is the base for a **copy of a player that the monsters around take for him**: a double drawn in ink, a copy made of spores. Your subclass says what the copy is made of and how it ends. The base class brings the rest.

| Class | For |
|---|---|
| `DecoyEntity` | the copy itself: a mob that stands where it was set and draws the monsters |
| `PlayerCopyRenderer` | draws it as its maker: his body, his arms, his skin as you dress it |
| `PlayerCopy` | what the renderer asks of an entity: whose copy it is, and his profile. A decoy is one; so is any body of your own that should wear a player's skin |
| `RecolouredSkins` | a player's own skin in another matter, every pixel recoloured from its light and dark |

## What the base class does

- **It stands for its maker**: `standFor(maker, at, yaw, life)` sets it down under his name, as he is shown (team colour and marks), for `life` ticks. Its maker's id and profile are synced, so the renderer knows whose skin to wear, **even for a client that does not see him**: one too far from him, or in another dimension.
- **It does not move**: no speed, full knockback resistance, pushed by nobody, led by no lead, no loot.
- **It calls the monsters**: every 10 ticks, each monster within `callRange()` blocks (16) that is an enemy of its maker, can see it and passes `fools(mob)` turns on it. The quarry is also written to the brain's memory, for piglins and wardens.
- **Its maker's blows do nothing to it.**
- **It ends your way**: `fade(level)` when its time is over, its maker is gone, or nobody ever set it (one summoned, or read back from a save); `struckDown(level)` when its health is gone, in place of the game's own death. Neither removes it for you: discard it, dissolve it, leave a cloud.

```java
public class SporeCopy extends DecoyEntity {

    public static AttributeSupplier.Builder createAttributes() {
        return createDecoyAttributes(8.0D);
    }

    @Override
    protected void fade(ServerLevel level) {
        this.discard();
    }

    @Override
    protected void struckDown(ServerLevel level) {
        // what it leaves behind
        this.discard();
    }
}
```

## A copy with a life of its own

A copy that is not a decoy from its first tick to its last says so with `keeps(level)`: while it answers false the copy neither ages nor calls anyone. Do the copy's own work there.

```java
@Override
protected boolean keeps(ServerLevel level) {
    if (this.isDissolving()) {
        return false;
    }
    if (this.isInWaterOrBubble()) {
        this.dissolve();
        return false;
    }
    return !this.isStillADrawing();
}
```

`onDecoyTick()` runs every tick on both sides, before anything else of the decoy: for a phase the client counts as well.

## Drawing it

`PlayerCopyRenderer` draws the copy with a player's model, wide or slim arms as its maker's skin says. A maker the client cannot see lends nothing: the copy then wears the default skin of his id.

```java
public class SporeCopyRenderer extends PlayerCopyRenderer<SporeCopy> {

    public SporeCopyRenderer(EntityRendererProvider.Context context) {
        super(context);
    }

    @Override
    protected ResourceLocation skinOf(AbstractClientPlayer maker) {
        return RecolouredSkins.of(maker, "mymod/spore_copy", (r, g, b) -> {
            float light = RecolouredSkins.luminance(r, g, b);
            return RecolouredSkins.rgb(light * 0.57F, light * 0.38F, light * 0.74F);
        });
    }

    @Override
    protected ResourceLocation overlay(SporeCopy copy, boolean slim) {
        return slim ? MOULD_SLIM : MOULD;
    }
}
```

- `skinOf` returns the skin the copy wears; null for the maker's skin as it is.
- `overlay` is drawn translucent over the skin, on the skin's own layout; null for nothing.
- A model of your own - one that fades - goes through the second constructor: `super(context, MyFadingModel::new)`, and `body(copy)` gives the one a copy is drawn with.

## `RecolouredSkins`

A tint multiplies colours: a red shirt in "stone" stays a dark red. `RecolouredSkins.of(player, name, matter)` reads the skin back once, gives every pixel to `matter` and keeps the result as a texture of its own, so a red shirt becomes a pale one of the new matter.

`name` is the folder the textures are kept under: start it with your mod id (`"mymod/stone"`), so that two addons never share one. Call it on the render thread; it answers null for anything that is not a client player.

### A colour laid on the skin: `tinted`

`RecolouredSkins.tinted(player, name, tint)` lays a colour on the skin instead, keeping its light and shade: a race's skin colour, a hybrid's scales. Draw the player in the texture it gives INSTEAD of the skin, never with a layer drawing the model a second time over the first (the two copies flicker): register it with `SkinSwaps`, and AkumaLib draws the player's model and his first-person arm in it (see First-person limbs).

```java
// client setup; null = the player's own skin
SkinSwaps.register(SkinSwaps.RACE, player -> isFishman(player) ? RecolouredSkins.tinted(player, "mymod/fishman", FISHMAN) : null);
```

One skin wins: the first non-null answer of the highest priority. `SkinSwaps.FORM` (a hybrid's scales, while the form lasts) is above `SkinSwaps.RACE` (a race's colour, all the time): a fishman in a half-snake's hybrid is drawn in the snake's scales, laid on his own skin, and in his fishman's colour again when he leaves the form. Same priority: the first registered.

```java
// every skin-coloured pixel in a sea green; hair, eyes, mouth and clothes keep theirs
RecolouredSkins.tinted(player, "mymod/fishman", RecolouredSkins.SkinTint.skin(0x8CBAA2));

// through a mask laid out as a player skin: red = how much of the colour, green = a scale line in 0x96782E
RecolouredSkins.tinted(player, "mymod/king_cobra",
        new RecolouredSkins.SkinTint(0xECD678, new ResourceLocation("mymod", "textures/skin_mask.png"), 0x96782E, true));
```

The skin's own tone is found on the cheeks and under both hands, where eyes, mouths, beards and hair never are: the commonest colour there, a colourless one (an eye, black hair, white paint) counting half. Each pixel then takes the colour times its own light against that tone, so the tone itself becomes exactly the colour asked, and its shades stay as much darker or lighter as they were: a sea green comes out the same sea green on a pale skin and on a dark one.

`skinOnly` keeps the colour to the pixels close to that tone; the bounds of "close" shrink with a dark tone, whose hair is only a few steps from it. The lines stay everywhere. The copy is 256 px, room for a mask finer than the skin. A legacy 64 x 32 skin cannot be tinted: it answers null, and is not read back again.

## A body that is not a decoy

`PlayerCopyRenderer` draws any `Mob` that implements `PlayerCopy`, not only a decoy: a body its player left behind, a double that stays when he leaves the game. Give it the two answers the interface asks, synced and saved:

```java
public class LeftBody extends Mob implements PlayerCopy {

    private static final EntityDataAccessor<Optional<UUID>> OWNER = ...;
    private static final EntityDataAccessor<CompoundTag> PROFILE = ...;   // PlayerCopy.write(player.getGameProfile())

    @Override public UUID getMaker() { return this.entityData.get(OWNER).orElse(null); }
    @Override public GameProfile getMakerProfile() { return PlayerCopy.read(this.entityData.get(PROFILE)); }
}
```

The skin is found in that order: the player himself when this client sees him, the list of players in the game (everyone online, wherever they are), the skin written in the carried profile (a player who has left; only a server that checks accounts knows it), then the default skin of his id. `PlayerSkins.skin(profile, id)` and `PlayerSkins.slim(profile, id)` give the last three to a renderer of your own.

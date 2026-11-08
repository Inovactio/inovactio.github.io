# Fixes to the base mod

AkumaLib corrects faults of Mine Mine no Mi itself, for every mod that uses it and for a game with no addon at all.

!!! info "Since 4.0.0: some seventy-five corrections, each with a switch"
    After a full read of the base mod's code, 4.0.0 corrects it in some seventy-five places: crashes and freezes,
    progress lost at a relog, items destroyed for nothing, checks the server never made, protected areas, and a great
    deal of needless work per tick and per frame. The [4.0.0 changelog](../changelog.md#v4-0-0) lists them for players.

    Every one has a switch, on by default except `abilityBlockEvents`: server-side ones in the world's
    `serverconfig/akumalib-server.toml`, client-side ones in `config/akumalib-client.toml`, both in the section
    `[baseModFixes]`. Set one to `false` and the base mod's own behaviour is back for that group. Each switch's comment
    in the file says what it covers.

    4.1.0 adds three: a Logia in the void and under `/kill` (`fixLogiaAbsoluteDamage`), a refused press that stopped the
    running technique (`fixRefusedPress`), and chest windows counted as thefts (`fixChestTheft`). See the
    [4.1.0 changelog](../changelog.md#v4-1-0).

    4.2.0 adds four: a rider who leaves the game on a player's back (`fixRiderLeaving`), the travel through blocks of a
    user whose power is off (`fixBlockTravel`), a throw sent twice to a player (`fixDoubleThrow`), and a form's size
    under a low ceiling (`fixMorphPoseSize`). See the [4.2.0 changelog](../changelog.md#v4-2-0).

The sections below describe the older fixes in detail.

## Registrations lost while mods load

*Since 6.1.0.* Always on: it runs before any config is read. Forge keeps a deferred register's entries in a plain `LinkedHashMap`, and a class that registers an ability can load on any mod's thread while Forge builds the mods. Two puts together cut its links, and every entry behind the cut never reaches the game, with no error, on about one launch in twenty or thirty. The client is then refused by any server ("The following mod versions do not match"). `DeferredRegisterMixin` makes it one put at a time.

## Structure spawner mobs in walls

*Since 2.8.0.* `fixStructureSpawnerPlacement`, on by default.

Mine Mine no Mi's structure spawner (in its camps, bases, sky island houses and trainers' houses) moves each new mob
up to two blocks aside, without checking where. Mobs often appeared half or fully inside walls.

AkumaLib now places them where they fit:

1. where the base mod put them, if the mob fits there;
2. otherwise elsewhere within the same two blocks, in random order;
3. otherwise on the spawner's own block, then on the block above it.

A spot fits when the mob's whole body is free, it stands on solid ground, and nothing solid stands between it and the
spawner (so a spawner in a corridor never puts mobs in the room behind the wall). Which mob, how many and when stay
the base mod's.

Turned off, the base mod's own placement runs unchanged.

## Third-person camera inside a block

*Since 4.0.0.* Always on, client side.

A Logia travelling through its element, or any `LogiaBlockBypassingAbility` user inside the blocks it passes
(Missing Missing no Mi's Ishi Ishi no Mi in stone), saw a close-up of their own skin in third person (F5): the
vanilla camera stops at the first block behind the head, and that block was the one the player stood in.

While the player's head is inside a block they may pass through, the camera now ignores the blocks they may pass
through, and stands at its normal distance. Out of the blocks nothing changes: with their back to a wall, the camera
still stops at the wall.

## Partial morphs drawn at their scale squared

*Since 2.11.0.* A partial morph (a form drawn over the player, such as a hybrid) that scales itself in its
`preRenderCallback` was drawn at the **square** of that scale: a hybrid scaled 1.35 came out at 1.82, well past its box.

The cause is the base mod's cache of the current morph: `getCurrentMorph(boolean countPartials)` returns the cached
morph whatever `countPartials` says. The base mod's own held-item layer asks `getCurrentMorph(true)` every frame, so the
partial morph lands in the cache, `getCurrentMorph()` returns it too, and `MorphsHandler.preRenderHook` runs its
callback twice: once as the current morph, once as a partial one.

AkumaLib answers `getCurrentMorph()` without the cached partial, as the uncached lookup does. Your callback runs once,
and the scale you set is the scale drawn.

!!! warning "Forms change size on screen"
    Every scaled partial morph is drawn smaller (scale above 1) or larger (below 1) than before 2.11.0, at the size its
    author chose. The base mod's own Mammoth hybrid (2.0, drawn at 4.0) and Allosaurus hybrid (1.4, drawn at 1.96) are
    among them. If you tuned a scale by eye before 2.11.0, check it again.

## A partial morph's box on the client

*Since 2.11.0.* The base mod resizes a morphed body when its `MorphComponent` starts or ends a morph. On the client, a
partial morph arrives with the Devil Fruit sync instead, which resizes nothing: a player turned into a bigger hybrid
kept a 0.6 × 1.8 box on every screen, while the server used the morph's size. They were hit, pushed and blocked as a
normal player.

AkumaLib resizes every player whose box differs from what its morph asks for, on the client tick, and resizes it back
once when the morph ends. The size comes from your `MorphInfo.getSizes()`, as on the server.

## The Wind element icon

*Since 2.11.0.* `SourceElement.AIR` has no texture in the base mod, so wind techniques showed no element icon in the
ability tooltip. AkumaLib supplies one, only when the base mod returns none.

## Combat bar slots after an ability sync

*Since 2.12.0.* The base mod's ability sync (`AbilityDataBase.deserializeNBT`) keeps whatever ability a combat-bar
slot already holds and loads the slot's data into it, without checking that the data names that ability. It only
builds a new ability for an empty slot, and only empties a slot whose ability is no longer unlocked. So, on the
owner's client and on every player tracking them:

- after a **fruit change**, the slot stays empty until the next sync: the others see no form and no running technique;
- two abilities **swapped** between slots: one of them is lost;
- a slot **emptied** on the server keeps its old ability.

AkumaLib empties every slot whose ability is not the one the sync names, before the base mod fills them, so it builds
the right one. All of them are emptied before any is filled, because `setEquippedAbility` refuses an ability already
equipped in another slot. A slot that keeps its ability keeps the same instance, and with it the client-side state
(continuity, cooldown display).

!!! tip
    Before 2.12.0, an addon had to send `SSyncAbilityDataPacket` twice after changing a player's fruit for the new
    abilities to show. One sync is enough now.


## Large pirate ships and Marine battleships never generate

*Since 6.0.0.* Always on, data only.

Mine Mine no Mi's large pirate ship (`mineminenomi:pirate/large_ship`) and Marine battleship
(`mineminenomi:marine/battleship`) may only generate in the biomes of the tag `#mineminenomi:has_structure/large_ship`,
but the base mod ships that tag under another name (`has_structure/big_ship`). With an empty tag, neither ship ever
appeared in a world.

AkumaLib ships `data/mineminenomi/tags/worldgen/biome/has_structure/large_ship.json`, which points at the base mod's
`big_ship` tag: the deep oceans. Spacing, frequency and the ships themselves stay the base mod's. The tag uses
`"replace": false`, so a data pack that adds biomes to it (a player's own fix, for example) adds to it rather than
fighting it. Chunks already generated keep what they have: the ships appear in ocean explored after the update.

## No Devil Fruit in an item frame under the extended One Fruit rule

*Since 6.4.0.* `fixProtectionRules`, on by default.

With Mine Mine no Mi's "One Fruit per World" set to `EXTENDED`, the base mod keeps Devil Fruits out of containers: its
screens refuse to put one in a chest, and the fruits of the containers near a player fall at their feet. An item
frame is no container, so a fruit could still be hung in one and stay there.

Under that setting, the rule now holds for frames, plain and glowing:

- a click with a fruit on an empty frame does nothing: the fruit stays in the hand;
- a command or another mod that puts a fruit in a frame is refused;
- a fruit already in a frame (an existing world, or the setting switched on later) falls to the ground as an item,
  and the frame stays on its wall. It falls at the frame's own check that it still hangs, which Minecraft makes once
  every 100 ticks (5 seconds): a frame costs nothing more on the other ticks.

Under `NONE` or `SIMPLE`, or with `fixProtectionRules` false, frames take fruits as before.

## The mode key is a choice for later

*Since 6.4.0.* `fixModeKey`, on by default.

Mine Mine no Mi's mode key first asked whether the technique could be used. That question ended the transformation
running, even another one (Missing Missing no Mi's Gasha Gasha: Blindado on, choosing Union Armado's colossus ended
Blindado and put it on cooldown), and it refused the key on cooldown, while the technique was disabled (silence,
handcuffs, water), or when a check about the moment of use failed (no room under a roof for a size that was not even
the one being chosen).

The mode key now only changes the mode: on cooldown and disabled too, and it stops nothing. The checks run when the
technique is used. What may still refuse a mode is the technique's own rule for changing it, such as "not while the
form stands". The slot always shows the mode the technique is really in.

For an addon: a check about the mode chosen belongs in the technique's use checks (`addCanUseCheck`), not in the
mode change.

## Lower NPC bounties

*Since 6.5.0.* One key in `akumalib-server.toml`, section `bounties`, `0.1` by default.

A notorious NPC pirate's bounty climbs to hundreds of millions of belly, and a bounty hunter who redeems its wanted
poster gets the whole of it. Now an NPC's bounty grows by a tenth of what it did: the poster shows the lower amount and
pays exactly what it shows.

| Key | Default | |
|---|---|---|
| `bountyMultiplierNpc` | `0.1` | multiplies a notorious NPC pirate's bounty: its 100,000 to start, each gain after, and the 10,000 floor. `1` is Mine Mine no Mi's |

- **NPCs only** (maintainer's choice, 2026-11-08). A player's bounty, and what a player's poster pays, stay Mine Mine
  no Mi's. So do the bounty-based rules that read a player's bounty (Marine ambushes, the crew requirement, AkumaLib's
  return to civilian life).
- **New bounties only.** A bounty or a poster already saved keeps its value; only what is added from now on is lower.
- **Mine Mine no Mi's "Bounty Reward Multiplier"** multiplies the bounty a *player* gains from killing NPCs; it never
  touched NPC bounties, and this key does not touch players' bounties. The two do not combine.
- A poster shows the bounty issued when it was printed; when redeemed it pays the captain's bounty at that time, as in
  Mine Mine no Mi, which is the same unless the bounty grew since.

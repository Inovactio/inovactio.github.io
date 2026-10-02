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

    4.0.0 is a beta: the corrections were tested one by one, few of them in a long game yet.

The sections below describe the older fixes in detail.

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


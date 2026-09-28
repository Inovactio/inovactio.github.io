# Fixes to the base mod

AkumaLib corrects a few things in Mine Mine no Mi itself, for every mod that uses it. The structure spawner fix can be
turned off in the world's `serverconfig/akumalib-server.toml`, section `[baseModFixes]`; the others are plain bugs and
have no setting.

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

# Fixes to the base mod

AkumaLib corrects a few things in Mine Mine no Mi itself, for every mod that uses it. Each fix can be turned off in
the world's `serverconfig/akumalib-server.toml`, section `[baseModFixes]`.

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

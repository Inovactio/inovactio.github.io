# Jigsaw pools

`AkumaJigsaw` adds pieces to jigsaw pools another mod owns: a village's decorations, say. A datapack cannot do this. A pool file replaces the other mod's whole pool, and it breaks at that mod's next update.

```java
// at construction, once: a placed feature among the base mod's sky island town decorations
AkumaJigsaw.addFeature(new ResourceLocation("mineminenomi", "sky_islands/town_deco"),
        ResourceKey.create(Registries.PLACED_FEATURE, new ResourceLocation(MODID, "golden_fruit_tree_deco")), 1);

// or a structure template (data/<ns>/structures/<path>.nbt)
AkumaJigsaw.addTemplate(new ResourceLocation("mineminenomi", "sky_islands/single_deco"), new ResourceLocation(MODID, "orchard"), 1);
```

When the server starts, the library adds each piece to the loaded pool, once per point of `weight`. That is how the jigsaw counts weight, so a weight of 1 is as likely as each weight-1 piece already there.

A **feature** element places a placed feature at the piece's jigsaw point, so no structure file is needed. Give it a placed feature without biome or rarity filters: the pool already decided the spot.

A missing pool or feature is logged and skipped. The pool's list is reached through a mixin accessor (`StructureTemplatePoolAccessor`).

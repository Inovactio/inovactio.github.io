# Writing a catchable creature

## Writing one

```java title="HerculesBeetleEntity.java"
public class HerculesBeetleEntity extends CatchableFlyingCreature {

    public HerculesBeetleEntity(EntityType<? extends HerculesBeetleEntity> type, Level level) {
        super(type, level);
    }

    public static AttributeSupplier.Builder createAttributes() {
        return createCatchableFlyingAttributes();
    }

    @Override
    protected float getRareVariantChance() {
        return 0.05F; // the Golden Hercules
    }
}
```

| Override | Default | Use it to |
|---|---|---|
| `getReaction()` | `FLEE` | pick how it reacts to players |
| `getFleeDistance()` | `6` blocks | make it shyer or bolder |
| `getEscapeSpeed()` | `1.8` | how fast a `TAKE_OFF` creature runs |
| `getRareVariantChance()` | `0` | give it a rare variant |
| `pickVariant(random)` | common or rare | pick among more than two variants |
| `canBeCapturedWith(tool)` | any tool | restrict it, for example to a trap |
| `getPerch()` | none | make it wait on a flower or a trunk |
| `getMaxAttacks()`, `getAttackDamage()`, `onAttackHit` | 3, 1, nothing | tune an `ATTACK` creature |
| `canLand()` (flying) | `false` | let it rest on the ground between flights |
| `getCaptureLootTable()` | `<namespace>:capture/<path>` | point at another table |

Attributes: `createCatchableAttributes()` gives 2 health and a slow walk; `createCatchableFlyingAttributes()` adds a flying speed. Add to them in your own builder.

## Registering it

Like any mob: the entity type, its attributes, a renderer with a model layer, and spawning. The spawn category is the entity type's: `AMBIENT` for insects, `CREATURE` for lizards and frogs.

```java
public static final RegistryObject<EntityType<HerculesBeetleEntity>> HERCULES_BEETLE =
        MyRegistry.REGISTRY.registerEntityType("Hercules Beetle",
                () -> AkumaRegistry.<HerculesBeetleEntity>createMobType(HerculesBeetleEntity::new, MobCategory.AMBIENT)
                        .sized(0.4F, 0.3F)
                        .build("mymod:hercules_beetle"));

// mod bus
@SubscribeEvent
public static void attributes(EntityAttributeCreationEvent event) {
    event.put(HERCULES_BEETLE.get(), HerculesBeetleEntity.createAttributes().build());
}

// mod bus, client
@SubscribeEvent
public static void renderers(EntityRenderersEvent.RegisterRenderers event) {
    event.registerEntityRenderer(HERCULES_BEETLE.get(), ctx -> new CatchableCreatureRenderer<>(ctx,
            new HerculesBeetleModel<>(ctx.bakeLayer(HerculesBeetleModel.LAYER)), 0.2F,
            new ResourceLocation("mymod", "textures/entity/hercules_beetle.png"),
            new ResourceLocation("mymod", "textures/entity/golden_hercules.png")));
}
```

!!! warning "The model layer is yours to register"
    A model layer that never reaches `EntityRenderersEvent.RegisterLayerDefinitions` crashes the game on `bakeLayer`. There is no fallback.

### Spawning

Prefer AkumaLib's **surface spawner**: vanilla's natural spawning picks a random height in the column, so most attempts land underground (where a creature needing a flower or a trunk is refused), and the ambient cap is shared with bats.

```json title="data/mymod/creature_spawns/hercules_beetle.json"
{
  "entity": "mymod:hercules_beetle",
  "biomes": ["#minecraft:is_jungle", "#minecraft:is_forest"],
  "chance": 0.7,
  "group": { "min": 1, "max": 2 },
  "max_nearby": 8,
  "requires_sky": true
}
```

Every 5 seconds, for each player and each file, a roll of `chance`; on a hit, a spot 16 to 48 blocks away **on the surface**, in the biomes, and a group that passes the entity's own spawn rule (below), finalised as a natural spawn (variants, perches). `requires_sky` means outside: nothing solid above the spot, leaves allowed. `max_nearby` caps that creature within 48 blocks of the player (checked before each member of a group). Spawns go through Forge's spawn hooks, so spawn-control mods can refuse them. An optional `"altitude": {"min": 6, "max": 12}` spawns it that high above the surface (water included): a bird over the sea. An optional `"max_y": 100` keeps every spawn below that height (a sea bird off the base mod's sky islands). An optional `"min_y": 150` keeps every spawn at or above it: with the biomes the base mod's sky islands stand over (`#mineminenomi:has_structure/sky_island`), the islands alone. An optional `"time": "night"` (or `"day"`) spawns it only then (a firefly); the recipe viewers say so. An optional `"underground": true` looks for a cave spot under the surface instead - a floor with room above and no sky, between `min_y` and `max_y` - for the creatures of the dark. `doMobSpawning` is respected.

A Forge biome modifier still works, for vanilla-style spawning:

```json title="data/mymod/forge/biome_modifier/hercules_beetle.json"
{
  "type": "forge:add_spawns",
  "biomes": "#minecraft:is_jungle",
  "spawners": { "type": "mymod:hercules_beetle", "weight": 20, "minCount": 1, "maxCount": 2 }
}
```

How it is placed is code, in `SpawnPlacementRegisterEvent`:

```java
event.register(HERCULES_BEETLE.get(), SpawnPlacements.Type.ON_GROUND,
        Heightmap.Types.MOTION_BLOCKING_NO_LEAVES, Mob::checkMobSpawnRules, SpawnPlacementRegisterEvent.Operation.REPLACE);
```

## Capturing it

A tool, such as a net, calls `capture` on the server:

```java
@Override
public InteractionResult interactLivingEntity(ItemStack stack, Player player, LivingEntity target, InteractionHand hand) {
    if (target instanceof CatchableCreature creature && player instanceof ServerPlayer serverPlayer
            && creature.capture(serverPlayer, stack)) {
        stack.hurtAndBreak(1, player, p -> p.broadcastBreakEvent(hand));
        return InteractionResult.SUCCESS;
    }
    return InteractionResult.PASS;
}
```

What a capture gives is a loot table, `data/<namespace>/loot_tables/capture/<path>.json`, rolled as a `minecraft:gift` table (it knows the creature and where it was):

```json title="data/mymod/loot_tables/capture/hercules_beetle.json"
{
  "type": "minecraft:gift",
  "pools": [ { "rolls": 1, "entries": [ { "type": "minecraft:item", "name": "mymod:sweet_sap" } ] } ]
}
```

!!! note "No table, no loot"
    A creature with no capture table is still caught and removed; the player just gets nothing. The kill loot table, `entities/<path>`, is separate and still used if the creature dies.

### `CreatureCaptureEvent`

Fired on the Forge bus, server side, after the loot is rolled and before it is given. Cancelable.

| Method | Gives |
|---|---|
| `getCreature()` | the creature, still in the world: its variant, its position |
| `getTool()` | the item used |
| `getLoot()` | what the player receives; mutable |

For advancements, AkumaLib fires `akumalib:creature_capture` itself (see [Advancements](../professions/advancements.md)). The event is the place to grant a gathering profession's XP, or to record a first capture:

```java
@SubscribeEvent
public static void onCapture(CreatureCaptureEvent event) {
    if (event.getEntity() instanceof ServerPlayer player) {
        long xp = event.getCreature().getVariant() == 1 ? 50 : 10;
        AkumaProfessions.addXp(player, MyProfessions.HUNTER.get(), xp);
    }
}
```

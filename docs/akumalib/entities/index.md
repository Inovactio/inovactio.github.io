# Entities

AkumaLib provides three entity base classes a technique can spawn, and one for creatures that live in the world:

| Class | For | Page |
|---|---|---|
| `BoomerangProjectile` | a projectile that flies out, turns and comes back, hitting on both legs | [Projectiles](projectiles.md) |
| `TransmutationProjectile` | a projectile applying a transmutation effect whose duration depends on Doriki | [Projectiles](projectiles.md) |
| `TornadoEntity` | a funnel that pulls things in, tears up blocks, and can be steered | [Tornadoes](tornadoes.md) |
| `CatchableCreature`, `CatchableFlyingCreature` | a small creature that flees players and is caught with a tool rather than killed | [Catchable creatures](creatures.md) |

The library ships **no entity type, model or renderer** for them: each addon registers its own subclass and draws it the way its fruit looks.

## Registering an entity

Every entity your addon spawns needs four things. Forgetting one fails in a different way each time.

### 1. The entity type

`AkumaRegistry` builds and registers the type:

```java title="MyEntities.java"
public static final RegistryObject<EntityType<MyBoneProjectile>> BONE =
        MyRegistry.REGISTRY.registerEntityType("Bone",
                () -> AkumaRegistry.<MyBoneProjectile>createProjectileType(MyBoneProjectile::new)
                        .build("mymod:bone"));
```

!!! note "Spell out the type witness"
    `AkumaRegistry.<MyBoneProjectile>createProjectileType(...)` names the entity type explicitly, as the addons built on AkumaLib do. It keeps the builder's type from depending on what the compiler can infer through the supplier lambda.

| Builder | Tracking settings | Default size |
|---|---|---|
| `AkumaRegistry.createProjectileType(factory)` | range 64, velocity updates every tick | `0.75 x 0.75` |
| `AkumaRegistry.createEntityType(factory[, category])` | same | `0.6 x 1.8` |
| `AkumaRegistry.createMobType(factory, category)` | same, for a `Mob` | `0.6 x 1.8` |

### 2. The deferred register on the bus

```java
MyRegistry.REGISTRY.ENTITY_TYPES.register(modEventBus);
```

!!! warning "Easy to miss on the first entity"
    An addon with no entity so far may never have attached `ENTITY_TYPES`. The type then never registers, silently.

### 3. Two constructors

```java
// used by the game to load the entity from a save or a packet
public MyBoneProjectile(EntityType type, Level level) {
    super(type, level);
}

// used by your ability to fire it
public MyBoneProjectile(Level level, LivingEntity thrower, IAbility ability) {
    super(MyEntities.BONE.get(), level, thrower, ability);
}
```

The first is mandatory: it is the factory the entity type calls. Use the raw `EntityType` in its signature.

### 4. A renderer, and a layer definition for a custom model

```java
// client-side, on the mod event bus
modEventBus.addListener((EntityRenderersEvent.RegisterRenderers event) ->
        event.registerEntityRenderer(MyEntities.BONE.get(), MyBoneRenderer::new));

modEventBus.addListener((EntityRenderersEvent.RegisterLayerDefinitions event) ->
        event.registerLayerDefinition(MyBoneModel.LAYER_LOCATION, MyBoneModel::createBodyLayer));
```

!!! danger "A model whose layer definition is not registered crashes"
    `bakeLayer` on a layer that never reached `RegisterLayerDefinitions` is a crash when the renderer is built, not a silent fallback. Every custom model needs its layer registered.

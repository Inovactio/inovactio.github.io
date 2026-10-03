# The registry

`AkumaRegistry` is the one object an addon registers everything through: it holds a deferred register for each
kind of entry, bound to your mod id, and a `register...` method for each. [Getting started](../getting-started.md)
creates it and puts its registers on the event bus; this page lists what it can register.

```java
public static final AkumaRegistry REGISTRY = new AkumaRegistry(MyMod.MODID);
```

## Names and ids

Most methods take a **display name** and derive the registry id from it, the way the base mod does
(`WyHelper.getResourceName`): lower case, spaces to `_`, and `, : - ' #` dropped. `"Ushi Ushi no Mi, Model: Giraffe"`
becomes `ushi_ushi_no_mi_model_giraffe`.

!!! warning "A hyphen disappears from the id"
    `"Knock-Up Core"` registers as `knockup_core`. To keep the two words apart in the id, register `"Knock Up Core"`
    and write the hyphen in the language file.

The display name is also recorded in `getLangMap()`, under the translation key the game will look up. Nothing reads
that map at runtime: it is there for your language data generator, and in a debug environment a key recorded twice
is reported. Without a generator, write the same keys in `en_us.json` yourself.

## What each method registers

| Method | Registers | Id | Translation key recorded |
|---|---|---|---|
| `registerAbility(id, name, core)` | an ability core | `id`, as given | `ability.<modid>.<id>` |
| `registerAbilityName(key, name)` | a name only, for an ability's other names (an [amplified](amplification.md) form, a mode) | none | `ability.<modid>.<key>`, returned |
| `registerName(category, key, name)` | a name only, in any of the base mod's categories | none | `<category>.<modid>.<key>`, returned |
| `registerFruitItem(name, item)` | a Devil Fruit, and its ability group | from the name | `item.<modid>.<id>` |
| `registerItem(name, item)` | an item | from the name | `item.<modid>.<id>` |
| `registerSpawnEggItem(entityName, egg)` | a spawn egg, `<entity>_spawn_egg` | from the entity's name | `item.<modid>.<id>`, as "Spawn *entity*" |
| `registerBlock(name, block)` | a block **and its item** | from the name | `block.<modid>.<id>` |
| `registerBlock(name, block, properties)` | the same, with the item's properties | from the name | `block.<modid>.<id>` |
| `registerBlock(name, block, itemFunction)` | the same, with an item of your own class | from the name | `block.<modid>.<id>` |
| `registerBlockOnly(name, block)` | a block with **no item**: nothing can hold it | from the name | `block.<modid>.<id>` |
| `registerEffect(name, effect)` | a status effect | from the name | `effect.<modid>.<id>` |
| `registerEffect(name, key, effect)` | the same, with an id that differs from the name | from `key` | `effect.<modid>.<id>` |
| `registerEntityType(name, type)` | an entity type | from the name | `entity.<modid>.<id>` |
| `registerEntityType(name, id, type)` | the same, with an id of your own | `id`, as given | `entity.<modid>.<id>` |
| `registerProfession(name, profession)` | a [profession](../professions/index.md) | from the name | `profession.<modid>.<id>` |
| `registerAttribute(name, attribute)` | an attribute, `generic.<id>` | from the name | `attribute.name.generic.<modid>.<id>` |
| `registerSound(name)` | a sound event of variable range | from the name | `<modid>.subtitle.<id>` |
| `registerCreativeTab(name, tab)` | a creative tab | from the name | none: the tab carries its own title |
| `registerMorph(id, morph)` | a morph (a Zoan form, a transformation) | `id`, as given | none |
| `registerParticleEffect(name, effect)` | one of the base mod's particle effects, `particle_effect.<modid>.<id>` | from the name | none |
| `registerParticleType(name, type)` | a particle type | from the name | none |
| `registerMenu(id, menu)` | a container menu, for a [workstation](../professions/workstations.md) screen | `id`, as given | none |
| `registerBlockEntityType(id, type)` | a block entity type | `id`, as given | none |
| `registerRecipeType(id)` | a recipe type, what `RecipeManager` looks recipes up by | `id`, as given | none |
| `registerRecipeSerializer(id, serializer)` | a recipe serializer, what a recipe file writes in `"type"` | `id`, as given | none |

Fluids, structures and the worldgen types have no method of their own: register them on the matching register
(`REGISTRY.FLUIDS.register(...)`), listed in [Getting started](../getting-started.md#3-attach-the-deferred-registers-to-the-event-bus).

!!! warning "A fruit is not an item like the others"
    Register a Devil Fruit with `registerFruitItem`, never `registerItem`. As a plain item it loads, drops, is eaten
    and grants its abilities, but they are never grouped: the ability menu shows the fruit's moves scattered. Nothing
    logs the difference.

    Its texture goes in `assets/<modid>/textures/items/<id>.png` (**items**, plural, as the base mod's own), and it
    reaches a Devil Fruit box through a [data file](../loot-injection/devil-fruit-boxes.md): a fruit no box holds is
    named in the log.

!!! note "A menu that needs data when it opens"
    For a menu that must know something from the server as it opens (the block's position, typically), register
    `() -> IForgeMenuType.create(MyMenu::new)` and open it with `NetworkHooks.openScreen`.

## Entity type builders

Three static helpers start an `EntityType.Builder` with the settings this family of mods uses: tracked from 64
blocks, velocity sent, updated every tick. They touch no register: pass the built type to `registerEntityType`.

| Helper | Category | Size |
|---|---|---|
| `AkumaRegistry.createEntityType(factory)` | `MISC` | 0.6 × 1.8 |
| `AkumaRegistry.createEntityType(factory, category)` | yours | 0.6 × 1.8 |
| `AkumaRegistry.createMobType(factory, category)` | yours | 0.6 × 1.8 |
| `AkumaRegistry.createProjectileType(factory)` | `MISC` | 0.75 × 0.75 |

```java
public static final RegistryObject<EntityType<MyProjectile>> MY_PROJECTILE = MyRegistry.REGISTRY.registerEntityType(
        "My Projectile", () -> AkumaRegistry.createProjectileType(MyProjectile::new).build("mymod:my_projectile"));
```

Change the size with `.sized(width, height)` on the builder before `build`.

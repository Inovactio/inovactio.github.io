# Getting started

This page takes an empty Forge 1.20.1 mod to a registered ability built on AkumaLib. It assumes you already have a working Forge MDK project.

## 1. Add the dependencies

AkumaLib is published on CurseForge, and its base classes all extend Mine Mine no Mi types, so your addon needs **both** mods on its classpath.

```groovy title="build.gradle"
repositories {
    maven {
        url "https://cursemaven.com"
        content { includeGroup "curse.maven" }
    }
    maven {
        url "https://api.modrinth.com/maven"
        content { includeGroup "maven.modrinth" }
    }
}

dependencies {
    minecraft "net.minecraftforge:forge:1.20.1-47.4.18"

    implementation fg.deobf("maven.modrinth:mine-mine-no-mi:1.20.1-0.11.5")
    // AkumaLib 2.6.0 on CurseForge: project 1678152, file 8974217
    implementation fg.deobf("curse.maven:akumalib-1678152:8974217")
}
```

!!! warning "The file id changes with every release"
    A Cursemaven coordinate is `curse.maven:<slug>-<project id>:<file id>`. The project id, `1678152`, never changes; the **file id identifies one specific upload**. To move to a newer AkumaLib, open its file on the [CurseForge files page](https://www.curseforge.com/minecraft/mc-mods/akumalib/files) and copy the number at the end of its URL.

    A Modrinth release is under review. Once it is approved, the dependency can be declared by version number instead.

!!! note "Always through `fg.deobf`"
    The published jar is reobfuscated, like every Forge mod on CurseForge. `fg.deobf` maps it back to the names your code compiles against. If you develop the library and your addon side by side, see [Development](development.md) for the composite build instead.

Then declare AkumaLib as a required dependency, so Forge shows its missing-mod screen instead of crashing when a player forgets it:

```toml title="src/main/resources/META-INF/mods.toml"
[[dependencies.yourmodid]]
    modId = "akumalib"
    mandatory = true
    versionRange = "[2.6.0,3)"
    ordering = "AFTER"
    side = "BOTH"

[[dependencies.yourmodid]]
    modId = "mineminenomi"
    mandatory = true
    versionRange = "[0.11,)"
    ordering = "AFTER"
    side = "BOTH"
```

## 2. Create your registry

`AkumaRegistry` carries every deferred register a Mine Mine no Mi addon needs (abilities, items, effects, entity types, morphs, particles, sounds...) bound to **your** mod id. Create exactly one, and hold it in a constant:

```java title="MyRegistry.java"
public class MyRegistry {

    public static final AkumaRegistry REGISTRY = new AkumaRegistry(MyMod.MODID);
}
```

!!! tip "Wrap it in a facade"
    The addons built on AkumaLib wrap the registry in a static class that forwards the methods they use, so call sites read `MyRegistry.registerItem(...)` and the mod id is written in one place. Forward only what you call: a delegation method nobody uses still has to be re-checked every time the library changes.

## 3. Attach the deferred registers to the event bus

In your mod constructor, register every deferred register you use on the **mod** event bus:

```java title="MyMod.java"
@Mod(MyMod.MODID)
public class MyMod {

    public static final String MODID = "mymod";

    public MyMod() {
        IEventBus modEventBus = FMLJavaModLoadingContext.get().getModEventBus();

        MyRegistry.REGISTRY.ABILITIES.register(modEventBus);
        MyRegistry.REGISTRY.ITEMS.register(modEventBus);
        MyRegistry.REGISTRY.SOUNDS.register(modEventBus);

        MyAbilities.init();
        MyItems.init();
    }
}
```

`AkumaRegistry` carries one deferred register per kind of entry an addon may add:

| Register | For |
|---|---|
| `ABILITIES`, `MORPHS` | abilities and Zoan forms |
| `ITEMS`, `BLOCKS`, `ENTITY_TYPES`, `CREATIVE_MODE_TABS` | items, blocks, entities, tabs |
| `EFFECTS`, `ATTRIBUTES`, `SOUNDS`, `PARTICLE_TYPES`, `PARTICLE_EFFECTS` | effects, attributes, sounds, particles |
| `PROFESSIONS` | [professions](professions/index.md) |
| `MENUS`, `BLOCK_ENTITY_TYPES`, `RECIPE_TYPES`, `RECIPE_SERIALIZERS` | workstations: their screen, block entity and recipes |
| `FLUIDS`, `FLUID_TYPES` | fluids, and the type that says how one behaves (swimming, boats, fog) |
| `DENSITY_FUNCTION_TYPES`, `BIOME_SOURCES`, `CHUNK_GENERATORS`, `FEATURES`, `PLACEMENT_MODIFIER_TYPES` | terrain of your own: their codecs and types, the instances coming from datagen |
| `STRUCTURE_TYPES`, `STRUCTURE_PLACEMENT_TYPES`, `STRUCTURE_PIECE_TYPES` | structures; a piece type left unregistered loses its structure on reload |

Put every register you fill on the bus; an empty one on the bus costs nothing.

!!! warning "A deferred register that never reaches the bus fails silently"
    Its entries simply never appear. There is no error and nothing in the log. When your first projectile, effect or sound "does nothing", check this line first.

## 4. Touch your holder classes

This is the trap everyone falls into once.

Abilities, items and effects are created from `static final` fields. Java only runs a static initialiser the **first time the class is used**, and that first use is often a player eating a fruit, long after Forge has closed its registries. The deferred register then throws:

```text
Cannot register new entries to DeferredRegister after RegisterEvent has been fired
```

and the stack trace names whichever of **your** classes happened to load first, with no hint that a static initialiser simply ran too late.

The fix is to load every holder class from the mod constructor, which the `init()` calls above do:

```java title="MyAbilities.java"
public class MyAbilities {

    public static void init() {
        touch(MyFirstAbility.INSTANCE);
        touch(MySecondAbility.INSTANCE);
    }

    private static void touch(Object obj) {
    }
}
```

!!! danger "Nothing checks this for you"
    Both orderings compile. Every time you add an ability, add its `touch(...)` line, or it registers too late and crashes the game on startup.

## 5. Register your first ability

`registerAbility` records the display name for translation and registers the `AbilityCore`:

```java title="MyFirstAbility.java"
public class MyFirstAbility extends Ability {

    private static final float COOLDOWN = 100.0F;

    public static final RegistryObject<AbilityCore<MyFirstAbility>> INSTANCE =
            MyRegistry.REGISTRY.registerAbility("my_first_ability", "My First Ability", (id, name) -> {
                Component[] desc = AbilityHelper.registerDescriptionText(MyMod.MODID, id,
                        ImmutablePair.of("Does something to everything nearby.", null));
                return new AbilityCore.Builder<>(id, name, AbilityCategory.DEVIL_FRUITS, MyFirstAbility::new)
                        .addDescriptionLine(desc)
                        .addAdvancedDescriptionLine(AbilityDescriptionLine.NEW_LINE,
                                CooldownComponent.getTooltip(COOLDOWN))
                        .setIcon(new ResourceLocation(MyMod.MODID, "textures/abilities/my_first_ability.png"))
                        .build(MyMod.MODID);
            });

    public MyFirstAbility(AbilityCore<MyFirstAbility> core) {
        super(core);
        this.addUseEvent(this::onUseEvent);
    }

    private void onUseEvent(LivingEntity entity, IAbility ability) {
        // ... the technique ...
        this.cooldownComponent.startCooldown(entity, COOLDOWN);
    }
}
```

Then add the translations the registry expects:

```json title="src/main/resources/assets/mymod/lang/en_us.json"
{
  "ability.mymod.my_first_ability": "My First Ability",
  "ability.mymod.my_first_ability.description.0": "Does something to everything nearby."
}
```

## 6. Register a Devil Fruit

A fruit is an `AkumaNoMiItem` listing the ability cores it grants. Register it with `registerFruitItem`:

```java title="MyItems.java"
public static final RegistryObject<AkumaNoMiItem> MY_MY_NO_MI = MyRegistry.REGISTRY.registerFruitItem(
        "My My no Mi",
        () -> new AkumaNoMiItem(1, FruitType.PARAMECIA, MyFirstAbility.INSTANCE));
```

The registry name comes from the display name: whitespace becomes `_` and `, : - ' #` are dropped, so `"My My no Mi"` registers as `my_my_no_mi`.

!!! danger "`registerFruitItem`, never `registerItem`, for a fruit"
    A fruit registered as a plain item loads, drops, can be eaten and grants its abilities, but those abilities are never grouped in the ability menu. Nothing logs the difference.

!!! warning "Item textures live in `textures/items/`, plural"
    Put the texture at `assets/mymod/textures/items/my_my_no_mi.png`, with the model's `layer0` pointing at `mymod:items/my_my_no_mi`. The vanilla singular `textures/item/` shows the right icon in the inventory and the missing-texture square in the base mod's ability screen, which builds the path by convention. The log names the file it wanted.

!!! success "Loot boxes are automatic"
    `registerFruitItem` injects the fruit into the base mod's Devil Fruit box matching its tier (1 wooden, 2 iron, 3 golden), at the same weight as the base mod's own fruits. You write no loot table. Pass `false` as a third argument for a fruit that must stay unobtainable.

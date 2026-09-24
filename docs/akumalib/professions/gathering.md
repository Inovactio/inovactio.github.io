# Gathering: fruit trees, crops and profession-only blocks

Pieces for a gathering profession (a farmer, say): a fruit that hangs under leaves and grows back, a crop with the same rules, and block items only the profession can place. Both live in `com.inovactio.akumalib.api.gathering`.

## HangingFruitBlock

A fruit hanging under leaves. It grows through four stages (`age` 0 to 3) on random ticks or with bone meal. Once ripe, a right-click picks it and it starts again from a bud: a tree that keeps giving.

```java
public static final RegistryObject<HangingFruitBlock> RED_FRUIT = MyRegistry.REGISTRY.registerBlock("Red Fruit Bud",
        () -> new HangingFruitBlock(BlockBehaviour.Properties.of().noCollission().randomTicks().instabreak()
                .sound(SoundType.CROP).pushReaction(PushReaction.DESTROY),
                MyItems.RED_FRUIT, MyProfessions.FARMER, 4, 0.2F));
```

The arguments are the fruit item, the profession that picks it cleanly (`null` for anyone), the XP per fruit, and the chance a random tick moves it one stage on.

Picking follows the profession, softly:

| Who picks | What happens |
|---|---|
| A practitioner (everyone in Solo mode, and creative players) | always the fruit, sometimes two (20 % at level 1, one point more per level, 75 % at most), and the XP |
| Anyone else | half the time the fruit bruises: nothing drops and the message names the profession; otherwise one fruit, no XP |

It needs leaves right above it (`#minecraft:leaves`) and falls with them. What breaking it gives is its block loot table's business.

To hang fruit in a generated tree, use vanilla's `attached_to_leaves` decorator in the tree's configured feature, with a randomised `age` so a new tree carries fruit at every stage:

```json
"decorators": [
  {
    "type": "minecraft:attached_to_leaves",
    "probability": 0.14,
    "exclusion_radius_xz": 1,
    "exclusion_radius_y": 0,
    "required_empty_blocks": 1,
    "directions": ["down"],
    "block_provider": {
      "type": "minecraft:randomized_int_state_provider",
      "property": "age",
      "values": { "type": "minecraft:uniform", "value": { "min_inclusive": 0, "max_inclusive": 3 } },
      "source": { "type": "minecraft:simple_state_provider", "state": { "Name": "mymod:red_fruit_bud", "Properties": { "age": "0" } } }
    }
  }
]
```

## ProfessionCropBlock

A `CropBlock` with the fruit's rules, judged when a player breaks it ripe:

| Who reaps | What happens |
|---|---|
| A practitioner (everyone in Solo mode, and creative players) | the crop's loot table, sometimes one more `produce` (the same chance as the fruit), and the XP |
| Anyone else | half the time the harvest spoils: a single seed comes back, to replant, and the message names the profession; otherwise the loot table, no XP |

An unripe crop, or one broken by water or a piston, drops its loot table as any crop does. It grows on farmland like wheat; override `mayPlaceOn` or `canSurvive` for a crop that grows in sand or in the shade.

```java
() -> new ProfessionCropBlock(BlockBehaviour.Properties.copy(Blocks.WHEAT),
        MyItems.BITTER_GRASS_SEEDS, MyItems.BITTER_GRASS, MyProfessions.FARMER, 6)
```

## ProfessionBlockItem

A `BlockItem` that only the profession's practitioners can place. Use it for a sapling only a farmer plants. Anyone else gets a message naming the profession, and nothing is placed. Creative players always can, and so can a dispenser.

```java
MyRegistry.ITEMS.register("red_fruit_sapling",
        () -> new ProfessionBlockItem(MyBlocks.RED_FRUIT_SAPLING.get(), new Item.Properties(), MyProfessions.FARMER));
```

`ProfessionSeedsItem` does the same for seeds, with a name of their own (vanilla's `ItemNameBlockItem`, as wheat seeds plant wheat): only the profession sows them.

The `akumalib.fruit.not_ripe`, `akumalib.fruit.bruised`, `akumalib.crop.spoiled` and `akumalib.profession.place_only` messages come from AkumaLib's lang.

## What a profession gets, in JEI and EMI

`ProfessionDrops` shows what a gathering profession gets, and from what, in the recipe viewers: the rocks a miner breaks, the creatures a hunter catches. Each **category** is a viewer category of its own; each **drop** is one entry in it:

- what the drop comes from, shown in turn (the blocks of a tag, a creature's item);
- up to ten outputs, each with a chance, a count, the level it takes and the XP it gives, in its tooltip;
- the level the drop takes above the arrow, and its XP and notes below.

The drops come from data the client does not have, so they are built on the server. They are sent to every player when they join and on `/reload`, before the recipes, so the viewers have them when they load. Register the categories and a provider once, at construction:

```java
ProfessionDrops.registerCategory(new ProfessionDrops.Category(MINING, MINER_ID, "mymod.drops.mining",
        () -> new ItemStack(Items.IRON_PICKAXE), () -> List.of(new ItemStack(Items.IRON_PICKAXE))));
ProfessionDrops.register((server, out) -> MyMiningTable.entries().forEach(entry -> out.accept(new ProfessionDrops.Drop(
        MINING, entry.blockStacks(), entry.outputs(), 1, entry.xp(), List.of()))));
```

| Record | Holds |
|---|---|
| `Category(id, profession, titleKey, icon, catalysts)` | the viewer category: its title, icon, catalysts (the tools used) and the profession named in the level lines |
| `Drop(category, sources, outputs, level, xp, notes, where)` | one entry; `notes` are extra lines after the XP ("first catch: +75 XP"); `where` says where the source is found, in the source's tooltip and a "Where?" label (the six-argument constructor leaves it empty) |
| `Output(stack, min, max, chance, minLevel, xp)` | one thing that may come out |

`LootSummary.summarize(server, table)` reads a loot table into outputs, with their chances. It reads the table's JSON rather than rolling it, and understands:

- pools and their rolls;
- `item`, `tag`, `alternatives`, `group`, `sequence` and nested `loot_table` entries, with their weights;
- `random_chance` conditions and `set_count`.

A condition it cannot judge (a tool match, the weather) leaves its entry out.

`CreatureHabitats.describe(server, entityType)` gives a catchable creature's `where` lines. It lists the biomes it spawns in in the wild (`creature_spawns/`) and those traps catch it in (`trapping/`), tags resolved into biome names, with their conditions: the open sky, a height limit, which traps.

`BiomeNames.lines(server, ids, tags)` does the same for any biome list (a fishing entry's, say): the tags resolved, the biomes named a few to a line, "Anywhere" for none.

The `akumalib.drops.*` and `akumalib.habitat.*` lines come from AkumaLib's lang.

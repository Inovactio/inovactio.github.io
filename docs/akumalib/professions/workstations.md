# Workstations

A **workstation** is a block where one profession makes its recipes: a kitchen for a cook, a workshop for an inventor. The library provides the block class, the menu, the screen, the recipe format and the crafting itself. An addon declares the block, a recipe type and the recipes as JSON.

## What the player sees

Right-clicking a workstation opens a screen listing every recipe of its type, sorted by level:

| Recipe state | Shown as | Craftable |
|---|---|---|
| **Locked**: the player's level is below the recipe's | a very dark silhouette, "Requires <profession> level N" | no |
| **Unknown**: level reached, never made | a silhouette, its name hidden as `???` | yes |
| **Known**: made at least once | the item, in full | yes |

Selecting a recipe shows its ingredients, with how many of each the player holds, the level it needs and the XP it gives. **Craft** takes the ingredients straight from the inventory, main inventory first, then the offhand, never armour. There is no grid to fill: that is the "auto-fill".

In Crew mode, a player without the workstation's profession sees the recipes but cannot craft: the screen says *You must have the <profession> profession to make recipes.*

## Declaring a workstation

```java
// a recipe type and its serializer, one pair per workstation
public static final RegistryObject<RecipeType<ProfessionRecipe>> COOKING =
        MyRegistry.REGISTRY.registerRecipeType("cooking");
public static final RegistryObject<ProfessionRecipe.Serializer> COOKING_SERIALIZER =
        MyRegistry.REGISTRY.registerRecipeSerializer("cooking", () -> new ProfessionRecipe.Serializer(COOKING));

// the block
public static final RegistryObject<WorkstationBlock> KITCHEN = MyRegistry.REGISTRY.registerBlock("Kitchen",
        () -> new WorkstationBlock(BlockBehaviour.Properties.copy(Blocks.CRAFTING_TABLE), MyProfessions.COOK, COOKING));
```

Put `RECIPE_TYPES`, `RECIPE_SERIALIZERS` and `BLOCKS` on your mod bus. That is all: the menu type (`akumalib:workstation`) and the screen are the library's, shared by every workstation of every addon. No block entity is needed.

!!! tip "Subclass for looks, not for crafting"
    Extend `WorkstationBlock` for a shape, a facing or particles. The crafting and the screen stay the library's.

## Writing recipes

One JSON per recipe, in `data/<namespace>/recipes/`. `"type"` is the **serializer's** id:

```json
{
  "type": "mymod:cooking",
  "level": 5,
  "xp": 20,
  "ingredients": [
    { "item": "minecraft:cod" },
    { "item": "minecraft:cod" },
    { "item": "minecraft:bowl" }
  ],
  "result": { "item": "mymod:fish_soup", "count": 1 }
}
```

| Field | Default | Meaning |
|---|---|---|
| `ingredients` | required | 1 to 9 vanilla ingredients (an item or a tag). An ingredient needed twice is listed twice |
| `result` | required | the item made, with an optional `count` |
| `level` | `1` | the profession level needed |
| `xp` | `0` | the XP it gives |

The profession is not in the recipe: it belongs to the workstation.

Containers come back: an ingredient with a crafting remainder (a milk bucket gives its bucket back) returns it to the inventory.

### XP from a recipe far below your level

A recipe gives its full XP up to **10 levels** above its own. Past that, it loses 10 % of its XP per level, down to a floor of 10 % (and at least 1 XP). A level 5 recipe worth 20 XP gives 20 up to level 15, 18 at level 16, 10 at level 20, and 2 from level 24 on.

## Hooking the craft

`ProfessionCraftEvent` fires on the Forge bus, server side, once every check passed and before the ingredients are taken. It is cancelable.

```java
@SubscribeEvent
public static void onCraft(ProfessionCraftEvent event) {
    // copies of the exact stacks about to be consumed, one item each: their NBT is readable
    boolean bigCatch = event.getIngredients().stream().anyMatch(MyFish::isBig);
    if (bigCatch) {
        ItemStack better = event.getOutput().copy();
        better.getOrCreateTag().putInt("quality", 2);
        event.setOutput(better);
    }
}
```

| Method | Gives |
|---|---|
| `getRecipe()`, `getWorkstation()` | what is being made, and where |
| `getIngredients()` | copies of the stacks about to be taken, in the recipe's order |
| `getOutput()` / `setOutput(ItemStack)` | the result the player receives |

## For other tools

`Workstations` holds what the screen and the server both use, so a recipe viewer can respect the same lock:

| Method | Does |
|---|---|
| `getRecipes(level, workstation)` | the workstation's recipes, sorted |
| `getRecipes(recipeManager, recipeType)` | the same, from a recipe manager (what a viewer is handed) |
| `getState(player, profession, recipe)` | `LOCKED`, `UNKNOWN` or `KNOWN` |
| `check(player, workstation, recipe)` | `OK`, `NO_PROFESSION`, `LEVEL_TOO_LOW` or `MISSING_INGREDIENTS` |

The recipes a player has made are saved with their professions, and forgotten when their profession changes in Crew mode.

## JEI and EMI

With JEI or EMI installed, every workstation of every addon gets a recipe category, with no addon code: the ingredients (shapeless), the result, the level required and the XP, the block as catalyst. Workstations that share a recipe type share a category. AkumaLib depends on their APIs at compile time only. A gathering profession's drops get categories of their own: see [Gathering](gathering.md#what-a-profession-gets-in-jei-and-emi).

# Chests: `akumalib:roll_table`

A chest places **every** stack it rolled, so extending one from the outside is simply adding a roll on top. Forge's global loot modifiers are the supported way to do that, and they need a codec registered in Java. That codec is the same for every addon, so AkumaLib registers it as `akumalib:roll_table` and your addon ships JSON only.

!!! danger "Not for Devil Fruit boxes"
    Boxes are handled automatically, and a modifier on a box gives the wrong odds. See [Devil Fruit boxes](devil-fruit-boxes.md).

## The three files

Copy-ready templates live in `examples/loot-injection/` in the repository, each with its instructions in a `_comment` key. Minecraft ignores unknown keys in these files, so the comments cost nothing at runtime.

| File | Goes to |
|---|---|
| Forge's modifier index | `data/forge/loot_modifiers/global_loot_modifiers.json` |
| the modifier | `data/<yourmod>/loot_modifiers/<name>.json` |
| the table it rolls | `data/<yourmod>/loot_tables/<path>.json` |

### 1. The index

```json title="data/forge/loot_modifiers/global_loot_modifiers.json"
{
  "replace": false,
  "entries": [
    "yourmod:simple_dungeon"
  ]
}
```

This is the one file Forge **merges** across every installed mod.

!!! danger "Keep `replace` at `false`"
    `"replace": true` discards every loot modifier declared by every other mod.

!!! warning "A modifier that is not listed here is never read"
    No error and no warning: an unlisted modifier file simply does nothing. It is the first thing to check when a modifier seems ignored.

### 2. The modifier

```json title="data/yourmod/loot_modifiers/simple_dungeon.json"
{
  "type": "akumalib:roll_table",
  "conditions": [
    {
      "condition": "forge:loot_table_id",
      "loot_table_id": "minecraft:chests/simple_dungeon"
    }
  ],
  "table": "yourmod:inject/simple_dungeon"
}
```

- `conditions` aims the modifier. `forge:loot_table_id` passes only while the named table is the one being rolled; without it, the modifier fires on every loot table in the game.
- `table` is the table of yours to roll on top.
- `mode` is optional; see below.

### 3. The table it rolls

```json title="data/yourmod/loot_tables/inject/simple_dungeon.json"
{
  "type": "minecraft:empty",
  "pools": [
    {
      "rolls": 1,
      "bonus_rolls": 0.0,
      "conditions": [
        { "condition": "minecraft:random_chance", "chance": 0.2 }
      ],
      "entries": [
        { "type": "minecraft:item", "name": "yourmod:my_item" }
      ]
    }
  ]
}
```

In a chest, both numbers mean what they look like: `chance` is how often your pool adds anything at all, and `rolls` is how many items it adds when it does.

!!! warning "The table's own top-level `functions` are skipped"
    The table is rolled the way vanilla nests one table inside another, which does not apply table-wide functions. Pool-level and entry-level conditions and functions do apply, so put anything table-wide on the pool instead.

!!! note "A typo in `table` is silent"
    An unknown table id rolls as an empty table: the chest generates its normal loot and yours never appears.

## `mode`

| `"mode"` | Where your roll goes | For |
|---|---|---|
| `"append"` (default) | after the existing loot | chests, and any container that places everything |
| `"compete"` | **before** the existing loot | a container that keeps only its first match |

An unknown mode is an error, not a silent fall back to `append`.

!!! warning "`compete` changes what the odds mean"
    In `compete`, the chance of your table stops meaning "how many of mine" and starts meaning "the share of the one stack the container hands out that is mine". A table written for `compete` wants a **single** pool with a single chance: a second pool can only replace the first at the front of the list.

    Use `compete` only for a container that behaves like a box but whose pool you cannot reach. For Devil Fruit boxes, the automatic injection is strictly better.

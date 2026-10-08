# Devil Fruit boxes

## Declare them in a data file

*Since 3.0.0.* Put a file in `data/<modid>/akumalib/dfboxes/`, any name, in the shape of the base mod's own box tables (`mineminenomi:dfboxes/wooden_box`, `iron_box`, `golden_box`), with a `target` table and an `inject` keyword on each pool:

```json
{
  "target": "mineminenomi:dfboxes/wooden_box",
  "pools": [
    {
      "name": "mineminenomi:fruits",
      "inject": "add",
      "entries": [
        { "type": "minecraft:item", "name": "mymod:my_my_no_mi" },
        { "type": "minecraft:item", "name": "mymod:rare_rare_no_mi", "weight": 40 }
      ]
    },
    {
      "name": "mineminenomi:fruits",
      "inject": "remove",
      "entries": [
        { "type": "minecraft:item", "name": "mineminenomi:kame_kame_no_mi" }
      ]
    }
  ]
}
```

| `inject` | What it does |
|---|---|
| `"add"` | Each entry goes into the pool. An entry for a fruit the pool already holds **replaces** it, which is how a file makes any fruit, base mod ones included, rarer or more common. |
| `"remove"` | Every entry giving one of the named items leaves the pool. Only `name` is read. |

In an added entry:

- **`type`** defaults to `minecraft:item`;
- **`weight`** defaults to `100`, the weight of every base mod fruit, so a fruit without one is drawn exactly as often as theirs;
- the base mod's one-fruit-per-world function, **`mineminenomi:fruit_already_exists`**, is added when `functions` does not carry it.

Everything else is an ordinary loot entry, read by the game's own loot parser.

**Files add up**, across mods and data packs, in the order of their ids. **Every removal applies after every addition**, so a server data pack can take any fruit out.

!!! tip "Another addon's fruits"
    A fruit whose mod is not loaded is skipped without a warning, so a file may list the fruits of an addon that is only sometimes installed. A table, a pool or an item that does not exist in a loaded mod is logged and skipped:

    ```text
    Devil Fruit box file mymod:boxes: no item mymod:typo_no_mi
    Devil Fruit boxes: 3 fruit(s) added or re-weighed, 1 removed, from 2 file(s)
    ```

The fruit itself is registered as usual; `registerFruitItem` no longer puts it in a box:

```java
MyRegistry.REGISTRY.registerFruitItem("My My no Mi", () -> new AkumaNoMiItem(1, FruitType.PARAMECIA, ...));
```

Keep the box of the file and the tier passed to `AkumaNoMiItem` in step: the tier is what the base mod shows.

!!! info "The tier cascade is untouched"
    The base mod's upgrade pool, `mineminenomi:next_tier_fruits`, rolls the next box's **loaded** table. A fruit added to the iron box can therefore come out of a wooden box that upgrades itself, like a base mod tier 2 fruit (measured: about 5% of wooden boxes).

!!! warning "Why the files apply once the reload is over"
    Loot tables are parsed in parallel with every other data loader, so the files may not be read yet when a table loads. AkumaLib applies them once the whole reload has finished, at server start and on `/reload` alike. Each reload builds new tables, so nothing is added twice.

## Boxes that share their fruits

A server can do without the tiers. Two settings of the world's `serverconfig/akumalib-server.toml`, section `[devilFruitBoxes]`:

| Setting | Values | What it does |
|---|---|---|
| `fruitBoxMode` | `NORMAL` (default) | each box holds its own fruits: the base mod's tiers |
| | `MIXED` | every fruit is in every box |
| `fruitBoxKeepWeights` | `false` (default) | with `MIXED`, every fruit has the same chance |
| | `true` | each fruit keeps the weight its mod or a datapack gave it |

Nothing to do in an addon: the mode is laid over the boxes as the data files left them, so every fruit of every installed mod is taken, and a fruit a datapack removed stays out. 

The file is read when the server starts. While it runs, an operator changes the boxes with a command, which writes the file and applies at once:

```text
/akumalib fruitboxes                              the mode and the weights in force
/akumalib fruitboxes mode normal|mixed
/akumalib fruitboxes weights equal|kept
```

A file edited by hand while the server runs is not always noticed by Forge: use the command, or restart.

The fruit shared with another box is the same entry as in its own, with the one-fruit-per-world guard. The tier a fruit shows is unchanged: it no longer says which box the fruit comes from.

## The fruits found in a world

`/fruits` opens a book that lists every Devil Fruit installed and what has become of it in this world: free, on the ground, carried or eaten, and by whom. It reads the base mod's one-fruit-per-world record, so it needs that rule on, and it is open to whoever the base mod's `/check_fruits` is open to (its "Public /check_fruits" setting; operators otherwise). Where a fruit lies and since when are shown to operators only, with a "Go there" that takes them to a fruit on the ground. With `fruitBoxMode = "MIXED"` the tiers are left out of the screen.

## A fruit in no box

Once the data is loaded, every fruit registered with `registerFruitItem` that no box holds is named in the log:

```text
Devil Fruit mymod:my_my_no_mi is in no Devil Fruit box, so it can never be found in survival: declare it in data/mymod/akumalib/dfboxes/ (or ignore this if it is kept out on purpose)
```

A fruit that is in no box exists, drops from commands, can be eaten and grants its abilities, and can never be found in survival. The warning is how you notice. For a fruit kept out on purpose (a reward handed out by something else, one still being worked on), leave it out of the files and ignore the line.

## Why an entry inside the pool

A box keeps only the **first** available fruit of what it rolled and discards the rest. A Forge loot modifier can only add to the result of a table that has already rolled, so an added fruit is either last in the list, and only wins when all the base mod's rolls are already claimed in the world, or first in the list, where it jumps ahead of everything, including a cascade that had just upgraded the player to a better tier. An entry inside the pool is drawn on weight against its neighbours in the same roll, and the cascade reaches it because it rolls the loaded table.

## Checking that it worked

Each reload logs one line:

```text
Devil Fruit boxes: 18 fruit(s) added or re-weighed, 0 removed, from 3 file(s)
```

!!! note "When no fruit is available"
    If every fruit a box could give is already claimed in the world, the base mod's box currently consumes the box and gives nothing. That is the base mod's behaviour, not AkumaLib's.

!!! info "Before 3.0.0"
    Until 2.12.0, `registerFruitItem` put the fruit in the box of its tier by itself, from Java (`AkumaLootInjection`), and a third `false` argument kept it out. Both are gone: declare the fruit in a data file.

# Devil Fruit boxes

## It is automatic

Registering a fruit with `registerFruitItem` puts it in the base mod's Devil Fruit box matching its tier:

```java
public static final RegistryObject<AkumaNoMiItem> MY_MY_NO_MI = MyRegistry.REGISTRY.registerFruitItem(
        "My My no Mi",
        () -> new AkumaNoMiItem(2, FruitType.PARAMECIA, MyFirstAbility.INSTANCE));
```

| Tier passed to `AkumaNoMiItem` | Box |
|---|---|
| `1` | wooden box |
| `2` | iron box |
| `3` | golden box |

**There is no loot file to write and no number to tune.** The tier comes from the item itself, read when the loot tables load, so the fruit and its box can never drift apart.

### A fruit that must stay unobtainable

```java
MyRegistry.REGISTRY.registerFruitItem("My Secret no Mi", () -> new AkumaNoMiItem(3, ...), false);
```

The third argument keeps the fruit out of every box, for a fruit handed out by something else or still being worked on.

!!! danger "The default is in the boxes, and that is on purpose"
    A fruit that is in no box exists, drops from commands, can be eaten and grants its abilities, and can never be found in survival. Nothing logs it. Opting out has to be explicit.

## What the injection does

When the base mod's box tables load, `AkumaLootInjection` adds each registered fruit **as an entry inside the base mod's own fruit pool**, named `mineminenomi:fruits`:

- at **weight `100`**, the weight of every base mod fruit entry, so your fruit is drawn exactly as often as one of theirs;
- carrying the base mod's `FruitAlreadyExistsFunction`, so the one-fruit-per-world rule applies to it unchanged.

### Parity is the whole calibration

A tier's fruits share that tier's pool at even weight. Adding a fruit widens what the box can give; it does not make the box give addon fruits more often than base mod ones. Choosing a tier is purely a design decision about what the fruit is.

### The tier cascade reaches your fruits

A box has a small chance of upgrading itself and rolling the next tier's table instead. That upgrade rolls the **loaded** table, which now contains your fruits, so a wooden box can hand out your tier 2 fruit through the cascade, exactly as it can hand out a base mod one.

!!! info "Why not a loot modifier"
    A box keeps only the **first** available fruit in what it rolled and discards the rest. A Forge loot modifier can only add to the result of a table that has already rolled, so an added fruit is either last in the list, and only wins when all the base mod's rolls are already claimed in the world, or first in the list, where it jumps ahead of everything, including a cascade that had just upgraded the player to a better tier. An entry inside the pool competes on weight in the same roll and has neither problem.

## Placing a fruit in a different box

The tier normally comes from the fruit. To put an item in a specific box regardless, register it directly:

```java
AkumaLootInjection.addFruit(3, MyItems.MY_MY_NO_MI);
```

The tier must be `1`, `2` or `3`; anything else is refused with a warning. The item is given as a `Supplier` (a `RegistryObject` works), because it does not exist yet when you call this.

!!! warning "An item without a tier needs the explicit overload"
    `addFruit(supplier)` reads the tier from an `AkumaNoMiItem`. An item that is not one is skipped with a warning; register it with `addFruit(tier, supplier)` instead.

## Checking that it worked

At server start, each box table that received fruits logs a line:

```text
Injected 3 addon fruit(s) into mineminenomi:dfboxes/wooden_box; 'mineminenomi:fruits' now holds 24 entries
```

If the pool cannot be found, because the base mod restructured its tables or a data pack replaced one, the library logs an **error** naming the table and the number of fruits that will be missing from it.

!!! note "When no fruit is available"
    If every fruit a box could give is already claimed in the world, the base mod's box currently consumes the box and gives nothing. That is the base mod's behaviour, not the injection's.

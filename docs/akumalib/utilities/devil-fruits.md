# Devil Fruits

`AkumaDevilFruits` reads a living entity's Devil Fruit as Mine Mine no Mi keeps it. The details below were read from the base mod's bytecode, version 0.11.5.

```java
if (AkumaDevilFruits.isZoan(player) && AkumaDevilFruits.isMorphed(player)) {
    // a Zoan user, transformed right now
}
AkumaDevilFruits.resetCooldowns(player);
```

| Method | Does |
|---|---|
| `fruit(entity)` | the `AkumaNoMiItem` it ate, if any |
| `hasFruit(entity, id)` | whether it ate that fruit, e.g. `mineminenomi:hito_hito_no_mi` |
| `isZoan(entity)` | whether its fruit is a Zoan: plain, ancient, mythical or artificial |
| `isMorphed(entity)` | whether it is transformed right now: a Zoan's point, or any other morph |
| `resetCooldowns(entity)` | ends the cooldown of every equipped ability (the base mod syncs it) and returns how many were cooling down |

Notes:

- The base mod's Zoan points never time out, so there is no morph duration to extend. To strengthen a form, check `isMorphed` and add modifiers, as Cruise's Rumble does.
- The base mod's `mineminenomi:zoan` item tag leaves the artificial Zoans out. `isZoan` counts them.
- The Hito Hito no Mi (Chopper's fruit) is a Zoan with no abilities in 0.11.5, so its user is never morphed.

## `ExternalMorphs`

*Since 3.1.0.* A morph put on an entity from outside its own abilities - a curse that turns a player into a toy, a fruit that keeps its user a child. A morph normally travels with a morphing ability of the morphed entity; these have none.

```java
ExternalMorphs.set(player, MyMorphs.TOY.get(), true);                   // here and on every client that sees it
ExternalMorphs.keep(MyMorphs.TOY, player -> MyHelper.isToy(player));    // once, at mod construction
```

What it covers, each a fault of the base mod (0.11.5):

- **watchers**: sent to the entity and everyone tracking it, and again to a player who starts tracking it later, for the morphs a keeper says still hold;
- **duplicates**: the devil fruit sync appends the morphs it carries, so a watched entity can hold one twice - taking it off removes every copy;
- **size**: the last morph off clears the list properly (losing the fruit alone left the player at the morph's size), and the dimensions refresh;
- **respawn, dimension change, login**: the base mod drops these morphs; with a keeper, the player gets it back if it still holds, and loses it if not.

!!! warning "Both sides need 3.1.0"
    It is a packet: network protocol 5.


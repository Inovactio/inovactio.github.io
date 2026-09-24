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

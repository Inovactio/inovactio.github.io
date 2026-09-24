# Traps

A **trap** is a block set on the ground that, after a while, closes on a creature: the player comes back and collects it. What it can catch is data, so an addon writes a trap block and a few JSON files.

## Declaring a trap

```java
public static final RegistryObject<TrapBlock> TRAPS = MyRegistry.REGISTRY.registerBlock("Traps",
        () -> new TrapBlock(BlockBehaviour.Properties.of().mapColor(MapColor.WOOD).strength(0.5F).noOcclusion(),
                2400, 6000,           // waits 2 to 5 minutes
                true,                 // single use: gone once its catch is collected
                MyProfessions.HUNTER  // optional: only a Hunter sets and collects it (Solo mode: anyone)
        ));
```

`TrapBlock` has a `facing` and a `caught` state: give it a model for each (open, and closed on its catch). One AkumaLib block entity type serves every addon's traps.

- Set on sturdy ground, it counts down a random delay in its range, then picks a catch. If nothing lives there, it waits another delay.
- On a catch it switches to `caught=true` with a sound. A right-click collects it: the creature is made, its variant rolled, and it goes through `CatchableCreature.capture` with the trap as the tool, so its capture loot table, `CreatureCaptureEvent` (your XP) and the `akumalib:creature_capture` advancement trigger all apply.
- Empty: "Nothing in the trap yet." Refused by the creature's `canBeCapturedWith`: "It got away from the trap." Wrong profession: "Only a %s can use this trap." (placement refused too). Creative players always can.

## What a trap catches

```json title="data/mymod/trapping/seagull.json"
{
  "entity": "mymod:seagull",
  "weight": 10,
  "biomes": ["#minecraft:is_beach", "#minecraft:is_ocean", "minecraft:stony_shore"],
  "requires_sky": true,
  "traps": ["mymod:traps"]
}
```

| Field | Default | Meaning |
|---|---|---|
| `entity` | required | a `CatchableCreature` |
| `weight` | 10 | against the other catches possible at the same trap |
| `biomes` | anywhere | ids or `#tags` |
| `requires_sky` | `false` | "outside": nothing solid above the trap (leaves allowed: under a tree is outside) |
| `traps` | any trap | the trap blocks that can make this catch (an enhanced trap for rarer creatures) |

`TrapCatches.pick(level, pos, block, random)` is what the trap calls, if you need it elsewhere.

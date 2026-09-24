# Protected areas: `AkumaProtection`

The base mod's protected-area rules, for the positions the base mod does not check itself.

```java
// the far end of a technique: a pulled body, a landing point
if (!AkumaProtection.canUseAbilityAt(target, INSTANCE.get())) { ... }

// a world change that is not a block placement, such as emptying a container
if (!AkumaProtection.canAlterBlocksAt(caster, pos)) { ... }
```

## What the base mod already checks

| Where | Check |
|---|---|
| the **caster** | `Ability.canUse` refuses when the area at `entity.blockPosition()` does not allow the ability |
| a **block placement** | `NuWorld.setBlockState` |

Everything else is left to the addon: where a pulled body stands, where a swap lands, a container being emptied.

## `canUseAbilityAt(level, pos, core)`

This is the exact test `Ability.canUse` runs for the caster: `area.canUseAbility(core)`.

It honours the server config's **`GLOBAL_PROTECTION_WHITELIST`**. The area's own flag `canAbilitiesBeUsed()` does not, so testing that flag alone means an admin who whitelisted an ability sees it allowed at the caster and refused at the target.

When areas overlap, the smallest one decides.

## `canAlterBlocksAt(entity, pos)`

These are `NuWorld.setBlockState`'s checks, in its order, minus the block rule:

1. `NuWorld.canMobGrief`: a mob caster obeys the `mobGriefing` gamerule.
2. `ABILITY_GRIEFING`, with no bypass (the base mod only bypasses it for a placement into air). It is ignored in a challenge dimension, as `NuWorld` does.
3. The area's `canDestroyBlocks`.

The `(level, pos)` form skips step 1. Prefer the entity form whenever there is a caster.

!!! warning "A block placement goes through `NuWorld.setBlockState`, not through this"
    `NuWorld.setBlockState(entity, pos, state, flags, rule)` runs all three checks above. It also applies the `BlockProtectionRule`, the challenge arena bounds and the area's restoration queue, so a restoring area can put the block back.

    A temporary structure built into air takes a rule with `setBypassGriefFlag()`, so it still rises with griefing off. The base mod's `BarrierAbility`:

    ```java
    new BlockProtectionRule.Builder(DefaultProtectionRules.AIR)
            .addApprovedTags(ModTags.Blocks.BLOCK_PROT_FOLIAGE)
            .setBypassGriefFlag()
            .build();
    ```

    None of `DefaultProtectionRules` carries the bypass flag.

## Details that are easy to get wrong

- **`isDisabled()` never needs testing.** `ProtectedArea.isInside` is false for a disabled area, so `getProtectedArea` never returns one.
- **Every check answers `true` on a client level.** Protection is server state.

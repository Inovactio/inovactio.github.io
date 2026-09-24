# Attributes and size

## `AttributeBonusHelper`

An idempotent pair for applying and removing an attribute modifier:

```java
AttributeBonusHelper.add(entity, Attributes.MOVEMENT_SPEED, SPEED_UUID, "My Speed",
        0.2, AttributeModifier.Operation.MULTIPLY_BASE);

AttributeBonusHelper.remove(entity, Attributes.MOVEMENT_SPEED, SPEED_UUID);
```

- `add` does nothing if a modifier with that UUID is already present;
- `remove` does nothing if it is absent.

So both can be called every tick at no cost, which is the safe way to hold a conditional bonus.

!!! danger "Apply and remove every tick, never on transitions"
    `add` uses a **permanent** modifier, which is saved with the entity. A bonus applied when a condition starts and removed when it ends is kept for good if the entity logs out in between: on reconnect, your "was active" flag is gone and the modifier is not. Checking the condition every tick and calling `add` or `remove` accordingly cannot drift.

    For a passive, [`ConditionalStatPassiveAbility`](../ability-base-classes/passives.md#conditionalstatpassiveability) already does this, with tiers and disable handling. For a morph, see [`MorphStats`](../core-concepts/morph-gates-and-stats.md).

!!! warning "One UUID per attribute per bonus"
    Two modifiers with the same UUID on one attribute cannot coexist: the second is refused while the first is present. Give every bonus its own UUID.

## `SizeScale`

Reads an entity's size from the library's `SIZE` attribute:

```java
float scale = SizeScale.get(entity);   // 1.0 when the entity has no SIZE attribute
```

The value is clamped between `0.05` and `256`, and a missing attribute, `NaN` or an infinite value all read as `1.0`.

To stop the library resizing an entity while something else drives its dimensions, set `SizeScale.SUSPEND_FLAG` in its persistent data; `SizeScale.isSuspended(entity)` reads it. See [What the library registers](../core-concepts/library-registrations.md#driving-an-entitys-size-yourself).

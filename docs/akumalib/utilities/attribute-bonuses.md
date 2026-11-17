# Attribute bonuses: `AttributeBonusHelper`

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

## A bonus that is not saved: `setTransient`

*Since 6.8.0.* For a bonus that changes while a technique runs (a speed that grows, a stat per head left), put it as a
**transient** modifier, never saved: `setTransient` takes off what the same modifier gave before and puts the new amount,
and 0 only takes it off.

```java
AttributeBonusHelper.setTransient(entity, Attributes.MOVEMENT_SPEED, DASH_UUID, "Dash", running ? 0.4D : 0.0D,
        AttributeModifier.Operation.MULTIPLY_TOTAL);
```

!!! warning "One UUID per attribute per bonus"
    Two modifiers with the same UUID on one attribute cannot coexist: the second is refused while the first is present. Give every bonus its own UUID.

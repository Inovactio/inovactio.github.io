# Morph gates and stats

Two small classes for Zoan fruits, and any fruit with a morph: `MorphGates` locks a technique to a form, and `MorphStats` declares a form's attributes.

## Locking a technique to a form: `MorphGates`

A technique that only makes sense in one form needs a use condition. `MorphGates.requiring` builds it as a constant, next to the morphs it names:

```java title="MyGates.java"
public class MyGates {

    public static final Ability.ICanUseEvent WALK_POINT =
            MorphGates.requiring(MyMorphs.WALK_POINT);

    public static final Ability.ICanUseEvent EITHER_POINT =
            MorphGates.requiring(MyMorphs.HEAVY_POINT, MyMorphs.WALK_POINT);
}
```

Then, in the ability's constructor:

```java
this.addCanUseCheck(MyGates.WALK_POINT);
this.addContinueUseCheck(MyGates.WALK_POINT);
```

The gate passes while the user is in **any one** of the morphs given. Pass the registry objects themselves: `RegistryObject` is a `Supplier`, and the morphs are only resolved when the check runs.

!!! warning "Add the gate on continue as well as on use"
    `addCanUseCheck` only gates the key press. `addContinueUseCheck` is what ends a held, charged or continuous technique when the user **drops out of the form** mid-use. Without it, a player who leaves the form keeps holding a grab or keeps a bonus that belongs to a body they no longer have.

!!! tip "Gates compose"
    `Ability.ICanUseEvent` carries the base mod's `and`, `or` and `not`, so a gate combines with any other condition:

    ```java
    this.addCanUseCheck(MyGates.WALK_POINT.and(MyHelper::requiresDaylight));
    ```

`requiring()` with no morph, or with a `null` one, throws immediately. An empty gate would otherwise only surface as an ability nobody can use.

## Declaring a form's attributes: `MorphStats`

A morph ability's stats used to take three declarations per attribute: a field, a line wiring it into the `ChangeStatsComponent`, and the modifier itself. `MorphStats` knows the UUID, attribute and default operation of each stat, so only the number is left:

```java title="MyWalkPointAbility.java"
public MyWalkPointAbility(AbilityCore<MyWalkPointAbility> core) {
    super(core);
    MorphStats.on(this.statsComponent, INSTANCE, "My Walk Point")
            .movementSpeed(0.55)
            .punch(4.0)
            .armor(3.0)
            .jump(1.8)
            .fallResistance(2.5);
}
```

Call it from the constructor. Each method applies its modifier immediately, so there is no final call to forget.

### Available stats

`health`, `movementSpeed`, `armor`, `armorToughness`, `punch`, `attackSpeed`, `blockReach`, `entityReach`, `stepHeight`, `knockbackResistance`, `fallResistance`, `toughness`, `jump`, `regenRate`, `swimSpeed`, `miningSpeed`, `friction`, `gravity`, and `custom(...)` for any other attribute, including one from your own registry.

### Operations

Each stat has a default operation, chosen from how existing forms use it:

| Stat | Default operation |
|---|---|
| `health` | `MULTIPLY_TOTAL` |
| `movementSpeed` | `MULTIPLY_BASE` |
| every other stat | `ADDITION` |

Every stat also has a two-argument form taking the operation explicitly:

```java
.movementSpeed(0.3, Operation.MULTIPLY_TOTAL)
```

!!! warning "Check the operation when migrating an existing form"
    The defaults match the common case, not every case. Several stats are used with more than one operation across existing addons. When you move a hand-written stat block to `MorphStats`, compare the **operation** as well as the number: a silently changed operation is a balance change.

### Stats that only apply some of the time

`onlyWhile` makes every stat set **after it** conditional:

```java
MorphStats.on(this.statsComponent, INSTANCE, "My Heavy Point")
        .armor(3.0)                       // always
        .onlyWhile(this::isDigging)
        .movementSpeed(1.5)               // only while digging
        .jump(3.0);                       // only while digging
```

Pass `null` to go back to unconditional stats.

!!! note "One modifier per attribute"
    A `ChangeStatsComponent` holds a single modifier per attribute. Two techniques that want different bonuses on the same attribute at the same time need separate components or separate forms, not two `movementSpeed` calls.

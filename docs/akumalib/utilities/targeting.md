# Targeting: `AkumaTargeting`

Picking the one target a technique is aimed at. Each method carries two decisions that are silent when wrong:

- **the user is excluded**: the base mod's line and area searches return the user among the targets, and a technique that damages through `hurtTarget` directly would hit whoever cast it;
- **the nearest target wins**, not the first one in a list whose order is not guaranteed.

## `isEnemy`

Whether a target counts as an enemy of the user, **with the user excluded**:

```java
if (AkumaTargeting.isEnemy(entity, candidate)) {
    // ...
}
```

It is the mod's single decision on the question — `FactionHelper.isEnemyFactions`, reached through `ModEntityPredicates.getEnemyFactions` — so an ability going through it agrees with every AoE in the base mod for free. The target is an `Entity`, not a `LivingEntity`: arrows, boats and dropped items are legal targets for some techniques.

!!! warning "Three defaults, two of them the opposite of the intuition"
    A **null** user makes the underlying predicate `alwaysTrue`, so everything would be an enemy — this method answers `false` instead. A **non-living** target is always an enemy; factions are never consulted for one. And a **factionless** user counts everyone else as an enemy, so a mechanic keyed on "my allies" has none rather than having everybody.

!!! tip "There is no shared predicate constant here, and there should not be"
    `TargetPredicate.DEFAULT_AREA_CHECK` **is** `new TargetPredicate().testEnemyFaction()`, and with only that flag set its `test` runs `getEnemyFactions` and nothing else — both read off the base mod's bytecode in AwakenAwakenNoMi#444, where twelve files had rebuilt the predicate by hand. Pass the base mod's own constant to `TargetHelper.getEntitiesInArea`; a library constant beside it would be a third spelling of one object.

## `firstInLine`

The nearest living entity in a line in front of the user, found by the ability's own `RangeComponent`:

```java
Optional<LivingEntity> target = AkumaTargeting.firstInLine(this.rangeComponent, entity, 3.5F, 1.2F);
target.ifPresent(victim -> {
    // ...
});
```

The last two arguments are the range and the width of the line. A technique that should be forgiving wants a generous width.

## `firstInSight`

Whatever the user is looking at, if it is a living entity other than the user:

```java
LivingEntity target = AkumaTargeting.firstInSight(entity, 12.0F);
if (target == null) {
    // nothing in sight
}
```

The overload taking a predicate tests the target inside the trace, so "nothing valid in sight" stays a single `null`:

```java
LivingEntity target = AkumaTargeting.firstInSight(entity, 12.0F, candidate -> !candidate.isPassenger());
```

The user and dead entities are already excluded before the predicate runs.

!!! warning "Blocks stop the trace"
    A target behind a wall is not in sight. That is usually what a technique wants; one that should reach through terrain has to search differently.

## `aimPoint`

The point the user is aiming at, for a technique that lands on a spot rather than on a body:

```java
Vec3 impact = AkumaTargeting.aimPoint(entity, 40.0D);
```

Whatever the line of sight meets - a block or an entity - is the impact point. Blocks stop the trace, so a wall between the user and open ground is where the technique lands.

!!! warning "A miss lands in mid-air"
    With nothing in the way, the point is `range` blocks along the look vector, **not** the ground under it: aiming at the sky puts the impact in the sky. An ability that should fall back to the terrain reads the heightmap at that point itself — that is a different answer from the one this method gives, and `GlitteringStorm` in AwakenAwakenNoMi deliberately wants the other one.

It is measured from the eyes, so a crouching user does not aim from their feet.

## `sizedRange`

A range given for a player's body, grown to fit whatever the caster is morphed into:

```java
float reach = AkumaTargeting.sizedRange(entity, REACH);
LivingEntity target = AkumaTargeting.firstInSight(entity, reach);
```

!!! danger "A morph pushes every target away from the caster's eyes"
    Ranges are traced from the eye position. A big form puts those high above the ground and far behind the chest:
    the awakened Brachiosaurus Guard Point is 5.5 x 10.5 blocks with its eyes at 10, so a target standing 8 blocks in
    front of its feet is already **12.8 blocks from its eyes**. A flat reach tuned on a player is unusable there -
    which is how `NeckCatapultAbility` shipped (AwakenAwakenNoMi#402).

The extra is the caster's own bulk, its eye height plus half its width, so the number in your ability keeps meaning
"this far in front of me" in every form. A player gains about 1.9 blocks; that Guard Point gains about 12.7.

Use it for anything reaching **out of** the caster - a pick-up range, a line, a cone, a grab. Not for an area centred
on the caster: that radius is already measured from the body rather than from the eyes.

## `inCone`

Whether a target stands inside a cone around where the user is looking:

```java
for (LivingEntity target : this.rangeComponent.getTargetsInArea(entity, 6.0F)) {
    if (target != entity && AkumaTargeting.inCone(entity, target, 45.0F)) {
        // inside a 90 degree fan in front of the user
    }
}
```

The angle is **half** the opening: `45` is a 90 degree fan. A target standing exactly on the user counts as inside, so a cone never refuses point-blank contact.

!!! tip "When a press finds nothing"
    A technique that finds no target should still cost something, or a held key becomes a free scanner: `AkumaAbilityHelper.FAILED_PRESS_COOLDOWN` (10 ticks), not zero and not the full cooldown. A refusal, such as a protected area or a creative target, costs the same. And give the player a cue that nothing was hit, such as a whiff sound.

# Tooltips

Ready-made advanced description lines for the ability screen, built on the base mod's `AbilityStat`.

## Explosion stats: `ToolTipHelper`

```java
.addAdvancedDescriptionLine(ToolTipHelper.getExplosionTooltips(power, size, damage))
```

Adds an "Explosion" heading followed by power, size and damage lines. Each line is skipped when its value is `0` or less.

!!! warning "The damage shown is the number you pass"
    An `AbilityExplosion` with `setStaticDamage` deals its value without the `x0.4` factor, so pass the real value here, not a scaled one. See [Damage](../core-concepts/damage.md#sources-the-factor-does-not-touch).

## Zone stats: `AwakenTooltipHelper`

```java
.addAdvancedDescriptionLine(AbilityDescriptionLine.NEW_LINE,
        AwakenTooltipHelper.getZoneRadiusTooltip(MAX_ZONE_SIZE),
        AwakenTooltipHelper.getEffectTickTooltip(EFFECTS_TICK_INTERVAL))
```

| Method | Shows |
|---|---|
| `getZoneRadiusTooltip(maxRadius)` | the largest radius the zone reaches, in blocks |
| `getEffectTickTooltip(ticks)` | how often the zone applies its effect, in seconds |

Both lines are skipped for a value of `0` or less.

## Library translation keys: `AkumaI18n`

The translation keys the library's own base classes and tooltip helpers use:

| Constant | Used by |
|---|---|
| `ABILITY_DESCRIPTION_STAT_NAME_EXPLOSION`, `_SIZE`, `_POWER` | `ToolTipHelper` |
| `ABILITY_DESCRIPTION_STAT_NAME_ZONE_RADIUS`, `_EFFECT_PULSE` | `AwakenTooltipHelper` |
| `MESSAGE_GROUND_ONLY` | `ensureOnGroundOrNotify`, when a ground-only technique is used in mid-air |
| `MESSAGE_MISSING_MATERIALS` | `CraftingAbility`'s default `message`, when the materials are missing |

The library ships their English text. Keys for your own fruits and abilities belong in your addon's lang file.

!!! note "`MESSAGE_MISSING` is deprecated"
    Before 2.3.0 the missing-materials constant was `MESSAGE_MISSING`, with the key `akumalib.ability.missing_message`. Both still work: the constant is an alias of `MESSAGE_MISSING_MATERIALS`, and the old key carries the same text, so an addon compiled against 2.2.0 still shows the right line. Use `MESSAGE_MISSING_MATERIALS` in new code; the alias goes at the next major version.

!!! warning "A key missing from the lang file shows raw"
    Registering a name supplies a default, but the client renders from the lang file: a key with no entry appears as the raw key in the tooltip, and nothing fails at build time.

## Damage source metadata the icons cannot show: `AkumaSourceTooltip`

*Since 2.9.0.* The base mod shows an ability's haki nature, source types and element (`setSourceHakiNature`, `setSourceType`, `setSourceElement` on the builder) as a row of small icons after its name, and nothing else. A value with no texture is **not drawn**: the elements `AIR`, `SLIME`, `RUBBER`, `RUST`, `GRAVITY` and the type `INDIRECT`. They still change the fight, so say it in words:

```java
.addAdvancedDescriptionLine(AbilityDescriptionLine.NEW_LINE,
        CooldownComponent.getTooltip(COOLDOWN),
        DealDamageComponent.getTooltip(DAMAGE),
        AkumaSourceTooltip.iconless(),                  // "Source Wind, Indirect", read from the core
        AkumaSourceTooltip.pierces(true, true))         // "Pierces Armour, Logia"
```

| Method | Shows |
|---|---|
| `iconless()` | the core's icon-less element and types, read when the tooltip is drawn; skipped when every value has an icon |
| `pierces(armour, logia)` | flags applied at hit time (`addGlobalPiercing`, `bypassLogia`), which the metadata cannot carry |
| `describe(core)` | the `iconless()` text for a core, or `null` |

`SourceType.LOGIA_BYPASS` is read nowhere in the base mod and has no icon: declare the hit-time `bypassLogia()` and show it with `pierces(false, true)`.

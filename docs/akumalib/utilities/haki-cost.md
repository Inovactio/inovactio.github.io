# Haki techniques: `HakiCost`

A technique made with Armament Haki that comes with the Haki **mastery** and pays the base mod's Haki gauge, instead of asking the player to switch the Haki on in the bar first.

```java
// on the core's builder
.setUnlockCheck(((AbilityCore.ICanUnlock) MyHelper::hasFruit).and(HakiCost.afterMastery(BusoshokuHakiFullBodyHardeningAbility.INSTANCE)))
.addAdvancedDescriptionLine(AbilityDescriptionLine.NEW_LINE, HakiCost.MASTERY)
.addAdvancedDescriptionLine(AbilityDescriptionLine.NEW_LINE, CooldownComponent.getTooltip(COOLDOWN), HakiCost.tooltip(200))

// in the technique's constructor
HakiCost.perUse(this, 200);   // a blow: 200 of the gauge each use
HakiCost.perTick(this, 1);    // a form: 1 a tick while it is on (tooltip: HakiCost.tooltipPerTick(1))
```

| Member | Does |
|---|---|
| `afterMastery(haki)` | unlock rule: the user has unlocked that Haki ability |
| `perUse(ability, cost)` | refused and greyed on an empty gauge; pays `cost` on use |
| `perTick(ability, cost)` | the same to start a form; pays `cost` every tick it is on and **ends it** when the gauge runs out. A form already on is never refused, so it can still be put away |
| `canPay(entity, ability)` / `pay(entity, cost)` | the two halves, for a technique that pays elsewhere (per hit...) |
| `carriesHaki(source)` | whether a hit is one of these techniques': its own source, a projectile it shot, or the bare blow of a user whose Haki form is on. For an addon's own checks that ask the striker for his Haki |
| `MASTERY`, `tooltip(cost)`, `tooltipPerTick(cost)` | "Needs Armament Haki mastery", "Haki Cost: 200", "Haki Cost: 20 per second" |

## The rules

- **Who pays.** A player. Nothing is paid while the player's own Armament Haki (hardening, full body, imbuing) is on: it drains the gauge already. A non-player never pays: the base mod refills only a player's gauge (`StatsRestoreHandler.restoreHakiPassively`), an NPC's would stay empty for good.
- **Empty means spent, until it comes back.** Once the gauge is full of overuse, the technique is refused ("Your Haki is spent, wait for it to come back") until the gauge is back under 90 %, where the base mod stops its overuse penalty. The base mod starts resting the gauge at once: refusing only at the very top lasted a few ticks.
- **No rest while a form pays.** The base mod rests the gauge every tick unless one of the player's HAKI-category abilities is on. A fruit form is not of that category, so `HakiRestoreMixin` holds the rest while a `perTick` form is on; without it the rest gave back nearly all the form took.
- **No Haki experience** is given for paying (maintainer, 2026-10-22): only the real Haki trains.
- **The hits land on a Logia.** Every hit `carriesHaki` says yes to is flagged `bypassLogia()` in a `LivingAttackEvent` at `HIGHEST`, before the base mod's Logia check reads it. A projectile is known by its parent ability (`NuProjectileEntity.getParent`), chosen when it was shot, not by its owner's state when it lands.

!!! warning "The gauge goes up, not down"
    The base mod's gauge is an overuse counter: `IHakiData.getHakiOveruse()` grows as Haki is used, and the gauge is *empty* for us when it reaches `getMaxOveruse()` (`totalHakiExp × 140`). Hardening and full-body hardening add 1 a tick, imbuing and emission 2, internal destruction 3: price a technique in those terms (200 is ten seconds of hardening).

!!! warning "A Haki nature is not enough to touch a Logia"
    `LogiaInvulnerabilityAbility` lets a `HARDENING` or `IMBUING` source through only while the attacker has that Haki **on** (`HakiHelper.hasHardeningActive` / `hasImbuingActive`). A technique paid for with the gauge has none on, hence the `bypassLogia()` flag. The base mod's own Haki damage bonus still reads the real Haki and is left to it.

!!! note "The bar is told"
    The base mod sends the gauge to the client only at login, and the bar greys from the client's copy. `HakiCost` sends `SSyncHakiDataPacket` when a player's gauge empties or comes back (checked every 10 ticks), whatever emptied it.

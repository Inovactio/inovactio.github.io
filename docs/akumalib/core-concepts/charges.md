# Charges

## The end event fires when the charge is interrupted too

`ChargeComponent`'s end event runs at the natural end of a charge **and when the charge is stopped
part way through**. So an ability that delivers its effect from that event, with no guard, delivers
it **in full for a two tick charge**, and the only thing the player pays is the cooldown.

⚠️ **In practice that is much rarer than it sounds**, and worth knowing before treating this as a
live bug. Kairoseki and water - the base mod's standard answers to a Devil Fruit user - do **not**
reach the end event: they go through `emergencyStopAbility`, which calls `forceStopCharging` and
dispatches nothing. An ability built on `new ChargeComponent(this)` (`isCancelable = false`) that
never calls `stopCharging` itself therefore only ever reaches its end event on a **completed**
charge, and a guard on it is preventive rather than corrective. All seventeen abilities converted in
AwakenAwakenNoMi#441 were in exactly that position.

⚠️ **Which stops actually reach the end event is narrower than it looks**, and worth reading off
`ChargeComponent` and `AbilityHelper` rather than assuming - AwakenAwakenNoMi's own notes asserted
the opposite for months:

| Path | Dispatches the end event? |
|---|---|
| natural completion, `chargeTime >= maxChargeTime` | **yes**, through `stopCharging` |
| the ability calling `stopCharging` itself | **yes** |
| `startCharging` pressed again while cancelable | **yes** |
| `IN_EVENT`, or a protected area refusing the ability | **no** - `doTick` calls `forceStopCharging`, which dispatches nothing |
| a `DisableComponent` disabled | **no** - `doTick` returns before anything, so the charge *freezes* rather than ending |
| `AbilityHelper.emergencyStopAbility` | **no** - `forceStopCharging`, plus a flat **40 tick** cooldown. AkumaLib runs `AkumaCharges.interrupt` first: see [below](#a-charge-stopped-from-outside) |
| **kairoseki and water** | **no** - `AbilityHelper.disableAbilities` routes through `emergencyStopAbility` |

⚠️ **The worst shape is a charge that starts a continuity.** A buff whose whole cost is its charge
becomes cheaper to get by being interrupted, because interrupting is faster than charging. Seventeen
abilities in AwakenAwakenNoMi shipped like that.

## A charge stopped from outside

The end event is also where an ability **takes back what its charge start put in the world**, and a stop that skips
it leaks that. Read from the base mod, `emergencyStopAbility` is reached far more often than kairoseki and water:

- every `AbilityHelper.disableAbilities` caller - water and kairoseki, `WetEffect`, handcuffs, nets, kairoseki
  bullets, `Kurouzu`, `Hakai Ho`, `Play Dead`, challenges - and any addon disabling abilities;
- `Ability.tick`, **every tick** while the ability is disabled, and every 20 ticks when a continue-use check fails;
- login and logout.

What a bare `forceStopCharging` used to leave behind:

| Charge start | Left behind |
|---|---|
| `ZoneAbility` spawns its `SphereEntity` | the sphere, until the caster dies or its chunk reloads; every interrupted recast orphans another |
| `SpreadingBlockAbility` spreads blocks every charge tick | the blocks, **for good**: the next cast clears the lists without restoring them |
| `ZoneAbility`, `SpreadingBlockAbility`, `OceanAbility`, `StompAbility` apply `MOVEMENT_BLOCKED` for the charge length | the lock, for the rest of the charge. Splashed at charge start, the user is rooted with every ability disabled - in water, sinking |

**AkumaLib fixes this for every caller** with a mixin at the head of `emergencyStopAbility` that runs
`AkumaCharges.interrupt(entity, ability)`:

| Ability | What happens |
|---|---|
| a `DomainAbility` | `interruptCharge`: the sphere is discarded, or the blocks are put back through the restore queue; lock and pose released |
| an `IChargeInterruptible` | `onChargeInterrupted(entity)`, then `forceStopCharging` |
| anything else | `forceStopCharging`, as before |

The cooldown is unchanged: the mixin applies the base mod's flat **40 ticks** itself, since once the charge is
interrupted the base mod no longer sees one to put on cooldown.

**If your charge start applies something its end event removes, implement `IChargeInterruptible`:**

```java
public class MyAbility extends Ability implements IChargeInterruptible {

    private void onChargeStart(LivingEntity entity, IAbility ability) {
        entity.addEffect(new MobEffectInstance(ModEffects.MOVEMENT_BLOCKED.get(), CHARGE_TIME, 1, false, false));
    }

    @Override
    public void onChargeInterrupted(LivingEntity entity) {
        entity.removeEffect(ModEffects.MOVEMENT_BLOCKED.get());
    }
}
```

It runs server side only, **before** the charge is stopped, so the component still describes the charge being cut.
Do not stop the charge or start a cooldown from it. `StompAbility` and `OceanAbility` implement it already.

For an interruption of your own - an ability breaking a target's concentration - call `AkumaCharges.interrupt` on each
of the target's abilities rather than choosing between `stopCharging` and `forceStopCharging`.

!!! note "`ChargeGuard` still sees nothing on this path"
    The end event is not dispatched, so `partialCooldown` does not apply to a forced stop. The flat 40 does.

!!! warning "Not covered"
    `ChargeComponent.doTick`'s own forced stops - `IN_EVENT` and a protected area refusing the ability - call
    `forceStopCharging` directly and never reach `emergencyStopAbility`.

⚠️ **The cooldown is smaller than the 40 suggests.** A `CooldownComponent` does not run down while its ability is
disabled, and `FruitWeaknessHandler` re-applies the 20 tick disable **every tick** while the weakness flag holds (the
flag itself is refreshed every 30 ticks). After drying off: up to 29 ticks for the flag, the 20 tick disable, then the
40 - up to ~89 ticks on top of the time spent wet. And `startCooldown` is a no-op while a cooldown already runs, so
the 40 never shortens a real one.

## `ChargeGuard`

`com.inovactio.akumalib.api.abilities.components.ChargeGuard` answers the one question the end event
cannot: did the charge actually finish?

```java
private final ChargeComponent chargeComponent = new ChargeComponent(this)
        .addStartEvent(this::onChargeStart)
        .addEndEvent(this::onChargeEnd);

private final ChargeGuard chargeGuard = new ChargeGuard(this.chargeComponent);

private void onChargeEnd(LivingEntity entity, IAbility ability) {
    this.animationComponent.stop(entity);          // release the pose on every exit path
    if (!this.chargeGuard.completed()) {
        this.cooldownComponent.startCooldown(entity, this.chargeGuard.partialCooldown(COOLDOWN));
        return;
    }
    ...
}
```

| Member | Answers |
|---|---|
| `completed()` | whether the charge ran its course |
| `elapsed()` | ticks actually served |
| `servedRatio()` | 0 to 1 |
| `partialCooldown(full)` | `full * ratio`, never below a floor |
| `partialCooldown(full, floor)` | the same with your own floor |

**It holds no state.** It reads `chargeTime` and `maxChargeTime` off the component, which is the
same test `doTick` uses to decide a charge is finished. That is safe inside the end event because
`stopCharging` dispatches the end events **before** calling `forceStopCharging`, which is what zeroes
the two fields.

⚠️ **Do not count ticks instead.** That is what this class did when it first shipped, and it was
wrong: `doTick` advances the charge by `getTpsFactor() * TIME_PROGRESSION`, **not by one per tick**.
A holder with raised ability time - Noro Noro's Reverse Slow grants up to +100% - finishes a 60 tick
charge in 30 ticks, so a tick counter reads half its target and refuses a charge that genuinely
completed. `TIME_PROGRESSION` cuts the other way too, and that direction is harmless.

**It measures against `getMaxChargeTime()`**, not a constant, so an ability whose charge length is
computed per cast is covered without being told. That value is also the one
`maxChargeBonusManager.applyBonus` produced, so a charge shortened by a bonus is measured against
what it really had to serve.

## What an interrupted charge should cost

Proportional, with a floor: `partialCooldown` gives `full * servedRatio()` clamped to at least
`min(20 ticks, full / 4)`.

Proportional rather than a flat reduced value, because a flat one creates a threshold - interrupting
at 99% costs the same as interrupting on the first tick, so there is something to game. The floor is
what stops a charge tapped and dropped repeatedly from costing nothing.

⚠️ **Pass the cooldown a *cheapest full use* would cost**, not the maximum. An ability whose cooldown
already scales with the charge (`MIN_COOLDOWN` to `MAX_COOLDOWN`) should hand `MIN_COOLDOWN` here;
handing the maximum punishes an interruption harder than a completed cast.

## Two things the guard does not do

⚠️ **It does not decide whether an early release is legitimate.** An ability where releasing early is
a *player choice* - a hold-to-charge attack that is simply weaker when released sooner - must not use
`completed()` as a veto. Those abilities are recognisable: they call `stopCharging` themselves from
their use event, or they pass the predicate form `new ChargeComponent(this, comp -> ...)`, which
gates cancellation. Check before attaching a guard. None of the seventeen converted did either.

⚠️ **It fails open.** If `maxChargeTime` is 0 it reports the charge as completed. A guard that failed
closed would silently disable every ability it is attached to, which is a much worse failure than the
one it prevents - and that is not hypothetical, it is what the first tick-counting version did to
anybody whose ability time was raised.

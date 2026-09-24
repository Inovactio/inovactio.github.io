# Choosing a pose

The base mod registers 79 poses in `ModAnimations`. **Pick one by reading what it does, never by its name**: a pose called "power up" can be exactly the opposite motion of the technique it sounds like.

## Poses whose behaviour has been read

| Id | What it does |
|---|---|
| `POINT_RIGHT_ARM` | right arm extended forward. **Blends** with the walk: the arm keeps swinging instead of locking |
| `POINT_ARMS` | both arms extended forward, blending the same way |
| `RAISE_ARMS` | both arms straight up. Arms only, static |
| `CROSSED_ARMS` | arms crossed. Arms only, static |
| `LOW_SWING_ARMS` | both arms low and out, with a slow circular sway of exactly 20 ticks |
| `BODY_ROTATION_WIDE_ARMS` | the body turns with the arms spread: a gesture around the user |
| `THROW_CHAKRAM` | a flat throw, suited to something that comes back |
| `THROW_SPEAR` | an overhand throw, suited to a slow arcing projectile |
| `LOWERING_RIGHT_ARM` | right arm held up for 15 ticks, then swept down: fits a ~20 tick charge |
| `CHARGE_PUNCH` | right arm cocked back, left guarding, with a tremor. Arms only |
| `PUNCH_RUSH` | both arms pistoning forward, looping whatever the duration |
| `AIM_SNIPER` | an aiming stance |
| `SCREAM` | arms flung out, stance widening, eased in |
| `POWERUP` | the whole figure lifted, arms drawn up and back. No easing |
| `GEPPO` | legs tucked, the whole body pitched forward, head up |
| `DODGE` | a randomised side-step, eased in and out |
| `WEAPON_SLAM` | arms overhead while airborne, swung down near the ground |
| `SPIN_TO_WIN`, `YAW_SPIN` | a spin about the vertical axis |
| `PLAY_DEAD` | the whole body laid on its side, through the pose stack only |

!!! danger "`BLACK_HOLE` poses nothing"
    Its angles method is empty. Never pick it.

The library adds two poses of its own, in `AkumaAnimations`: `RIGHT_ARM_FORWARD` (one arm straight forward) and `KNEEL_PUNCH_GROUND` (kneel and strike the ground).

!!! tip "Poses by meaning"
    Kept consistent across a kit, and across fruits, these read clearly: a cone in front is `POINT_ARMS`, aiming at one target is `POINT_RIGHT_ARM`, an area around the user is `BODY_ROTATION_WIDE_ARMS`, pouring or sweeping low is `LOW_SWING_ARMS`, making something rise is `RAISE_ARMS`.

## What a pose assigns decides whether it can be held

**Not its name.** Read the animation before holding one for a continuity.

| The pose assigns | Held for a long state | Examples |
|---|---|---|
| arms only | **yes**: the walk cycle still drives legs and body | `CROSSED_ARMS`, `RAISE_ARMS`, `POINT_RIGHT_ARM` |
| legs, `body`, or the pose stack | **no**: the player walks frozen | `POWERUP`, `SCREAM`, `GEPPO`, `DODGE` |

!!! warning "Holdable is not the same as should-be-held"
    A state the player spends **fighting** should not hold a pose, even an arms-only one: it overrides the attack swing. Fire the pose once as a telegraph with `start(entity, id, ticks)` and let the effect carry the rest.

### A charge is not a pause

!!! danger "`ChargeComponent` does not immobilise anyone"
    Unless the ability adds a movement lock itself, **the user walks, runs and jumps for the whole charge**. A pose that assigns legs, body or the pose stack freezes a moving player for all of it. A charge pose follows the arms-only rule above, exactly like a held one.

    Several library base classes do root their user while charging: `ZoneAbility`, `StompAbility` (when `isStuckWhileCharging()`) and `OceanAbility` apply the base mod's `MOVEMENT_BLOCKED` effect. Check the ability before trusting either case.

Two things make an arms-only pose better, not just acceptable, on a charge:

- **Blending**: `POINT_RIGHT_ARM` and `POINT_ARMS` keep moving with the walk, so a user repositioning while charging still reads.
- **A matching period**: `LOW_SWING_ARMS` sways once every 20 ticks, so a 20-tick charge shows one full cycle rather than an arbitrary slice.

## Easing

| Shape | Behaviour | Examples |
|---|---|---|
| none | snaps in on the first tick and out on the last | `POWERUP`, `CROSSED_ARMS`, `RAISE_ARMS` |
| ease in, hold | ramps over part of the duration, then holds | `SCREAM`, `GEPPO` |
| ease in and out | reverses near the end | `DODGE` |

A pose with no easing is invisible when held and conspicuous when brief: on a short flourish the snap shows at both ends. Prefer an eased pose for anything short.

!!! note "Read the source of an unlisted pose"
    `javap` on `ModAnimations` gives the names of the other poses, not what they do. Decompile the animation class, or test it in game, before relying on one that is not in the table above.

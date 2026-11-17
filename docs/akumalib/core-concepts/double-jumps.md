# Double jumps

## One double jump for every addon

A second jump in the air - the Seiryu hybrid's tail kick (Missing), the cyborg's Heel Boosters (Race) - is
`DoubleJumps`. It was taken out of the Seiryu hybrid, validated in game, so that each addon's double jump
behaves the same:

- **The client moves at once**, on its own side. A press read on the server came late and was missed.
- The client then **asks the server** (`DoubleJumpPacket`, protocol 23), which checks everything again,
  then plays the jump's sound and particles and spares the fall. **The server does not touch the motion**:
  sent back, it arrived a few ticks late (a busy server, a player's ping) and threw the player up a second
  time (the Seiryu's kick topped at 4.9 or 6.9 blocks on the same code).
- **Once until the ground** (or water, a ladder, a mount).
- **The press that leaves the ground does not count**: only a new press made while already in the air does.

## Registering one

Call it once, from common code: the client needs it to move, the server to check.

```java
DoubleJumps.register(new ResourceLocation(MODID, "tail_kick"),
        player -> MyForms.isHybrid(player),                  // who may use it, on top of being in the air
        player -> new Vec3(0.0D, 0.75D, 0.0D),             // the motion, set on the client
        player -> player.serverLevel().playSound(null, player.blockPosition(),
                SoundEvents.ENDER_DRAGON_FLAP, SoundSource.PLAYERS, 0.6F, 1.4F), // server: sound, particles
        0);                                                // ticks the fall after it is spared; 0 = only reset
```

| | |
|---|---|
| `may` | who may use it now. `DoubleJumps.inAir` is checked first (off the ground, out of water, off ladders and mounts, not flying); anything else - a form, a held technique, no creative flight, no elytra, no lava - goes here. |
| `motion` | the motion it **sets** (not adds). It runs on the client only, which moves the player. Keep the current speed with `player.getDeltaMovement()` if that is wanted. |
| `effects` | server side, once the jump is allowed: sound and particles. |
| `sparedFall` | `> 0`: the next fall within that many ticks does no harm (`SparedFalls`). `0`: the fall distance is only reset at the jump. |

When a player could use two double jumps, the first registered wins. Either way it is one double jump
until the ground.

## ⚠️ It is a wish, not a fact

The packet carries only the jump's name. The server checks `inAir`, the jump's `may` and that none was used
since the ground before it does anything: a modified client can ask, it cannot jump twice.

## Testing

`DoubleJumps.Presses` is the client's reading of the jump key, with no client code in it, so a GameTest can
feed it presses (`DoubleJumpsGameTests`). `DoubleJumps.jump(player, id)` and `DoubleJumps.tick(player)` are
the server's side.

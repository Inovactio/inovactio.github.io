# Bodies, seats and places

## `RandomTeleportHelper`

Teleports a living entity to a random safe spot on the surface, within a ring around a point, **without freezing the server** to load chunks:

```java
RandomTeleportHelper.findAndTeleportAsync(
        level, target,
        200, 800,           // minimum and maximum distance, in blocks
        8,                  // candidate spots to try
        origin.x, origin.z,
        1,                  // height above the surface
        () -> { /* runs when done, whether or not it teleported */ });
```

1. It picks the candidate spots in the ring at random.
2. After a short delay, it reads their chunks from disk asynchronously, and keeps the first spot whose surface is **dry land** (the top solid block is also the ocean floor, so not water).
3. It loads that chunk fully, then teleports the target on the server thread, never below sea level, and resets its fall distance.

If no candidate is safe, or the target died in the meantime, it does nothing. The callback runs in every case, so use it to end the technique's state.

!!! warning "Only already generated terrain"
    The candidate chunks are read from what is saved on disk. A chunk that has never been generated has nothing saved, so that candidate is skipped: the teleport only ever lands in terrain someone has already explored. In a new world with a wide ring, give it more candidates.

!!! note "It takes a second"
    The teleport happens about a second after the call, once the chunks have been read. Show the technique's effect immediately, not at the teleport.

## `ThrownBodies`

*Since 3.1.0.* A body an ability has just hurled, watched for the moment it slams into something - a wall, the ground, another body - so it can be hurt by the landing.

```java
body.setDeltaMovement(look.scale(THROW));
body.hurtMarked = true;
ThrownBodies.track(body, 30, impact -> AkumaAbilityHelper.hurtBurst(impact.body(), source, damage));
```

A slam is a flight still fast a tick ago (0.8 blocks a tick or more) that stops short the next. It reads the server-side velocity, which the server keeps for a body it threw - a thrown player included. It does not see a player who moves himself (a dash): only his client moves him. A mob without AI never slams: vanilla does not move it at all.

## `SummonedAllies`

*Since 3.1.0.* The rules every mob an ability summons for its user ends up needing, whatever it extends (`TamableAnimal`, the base mod's `CloneEntity`, a plain `Mob`):

- `prepare(mob)`: the base mod adds its `PUNCH_DAMAGE` attribute to every bare-handed melee blow, a mob's too - a sting tuned at 2 hit for 5. Zeroed here;
- `wantsToAttack(owner, target, sameOwner)`: an enemy of the owner (`AkumaTargeting.isEnemy`), never the owner, never a summon of the same owner;
- `shouldLeave(owner, lifeLeft)` and `leave(mob)`: time up, or the owner gone or dead, and it vanishes in a puff.

## `AkumaRoom`

Where a body fits, for a technique that leaves its user - or what it moved - somewhere the world may have filled: the end of a dive, a pit that closes.

- `fits(level, body, at)`: whether the body, set there, would be in no block; `fits(level, body, size, place)` for a body about to change size;
- `nearest(level, body, place, far)`: `place` if it fits there, else the nearest place within `far` blocks where it does, one with a floor and no fire before any other, and only one a line from the body's middle reaches (no wall is gone through, #703): what "pushed out of the wall" means;
- `firstRoomAbove(level, body, wanted)`: `wanted` if it fits there, else the first place straight above where it does - a cave on the way, else the ground. **However far**: a search of a few blocks left a body in the rock under a hill, smothered. What nothing passes is not climbed through (the bedrock over the Nether): the first room below is taken instead.

## Strong bodies, turned shots, a flyer who left in the air

- `StrongBodies.is(body)`: a player, the game's two bosses, and whatever the `akumalib:bosses` entity tag lists (the base mod's captains and officers by default). For a hold that lasts less on them. A hold still works on a boss: shorten it, do not refuse it.
- `Shots.atRest(shot)`: whether a projectile is planted and no longer flies, told by its place (an arrow in the ground keeps the speed it struck with).
- `Shots.turnBack(shot, by)`: sends it back the way it came as `by`'s own, fireballs included. A pearl, a fishing hook and the thrown weapons of the `akumalib:thrown_weapons` entity tag stay their thrower's.
- `LeftInTheAir`: nothing to call. A player with a `TwoFormFlightAbility` passive who leaves the game in the air finds his first fall free when he comes back: the base mod ends his form before he is saved.

An addon that had tags of its own for these can keep them alive by listing them in its own `data/akumalib/tags/entity_types/bosses.json` (`{"id": "#myaddon:bosses", "required": false}`).

## `UnseenSeat`

A seat nobody sees: an entity with no shape, ridden by whoever sits there - a chair, a stool, a bench. The game draws its rider seated, and nothing else. It goes as soon as nobody sits on it.

```java
public class ChairSeat extends UnseenSeat {
    public ChairSeat(EntityType<? extends ChairSeat> type, Level level) { super(type, level); }
    @Override public double getPassengersRidingOffset() { return 0.0D; }
}
```

Register the type with a renderer that draws nothing, put the seat where the sitter should be, and have him ride it. Override `stays()` to give it a reason of its own to go (the block it serves is gone).

**It is saved while somebody sits on it, and only then.** A rider is never written to disk on his own: the game saves him inside what he rides. A seat that is never saved - the obvious way to leave no empty seats behind - takes whoever sat on it with it when the world is closed. A seat that knows more than its place writes it in `addAdditionalSaveData`, or it comes back knowing nothing.

## A head that stays turned to one side

Nothing to call: the library corrects it on every client.

The game never wraps a player's look: a camera turned twice round reads 720 degrees, and the body's angle winds up with it. The server keeps the look wrapped, so the first time it sets the player's position (a teleport, an ability that moves him) the look comes back wrapped and the body stays wound, a whole number of turns away. A model is then handed 360 or 720 as "head minus body". The game's own models do not show it. A model that shares that angle between a neck and a skull, clamps it or scales it does: its head stayed turned to one side for good.

`LookWinding.unwind(entity)` brings a body's angle back within half a turn of its look by adding whole turns only, so nothing moves. The library calls it for every player, once a tick. Call it yourself for a creature of your own that is drawn with such a model and whose look you set by hand.

In a model, still wrap what you are given before you clamp or scale it (`Mth.wrapDegrees(netHeadYaw)`): the library covers players, not every entity.

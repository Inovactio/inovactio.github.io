# Mending zones

*Since 6.7.0.* [`WorldMending`](pocket-worlds.md#worldmending-a-world-that-comes-back-as-it-was) puts a dimension back as it was, each place a fixed time after it changed. That fits one small world; it does not fit a dimension of several places that each live their own life - towers, arenas, dungeons - where a place must not come back while somebody is busy in it. For those, the dimension is cut into **zones**.

```java
// once, at mod construction
WorldMending.watch(MY_WORLD, "mymod_world_mending", 6000, new WorldMending.Zones() {
    @Override
    public BlockState laid(ServerLevel level, BlockPos pos) {
        return MyGenerator.stateAt(pos);          // what stood there at first, as without zones
    }

    @Override
    public String zone(ServerLevel level, BlockPos pos) {
        MyTower tower = MyTowers.at(pos);         // from the position alone
        return tower == null ? null : tower.name();
    }
});
```

A `Zones` is an `Origin` that also names the zone of a place. Nothing is registered ahead: a zone exists from the first block that changes in it, or the first player who walks in.

## What a zone does

- **It is mended as a whole, once it has not been held for the wait** (`6000` ticks above). Held, by default: a player, alive and no spectator, stands in it.
- **Each zone has its own clock.** A tower nobody is in is mended while another is visited.
- **A change does not set the clock back.** Only being held does: water that flips a block for ever cannot keep a zone from mending.
- **A zone nobody ever held is mended at the next pass**: what an ability breaks from outside is put back at once.
- **Its times are saved with its places.** After a restart nothing of a held zone is put back; without zones, what waited is mended as soon as its chunk loads.
- A place of **no zone** (`zone` answers `null`) goes by its own clock, exactly as in a world without zones.
- The rest is `WorldMending`'s: no block comes back onto somebody, 4 000 places a pass at most, a place whose chunk is not loaded waits for it.

!!! warning "`zone` is asked in the middle of a write"
    And for each player of the dimension at each pass (every 5 ticks). Answer from the position: read no block, load no chunk.

## Holding a zone for another reason

`holds` decides; `inside` says whether a player stands in the zone.

```java
@Override
public boolean holds(ServerLevel level, String zone, boolean inside) {
    return inside || MyFights.runningIn(zone);    // or: false, a zone that mends under its players
}
```

## When was this place last mended

```java
long time = WorldMending.mended(level, pos);      // game time; 0 for never, and for a place of no zone
long same = WorldMending.mended(level, "tower_3_7");
```

The time moves **once each time the zone is left**: the wait after its last hold, whether a block changed or not. It is what makes the things standing in a zone as new with it: a [spawn post](spawn-posts.md) compares the time it was last filled with this one, so a post whose chunk was not loaded learns of the mending when it wakes.

## Mending a zone now

```java
WorldMending.mend(level, "tower_3_7");
```

Held or not: for a command, or a fight that ends. Its time of mending is set to now. Past 4 000 places, and for those whose chunk is not loaded, the rest follows once the zone is no longer held.

`WorldMending.waiting(level)` counts the places of the zones with the others.

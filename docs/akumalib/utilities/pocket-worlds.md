# Pocket worlds

*Since 4.6.0.* For a power that has a world of its own - a prison in the mirrors, a sealed arena, a dream. Three pieces, each usable alone:

| Class | What it does |
|---|---|
| `PocketGuests` | remembers who a power took into its world, by whom, and where each stood, and brings them back |
| `AkumaDimensionTravel.place` | sets a body down standing still, at the nearest free place |
| `WorldMending` | a dimension that comes back as it was after it was dug or built in |

The dimension itself is yours: its json files, its generator, and when a guest comes out. Nothing here decides that.

## `PocketGuests`: who is inside, and the way back

A body found in your world with nothing on record has nowhere to go back to. `PocketGuests` is that record, saved with the world, one registry for each name you give.

```java
PocketGuests guests = PocketGuests.of(server, "mymod_arena");

// Going in: noted where it stands, then moved by you
guests.take(target, user.getUUID(), ARENA, false);
AkumaDimensionTravel.place(target, arena, spot, 0.0F);

// Coming out: everyone this user took in, back where they stood
guests.bringBackAll(server, user.getUUID());
```

- **A player** is noted where he stands, and moved by you.
- **A creature** is noted and moved the same way, or **kept whole**: with `take(creature, host, pocket, true)` it is taken out of the world and stored in the record as it was, to be set down again when it is brought back. A player is never kept.
- `take` answers `null` for a body that is a guest already: nothing is a guest twice.
- `bringBack(server, guest)` sends one guest back where it stood; `bringBack(server, guest, level, at)` somewhere else. `forget(uuid)` drops a record without moving anybody.
- A guest who is already out by another way - dead, respawned, moved by a command - is not moved again: its record just goes.

!!! warning "A player who is not in the game"
    He cannot be brought back while he is away: `bringBack` answers `false`, and his record stays, marked `due`. Bring him back when he logs in (`PlayerLoggedInEvent`: `guests.get(uuid)`, then `bringBack` if it is `due`).

`get(uuid)`, `of(hostUuid)` and `all()` read the records. A `Guest` carries `who`, `host`, `name`, the `pocket` it was taken into, the `world` and place (`at`) it stood in, whether it is a `player`, and an `extra` tag of your own.

## `AkumaDimensionTravel.place`: a body set down

[`send`](dimension-travel.md) is the arrival of a launch: a body thrown into another dimension with a speed. `place` is the arrival of a door:

```java
Entity arrived = AkumaDimensionTravel.place(entity, destination, at, yaw);
```

The body leaves what it rides, arrives with no speed and no fall, turned to `yaw`, at the nearest free place: `at`, or a block to either side or further on when somebody or something is in the way. Nobody arrives inside a body already standing there, nor in a wall. It answers the body as it exists in the destination, or `null` if it could not be moved.

- `room(destination, entity, at, yaw)` gives that free place without moving anybody.
- `isPlacing()` is true while a body is being set down: for a listener of changes of world that must tell your own move from a player's.

Safe from inside the player's own tick: his connection's position is reset as the game's own change of world does.

## `WorldMending`: a world that comes back as it was

Anything may be built in a mended dimension and any of its blocks broken, by a hand or by an ability of any mod; some time after a place last changed, it is again what it was at first.

```java
// once, at mod construction
WorldMending.watch(MY_WORLD, "mymod_world_mending", 600, (level, pos) -> MyGenerator.stateAt(pos));
```

- `600` is the wait in ticks after a place last changed.
- The last argument says **what stood there at first**. A world laid by a pure function of the position needs no memory: ask your generator.
- A block does not come back onto somebody: that place waits until he has moved.
- At most 4 000 places are mended in a pass; a great ability changes a hundred thousand, and they follow over the next ticks.
- The places still to mend are saved with the dimension, under the name you gave, and mended once their chunk is loaded again.
- `WorldMending.waiting(level)` says how many places still wait.

It hears every change through [`BlockWrites`](blocks.md#blockwrites), and takes the dimension's watcher: a mended dimension cannot have another one.

!!! info "Not `TemporaryBlocks`, not a protected area"
    [`TemporaryBlocks`](blocks.md#temporaryblocks) is the other way round: it remembers what an ability laid, and takes it away. The base mod's protected areas restore only the blocks its own abilities queue, and an area is a box in a world, not a world.

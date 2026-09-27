# World events

*Since 2.8.0.* A mod can bring **events** to the world, the way Mine Mine no Mi brings its caravans and Celestial
Dragon visits: they come on their own now and then near a player, are announced in the chat, are sold as rumours by
the base mod's barkeepers, and end on time. Cruise Cruise no Mi's merchant ship, Sea King and wreck are world events.

Mine Mine no Mi's own list of events is fixed in its code, closed to addons. AkumaLib runs a scheduler of its own, on
the same model.

## A type of event

Extend `WorldEventType` and register one instance:

```java
public final class StormEvent extends WorldEventType {

    public static final StormEvent INSTANCE = new StormEvent();

    private StormEvent() {
        super(new ResourceLocation(MODID, "storm"));
    }

    @Override
    public boolean isEnabled() { return MyConfig.STORMS.get(); }          // new ones may start

    @Override
    public long nextStartDelay(RandomSource random) { return 5 * DAY; }  // from one start to the next

    @Override
    public Optional<BlockPos> findPlace(ServerLevel level, ServerPlayer player, RandomSource random, CompoundTag data) {
        return Optional.of(player.blockPosition().offset(200, 0, 0));    // or empty: not this time
    }

    @Override
    public long duration(RandomSource random) { return DAY; }

    @Override
    public boolean start(ServerLevel level, WorldEvent event) { ... return true; }   // false: nothing starts

    @Override
    public void tick(ServerLevel level, WorldEvent event) { ... }         // once a second while it runs

    @Override
    public void end(ServerLevel level, WorldEvent event) { ... }          // undo what start did

    @Override
    public Component startMessage(WorldEvent event) { ... }              // to every player; null for none
}
```

```java
AkumaWorldEvents.register(StormEvent.INSTANCE);   // once, before the server starts
```

| Method | Default | What it is |
|---|---|---|
| `isEnabled()` | true | whether new ones may start; running ones still end on time |
| `nextStartDelay(random)` | - | ticks from one start to the next, drawn each time; also the wait before the first one |
| `retryDelay()` | 1200 | ticks before trying again when no place was found or `start` refused |
| `maxRunning()` | 1 | how many may run at once |
| `findPlace(...)` | - | where, near the chosen player; `data` is the new event's own tag, to fill with what `start` needs |
| `duration(random)` | - | how long one lasts, in ticks |
| `start` / `tick` / `end` | - / nothing / - | what happens |
| `startMessage` / `warningMessage` / `endMessage` | null | told to every player; the warning `warningTicks()` before the end (an in-game hour) |
| `rumour(event)` | null | what a barkeeper says of it |
| `rumourRange()` | 2000 | how far from the barkeeper it may be and still be his rumour |

Times are **game time** ticks: they run on while players sleep, and do not jump with `/time set`.

## What runs

A `WorldEvent` is one occurrence: its `id()`, `type()`, `pos()`, `startTime()`, `endTime()`, and its own `data()`
tag, where `start` writes whatever `end` will need (what it placed, where). Events are saved with the Overworld: they
survive a restart and end on time.

The scheduler runs once a second, in the Overworld only. When a type's next start is due and fewer than
`maxRunning()` run, it picks a random player there, asks `findPlace`, and starts the event. A type's code that throws is
logged, never passed on to the tick.

`AkumaWorldEvents` also gives: `running(server)`, `running(server, type)`, `get(server, id)`,
`startNear(player, type)` and `startAt(level, type, pos, data)` (for commands and tests; the schedule is left as it
is), `stop(server, id)`, `nextStart` and `setNextStart`.

!!! tip "Placing something big"
    `findPlace` and `start` run on the server thread: whatever they cost, the server waits. Do not generate chunks to
    look at them, and put a large structure down in `tick`, once `level.hasChunksAt(...)` says its chunks are loaded,
    as Mine Mine no Mi does for its caravans.

## Rumours

When a player pays a Mine Mine no Mi barkeeper for a rumour (1,000 Belly, the base mod's price), a running event
within its type's `rumourRange()` of the barkeeper can be the answer: the nearest one with a `rumour`. Otherwise the
base mod answers as before.

In Mine Mine no Mi 0.11.5, a barkeeper answers "nothing new" to any player who is not a Marine or a Bounty Hunter,
whatever it knows. Such a player now hears of the world events near the barkeeper. A Marine hears the base mod's own
rumour half the time.

## For operators

| Command | Does |
|---|---|
| `/akumalib events list` | what runs, and when each type is next tried |
| `/akumalib events start <type>` | starts one near you, now |
| `/akumalib events stop <id>` | ends one now, as if its time were up |
| `/akumalib events next <type> <seconds>` | when the scheduler next tries that type |

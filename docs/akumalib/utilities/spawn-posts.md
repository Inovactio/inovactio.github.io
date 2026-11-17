# Spawn posts

*Since 6.7.0.* A spawn post is a marker in a structure that keeps a few entities standing there **while a player is near**, and costs nothing while nobody is: guards at a door, prisoners in a cell, a boss in its hall. The library brings the mechanics; the block is yours.

| Class | What it does |
|---|---|
| `SpawnPost` | the mechanics alone: who stands, who is missing, who sleeps |
| `SpawnPostBlockEntity` | the same as a block entity to extend, with its settings as data |

## A post on your own block

```java
public class MyPostBlockEntity extends SpawnPostBlockEntity {
    public MyPostBlockEntity(BlockPos pos, BlockState state) {
        super(MyBlockEntities.POST.get(), pos, state);
    }

    @Override
    protected int radius() {
        return 48;      // how near a player wakes it
    }
}
```

```java
// in your block (an EntityBlock)
@Override
public <T extends BlockEntity> BlockEntityTicker<T> getTicker(Level level, BlockState state, BlockEntityType<T> type) {
    return level.isClientSide ? null : createTickerHelper(type, MyBlockEntities.POST.get(), SpawnPostBlockEntity::tick);
}
```

The block, its block entity type and where it is placed are registered by you: the library has no block.

## What a post is

Five values, saved with the block and writable by hand (`/data merge block ~ ~ ~ {kind:"minecraft:pig",max:2}`) or from code (`set(kind, max, delay, persistent)`, or `set(kind, max, delay, persistent, stock)`):

| Key | Meaning | Default |
|---|---|---|
| `kind` | the entity type to put down, any registered type, as text | none |
| `max` | how many may stand at once | 1 |
| `delay` | ticks before one that is missing is replaced | 600 |
| `persistent` | kept for ever, see below | false |
| `stock` | *Since 6.8.0.* how many of the missing it replaces between two renewals, see below; under 0, any number | -1 (`SpawnPost.Settings.UNLIMITED`) |

A post with no `kind` asks `fallback(level)`, stock included: a structure laid from a plan writes nothing in its posts, and every post already in the world follows a change of the plan.

```java
@Override
protected SpawnPost.Settings fallback(ServerLevel level) {
    return MyPlan.postAt(getBlockPos());     // null: nothing
}
```

## What a post does

- **A player within `radius`** (alive, no spectator, all round it): it puts its people down, up to `max` at once the first time, then one each `delay` ticks while some are missing. They are spawned as a spawner's (`MobSpawnType.SPAWNER`), on the floor found up to `drop()` blocks under the post.
- **Nobody that near**: it puts nothing down.
- **No player within 128 blocks of one of its people** (`SpawnPost.FAR`): that one goes. Vanilla does the same to the types that follow its rule; many modded types do not.
- **A `persistent` post** keeps its people for ever, and a missing one is not replaced. Beyond 128 blocks from every player they **sleep**: the post takes them out of the world, keeps all they are, and puts the very same ones back, where they stood, when a player comes within `radius` again. A woken one gets what the library gives back to a mob read from its chunk: the AI goals of a fruit it was given (#975).
- **One of its people that is `SpawnPost.Roaming`** and says so (`roaming()` is true: a freed prisoner, an escort on its way) is let be: never put to sleep nor sent away, however far from every player, and still counted, so nobody takes its place while it is out. Your entity class implements the interface.
- **A post with a `stock`** (*since 6.8.0*, #985) replaces its missing that many times, one by one, then stays empty until it is renewed: what dies near it cannot be farmed for ever. Its first filling, and each one after a renewal, takes nothing from the stock. What it spent is saved with it. A post saved before 6.8.0 has no stock.
- **Which players count** (*since 6.8.0*, #209): override `reaches(player, y)` to narrow them, for the post (its height) and for each of its people (theirs). A tall structure keeps a floor's people to the players of that floor: a player on one level no longer wakes nor keeps every level within reach. By default every player counts, all round, as before.
- **Renewed**, any post is as new: it fills up at once, the missing of a persistent post with the others, and its stock is full again.

!!! warning "What a persistent post's people must bear"
    Everything one of them must keep goes in its saved data, and nothing may rely on it ticking while nobody is near. An entity that only stands still costs as much as one that walks: that is why they sleep.

!!! info "People are known by their ids"
    The post knows the chunk each one was last seen in, and saves it as soon as it changes (#975): one in a chunk not loaded while the post's own chunk is still counts, through a restart too, and is gone only once that chunk's entities are loaded without him. A post is still for people who stay about it.

## Renewed by the mending

`renewed(level)` gives the game time the post's place was last put back in order. By default it is [`WorldMending.mended(level, pos)`](mending-zones.md#when-was-this-place-last-mended): in a mended dimension cut into zones, a post is as new each time its zone is mended, with nothing to write. Elsewhere it answers 0, never: override it for a rule of your own.

```java
@Override
protected long renewed(ServerLevel level) {
    return MyDungeon.lastReset(level, getBlockPos());
}
```

## `SpawnPost` alone

For an owner that is not a block entity. It is called once a second and saved by its owner:

```java
private final SpawnPost post = new SpawnPost();
private static final SpawnPost.Settings GUARDS = new SpawnPost.Settings("mymod:guard", 2, 600, false);
// 6.8.0: the same, replacing its missing 3 times between two renewals
private static final SpawnPost.Settings WARDENS = new SpawnPost.Settings("mymod:warden", 2, 600, false, 3);

// once a second, server side; true when something changed that must be saved
boolean changed = post.second(level, pos, GUARDS, radius, drop, renewed);

// 6.8.0: only the players a rule of yours reaches count (null: all of them)
changed = post.second(level, pos, GUARDS, radius, drop, renewed, (player, y) -> Math.abs(player.getY() - y) <= 24);

post.save(tag);
post.load(tag);
post.people();      // the ids of those in the world, not of those asleep
```

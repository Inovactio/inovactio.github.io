# Deferred work: `AkumaTickQueue`

Work to run on a later server tick — at the end of this one, or a fixed number of ticks from now.

```java
AkumaTickQueue.run(() -> strike(holder, target));            // end of this tick
AkumaTickQueue.runIn(30, () -> aftershock(holder, target));  // 30 ticks from now
```

## What it is for

A hurt event that has to land a **second blow**. Dealing it from inside the triggering `LivingHurtEvent` does not work: vanilla has already set `lastHurt` to that blow's amount and silently drops anything weaker, and the listeners reading the event see the second blow as a fresh one. So the blow is queued and delivered once the tick is over.

Four fruits in AwakenAwakenNoMi had written that by hand before #443 — two as an end-of-tick `List<Runnable>`, two as a per-entry countdown — and no two agreed on the details.

## The four decisions it carries

| | Why it matters |
|---|---|
| the list is **snapshotted** before the drain | a task that queues another is reachable — a queued blow fires a hurt event the fruit's own listener reads — and would otherwise be a `ConcurrentModificationException` |
| anything queued **during** a drain waits for the next tick | a task cannot make itself run again in the same drain |
| a task that **throws** does not take the rest with it | it is logged and the drain carries on |
| the queue is **dropped when the server stops** | a static queue of closures over `LivingEntity`s otherwise holds them across a world reload |

That last one is not hypothetical: of the four hand-written copies, one had no shutdown clear at all.

!!! warning "There is deliberately no shared *am I draining* flag"
    The obvious extra is a global re-entry guard, so one fruit's listener ignores another fruit's deferred blow. It would also mean **any** queued work muting **every** fruit's on-hit reaction for the length of the drain — a behaviour change nothing established as wanted, and a blow landing thirty ticks later is a real blow that other systems ought to see. A fruit that needs to ignore its own strike keeps its own flag, raised around its own task.

!!! warning "Server side only"
    `ServerTickEvent` does not fire on a client with no integrated server, so a task queued from client code would never run. Queue from the server thread.

## The delay is in ticks the server ran

Not in game time, so it does not drift with `/tick freeze` or a paused single-player world.

## `ServerScopedMap`

*Since 3.1.0.* A static map that belongs to the running server, not to the game. In single player the same game opens world after world, and a plain static map carries one world's entries into the next: a last-use game time from a world at tick 1,000,000 blocked an ability for hours in a new one.

```java
private static final ServerScopedMap<UUID, Long> LAST_USE = ServerScopedMap.perPlayer();
private static final ServerScopedMap<GlobalPos, BlockState> MARKED = ServerScopedMap.create();
```

`create()` is emptied when the server stops; `perPlayer()`, keyed by player UUID, also drops a player's entry when they log out. It is a `HashMap` otherwise: game thread only.

## `AbilityLifecycle`

*Since 3.1.0.* What the base mod leaves undone when an ability is cut short.

**Death.** The base mod ticks abilities only while their holder is alive and ends none of them when it dies: a continuous ability never reaches its end event, so whatever it put in the world or on the body stays. Opt in from your mod constructor, and every running ability of your namespace is stopped, end event included, as its holder dies:

```java
AbilityLifecycle.stopOnDeath(MODID);
```

Losing the fruit needs nothing: `Ability.onRemove` already stops the continuity.

**Zero gravity.** `NoGravity` is saved with the entity: a server stopped during a float left the player floating at the next login. Use `noGravity(entity)` / `endNoGravity(entity)` instead of `setNoGravity`, and a login lifts a marked one.

**Soft landings.** A "the next fall is free" flag lived until a fall used it, and landing in water used none: it cancelled some later, unrelated fall. `grantSoftLanding(entity, key)` opens a 20-second window; `useSoftLanding(entity, key)` in your `LivingFallEvent` spends it.

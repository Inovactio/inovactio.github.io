# Dimension travel

`AkumaDimensionTravel` moves a body — and whatever it is riding, and whoever is riding it — from one dimension to another, with a velocity that survives the trip.

```java
AkumaDimensionTravel.preload(sky, target);   // while the ride up is still playing
AkumaDimensionTravel.send(player, sky, target, new Vec3(0, 1.2, 0));

AkumaDimensionTravel.launch(entity, new Vec3(dx, 1.6, dz));   // a push that sticks
```

## The five traps it carries

None of them looks like a bug until somebody is in the air.

⚠️ **`changeDimension` dismounts passengers.** A player in a boat arrives without the boat, and the boat arrives without the player — or does not arrive at all. The vehicle goes first, the riders follow, and they are put back together on the **next** tick: a passenger mounted during the transfer tick is dropped again by the tail of the teleport.

⚠️ **The client resets velocity on transfer.** Whatever the server set is gone the moment the player loads in, so the motion packet is resent after arrival. Without it a launch upward ends in a standing start.

⚠️ **A ridden vehicle's velocity is owned by the rider's client.** Setting it server-side alone does nothing — the client's next movement packet overrules it. `launch` sends `ClientboundSetEntityMotionPacket` to the riders too, which is what makes a boat in a column actually rise. This is the case every hand-written copy misses, and it is also why `AkumaMotion` states plainly that it does not sync a body carrying a rider: that helper is about pulls, this one is about launches, and only the second has to fight the rider's client.

⚠️ **Generating the destination chunk during the transfer freezes the server.** `preload` exists to be called *earlier*, while whatever is carrying the player is still playing out. It blocks until the chunk is ready, which is exactly why it must not happen at the moment of transfer.

⚠️ **The arrival chunk is held open across the transfer.** Vanilla adds a `POST_TELEPORT` ticket for a player, in `ServerPlayer.teleportTo`, and for nothing else — so a boat or a mob sent to another dimension is handed to a chunk that is free to unload in the same tick. It is not lost, but it is in no loaded chunk: it ticks for nobody, answers no query, and reappears only when something else happens to load that chunk. That reads exactly like an entity that vanished, and it is what a game test saw before this was added.

**Fall distance** is cleared on arrival, or a launch turns into a death.

## What `send` returns

The entity as it exists in the destination — `changeDimension` returns a **new** instance, not the one you passed. Pass a rider or its vehicle; either way the whole stack moves, and you get back the counterpart of whatever you handed in.

## What it is not

It does not decide *where* to arrive. The caller gives a target that it has already checked, because "is there ground there?" is the consumer's question: a sky dimension wants a cloud under the player, a cave dimension wants air.

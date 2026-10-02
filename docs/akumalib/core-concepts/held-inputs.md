# Held inputs

## A right click in the open air never reaches the server

The game tells the server about a right click only when it lands on something: a block, an entity, or an
item that has a use. **A right click with an empty hand in the open air sends nothing.** An ability
that is fired with the use key - a cannon grafted on the arm, a held beam - therefore cannot be written
on the server alone, and an addon should not open a network channel of its own for one key.

`HeldInputs` carries it:

```java
// Client, once (client set-up or a client-only class): when this addon wants the key reported.
HeldInputs.watch(HeldInputs.Input.USE,
        player -> MyMorphs.CANNON.get().isActive(player) && player.getMainHandItem().isEmpty());

// Server, in the ability's continuity tick.
if (HeldInputs.isHeld(player, HeldInputs.Input.USE)) {
    fire(player);
}
```

Two keys can be watched: `Input.USE` (right click by default) and `Input.ATTACK` (left click).

## What is sent, and when

| | |
|---|---|
| nothing is watched | nothing is sent, ever |
| a watch says yes, the key goes down | one packet: held |
| the key goes up, a screen opens, or every watch says no | one packet: released |
| the key stays down | nothing more |

The predicate handed to `watch` is asked **every client tick**. It can therefore also say "not now" -
the crosshair is on a chest, an item came into the hand - and the key then counts as released until it
says yes again. That is how an addon lets a normal interaction win over its ability.

On the server the state is forgotten when the player logs out, respawns or changes dimension; the
client starts again from nothing at the same moments.

## ⚠️ It is a wish, not a fact

What `isHeld` answers is what the client said. Treat it as a key press: check on the server whatever
the ability needs - the form still active, the hand still empty, the delay between two shots, the
ammunition. A modified client can claim the key is held; it must not be able to claim more than that.

## ⚠️ It changed the network protocol

`HeldInputPacket` was added in protocol version 6: a client and a server must both carry a version of
the library that has it, as for every packet added to `AkumaNetwork`.

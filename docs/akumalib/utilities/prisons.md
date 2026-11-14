# Prisons

*Since 6.7.0.* A pirate who gives himself up at the Marines' desk serves his sentence in **the game's prison**. Without any addon that is AkumaLib's `MarinePrison` (the base mod's prison of the large Marine bases, in the empty dimension `akumalib:prison`). An addon with a prison of its own registers it in `Prisons`, and from then on the surrender, the seconds of a sentence and `/akumalib faction prison send|end|lift` all go to it.

| Class | What it does |
|---|---|
| `Prisons` | the game's prison: `register`, `get`, `holding(player)`, `send`, `serve`, `end` |
| `Prisons.Provider` | what a prison does: take a pirate in, hold him in his cell, bring him back |
| `MarinePrison.PROVIDER` | the default one |
| `Arrests` | a player beaten by a faction is arrested instead of killed, handed to the game's prison |

## Registering a prison

A prisoner's record is a [`PocketGuests`](pocket-worlds.md) entry: where he stood when taken, and whatever the prison keeps of him in `extra` (his weapons, his time, his cell).

```java
public final class MyPrison implements Prisons.Provider {
    @Override
    public PocketGuests guests(MinecraftServer server) {
        return PocketGuests.of(server, "mymod_prison");
    }

    @Override
    public CivilianReturn.Refusal jail(ServerPlayer player) {
        PocketGuests.Guest guest = guests(player.server).take(player, WARDEN, MY_PRISON, false);
        if (guest == null) {
            return CivilianReturn.Refusal.JAILED;               // already held
        }
        guest.extra.putInt("Left", 10 * 1_200);                 // read back by the default left(player)
        guests(player.server).setDirty();
        AkumaDimensionTravel.place(player, cellLevel, cellSpot, 0.0F);
        return CivilianReturn.Refusal.NONE;
    }

    @Override
    public boolean serve(ServerPlayer player, int ticks) {      // each second he is online
        PocketGuests.Guest guest = guests(player.server).get(player.getUUID());
        if (guest == null) {
            return false;
        }
        // count his time down, put him back in his cell if he is out; end(player, true) when it is done
        return true;
    }

    @Override
    public boolean end(ServerPlayer player, boolean served) {
        PocketGuests guests = guests(player.server);
        PocketGuests.Guest guest = guests.get(player.getUUID());
        if (guest == null) {
            return false;
        }
        guests.bringBack(player.server, guest);                 // back where he was taken; the record goes
        if (served) {
            CivilianReturn.free(player);                        // a pirate who gave himself up is a civilian again
        }
        return true;
    }
}
```

```java
// in your mod's common set up
event.enqueueWork(() -> Prisons.register(new MyPrison()));
```

Optional: `arrest(player, by)` (a player beaten and handed over, see below; by default `jail(player)`), `minutes(player)` (the time shown on the desk's surrender button; by default `MarinePrison.minutes` of his bounty), `isJailed` and `left` (by default read from the record, `extra.getInt("Left")`).

## Rules

- **Two addons that register**: the last one wins, and the log names the one it replaced.
- **A sentence begun before** an addon brought its prison runs on in the Marines' prison to its end: `Prisons.holding(player)` finds the prison that holds him.
- The Marines' prison keeps its own protections (no block broken, laid or used in `akumalib:prison`, no handcuffs dropped on death); an addon's prison brings its own.

## Arrests on defeat

*Since 6.7.0.* AkumaLib arrests nobody by itself. An addon says who is arrested and by whom; a player of one of those factions, given his killing blow by a player of the arresting factions or by a creature of the addon's tag, does not die: he is healed and handed to the game's prison (`Prisons.get().arrest(player, by)`). If the prison refuses him, he dies as before.

```java
// in your mod's common set up
Arrests.register(new Arrests.Rule(
        Set.of(ModFactions.PIRATE.get()),                        // who is arrested
        Set.of(ModFactions.MARINE.get()),                        // by players of these factions
        TagKey.create(Registries.ENTITY_TYPE, new ResourceLocation("mymod", "arresting_marines"))));  // by these creatures
```

Not arrested: a death nothing is kept from (the void, `/kill`), a death in a challenge dimension, a prisoner already held, his own blow.

**Order among the death savers.** A totem is used by the game before any death event. The arrest listens at `LOW`: every saver at `HIGHEST`, `HIGH` and `NORMAL` (extra lives such as `ExtraLivesAbility.savesFromDeath`, revivals, the base mod's protected areas) runs first, and a death one of them cancels never reaches it. The "dead for good" listeners at `LOWEST` never see an arrested player.

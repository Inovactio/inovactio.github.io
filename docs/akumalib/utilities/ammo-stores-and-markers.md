# Ammunition, player stores, amounts and screen markers

## `AmmoSources`

Other places than the inventory a player's weapons take their ammunition from: a pocket in the body, a swamp. Once the inventory has none, the game and the base mod look in every registered source:

- bows, crossbows and the base mod's guns (anything `ProjectileWeaponItem`), through Forge's `LivingGetProjectileEvent`, on both sides;
- the base mod's gun powder, cannon balls and Gun Array bullets, which read the inventory themselves, through three mixins (`ModGunItemMixin`, `CannonEntityMixin`, `GunArrayAbilityMixin`).

```java
AmmoSources.register(new AmmoSources.Source() {
    public List<ItemStack> stacks(Player player) { return /* his live stacks */; }
    public void changed(Player player) { /* write them down */ }
});
```

- A source hands out its **live** stacks: the weapon shrinks the stack itself. `changed` is called on the server the tick after, so the source can save.
- The client asks too before it lets a bow be drawn: a client source answers with what the server last told it of the stacks (send them to the owner when they change).
- The inventory, and another mod's quiver, always go first.

## `PlayerStore`: items a player keeps with him

A store that belongs to a player and follows him over a death: a swamp he puts things in, a scroll. Make it once, as a constant, and open it with any chest screen of the game.

```java
public static final PlayerStore SWAMP = new PlayerStore("myaddon:swamp_store", 54)
        .refusing(stack -> stack.getItem() instanceof AkumaNoMiItem);

player.openMenu(new SimpleMenuProvider((id, inventory, p) -> ChestMenu.sixRows(id, inventory, SWAMP.of(player)), TITLE));
```

- `of(player)` is the live container, written back to his data on every change. `keeps(player)` says whether anything is in it without loading it. `spill(player)` drops it all at his feet.
- `refusing(...)` names what it does not keep: put in, it is handed back at once. Refuse Devil Fruits: the base mod keeps them out of every chest so that it knows where each one is, and counts as lost one it cannot find.
- The key is where it is written. Put the id of the addon in it and never change it once shipped.
- A player gets a new body when he dies and when he comes back from the End. The store is read again for the new body, so do not keep the container: ask `of(player)` each time.

## `ScreenMarkers`

*Since 3.1.0.* Markers on one player's screen pointing at places in the world, for a while: a clairvoyance, a radar, Observation Haki.

```java
ScreenMarkers.show(user, new ResourceLocation("mymod", "radar"),
        List.of(new ScreenMarkers.Marker(name, target.position(), 0xFFF3C94C)), 300);
```

Along a band at the top of the screen, each marker sits in its direction from where the player looks, with its label and distance; one behind the player goes to the edge with an arrow. A new `show` with the same source replaces that source's markers, others stay. Labels are cut at 64 characters and a packet carries at most 256 markers. Both sides need 3.1.0 (network protocol 5).

## `AkumaAmounts`

`AkumaAmounts.grouped(12500)` gives `12 500`: an amount with its thousands grouped by a space, the way a price is written on a board, the same in every language. For any price, reward or amount of XP a screen or a chat line shows.

## `InoHelper`

Three small functions:

| Method | Does |
|---|---|
| `linearInterpollation(min, max, t)` | `min + (max - min) * t` |
| `colorToHex(color)` | a `java.awt.Color` as `#RRGGBB` |
| `calculateEffectDuration(user, target, min, max, dorikiThreshold)` | an effect duration from the Doriki gap: `min` at or below zero, `max` at or above the threshold, linear between. The same rule `TransmutationProjectile` uses |

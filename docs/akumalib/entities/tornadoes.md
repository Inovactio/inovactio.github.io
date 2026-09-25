# Tornadoes

`TornadoEntity` is a funnel: it pulls everything around it inward and upward, tears blocks loose, and can be walked across the battlefield towards a point.

## What to implement

```java title="MyTornadoEntity.java"
public class MyTornadoEntity extends TornadoEntity {

    public MyTornadoEntity(Level level, LivingEntity owner) {
        super(level, owner, MyEntities.TORNADO.get());
    }

    public MyTornadoEntity(EntityType<?> type, Level level) {
        super(type, level);
    }

    @Override
    public void spawnParticles() {
        // called every 40 ticks, server side
    }
}
```

Register its entity type, and a renderer and model of your own: the library provides neither. See [Entities](index.md#registering-an-entity).

## Spawning and steering it

```java
MyTornadoEntity funnel = new MyTornadoEntity(entity.level(), entity);
funnel.setMaxLife(200);
funnel.setSize(8.0F);
funnel.setSpeed(-2.0F);
funnel.setPos(x, y, z);
entity.level().addFreshEntity(funnel);

// each tick of the ability, walk it towards where the user is looking
funnel.setVector(aim.add(0.0, 10.0, 0.0));
```

| Setting | Default | Meaning |
|---|---|---|
| `setMaxLife(ticks)` | `120` | lifetime; `0` or less for no limit |
| `setSize(size)` | `1.0` | width and height of the funnel's area of effect. The hitbox is the size declared on the entity type multiplied by `size / 2`, so a type declared `1 x 1` is four blocks across at size 8 |
| `setSpeed(speed)` | `1.0` | synced to the client for your renderer, typically the spin speed. It does not move the entity |
| `setVector(point)` | none | the point the funnel walks towards, easing along rather than teleporting |

Let the ability own the lifetime: discard the funnel from the ability when its channel ends, and keep `setMaxLife` as a backstop longer than the channel, for the case where the ability stops ticking without reaching its end event.

## What it does each tick

| Effect | Details |
|---|---|
| **pull** | every entity within its box except the owner is drawn towards its centre and upward |
| **contact damage** | an entity within 2 blocks takes `size / 3` from a vanilla "fly into wall" source |
| **blocks torn loose** | when ability griefing is enabled and outside protected areas, a very small random share of exposed blocks the `CORE_FOLIAGE_ORE` rule allows are lifted as falling blocks, with no item drop |
| **steering** | moves **horizontally** towards `setVector`'s point, by about a twentieth of the remaining distance each tick, with no collision. Its height never changes, so spawn it at the height it should travel at |
| **quench** | checked every 20 ticks: see below |

The block states of falling blocks inside the funnel are collected in `getBlocksUsed()`, for a renderer that draws debris.

!!! danger "The contact damage does not touch Logias"
    "Fly into wall" is one of the damage types every Logia is immune to by default. A technique whose funnel must hurt Logias has to deal its damage from the **ability**, through its `DealDamageComponent`, on a pulse of its own. Remember that it is a pulse: `hurtTarget`, not `hurtBurst`. See [Damage](../core-concepts/damage.md#which-call-to-use).

!!! warning "The pull ignores factions"
    Allies, items and loose arrows are pulled like enemies. If the ability deals damage, filter its targets itself, for instance through a `RangeComponent`.

## Water and rain

| Hook | Default | Meaning |
|---|---|---|
| `isQuenchedByWater()` | `true` | the funnel disappears when it stands in water |
| `isQuenchedByRain()` | `false` | the funnel disappears when it stands in rain |

Water putting a funnel out is the universal Devil Fruit weakness, and returning `false` from `isQuenchedByWater` should be a deliberate choice. Rain is off by default because a funnel is not made of anything rain washes away; a funnel of sand, dust or ash should override `isQuenchedByRain` to return `true`.

??? note "Why the rain default changed"
    The class began as a copy of the base mod's sandstorm, which rain puts out. A subclass written against that behaviour must now opt back in with `isQuenchedByRain()`.

## Traps

!!! warning "A funnel loaded from a save disappears at once"
    The owner is not saved. A funnel with no owner discards itself on its next tick, so a funnel never survives a chunk reload or a restart. That is usually what a technique wants; do not rely on one outliving its caster's session.

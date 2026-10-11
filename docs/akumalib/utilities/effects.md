# Effects

Most effects an addon registers mark a body rather than doing something every tick: the target is poisoned, painted, salted or dizzy, and the ability that applied it reads that state elsewhere. Two base classes cover that.

## `MarkerEffect`

```java title="SaltedEffect.java"
public class SaltedEffect extends MarkerEffect {

    public SaltedEffect() {
        super(MobEffectCategory.HARMFUL, 0xE8E8E8, true);
    }
}
```

The constructor takes the category, the particle colour, and **whether milk and the base mod's cures may remove it**.

It sets four answers for you:

| Method | Value | Why |
|---|---|---|
| `shouldUpdateClient()` | `true` | **the one that matters**: see below |
| `isDurationEffectTick(...)` | `false` | a marker has no per-tick work |
| `shouldRender(...)` | `true` | visible in the inventory |
| `shouldRenderHUD(...)` | `true` | visible on the HUD |

!!! danger "Without `shouldUpdateClient`, the player never sees the effect"
    The base mod's `BaseEffect` returns `false` by default, and that gates sending the effect to clients at all: no HUD icon, no inventory entry, no body tint. The server knows the target is marked; the player does not. Extending `MarkerEffect` is what stops this from being forgotten.

Each answer is still overridable: an effect that genuinely ticks overrides `isDurationEffectTick`, one that should stay off the HUD overrides `shouldRenderHUD`.

!!! note "Removable is a design choice"
    Whether milk strips the effect is a constructor argument on purpose: an incurable debuff and a buff that washes off are both valid, and neither should be inherited by accident.

## `OverlayEffect`

A `MarkerEffect` that also **tints the body** it is on:

```java title="MarkedEffect.java"
public class MarkedEffect extends OverlayEffect {

    public MarkedEffect() {
        super(MobEffectCategory.HARMFUL, 0xD04040, true);
    }

    @Override
    public Color getBodyOverlayColor(int duration, int amplifier) {
        return new Color(208, 64, 64, 150);
    }
}
```

!!! warning "Spell out the alpha"
    `new Color(rgb)` has an alpha of 255, which paints the body a flat silhouette with no skin left underneath. Around `100` suits something the user wears and must stay readable through; around `150` a mark whose job is to be impossible to miss.

- Override `getViewOverlayColor` to tint the player's **whole view** as well. It defaults to `null`, no tint, and is a much stronger statement than tinting a body.
- The colour method receives only the duration and the amplifier. The amplifier is the only per-application value an effect instance carries, so it can encode something other than strength, such as a colour index: one registered effect for sixteen colours.

## `EffectsHelper`

```java
if (EffectsHelper.isInvulnerable(target)) {
    return;
}
```

Whether the target has the library's `INVULNERABLE` effect. `hurtBurst` already checks it; call it yourself in any other damage or control path that should respect it.

## Exclusive groups

Some effects must never stack: one meal buff at a time, the next replacing it, or a remedy and a meal that must not both raise the same stat. `AkumaEffectGroups` makes a **mob effect tag** exclusive: when an effect of the group lands on an entity, every other effect of that group is taken off.

Declare the group once, in code:

```java
public static final TagKey<MobEffect> MEAL = AkumaEffectGroups.exclusive(new ResourceLocation("mymod", "meal"));
```

List its members as data, so a data pack can change them:

```json title="data/mymod/tags/mob_effect/meal.json"
{ "values": [ "mymod:fish_soup", "mymod:grilled_lizard" ] }
```

!!! danger "`mob_effect`, singular"
    Effect tags live in `tags/mob_effect`. In 1.20.1 only blocks, items, fluids, entity types and game events use plural folders. A plural folder loads an empty tag without an error, and the group does nothing.

The effect added last stays. The others are removed at the start of the entity's next tick rather than inside `addEffect`, so an effect added while the entity's effects are being ticked cannot break that loop. For one tick, both effects are active.

`groupsOf(effect)` and `isIn(effect, tag)` read the groups, for a tooltip that says "replaces your current meal".

## Slower hunger: `SatietyEffect`

```java
// -25 % hunger drain per level of the effect
public static final RegistryObject<SatietyEffect> WELL_FED = MyRegistry.REGISTRY.registerEffect(
        "Well Fed", () -> new SatietyEffect(0xE0B060, 0.25));
```

While the effect is on a player, the exhaustion they build up by running, jumping, fighting or mining is cut by its share. Several such effects add up, to at most -90 % (`SatietyEffect.MAX_REDUCTION`).

Vanilla caps what a single meal can give: a full hunger bar, and as much saturation as there is hunger. Past that cap, a hearty meal can only last longer by slowing the drain, which this effect does.

Vanilla has no event for exhaustion. `SatietyEvents` works around it: at the end of each player tick, on the server, it compares the exhaustion with the previous tick's and takes back the effect's share of the growth. If the exhaustion passed 4 in between, the food data has already spent 4 of it on hunger, and that 4 still counts as growth. `SatietyEvents.reduction(player)` reads the summed share, and `settle(player)` runs the step by hand, for a test.

## Shared states: `AkumaStates`

Some powers answer to what another power did, without the two knowing each other. A silence stops a song. The one who silences gives an effect, the one who sings asks a question: is this body in a silence?

`AkumaStates` holds those questions. A state is a mob effect tag: the list of the effects that put a body in it. The list is data, so an addon adds its own effect to the state from its own files, and every power that asks the state answers to it at once.

```java
// a song, a shout, anything that has to be heard
if (AkumaStates.silenced(target)) {
    return;
}
```

```json
// data/akumalib/tags/mob_effect/silenced.json, in the addon whose effect silences
{ "replace": false, "values": [ "mymod:deaf" ] }
```

| State | Tag | Holds | Ask it |
|---|---|---|---|
| In a silence | `akumalib:silenced` | the base mod's Silent (Nagi Nagi no Mi) | before anything that works by being heard, of the one who makes the sound and of the one it is for |
| Soaked | `akumalib:soaked` | the base mod's Wet and Washed (Awa Awa no Mi). A body in water or in bubbles is soaked without any effect. Rain is not counted | `AkumaStates.soaked(entity)`, before keeping up what water washes off: ink, paint |
| Metal | `akumalib:metal` | the library's `akumalib:metal_body` and `akumalib:gold_body`, laid by a power that makes its user steel or gold | `AkumaStates.metal(entity)`; `AkumaStates.rusts(entity)` is metal that is not in `akumalib:rustproof` (gold) |

A power that turns its user to metal lays the state itself, for as long as it holds: `AkumaStates.hold(entity, AkumaEffects.METAL_BODY.get(), 10)` in its tick. The effect is hidden and does nothing, it only answers the question. An effect of your own that already means "made of metal" can be listed in the tag instead.

A power that works by being heard hands `AkumaStates::canBeHeard` to `addCanUseCheck`: it is refused while its user is in a silence, with the library's message. Ask `AkumaStates.silenced(target)` of each target besides.

The library lays the states the base mod's own fruits put a body in. So far: the Supa Supa no Mi's user is of metal while Spider hardens his body.

`AkumaStates.in(entity, state)` reads any state, and `AkumaStates.state(id)` makes the key of a state of your own.

The folder is `tags/mob_effect`, singular. A plural folder loads an empty tag without a word.

Only the question lives in the library. What your power does with the answer is yours. A state is added when a power needs it, so ask for one in an issue when two of your powers, or yours and another addon's, should meet.

## Elements meet states: `AkumaReactions`

The base mod names the element of every blow (`SourceElement`: fire, ice, lightning, metal, air...). `AkumaStates` names what a body is in. A reaction ties one to the other, once, for every power there is.

| Element | State | What happens |
|---|---|---|
| Lightning | soaked | the blow deals 25 % more (`AkumaReactions.SOAKED_LIGHTNING`). Any lightning: the Goro Goro no Mi, Electro, a weather tempo, a bolt from the sky |
| Ice | soaked | the base mod's Frozen, if the blow leaves one, holds 40 ticks longer (`SOAKED_FREEZE`). Once per 100 ticks for one body |
| Lightning | metal | the blow deals 25 % more (`METAL_LIGHTNING`). On a body both soaked and of metal the two add up |
| Rust: the rust element, and the Sabi Sabi no Mi's Rust Touch | metal that rusts | the blow deals 25 % more (`METAL_RUST`). Not on gold |
| Fire, magma | soaked | the blow deals 20 % less (`SOAKED_FIRE`) and the body is dry: the effects of `akumalib:soaked` come off it |

Each reaction of the library shows on the body: a puff of particles and a short sound. `AkumaReactions.show(target, particle, sound, pitch)` does the same for yours, ten ticks apart at most for one body.

The library runs the reactions on every blow dealt, on the server, before armour. Nothing to call.

Declare one of your own once, from a static initialiser or your mod's constructor:

```java
AkumaReactions.on(SourceElement.FIRE, MyStates::oiled, (target, source, amount) -> amount * 1.5F);
```

A technique the base mod gave no element is named by itself: `AkumaReactions.on(AkumaReactions.by(RustTouchAbility.INSTANCE), state, reaction)`.

A technique that is of an element in name only is spared the reactions to it: `AkumaReactions.spare(SourceElement.FIRE, ScaldingJetAbility.INSTANCE)`. Steam and boiling water are fire by the base mod's list, and the water on a body does not put them out.

The reaction gives back the amount the blow deals, and may do more to the body on the way (take an effect off it, set it alight). `AkumaReactions.carries(source, element)` reads a blow's element the way the library does: the base mod's own reading, and for fire and lightning the game's damage tags as well. The burn a body keeps after it was set alight is not counted: it is what a blow left, not a blow.

The base mod has a few such answers written inside one fruit (rubber against lightning, the sand against water). Look there first: a reaction belongs here when no single fruit owns it.

## Wind blows clouds away: `Winds`

Whoever uses a technique of the base mod's air element blows away the clouds in front of him: within 12 blocks in the cone he faces, or within 3 blocks of him. The library does it for every air technique of any mod. Nothing to call.

What counts as a cloud is the entity type tag `akumalib:blown_away`. It holds the base mod's smoke star and chloro ball clouds. List your own from your own data:

```json
// data/akumalib/tags/entity_types/blown_away.json
{ "replace": false, "values": [ "mymod:spore_cloud" ] }
```

A listed cloud is taken out of the world. One that has an end of its own to play implements `Winds.Blown`. A wind technique that is not of the air element calls `Winds.blow(user)` itself.

The clouds are blown as the technique is used, in front of its user, not along the flight of what it throws.

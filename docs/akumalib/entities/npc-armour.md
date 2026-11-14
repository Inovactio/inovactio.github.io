# Clothes worn by NPCs

A humanoid NPC wears armour and clothes as a player does: on the player's inner and outer armour models. Class: `api.renderers.NpcArmour` (client).

## What AkumaLib does by itself

Mine Mine no Mi's `OPHumanoidRenderer` draws an NPC's armour on the NPC's own body model. A 2D piece (every cloth piece of the base mod: uniforms, jackets, trousers, boots, flat hats and glasses) then lies flat on the skin and is read with half its texture: it vanishes or shows bits. Pieces with a model of their own (hats, masks, capes, Pearl's and Wootz's armour) were drawn right.

AkumaLib replaces that layer, at the same place, on **every entity type whose renderer is an `OPHumanoidRenderer`**, the base mod's and every addon's. An NPC registered with `OPHumanoidRenderer.Factory` has nothing to do: put the pieces in its armour slots.

- The size of the NPC (its `SIZE`, the factory's scale) grows its clothes with it.
- 3D pieces and dye layers are drawn as before.
- Client switch: `fixNpcArmour` in `akumalib-client.toml`, `[baseModFixes]`; off, the base mod's layer draws.

## A cape over a jacket

An NPC has one chest slot. A captain's cape (or the fluffy cape) over a uniform goes in **Curios's back slot** (#954). Curios must be installed; without it there is no back slot and the cape can only replace the jacket.

1. Give your NPC types the back slot with a Curios entities file in your mod, `data/<modid>/curios/entities/npc_back.json`
   (the slot `back` is the base mod's; list the types one by one: Curios 5.14 crashes on an entity tag in this file):

    ```json
    { "entities": ["impeldown:head_jailer"], "slots": ["back"] }
    ```

2. Dress the NPC on the server: the jacket in its chest slot, the cape with `NpcBack`:

    ```java
    npc.setItemSlot(EquipmentSlot.CHEST, new ItemStack(ModArmors.VICE_ADMIRAL_CHEST.get()));
    NpcBack.wear(npc, new ItemStack(ModArmors.MARINE_CAPTAIN_CAPE.get()));   // false: no back slot (no Curios, or not in the tag)
    ```

The piece is saved with the NPC, and drawn over the jacket by every renderer of the base mod's kind (AkumaLib adds Curios's layer to them; Curios draws on players only). `NpcBack.worn(npc)` reads it back. Class: `api.entities.NpcBack` (both sides).

## An NPC with a renderer of its own

Add the same layer:

```java
public MyNpcRenderer(EntityRendererProvider.Context context) {
    super(context, new HumanoidModel<>(context.bakeLayer(ModelLayers.PLAYER)), 0.5F);
    this.addLayer(NpcArmour.layer(this, context));
}
```

## A renderer that draws its armour another way

- An `OPHumanoidRenderer` that holds an armour layer of its own beside the base mod's (added by a subclass or in `AddLayers`) is left as it is, and named in the log.
- To keep the base mod's layer on a type, call `NpcArmour.leaveAlone(MyEntities.MY_NPC.get())` from your mod's constructor or client setup.

## With generated skins

A [generated skin](npc-looks.md) paints the outfit on the skin's own layers (jacket at 0.25, hair on the hat layer at 0.5). Worn pieces sit above: the inner armour at 0.5 (trousers), the outer at 1.0 (top, boots, head). A worn top covers a painted outfit; hair stays under a worn hat (since #956 the band of `wizard_hat` no longer sinks into it).

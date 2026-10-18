# Devil Fruits

`AkumaDevilFruits` reads a living entity's Devil Fruit as Mine Mine no Mi keeps it. The details below were read from the base mod's bytecode, version 0.11.5.

```java
if (AkumaDevilFruits.isZoan(player) && AkumaDevilFruits.isMorphed(player)) {
    // a Zoan user, transformed right now
}
AkumaDevilFruits.resetCooldowns(player);
```

| Method | Does |
|---|---|
| `fruit(entity)` | the `AkumaNoMiItem` it ate, if any |
| `hasFruit(entity, id)` | whether it ate that fruit, e.g. `mineminenomi:hito_hito_no_mi` |
| `isZoan(entity)` | whether its fruit is a Zoan: plain, ancient, mythical or artificial |
| `isMorphed(entity)` | whether it is transformed right now: a Zoan's point, or any other morph |
| `resetCooldowns(entity)` | ends the cooldown of every equipped ability (the base mod syncs it) and returns how many were cooling down |

Notes:

- The base mod's Zoan points never time out, so there is no morph duration to extend. To strengthen a form, check `isMorphed` and add modifiers, as Cruise's Rumble does.
- The base mod's `mineminenomi:zoan` item tag leaves the artificial Zoans out. `isZoan` counts them.
- The Hito Hito no Mi (Chopper's fruit) is a Zoan with no abilities in 0.11.5, so its user is never morphed.

## `ExternalMorphs`

*Since 3.1.0.* A morph put on an entity from outside its own abilities - a curse that turns a player into a toy, a fruit that keeps its user a child. A morph normally travels with a morphing ability of the morphed entity; these have none.

```java
ExternalMorphs.set(player, MyMorphs.TOY.get(), true);                   // here and on every client that sees it
ExternalMorphs.keep(MyMorphs.TOY, player -> MyHelper.isToy(player));    // once, at mod construction
```

What it covers, each a fault of the base mod (0.11.5):

- **watchers**: sent to the entity and everyone tracking it, and again to a player who starts tracking it later, for the morphs a keeper says still hold;
- **duplicates**: the devil fruit sync appends the morphs it carries, so a watched entity can hold one twice - taking it off removes every copy;
- **size**: the last morph off clears the list properly (losing the fruit alone left the player at the morph's size), and the dimensions refresh;
- **respawn, dimension change, login**: the base mod drops these morphs; with a keeper, the player gets it back if it still holds, and loses it if not.

!!! warning "Both sides need 3.1.0"
    It is a packet: network protocol 5.


## `/akumalib npcfruit`

*Since 5.0.0.* An operator command (level 2) to test fruit-using NPCs: it gives a Devil Fruit to an NPC the way the base mod gives one to its captains.

```
/akumalib npcfruit <targets> <fruit>    the fruit, and an AI goal for each of its abilities that has one
/akumalib npcfruit <targets> clear      the fruit and its goals taken off
```

- Every registered fruit is offered, an addon's as well: an addon has nothing to add for its fruits to appear.
- The goals are those of `MobsHelper.getDevilFruitAbilities`, at priority 2: one per ability given a goal wrapper (`addGoalWrapper`). The answer lists those abilities, or says there is none: then the NPC never uses the fruit.
- The goals of the fruit the NPC had are taken off first.
- Players and entities without an AI are refused.
- Under "One Fruit per World" the command still gives any fruit, a taken one included: a test tool for operators. It does not write the fruit in the One Fruit list either. The base mod's own random draw for its NPCs skips the taken fruits (`fixProtectionRules`).
- After a save and a reload the goals come back (`NpcStyles`, with `fixSaveLoad` on), on any NPC: the base mod's own captains and notorious NPCs, and any other mob given its fruit by the command.

The same from code: `NpcStyles.giveFruit(mob, fruit)` and `NpcStyles.takeFruit(mob)`.


## Troops with Devil Fruits

*Since 5.0.0.* Grunts, brutes and snipers of every faction (pirates, Marines, bandits) may spawn with a Devil Fruit, as the base mod's captains do. Off by default: two chances in `akumalib-server.toml`, 0.0 to 100.0 %, decimals allowed.

| Key | NPC | Tiers it may draw |
|---|---|---|
| `troopFruitGruntChance` | Grunt | 1 (wooden box) |
| `troopFruitBruteSniperChance` | Brute, sniper | 1-2 (wooden, iron box) |
| Mine Mine no Mi's "Open World Fruit Users Chance" | Captain, bandit leader, vice admiral, notorious captain | 1-3: the base mod's own draw, unchanged |

Troops are many: in a new world (a pirate ship, a Marine base, a bandit camp and twelve stops), 127 grunts and 24 brutes or snipers spawned for 6 captains. The same chance as the captains would give troops about 25 times as many fruit users. Values to start from: grunts 0.5 %, brutes and snipers 2 %, about one fruit-using troop for every 6 captains.

- The tier is the fruit's own, `AkumaNoMiItem.getTier()`: the caps hold with `fruitBoxMode = MIXED` too.
- A fruit is drawn among those with at least one ability given a goal wrapper (`addGoalWrapper`), as for the captains: an addon has nothing else to do for its fruits to reach the troops of their tier.
- Drawn once, at the end of the troop's `finalizeSpawn`: natural spawns, spawners, `/summon`, spawn eggs. A troop read from its save keeps its fruit and its techniques (`NpcStyles.giveFruit`) and never draws again.
- Under "One Fruit per World" the taken fruits are skipped, and the troop's fruit reserves nothing. With no fruit left in its tiers, the troop has none: it never draws from a higher tier.
- No fruit is dropped on death.

**Logia are rarer on NPCs.** *Since 5.0.0.* A Logia counts a quarter of another fruit in every NPC draw: captains, bandit leaders, vice admirals and notorious NPCs ("Open World Fruit Users Chance"), with or without "One Fruit per World". A player without haki cannot touch a Logia, so a Logia NPC stays a rare boss. The base mod's Logia are all tier 3: troops never draw one. With `fixProtectionRules` false the base mod's own draw is used, Logia as often as any fruit.

The draw from code: `ProtectionRules.freeFruitDraw(mob, maxTier)`; the weight is `ProtectionRules.LOGIA_DRAW_WEIGHT`.


## NPCs break no terrain

*Since 5.0.0.* An NPC's abilities break or replace no block: captains, troops, notorious NPCs, any mob given a fruit. The ability still fires: it hurts, knocks back and applies its effects, and stays in the NPC's kit. One key in `akumalib-server.toml`, section `npcFruitUsers`:

| Key | Default | |
|---|---|---|
| `npcAbilityGriefing` | `false` | `true`: NPCs break blocks as players do |

- **Players are not concerned**: they stay under Mine Mine no Mi's own "Ability Griefing" alone. A projectile or a tamed creature acts for its owner: a player's projectile is a player's.
- **Only lasting destruction is cut.** A block laid into air is still laid, fire excepted: an NPC lights no fire, neither by its explosions (`setFireAfterExplosion`) nor laid into air, since fire spreads and burns for good. A `TemporaryBlocks` group still raises its walls (over flowers too) and cuts its gaps: they come back. `SpreadingBlockAbility` zones, which give their blocks back, still spread. The base mod's own temporary blocks (Barrier, Room, string walls) are laid into air.
- What is refused for an NPC: a block broken or replaced through `NuWorld.setBlockState` (both forms) and the base mod's block placers and queues, an `AbilityExplosion`'s blocks and fires, `Smash.through`, falling blocks and fire or ice through `ProtectionRules`, Takt's lifted blocks, AkumaLib's tornado and the base mod's (which lifts nothing anyway while `fixCombatChecks` is on).
- Not in a challenge arena: the base mod restores it.

Who acts is the entity a block call names, else the entity the server is ticking: the base mod's placers and queues are handed only the level, and an NPC's abilities run in its own tick, its projectiles in theirs. A block queued by an NPC is checked when it lands. The base mod's tornado is the one ability entity with no traceable owner that breaks blocks: its caster is read from it. An addon that breaks blocks with its own calls asks `AkumaProtection.canBreakBlocksAt(entity, pos)` for a change that lasts (a block melted, carried off, turned to another for good), and keeps `canAlterBlocksAt` for one given back or that breaks nothing. An addon's own temporary change made through `NuWorld.setBlockState` on an NPC's behalf goes in `NpcGriefing.temporarily(() -> ...)`.

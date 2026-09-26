# Changelog

Every AkumaLib release for Minecraft 1.20.1, newest first, as published on [CurseForge](https://www.curseforge.com/minecraft/mc-mods/akumalib/files/all).

## 2.7.0 { #v2-7-0 }

<small>Released 2026-09-26 · [Download](https://www.curseforge.com/minecraft/mc-mods/akumalib/files/8980645)</small>

<div class="changelog-body" markdown="0">
<p><strong>Server owners now choose how fast professions level</strong>, from the server's own config file: a speed for every
profession, and each profession's level curve, without writing a data pack.</p>
<p><strong>No signature was removed or changed</strong>: an addon built against 2.5.0 or 2.6.x keeps compiling and keeps working. That
is why this is a minor bump.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong> and <strong>Mine Mine no Mi</strong> 0.11.5. JEI and EMI are optional.</p>
<p>The network protocol is unchanged (3): a 2.7.0 client can join a 2.6.x or 2.5.0 server and the other way round.</p>
<hr />
<h3>New</h3>
<ul>
<li><strong>Profession XP settings.</strong> The world's <code>serverconfig/akumalib-server.toml</code> now has:
<ul>
<li><code>xpMultiplier</code>: speeds up or slows down XP in every profession (2.0 = twice as fast, 0.5 = half as fast);</li>
<li><code>curves</code>: one line per profession, with how much each level costs and a speed of its own.</li>
</ul>
<p>Every installed profession is already listed when the world starts, with its usual values, so you only change
  numbers. Players keep their XP: their levels simply follow the new curve. A line you never changed keeps up with the
  mod's own updates and with data packs, even after a <code>/reload</code>; a line you changed stays as you set it. Edit the file
  with the world closed. For a modpack, put the file in <code>defaultconfigs/</code> and every new world starts with it.</p></li>
</ul>
<h3>Fixes</h3>
<ul>
<li>A very steep profession curve no longer gives players wrong levels at the top of the scale.</li>
</ul>
</div>

## 2.6.1 { #v2-6-1 }

<small>Released 2026-09-25 · [Download](https://www.curseforge.com/minecraft/mc-mods/akumalib/files/8974805)</small>

<div class="changelog-body" markdown="0">
<p><strong>A start-up crash fix.</strong> With AkumaLib 2.6.0 (and 2.5.0), a normal game launched from a launcher
crashed while loading, before the main menu. 2.6.1 fixes it. Nothing else changes.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong> and <strong>Mine Mine no Mi</strong> 0.11.5. JEI and EMI are optional.</p>
<p>Replace 2.6.0 with 2.6.1: addons made for 2.6.0 (InoFruits 3.1.0 among them) work with it as they are.
2.6.1 can play with a 2.6.0 or 2.5.0 server or client.</p>
<hr />
<h3>Fixes</h3>
<ul>
<li><strong>The game crashed on start-up.</strong> A part of the library that changes the size of transformed
  players could not find what it needed in a normal game, and Forge stopped loading. It only worked in
  the development environment, which is why it was not caught before release.</li>
</ul>
</div>

## 2.6.0 { #v2-6-0 }

<small>Released 2026-09-25 · [Download](https://www.curseforge.com/minecraft/mc-mods/akumalib/files/8974217)</small>

<div class="changelog-body" markdown="0">
<p>Three additions for addons with gauges, flying forms and pushes, taken out of InoFruits where each had been written three to five times: a <strong>gauge passive</strong>, a <strong>two-form flight</strong> in the shape of the base mod's Phoenix, and <strong>directional pushes</strong> next to the pulls.</p>
<p><strong>No signature was removed or changed</strong>: an addon built against 2.5.0 keeps compiling and keeps working. That is why this is a minor bump.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong> and <strong>Mine Mine no Mi</strong> 0.11.5. JEI and EMI are optional.</p>
<p>The network protocol is unchanged (3): a 2.6.0 client can join a 2.5.0 server and the other way round.</p>
<hr />
<h3>New</h3>
<h4>Gauge passive</h4>
<ul>
<li><strong><code>GaugePassiveAbility</code></strong>: a passive holding one value between zero and a maximum, shown on the HUD. It clamps every change and does nothing on an unchanged value. Every server change is synced to the holder, and the value is saved under a key you choose, so an ability migrated onto it keeps its saves. The <code>GaugeComponent</code> is client-only. <code>getValue</code>, <code>add</code>, <code>spend</code>, <code>fill</code>, <code>drain</code>, plus four hooks: <code>onValueChanged</code>, <code>gaugeText</code>, <code>gaugeColour</code>, <code>shouldRenderGauge</code>.</li>
<li><strong><code>AkumaGauge.draw</code></strong>: the icon-plus-text layout of every ability gauge, for a gauge with no stored value (a figure computed from health).</li>
</ul>
<h4>Flight</h4>
<ul>
<li><strong><code>TwoFormFlightAbility</code></strong>: the flight of a Zoan with two flying forms, on the base mod's <code>PropelledFlightAbility</code>, as the Phoenix does it. Each form is a <code>Form</code> (its point ability, its morph, sprint and cruise speed and acceleration), plus a ceiling. The gate is the points' continuity (the morph lags a tick on a switch), the speed is read off the active morph, and <code>speedMultiplier</code> scales both for a buff.</li>
<li><strong><code>AkumaFlight.takeOff / land</code></strong>: switches a flight passive on and off from the forms' start and end events, as <code>PhoenixFlyPointAbility</code> does. It never enables through a pause (haki overuse, Seastone, protected areas).</li>
</ul>
<h4>Motion</h4>
<ul>
<li><strong><code>AkumaMotion.shoveAlong</code></strong> (replaces the motion) and <strong><code>nudgeAlong</code></strong> (adds to it): a push along a direction rather than toward a point. The degenerate direction (straight up, or a target on the origin) becomes a straight lift instead of a silent push of zero.</li>
</ul>
<h4>Documentation</h4>
<ul>
<li>Passives, Movement and "Pulls and pushes" pages cover the three.</li>
</ul>
</div>

## 2.5.0 { #v2-5-0 }

<small>Released 2026-09-24 · [Download](https://www.curseforge.com/minecraft/mc-mods/akumalib/files/8965631)</small>

<div class="changelog-body" markdown="0">
<p>Two large groups of additions since 2.4.0: <strong>professions</strong> (workstations, catchable creatures, traps, gathering) — the systems behind <em>Cruise Cruise no Mi</em> — and <strong>worldgen and dimensions</strong> (a cell grid, the overworld read from another dimension, travel between dimensions, the worldgen and fluid registers) — the ones behind <em>Mine Mine no Mi: Sky Island</em>. Both are written for every addon.</p>
<p><strong>No signature was removed or changed</strong>: an addon built against 2.4.0 keeps compiling and keeps working. That is why this is a minor bump.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong> and <strong>Mine Mine no Mi</strong> 0.11.5. JEI and EMI are optional.</p>
<p>⚠️ <strong>The network protocol moves from 2 to 3</strong>: a client and a server must both run 2.5.0, or the connection is refused. Update both sides together.</p>
<hr>
<h3>New</h3>
<h4>Professions</h4>
<ul>
<li><strong>Framework</strong>: a profession registry (<code>AkumaProfessionRegistry</code>), per-player XP and levels (<code>AkumaProfessions</code>, the <code>ProfessionData</code> capability), level curves in data (<code>data/&lt;ns&gt;/professions/*.json</code>: <code>base_xp × L^exponent</code>), synced to the client. Events: <code>ProfessionXpEvent</code>, <code>ProfessionLevelUpEvent</code>, <code>ProfessionChangeEvent</code>.</li>
<li><strong>Modes</strong> (<code>akumalib-server.toml</code>, <code>professionMode</code>): <strong>Solo</strong> (every profession), <strong>Crew</strong> (one chosen profession per player; changing it resets everything), <strong>Auto</strong> (Solo in singleplayer and LAN, Crew on a dedicated server). <code>/profession</code> command (choose, mode, reset, get, set, addxp).</li>
<li><strong>Professions screen</strong> (K, and a plank on Mine Mine no Mi's character screen): levels and XP; in Crew mode only the chosen profession, or the list with Choose buttons before any choice.</li>
<li><strong>Profession pages</strong>: the screen wears Mine Mine no Mi's parchment and planks; clicking a profession opens its page in the base mod's book: level, <strong>perks</strong> (<code>Profession.withPerk</code>) and <strong>unlocks</strong> by level (<code>ProfessionUnlocks</code>: workstation recipes, profession-only seeds and blocks by their minimum level, and addon providers; synced from the server).</li>
<li><strong>Mine Mine no Mi's character creator</strong>: in Crew mode, a fourth tab &quot;Profession&quot; (a client mixin): the arrows cycle the professions and Random, Finish applies the choice.</li>
<li><strong>Icons</strong>: an item (<code>withIcon</code>) or a dedicated texture of any size (<code>withIconTexture</code>), shown in the screen and in the creator tab.</li>
<li><strong>XP boosts</strong>: <code>ProfessionXpBoostEffect</code>, and exclusive effect groups (<code>AkumaEffectGroups</code>: one effect of a group at a time).</li>
</ul>
<h4>Workstations</h4>
<ul>
<li><code>WorkstationBlock</code> + <code>ProfessionRecipe</code> (JSON, shapeless, a level and an XP each) + one shared menu and screen: recipes shown as silhouettes until the level is reached and until first made. <code>ProfessionCraftEvent</code> can change the result.</li>
<li><strong>Recipes are not a crafting grid</strong>: up to <strong>36 ingredients</strong> (<code>ProfessionRecipe.MAX_INGREDIENTS</code>), read as a bill of materials (<code>getPortions()</code>: each ingredient with its count). The workstation screen shows each line as <strong>have / need</strong>.</li>
<li><strong>JEI and EMI</strong>: every workstation of every addon gets a category (the ingredients as a list with their counts, the result, the level, the XP), with no addon code.</li>
<li><strong>Notes in JEI and EMI</strong> (<code>RecipeViewers.note(items, text...)</code>): an information page for an item no recipe explains (a part made at one station and fitted at another).</li>
<li><strong>Profession drops in JEI and EMI</strong> (<code>ProfessionDrops</code>): what a gathering profession gets and from what (the rocks a miner breaks, the creatures a hunter catches), with each output's chance, count, level and XP; built on the server and synced before the recipes. <code>LootSummary</code> reads a loot table into outputs with their chances. <code>CreatureHabitats</code> says where a catchable creature lives (its biomes in the wild and in traps), shown under a &quot;Where?&quot; label; <code>BiomeNames</code> is the biome list it uses, for any other &quot;where&quot; line.</li>
</ul>
<h4>Catchable creatures</h4>
<ul>
<li><code>CatchableCreature</code> / <code>CatchableFlyingCreature</code>: small creatures caught rather than killed, with variants (a rare one as a texture swap), a minimum render range, a capture that rolls <code>capture/&lt;entity&gt;</code> and fires <code>CreatureCaptureEvent</code>, and release from an item (a released creature is calm and kept).</li>
<li><strong>Reactions</strong> to a player who does not sneak: <code>FLEE</code>, <code>TAKE_OFF</code> (runs 2–3 s, flies off and vanishes), <code>ATTACK</code> (a few hits, then the take-off).</li>
<li><strong>Perches</strong> (<code>CreaturePerch</code>): on top of a block (a hornet on a flower, a lizard on a rock) or on a side face (a beetle on a trunk, drawn nose up by <code>CatchableCreatureRenderer</code>); still until disturbed or hurt; tall plants are sat on, not in; one creature to a block; breaking a perch (or the block above or below it) startles the creature, which flees.</li>
<li><strong>Flying creatures</strong> stay airborne when spawned in the air; one that <code>canLand()</code> rests on solid ground now and then (never on water); they flee up into the air.</li>
<li><strong>Surface spawner</strong> (<code>data/&lt;ns&gt;/creature_spawns/*.json</code>: entity, biomes, chance, group, max around the player, sky, altitude): tries every 5 s around each player, on the surface, through the entity's own spawn rules. Vanilla's natural spawning put most attempts underground.</li>
<li>Creature spawns take an optional <code>time</code> (<code>day</code> or <code>night</code>: a firefly), <code>underground</code> (a spot in the caves under the surface: a floor, room above, no sky), <code>min_y</code> and <code>max_y</code> (with the biomes under the base mod's sky islands, the islands alone).</li>
<li><strong>Creature spawns keep to their dimension</strong>: the Overworld, unless <code>&quot;dimensions&quot;</code> names others (<code>[]</code> for every one). An entry with no biomes no longer spawns in the Nether.</li>
<li><strong>Lures</strong>: <code>CreatureSpawns.lure(level, player, rounds)</code> runs a player's spawn entries a few rounds early and says how many landed. It cannot bring anything the place would not give on its own.</li>
</ul>
<h4>Traps</h4>
<ul>
<li><code>TrapBlock</code> (+ one shared block entity type): set on the ground, it closes on a creature after a random delay, picked from <code>data/&lt;ns&gt;/trapping/*.json</code> (entity, weight, biomes, sky, which traps); a right-click collects it through the capture. Single use or reusable; optionally kept to one profession.</li>
<li><strong>Trap catches keep to their dimension</strong> too: the Overworld unless <code>&quot;dimensions&quot;</code> says otherwise.</li>
<li><strong>A trap remembers what it was made of</strong>: the stack it was placed from (<code>getGear()</code>, NBT included) is saved with it, handed to the capture, and given back when it is broken. Two hooks read it: <code>delayFor(gear, random)</code> and <code>isSpentBy(player, gear)</code>.</li>
</ul>
<h4>Gathering</h4>
<ul>
<li><code>HangingFruitBlock</code>: a fruit hanging under leaves that ripens (random ticks, bone meal) and grows back once picked; kept softly to a profession (others bruise half the fruit, practitioners sometimes pick two and earn XP). Hangs in generated trees through vanilla's <code>attached_to_leaves</code> decorator.</li>
<li><code>ProfessionBlockItem</code>: a block item only a profession's practitioners can place (a farmer's sapling) — or <strong>one of several</strong> (<code>or(profession, minLevel)</code>: &quot;Only a Farmer or a Lumberjack can plant this.&quot;).</li>
<li><code>ProfessionCropBlock</code> and <code>ProfessionSeedsItem</code> (both item classes take a minimum level): a crop with the fruit's rules (others spoil half the ripe harvests, practitioners sometimes reap one more and earn XP), and seeds only the profession sows.</li>
</ul>
<h4>Worldgen and dimensions</h4>
<ul>
<li><strong>Worldgen registers on <code>AkumaRegistry</code></strong>: <code>DENSITY_FUNCTION_TYPES</code>, <code>BIOME_SOURCES</code>, <code>CHUNK_GENERATORS</code>, <code>STRUCTURE_TYPES</code>, <code>STRUCTURE_PLACEMENT_TYPES</code>, <code>STRUCTURE_PIECE_TYPES</code>, <code>FEATURES</code> and <code>PLACEMENT_MODIFIER_TYPES</code>. They register codecs and types; the instances come from datapack registries. ⚠️ A structure whose piece type is not registered generates once and is lost on reload.</li>
<li><strong>Fluids</strong>: <code>FLUIDS</code> and <code>FLUID_TYPES</code> on <code>AkumaRegistry</code>. A <code>Fluid</code> that is not a <code>FlowingFluid</code> never flows — a body of liquid that stays where it was placed (a sea with no container); the javadoc says why and what <code>LiquidBlock</code> would do instead.</li>
<li><strong><code>AkumaCells</code></strong>: a deterministic grid of jittered cells, each of which may hold a round feature — &quot;an island here, and nothing for a few thousand blocks&quot;. <code>mask</code>, <code>cellAt</code>, <code>featureAt</code>, and a filter every reader shares. The outline can be <strong>warped</strong> off a circle (off by default); <code>blend</code> mixes a per-cell value across overlapping features (weighted, no seam where two meet); a <code>RadiusRule</code> (<code>withRadiusRule</code>) lets a cell's radius depend on the cell. The nine-cell condition is stated in the javadoc as an inequality to check with your own numbers.</li>
<li><strong><code>OverworldLookup</code></strong>: the overworld's biome and seed from anywhere, including another dimension's worldgen thread: <code>is(x, z, tag)</code>, <code>coverage(x, z, tag)</code> (0 to 1, smoothed over a window wide enough to be a fade), <code>seed()</code>.</li>
<li><strong><code>AkumaDimensionTravel</code></strong>: send a body to another dimension with what it rides and who rides it, arriving with a chosen velocity (<code>send</code>); push an entity so the push sticks on the client, rider case included (<code>launch</code>); generate the arrival early (<code>preload</code>). The arrival chunk is held loaded across the transfer, for a boat or a mob as for a player.</li>
<li><code>AkumaJigsaw</code>: add a placed feature or a structure template to another mod's jigsaw pool (a village's decorations) at server start, without replacing its files.</li>
</ul>
<h4>Currency</h4>
<ul>
<li><code>AkumaCurrency</code>: read, give and take Belly and Extol through Mine Mine no Mi.</li>
</ul>
<h4>Doriki</h4>
<ul>
<li><code>AkumaStats</code>: read and grant Mine Mine no Mi's Doriki, synced to the client. <code>DorikiGainEffect</code>: an effect that multiplies the Doriki earned in fights (NPC and player kills) while it lasts.</li>
<li><code>AkumaDevilFruits</code>: which fruit an entity ate, whether it is a Zoan, whether it is transformed; end its abilities' cooldowns.</li>
<li><code>AkumaStats.runsOnCola</code>/<code>getCola</code>/<code>addCola</code>: refill a cyborg's Cola as the base mod's Cola does, synced. <code>SatietyEffect</code>: an effect that slows hunger drain while it lasts.</li>
</ul>
<h4>Advancements</h4>
<ul>
<li>Triggers <code>akumalib:profession_level</code>, <code>akumalib:profession_craft</code> (item predicate on the result, NBT included), <code>akumalib:creature_capture</code> (creature, variant, tool, released).</li>
</ul>
<h4>Registry</h4>
<ul>
<li><code>AkumaRegistry</code>: menu, block entity, recipe type and recipe serializer registers (and the worldgen and fluid registers above).</li>
</ul>
<h3>Fixes (within this cycle, never released)</h3>
<ul>
<li>A data-load crash (<code>TrapCatches</code> built before its Gson) that made every world fail to load.</li>
<li>The profession sync no longer throws for a player with no open connection (a player being disconnected, a game test's player).</li>
<li>A blank profession no longer reads as a finished one (&quot;level 1, Max&quot;, a gold XP bar).</li>
<li>From the code review: a reusable trap waited no delay after a collection; <code>requires_sky</code> failed under leaves (now: nothing solid above); the spawner goes through Forge's spawn hooks; workstation ingredients are matched rather than first-fit; an interrupted take-off no longer leaves a creature floating.</li>
</ul>
</div>

## 2.4.0 { #v2-4-0 }

<small>Released 2026-09-18 · [Download](https://www.curseforge.com/minecraft/mc-mods/akumalib/files/8909955)</small>

<div class="changelog-body" markdown="0">
<p>Nine groups of additions and two fixes since 2.3.0. <strong>No signature was removed or changed</strong>: an addon built against 2.3.0 keeps compiling and keeps working. That is why this is a minor bump.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong> and <strong>Mine Mine no Mi</strong> 0.11.5.</p>
<p>⚠️ <strong>One fix changes how existing abilities behave</strong>: a charge force-stopped from outside (water, Seastone, handcuffs) now releases what its start put in the world. See <em>Fixes</em> below.</p>
<hr>
<h3>New</h3>
<h4>Targeting: three more <code>AkumaTargeting</code> helpers</h4>
<p><code>AkumaTargeting</code> already had <code>firstInLine</code>, <code>firstInSight</code> and <code>inCone</code>. It gains the three checks aimed abilities kept re-deriving by hand:</p>
<table>
<thead>
<tr>
<th>Method</th>
<th>Answers</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>aimPoint(caster, range)</code></td>
<td>where the caster is aiming: the hit location, or <code>range</code> blocks along the look on a miss</td>
</tr>
<tr>
<td><code>isEnemy(user, target)</code></td>
<td>the one enemy check, through the base mod's own faction predicate, caster excluded</td>
</tr>
<tr>
<td><code>sizedRange(caster, base)</code></td>
<td>a reach grown by the caster's own bulk, so a fixed range stays usable in a large morph</td>
</tr>
</tbody>
</table>
<h4>Pulls: <code>AkumaMotion</code> and <code>PullProfile</code></h4>
<p>Moving a body toward a point - a target dragged to a centre, a user lunging at a target, loot drawn to hand - as one call. A <code>PullProfile</code> states the speed curve (<code>base</code>, <code>perBlock</code>, <code>max</code>, <code>boost</code>), the vertical rule, whether the pull replaces or adds to the motion, and a minimum distance. The velocity always goes through <code>AbilityHelper.setDeltaMovement</code>, so a player's client cannot drop it.</p>
<h4>Deferred work: <code>AkumaTickQueue</code></h4>
<p>One queue for work that has to wait for a later tick - typically a blow that must land at the end of the tick so the triggering hit's invulnerability frames do not swallow it.</p>
<h4>Effect owners: <code>EffectOwners</code></h4>
<p>Who applied an effect to whom, for effects whose point is that relationship. <strong>Keyed on the target's UUID</strong>, so it survives the entity object being replaced while the effect lives on - a dimension change, a respawn, a chunk reload.</p>
<h4>Charges: <code>ChargeGuard</code>, <code>IChargeInterruptible</code>, <code>AkumaCharges.interrupt</code></h4>
<ul>
<li><strong><code>ChargeGuard</code></strong> tells a completed charge from one stopped early, and gives the partial cooldown an early stop should cost. It reads the charge's own progress rather than counting ticks, so it agrees with the component under a changed <code>TIME_PROGRESSION</code>.</li>
<li><strong><code>IChargeInterruptible</code></strong>: a charge whose start puts something in the world (a lock, a pose, a sphere) implements it to take that back when the charge is cut from outside.</li>
<li><strong><code>AkumaCharges.interrupt(entity, ability)</code></strong>: the one right way to cut a charge yourself - neither firing the ability nor leaking its start state.</li>
<li><strong><code>DomainAbility.interruptCharge</code></strong>: a zone's charge can be cancelled from outside, taking down its sphere or putting back the blocks it had placed.</li>
</ul>
<h4>Zone sounds: <code>ZoneSoundSet.intervalClip</code></h4>
<p>A zone's charge sound was replayed every 18 ticks - the pace of the base mod's short Room sound - so any longer clip layered two or three copies of itself over the whole charge. A set can now declare its clip's length, and <code>setZoneSounds</code> replays it only once a play has finished. The cadence is taken at the slot's base pitch, since a lower pitch plays a clip for longer. A set without it keeps the old cadence.</p>
<h4>Protected areas: <code>AkumaProtection</code></h4>
<p>The protected-area checks the base mod only runs on the caster and on block placement, for everything else an ability touches (a pulled target, a landing point, a container). Matches the base mod exactly: the server's global whitelist, <code>ABILITY_GRIEFING</code> and the <code>mobGriefing</code> gamerule.</p>
<h4>Lines: <code>AkumaLines</code></h4>
<p>A line between two anchors - a rope, a thread, a tether - drawn on the client as real geometry. <strong>One packet</strong> instead of a particle per step, and an end anchored to an entity follows it every frame.</p>
<h4>Failed presses: <code>AkumaAbilityHelper.FAILED_PRESS_COOLDOWN</code></h4>
<p>The cooldown an aimed ability charges when it finds nothing or is refused: never zero (a held key would sweep a room for free), never the full cooldown. <code>GrabAbility.DEFAULT_WHIFF_COOLDOWN</code> now points to it, at the same value.</p>
<hr>
<h3>Fixes</h3>
<ul>
<li><strong>A force-stopped charge now cleans up after itself.</strong> <code>AbilityHelper.emergencyStopAbility</code> - reached by water, Seastone, handcuffs, nets and anything calling <code>disableAbilities</code> - skipped the charge's end event, which is where a charge takes back what its start put in the world. A zone left its sphere behind, a spreading zone's charge blocks became permanent, and a charging user stayed rooted. A mixin now runs <code>AkumaCharges.interrupt</code> first. <code>StompAbility</code>, <code>OceanAbility</code> and every <code>DomainAbility</code> implement the cleanup.</li>
<li><strong><code>OceanAbility</code></strong> scans one surface per column and covers grass, instead of leaving holes in a meadow.</li>
</ul>
<hr>
<h3>Documentation</h3>
<ul>
<li>New pages and sections for every addition above</li>
<li><code>ChargeGuard</code> documented as preventive for most abilities, with the exact list of stops that reach a charge's end event</li>
<li>The awakened-Zoan smoke head anchor does not work on every partial morph, and why</li>
</ul>
</div>

## 2.3.0 { #v2-3-0 }

<small>Released 2026-09-14 · [Download](https://www.curseforge.com/minecraft/mc-mods/akumalib/files/8879631)</small>

<div class="changelog-body" markdown="0">
<p>One addition, three fixes and one deprecation since 2.2.0. No signature was removed: a renamed
constant keeps its old name as a deprecated alias, so an addon built against 2.2.0 keeps compiling
and keeps working. That is why this is a minor bump.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong> and <strong>Mine Mine no Mi</strong> 0.11.5.</p>
<p>⚠️ <strong>Two fixes change how existing abilities play</strong>: every <code>InstantDashAbility</code> now hits over the
width it declares, and a <code>RunningSmashAbility</code> hits a target twice a second instead of every tick.
See <em>Fixes</em> below.</p>
<hr>
<h3>New</h3>
<h4>Spreading zones are restored when their holder leaves</h4>
<p>A <code>SpreadingBlockAbility</code> puts back the ground it converted from its own ticks, and those ticks stop
the moment its holder is gone: a logout, a dimension change, a server shutdown. The ability reloaded
afterwards is a fresh instance that knows none of the positions, so the converted blocks stayed in the
world <strong>for good</strong>.</p>
<p>The static zone registry that allows a restore from outside existed, but the only thing draining it
lived in Awaken Awaken no Mi. Any other addon extending the class left its blocks behind.</p>
<p>The library now ships <code>SpreadingBlockCleanupHandler</code> itself:</p>
<table>
<thead>
<tr>
<th>Event</th>
<th>Restores</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>PlayerLoggedOutEvent</code></td>
<td>the zones of the player leaving</td>
</tr>
<tr>
<td><code>EntityLeaveLevelEvent</code></td>
<td>the zones of an entity changing dimension or being unloaded</td>
</tr>
<tr>
<td><code>ServerStoppingEvent</code></td>
<td>every zone still active</td>
</tr>
</tbody>
</table>
<ul>
<li><strong>You wire nothing.</strong> Extending <code>SpreadingBlockAbility</code> is enough.</li>
<li><strong>Running alongside an addon's own copy is harmless.</strong> A zone leaves the registry when it restores,
and each restore walks a snapshot of the registry, so whichever handler runs second finds nothing
left to do. An addon can drop its copy on its next library bump rather than in lockstep.</li>
</ul>
<hr>
<h3>Fixes</h3>
<h4><code>InstantDashAbility</code> hits over <code>GetWidth()</code></h4>
<p><code>GetWidth()</code> (default <code>2.5</code>) was declared overridable and never read: the dash path was swept with the
user's entity reach instead. An override changed nothing, and the width grew in creative mode and with
any reach bonus.</p>
<p>⚠️ <strong>Every dash changes width</strong>:</p>
<table>
<thead>
<tr>
<th>Dash</th>
<th>Before</th>
<th>After</th>
</tr>
</thead>
<tbody>
<tr>
<td>Ferret Dart (InoFruits)</td>
<td>about 3, more in creative</td>
<td><strong>1.5</strong>, the width it already declared</td>
</tr>
<tr>
<td>Totsushin (InoFruits)</td>
<td>about 3</td>
<td><strong>2.5</strong></td>
</tr>
<tr>
<td>Hyozan: Kyousou (Awaken Awaken no Mi)</td>
<td>about 3</td>
<td><strong>2.5</strong></td>
</tr>
</tbody>
</table>
<p>The width no longer depends on the game mode or on reach bonuses.</p>
<h4><code>RunningSmashAbility</code> no longer hits every tick</h4>
<p>Its hit tracker was cleared every tick while its hits clear the target's invulnerability frames, so
nothing limited the rate: a target the knockback did not throw clear took the damage <strong>20 times a
second</strong>. The tracker now resets every <strong>10 ticks</strong>, the window <code>MoveAbility</code> already uses, so a
target in contact is hit about twice a second.</p>
<p>⚠️ A subclass that turns knockback off was the one hitting every tick, and loses the most. Awaken
Awaken no Mi's Reverse Slow Smash, at its default damage, drops from 16 to <strong>1.6 real HP per second</strong>
against a target in contact.</p>
<p>The 10-tick window is shared by all targets: a target first hit on the last tick of a window can be
hit once more on the next tick.</p>
<h4><code>CraftingAbility</code> shows a real message when materials are missing</h4>
<p>Its default message was a developer placeholder, <em>&quot;A message is missing here please contact the dev
to fix it.&quot;</em>, shown to every player lacking the materials unless the subclass set its own. The
default is now <strong>&quot;You do not have the materials to use this ability.&quot;</strong> It stays overridable through
the <code>message</code> field.</p>
<hr>
<h3>Deprecated</h3>
<ul>
<li><strong><code>AkumaI18n.MESSAGE_MISSING</code></strong>: use <code>MESSAGE_MISSING_MATERIALS</code>. The old name is an alias of the
new one, and its lang key <code>akumalib.ability.missing_message</code> stays mapped to the new text, so an
addon built against 2.2.0 shows the right line rather than a raw key. Both go at the next major
version.</li>
</ul>
<hr>
<h3>Notes for addon developers</h3>
<ul>
<li><strong>Bump your <code>akumalib_version</code> to <code>2.3.0</code></strong> if you rely on the zone restore: below it, your
<code>mods.toml</code> range would accept a library that restores nothing.</li>
<li><strong>If you carried your own copy of <code>SpreadingBlockCleanupHandler</code>, delete it</strong> once you require
2.3.0. Keeping it is harmless, just redundant.</li>
<li><strong>Check your dashes and running smashes in game.</strong> A dash declaring a narrow <code>GetWidth()</code> now needs
a more precise aim; a running smash without knockback deals a tenth of what it did.</li>
<li>The distributable jar still comes from <code>gradlew releaseJar</code>, in <code>build/release</code> — never from
<code>build/libs</code>.</li>
<li>Run the control build (<code>gradlew build -PakumalibFromMaven</code> in the consumer, after
<code>gradlew publishToMavenLocal</code> here) before releasing anything that depends on this version.</li>
</ul>
<hr>
<h3>Consumers</h3>
<ul>
<li><strong>Awaken Awaken no Mi</strong>, in its next release, requires AkumaLib 2.3.0 and drops its own copy of the
zone restore handler.</li>
</ul>
</div>

## 2.2.0 { #v2-2-0 }

<small>Released 2026-09-13 · [Download](https://www.curseforge.com/minecraft/mc-mods/akumalib/files/8873859)</small>

<div class="changelog-body" markdown="0">
<p>Six additions and one behaviour change since 2.1.0. No existing signature moved, so an addon built
against 2.1.0 keeps compiling. That is why this is a minor bump.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong> and <strong>Mine Mine no Mi</strong> 0.11.5.</p>
<p>⚠️ <strong>One default changed</strong>: a <code>TornadoEntity</code> is no longer put out by rain. See <em>Changes</em> below.</p>
<hr>
<h3>New</h3>
<h4><code>AkumaLootInjection</code> — addon fruits inside the base mod's own box pool</h4>
<p>An addon fruit could never come out of the base mod's <strong>5% tier cascade</strong> — the roll where a wooden
box upgrades into an iron one — because that nested roll resolves through a code path that skips loot
modifiers by design. Every addon fruit was therefore rarer than a base mod fruit of the same tier,
and no number in a loot file could fix it.</p>
<p>The fruit is now added as an entry <strong>inside</strong> the pool <code>mineminenomi:fruits</code>, while the table is
still being loaded:</p>
<ul>
<li><strong>Parity is weight 100</strong>, the figure every base mod fruit already carries. No share to compute and
nothing to re-tune when a fruit is added.</li>
<li><strong>The cascade works</strong>, because the upgraded roll draws from a pool that now holds the addon fruit.</li>
<li><strong>The base mod's own guard applies</strong>: the entry carries <code>FruitAlreadyExistsFunction</code>, as theirs do.</li>
</ul>
<p><code>registerFruitItem</code> injects <strong>by default</strong>, into the box matching the fruit's tier, with an
<code>inLootBoxes</code> overload to opt out. That removes a whole class of bug: a fruit registered with no loot
entry exists, drops from commands and grants its abilities, and cannot be found in survival — with
nothing logged. Two consumers had shipped exactly that.</p>
<p><code>AkumaLootInjection.addFruit(...)</code> is public for anything registered another way. Each injected table
logs one line at server start.</p>
<h4><code>BlockHighlightManager</code> — outline block positions through terrain, for one player</h4>
<p>Draws a box around scattered block positions <strong>visible through walls</strong>, sent to a single player. The
three obvious routes each fail: particles are depth-tested against terrain, glowing marker entities
cost hundreds of real entities per player, and <code>BlockOverlayManager</code> shades a contiguous zone rather
than single blocks.</p>
<pre><code>BlockHighlightManager.show(player, groupId, positions, colour, ticks);
BlockHighlightManager.clear(player, groupId);
</code></pre>
<ul>
<li>Positions travel in <strong>groups</strong>, one colour each, keyed by a UUID the caller owns.</li>
<li>A group <strong>counts itself down on the client</strong>: an ability showing something for twelve seconds sends
one packet and never has to take it away.</li>
<li>⚠️ Capped at <strong>512 positions</strong> per group, enforced when writing and when reading.</li>
<li>Cleared on level unload, so highlights never survive into the next world.</li>
</ul>
<h4><code>GrabAbility.beginGrab(user, target)</code> — a grab that is not a melee swing</h4>
<p><code>GrabAbility</code> only knew one way to catch somebody: open a reach window, then turn the next hit into
the grab. A <strong>ranged</strong> grab — a tongue, a rope, a harpoon — decides its target when a projectile
arrives, with no swing to intercept. <code>beginGrab</code> is that entry; the pull, the hold and the release
run exactly as they do for a melee catch.</p>
<ul>
<li>It applies the one-tick <code>ANTI_KNOCKBACK</code> the melee path applies. Without it, the impact that caught
the target knocks them straight back out of the grab.</li>
<li>Server side only, and it refuses to start a second grab while one is running.</li>
</ul>
<h4><code>AkumaTargeting.inCone(caster, target, halfAngleDegrees)</code></h4>
<p>The cone test two consumers were carrying as character-for-character copies. Written as a plain dot
product against a cosine rather than delegated to <code>TargetPredicate.testAdvancedInView(float)</code>, whose
float is documented nowhere. A target standing exactly on the caster counts as inside the cone.</p>
<h4><code>IAwakenZoanSmokeLayerHeadAnchor</code> — the awakened-zoan smoke follows the model's head</h4>
<p>A form implementing this marker has its smoke moved to the pivot of the morph model's head, read at
render time, before its Y/Z offsets apply. On most morph models that pivot is where the neck leaves
the body, so the offsets shrink to small corrections — and the scarf follows the model when it moves
its head.</p>
<ul>
<li>Only Y and Z follow the pivot, never X: some models shift the head group sideways and compensate in
the cubes.</li>
<li><strong>Opt-in</strong>: a form without the marker renders exactly as before.</li>
</ul>
<h4><code>AkumaRollTableModifier</code> — an insertion mode</h4>
<p><code>&quot;mode&quot;: &quot;append&quot;</code> (the default, and what every existing file already means) or <code>&quot;mode&quot;: &quot;compete&quot;</code>.
<code>compete</code> inserts the rolled loot at the <strong>front</strong> of the list, for a container that keeps only its
first match. An unrecognised value is a hard codec error rather than a silent fall back to <code>append</code>.</p>
<p>For Devil Fruit boxes you no longer need this at all — <code>AkumaLootInjection</code> handles them. It stays
for chests and any container whose pool cannot be reached.</p>
<hr>
<h3>Changes</h3>
<h4>A tornado is no longer put out by rain</h4>
<p><code>TornadoEntity</code> was a copy of the base mod's Suna Suna no Mi sandstorm, and it inherited the
sandstorm's rule: water <em>and rain</em> discard it. A generic funnel switching itself off when the weather
turns is nonsense, so the rule is now two hooks:</p>
<table>
<thead>
<tr>
<th>Hook</th>
<th>Default</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>isQuenchedByWater()</code></td>
<td><code>true</code></td>
<td>kept — water is the universal Devil Fruit weakness</td>
</tr>
<tr>
<td><code>isQuenchedByRain()</code></td>
<td><code>false</code></td>
<td><strong>changed</strong> — override and return <code>true</code> for a sand funnel</td>
</tr>
</tbody>
</table>
<p>⚠️ <strong>This changes existing consumers.</strong> A tornado subclass that overrides neither hook now survives
rain where it did not before — AwakenAwakenNoMi's diamond funnel among them.</p>
<hr>
<h3>Fixes</h3>
<ul>
<li><strong><code>compete</code> could replace a higher-tier fruit with a lower one.</strong> The cascade pool is rolled before
the same-tier pool, so its fruit heads the list, and a <code>compete</code> insert went in front of it: the
player lost the upgrade, and nothing said so.</li>
</ul>
<hr>
<h3>Notes for addon developers</h3>
<ul>
<li><strong>Bump your <code>akumalib_version</code> to <code>2.2.0</code></strong> so your <code>mods.toml</code> range refuses an older library rather
than loading against one and crashing during registration.</li>
<li>⚠️ <strong>If you shipped loot modifier files for Devil Fruit boxes, delete them.</strong> With injection on by
default, keeping them makes a fruit appear in the pool <em>and</em> get inserted by the modifier.</li>
<li>The distributable jar still comes from <code>gradlew releaseJar</code>, in <code>build/release</code> — never from
<code>build/libs</code>.</li>
<li>Run the control build (<code>gradlew build -PakumalibFromMaven</code> in the consumer, after
<code>gradlew publishToMavenLocal</code> here) before releasing anything that depends on this version.</li>
</ul>
<hr>
<h3>Consumers released alongside</h3>
<ul>
<li><strong>Awaken Awaken no Mi 1.1.0</strong> requires AkumaLib 2.2.0: its twelve new awakened forms place their
smoke with the head anchor.</li>
</ul>
</div>

## 2.1.0 { #v2-1-0 }

<small>Released 2026-09-10 · [Download](https://www.curseforge.com/minecraft/mc-mods/akumalib/files/8853606)</small>

<div class="changelog-body" markdown="0">
<p>Six additions since 2.0.0. Everything here is <strong>additive</strong> — no existing signature moved, so an addon
built against 2.0.0 keeps compiling. That is why this is a minor bump.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong> and <strong>Mine Mine no Mi</strong> 0.11.5.</p>
<hr>
<h3>New</h3>
<h4><code>MorphGates</code> — a factory for <code>requiresMorph</code> conditions</h4>
<p>Every ability locked to a form was writing the same use-condition by hand, and a form gate that is
subtly wrong fails in the worst possible way: the ability is simply usable out of shape, which nothing
logs and nobody notices until somebody tries it. One addon had eleven such copies. They are now one
constant each.</p>
<h4><code>MorphStats</code> — a builder for a morph ability's attribute block</h4>
<p>A Zoan form is mostly a wall of attribute modifiers — speed, armour, knockback resistance, step
height, jump height, reach — and the base mod's own morphs write them out longhand. This builds the
block instead, which makes two forms of the same fruit readable side by side and stops the modifier
UUIDs being copy-pasted between them.</p>
<p><code>onlyWhile(...)</code> adds a <strong>conditional block</strong>: a set of modifiers that applies only while some
predicate holds, so a form that is faster in water or heavier on land is one declaration rather than
a tick handler.</p>
<h4><code>AkumaTargeting</code> — the target-picking helpers</h4>
<p>Consolidates the entity selection every ability was reimplementing, and — more usefully — <strong>documents
which of them exclude the caster and which do not</strong>. That distinction had already produced two
shipped bugs in a consumer, where a technique with a radius damaged the person who used it.</p>
<h4><code>AmplifiedPresentation</code> and the amplification bus</h4>
<p>The pattern where a form amplifies its own fruit's kit — the base mod does it with Venom Demon and
Shinokuni — has three axes: the numbers, the shape of the technique, and its name and icon. The third
is pushed once by the form rather than polled by each technique, and that is the part a sixth ability
in a kit forgets.</p>
<p><code>AmplificationBus.push(entity, amplified, ...abilities)</code> is the whole of the wiring;
<code>IAmplifiableAbility</code> and <code>AmplifiedPresentation</code> are what a technique implements to answer.</p>
<h4><code>MarkerEffect</code> — a base for effects that are read, not felt</h4>
<p>An effect that exists only so something else can ask about it has no per-tick work, and saying so
matters: returning true from <code>isDurationEffectTick</code> asks the game to tick it every single tick for
nothing. It also settles the client-visibility override that, left at its default, makes an effect
exist only on the server — so the overlay is never painted and the failure looks like the colour
being wrong rather than like the effect being invisible.</p>
<h4><code>OverlayEffect</code> — a marker that also tints the body it is on</h4>
<p>Adds the body tint on top of <code>MarkerEffect</code>. ⚠️ <strong>The alpha has to be spelled out</strong>: <code>new Color(rgb)</code>
fills it in at 255, which paints the body a flat silhouette with no skin left underneath. Two
calibrated values are documented on the class — around 100 for something the user wears and has to
stay readable through, around 150 for a mark whose whole job is to be impossible to miss.</p>
<p>⚠️ The amplifier on such an effect is <strong>not always a potency</strong>. An instance carries a duration and an
amplifier and nothing else, so it is the only place a per-application value can travel — one consumer
puts a <code>DyeColor</code> id there, which is what makes sixteen colours one registered effect instead of
sixteen.</p>
<hr>
<h3>Documentation</h3>
<p>Three corrections, each of which had already cost somebody a wrong answer:</p>
<ul>
<li><strong><code>ModAttributes.STEP_HEIGHT</code> is an alias, not an inert attribute.</strong> It resolves to Forge's own, so
writing to it works and reading the Forge one back reflects it.</li>
<li><strong>What does and does not exclude the caster</strong>, spelled out per helper rather than left to be
discovered by damaging yourself.</li>
<li><strong>Only one of <code>MarkerEffect</code>'s four overrides was ever load-bearing</strong> — the other three restate
defaults, and the class says which is which so a subclass knows what it is actually inheriting.</li>
</ul>
<hr>
<h3>Notes for addon developers</h3>
<ul>
<li><strong>Bump your <code>akumalib_version</code> to <code>2.1.0</code></strong> so your <code>mods.toml</code> range refuses an older library
rather than loading against one and crashing during registration.</li>
<li><code>gradlew build</code> leaves a <strong>mapped</strong> jar in <code>build/libs</code>; the distributable comes from
<code>gradlew releaseJar</code>, in <code>build/release</code>. The two are indistinguishable by eye, and shipping the
mapped one produces a mod that loads and then fails on its first Minecraft call.</li>
<li>Consumers resolving AkumaLib from Maven need <code>gradlew publishToMavenLocal</code> in this checkout first.</li>
<li>⚠️ <strong>Run the control build before releasing anything that depends on this.</strong> The composite build
(<code>includeBuild('../AkumaLib')</code>) puts this project's classes on the classpath directly, which hides a
resource missing from the packaged jar completely — a lang file, a texture, <code>mods.toml</code> itself.
<code>gradlew build -PakumalibFromMaven</code> in the consumer is the only build that would catch it.</li>
</ul>
</div>

## 2.0.0 { #v2-0-0 }

<small>Released 2026-09-07 · [Download](https://www.curseforge.com/minecraft/mc-mods/akumalib/files/8831768)</small>

<div class="changelog-body" markdown="0">
<p>Ten changes since 1.0.0. Everything here is <strong>additive</strong> — no existing signature moved, so an addon
built against 1.0.0 keeps compiling.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong> and <strong>Mine Mine no Mi</strong> 0.11.5.</p>
<hr>
<h3>New</h3>
<h4><code>GrabAbility</code> — a base class for grabs</h4>
<p>Mine Mine no Mi has exactly one worked grab, <code>SpinningBrawlAbility</code>, and roughly two thirds of it is
plumbing rather than technique. This class owns that part: the four-way state machine behind the key,
the reach window that turns the first entity struck into the grabbed target, the hold, and a cooldown
that runs once however the grab ends — at full price only if the grab actually connected.</p>
<p>A subclass provides three things: what happens on the catch, on each tick of the hold, and on release.
The throw is deliberately left out, so a technique can end by hurling its target or by dropping it.</p>
<h4><code>BarrelRollAnimation</code> — the missing roll axis</h4>
<p><code>ForwardRollAnimation</code> somersaults; the base mod's <code>YAW_SPIN</code> pirouettes. Neither is a body spinning
about the axis it faces along. Typed on <code>EntityModel</code> rather than <code>HumanoidModel</code>, so it is not
restricted to player-shaped models.</p>
<h4><code>ProduceItemAbility</code> — for fruits that make their own substance</h4>
<p>The counterpart of <code>CraftingAbility</code>. Crafting is materials in, result out — a recipe, a cost, a
failure message. A fruit producing salt, ink, honey or bone has none of those, because the user <em>is</em>
the material. On <code>CraftingAbility</code> such an ability spends three abstract methods saying nothing and
carries a charge component it never starts.</p>
<p>A subclass provides the stack, and optionally a sound. A full inventory and a holder with no inventory
at all are both handled here.</p>
<h4><code>BoomerangProjectile</code> — an out-and-back projectile</h4>
<p>The base mod's <code>ChakramEntity</code> has reusable return maths but an unusable base class: it extends
<code>AbstractArrow</code> and hurts with a vanilla trident source, which carries no <code>AbilityCore</code> and therefore
skips the ability damage pipeline entirely. This extends <code>NuProjectileEntity</code> like every other ability
projectile and borrows only the steering.</p>
<h4><code>registerFruitItem</code> — group a fruit's abilities</h4>
<p><code>registerItem</code> was the wrong entry point for a Devil Fruit and nothing said so. The difference is one
call, <code>AbilityGroups.addFruitGroup</code>, and it is what ties a fruit's moves together in the ability menu.
Registered as a plain item, a fruit loads, drops, is edible and grants its abilities — ungrouped.
Nothing logs it; it shows up only when a player opens the menu.</p>
<h4><code>akumalib:roll_table</code> — a loot modifier consumers drive from data</h4>
<p>Addons need to add items to loot tables they do not own. Minecraft loot tables do not merge, so the
only supported route is a Forge global loot modifier, which needs a codec registered in Java — and the
codec is identical for every addon. Consumers now ship JSON only.</p>
<hr>
<h3>Fixed</h3>
<h4>The loot modifier never rolled its table</h4>
<p>It had never worked. Every invocation logged <code>Detected infinite loop in loot tables</code> and contributed
nothing. Found after about fifty wooden Devil Fruit boxes in a dev client produced no drop against a
0.208 chance — roughly 1 in 116,000 of being luck.</p>
<h4>Opening a box could crash the server thread</h4>
<p><code>StackOverflowError</code>, from the modifier re-entering itself: every public <code>getRandomItems*</code> overload
funnels into one private method that calls <code>ForgeHooks.modifyLoot</code>, so rolling a table from inside a
modifier re-enters the modifier pipeline with the same context. The nested table is now rolled raw.</p>
<hr>
<h3>Notes for addon developers</h3>
<ul>
<li><code>gradlew build</code> leaves a <strong>mapped</strong> jar in <code>build/libs</code>; the distributable comes from
<code>gradlew releaseJar</code>, in <code>build/release</code>. The two are indistinguishable by eye, and shipping the
mapped one produces a mod that loads and then fails on its first Minecraft call.</li>
<li>Consumers resolving AkumaLib from Maven need <code>gradlew publishToMavenLocal</code> in this checkout first.</li>
<li>Bump your <code>akumalib_version</code> to <code>2.0.0</code> so your <code>mods.toml</code> range refuses an older library rather
than loading against one and crashing during registration.</li>
</ul>
</div>

## 1.0.0 { #v1-0-0 }

<small>Released 2026-09-03 · [Download](https://www.curseforge.com/minecraft/mc-mods/akumalib/files/8799343)</small>

<div class="changelog-body" markdown="0">
<p><strong>AkumaLib</strong> is a shared ability framework for <a href="https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod" rel="nofollow">Mine Mine no Mi</a> addons.</p>
<blockquote>
<p>⚠️ <strong>This is a library, not a content mod.</strong> On its own it adds <strong>no fruits, no abilities and no items</strong> — nothing will change in your game. Install it only because another mod requires it.</p>
</blockquote>
<hr>
<h3>For players</h3>
<p>Install it alongside Mine Mine no Mi and the addon that asked for it. That's all there is to do.</p>
<p><strong>Requires</strong></p>
<ul>
<li>Minecraft <strong>1.20.1</strong></li>
<li>Forge <strong>47.4.18</strong> or newer</li>
<li>Mine Mine no Mi</li>
</ul>
<p><strong>Known consumers</strong></p>
<ul>
<li><a href="https://www.curseforge.com/minecraft/mc-mods/awaken-awaken-no-mi" rel="nofollow">Awaken Awaken no Mi</a> 1.0.0 — the addon AkumaLib was extracted from</li>
</ul>
<hr>
<h3>For addon developers</h3>
<p>Mine Mine no Mi gives you <code>Ability</code> and a set of components. Everything above that — a zone that charges and expands, a wave that converts terrain, a passive that grants attribute bonuses under a condition — you would otherwise write yourself, slightly differently each time. AkumaLib is that layer, extracted once and shared: <strong>65 classes, 17 ability base classes, 12 utilities</strong>.</p>
<h4>Ability base classes</h4>
<table>
<thead>
<tr>
<th>Class</th>
<th>For</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>ZoneAbility</code></td>
<td>a charged spherical zone applying effects continuously</td>
</tr>
<tr>
<td><code>SpreadingBlockAbility</code></td>
<td>a zone that replaces ground blocks and restores them at the end</td>
</tr>
<tr>
<td><code>DomainAbility</code></td>
<td>the shared parent of both, carrying the four-slot <code>ZoneSoundSet</code></td>
</tr>
<tr>
<td><code>BlockWaveAbility</code></td>
<td>a radial wave converting blocks outward — sphere, surface or terrain-following</td>
</tr>
<tr>
<td><code>ConditionalStatPassiveAbility</code></td>
<td>a passive granting attribute bonuses while a condition holds</td>
</tr>
<tr>
<td><code>AuraAbility</code></td>
<td>a passive aura ticking every nearby enemy</td>
</tr>
<tr>
<td><code>StompAbility</code> · <code>MoveAbility</code> · <code>InstantDashAbility</code></td>
<td>charged stomp, continuous dash, teleport dash</td>
</tr>
<tr>
<td><code>BlockUseAbility</code> · <code>CraftingAbility</code> · <code>TransmutationAbility</code> · <code>GroundAbility</code></td>
<td>smaller bases</td>
</tr>
</tbody>
</table>
<h4>Utilities</h4>
<p><code>PropagationHelper</code> (BFS propagation with easing), <code>BlockPlacingHelper</code>, <code>AttributeBonusHelper</code> (idempotent attribute modifiers), tooltip helpers, plus morph, animation and networking scaffolding.</p>
<h4>Why the base classes carry so many warnings</h4>
<p>Most exist because something shipped broken first. Extending the class gets you the fix for free:</p>
<ul>
<li><code>SpreadingBlockAbility</code> restores blocks through <code>Block.updateFromNeighbourShapes</code> — putting a remembered state back raw leaves a grass block flagged <code>snowy</code> under open sky.</li>
<li>Its zones are tracked statically and restored on <code>PlayerLoggedOutEvent</code>, because the tick that drains the restore queue stops the moment the holder leaves — and the blocks stayed <strong>permanently</strong>.</li>
<li><code>ConditionalStatPassiveAbility</code> applies and removes idempotently rather than on transitions: <code>addPermanentModifier</code> persists in NBT, and a reconnect turned a conditional bonus into a permanent one.</li>
<li>It also hooks <code>DisableComponent.addStartEvent</code>, because a Devil Fruit passive <strong>is</strong> disabled the moment its holder gets wet, and <code>PassiveAbility.tick()</code> stops dispatching before it can clean up.</li>
</ul>
<h4>Adding it to your project</h4>
<pre><code># gradle.properties
akumalib_version=1.0.0
</code></pre>
<pre><code>// build.gradle
implementation fg.deobf(&quot;com.inovactio:akumalib:${akumalib_version}&quot;)
</code></pre>
<pre><code># mods.toml
[[dependencies.yourmod]]
    modId = &quot;akumalib&quot;
    mandatory = true
    versionRange = &quot;[${akumalib_version},)&quot;
    ordering = &quot;AFTER&quot;
    side = &quot;BOTH&quot;
</code></pre>
<hr>
<h3>⚠️ API stability</h3>
<p>Publishing freezes the API. From 1.0.0 onward, a breaking change to the shared surface is a <strong>major</strong> version bump and forces a synchronised release of the library and every consumer. Your <code>versionRange</code> should exclude the next major.</p>
<hr>
<p><em>All Rights Reserved.</em></p>
</div>

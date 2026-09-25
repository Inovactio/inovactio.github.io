# Changelog

Every InoFruits release for Minecraft 1.20.1, newest first, as published on [CurseForge](https://www.curseforge.com/minecraft/mc-mods/inofruits/files/all).

## 3.0.1 { #v3-0-1 }

<small>Released 2026-09-25 · [Download](https://www.curseforge.com/minecraft/mc-mods/inofruits/files/8970286)</small>

<div class="changelog-body" markdown="0">
<p><strong>A crash fix and redrawn fruit icons.</strong> No fruit, ability or balance changes. Existing worlds and
servers need nothing special.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi</strong> 0.11.5 and <strong>AkumaLib 2.4.0</strong> or newer,
the same as 3.0.0.</p>
<hr>
<h3>Fixes</h3>
<ul>
<li><strong>The Kero Kero no Mi's tongue crashed the game.</strong> Tobitsuki crashed as soon as the tongue hit a
block or a creature, and Shita as soon as it caught a creature. Both now work as described:
Tobitsuki sticks to a block or a body and pulls the frog to it, and Shita catches its target.</li>
</ul>
<hr>
<h3>Changes</h3>
<ul>
<li><strong>All 28 fruit icons have been redrawn.</strong> Each fruit keeps its shape and colours, with a brighter
look and a green stem like the base mod's fruits, so they sit better next to them in your
inventory.</li>
</ul>
</div>

## 3.0.0 { #v3-0-0 }

<small>Released 2026-09-18 · [Download](https://www.curseforge.com/minecraft/mc-mods/inofruits/files/8911715)</small>

<div class="changelog-body" markdown="0">
<p><strong>Thirteen new Devil Fruits and 80 new abilities.</strong> The addon goes from fifteen fruits to
<strong>twenty-eight</strong>, and from 77 abilities to <strong>157</strong>.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi</strong> 0.11.5 and <strong>AkumaLib 2.4.0</strong>.</p>
<p>⚠️ <strong>AkumaLib 2.4.0 is required, not optional.</strong> 2.1.0 to 2.3.0 lack the classes this release uses
(pulls, rendered lines, block protection), and the game crashes the first time one of them is needed.
On a server, <strong>the server and every client must run the same AkumaLib</strong>: its network protocol changed,
and mismatched versions refuse to connect.</p>
<p>⚠️ <strong>Three fruits from 2.0.0 were renamed, and some abilities need the fruit eaten again.</strong> Read
<strong>Breaking changes</strong>, below the new fruits, before updating a world.</p>
<hr>
<h3>New fruits</h3>
<h4>Logia</h4>
<h5>Kaze Kaze no Mi — wind</h5>
<p><em>Tier 3 · golden box · 9 abilities</em></p>
<p>The addon's largest kit, and a Logia built around <strong>moving people before hurting them</strong>. Toppu blows
everything in front away, Josho lifts whatever stands in a column of rising air up to eighteen blocks,
and the next two presses make it pay: Oroshi slams everything airborne within twelve blocks back into
the ground, and Shippu turns the user into wind that rushes through a line of enemies.</p>
<p>Around that: Kamaitachi, a spinning disc of air that flies dead straight; Fuuheki, a wall of wind that
deflects every projectile coming within four blocks; and Tatsumaki, a tornado that follows wherever
the user looks. Rain does not stop it. Water still does. The user flies, faster outside of combat.</p>
<h4>Paramecia</h4>
<h5>Suji Suji no Mi — muscle</h5>
<p><em>Tier 2 · iron box · 5 abilities</em></p>
<p>Three forms, each growing muscle somewhere different. The <strong>upper</strong> body hits extremely hard and very
slowly, the <strong>legs</strong> run faster and jump higher without hitting any harder, and the <strong>full</strong> body does
a bit of both, less well than either. Hasai punches out a shockwave that goes through enemies and
walls; Choyaku jumps a long way and lands on whatever is underneath.</p>
<h5>Mitsu Mitsu no Mi — honey</h5>
<p><em>Tier 2 · iron box · 6 abilities</em></p>
<p><strong>Almost no damage in the whole kit, and that is the design.</strong> Everything here decides where a fight
happens: a pool of honey that slows anything standing in it (the user included), a coat that slows a
target's movement and attacks, and Kohaku, honey that hardens into amber and locks a body in place for
three seconds. Amahada coats the user so that anyone hitting them gets stuck, Mitsu Gusuri heals over
time, and Mitsu Suberi slides on honey, leaving a sticky trail behind.</p>
<h5>Gamu Gamu no Mi — chewing gum</h5>
<p><em>Tier 2 · iron box · 5 abilities</em></p>
<p>A control kit with four verbs: <strong>root, shove, float, pull</strong>. Neba Dan sticks a target in place, Fuusen
blows a bubble that drifts and pops on contact, Kikyu inflates a balloon that lets the user float
down from any height, and <strong>Banji Gamu</strong> shoots a strand of gum up to thirty blocks and reels in
whatever it catches, drawn as a real stretching strand. The passive glues the user's feet to walls and
ceilings.</p>
<h5>Neji Neji no Mi — twist</h5>
<p><em>Tier 1 · wooden box · 5 abilities</em></p>
<p>Both forearms become spinning drills. Its signature is <strong>penetration</strong>: Rasen is the only technique in
the addon that does not stop at the first body in its path, and drills a line through everything in
front of the user. Nejikiri wrings one target off its feet, Totsushin charges drills first through a
crowd, and Nejikomi tunnels through the ground and leaves the hole behind. It respects protected areas,
like the base mod's own Mogu Mogu no Mi.</p>
<p>The drill arms are grafted onto the player's own body, so the hitbox does not change.</p>
<h5>Wata Wata no Mi — cotton</h5>
<p><em>Tier 1 · wooden box · 5 abilities</em></p>
<p>Cotton armour over the chest, shoulders and arms that softens hits and falls, a cloud that blinds
anyone inside it and hides the user, and a packed ball of cotton that picks up whatever it hits and
carries it off. Watazumi turns some of the user's cotton into white wool.</p>
<p>⚠️ <strong>The fruit has a drawback you cannot switch off:</strong> while the cotton armour is on, the user takes
more damage from fire.</p>
<h5>Kiza Kiza no Mi — the gauge</h5>
<p><em>Tier 1 · wooden box · 3 abilities</em></p>
<p>No damage anywhere, and nothing created. Kiza Dashi puts a slider on a target, Hikisage pulls that
slider down and <strong>hands the user whatever it took off</strong>, and Kiza Modoshi pulls back the user's own
sliders, clearing every bad effect on them at once. Alone, the fruit can do nothing but cleanse. In
front of one opponent, everything it takes, the user gains.</p>
<h5>Kane Kane no Mi — treasure</h5>
<p><em>Tier 1 · wooden box · 4 abilities</em></p>
<p><strong>A fruit with no combat line at all</strong>, on purpose. Komyaku highlights everything valuable within
thirty-two blocks, through walls. Meate marks the single most valuable thing within sixty-four blocks
for two minutes. Nakami shows what is inside a container without opening it. And the passive keeps the
user lucky: <strong>Devil Fruit boxes they open upgrade three times as often.</strong></p>
<h4>Zoan</h4>
<h5>Mushi Mushi no Mi, Model: Mosquito</h5>
<p><em>Tier 2 · iron box · 8 abilities</em></p>
<p><strong>The addon's first form that is allowed to be bad at everything.</strong> The mosquito is weaker than a plain
player on every line of the stat screen, and what pays for it is not on that screen: the smallest
hitbox in the addon, and hostile mobs that do not bother targeting it. Both forms fly.</p>
<p>Kyuketsu drinks from whatever is in front of the user and heals them, and keeps part of that blood in a
sac shown as a gauge. The blood slowly goes bad, and Chibukure spends all of it at once for a heal and
a burst of speed. Kabashira raises a column of mosquitoes around the user that bites everything inside:
the fruit's only answer to more than one opponent.</p>
<h5>Kero Kero no Mi, Model: Frog</h5>
<p><em>Tier 2 · iron box · 7 abilities</em></p>
<p>Light, vertical and immune to fall damage: the opposite of the crocodile it shares the water with.
Its tongue does three things: Shita pulls a target in and holds it, Shita Muchi whips without pulling,
and Tobitsuki sticks to a block or a body and pulls the frog to it. Hoppu jumps and slams whatever is
underneath. Nendeki makes the skin sticky, and <strong>the next projectile of any kind</strong> that hits the user
sticks harmlessly instead.</p>
<h5>Fugu Fugu no Mi, Model: Pufferfish</h5>
<p><em>Tier 1 · wooden box · 7 abilities</em></p>
<p>A defensive Zoan whose full form is too round for most doors. Bocho puffs the user into a spiky ball
that shoves everything nearby away, Togeuchi fires a ring of spines in every direction, and Hosui
blows a jet of air that throws the user backwards, out of trouble.</p>
<p>Two passives do the real work while a form is on: <strong>melee attackers take part of the blow back</strong>, and
<strong>poison goes both ways</strong>, onto anyone the user hits and anyone who hits them.</p>
<h5>Usa Usa no Mi, Model: Hare</h5>
<p><em>Tier 1 · wooden box · 5 abilities</em></p>
<p><strong>The addon's only evasion kit.</strong> The hare outruns anything on the ground and jumps far higher than a
player, and Ushiro Geri, a two-legged kick that launches the target one way and the hare the other, is
the hardest single hit in the wooden tier. It pays for all of it by being fragile: its two forms carry
the lowest armour in the addon.</p>
<h5>Kani Kani no Mi, Model: Crab</h5>
<p><em>Tier 1 · wooden box · 4 abilities</em></p>
<p>A crab that breathes underwater and walks on the sea floor in its full form, and grows a shell and
two pincers in its hybrid, where it is slow and hard to push around. Yokobashiri is a dash with no
wind-up (sideways, in the shell), and Hasamikomi catches whatever is in front of the user in a claw and
drags it along.</p>
<hr>
<h3>⚠️ Breaking changes — read before updating a world</h3>
<h4>Three fruits and their forms have new ids</h4>
<p>Six fruits were renamed during this cycle so that every root is two morae, the way the base mod names
its own. <strong>Only three of them existed in 2.0.0</strong>, so only these three affect an existing world:</p>
<table>
<thead>
<tr>
<th>2.0.0</th>
<th>3.0.0</th>
</tr>
</thead>
<tbody>
<tr>
<td>Itachi Itachi no Mi, Model: Ferret</td>
<td><strong>Ita Ita no Mi, Model: Ferret</strong></td>
</tr>
<tr>
<td>Fukuro Fukuro no Mi, Model: Owl</td>
<td><strong>Zuku Zuku no Mi, Model: Owl</strong></td>
</tr>
<tr>
<td>Kujira Kujira no Mi, Model: Whale</td>
<td><strong>Isa Isa no Mi, Model: Whale</strong></td>
</tr>
</tbody>
</table>
<p>Their ids changed with their names, along with the forms and abilities that carried the old root:</p>
<table>
<thead>
<tr>
<th>Kind</th>
<th>2.0.0 id</th>
<th>3.0.0 id</th>
</tr>
</thead>
<tbody>
<tr>
<td>Fruit</td>
<td><code>inofruits:itachi_itachi_no_mi_model_ferret</code></td>
<td><code>inofruits:ita_ita_no_mi_model_ferret</code></td>
</tr>
<tr>
<td>Fruit</td>
<td><code>inofruits:fukuro_fukuro_no_mi_model_owl</code></td>
<td><code>inofruits:zuku_zuku_no_mi_model_owl</code></td>
</tr>
<tr>
<td>Fruit</td>
<td><code>inofruits:kujira_kujira_no_mi_model_whale</code></td>
<td><code>inofruits:isa_isa_no_mi_model_whale</code></td>
</tr>
<tr>
<td>Ability</td>
<td><code>ferret_walk_point</code></td>
<td><code>ita_ita_walk_point</code></td>
</tr>
<tr>
<td>Ability</td>
<td><code>ferret_heavy_point</code></td>
<td><code>ita_ita_heavy_point</code></td>
</tr>
<tr>
<td>Ability</td>
<td><code>fukuro_fukuro_fly_point</code></td>
<td><code>zuku_zuku_fly_point</code></td>
</tr>
<tr>
<td>Ability</td>
<td><code>fukuro_fukuro_assault_point</code></td>
<td><code>zuku_zuku_assault_point</code></td>
</tr>
<tr>
<td>Ability</td>
<td><code>fukuro_fukuro_flight</code></td>
<td><code>zuku_zuku_flight</code></td>
</tr>
<tr>
<td>Ability</td>
<td><code>kujira_kujira_walk_point</code></td>
<td><code>isa_isa_guard_point</code> — also renamed, see below</td>
</tr>
<tr>
<td>Ability</td>
<td><code>kujira_kujira_heavy_point</code></td>
<td><code>isa_isa_heavy_point</code></td>
</tr>
<tr>
<td>Ability</td>
<td><code>kujira_rideable</code></td>
<td><code>isa_rideable</code></td>
</tr>
<tr>
<td>Morph</td>
<td><code>ferret_walk</code>, <code>ferret_heavy</code></td>
<td><code>ita_ita_walk</code>, <code>ita_ita_heavy</code></td>
</tr>
<tr>
<td>Morph</td>
<td><code>fukuro_fukuro_fly</code>, <code>fukuro_fukuro_assault</code></td>
<td><code>zuku_zuku_fly</code>, <code>zuku_zuku_assault</code></td>
</tr>
<tr>
<td>Morph</td>
<td><code>kujira_kujira_walk</code>, <code>kujira_kujira_heavy</code></td>
<td><code>isa_isa_guard</code>, <code>isa_isa_heavy</code></td>
</tr>
</tbody>
</table>
<p>Ferret Dart keeps its id. The ferret's two forms now read <strong>Ita Ita Walk Point</strong> and <strong>Ita Ita Heavy
Point</strong>, like every other Zoan in the addon.</p>
<p><strong>The whale's full form is now a Guard Point.</strong> The base mod calls a defensive Zoan's full form a
<em>Guard</em> Point (Zou, Mammoth, Brachiosaurus, Kame), and the whale is the addon's tank. The form is the
same; only its name and id changed.</p>
<h4>What carries over</h4>
<p>The addon maps every old id to its new one when an older world loads, so:</p>
<ul>
<li><strong>fruits already in chests, inventories and item frames become the renamed fruits</strong>;</li>
<li><strong>the forms and their effects resolve under their new ids.</strong></li>
</ul>
<p>Tested on a world created with 2.0.0: fruits in storage and players who had already eaten the
ferret, owl or whale come through the update with their fruit and forms under the new names. <strong>If a
form or an ability is still missing for someone</strong>, run <code>/ability reset &lt;player&gt;</code> and have them eat the
fruit again.</p>
<h4>Abilities added to fruits that were already out</h4>
<p>Mine Mine no Mi grants a fruit's abilities <strong>when the fruit is eaten</strong> and never checks the fruit
again. A player who already has one of these fruits <strong>will not see the new abilities</strong> until they
run <code>/ability reset &lt;player&gt;</code> and eat the fruit again:</p>
<table>
<thead>
<tr>
<th>Fruit</th>
<th>New in 3.0.0</th>
</tr>
</thead>
<tbody>
<tr>
<td>Isa Isa no Mi (whale)</td>
<td>Shiofuki, Utagoe</td>
</tr>
<tr>
<td>Wani Wani no Mi</td>
<td>Lunging Bite, Belly Crawl</td>
</tr>
<tr>
<td>Nezu Nezu no Mi</td>
<td>Hassho</td>
</tr>
<tr>
<td>Chiku Chiku no Mi</td>
<td>Chikuken</td>
</tr>
<tr>
<td>Bai Bai no Mi</td>
<td>Baizo</td>
</tr>
</tbody>
</table>
<h4>The loot files are gone</h4>
<p>The addon no longer ships <code>loot_modifiers</code> or <code>loot_tables/dfboxes</code> files. Its fruits are now added
straight into Mine Mine no Mi's own Devil Fruit box pool, at the same weight as the base mod's fruits
of the same tier. <strong>A datapack that overrode <code>inofruits:loot_modifiers/*</code> or
<code>inofruits:dfboxes/*_additions</code> no longer does anything.</strong> To tune the rates, edit the base mod's box
tables instead.</p>
<hr>
<h3>Changes to existing fruits</h3>
<h4>New abilities</h4>
<ul>
<li><strong>Wani Wani no Mi — Lunging Bite and Belly Crawl.</strong> Death Roll sat behind the crocodile's slowest
form with no way to get in range. Lunging Bite throws the whole body a few blocks forward and ends
on the first enemy in the way, further and harder in the full form. Belly Crawl slides the user in
low and fast, and the next bite that lands hits harder. Death Roll also gets its own sound.</li>
<li><strong>Isa Isa no Mi — Shiofuki and Utagoe.</strong> The whale finally has something to do while crowded:
Shiofuki erupts a column of water in front of it that launches enemies into the air and puts out
fires on everyone caught in it. Utagoe is a song that makes the user and nearby allies resist damage.
Both reach further in the full form.</li>
<li><strong>Nezu Nezu no Mi — Hassho.</strong> The rat's plague used to be something to watch spread. Hassho sets
off every plague on nearby carriers at once, each taking all the damage its plague had left.</li>
<li><strong>Chiku Chiku no Mi — Chikuken.</strong> A third way to spend the battery: the next punch carries all the
stored force into one target. The most dangerous way to carry a charge, and the kit's highest single
hit.</li>
<li><strong>Bai Bai no Mi — Baizo.</strong> Every clone next to the user splits again, up to a limit. The Bai Bai no
Mi is complete at three abilities.</li>
</ul>
<h4>Look and feel</h4>
<ul>
<li><strong>Animations across every fruit</strong>, on the techniques where a pose helps, and the Zoans' full forms
move with them: the crocodile rolls around its own spine, the crab's pincer snaps, the pufferfish
holds its puff, the whale lands with a splat.</li>
<li><strong>The Wani Wani no Mi's Heavy Point has a new model.</strong> The crocodile head replaces the player's, and
the player's own body stays visible under osteoderms, a tail and claws. Its hitbox is smaller to
match.</li>
<li><strong>Sounds where they were missing</strong>: Bone Throw, Weasel Bound, Washizukami, and a generated wind for
Tatsumaki and insect hum for Kabashira. Saigoppe's spray is replaced by a softer puff.</li>
<li><strong>The Tsuri Tsuri no Mi's fishing line is drawn as a real line</strong> instead of a trail of particles.</li>
<li><strong>The Kobo Kobo no Mi shows what it hits.</strong> Two of its techniques reach eight blocks and used to show
nothing at all; they now leave particles, so the player can see what they hit.</li>
<li><strong>New fruit sprites</strong> for the ferret, the owl, the whale and the Tsuchi Tsuchi no Mi, and ability
icons redrawn without the dark outline the base mod's icons do not have.</li>
<li><strong>Every ability description is rewritten</strong> to read like the base mod's: one short sentence saying
what the technique does.</li>
</ul>
<hr>
<h3>Fixes</h3>
<ul>
<li><strong>Kajiru could gnaw open chests.</strong> The rat's bite only checked for claimed areas, so in the wild it
could eat a chest, barrel, furnace, spawner or redstone component and spill its contents. It now
follows the base mod's own block-protection list, which only allows terrain, building blocks,
foliage and ore.</li>
<li><strong>Hako Kobo emptied containers with griefing turned off.</strong> Spilling a container now counts as
griefing, and respects the ability-griefing config and, for a mob caster, the <code>mobGriefing</code> rule.</li>
<li><strong>Kabe's wall ignored the base mod's placement rules.</strong> It now goes through them like the base mod's
own barriers do: griefing settings, challenge arena bounds, restricted blocks and restoring areas.</li>
<li><strong>Ichi Ichi and Tsuri Tsuri ignored the protection whitelist at the target.</strong> A technique the
server whitelisted was allowed where the caster stood and refused where the target stood.</li>
<li><strong>Marks and side effects landed on hits that did nothing</strong>, such as a strike on an intangible Logia
or an invulnerable body, <strong>and vanished on hits that did land</strong> whenever someone else had struck the
same target a moment earlier. Both are fixed across the addon.</li>
<li><strong>In randomized fruits mode, this addon's fruits showed their real icon</strong> under a &quot;Generic Fruit&quot;
label, which gave them away. They are now disguised like every other fruit.</li>
</ul>
<hr>
<h3>Under the hood</h3>
<p>More of what this addon used to carry itself now comes from AkumaLib: pulling a body toward the user,
lines drawn between two points, protected-area checks, and the way a Devil Fruit box picks up this
addon's fruits. None of it is visible in game; all of it is why AkumaLib 2.4.0 is required.</p>
<hr>
<h3>How they fit into Mine Mine no Mi</h3>
<ul>
<li><strong>They drop from its own Devil Fruit boxes</strong>, wooden, iron and golden, now as entries in the box's own
pool at the same weight as the base mod's fruits of the same tier. Finding one is exactly as rare as
finding any other fruit of its tier.</li>
<li><strong>Both 2.0.0 limitations are gone.</strong> This addon's fruits now come out of the 5% tier cascade like the
base mod's, and no box is held under its intended chance any more.</li>
<li><strong>They appear in its Devil Fruits creative tab</strong>, and <strong>take part in randomized fruits mode</strong>.</li>
<li><strong>They are calibrated against its kits</strong>, not above them.</li>
<li>The encyclopaedia, fruit shifting and &quot;eat a fruit you already have&quot; all pick them up unchanged.</li>
</ul>
</div>

## 2.0.0 { #v2-0-0 }

<small>Released 2026-09-10 · [Download](https://www.curseforge.com/minecraft/mc-mods/inofruits/files/8853605)</small>

<div class="changelog-body" markdown="0">
<p><strong>Nine new Devil Fruits and 45 new abilities.</strong> The addon goes from six fruits to <strong>fifteen</strong>, and
from 32 abilities to <strong>77</strong>.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi</strong> 0.11.5 and <strong>AkumaLib 2.1.0</strong>.</p>
<p>⚠️ <strong>AkumaLib 2.1.0 is required, not optional.</strong> 2.0.0 does not contain what this release compiles
against, and loading against it fails during registration rather than gracefully.</p>
<hr>
<h3>New fruits</h3>
<h4>Logia</h4>
<h5>Tsuchi Tsuchi no Mi — earth</h5>
<p><em>Tier 3 · golden box · 7 abilities</em></p>
<p>The first Logia whose element is everywhere, and its balance is a data file rather than a number.
Every other Logia's Travel is bounded by its substance being rare — sand, ice, glass — so the earth
tag deliberately stops at the dirt family: the user phases through the top layer of the world and
stops the moment they go below it or step into a building. Stone is a wall, and that is the fruit's
counter-play.</p>
<p>A wave along the ground, a temporary wall that takes itself back down, an immobilisation that does no
harm at all and is the strongest thing in the kit, and one thrown mass. Over all of it, a golem form
that grows every technique it holds — <strong>including their range</strong>, which is the axis such forms usually
forget.</p>
<h5>Yuge Yuge no Mi — steam</h5>
<p><em>Tier 2 · iron box · 7 abilities</em></p>
<p>The only fruit in the game that carries water — the universal Devil Fruit weakness — to somebody
standing on dry land. A soaked target loses their own fruit's powers for a moment, and <strong>every
technique here is priced twice</strong>: once against a dry body, once against one the fruit has already
soaked. It is the addon's first kit that always wants two presses.</p>
<p>Scalding damage doubles on a soaked body; the finisher is worth five times as much and uses the mark
up. Around that: a lunge that soaks what it passes through, and a vent that lifts the user ten blocks
and holds them there while the column below scalds whatever stays in it.</p>
<p>Its Logia body is immune to fire but <strong>not to lava</strong>, and takes half again as much from cold — the
trade that pays for the immunity.</p>
<h4>Paramecia</h4>
<h5>Bai Bai no Mi — multiplication</h5>
<p><em>Tier 3 · golden box · 2 abilities</em></p>
<p>The smallest kit in the addon, and deliberately so. What sets its tier is not damage: it can make a
<strong>permanent copy of an item</strong>, which is worth more to a world than any number in this mod. Devil
Fruits and containers holding other items are refused in code. The other ability puts three copies of
the user on the field.</p>
<p>Both cooldowns are in the config file — this is the fruit a server owner is most likely to have an
opinion about.</p>
<h5>Ichi Ichi no Mi — swapping</h5>
<p><em>Tier 2 · iron box · 5 abilities</em></p>
<p>Three techniques and a passive, <strong>no damage anywhere</strong>, and one idea under all of them: two places
trade what is standing in them. Swap with any body still in sight, swap everything in a column twenty
blocks across at once — the user included, with no say in where they land — or swap two other things
and never move at all.</p>
<p>It is the addon's most lethal fruit without dealing a point of damage, and that is the intent: where
somebody ends up is the weapon.</p>
<h5>Chiku Chiku no Mi — accumulation</h5>
<p><em>Tier 1 · wooden box · 3 abilities</em></p>
<p>A battery. It stores the force of every blow the user takes and gives the whole of it back at once —
either at one target or at everything within six blocks. The shape comes from the base mod's own
Karma, and the divergence is the point: this one only charges on a blow that actually lands.</p>
<h5>Tsuri Tsuri no Mi — fishing</h5>
<p><em>Tier 1 · wooden box · 4 abilities</em></p>
<p><strong>The addon's first fruit that pulls.</strong> Everything that displaced anything before this pushed. All
four abilities are one line read differently: take a body and bring it here, take a wall and bring
the user to it, or bring back every dropped item and scrap of experience within twenty-six blocks.</p>
<h4>Zoan</h4>
<h5>Fukuro Fukuro no Mi, Model: Owl</h5>
<p><em>Tier 2 · iron box · 7 abilities</em></p>
<p><strong>The addon's first fruit that flies.</strong> Two forms that genuinely disagree: the owl is fast in the
air, hopeless on foot and weightless in a fall; the hybrid hits twice as hard, flies slower and lands
like a person. Silent flight, night vision, a grab that carries its target off, a wing beat that
clears a room, and a thrown flight feather.</p>
<h5>Nezu Nezu no Mi, Model: Rat</h5>
<p><em>Tier 1 · wooden box · 5 abilities</em></p>
<p>The base mod has no small mammal at all — its smallest Zoan is the axolotl. The ferret beats this
fruit on nearly every attribute and the Mogu Mogu keeps digging, so what is left for the rat is the
thing neither of them has: <strong>a bite that spreads</strong>. Nothing else in the base mod or this addon carries
an affliction from one body to another on its own.</p>
<h5>Kujira Kujira no Mi, Model: Whale</h5>
<p><em>Tier 1 · wooden box · 4 abilities</em></p>
<p><strong>The addon's first tank</strong>, and the first Zoan here whose two forms are a real trade-off rather than a
big one and a small one. The Walk Point stops playing and starts absorbing — the heaviest defence in
the addon, on a body whose land speed is cut by 90% — while the Heavy Point keeps ordinary mobility
and reach. One charge, which reads the form it is used in.</p>
<hr>
<h3>Changes to existing fruits</h3>
<ul>
<li><strong>Death Sleep</strong>, a recovery hold for the ferret: it drops limp and does not get up. Nothing stops
attacking it — it simply takes less, and mends fast while it lies there.</li>
<li><strong>The Nezu Nezu no Mi moved to tier 1</strong> during development, which took the iron box back off its
chance ceiling. The Yuge Yuge no Mi has since put it back.</li>
<li><strong>A new fruit sprite for the Fukuro Fukuro no Mi.</strong></li>
<li><strong>Status icons for the five effects that had none</strong> — they were drawing the missing-texture square
in the HUD.</li>
</ul>
<hr>
<h3>Fixes</h3>
<ul>
<li><strong>Weasel Bound and Tail Sweep damaged their own caster.</strong> Both used a sphere that does not exclude
the user.</li>
<li><strong>Habataki's animation never stopped.</strong> The two-argument animation call runs until something calls
stop, and a one-shot technique has nothing to call it from — so the wing-beat pose stayed on
forever.</li>
<li><strong>The paint blob never despawned when it hit a block</strong>, and went on flying.</li>
<li><strong>The owl's Assault Point drew armour on arms that are wings.</strong></li>
<li><strong><code>canMount()</code> was read backwards on the ferret and the crocodile.</strong> It means &quot;may climb onto a
vehicle&quot;, not &quot;may be ridden&quot; — the two forms could not sit in a boat or on a horse for no reason.</li>
</ul>
<hr>
<h3>Under the hood</h3>
<p>Most of the release's non-fruit work was moving this addon onto AkumaLib rather than keeping its own
copies: eleven form gates, ten morph stat blocks, five effects, the targeting helpers and the
amplified-presentation plumbing all now come from the library. None of it is visible in game; all of
it is why 2.1.0 of the library is required.</p>
<hr>
<h3>How they fit into Mine Mine no Mi</h3>
<p>Unchanged from 1.0.0, and worth repeating:</p>
<ul>
<li><strong>They drop from its own Devil Fruit boxes</strong> — wooden, iron and golden — so finding one is as rare
as finding any other fruit of its tier.</li>
<li><strong>They appear in its Devil Fruits creative tab</strong>, rather than in a tab of their own.</li>
<li><strong>They are calibrated against its kits</strong>, not above them.</li>
<li>The encyclopaedia, fruit shifting and &quot;eat a fruit you already have&quot; all pick them up unchanged.</li>
</ul>
<hr>
<h3>Known limitations</h3>
<ul>
<li><strong>A fruit from this addon does not drop from the base mod's 5% tier cascade.</strong> That nested roll goes
through a code path that skips loot modifiers by design, so only the direct box rolls can yield one.</li>
<li><strong>The iron box is at its ceiling.</strong> With six tier 2 fruits, one roll cannot express the intended
chance, so each of them shows up about 7% less often than its share. The wooden box is 20% under for
the same reason. Both are deliberate: one chest yielding one fruit is worth more than the exact
number.</li>
</ul>
</div>

## 1.0.0 { #v1-0-0 }

<small>Released 2026-09-07 · [Download](https://www.curseforge.com/minecraft/mc-mods/inofruits/files/8831805)</small>

<div class="changelog-body" markdown="0">
<p>The first release. <strong>Six Devil Fruits, 32 abilities</strong>, none of them in the base mod.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi</strong> 0.11.5 and <strong>AkumaLib 2.0.0</strong>.</p>
<hr>
<h3>The fruits</h3>
<h4>Shio Shio no Mi — salt</h4>
<p><em>Logia · golden box · 7 abilities</em></p>
<p>A control Logia built on purification rather than dehydration. It denies more than it damages: a
salted body stops regenerating and takes half of any other healing, a ring of salt sears the dead and
strips weak blessings, and the user can come apart into a current of salt and pour through the air.</p>
<h4>Hone Hone no Mi — bone</h4>
<p><em>Paramecia · iron box · 6 abilities</em></p>
<p>Wear your own skeleton on the outside — and while it holds, every other technique in the kit hits
harder. Throw a bone that curves back and strikes twice, grow a blade out of your arm, spray
splinters, knit yourself back together.</p>
<h4>Iro Iro no Mi — paint</h4>
<p><em>Paramecia · wooden box · 5 abilities</em></p>
<p>Paid for in information and position, not damage. Sixteen colours, and the colour is a real choice:
war paint gives a different bonus for each. Blind with a thrown blob, mark a target through walls, or
take on the colours behind you — which holds only while you stand perfectly still.</p>
<h4>Kobo Kobo no Mi — spill</h4>
<p><em>Paramecia · wooden box · 4 abilities</em></p>
<p>Takes things away from people rather than taking them apart. Force a target to drop what it holds,
empty every container nearby onto the floor at once, or leave everything around you starving.</p>
<h4>Itachi Itachi no Mi, Model: Ferret</h4>
<p><em>Zoan · iron box · 6 abilities</em></p>
<p>Mobility, not muscle. Three times a player's speed, a hitbox short enough to get where nobody else
fits, and almost no armour to show for it. Two forms, a bounding leap, claws that leave a bleed, and a
musk that leaves everything nearby reeling while the user walks away.</p>
<h4>Wani Wani no Mi, Model: Crocodile</h4>
<p><em>Zoan · iron box · 4 abilities</em></p>
<p>The ferret read backwards: an ambush predator. Slow and armoured on land, twice as fast in the water
and able to breathe there. Its death roll takes hold in the jaws and rolls — beast form only, and
deadlier in water — and a tail sweep throws everything around it clear.</p>
<hr>
<h3>How they fit into Mine Mine no Mi</h3>
<p>Nothing here replaces or rebalances the base mod.</p>
<ul>
<li><strong>They drop from its own Devil Fruit boxes</strong> — wooden, iron and golden — so finding one is as rare
as finding any other fruit of its tier.</li>
<li><strong>They appear in its Devil Fruits creative tab</strong>, rather than in a tab of their own.</li>
<li><strong>They are calibrated against its kits</strong>, not above them. The base mod's own numbers are the
ceiling: a new fruit sits beside the Magu Magu and the Gomu Gomu in the same loot pool, so it has no
business outclassing them.</li>
<li>The encyclopaedia, fruit shifting and &quot;eat a fruit you already have&quot; all pick them up unchanged.</li>
</ul>
<hr>
<h3>Known limitations</h3>
<ul>
<li><strong>A fruit from this addon does not drop from the base mod's 5% tier cascade.</strong> That nested roll goes
through a code path that skips loot modifiers by design, so only the direct box rolls can yield one.</li>
<li>The crocodile's kit is the newest and the shortest; more abilities for it are planned.</li>
</ul>
</div>

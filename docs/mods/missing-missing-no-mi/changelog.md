# Changelog

Every Missing Missing no Mi release for Minecraft 1.20.1, newest first, as published on [CurseForge](https://www.curseforge.com/minecraft/mc-mods/missing-missing-no-mi/files/all).

## 4.1.0 { #v4-1-0 }

<small>Released 2026-10-19 · [Download](https://www.curseforge.com/minecraft/mc-mods/missing-missing-no-mi/files/9256142)</small>

<div class="changelog-body" markdown="0">
<p><strong>NPCs fight better with this addon's fruits.</strong> The Uta Uta no Mi and the Hobi Hobi no Mi now have their NPC version, so every fruit of the addon can be drawn by Mine Mine no Mi's captains, notorious NPCs and troops. NPCs use more techniques, Zoan NPCs switch form for their attacks, and each flying fruit has its own time in the air. Creatures now go for the Shima Shima's island face instead of following its user's spirit.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi 0.11.6</strong> and <strong>AkumaLib 5.0.0</strong> or newer. Client and server.</p>
<p>⚠️ <strong>Servers: set <code>allow-flight=true</code></strong> in <code>server.properties</code>, as before. Several fruits fly, and without it the server kicks their users.</p>
<hr />
<h2>NPCs</h2>
<ul>
<li><strong>Uta Uta no Mi.</strong> An NPC singer takes the players who hear it into its Uta World stage, as a player singer does. The NPC sleeps where it sang, guarded by its puppets, and a double of it fights on the stage with Note Soldiers, Staff and Knight Form. The dream lasts as long as its voice. Beat the double and the NPC loses 60 % of its health. Players always come back to their body: when the double is beaten, when someone strikes the sleeping NPC, when it dies or leaves, or when its voice is spent.</li>
<li><strong>Hobi Hobi no Mi.</strong> An NPC with it is a child, smaller and weaker. Its touch makes a player or a creature a toy, and its Little Black Bears turn nearby animals into bears. A toy made by an NPC is free after 2 minutes at most, or as soon as the NPC dies, is knocked out, gets wet, leaves or loses the fruit.</li>
<li><strong>More techniques for NPCs.</strong></li>
<li><strong>Biscuit Hei</strong> (Bisu): 3 biscuit soldiers fight for the NPC and crumble when it dies.</li>
<li><strong>Pink Hornets</strong> (Suzumebachi): 4 hornets go for its target and leave when it dies.</li>
<li><strong>Hana Jet</strong> (Atsu): a steam jet at its target, and its head butt hits harder in the jet.</li>
<li><strong>Gauntlet Grab</strong> (Kote): rips a block from the ground and throws it. With NPC block breaking off, the ground stays whole and a crumbling copy flies.</li>
<li><strong>Numa Sensui</strong> (Numa), <strong>Thread Pull</strong> (Rosamygale) and <strong>Nui Tobi</strong> (Nui): to reach a target more than 6 blocks away.</li>
<li><strong>Paper Swarm</strong> and <strong>Paper Flight</strong> (Pasa): the NPC scatters into sheets for 30 s and casts its paper techniques from the air.</li>
<li><strong>Float</strong> and <strong>Vise</strong> (Ton): the NPC floats over its target and drops a Vise on it.</li>
<li><strong>Zoan NPCs switch form for their attacks.</strong> A Zoan NPC no longer stays in one form up close. After 5 s in a form it takes the other one when a technique of that form is ready, then comes back. Wolf, Saber Tiger, Tanuki, Triceratops, Kabutomushi, Eagle, Falcon and Pachycephalosaurus. So you now see their Shippu, Pounce, Scurry, Horn Charge, Beetle Ram, Carry Off, Tsukami Otoshi and Skull Smash.</li>
<li><strong>Each flight its own time in the air.</strong> The flying fruits (Falcon, Eagle, Albatross, Pegasus, Vampire, Kabutomushi, Suzumebachi and the Fuwa Fuwa) fly about 12 s, then rest 10 s on the ground. The others (Triceratops, Guru, Buku, Mori, Pasa and Ton) only hop up 3 s for an attack from the air, then fight 20 s on the ground. A Triceratops NPC no longer stays in the air far too long.</li>
<li><strong>Ato, Mane and Gasha NPCs use their kit better.</strong> An Ato NPC lays its Mosaic Art under its target. A Mane NPC touches faces even in a busy fight, so it really copies them. A Gasha NPC takes its Blindado armour first and calls its mech only while the armour cools down.</li>
</ul>
<h2>For addon makers</h2>
<ul>
<li>Another addon can now make any creature fight as one of this addon's Zoans in full form, with the real techniques. See the page <a href="../developers/">for addon developers</a>.</li>
</ul>
<h2>Fixes</h2>
<ul>
<li><strong>Shima Shima no Mi: creatures followed the invisible spirit.</strong> After a Merge, the creatures that were after you went on chasing your spirit. Now they go for the island's face, and the hostile monsters within 32 blocks that see the face come to it too. Their blows on the face pass half on to you, as before. With the face broken, they lose interest. Shima NPCs work the same way.</li>
<li><strong>Uta Uta no Mi: a player could stay stuck on the stage.</strong> A player who logged in at the very moment a dream took them was left on the stage with no dream.</li>
</ul>
</div>

## 4.0.0 (beta) { #v4-0-0 }

<small>Released 2026-10-18 · Beta · [Download](https://www.curseforge.com/minecraft/mc-mods/missing-missing-no-mi/files/9247445)</small>

<div class="changelog-body" markdown="0">
<p><strong>Wave 8: the Blackbeard Pirates, and two Marines.</strong> Nine new Devil Fruits: Shiku Shiku, Wapu Wapu, Riki Riki, Gabu Gabu, Muchi Muchi, Shima Shima, Gunyo Gunyo, Inu Inu no Mi, Model: Kyubi no Kitsune and Uma Uma no Mi, Model: Pegasus. Mine Mine no Mi's captains, notorious NPCs and troops can now eat this addon's fruits and fight with them, the flying Zoans in the air. Many older fruits get their own particles and redrawn icons, and bonuses now show as stats instead of potion effects.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi 0.11.6</strong> and <strong>AkumaLib 5.0.0</strong> or newer. Client and server.</p>
<p>⚠️ <strong>AkumaLib 5.0.0 is now the minimum.</strong> Update it before this version.</p>
<p>⚠️ <strong>Servers: set <code>allow-flight=true</code></strong> in <code>server.properties</code>, as before. Several fruits fly (now the Pegasus too), and without it the server kicks their users.</p>
<hr />
<h2>Paramecia</h2>
<h3>Shiku Shiku no Mi</h3>
<p><em>Iron box · 5 abilities</em></p>
<p>Diseases that pass from the sick to everyone near them, but never back to you.</p>
<ul>
<li><strong>Fever</strong>: the enemy you look at moves slower and every blow it deals, techniques too, is 30 % weaker.</li>
<li><strong>Wasting</strong>: the sick one loses 1 health every 2 s and nothing heals it. A death by Wasting is yours, even when the disease passed on from another body: the loot, the bounty and the kill count go to you.</li>
<li><strong>Coughing Fit</strong>: now and then one of the sick one's ready abilities fails and has to wait 5 s.</li>
<li><strong>Feminization Disease</strong>: lasts 2 minutes and passes the furthest. A player is drawn with the other skin build, and anyone who catches it is dazed for 3 s.</li>
<li><strong>Epidemic</strong>: a cloud of the last disease you gave, laid where you look. Everyone in it catches the disease, but never you. It only reaches those in sight of its heart.</li>
<li><strong>Contagion</strong>: a sick body passes each disease to everyone close to it, friend or foe. The four diseases hold one another back for 6 s after a cast.</li>
<li><strong>Antibodies</strong>: a strong Haki breaks the diseases and cures the sick around. Each cured body is then immune for 30 s to the diseases it had, not to the others.</li>
</ul>
<h3>Wapu Wapu no Mi</h3>
<p><em>Iron box · 8 abilities</em></p>
<p>Warps for you, your allies, your foes and your shots.</p>
<ul>
<li><strong>Warp</strong>: you are in an instant where you look, up to 40 blocks, on the ground your sight meets or in the air at its end. Never through a wall, never into water or lava. A warp does not save you from a fall.</li>
<li><strong>Warp Other</strong>: touch the enemy in front of you and it is warped 24 blocks where you look. Bosses are too strong for it, and it never drops a body over the void.</li>
<li><strong>Group Warp</strong>: you warp with your own creatures around you. A player comes along only if they crouch.</li>
<li><strong>Catch</strong>: the ally you look at, up to 64 blocks, is warped to your side, and its fall is forgotten. A player must crouch to be caught.</li>
<li><strong>Warp Shot</strong>: for 10 s every projectile you fire comes out behind the enemy you look at, flying at its back.</li>
<li><strong>Reflex Warp</strong>: for 5 s you are on guard. The first blow or shot that hurts misses you and you come out behind the one who dealt it.</li>
<li><strong>Behind the Back</strong>: you warp behind the enemy you look at, up to 24 blocks, facing its back. Your first blow on it within 2 s deals 1.5 times the damage.</li>
<li><strong>Scatter</strong>: every enemy and flying projectile within 6 blocks is warped 4 to 8 blocks away, each its own way. Your pets and crouching allies stay.</li>
</ul>
<h3>Riki Riki no Mi</h3>
<p><em>Iron box · 9 abilities</em></p>
<p>An abnormal strength: you tear a mountain out of the ground and throw it. The ground you tear out always closes again.</p>
<ul>
<li><strong>Strength</strong> (passive): +4 punch damage, every blow throws further, and your bare hands break blocks twice as fast.</li>
<li><strong>Mountain Throw</strong>: a mass of ground is torn out in front of you and carried over your head. Use it again to throw it where you look. It bursts for 30 on what it hits. Natural ground only.</li>
<li><strong>Lift</strong>: the enemy in front of you is held over your head. Use it again to throw it, and it takes 12 when it slams into something. Shorter on players and bosses.</li>
<li><strong>Ground Slam</strong>: both fists on the ground. The enemies around take 14 and are thrown up and away.</li>
<li><strong>Charged Punch</strong>: drawn back up to 3 s, let go by a second press. From 8 to 40 damage, harder and further the longer it is drawn.</li>
<li><strong>Leap</strong>: hold the key up to 4 s and you crouch to gather strength. A tap is a short leap, a full charge goes about 60 blocks high. You take no fall damage, and where you land a shock deals 4 to 24 to the enemies around, with an explosion, more from higher. Cooldown 8 to 20 s.</li>
<li><strong>Pillar Sweep</strong>: tears out the tree trunk you look at, or a pillar of ground, and holds it as a club. Each further press sweeps a half circle in front for 14. 3 sweeps or 10 s, then it crumbles.</li>
<li><strong>Rock Volley</strong>: tears up the ground in front of you and hurls it as 7 chunks in a fan, 5 each.</li>
<li><strong>Clap</strong>: a shock in front of you. 6 damage, the enemies are thrown back and stunned 1.5 s.</li>
<li>Leap and Ground Slam work from the ground only. Mountain Throw, Lift and the club take your hands, so only one at a time.</li>
</ul>
<h3>Gabu Gabu no Mi</h3>
<p><em>Wooden box · 6 abilities</em></p>
<p>Your body makes the liquor, and your liquor makes everyone else drunk.</p>
<ul>
<li><strong>Suiken</strong> (passive): every bare-hand blow that lands makes the enemy a little drunk.</li>
<li><strong>Shugo Roppu</strong>: after a great gulp, a stream of burning liquor 8 blocks ahead for 2 s, 28 damage in all. It stops at walls.</li>
<li><strong>Sake Shibuki</strong>: liquor spat in a cone in front of you. No damage, but the enemies get very drunk.</li>
<li><strong>Shuki</strong>: a cloud of fumes where you look, up to 16 blocks. Enemies in it get more drunk every second they stay.</li>
<li><strong>Sakedeppo</strong>: a jet of liquor at the enemy you look at, up to 24 blocks. 6 damage, it pushes it back and makes it very drunk.</li>
<li><strong>Tokkuri</strong>: fills up to 4 empty glass bottles of your bag with liquor.</li>
<li><strong>Drunkenness</strong>: a drunk body sways and its walk drifts. Very drunk, one blow in four misses and one shot in four goes astray. Too drunk, it falls asleep for 4 s, until a blow wakes it. When the drunkenness wears off, a hangover makes it weaker and slower for a while. A Gabu user is never drunk.</li>
<li><strong>Liquor Bottle</strong>: anyone can use it. Thrown, it shatters and makes everyone around drunk, but the thrower's allies. Drunk while crouching, it heals 4.</li>
</ul>
<h3>Muchi Muchi no Mi</h3>
<p><em>Iron box · 9 abilities</em></p>
<p>A whip, and whatever it lashes obeys. Every order is one stroke that reaches 12 blocks and needs the whip in hand.</p>
<ul>
<li><strong>Whip</strong>: takes the whip out into your empty hand, with a long reach. Use it again to put it away. It vanishes if it leaves your hands.</li>
<li><strong>Lash</strong>: a player lashed obeys a short order: stop, step back or drop what they hold.</li>
<li><strong>Obey</strong>: the creature you lash fights for you for 30 s. Three at most, never a boss.</li>
<li><strong>Move!</strong>: the ground you lash tears itself out, flies at the nearest enemy and bursts for 18. Never under someone you may not fight. The hole closes after a while.</li>
<li><strong>Close in!</strong>: the ground closes round the enemy you lash, a cage that holds it for 4 s, 2 s on players and bosses.</li>
<li><strong>Back!</strong>: the projectile you lash turns back on the one who sent it.</li>
<li><strong>Stand!</strong>: the ground you lash rises as a wall that stops bodies and shots. Use it again to bring it down.</li>
<li><strong>Halt!</strong>: the one you lash cannot move, 3 s for a player and 5 s for a creature. It can still fight back.</li>
<li><strong>Kneel!</strong>: the one you lash cannot jump nor sprint and walks slower, 6 s for a player and 10 s for a creature. Halt! and Kneel! hold each other back for 4 s.</li>
</ul>
<h3>Shima Shima no Mi</h3>
<p><em>Golden box · 8 abilities</em></p>
<p>You merge with the island and move it as your own body. The more solid ground around you, the bigger the island, from x1 to x6, and everything grows with it: size, reach, damage and cooldowns.</p>
<ul>
<li><strong>Merge</strong>: you sink into the ground in 2 s (a blow stops it) and become the spirit of the island. Unseen and out of reach, you fly through everything around the place you sank. Use it again to come out where you aim. Only your arms and face can be hurt, and half of each blow on them reaches you. While merged, only the island's techniques answer you. The other ones are greyed on the bar while you are not merged.</li>
<li><strong>Island Arm</strong>: a giant arm of ground rises beside where you aim and strikes down on it, 26 damage at x1 up to 156 at x6.</li>
<li><strong>Island Hand</strong>: a giant hand seizes the one you aim at and holds it up. Use it again to throw it where you look. Half as long on players and bosses.</li>
<li><strong>Arm Swarm</strong>: 12 small arms rise in a field where you aim and strike every creature there once.</li>
<li><strong>Island Face</strong>: a huge face of rock rises where you sank, and it is your own head, at giant size, made of ground. It speaks when you talk in the chat, and used again it rises where you aim.</li>
<li><strong>Face Bite</strong>: the face turns to the nearest enemy, opens its jaw and bites everything in front of its mouth.</li>
<li><strong>Rising Ground</strong>: spikes in a line that throw enemies up, or a wall that stops bodies and shots (the ability mode key changes it).</li>
<li><strong>Itch</strong> (passive): merged, you feel every creature standing on your land, and those around your face.</li>
<li>No block of the world is touched: the arms, the face and the spikes take the colour of the ground they rise from.</li>
</ul>
<h3>Gunyo Gunyo no Mi</h3>
<p><em>Iron box · 9 abilities</em></p>
<p>Clay out of your body, soft or hardened. Your golems always form again, and the clay never stays in the world.</p>
<ul>
<li><strong>Golems</strong>: three clay golems rise and fight for you, 80 health and 10 a blow, slow and heavy. A broken golem melts and forms again after 10 s, 20 s if the blow had Haki or it stood in water. Use it again to melt them all.</li>
<li><strong>Giant Golem</strong>: your golems merge into one giant twice their size, 240 health and 22 a blow. Use it again to split it. Broken, it melts and the three form again after 20 s.</li>
<li><strong>Nyudo Gunyo</strong>: a bed of soft clay where you aim. Nobody takes fall damage on it, and enemies sink in, very slow and unable to jump. Use it again to take it away.</li>
<li><strong>Gunyo no Su</strong>: a standing clay web where you aim, bigger the longer you hold the key, up to 3 s. It stops every projectile and holds the enemies that touch it for 3 s.</li>
<li><strong>Clay Weapon</strong>: a hardened spiked morning star in your hand, 9 damage a blow.</li>
<li><strong>Clay Wall</strong>: five panels of clay across your sight, soft then hard. Bodies and shots stop on them.</li>
<li><strong>Bury</strong>: soft clay climbs the enemy you look at and holds it for 3 s. It cannot move nor hit.</li>
<li><strong>Clay Armour</strong>: a heavy armour of hardened clay plates and a closed helm, worn until you take it off. +12 armour, +4 armour toughness, +4 punch, resistance to knockback, 15 % slower. Cooldown 40 s once it is off.</li>
<li><strong>Clay Bridge</strong>: a path of mud bricks 3 wide from your feet to where you aim, up to 16 blocks, flat or as stairs. It only fills empty space and goes after 20 s.</li>
</ul>
<h2>Zoan</h2>
<h3>Inu Inu no Mi, Model: Kyubi no Kitsune</h3>
<p><em>Golden box · 9 abilities</em></p>
<p>The nine-tailed fox spirit, who takes the look of whoever she touched. Every technique needs one of her two forms, but Face Touch and Disguise.</p>
<ul>
<li><strong>Kyubi Heavy Point</strong>: a fox-woman with nine tails, quick and strong.</li>
<li><strong>Kyubi Walk Point</strong>: a great nine-tailed vixen, fast with long jumps. She sits while crouching, her tails curled round her.</li>
<li><strong>Face Touch</strong>: you touch whoever you look at and remember their look. The Mane Mane no Mi's own, shared.</li>
<li><strong>Disguise</strong>: you take a look you remember, until you use it again or take a blow. A look taken ends the fox forms, and a form taken ends the look.</li>
<li><strong>Tail Sweep</strong>: the nine tails sweep all round you, 20 as the hybrid and 24 as the vixen. Enemies are thrown away.</li>
<li><strong>Nine Tails</strong>: the tails strike in front of you one after the other, nine times.</li>
<li><strong>Fox Fire</strong>: three pale flames follow the enemy you look at and set it on fire, 9 each. With no one in sight they go for the nearest monster first, never a tamed animal.</li>
<li><strong>Fox Fire Ring</strong>: 5 pale flames turn round you for 10 s. A flame that touches an enemy burns it and is spent. Use it again to throw the flames left at the enemy you look at.</li>
<li><strong>Vanish</strong>: you are unseen for 4 s and leave a false image where you stood, in your form, your armour and your held item. Monsters go for the image, which goes at the first blow. Striking a blow shows you again.</li>
</ul>
<h3>Uma Uma no Mi, Model: Pegasus</h3>
<p><em>Golden box · 11 abilities</em></p>
<p>The war mount of the addon. It flies in both forms and carries two players on its back, who keep fighting.</p>
<ul>
<li><strong>Pegasus Assault Point</strong>: the winged horse-man. It flies and fights with hooves and wings.</li>
<li><strong>Pegasus Fly Point</strong>: the whole winged war horse. It stands on the ground until a double jump takes it up.</li>
<li><strong>Pegasus Flight</strong>: flies in both forms, never slowed nor tired by its riders.</li>
<li><strong>Pegasus Rideable</strong>: two other players ride on its back. Only those it may not fight get a seat, their falls are spared, and their blows never reach it.</li>
<li><strong>Charge</strong>: a gallop on the ground or in the air, 22 to every enemy in its path, thrown aside.</li>
<li><strong>Hoof Kick</strong>: it bucks and kicks behind it, 24 and a hard throw back.</li>
<li><strong>Wing Gust</strong>: the wings beat forward, 8 and a strong push to every enemy in front.</li>
<li><strong>Dive</strong>: a leap if on the ground, then a dive on the enemy you look at. 34 to everyone around the landing.</li>
<li><strong>Rearing</strong>: it rears and crashes its forehooves, 18 to every enemy in front, thrown up.</li>
<li><strong>Tailwind</strong>: for 10 s, +40 % movement speed to you, your riders, your pets and the players around who crouch.</li>
<li><strong>Feather Volley</strong>: 9 white feathers in a fan where you look, 4 each.</li>
<li>Its blows never reach its own riders.</li>
</ul>
<hr />
<h2>Changes</h2>
<ul>
<li><strong>NPCs use this addon's fruits.</strong> Mine Mine no Mi's captains, notorious NPCs and troops can now draw the fruits of every wave, from Ami Ami to Shiku Shiku, and fight with most of their techniques. The weakest troops get the wooden box fruits. Only the Uta Uta no Mi and the Hobi Hobi no Mi stay out.</li>
<li><strong>Zoans</strong> take their fighting form up close and the other form further off.</li>
<li><strong>Flying fruits fly on an NPC</strong>: the Falcon, the Eagle, the Albatross, the Kabutomushi, the Suzumebachi, the Triceratops, the Vampire and the Pegasus, the Guru propeller, the Mori flower, the Fuwa float and the Buku book. They circle over you, dive on you and come down to rest.</li>
<li>Giants take their big form only where they fit. A Tama NPC must be killed as an egg, a chick and a rooster, an Orochi NPC eight times.</li>
<li>Each NPC aims at its own target, its summons fight for it, and what it leaves behind (servants, caught shots, a worn look) is let go when it dies or leaves.</li>
<li>An NPC's gold, metal and turret bullets never run out, and nothing of it can be farmed: a Fuku NPC keeps its own armour, an NPC's turret drops nothing.</li>
<li><strong>NPCs with this addon's fruits break no blocks</strong>, as for the base mod's fruits, unless the server sets <code>npcAbilityGriefing</code> to true in <code>akumalib-server.toml</code> (off by default): no ice melted by the Atsu Atsu no Mi, no blocks carried off by Item Kaiten, Gauntlet Grab, Desmontar or Cubreak, no ground changed by Back to Lava or Entomb. Players are not affected.</li>
<li><strong>Bonuses are stats, not potion effects.</strong> They now show in the tooltip, with the same numbers:</li>
<li><strong>Draining Bite</strong> (Vampire): each bite gives +10 % attack damage and +5 % movement speed, 5 bites at most, for 60 s. Give Back takes them all off. The Stolen Youth effect is gone.</li>
<li><strong>Sefer Briah</strong> (Pasa) and <strong>Tsukuroi</strong> (Nui): their own heal over 5 s instead of Regeneration.</li>
<li><strong>Grande</strong> (Kote): the dome cuts the damage taken inside by 20 % for you and those who are not your enemies.</li>
<li><strong>Coiled Guard</strong> (Orochi) and <strong>Monk's Guard</strong> (Onyudo): the stance's slowness is a speed stat while it holds.</li>
<li>Kibi Dango, Kibi Dan-boshi and Full Strength still give effects, and now write them in their tooltips.</li>
<li><strong>Their own particles.</strong> Ink for the Fude Fude, molten metal for the Gutsu Gutsu, gold flakes for the Goru Goru, steam for the Atsu Atsu, violet spores for the Noko Noko, leaves for the Mosa Mosa, venom for the Rosamygale and the Suzumebachi, mirror shards for the Mira Mira, a dial of time for the Toki Toki, pink notes for the Uta Uta, cyan lightning for the Kote Kote, paint for the Ato Ato, rot for the Juku Juku and blood for the Vampire. Every new fruit of this wave has its own too.</li>
<li><strong>Redrawn icons</strong>, in the style of Mine Mine no Mi, one colour for each fruit: Gocha, Buku, Vampire, Mochi, Bisu, Hoya, Memo, Uta, Eagle, Pasa, Nuke, Maki, Kote, Mira, Moa, Koro, Gutsu, Kuri, Fude, Fuku, Onyudo, Rosamygale, Spinosaurus, Toki, Albatross, Mosa, Noko, Tama and Orochi, with the status effect icons that go with them. Venom Bite and Cling are redrawn to read on the bar.</li>
<li><strong>Mochi Mochi no Mi.</strong></li>
<li><strong>Zan Giri Mochi</strong> is now a sweep: one second of twisting, then a giant mochi arm sweeps round you, 8 blocks out, and throws every enemy it crosses.</li>
<li><strong>Yaki Mochi</strong> is readied for 5 s, and each swing throws a burning fist, 3 at most.</li>
<li><strong>Naguri Mochi</strong> and <strong>Mochi Ginchaku</strong> punch in a fast rush pose.</li>
<li>The rings of <strong>Muso Donuts</strong> are lumpy and hand-shaped, and float over your head at different heights.</li>
<li><strong>Cooldowns.</strong> Chikara Mochi 25 s (was 12 s), Peck 5 s (was 3 s).</li>
<li><strong>Riders.</strong> The Albatross, the Falcon and the Kabutomushi take the Pegasus's rules: no seat for an enemy, a rider's fall is spared, riders' blows never hit the mount, no choking in a wall, and a rider who leaves in flight comes back on the ground. Beak Strike no longer hits its own rider.</li>
<li><strong>Charges in their path.</strong> Double Roll Pretzel (Bisu) and Spiked Charge (Ame) strike only what they run through in front, once a dash.</li>
<li><strong>Biscuit Hei</strong>: a lost soldier comes back 10 s after its loss, beside the others.</li>
<li><strong>Totem Cube</strong> can be used right after another technique.</li>
<li><strong>A failed press costs a short wait</strong> on many techniques, instead of nothing: Torreta, Soldado, Entomb, Order, Levitation, Jusshigan, Cling, Marianette, Oshizumaria, Cocoon, Hard Gum, Ikidomaria, Web Trap, Magnumceratops, Eightfold Strike, Jaw Grab, Sinkhole, Send Ahead and Postpone.</li>
</ul>
<h2>Fixes</h2>
<ul>
<li><strong>The Vampire was missing from the creative tab.</strong> With another addon that adds items after this one, the Batto Batto no Mi, Model: Vampire was pushed out of the Devil Fruits tab and the search tab. It now stays.</li>
<li><strong>Toboe</strong> kept its night bonus of +3 damage and speed for good after a logout mid-hunt. A player who still has it loses it at login.</li>
<li><strong>Magnumceratops</strong> hurt bodies it could not see from where it landed, under a roof.</li>
<li><strong>Crawling, swimming and sleeping in a form</strong> now use the form's own eyes. The Ame spear no longer suffocates crawling in a one-block gap.</li>
<li><strong>Creative players, players with PvP off and other players' pets</strong> are no longer hit or aimed at by Keep Out, Death Enjambre, Vipera Glaive, Kare-San-Sui, the Atsu heat ball, the Vampire dark shot, the Gutsu molten shot, the Numa mud ball, the Pasa sheet, the Toro blast and iron ball. The Ame syrup spares them too.</li>
<li><strong>Bisu</strong>: a soldier lost far away and found again no longer makes a fourth one.</li>
<li><strong>Piglins and other creatures that hunt by memory</strong> now forget their quarry after Levitation, Order, Toki Ahead and the Uta dream.</li>
<li><strong>Gekitsui</strong> no longer sets a body inside a wall.</li>
<li><strong>Arm the Crew</strong> (Gutsu) arms every creature that is yours: toys, puppets and pets.</li>
<li><strong>Kyukoka</strong> (Falcon) now shows the dive pose.</li>
<li><strong>Cream Body</strong> (Kuri) burns only a bare-handed blow, not a sonic boom or an explosion.</li>
<li><strong>Fire weakness</strong> of the Mori Mori and the Pasa Pasa now counts fire techniques too, not only fire in the world.</li>
<li><strong>The Ami cage and net</strong> let go of a player who died and came back.</li>
<li><strong>A body held under water</strong> by Vise or Paper Wrap can drown again.</li>
<li><strong>Creatures lent</strong> by the Kote Kote's Solmente no longer breed young that stay yours.</li>
<li><strong>Muso Donuts</strong> was missing the second line of its description.</li>
</ul>
</div>

## 3.0.0 (beta) { #v3-0-0 }

<small>Released 2026-10-15 · Beta · [Download](https://www.curseforge.com/minecraft/mc-mods/missing-missing-no-mi/files/9195525)</small>

<div class="changelog-body" markdown="0">
<p><strong>Wave 7: the fruits of Whole Cake Island.</strong> Eleven new Devil Fruits: Mira Mira, Kuri Kuri, Bata Bata, Buku Buku, Bisu Bisu, Hoya Hoya, Tama Tama, Tori Tori Model Albatross, Memo Memo, Gocha Gocha, and Mochi Mochi with its awakening, the first awakening of this addon. Wall abilities now stay up while you hold them, the birds really beat their wings, the Fuwa boat turns where you look, and the Gasha Gasha no Mi builds from real metal.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi 0.11.6</strong> and <strong>AkumaLib 4.7.0</strong> or newer. Client and server.</p>
<p>⚠️ <strong>AkumaLib 4.7.0 is now the minimum.</strong> Update it before this version.</p>
<p>⚠️ <strong>Servers: set <code>allow-flight=true</code></strong> in <code>server.properties</code>, as before. Several fruits fly (now the Albatross and the Flying Book of the Buku Buku no Mi too), and without it the server kicks their users.</p>
<hr />
<h2>Paramecia</h2>
<h3>Mira Mira no Mi</h3>
<p><em>Wooden box · 6 abilities</em></p>
<p>Mirrors that turn shots back, that copy a look, and that open into Mirro-World, a world of endless mirror halls.</p>
<ul>
<li><strong>Reflection</strong>: a mirror raised in front of you for 4 s. Shots from the front go back, blows from the front are stopped.</li>
<li><strong>Mirror</strong>: lays a standing mirror, a door into Mirro-World.</li>
<li><strong>Mirro-World</strong>: your next punch raises a mirror behind the target and pushes it in. A player pushed in finds every door shut for a minute, unless he follows you out or you fall.</li>
<li><strong>Mirror Image</strong>: you take the look of whoever you look at.</li>
<li><strong>Decoys</strong>: the animals around you take the look of whoever you look at.</li>
<li><strong>Ask the Mirrors</strong>: every mirror tells you which players passed in front of it, latest first.</li>
<li><strong>Mirro-World</strong> is a world of its own: curved galleries, a crimson checkered floor, glowing mirrors in gold frames. You can build and break there, and every place mends itself 30 s after it last changed.</li>
<li><strong>Anyone can craft a mirror</strong> (three glass panes between two columns of iron) and lay it. Only the fruit's user opens mirrors, others go in only right behind the user. The mirror is in the Misc tab and is held in 3D.</li>
</ul>
<h3>Kuri Kuri no Mi</h3>
<p><em>Iron box · 7 abilities</em></p>
<p>Cream without end, and its sugar burns. <strong>Cream Burn</strong> bites every second, lasts longer with each touch and washes off in water.</p>
<ul>
<li><strong>Cream Ball</strong>: a ball of cream that hits, burns and slows the legs.</li>
<li><strong>Cream Grab</strong>: a tentacle springs at the enemy you look at, burns it and pulls it to you.</li>
<li><strong>Cream Wave</strong>: a wave that hits everything in its path, pushes it back and burns it.</li>
<li><strong>Cream Flood</strong>: cream on the ground around you, 8 blocks wide. It slows and burns enemies who wade in, never you or your side. A second use takes it back.</li>
<li><strong>Cream Monster</strong>: a puddle of cream spreads under you and follows you. Four tentacles wait in it and spring out at any enemy who comes near, to strike, burn and hold.</li>
<li><strong>Cream Shell</strong>: a full shelter. You take almost no damage but cannot move, strike or use anything else. It has a health of its own.</li>
<li><strong>Cream Body</strong> (passive): you are always covered in cream, and a bare fist that hits you gets burnt. A weapon does not.</li>
</ul>
<h3>Bata Bata no Mi</h3>
<p><em>Wooden box · 6 abilities</em></p>
<p>Butter: soft it holds, melted it makes everyone slide, heated it burns.</p>
<ul>
<li><strong>Butter Lump</strong>: a thrown lump that hits and slows the legs.</li>
<li><strong>Butter Cuffs</strong>: butter wraps the hands of the enemy you look at. It cannot strike or use what it holds.</li>
<li><strong>Butter Wrap</strong>: the same on the whole body. It cannot move or strike.</li>
<li><strong>Slippery Sheet</strong>: melted butter on the ground where you look. Everyone slides on it, friend and foe, but you.</li>
<li><strong>Butter Slide</strong>: a mode. You move faster and leave a slippery trail.</li>
<li><strong>Burning Butter</strong>: heats all your butter at once. Whoever is in your cuffs or wrap, and enemies on your butter, get burnt, then it all melts away.</li>
<li>A target gets free with time (sooner for a player), when someone else hits it, or in fire.</li>
</ul>
<h3>Buku Buku no Mi</h3>
<p><em>Iron box · 7 abilities</em></p>
<p>Books that fly, blind and imprison.</p>
<ul>
<li><strong>Cutting Page</strong>: a torn page thrown edge on. It cuts and makes the target bleed.</li>
<li><strong>Book Barrage</strong>: a volley of eight heavy books in three covers.</li>
<li><strong>Book Wall</strong>: a row of great books standing. Bodies and shots stop on them, fire burns them down.</li>
<li><strong>Swallowing Book</strong>: an open book swallows shots from the front. Use it again to throw them all back.</li>
<li><strong>Flying Book</strong>: a mode. You stand on a book and fly freely, on the stamina gauge.</li>
<li><strong>Hon no Sekai</strong>: a book opens over the enemy you look at for as long as you hold it. A player sees only pages, a creature forgets who it was after. It shuts when you get hit.</li>
<li><strong>Imprison</strong>: a creature under half its health (never a boss) becomes a book in your bag, and comes out whole where you use the book. A player is shut in a book for 4 s, out of the fight.</li>
</ul>
<h3>Bisu Bisu no Mi</h3>
<p><em>Iron box · 8 abilities</em></p>
<p>Biscuit hard as hardtack: soldiers, shields, a wall and an armour that grows arms. Water and rain make it soft, and soft biscuit is eaten.</p>
<ul>
<li><strong>Biscuit Hei</strong>: a mode. Three biscuit soldiers follow you and fight. A broken one forms again after 10 s.</li>
<li><strong>Hard Biscuit</strong>: a pile of shields falls on the enemy you look at. It hits and pins it for a moment.</li>
<li><strong>Biscuit Wall</strong>: five panels of biscuit. Bodies and shots stop on them.</li>
<li><strong>Biscuit Armour</strong>: a large armour four blocks high that takes the blows. Each new use adds a pair of arms and swords (2, 4, 6) and more damage. What it has left shows on screen. Broken, it lets you out unharmed.</li>
<li><strong>Double Roll Pretzel</strong>: in the armour only. A thrust forward with two spinning swords.</li>
<li><strong>Crush Biscuit</strong>: shapes a biscuit sword in your hand for up to 60 s. It crumbles in water or rain.</li>
<li><strong>Crumb Burst</strong>: a fan of hard crumbs at every enemy in front of you.</li>
<li><strong>Biscuit Rations</strong>: four hard biscuits, too hard to eat. Use one on water and it becomes a soaked biscuit you can eat.</li>
<li><strong>Soft biscuit</strong>: in water or rain, soldiers and the armour take twice the damage and the wall lasts half as long. Anyone, an enemy too, eats a soft soldier with a right click.</li>
</ul>
<h3>Hoya Hoya no Mi</h3>
<p><em>Iron box · 8 abilities</em></p>
<p>Rub your belly and a huge genie with a halberd comes out, tied to you by a trail of smoke. It fights by itself, but while it is out you walk slowly, strike nothing and use no item.</p>
<ul>
<li><strong>Genie</strong>: a mode. The genie hunts whoever you hit or who hit you, then the nearest monster, within 24 blocks. It draws creatures onto itself, climbs over walls, and one blow in three is a wide sweep. Use it again to call it back.</li>
<li><strong>Genie Command</strong>: sends the genie after the enemy you look at.</li>
<li><strong>Maji Giren</strong>: the halberd slams on the genie's target and sweeps everyone around it.</li>
<li><strong>Majin Saidan</strong>: a flying slash from the genie through every enemy in its way.</li>
<li><strong>Maji Karu</strong>: the heaviest blow. The target is driven into the ground and held a moment.</li>
<li><strong>Genie Shield</strong>: the genie comes back in front of you and takes blows from the front on its own life.</li>
<li><strong>Smoke</strong>: the genie turns to smoke for 3 s. Nothing touches it.</li>
<li><strong>Great Genie</strong>: the genie grows three times bigger for a while, with a longer reach and harder blows.</li>
<li><strong>The genie's life</strong> is a gauge on your screen. It heals slowly while the genie is in your belly. A heavy blow on you or any hold sends it back.</li>
<li><strong>Your Armament Haki shows on its halberd</strong>, and its blows then reach a Logia.</li>
</ul>
<h3>Memo Memo no Mi</h3>
<p><em>Wooden box · 4 abilities</em></p>
<p>Pulls memories out of a head as a strip of film, cuts frames out and pastes others in. Cut, Paste and Forgotten Skill need shears in your bag.</p>
<ul>
<li><strong>Memories Fil Flashback</strong>: threads go to the enemies in front of you. For 3 s they stand lost in old memories: no step, no blow, no ability. A player sees the world as an old film.</li>
<li><strong>Cut</strong>: the creature you look at forgets its quarrel for 10 s, or until something hits it. The cut frames are kept as a <strong>Memory Reel</strong> that names who it was after.</li>
<li><strong>Paste</strong>: with empty hands, the creature takes you for a friend and fights for you for 30 s. With a Memory Reel in hand, it takes the kept anger and goes after the one named on the reel. Never on a boss.</li>
<li><strong>Forgotten Skill</strong>: the enemy you look at forgets 3 to 6 random abilities of his bar for 15 s.</li>
</ul>
<h3>Gocha Gocha no Mi</h3>
<p><em>Wooden box · 2 abilities</em></p>
<p>Merge with your allies into one giant, bigger and stronger with each member. Alone, the fruit gives nothing.</p>
<ul>
<li><strong>Gattai</strong>: your own creatures within 6 blocks merge at once. Allied players merge by right clicking you while it is open. Four members at most, one for each limb, and each limb takes the look of its member. Use it again to split.</li>
<li><strong>Great Weapon</strong>: the giant sweeps what is in front of it, harder with each merged weapon.</li>
<li><strong>Never by force</strong>: a player merges only by his own click and gets out when he likes, like getting off a mount. Inside, he sees from the giant's eyes, uses his own abilities from there, and nothing reaches him.</li>
<li><strong>The giant's life</strong> is shared. Split, everyone comes out with the same share of health lost. If the giant falls, nobody dies: everyone comes out with one heart and a short stun.</li>
</ul>
<h3>Mochi Mochi no Mi</h3>
<p><em>Golden box · 14 abilities, and 9 awakened</em></p>
<p>Mochi, sticky and stretchy, soft to hold and hardened into fists. Whoever is stuck in mochi cannot step or strike. Water and rain free them, and a stuck player can eat his way out by holding the use key.</p>
<ul>
<li><strong>Mochi Body</strong> (passive): blows without Haki pass through you, as through a Logia. Unlocked once you have the future sight of Observation Haki.</li>
<li><strong>Stretching Arm</strong>: a soft arm shoots at the enemy you look at and holds it.</li>
<li><strong>Mochi Lump</strong>: a thrown lump of soft mochi that sticks the first enemy it meets.</li>
<li><strong>Flowing Body</strong>: you melt and flow a few blocks the way you look, your chest open in a ring of mochi. Nothing reaches you for a moment.</li>
<li><strong>Extra Arms</strong>: for 12 s, two mochi arms out of your back follow each of your blows with two more.</li>
<li><strong>Yanagi Mochi</strong>: many legs of mochi stamp a place in front of you.</li>
<li><strong>Tori Mochi</strong>: a whip seizes the enemy you look at and throws it where you look.</li>
<li><strong>Mochi Tsuki</strong>: your arm twists and drives your weapon in a long stab. Needs a weapon in hand.</li>
<li><strong>Mochi Wall</strong>: five panels of soft mochi. An enemy who touches it is stuck.</li>
<li><strong>Hardened mochi</strong> comes once you have Armament hardening:</li>
<li><strong>Kaku Mochi</strong>: both forearms pressed into square blocks, for harder fists.</li>
<li><strong>Naguri Mochi</strong>: a barrage of square fists.</li>
<li><strong>Yaki Mochi</strong>: one great fist shot at range that sets on fire everything in its way.</li>
<li><strong>Mochi Hadan</strong>: one bullet, and while you hold the use key with an empty hand, your forearm fires as a Gatling gun.</li>
<li><strong>Zan Giri Mochi</strong>: you roll forward as a ring, seize the first enemy met, go up with it and smash it down.</li>
</ul>
<h4>The awakening</h4>
<p>Nine awakened techniques, unlocked once the fruit is awakened. They have their own <strong>Awakening</strong> tab in the abilities screen.</p>
<ul>
<li><strong>Muso Donuts</strong>: four rings of mochi swell in the air around you, each turned its own way. They stand while you hold the ability, up to 25 s. Use it again and they go. The five techniques below come out of the rings.</li>
<li><strong>Chikara Mochi</strong>: a giant arm from a ring punches the enemy you look at and sends it flying.</li>
<li><strong>Mochi Ginchaku</strong>: for 4 s every ring keeps punching the enemy nearest to it.</li>
<li><strong>Kuzu Mochi</strong>: nine arms, one after the other, on the place you look at.</li>
<li><strong>Kashiwa Mochi</strong>: two giant hands clap on the enemy you look at and stick it. Hold the use key and they clap again, four claps in all.</li>
<li><strong>Kuri Mochi</strong>: a ring bristles with spikes and shoots them where you look.</li>
<li><strong>Nagare Mochi</strong>: the ground around the enemy you look at turns to mochi and seizes him. It slows whoever walks in it.</li>
<li><strong>Kagami Mochi</strong>: mochi falls on the enemy you look at and shuts it in a shell.</li>
<li><strong>Amadare Mochi</strong>: arms rise from the ground under every enemy around you and stick them.</li>
<li><strong>The world is never damaged</strong>: the mochi laid on the ground or in the air goes away by itself.</li>
</ul>
<h2>Zoan</h2>
<h3>Tama Tama no Mi</h3>
<p><em>Wooden box · 5 abilities</em></p>
<p>You never choose a form. You are an egg, and a killing blow cracks you open: a yolk comes out, then you are born again stronger, a chick, then a rooster.</p>
<ul>
<li><strong>Three Lives</strong> (passive): each killing blow costs a life. You become a yolk for 5 s, then the next form. As a yolk you cannot move, strike or use abilities, but nothing hurts you. Killed as a rooster, you die for real. Lost lives come back after 10 minutes, and the gauge shows the time left.</li>
<li><strong>The egg</strong> has no technique. Its shell gives armour and cracks as your health goes down.</li>
<li><strong>Peck</strong>: a quick beak blow on the enemy in front. Chick and rooster.</li>
<li><strong>Dash</strong>: run much faster for 5 s. Chick and rooster.</li>
<li><strong>Wing Flurry</strong>: the rooster beats its wings and throws back enemies in front.</li>
<li><strong>Crow</strong>: the rooster shakes every enemy around, slowed and weakened.</li>
</ul>
<h3>Tori Tori no Mi, Model: Albatross</h3>
<p><em>Wooden box · 6 abilities</em></p>
<p>The third bird of the addon. The falcon is fast, the eagle hits hard, the albatross lasts.</p>
<ul>
<li><strong>Albatross Assault Point</strong>: the hybrid. Flies and keeps its hands.</li>
<li><strong>Albatross Fly Point</strong>: the whole bird, the longest wings of the addon.</li>
<li><strong>Albatross Flight</strong>: flies like the other birds. When it flies hurt, its flight gauge lasts three times as long, and it flies 30 % faster over water or in the rain.</li>
<li><strong>Albatross Rideable</strong>: another player can ride on the whole bird's back.</li>
<li><strong>Beak Strike</strong>: throws itself at the one it looks at, from the air or the ground, and strikes with its beak.</li>
<li><strong>Wing Wall</strong>: a held guard with crossed wings. Blows from the front are cut to 30 %, shots from the front are stopped.</li>
</ul>
<hr />
<h2>Changes</h2>
<ul>
<li><strong>Walls stay up while their ability goes on.</strong> Green Wall, Paper Wall, Muralla and the new walls keep their ability on while the wall stands, and a second use brings the wall down. The cooldown starts when the wall goes. Muralla shows how long it lasts.</li>
<li><strong>Gasha Gasha no Mi builds from real metal.</strong> Torreta takes 4 iron ingots and 2 gunpowder, Soldado 6 iron and 2 copper ingots, Cañón Armado 2 iron, Blindado 3 iron, Unión Armado 8 iron and 2 copper. Six metal blocks within three blocks of you (iron or copper blocks, anvils, rails, iron bars, chains, cauldrons, hoppers, lanterns...) give it all for free. Putting things away costs nothing.</li>
<li><strong>Birds beat their wings.</strong> The Falcon, the Eagle and the Albatross take their flight pose only in real flight, never on a jump or a fall. Their wings always beat in flight, harder while climbing, and the hybrids spread their arms.</li>
<li><strong>Vampire forms redrawn.</strong> Both forms of the Batto Batto no Mi, Model: Vampire have a new look, day and night, and both eyes now match. Their wings open in real flight only.</li>
<li><strong>Greyed techniques.</strong> A technique that needs a form, a giant, a genie, an armour or a ring is greyed on the bar until it can be used.</li>
<li><strong>Redrawn icons.</strong> The Ink Sabre, Ink Spear, Ink Dango, Kibi Dango and the three still lifes of the Ato Ato no Mi, in the style of Mine Mine no Mi. The 17 clothes (bandit, fur, padded, revolutionary, samurai and shishi sets) are redrawn bigger, on the same shapes as the base mod's clothes.</li>
</ul>
<h2>Fixes</h2>
<ul>
<li><strong>The Fuwa boat did not turn.</strong> A boat flown by Fusen kept its heading and pulled your view back when you looked around. It now turns towards where its rider looks.</li>
</ul>
</div>

## 2.1.0 { #v2-1-0 }

<small>Released 2026-10-11 · [Download](https://www.curseforge.com/minecraft/mc-mods/missing-missing-no-mi/files/9130599)</small>

<div class="changelog-body" markdown="0">
<p><strong>Powers now meet each other</strong>, and the broken necks of the animal forms are fixed. The fruits of this addon answer to the fruits of Mine Mine no Mi and of the other addons: silence stops the song, water washes paint and ink off, steel takes lightning and rust, wind blows spores away, and a creature held by one power can no longer be taken by another.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi 0.11.6</strong> and <strong>AkumaLib 4.5.0</strong> or newer. Client and server.</p>
<p>⚠️ <strong>Mine Mine no Mi 0.11.6 and AkumaLib 4.5.0 are now the minimum.</strong> Update both before this version.</p>
<p>⚠️ <strong>Servers: set <code>allow-flight=true</code></strong> in <code>server.properties</code>, as before. Several fruits fly, and without it the server kicks their users.</p>
<hr />
<h2>Powers that meet</h2>
<ul>
<li><strong>Silence stops the song.</strong> The Silent of the Nagi Nagi no Mi counters the Uta Uta no Mi. Someone under Silent is not taken into Uta World. Silent near a sleeping ally wakes them up. A singer under Silent cannot be heard.</li>
<li><strong>Water washes paint off.</strong> A target turned into art by the Ato Ato no Mi goes back to normal in water, in the bubbles of the Awa Awa no Mi or when hit by a bottle of water.</li>
<li><strong>Ink runs under bubbles too.</strong> The drawings of the Fude Fude no Mi now also dissolve in the bubbles of the Awa Awa no Mi and under a bottle of water, not only in water.</li>
<li><strong>Gold washes off the same way.</strong> The gold dust and the golden statue of the Goru Goru no Mi are also washed off by the bubbles of the Awa Awa no Mi and by a bottle of water.</li>
<li><strong>Steel and gold.</strong> A Buki Buki no Mi user in a weapon form is made of steel: lightning and the rust of the Sabi Sabi no Mi hurt them 25 % more. A Goru Goru no Mi user in Golden Armour, and a target turned into a golden statue, are made of gold: lightning hurts them 25 % more, and gold does not rust.</li>
<li><strong>Wind blows spores away.</strong> Any air technique used facing a spore cloud of the Noko Noko no Mi clears it.</li>
<li><strong>One master at a time.</strong> A creature held by one power can no longer be taken by another. A toy of the Hobi Hobi no Mi, a puppet of the Uta Uta no Mi, a servant of the Kibi Kibi no Mi and a collared creature each stay with their master.</li>
<li><strong>The same for players.</strong> A player already held by one power (a collar, a toy curse, a dango) can no longer be taken by another of these powers at the same time. The song of the Uta Uta no Mi still takes everyone who hears it, and a body asleep under the song can no longer be collared.</li>
</ul>
<h2>Fixes</h2>
<ul>
<li><strong>The broken necks of the animal forms.</strong> A form's head or neck could stay turned to one side for good. It is straight again, with AkumaLib 4.5.0.</li>
<li><strong>Heads lying on their side.</strong> Whole animal forms no longer hold their head on its side when they look left or right. Seen most on the pachycephalosaurus, also the saber tiger, the spinosaurus, the triceratops, the eagle and the falcon.</li>
<li><strong>Necks bent at a standstill.</strong> Whole animal forms now turn their body with the camera when standing still. Before, only the neck turned and it looked broken.</li>
<li><strong>Solmente could take another player's pet.</strong> Solmente of the Kote Kote no Mi could be used on the cat, the wolf or the parrot of another player, who then lost it for good. It now leaves it alone.</li>
<li><strong>A collared marine did not obey.</strong> A marine collared by the Peto Peto no Mi now obeys the Command ability of its master, like any other collared creature.</li>
</ul>
</div>

## 2.0.0 { #v2-0-0 }

<small>Released 2026-10-10 · [Download](https://www.curseforge.com/minecraft/mc-mods/missing-missing-no-mi/files/9118748)</small>

<div class="changelog-body" markdown="0">
<p>The big one: <strong>33 new Devil Fruits and 264 new abilities</strong>. The addon now has <strong>54 fruits and 442 abilities</strong>: the fruits of Wano, and non-canon fruits from the films, the anime arcs and the video games.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi</strong> 0.11.5 and <strong>AkumaLib 4.4.0</strong> or newer. Client and server.</p>
<p>⚠️ <strong>Servers: set <code>allow-flight=true</code></strong> in <code>server.properties</code>. More fruits fly now (the Eagle, the Vampire, the Triceratops, the Pasa Pasa, the Uta Uta in its world, and the six of 1.0.0); without it the server kicks their users.</p>
<hr />
<h3>Logia</h3>
<h4>Pasa Pasa no Mi</h4>
<p><em>Golden box · 14 abilities · Simon's fruit (Great Hidden Treasure of the Nanatsu Islands)</em></p>
<p>A body of paper sheets that flies as a swarm: sheets that cut, bind and wall, and six marked pages with their own powers. Fire is its weakness.</p>
<p>Logia Invulnerability Pasa, Paper Swarm, Paper Flight, Paper Blades, Paper Storm, Paper Mummy, Paper Wall, Sefer Ha-Bahir, Sefer Ha-Zohar, Sefer Atziluth, Sefer Assiah, Sefer Briah, Sefer Yetzirah, Warding Page.</p>
<h4>Ame Ame no Mi</h4>
<p><em>Iron box · 6 abilities · Gasparde's fruit (Dead End Adventure)</em></p>
<p>A body of green candy syrup that holds whoever hits it. The syrup hardens into spears and spikes and makes a pool that holds enemies and lets allies walk.</p>
<p>Logia Invulnerability Ame, Syrup Spear, Spike Burst, Spiked Charge, Slingshot, Syrup Pool.</p>
<h4>Toro Toro no Mi</h4>
<p><em>Iron box · 8 abilities · Honey Queen's fruit (Clockwork Island Adventure)</em></p>
<p>A body of liquid that flows through gaps as a pool, with a blast, a great wave, a geyser, a pressure jet and a sphere that drowns.</p>
<p>Logia Invulnerability Toro, Flow, Liquid Blast, Great Wave, Liquid Sphere, Geyser, Pressure Jet, Slick.</p>
<h3>Paramecia</h3>
<h4>Goru Goru no Mi</h4>
<p><em>Golden box · 14 abilities · Gild Tesoro's fruit (Film Gold)</em></p>
<p>Gold moved at will. Every ability needs gold, held while it lasts and given back: statues, lances, a storm of gold, a golden armour and a giant golden golem.</p>
<p>Gold Hoard, Golden Senses, Gold Dust, Golden Statue, Gon Bomba, Gon Lancia, Gon L'ira di Dio, Gon Incantesimo, Gon Frenesia, Gon Tempesta, Golden Armour, Golden Tesoro, Gon Inferno, Gon Fuoco di Dio.</p>
<h4>Toki Toki no Mi</h4>
<p><em>Golden box · 4 abilities · Kozuki Toki's fruit</em></p>
<p>Sends the user, an ally, an enemy or shots forward in time: gone from the present, back at the same place a moment later.</p>
<p>Jump Ahead, Shelter, Send Ahead, Postpone.</p>
<h4>Uta Uta no Mi</h4>
<p><em>Golden box · 7 abilities · Uta's fruit (Film Red)</em></p>
<p>Whoever hears the song is carried into Uta World, a concert stage in its own dimension where the singer flies and fights. A blow on a sleeping body wakes the dreamer.</p>
<p>Song, Musical Note Soldiers, Staff, Trick or Treat, Knight Form, Tot Musica, Voice.</p>
<h4>Atsu Atsu no Mi</h4>
<p><em>Iron box · 12 abilities · Don Accino's fruit (Ice Hunter arc)</em></p>
<p>Body heat raised by levels up to ten thousand degrees: balls of heat, steam that seizes, and a burning body thrown and rolled at enemies. Ice and snow melt around the user.</p>
<p>Netsuryo Up, Atsuyaki Tamago, Atsu Atsu no Gatling, Atsu Gesho, Atsuage, Atsutto Odoroku Hana Jet, Atsu Atsu Head, Steam Iron, Steam Iron: 10,000 Degree Press, Net Tire, Slippery Slippery, Atsu Atsu no Net Surfing.</p>
<h4>Fude Fude no Mi</h4>
<p><em>Iron box · 10 abilities · Kanjuro's fruit</em></p>
<p>What is drawn with ink becomes real: sparrows, a rising dragon, snakes, a double of the user, weapons and food. The user can also hide flat on a wall.</p>
<p>Ink, Nuke Suzume, Nobori Ryu, Kazenbo, Ink Double, Sumigumo, Flat Hiding, Ink Weapon, Ink Food, Ink Snakes.</p>
<h4>Gutsu Gutsu no Mi</h4>
<p><em>Iron box · 9 abilities · Bill's fruit (Silver Mine arc)</em></p>
<p>A body that is a furnace: it eats metal and makes weapons for the user and the crew, spits molten metal, cases enemies in metal and coats itself.</p>
<p>Furnace, Smelt, Forge, Arm the Crew, Molten Shot, Molten Stream, Metal Casing, Metal Coat, Overfed.</p>
<h4>Kote Kote no Mi</h4>
<p><em>Iron box · 9 abilities · Adio's fruit (One Piece Odyssey)</em></p>
<p>Great gauntlets of light that punch, grab, lift and crush, and raise barriers of lightning that turn shots back.</p>
<p>Gauntlet Punch, Gauntlet Grab, Lightning Barrier, Tensei Hoshi, Grande, Gauntlet Vise, Gauntlet Lift, Solmente, A Jien Te.</p>
<h4>Moa Moa no Mi</h4>
<p><em>Iron box · 7 abilities · Byrnndi World's fruit (3D2Y)</em></p>
<p>Multiplies the size or the speed of things up to a hundred times: pebbles thrown like cannonballs, giant shots, and bursts of speed.</p>
<p>Jubai Sandan, Gojubai Ho, Hyakubai Gan, Hyakubai Giri, Jubai Soku, Hyakubai Soku: Renda, Gojubai Soku: Gekitsui.</p>
<h4>Modo Modo no Mi</h4>
<p><em>Iron box · 6 abilities · Ain's fruit (Film Z)</em></p>
<p>Sends what it touches twelve years back: a body gets smaller and weaker at each touch, a creature is erased at the fifth, stone turns back to lava, a worn item is new again.</p>
<p>Modo Modo, Modo Modo Shot, Back to Lava, Entomb, Own Youth, Renew.</p>
<h4>Noko Noko no Mi</h4>
<p><em>Iron box · 7 abilities · Musshuru's fruit (Episode of Chopper Plus)</em></p>
<p>Poisonous mushroom spores: clouds that poison and stiffen, fungi that spread, and a great spore bomb. Milk, fire or time cure the spores.</p>
<p>Spin Drill, Shade Dance, Cross Shade, Lot Stiffen, Run Hypha, Snow Spore, Fatal Bomb.</p>
<h4>Peto Peto no Mi</h4>
<p><em>Iron box · 7 abilities · Breed's fruit (Caesar Retrieval arc)</em></p>
<p>A collar of green jelly makes its wearer obey: creatures serve, players get short orders. Three collars at most, and one can be released.</p>
<p>Collar, Order, Full Strength, Red Collar, Levitation, Recall, Release.</p>
<h4>Fuku Fuku no Mi</h4>
<p><em>Wooden box · 4 abilities · Kin'emon's fruit</em></p>
<p>A leaf or a stone becomes clothes: seven outfits made of real armour, for the user or for an ally who crouches to accept.</p>
<p>Doron, Dress Up, Garb Blade, Gofukuten.</p>
<h4>Juku Juku no Mi</h4>
<p><em>Wooden box · 6 abilities · Shinobu's fruit</em></p>
<p>What the user touches ripens and rots: blocks crumble, the ground opens under enemies, gear wears out, and the living grow old.</p>
<p>Decaying Touch, Sinkhole, Kare-San-Sui, Aging Touch, Rot Gear, Ripen.</p>
<h4>Kibi Kibi no Mi</h4>
<p><em>Wooden box · 2 abilities · Tama's fruit</em></p>
<p>A dango pulled from the cheek tames the animal that eats it, for good. A tamed animal follows the orders of the base mod.</p>
<p>Kibi Dango, Kibi Dan-boshi.</p>
<h4>Koro Koro no Mi</h4>
<p><em>Wooden box · 6 abilities · Peseta's fruit (Silver Mine arc)</em></p>
<p>Hands and feet become train wheels: the user rolls fast, much faster on rails, rams, skids, jumps and throws explosives.</p>
<p>Wheels, Ram, Skid, Rail Jump, Bakudan Ame, Spin.</p>
<h4>Kyubu Kyubu no Mi</h4>
<p><em>Wooden box · 7 abilities · Gairam's fruit (3D2Y)</em></p>
<p>Cuts what it touches into cubes: blocks taken and thrown, a wall of cubes, a cube that carries the user, and an enemy shut in a cube.</p>
<p>Cubreak, Cubooster, Cube Wall, Air Cube, Living Cube, Totem Cube, Cube Ride.</p>
<h4>Maki Maki no Mi</h4>
<p><em>Wooden box · 7 abilities · Raizo's fruit</em></p>
<p>Scrolls that catch things and give them back: an attack caught and returned, fire, a flood, a storage scroll that follows the user, and clones.</p>
<p>Maki Maki no Jutsu, Hokan, Scroll Wrap, Katon, Deluge, Storage Scroll, Bunshin no Jutsu.</p>
<h4>Mane Mane no Mi</h4>
<p><em>Wooden box · 2 abilities · Bentham's fruit</em></p>
<p>The user takes the look of anyone touched, player or creature, and keeps a memory of the faces. Monsters fooled by the look leave the user alone.</p>
<p>Face Touch, Mane Mane Memory.</p>
<h4>Mosa Mosa no Mi</h4>
<p><em>Wooden box · 8 abilities · Binz's fruit (Film Z)</em></p>
<p>Makes the plants around the user grow and obey: thorn whips, vines that hold, a green wall, a root bridge and a plant that devours.</p>
<p>Greenery, Mosa Mosa Dance, Thorn Whip, Vine Grip, Green Wall, Devouring Plant, Root Bridge, Mosa Mosa Kuzushi.</p>
<h4>Nuke Nuke no Mi</h4>
<p><em>Wooden box · 5 abilities · Tanaka's fruit (Film Gold)</em></p>
<p>Passes through walls and floors and takes an ally along, lets shots pass through, and opens a temporary pit under enemies.</p>
<p>Pass Through, Through Illusion, Bottomless Hell, Take Along, Untouched.</p>
<h3>Zoan</h3>
<h4>Tori Tori no Mi, Model: Eagle</h4>
<p><em>Iron box · 7 abilities · Buzz's fruit (Straw Hat Chase)</em></p>
<p>The heavy bird next to the Falcon: slower, tougher, hitting harder, carrying its prey longer, with a gust of wings that turns shots back.</p>
<p>Eagle Assault Point, Eagle Fly Point, Eagle Flight, Talon Strike, Carry Off, Wing Gust, Screech.</p>
<h4>Inu Inu no Mi, Model: Tanuki</h4>
<p><em>Wooden box · 9 abilities · Bunbuku's fruit</em></p>
<p>A round brawler and a small quick animal: a belly drum, a belly bash, a burrow under the ground, and playing dead so monsters lose interest.</p>
<p>Tanuki Heavy Point, Tanuki Walk Point, Tanuki Bite, Tail Swipe, Belly Drum, Belly Bash, Scurry, Play Dead, Burrow.</p>
<h3>Ancient Zoan</h3>
<h4>Kumo Kumo no Mi, Model: Rosamygale Grauvogeli</h4>
<p><em>Iron box · 11 abilities · Black Maria's fruit</em></p>
<p>A giant spider that walks on walls and lays webs. Webs hold enemies and let allies through, a cocoon shuts a target in, and the bite poisons.</p>
<p>Rosamygale Heavy Point, Rosamygale Walk Point, Wall Walker, Hard Gum, Marianette, Oshizumaria, Ikidomaria, Web Trap, Cocoon, Venom Bite, Thread Pull.</p>
<h4>Neko Neko no Mi, Model: Saber Tiger</h4>
<p><em>Iron box · 11 abilities · Who's-Who's fruit</em></p>
<p>An ambush hunter, fast and frail: a pounce, a hold on the throat, and the Six Powers done with fangs.</p>
<p>Saber Tiger Heavy Point, Saber Tiger Walk Point, Saber Bite, Pounce, Throat Hold, Claw Rake, Roar, Evasive Leap, Gagan, Tekkai: Kibasen, Shigan: Madara.</p>
<h4>Ryu Ryu no Mi, Model: Pachycephalosaurus</h4>
<p><em>Iron box · 10 abilities · Ulti's fruit</em></p>
<p>A fast headbutter. Running into enemies knocks them away, and the skull breaks walls, pins a target down and falls like a meteor.</p>
<p>Pachycephalosaurus Heavy Point, Pachycephalosaurus Walk Point, Thick Skull, Skull Smash, Ul-Zugan, Ul-Meteor, Wall Breaker, Pin Down, Tail Sweep, Skull Barrage.</p>
<h4>Ryu Ryu no Mi, Model: Spinosaurus</h4>
<p><em>Iron box · 9 abilities · Page One's fruit</em></p>
<p>A predator that does not let go: claws that make enemies bleed, more damage on bleeding enemies, a jaw that crushes and a leap that lands on them.</p>
<p>Spinosaurus Heavy Point, Spinosaurus Walk Point, Frenzy, Rending Claw, Shred, Cling, Jaw Crush, Paddle Tail, Crushing Leap.</p>
<h4>Ryu Ryu no Mi, Model: Triceratops</h4>
<p><em>Iron box · 11 abilities · Sasaki's fruit</em></p>
<p>The most armoured form of the addon. The frill spins to fly for a while, the horns charge and lift, and the whole triceratops shakes the ground.</p>
<p>Triceratops Heavy Point, Triceratops Guard Point, Thick Hide, Frill Flight, Triceratops Flight, Tamaceratops, Magnumceratops, Heliceratops, Horn Charge, Horn Lift, Ground Stomp.</p>
<h3>Mythical Zoan</h3>
<h4>Batto Batto no Mi, Model: Vampire</h4>
<p><em>Golden box · 11 abilities · Patrick Redfield's fruit (Unlimited World Red)</em></p>
<p>A winged vampire and a giant bat, both flying. The bite drains youth, a darkness covers the area, and every ability is stronger at night.</p>
<p>Vampire Assault Point, Vampire Fly Point, Vampire Flight, Wing Slash, Draining Bite, Give Back, Darkness, Dark Shot, Red Dash, Swarm of Bats, Echolocation.</p>
<h4>Hebi Hebi no Mi, Model: Yamata no Orochi</h4>
<p><em>Golden box · 10 abilities · Kurozumi Orochi's fruit</em></p>
<p>Eight heads and eight lives. The heads bite one after the other, reach far, grab and devour, and the user comes back each time a head is lost.</p>
<p>Orochi Heavy Point, Orochi Guard Point, Eight Lives, Multi Bite, Long Neck, Devour, Eightfold Strike, Coiled Guard, Jaw Grab, Thrash.</p>
<h4>Hito Hito no Mi, Model: Onyudo</h4>
<p><em>Golden box · 8 abilities · Onimaru's fruit</em></p>
<p>The giant monk of the legends: a giant with a long reach, wide sweeps, a stomp, a guard that blocks from the front and a gaze that frightens.</p>
<p>Onyudo Heavy Point, Onyudo Guard Point, Great Sweep, Long Thrust, Monk's Guard, Giant's Stomp, Dread Gaze, Earth Splitter.</p>
<h3>Changes to the fruits of 1.0.0</h3>
<ul>
<li><strong>Allies are spared.</strong> Sweeps, holds, pulls and projectiles no longer touch the pet of another player, and no longer hit a crew mate.</li>
<li><strong>An ability that finds no target costs half a second</strong>, not its full cooldown.</li>
<li><strong>Armament Haki works on the abilities.</strong> Hardening strengthens the blows of the body, Imbuing the weapons and thrown objects.</li>
<li><strong>Tooltips.</strong> Every ability shows its damage type as an icon and its real numbers: total damage of a multi-hit, durations, costs. Forms show their bonuses as stats.</li>
<li><strong>Inu Inu no Mi, Model: Wolf.</strong> The night bonuses of Yako are stats shown in its tooltip (speed, attack damage, healing), and the screen no longer blinks.</li>
<li><strong>Fuwa Fuwa no Mi.</strong> Item Hassha does 8 damage every 1.5 seconds (it was 12 every half second).</li>
<li><strong>Mori Mori no Mi.</strong> The void and <code>/kill</code> are no longer survived (fixed in AkumaLib, for every Logia).</li>
<li><strong>Gasha Gasha no Mi.</strong> Desmontar gives back half of what a thing is made of, and only when one recipe makes it: no more duplication.</li>
<li><strong>Flying Zoans.</strong> A player who leaves the game in the air lands without damage when coming back.</li>
<li><strong>Whole forms</strong> of the Wolf, the Falcon, the Kabutomushi and the Suzumebachi have their eyes redrawn.</li>
<li>Many fixes found by replaying every kit, alone and with two players.</li>
</ul>
<h3>Also</h3>
<ul>
<li>A server chooses the creatures a power works on with entity tags (data packs): <code>inomissing:bosses</code> for the bodies that holds last less on, <code>inomissing:hobi_immune</code>, <code>inomissing:numa_unheld</code>, <code>inomissing:thrown_weapons</code>.</li>
<li>Every status effect has its icon, and every Logia its own particles.</li>
</ul>
</div>

## 1.0.0 { #v1-0-0 }

<small>Released 2026-10-05 · [Download](https://www.curseforge.com/minecraft/mc-mods/missing-missing-no-mi/files/9069580)</small>

<div class="changelog-body" markdown="0">
<p>The first release. A Forge addon for <strong>Mine Mine no Mi</strong> that adds the Devil Fruits of <em>One Piece</em> the base mod does not have yet: <strong>21 fruits and 178 abilities</strong>, from the manga, the anime and the films. Every fruit keeps its name and its techniques from the work, drops from the base mod's own Devil Fruit boxes and stands in its Devil Fruits creative tab, sorted by type like the base mod's own.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi</strong> 0.11.5 and <strong>AkumaLib 4.0.0</strong> or newer. Client and server.</p>
<p>⚠️ <strong>Servers: set <code>allow-flight=true</code></strong> in <code>server.properties</code>. Six fruits fly (Fuwa Fuwa, Guru Guru, Mori Mori, Tori Tori Model: Falcon, both Mushi Mushi); with the default setting the server kicks their users for flying.</p>
<hr>
<h3>Logia</h3>
<h4>Mori Mori no Mi</h4>
<p><em>Golden box · 10 abilities · Aramaki's fruit</em></p>
<p>A body of living wood fed by the sun: roots, branch spears, a wooden golem that the user grows back from, and a flower that spins to fly.</p>
<p>Logia Invulnerability Mori, Kogosei, Ryokuka, Jukon, Edayari, Kinniku Mori Mori, Wakagi, Bokarin, Hanaguruma, Hisho.</p>
<h4>Numa Numa no Mi</h4>
<p><em>Golden box · 11 abilities · Caribou's fruit</em></p>
<p>The ground turns to swamp and swallows what stands on it. Mud arms hold enemies in place, a wave of mud runs ahead, and the swamp stores arrows and items to spit them back out.</p>
<p>Logia Invulnerability Numa, Numa Numa no Gatling Gun, Numachi, Numa Kyu, Hikizuri Komi, Numa Sensui, Numa Kura, Doro Nami, Numa no Te, Haki Dashi, Sokonashi Numa.</p>
<h3>Paramecia</h3>
<h4>Fuwa Fuwa no Mi</h4>
<p><em>Golden box · 10 abilities · Shiki's fruit</em></p>
<p>Free flight, items lifted and thrown, lion heads raised from the ground, and a boat that flies with its passengers.</p>
<p>Fuyu, Item Kaiten, Item Hassha, Shishi Odoshi, Shishi Odoshi: Chimaki, Zanpa, Shishi Funjin, Ryuki, Tatsumaki, Fusen.</p>
<h4>Gasha Gasha no Mi</h4>
<p><em>Golden box · 10 abilities · Douglas Bullet's fruit</em></p>
<p>Takes blocks apart and builds with the pieces: a wall, a cannon, a turret, a soldier, and a colossus.</p>
<p>Desmontar, Taller, Muralla, Cañón Armado, Torreta, Soldado, Unión Armado, Ultimate Faust, Blindado, Det Sterkeste Strike.</p>
<h4>Ishi Ishi no Mi</h4>
<p><em>Golden box · 8 abilities · Pica's fruit</em></p>
<p>The user merges with stone, travels inside it, strikes out of it and rises as a stone giant.</p>
<p>Stone Mass, Stone Assimilation, Pulpostone, Charlestone, Ishiusu, Bitestone, Ishi Kobushi, Stone Giant.</p>
<h4>Buki Buki no Mi</h4>
<p><em>Iron box · 8 abilities · Baby 5's fruit</em></p>
<p>The body becomes weapons: sword, revolver, gatling, sickle, flying disk, and a missile the user pilots.</p>
<p>Espada Girl, Revolver Girl, Revolver Leg, Gatling Girl, Sickle Girl, Fire Girl, Missile Girl, Flying Disk Girl.</p>
<h4>Hira Hira no Mi</h4>
<p><em>Iron box · 7 abilities · Diamante's fruit</em></p>
<p>Steel that ripples like cloth: a sword that unrolls, a sword folded into a bull-headed mace, a steel cape, ground that waves like a flag, and spiked iron balls that rain down.</p>
<p>Vipera Glaive, Corrida Glaive, Army Bandera, Death Enjambre, Steel Cape, Lock, Flag Body.</p>
<h4>Hobi Hobi no Mi</h4>
<p><em>Iron box · 7 abilities · Sugar's fruit</em></p>
<p>Turns creatures and players into toys. Toys under contract obey, can be ordered to fight harder, and one toy can be given its shape back.</p>
<p>Omocha, Keiyaku, Little Black Bears, Atamawari Ningyo, Noroi, Zettai Meirei, Kaijo.</p>
<h4>Pamu Pamu no Mi</h4>
<p><em>Iron box · 9 abilities · Gladius's fruit</em></p>
<p>Bursts blocks, items and worn armour, never a body. The user's own body swells into a balloon that bursts when hit.</p>
<p>Met Punc, Bracchium, Jirai Punc, Punc Bala, Catapult Punc, Punc Rock Fest, Punc Hair, Fashion Punc, Punc Rock Super Arena.</p>
<h4>Ton Ton no Mi</h4>
<p><em>Iron box · 7 abilities · Machvise's fruit</em></p>
<p>Weight changed at will: light enough to float, then dropped from above at one of four weights. A knuckle, a stomp, a tackle and a press on the ground.</p>
<p>Float, Vise, Heavy Body, Senton Knuckle, Hyakuton Stomp, Manton Tackle, Senton Press.</p>
<h4>Ami Ami no Mi</h4>
<p><em>Wooden box · 7 abilities · Largo's fruit</em></p>
<p>Nets of every kind: plain, iron, barbed, burning, boiling, and a dome.</p>
<p>Mucho Neto Net, Neto Net Hoso Mo, Mucho Cho Shi Mo, Mucho Tetsujo Mo, Mucho Kaji Mo, Millionet, No Shock Taimo.</p>
<h4>Ato Ato no Mi</h4>
<p><em>Wooden box · 8 abilities · Jora's fruit</em></p>
<p>Turns the world into art: an art cloud, a mosaic floor, a sculpture, and shots that fall as still lifes.</p>
<p>Broken-Fu Art, Dying Art, Fukugen, Heaven's Do Art, Panorama Art, Still Life Art, Mosaic Art, Readymade Art.</p>
<h4>Choki Choki no Mi</h4>
<p><em>Wooden box · 8 abilities · Inazuma's fruit</em></p>
<p>Scissor hands that cut the ground like paper: walls, a bridge that climbs, and cuts that open armour.</p>
<p>Hasami, O Kanabashi, Keep Out, Kirikabe, Kamikiri, Dai Setsudan, Kirisaki, Kami Hashi.</p>
<h4>Giro Giro no Mi</h4>
<p><em>Wooden box · 5 abilities · Viola's fruit</em></p>
<p>Sees through walls and far away, reads minds, and throws whales made of tears.</p>
<p>Giro Giro Vision, Peeping Mind, Senrigan, Hierro Lagrima: Mekujira, Insight.</p>
<h4>Guru Guru no Mi</h4>
<p><em>Wooden box · 7 abilities · Buffalo's fruit</em></p>
<p>Limbs that spin like propellers: flight, wind, and a human top.</p>
<p>Puropera, Toppu: Matasaburo, Guru Guru Toshaho, Suketo, Senpu, Hiko, Kaiten Ningen.</p>
<h4>Kama Kama no Mi</h4>
<p><em>Wooden box · 8 abilities · Eric's fruit</em></p>
<p>Sickle nails and blades of air: single cuts, flurries, a dash through the enemy and a ring of blades.</p>
<p>Kama Tsume, Kama Kama no Kamaitachi, Kama Kama no Tsumujikaze, Kama Kama no Kamaitachi Midareuchi, Kama Kama no Renzan, Kama Kama no Tsuji Giri, Kama Kama no Kiri Harai, Kama Kama no Enbu.</p>
<h4>Nui Nui no Mi</h4>
<p><em>Wooden box · 7 abilities · Leo's fruit</em></p>
<p>Sews enemies to the ground and to each other, sews their arms, mends, and swings on a thread.</p>
<p>Nuitsuke, Nuiawase, Haute Couture: Patchwork, Tsukuroi, Hodoki, Ude Nui, Nui Tobi.</p>
<h3>Zoan</h3>
<h4>Inu Inu no Mi, Model: Wolf</h4>
<p><em>Iron box · 11 abilities · Jabra's fruit</em></p>
<p>A wolf and a wolf-man, with the wolf's own Rokushiki: a bite, a howl that weakens, tracking by scent, and the Ten Finger Pistol.</p>
<p>Wolf Walk Point, Wolf Heavy Point, Kamitsuki, Shippu, Toboe, Kyukaku, Yako, Jusshigan, Gekko Jusshigan, Rankyaku: Koro, Tekkai Kenpo: Roga no Kamae.</p>
<h4>Mushi Mushi no Mi, Model: Kabutomushi</h4>
<p><em>Iron box · 10 abilities · Kabu's fruit</em></p>
<p>A rhinoceros beetle that flies and carries a rider: the horn, four arms, a ram through blocks, and a shell that turns shots back.</p>
<p>Kabutomushi Heavy Point, Kabutomushi Walk Point, Kabutomushi Flight, Kabutomushi Rideable, Beetle Upper, Horn Toss, Horn Dive, Four Arm Rush, Shell Guard, Beetle Ram.</p>
<h4>Mushi Mushi no Mi, Model: Suzumebachi</h4>
<p><em>Iron box · 9 abilities · Bian's fruit</em></p>
<p>A hornet that flies: stings that poison and numb, a spray of venom, a swarm, and a bite.</p>
<p>Suzumebachi Heavy Point, Suzumebachi Walk Point, Suzumebachi Flight, Stinger, Pink Hornets, Needle Dash, Venom Spray, Numbing Sting, Mandible Bite.</p>
<h4>Tori Tori no Mi, Model: Falcon</h4>
<p><em>Iron box · 11 abilities · Pell's fruit</em></p>
<p>A falcon that flies and carries a rider: talons, a stoop from the sky, thrown feathers, and eyes that mark everything around.</p>
<p>Falcon Assault Point, Falcon Fly Point, Falcon Flight, Falcon Rideable, Tobizume, Tsukami Otoshi, Hane Arashi, Kyukoka, Kagizume, Hayabusa no Me, Hane Tsubute.</p>
<h3>Also</h3>
<ul>
<li>Each fruit is as common in its box as a Mine Mine no Mi fruit of the same tier. The fruits are listed in data files, so a modpack or a server can move one to another box, make it rarer or take it out with a data pack.</li>
<li>The Zoans have their own models for every form, and many techniques have their own: nets, mud, steel, toys, feathers, sculptures.</li>
<li><strong>Curios</strong> is optional: with it, a cape worn in the back slot counts for the Hira Hira no Mi's Steel Cape.</li>
<li>A server can protect creatures from the Hobi Hobi no Mi with the entity tag <code>inomissing:hobi_immune</code>. Bosses, and pets tamed by somebody else, are never made toys.</li>
</ul>
</div>

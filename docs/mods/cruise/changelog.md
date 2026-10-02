# Changelog

Every Cruise Cruise no Mi release for Minecraft 1.20.1, newest first, as published on [CurseForge](https://www.curseforge.com/minecraft/mc-mods/cruise-cruise-no-mi/files/all).

## 0.3.1: beta { #v0-3-1 }

<small>Released 2026-10-02 · [Download](https://www.curseforge.com/minecraft/mc-mods/cruise-cruise-no-mi/files/9038562)</small>

<div class="changelog-body" markdown="0">
<p><strong>A fix for 0.3.0.</strong> With Cruise Cruise no Mi and Mine Mine no Mi: Sky Island installed together, the game did not
start. It does now. Nothing else changes: everything 0.3.0 brought is in 0.3.1.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi</strong> 0.11.5 and <strong>AkumaLib 4.0.0</strong>. Client and server.
The network protocol does not change from 0.3.0.</p>
<hr />
<h3>Fixes</h3>
<ul>
<li><strong>The game starts with Sky Island.</strong> With Cruise and Sky Island 0.3.0 both installed, the game stopped while
  loading. Both mods change how a fishing line floats - Cruise to fish in lava, Sky Island to fish in the sea of
  clouds - and the game accepted only one of the two. They now work together, lava fishing and cloud fishing both.
  You do not need to update Sky Island.</li>
<li>Any other mod that changes how a fishing line floats no longer stops the game for the same reason.</li>
</ul>
</div>

## 0.3.0: beta { #v0-3-0 }

<small>Released 2026-10-02 · [Download](https://www.curseforge.com/minecraft/mc-mods/cruise-cruise-no-mi/files/9038114)</small>

<div class="changelog-body" markdown="0">
<p><strong>The islands are lived in.</strong> One Piece villages rise in the plains and on the coasts: a market square, a tavern,
workshops, a port, and people who have their day there - civilians and children, Marines, the merchants at their
stalls. And things happen in them: a concert on the square, a fever to cure, a swordsmith from Wano who forges the
named blades.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi</strong> 0.11.5 and <strong>AkumaLib 4.0.0</strong> (was 2.8.0). Client
and server.</p>
<p>⚠️ <strong>AkumaLib 4.0.0 is needed: an older one is refused at start-up.</strong> AkumaLib 2.8.0 and 2.9.0 made players lose
their trades' XP or their titles on every death; that is fixed since. AkumaLib 4 also corrects many faults of Mine
Mine no Mi itself (see its own changelog), and every addon that uses AkumaLib has to be updated with it.</p>
<p>⚠️ <strong>Update the server and every player together.</strong> The network protocol changed, AkumaLib's and Cruise's: a
0.3.0 client cannot join a 0.2.0 server, nor the other way round.</p>
<p>⚠️ <strong>A beta</strong>: everything here is playable, but numbers (how often the events come, what they pay) may still move
with your feedback. The villages appear in land that has not been explored yet. The concert, the fever and the
swordsmith can each be turned off, or made to come more or less often, in <code>config/inocruise-common.toml</code>.</p>
<hr />
<h3>New: villages</h3>
<ul>
<li><strong>One Piece villages.</strong> New villages appear in plains, meadows and on beaches: a market square with a well, a tavern
  with its barkeeper, four to six trade buildings (restaurant, forge, workshop, laboratory, sewing room, tannery,
  masonry) and houses. A village by the water has a port, a shipyard and a fisherman's house on stilts, and on
  the sea a lighthouse; a village inland has a windmill.</li>
<li><strong>Civilians.</strong> Fishermen, farmers, craftsmen and townspeople live there, one in every house and workshop. They
  walk about the village by day and go home at night or when danger comes. Right click one to hear what he has to say.</li>
<li><strong>Children.</strong> Two or three children live in each village. By day they play tag on the market square; they go home
  before the adults in the evening. Striking a child costs double.</li>
<li><strong>A day in the village.</strong> The civilians have their day: at work in the morning and the afternoon (the fishermen
  on the pier, the farmer at the mill, the craftsmen at the workshops), on the market square at noon, at the tavern
  in the evening, home at night.</li>
<li><strong>They talk, and they know you.</strong> Two villagers who cross stop for a word. A pirate with a bounty of 100,000 Belly
  or more is known: people step away from him and have only a wary word. A Marine is welcome.</li>
<li><strong>Boats at the port.</strong> A fishing boat, and sometimes a dinghy, are moored at the piers of the villages by the
  sea. You may take one - but the village will call it theft: your bounty rises and the village closes to you for a
  day.</li>
<li><strong>A musician at the tavern.</strong> In the evening someone plays at the tavern - a flute, a violin or a guitar, and the
  Musician's own tunes. Just for the pleasure of it.</li>
<li><strong>Smoke and a bell.</strong> Smoke rises from the chimneys. A bell on the market square rings at dawn and at dusk: the
  villagers' day starts and ends with it.</li>
<li><strong>Every village has a name.</strong> It comes up on your screen as you walk in - Honey Village, Anchor Town, Komura... -
  and the Navigator's log book keeps the names of the villages you have been to.</li>
<li><strong>Animals and fields.</strong> The farmhouse keeps animals in its pen, the windmill has its fields of wheat, Bitter Grass
  and Medicinal Herb, and a cat or a dog hangs about the market square.</li>
<li><strong>Roads you can walk.</strong> A village on a slope has roads that climb from house to house: every door is joined to the
  market square, with never more than one block to step up.</li>
<li><strong>Hands off the villagers.</strong> Striking a civilian raises your bounty, sends the others running home and closes the
  village to you for a day: its merchants and its notice board will not deal with you. Killing one costs far more,
  for three days. The Marines nearby come for you.</li>
<li><strong>The notice board.</strong> On the market square, a board shows five small orders every morning, one for each supplying
  trade (fishing, hunting, mining, farming, cooking). Bring the goods to be paid in Belly and in XP for the trade;
  some orders add a small gift. The first to deliver takes the order.</li>
<li><strong>Marines in the villages.</strong> One village in two has a small Marine post with a few soldiers. A few villages stand
  next to a large Marine base, with its captains and its prison.</li>
<li><strong>New inhabitants.</strong> A village does not stay empty after a death. Three days later, at dawn, someone new moves
  into the house: a fisherman after a fisherman, a child after a child, a musician at the tavern again. They only
  arrive while nobody is looking. The farm's animals and the cat or dog of the square come back the same way.</li>
<li><strong>A village can die.</strong> Kill all the people of a village but one, before anyone new has moved in, and the
  village is dead for good: nobody comes to live there again, the travelling merchants and the merchant ship stay
  away, its notice board is closed, and its name comes up in grey as an abandoned village. The last inhabitant
  leaves at dawn. Everyone on the server is told, and the killers share a very large bounty: 25,000 Belly for each
  inhabitant the village had, split by how many each of them killed.</li>
<li><strong>Merchants on the market square.</strong> The travelling merchants come to these villages too. They set up at the
  stalls of the market square, and the Fishmonger on the quay of a village with a port, and they stay there.</li>
<li><strong>The merchant ship at the port.</strong> The merchant ship now anchors off the port of one of these villages when
  there is one near, and its arrival names the village. A port on a river is too shallow for it.</li>
<li><strong>Vanilla villages can be turned off.</strong> A new setting, <code>vanillaVillages</code> in <code>inocruise-common.toml</code>, keeps
  Minecraft's own villages out of newly explored land, for a world with One Piece villages only. They are kept by
  default.</li>
<li><strong>Sea Charts lead to them.</strong> A Navigator's village chart now leads to the nearest of these villages not yet
  charted. The chart takes a few seconds to draw; the game does not stop meanwhile.</li>
<li><strong>A concert on the square.</strong> Every five to eight days a small stage goes up on the market square of a village near
  you, for a day; the chat and the barkeepers' rumours say where. A travelling musician comes with it: he opens the
  concert and plays between two rests, and the villagers gather before the stage to listen. Step onto the stage and
  he leaves it to you. A tune played there is for every player within reach, whatever their crew; the villagers count
  as your audience, up to sixteen listeners, and the tune is worth twice its Musician XP. At his stall he sells two of
  the lost tunes' score recipes (800 to 9,000 Belly). With a score in your hand, a right click on a villager plays
  the score instead of starting a chat. How often concerts are held and how long they last are settings (<code>concert</code> in
  <code>inocruise-common.toml</code>).</li>
<li><strong>A fever in the village.</strong> Every seven to ten days the people of a village near you fall ill for a day; the chat
  and the barkeepers' rumours say where. A third of the adults have it: some keep to their beds, the others drag
  themselves about. A doctor sets up on the square by the notice board. Right click him to see his list: three
  everyday remedies of the Chemist's (healing candy and tonics, antidote powder), a few of each. Anyone may bring a
  part; every remedy is paid in Belly and in Chemist XP. When the list is filled the village is cured, and for three
  days its merchants take 20 % off their stalls for everyone who brought something (a Merchant keeps the better of
  this and his own Bargain, not both). If nobody helps, the fever passes on its own: nobody dies of it. How often it
  comes and how long it lasts are settings (<code>fever</code> in <code>inocruise-common.toml</code>).</li>
<li><strong>A swordsmith from Wano.</strong> Every eight to twelve days a travelling swordsmith stops for two days on the square of
  a village near you; the chat and the barkeepers' rumours say where. Right click him to see his commissions: four
  of the base mod's named blades each visit - Sandai Kitetsu, Kikoku, Durandal, and of the Great Grade Wado
  Ichimonji, Nidai Kitetsu, Shusui, Enma, Ame no Habakiri - which until now only the luck of a trader gave. A
  commission takes a blade forged by a Blacksmith (a Katana or a Broadsword; a Warabide Sword for a Great Grade
  blade), Pure Iron Ore, Diamond Fragments (and Dense Kairoseki for the Great Grade), and 10,000 or 20,000 Belly.
  The blade is ready six in-game hours later; if he has left by then, the next swordsmith hands it over, in any
  village. What the Blacksmith's own skill had put on his blade passes to the new one. One order at a time. How
  often he comes and how long he stays are settings (<code>swordsmith</code> in <code>inocruise-common.toml</code>).</li>
<li><strong>Forged by.</strong> A weapon made at the Forge now carries the name of the Blacksmith who forged it. A blade forged
  before this version carries no name: the swordsmith does not take it.</li>
<li>Pirates and bandits no longer appear in the middle of a village.</li>
</ul>
<hr />
<h3>Fixes</h3>
<ul>
<li><strong>The Carpenter can learn his trade.</strong> His first hull, the Reinforced Boat, asked for level 5 and nothing came
  before it: a Carpenter could not earn any XP at all. It is now his first recipe, at level 1, and mending a hull
  afloat pays him a little XP too.</li>
<li><strong>A score recipe bought from a merchant teaches its tune.</strong> Bought on a stall, it came blank and taught nothing.
  Score recipes are now named after their tune too ("Score Recipe: Binks' Sake").</li>
<li>
<p><strong>Merchant ships, whole.</strong> The Amethyst Pearl House's swan has its eyes and its bill again (and no longer drops
  one on the deck when the ship arrives), every merchant ship has the two lanterns it was missing on its rail, and
  the wrecks no longer leave a rug floating over a hole.</p>
</li>
<li>
<p><strong>Auction House, safer.</strong> A sale, a listing or a collection is now written to disk at once: a server that stops
  suddenly no longer brings back a lot that was already sold, or a price that was already collected. A damaged
  market file no longer empties the whole market. A player in creative mode with a full inventory no longer loses
  what he collects. A lot can no longer be listed at a price nobody could pay.</p>
</li>
<li>
<p><strong>Treasure chests are buried in the ground again, not in the trees.</strong> A map whose X lay under a tree had its chest
  stuck in the leaves, above the player's head. The chest now goes into the ground under the tree, as the map says.</p>
</li>
</ul>
</div>

## 0.2.0: beta { #v0-2-0 }

<small>Released 2026-09-27 · [Download](https://www.curseforge.com/minecraft/mc-mods/cruise-cruise-no-mi/files/8990337)</small>

<div class="changelog-body" markdown="0">
<p><strong>The sea comes alive.</strong> A merchant ship drops anchor near you now and then, with the best of every stall and a crew
that guards its cargo; a Sea King surfaces off the coast; wrecks drift in with a Sea King circling the best of them.
The trades get their titles, the Musician a grand piano and finer instruments, and four lost tunes to find.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi</strong> 0.11.5 and <strong>AkumaLib 2.8.0</strong> or newer (was
2.7.0). Client and server.</p>
<p>⚠️ <strong>A beta</strong>: everything here is playable, but numbers (how often the events come, what they carry) may still move
with your feedback. The merchant ship, the Sea King and the wrecks can each be turned off, or made to come more or less
often, in <code>config/inocruise-common.toml</code>.</p>
<hr />
<h3>New</h3>
<ul>
<li><strong>Profession titles.</strong> Every trade gives a title at levels 25, 50, 75 and 100, the last one a nod to the story:
  Chef of the Baratie, Soul King, Mapmaker of the World, Galley-La Foreman... Wear the one you like from the new
  <strong>Titles</strong> plank of the character screen, and it shows after your name in the player list.</li>
<li><strong>Fourteen new challenges</strong>, one for reaching level 100 in each trade.</li>
<li><strong>New profession icons</strong>: every trade has a round medallion in its own colour.</li>
<li><strong>Fine and Master's instruments.</strong> The Inventor can now improve the Bamboo Flute, the Violin and the Guitar, first into
  a Fine one, then into a Master's one: they carry further, their tunes last longer, and they look the part, gilded,
  the Master's ones in black lacquer.</li>
<li>
<p><strong>The grand piano.</strong> The Inventor builds a Grand Piano, then a Fine and a Master's one. Place it with its stool
  (it takes 2 x 4 blocks), sit down and play a score: its music carries further and lasts longer than any instrument
  you carry, for the whole crew on board.</p>
</li>
<li>
<p><strong>Four lost tunes.</strong> Their score recipes are not learned by level: find them in Mine Mine no Mi's and the world's
  chests, on merchants' stalls or as contract rewards, then read one to learn it. The Moonlight Serenade gives night
  vision, Laboon's Song lets you breathe under water, Binks' Sake makes harmful effects wear off twice as fast, and
  the Drums of Liberation give quicker blows and a stance nothing knocks back.</p>
</li>
<li>
<p><strong>The merchant ship.</strong> Every four to seven days a merchant ship drops anchor near a player, off a village, a coast
  or out at sea, and stays for a day. Everyone is told in the chat when it arrives and an hour before it leaves, and
  Mine Mine no Mi's barkeepers can sell you the rumour of where it lies. Row out, climb the rope ladder and meet the
  Ship Merchant: the best of every merchant's stall, torn maps and score recipes more often than ashore, and big
  orders from every trade, well paid and always with something extra. When it sails, it takes everything aboard with
  it.</p>
</li>
<li><strong>The merchant ship's crew.</strong> A boatswain and three or four deckhands sail with the Ship Merchant and guard his
  cargo. They leave you alone while you trade and look around, but take anything from the ship's chests or barrels, or
  break one, and the whole crew comes for you, and the merchant won't deal with you again until the ship sails. They
  are tough: a deckhand fights like a Marine brute, the boatswain like a captain.</li>
<li><strong>Cargo worth the risk.</strong> The ship's chests and barrels hold a few goods of the trades, mostly common ones, with some
  Belly now and then and the odd torn map. And somewhere in the hold, one chest may hold a Devil Fruit box.</li>
<li><strong>Five merchant houses.</strong> Each merchant ship now belongs to one of five houses, the Sunward Company, the Verdant
  Isles Company, the Crimson Compass Guild, the Lagoon Traders and the Amethyst Pearl House. Each has its own ship,
  with its own woods, colours, mark on the main sail and figurehead (a gull, a sea turtle, a lion, a dolphin, a swan),
  and a crew dressed in its colour. The arrival message and the barkeepers' rumours name the house, and so does the
  name over its merchant's head.</li>
<li><strong>A Sea King surfaces.</strong> Every week or so a Sea King is sighted off a coast and roams there for two days. Everyone is
  told, and the barkeepers know where. It only goes for whoever swims or sails out onto its water, and gives its
  scales, fins, crest and meat, the same as one pulled up on a line.</li>
<li><strong>A wreck adrift.</strong> Now and then the wreck of a merchant house's ship drifts in off a coast, masts snapped and hold
  flooded, and sinks a day later. Most have been picked over: half their chests are empty. But one wreck in four has a
  Sea King circling it, and that one is worth the fight: its cargo is still aboard, with torn maps more often than
  anywhere else, and its hidden chest holds a Devil Fruit box twice as often as a merchant ship's.</li>
</ul>
<h3>Changes</h3>
<ul>
<li><strong>Treasure chests no longer stay behind.</strong> Once opened, a treasure chest goes away as soon as it is empty, or five
  minutes later if it is not. Whatever is still inside drops on the ground, and the ground it was buried in is put
  back.</li>
</ul>
<h3>Fixes</h3>
<ul>
<li><strong>The Invisible Swallowtail</strong> now shows up twice as often around a Hunter with the level 25 perk, as the Golden
  Hercules does.</li>
<li><strong>Clearer texts</strong>: the Kuuigosu hull says it rides a little faster, the Fisher's perk and the line upgrades say they
  help every fish of this addon, and a creature too quick for your net tells you which net can catch it.</li>
</ul>
</div>

## 0.1.0 { #v0-1-0 }

<small>Released 2026-09-26 · [Download](https://www.curseforge.com/minecraft/mc-mods/cruise-cruise-no-mi/files/8980720)</small>

<div class="changelog-body" markdown="0">
<p>The first release. A Forge addon for <strong>Mine Mine no Mi</strong> that brings the professions and the island life of
<em>One Piece: Unlimited Cruise 2</em>: <strong>fourteen trades</strong> to learn, each with its own workstation, its perks and its
advancements - fish and creatures to catch, the game's dishes to cook, tools, weapons, clothes, boats and music to
make, merchants to sell to, maps to follow. Names, recipes and art follow the game.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi</strong> 0.11.5 and <strong>AkumaLib 2.7.0</strong> or newer. Client and
server. JEI or EMI recommended: every workstation, fish, creature and find shows in them.</p>
<p>⚠️ <strong>Solo or Crew</strong>: in single player every trade is yours; on a dedicated server each player <strong>chooses one</strong>, in
Mine Mine no Mi's character creator, and the crew shares out the work. The server can change it.</p>
<p>⚠️ <strong>Some of the base mod's recipes move to the trades</strong>: its weapons (Jitte, Mace, Pipe, Scissors, Cannon, bullets,
handcuffs...) are made by the <strong>Blacksmith</strong>, the Clima-Tacts by the <strong>Inventor</strong>, the Umbrella, Medic Bag and Flag by
the <strong>Tailor</strong>. A server can put them back on the crafting table in <code>config/inocruise-common.toml</code>.</p>
<hr />
<h3>The trades</h3>
<ul>
<li><strong>Fisher</strong> - 37 fish with their sizes, by biome and depth, up to the lava; better rods and rod parts; the <strong>Sea
    Kings</strong>, fought and landed from level 44.</li>
<li><strong>Hunter</strong> - some thirty creatures caught with the net or in traps, in every land and underground; the <strong>Tannery</strong>
    (leather, lanterns, bait, lures, a specimen case).</li>
<li><strong>Farmer</strong> - seven fruit trees, plantations (rice, bitter grass, cactus, herbs, mushrooms), golden orchards in the sky.</li>
<li><strong>Cook</strong> - the game's 29 dishes at the <strong>Kitchen</strong>, of three qualities, each with a meal buff.</li>
<li><strong>Inventor</strong> - the game's tools and dials at the <strong>Workshop</strong>: reels, sieves, nets, traps, their parts, and the
    instruments the Musician plays.</li>
<li><strong>Chemist</strong> - remedies, powders and battle balls at the <strong>Laboratory</strong>, up to the Rumble Ball.</li>
<li><strong>Miner</strong> - finds in the rock, from Iron Scrap to diamonds, and the <strong>Masonry</strong>.</li>
<li><strong>Lumberjack</strong> - three great trees of the story: the Kuuigosu, the Burning Tree and the colossal Treasure Tree Adam.</li>
<li><strong>Carpenter</strong> - boats of four hulls and four shapes at the <strong>Shipyard</strong>, hull parts, lockers, the Auction House.</li>
<li><strong>Blacksmith</strong> - the base mod's weapons nobody could make, at the <strong>Forge</strong>, up to Brook's Soul Solid.</li>
<li><strong>Tailor</strong> - a hundred hats, capes, masks and every character outfit of the base mod, at the <strong>Sewing Table</strong>, and
    the boats' sails.</li>
<li><strong>Merchant</strong> - better prices, contracts, the Auction House, and <strong>treasure hunts</strong>: torn maps to decipher, a chest
    at the X, now and then a Devil Fruit box.</li>
<li><strong>Navigator</strong> - the <strong>Log Pose</strong>, the <strong>Barometer</strong>, <strong>Sea Charts</strong> to the nearest village, wreck or Marine base,
    the <strong>Eternal Pose</strong>, and a <strong>log book</strong> of every land and place you have seen.</li>
<li><strong>Musician</strong> - scores in three tiers, played on a flute, a violin or a guitar, to buff your whole crew.</li>
</ul>
<h3>Across the trades</h3>
<ul>
<li><strong>Levels and perks</strong>: every trade has its own curve and perks along the way; its page in the profession book (K)
    shows what each level unlocks.</li>
<li><strong>Five merchants</strong> come to villages and the wild - the Fishmonger, the Hunting Merchant, the Travelling Cook, the
    Prospector and the Materials Trader - and buy what the trades make, for <strong>Belly</strong>. Each brings <strong>contracts</strong>.</li>
<li><strong>The Auction House</strong>: one market for the whole server.</li>
<li><strong>The Bestiary</strong> and <strong>the log book</strong>: every fish, creature, land and place you find, with rewards as you fill them.</li>
<li><strong>Potion of Forgetting</strong> (Crew mode): change trade, starting over.</li>
<li><strong>Advancements</strong>: a tab per trade, 185 in all, and Jack of All Trades for whoever reaches level 5 in all fourteen.</li>
</ul>
<h3>Configuration</h3>
<ul>
<li><code>config/inocruise-common.toml</code>: how often the merchants come, and which base-mod recipes stay on the crafting table.</li>
<li><code>&lt;world&gt;/serverconfig/akumalib-server.toml</code> (AkumaLib): Solo or Crew, and how fast each trade levels.</li>
</ul>
</div>

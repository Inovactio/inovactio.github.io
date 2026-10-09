# Changelog

Every Cruise Cruise no Mi release for Minecraft 1.20.1, newest first, as published on [CurseForge](https://www.curseforge.com/minecraft/mc-mods/cruise-cruise-no-mi/files/all).

## 0.4.0: beta { #v0-4-0 }

<small>Released 2026-10-09 · [Download](https://www.curseforge.com/minecraft/mc-mods/cruise-cruise-no-mi/files/9109571)</small>

<div class="changelog-body" markdown="0">
<p><strong>The world answers back.</strong> Villages now grow in five lands, each in its own look, and one place in four is a walled
town with its guards, its market hall, its inn and its warehouse. A village has a town hall and a flag: it can be
won by trust, by fear or by force, raided, defended, and it mends itself after a fight. And things happen out in
the world: a floating restaurant and its cooking contest, a fishing tournament, a ghost ship in the fog, storms at
sea, a ship in distress, migrations, schools of fish, a falling star. A guide book says where to start.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi</strong> 0.11.5 and <strong>AkumaLib 4.3.0</strong> (was 4.0.0). Client
and server.</p>
<p>⚠️ <strong>AkumaLib 4.3.0 is needed - the latest one. Update AkumaLib first.</strong> With an older AkumaLib the game does not
start: Forge's screen says that Cruise Cruise no Mi asks for AkumaLib 4.3.0 or above. Get it on its
<a href="https://www.curseforge.com/minecraft/mc-mods/akumalib">CurseForge page</a>; the other addons that use AkumaLib go
on working with it.</p>
<p>⚠️ <strong>Update the server and every player together.</strong> The network protocol changed, AkumaLib's and Cruise's: a
0.4.0 client cannot join a 0.3.1 server, nor the other way round.</p>
<p>⚠️ <strong>Your worlds.</strong> A world made with 0.3 opens as it is. What is new in the villages - the looks of the four new
lands, the town halls, the towns - appears in land that has not been explored yet: villages already made keep
their shape. Minecraft's own villages no longer generate in new land (a setting brings them back, see <em>Changed</em>).</p>
<p>⚠️ <strong>A beta</strong>: everything here is playable, but numbers (how often the events come, what they pay) may still move
with your feedback. Each event can be turned off, or made to come more or less often, in
<code>config/inocruise-common.toml</code>.</p>
<hr />
<h3>New: the Cruise Guide</h3>
<ul>
<li><strong>The Cruise Guide.</strong> A book that says where to start. Its first pages list the chapters: one for each of the
  fourteen trades, and others on getting started, Solo and Crew, trade, the collections, the villages and what
  happens out in the world. Open a chapter and its sections are listed on the left page - for a trade: what it
  is, how to start, what pays, what comes later - and the one you click is told on the right page, with the
  bench's recipe drawn where there is one. Every player is handed a guide, once, the next time he comes into the
  world; lose it, and a book and a sheet of paper make another. It opens again where you closed it.</li>
<li><strong>A Guide plank on every trade's page</strong> of the professions book opens the guide at that trade's chapter.</li>
<li>Whether the guide is handed out is a setting (<code>guide</code> in <code>inocruise-common.toml</code>).</li>
</ul>
<h3>New: out in the world</h3>
<ul>
<li><strong>The notice board tells the news.</strong> A village's board now has two notes: the day's orders, and the <strong>news</strong> -
  every event running within 2 000 blocks, told as a barkeeper would tell it, with how long it still lasts. A ship
  at anchor gives its coordinates; a school of fish, a fallen star, a migration, a storm or the fog give a way and
  a distance, as their announcements do. It costs nothing: you only have to come and read.</li>
<li><strong>The floating restaurant.</strong> Every nine to thirteen days a restaurant ship in the shape of a fish drops anchor near
  you for a day, off a village's port, a coast or out at sea; the chat and the barkeepers' rumours say where. Climb
  aboard by its ladders: a terrace, a lounge under the fish's head with its mouth open on the sea, a dining room, and
  upstairs a kitchen you may cook in.</li>
<li><strong>The chef's cooking contest.</strong> Each visit the head chef cooks a dish of his own, named in the news: its recipe's
  level is the score to beat. Right click him with your best dish in hand. A dish scores its recipe's level, five more
  if it is Fine, ten more if it is Superb. Reach the chef's score and you take the gold; within ten of it the silver,
  within twenty the bronze. The chef keeps the dish and pays at once: 2.5, 2 or 1.5 times its price in Belly, Cook
  XP, and four, two or one rare ingredients. A dish that takes no medal is simply paid for. One dish each visit, and
  only a Cook may enter, with a dish of a level he could cook himself.</li>
<li><strong>A new title: Golden Ladle.</strong> For whoever takes the gold.</li>
<li><strong>The head waiter.</strong> Behind the dining room's counter he buys your dishes for a fifth more than the Travelling Cook
  does, and sells what a Cook has trouble finding - rare fish, creatures and produce, a few each visit - and the
  house's own dishes, ready to eat. Dear, as any stall.</li>
<li><strong>A lively house.</strong> The restaurant comes with its people: about ten guests - nobles and well-off townsfolk in
  their best, and a few ordinary folk - most of them seated at the tables of the dining room, the lounge and the
  terrace, two or three strolling on the terrace; a pianist at a Grand Piano in the dining room, playing the
  Musician's tunes for the pleasure of it; waiters going from the counter to the tables with the dish of the day;
  kitchen hands at work upstairs about the chef. Right click any of them for a word. The piano is the house's:
  it cannot be taken.</li>
<li>How often the restaurant comes and how long it stays are settings (<code>restaurant</code> in <code>inocruise-common.toml</code>).</li>
<li><strong>The fishing tournament.</strong> Every six to nine days a judge sets up for a day on the quay of a village that has a
  port; the chat and the barkeepers' rumours say where, and name <strong>the catch of the day</strong> - something that bites in
  that village's waters, never harder to land than your Fisher's level allows. Fish where you like while the
  tournament runs, then bring your best one to the judge: right click him with it in your hand. He measures it against
  what its kind can reach: nine tenths of the way up its range of sizes takes the gold, three quarters the silver, six
  tenths the bronze - his window gives the sizes in centimetres, and tells what the catch in your hand would take. He
  hands it back and pays at once: ten, six or three times its worth, in Belly and in Fisher XP. Only a catch you
  landed yourself since the tournament began counts (its tooltip says so), and each angler has one weigh-in: pick your
  best.</li>
<li><strong>The Fishing Trophy.</strong> When the day ends, the biggest catch measured takes the trophy, if it reached silver at
  least: the fish itself mounted on a plaque, with its size, your name, the village and the day. It is handed to you
  wherever you are - at your next coming if you are away. Hang it on a wall.</li>
<li><strong>A new title: Golden Hook.</strong> For whoever takes the gold at a tournament.</li>
<li>How often tournaments are held and how long they last are settings (<code>fishingTournament</code> in <code>inocruise-common.toml</code>).</li>
<li><strong>The fog of the Florian Triangle.</strong> Every seven to ten days, at nightfall, a thick fog falls over a stretch of sea
  a few hundred blocks from a player; those near enough are told which way and about how far. From outside nothing
  shows: you find it by sailing into it. The world closes in, grey, until you see no farther than some fifteen
  blocks. Somewhere in the thick of it a ghost ship drifts - grey timbers, black sails in rags, pale lights - and
  her bell tolls: follow it. Pirates guard her. Aboard, the old cargo of a merchant's hold and torn maps; and in
  the captain's chest, in her cabin, and in the chest hidden at the bow end of her hold, now and then a torn
  legendary map - found there more often than anywhere - or the score recipe of a lost tune. At dawn the fog
  lifts, and the ship is gone with whatever was left aboard.</li>
<li>How often the fog falls and how many pirates guard the ship are settings (<code>ghostShip</code> in <code>inocruise-common.toml</code>).</li>
<li><strong>A storm at sea.</strong> Every four to seven days a storm breaks over a stretch of sea a few hundred blocks from a player,
  about a hundred blocks across in every direction, for four to six in-game hours. It is local: it rains and thunders
  only for those who are in it, and its lightning shows from afar. In it a Carpenter's boat is slower and a weak hull
  takes a blow from the waves now and then - the Burning Tree's and the Adam's hulls take none, and Iron Plating
  shields the others; a plain boat ends up breaking. Lightning can strike whoever is in the open on the water, in a
  boat or swimming - not ashore, under a roof or under water - and sets nothing on fire. And the rare fish of those
  waters bite three times as often there.</li>
<li><strong>The Barometer foretells it.</strong> Half a day before a storm at sea breaks, the Barometer says which way it is brewing,
  about how far, and in how many minutes it breaks - the Navigator knows before anyone. Everyone near enough is told
  when it breaks. While it rages the Barometer says when it will pass.</li>
<li>How often storms break, how long they rage and how early the Barometer knows are settings (<code>seaStorm</code> in
  <code>inocruise-common.toml</code>).</li>
<li><strong>A ship in distress.</strong> Every eight to twelve days a merchant house's ship, wrecked, runs aground near a player,
  and everyone is told where. Her captain stands on what is left of her deck: right-click him to see what she needs -
  192 planks (a log counts as four), 48 wool and 32 iron ingots - and to deliver what you carry. Anyone can help,
  whatever his trade. Each delivery is paid at once. When all of it is there she is whole again before your eyes -
  masts, sails and all - and her captain thanks those who delivered, each in proportion to what he brought: a
  bonus in Belly, and a share of his hold - goods of the trades, a torn rumor map, now and then an old one. The
  one who brought most also has a part of the ship - Iron Plating, a Hull Ram or a Fine Sail, sometimes a Master's
  Sail - and, rarely, a Devil Fruit box. It is handed to you wherever you are, at your next coming if you are
  away. Then she sails away. If she is not repaired within the day she sinks; what was delivered stays paid.</li>
<li>How often ships in distress come and how long they last are settings (<code>shipInDistress</code> in <code>inocruise-common.toml</code>).</li>
<li><strong>A creature migration.</strong> Every five to eight days, for one day, one of the creatures that have a rare variant
  settles in numbers where it lives, a few hundred blocks from a player: the Hercules Beetle, the Atlas Beetle, the
  Ice Stag Beetle, the Lightning Beetle, the Fire Hercules or the Swallowtail Butterfly - which is otherwise only
  ever met in a trap. Those near enough are told which creature, which way and about how far, and told again as they
  walk into it. A dozen of them are
  there at a time, and one in five is the rare one - a Golden Hercules, an Invisible Swallowtail - instead of one
  in twenty: the day to fill those pages of the Bestiary. The migration holds thirty creatures for everyone: it is
  over when the last one is caught, or moves on when its time is up. One that takes fright and flies off is not
  lost: another settles in its place.</li>
<li>How often creatures migrate, how long they stay and how many there are are settings (<code>creatureMigration</code> in
  <code>inocruise-common.toml</code>).</li>
<li><strong>A school of fish.</strong> Every three to five days a school of one fish passes off a wild coast or out at sea, a few
  hundred blocks from a player, for half a day. Those near enough are told which fish, which way and about how far -
  no coordinates: look for the sea gulls diving over it, and the water stirring under them. Cast your line in it and
  nearly every catch is that fish, bigger than usual - a good place to beat a record - and the bite comes about twice
  as fast. It is a fish of those waters that your Fisher's level can land. The school holds forty fish for everyone:
  it scatters when the last one is landed, or moves on when its time is up.</li>
<li>How often schools pass, how long they stay and how many fish they hold are settings (<code>schoolOfFish</code> in
  <code>inocruise-common.toml</code>).</li>
<li><strong>A falling star.</strong> Every fifteen to twenty days, in the night, a star falls somewhere in the wild, a few hundred
  blocks from a player. If you are within sight you see it streak across the sky and hear it strike. Everyone is told
  which way it fell and about how far - no coordinates: look for its column of smoke. The meteorite lies on the ground
  for one day: a shell of dark rock around a core of Kairoseki ore, with a few diamond, gold and emerald ores and
  a Star Core at its heart. Dig it out while it lasts; a Miner gets his usual XP and finds from it. A day later
  what is left of it crumbles to dust and the place is as it was: the star digs nothing and breaks nothing.</li>
<li><strong>A new material: the Star Fragment.</strong> The Star Core at the heart of a fallen star holds one, and it is found
  nowhere else. Only a Miner of level 50 can take it, with a diamond pickaxe or better; nobody else can break the
  Star Core, so nobody can waste it. It is kept for the master crafts of the highest levels, which are still to
  come; until then the Prospector buys it for 15,000 Belly, more than anything else he takes.</li>
<li>How often stars fall and how long they lie are settings (<code>fallingStar</code> in <code>inocruise-common.toml</code>).</li>
</ul>
<h3>New: villages</h3>
<ul>
<li><strong>Villages mend themselves.</strong> A village can now be damaged, and recovers. Whatever broke it - an ability, an
  explosion, fire, a hand - it puts itself back block by block, from the ground up, once it has been left in peace for
  three minutes: the ruins last as long as the fight, then a house is back in about half a minute. What you build in a
  village is cleared away as it mends and handed back to you, dropped where it stood - a chest with what it held. A
  village's own blocks give nothing when they break, and its chests come back empty. Breaking them by hand is a crime:
  the first two blocks in a day are warnings, the third closes the village to you and raises your bounty, as striking a
  villager does. A village whose people were all killed no longer mends: its ruins stay. A server can also leave its
  villages unprotected, or forbid all damage in them (<code>villageDamage</code> in the mod's settings).</li>
<li><strong>A town hall in every new village.</strong> The tallest house on the market square, with a stepped gable, a balcony over
  its doors and a mast on its roof. Its <strong>mayor</strong> is there by day, behind his desk: right click him and he tells you
  what his village is - its name, its people, its workshops, its port - and who is there. The <strong>flag</strong> on the mast
  says who holds the village: the Marines' where they keep a post or a base beside it, a bare mast where nobody does,
  and over a village whose people are all dead. The mayor is one of the villagers: striking him is a crime, and if he
  is killed another one comes three days later. Villages your world already has keep the shape they were made with
  and have no town hall; the coastal villages made from now on are a little wider.</li>
<li><strong>A village under your flag.</strong> A pirate crew, the Marines or the Revolutionaries can put a village that nobody holds
  under their flag: ask its mayor, in the town hall. There are two ways.</li>
<li><strong>By trust.</strong> A village takes the flag of those it trusts: twenty good turns done to it - an order delivered to
    its notice board, a help during its fever. For a crew every member's count. It then keeps 40 Belly a day for each
    villager in the town hall's coffer, with a share of what its stalls take in, and gives your group <strong>10 % off at
    its stalls</strong> (the best discount alone, never added to another). Its loyalty does not wear away with time.</li>
<li><strong>By fear.</strong> A pirate captain may threaten the mayor instead: he gives way to a bounty of 10,000 Belly for each
    villager. It is quick and it is poor: a village that fears you pays half the rent, gives no discount, its people
    step away from you, and its loyalty wears away in days unless you come back to threaten - or earn its trust,
    which good turns still do.</li>
<li><strong>Its loyalty</strong> sets the rent - a village half loyal pays half - and at nothing the flag comes down. Your own
    crimes in a village that trusts you cost it.</li>
<li><strong>The coffer</strong> is collected at the mayor: by the crew's captain, who alone takes a village or gives it back; for
    the Marines and the Revolutionaries, by whoever raised the flag.</li>
<li><strong>Your flag flies on the town hall's mast</strong> - a crew's own Jolly Roger - and your group is told what becomes of
    its villages.</li>
<li><strong>Raids.</strong> Every twenty to thirty days a village you hold is raided by your enemies: the Marines if you are
    pirates or Revolutionaries, pirates if you are Marines. Your group is told a day ahead, the mayor says so too,
    and it comes only while one of you is in the world. The raiders land at the village's edge at dusk, as many as
    the village is large, and make for the square: beat every one of them within five minutes. A bar at the top of
    the screen shows your group how many are left and how much time, and the last three are seen through walls. The
    villagers stay in and cannot be hurt; what is broken mends. A raid repelled makes a trusting village more loyal,
    and it thanks you into the coffer; one lost costs it 30 of its loyalty - and a village ruled by fear is lost at
    once. A Peaceful world has no raids.</li>
<li><strong>By force.</strong> A village with a Marine post or base is the Marines', and every Marine has the friend's price
    there: it is not won by good turns or a great bounty, but taken from them. Empty their post - or the base beside
    the village - of its soldiers, then declare your assault at the mayor's: their reinforcements land at once, twice
    as many and led by a vice admiral where the base stands. Beat them all within five minutes and the village is
    yours - ruled by fear under a crew, freed and trusting half way under the Revolutionaries. Fail, and the Marines
    settle in again: three days before another try, and a bounty on those who were there. The Marines raid such a
    village sooner, and if your flag falls there they are back.</li>
<li><strong>Pirate villages.</strong> New villages are no longer the Marines' five times in eight: three in eight have the
    Marines (one of them the large base), and two in eight are a pirate crew's - a blockhouse among the houses, with
    its crow's nest, or, in a village by the sea, their ship moored off the port, a gangway running to her from the
    foot of the lighthouse, their Jolly Roger at her masthead - and over the town hall a Jolly Roger like no other,
    each crew having its own name and its own flag. By the sea, where there is water enough for her, pirates are
    twice as many: they have the villages the Marines' post would have had. A crew's men are no friends of the
    Marines or the Bounty Hunters, whom they strike on sight; anyone else they leave alone, unless struck first.
    Such a village is taken from them as from the Marines - their den or their ship emptied, the assault declared at
    the mayor's, the rest of the crew beaten in five minutes - by another crew, by the Revolutionaries, or by the
    Marines, who free it as the Revolutionaries do. Villages already made keep whoever they had.</li>
<li><strong>Revolutionary villages.</strong> One new village in eight is the Revolutionary Army's: their flag over the town hall,
    and their camp apart from the village - three tents round a fire in a clearing, some thirty blocks from the last
    houses, with no path to it. Eight of them keep it, soldiers, brutes and a captain: fighters of their own, in
    capes, goggles and hooded cloaks. Like a crew's men they strike the Marines and the Bounty Hunters on sight and
    leave everyone else alone, unless struck first. Every Revolutionary has the friend's price in such a village.
    It is taken from them as the others are - their camp emptied, the assault declared at the mayor's, their
    reinforcements beaten in five minutes - by a crew or by the Marines. The camp is no part of the village: nothing
    mends it, and breaking it is nobody's crime. Where the land around a village is too rough or too wet for a camp,
    the village is nobody's.</li>
<li>
<p><strong>Assaults between players.</strong> On a server, a village another group of players holds can be taken from them.
    Declare your assault at its mayor's - for a crew, its captain alone: both groups are told, and the mayor says so
    to whoever asks. It takes place at dusk, a whole day later at least, and only if one of its holders is in the
    world then; otherwise it is put off to the next dusk, and after seven such dusks the village falls without a
    fight. From the declaration to the end the village's coffer is sealed and its flag cannot be struck: both are
    what is fought for. The assault is won by holding the village's square sixty seconds in a row - one of you on
    its pavement, none of them, the roofs of its well and its stalls not counting - within five minutes; a bar at
    the top of the screen shows both groups the count. Whoever is killed is out of it until it ends. Holders who are
    fewer than their assailants are joined by fighters of their own side, two for each player they lack, twelve at
    most, who strike the assailants and nobody else. Win, and the village is yours - ruled by fear under a crew,
    trusting half way under the Marines or the Revolutionaries - and its coffer with it. A village defended is the
    more loyal for it, as after a raid repelled. Afterwards the village is spared any assault for five days, and
    beaten assailants wait three before another try. A group has one assault declared at a time and may call it off
    at the mayor's, at the price of the same three days; no raid comes to a village while an assault is declared on
    it. Where players cannot fight one another, there are no assaults.
  There is no limit to the villages a group holds. All of it but the assaults between players works in a world of
  your own too.</p>
</li>
<li>
<p><strong>Villages in the desert.</strong> Cruise's villages now grow in the desert too, and there they are the desert's own:
  sandstone houses with flat roofs behind crenellated parapets, a course of terracotta set with glazed tiles, cloth
  awnings over the doors and shades on the larger roofs, a dome on the tavern and on the hall, streets and a square
  paved in sandstone, jars where the plains have barrels - no timber and no brick. Everything a village has is there
  under the new look: the square and its well, the tavern, the workshops, the windmill inland, the port, the
  lighthouse and the shipyard by the sea, the notice board, the events, the flag. Its people dress for the place:
  turbans and head cloths, long robes worn open, wide sashes, sandals. A desert village is headed by a <strong>governor</strong>,
  in his palace: who heads a village, and what his building is called, now follows the kind of village - the plains
  keep their mayor and their town hall. A pirate crew's blockhouse is of sandstone there too; the Marines' post and
  the Revolutionaries' camp are as everywhere. A village takes the look of the land around it, even when it stands
  on that land's beach. Villages already made stay as they are.</p>
</li>
<li><strong>Villages in the snowy plains.</strong> Cruise's villages grow in the snowy plains too, built for the cold: walls of
  spruce planks on a foot of stone, stone chimneys, roofs in steps that carry the snow, firewood stacked by the
  doors, lanterns on stone posts, banners over the doors, drifts against the back walls, carved ice on the square.
  The lanes stay clear under the snow. A village by a frozen sea has its port all the same: the ice takes its piers
  and its boats. Its people wear long coats, fur hats, knitted caps, scarves and mittens, and a <strong>chief</strong> heads them
  from his great hall. A pirate crew's blockhouse is built the same way; the Marines' post and the Revolutionaries'
  camp are as everywhere. Villages already made stay as they are.</li>
<li><strong>Villages in the savanna.</strong> Cruise's villages grow in the savanna too, in acacia and fired clay: walls of
  yellow or red clay, or of logs, on a foot of red clay; roofs of four slopes, far out over the walls, the larger
  ones in two tiers round a little window of orange glass; a gallery on posts over each door, a lantern under it;
  brown banners on the walls, jars of fired clay behind the houses, quays of logs, a square of beaten earth round a
  well of clay. The hall alone keeps its stepped gable, and the flag on it. Its people are bare to the waist in
  skirts of grass, their hair in a knot, a necklace of white stones at the neck, and an <strong>elder</strong> heads them from
  the Elders' Hall. A new block, the <strong>Terracotta Chimney Cap</strong>, smokes on their chimneys. Villages already made
  stay as they are.</li>
<li><strong>Villages in the taiga.</strong> Cruise's villages grow in the taiga too, built of what the forest gives: walls of rough
  stone, mossy at the foot, between posts of logs - of boards for the wooden houses -, roofs of logs laid in steps
  under a ridge beam, a lantern under each gable and the house's banner under it, boards under the eaves, a little
  roof over each door, firewood and a lantern on a stone post beside it, pumpkins behind the houses, shields along
  the hall. Its people dress as Elbaf's do - horned helmets, furs, bright tunics, braids - and a <strong>jarl</strong> heads them
  from the Longhouse. Villages already made stay as they are.</li>
<li><strong>A village stands in a clearing.</strong> No tree grows on a village's ground any more - its plots, its lanes, a town's
  wall - nor within eight blocks of it, in any land: the trees round a village are whole, and the forest begins a
  few steps from its houses. A tree you plant in a village grows as anywhere. Villages already made stay as they
  are.</li>
</ul>
<h3>New: towns</h3>
<ul>
<li><strong>Towns.</strong> One new place in four is a town: a village's square, tavern and hall with quarters round them - streets
  of houses on either side, a craftsmen's street, a row of houses behind the hall or above the port - about twice a
  village's houses, more than twice its people, and a workshop of every trade. A town stands where the land has room
  for it; elsewhere the place is the village it would have been. <strong>A town has four buildings no village has</strong>: a
  covered market hall, its stalls under a great roof on posts; a barracks, with its yard and its butts; a
  warehouse, its wide doors open on the street; and an inn, with a porch, a balcony and its sign. Each is drawn in
  the five lands' looks and furnished, and each land has its own names for them - a bazaar, a garrison, a granary
  and a caravanserai in the desert, a mead hall for an inn in the taiga; the one at the town's head says them.
  <strong>Guards</strong> live at the barracks: dressed as their land's guards are - a grey coat and a peaked cap in the plains,
  a collar of gold and a corselet of scales in the desert, a green coat and a white fur cap under the snow, hide
  and grass in the savanna, a crested helmet and a purple cape in the taiga - and each with one of Mine Mine no
  Mi's plain weapons in hand. <strong>They keep the town</strong>: each is as strong as one of Mine Mine no Mi's brutes; one of them
  is always on his round of the gates, by the lanes, by day and by night, while the others stand at their posts,
  and they take it in turns. They go for the monsters that get within the walls, for whoever strikes one of the
  town's people - and, for as long as the town is closed to him, for that player on sight. They follow nobody far
  out of their town. A blow on a guard costs double what a blow on a townsman costs. When a town you hold is
  raided - or, on a server, assaulted by other players - its guards fight beside you if it trusts you, and keep
  to their posts if it fears you. <strong>A town is walled</strong>, in what its land builds with: stone in the
  plains, sandstone in the desert, fired clay in the savanna, a palisade of peeled logs under the snow, of logs in
  their bark on a foot of stone in the taiga. The wall follows the land in steps; its gates, under a little roof,
  are always open on the town's lanes; a walk runs behind its merlons, with a ladder at each gate and a lookout at
  each corner; the windmill and its fields lie outside, and by the sea the wall stops at the shore, open on the
  port. Those who come for a town - raiders, reinforcements, a crew that assaults it - come in by its gates. What
  follows a village's people follows a town's: the rent it pays
  the flag over it, the bounty on its ruin, the raiders sent against it. A place whose name is a word is called a
  Town or a Village for what it is; "Town" comes up under a town's name as you walk in, the one at its head says so,
  the log book lists it as one, and a Sea Chart drawn to a town is named for it. Villages already made stay as they
  are, and keep their names.</li>
<li><strong>A town's market hall is where its merchants are.</strong> The Fishmonger, the Hunting Merchant, the Travelling Cook, the
  Prospector and the Materials Trader each keep a stall under the hall, and are always there: no more waiting for
  one to pass. They carry a purse twice as heavy as elsewhere and post five orders where the others post three; their
  goods, their orders and their purse are new each day. An Auction House stands by the hall's way in, open to all.
  In a village the merchants come and go as before.</li>
<li><strong>A town's inn lets rooms.</strong> Its innkeeper stands behind the counter, dressed as his land dresses: speak to him
  and take a room for the night, 500 Belly. Once it is dark, lie down in one of the inn's beds and you rise
  <strong>Rested</strong>: 10% more XP in every trade until the next dusk, on top of what a dish gives. A few seconds in bed
  are enough, even when others on the server stay up; and if the night goes by before you have had them, the room
  stays yours one night more. The inn's beds are for its guests only, and sleeping there
  does not move the place you come back to after a death. A town that is closed to you has no room for you.</li>
<li><strong>A town's warehouse buys in bulk.</strong> Its storekeeper stands by his table, dressed as his land dresses: speak to
  him to see the town's orders in bulk - five at a time, one for the Fisher, the Hunter, the Miner, the Farmer and
  the Cook, each for 16 to 32 of an everyday good. He pays a wholesale price, a little under the notice board's by
  the piece, and a quarter of the XP making the goods gave. He takes plain goods only - your Fine and Superb pieces and your
  biggest fish stay with you. Bring what you have: an order is filled in as many
  goes as it takes, and several players can fill one together, each paid for what he brings. A filled order is
  replaced the next day, one nobody fills after a week, and whoever fills an order has done the town a good turn.</li>
<li><strong>A Merchant can rent a stall in a town's market hall.</strong> The hall has a clerk, by the way in, dressed as his land
  dresses: speak to him and rent a stall for 2 000 Belly a week, paid ahead - one stall a town, in as many towns as
  you like. Lay on it what a merchant buys, on its 27 squares: the town's people buy off it every day, whether you
  are there or not - 8 pieces a day and one more every 5 Merchant levels, each for half as much again as its
  merchant gives, your own Merchant's bonus on top. Come back to the clerk to fetch the takings, which teach you
  the trade as any sale does. A stall you do not pay for again is given back: what is still on it and what it
  took in wait for you with the clerk. A town that is closed to you closes your stall for as long.</li>
<li><strong>For operators: <code>/cruise locate</code>.</strong> <code>/cruise locate town</code> and <code>/cruise locate village</code> find the nearest place of
  that size; add a land - <code>plains</code>, <code>desert</code>, <code>snowy</code>, <code>savanna</code>, <code>taiga</code> - for the nearest in that look, or give
  the land alone. <code>/cruise locate adam_tree</code> finds the nearest Adam tree. The answer gives the place's name, where
  it is and how far; click the coordinates to go there. A rare kind is far: the search may take a minute, and the
  server goes on meanwhile.</li>
</ul>
<h3>New: for the trades</h3>
<ul>
<li><strong>Big game for the Hunter.</strong> From level 30 a Hunter hunts the beasts of Mine Mine no Mi with a weapon: the Lapahn, the
  Bananawani, the gorillas, the Humandrill, the dugongs, the Fighting Fish and more, fourteen in all, one or two new
  ones every few levels up to 50. The killing blow pays Hunter XP, with a large bonus the first time, and writes the
  beast in a new <strong>Beasts</strong> section of the bestiary, which says where each one lives and has its own rewards. A tamed
  beast, a young one or one out of a spawner does not count.</li>
<li><strong>Harvests of quality.</strong> From Farmer 30 a ripe harvest comes out <strong>Fine</strong> one time in four, and from 40 <strong>Superb</strong> one
  time in ten: crops and fruit alike, everything that harvest gives. Fine and Superb produce pays the Farmer more XP,
  sells dearer, and <strong>makes better dishes</strong>: a dish now counts the quality of its produce as it counts the size of its
  fish, so a salad can be Superb too. A dish is never worse than its fish alone would make it. Produce of different
  qualities does not stack together.</li>
<li><strong>Two new crops for a seasoned Farmer.</strong> The Golden Matsutake and the Cactus Flower can now be sown: plant the one
  you found. The Golden Matsutake at Farmer 35, on dirt in the shade like the Mystery Mushroom; the Cactus Flower at
  Farmer 45, on sand like the cactus. They grow half as fast as other crops, and you still find them now and then when
  reaping mushrooms and cactus.</li>
<li><strong>The Sounding Lead</strong>, a new instrument of the Navigator (Chart Table, level 10: an iron ingot and three string).
  Use it over water, from the shore or from a boat, and it tells you how deep the water is. Fish bite by depth: your
  Fisher will want one. Anyone can use it.</li>
</ul>
<h3>New: with Sky Island</h3>
<ul>
<li><strong>Fishing in Skypiea</strong>, if you also play with <em>Mine Mine no Mi: Sky Island</em>. Its sea of clouds is now a fishing ground
  for the three fish of the sky: the Lovely Angel near the shore, the Sky Fish further out, the Giant Sky Fish over the
  deep - and they bite more often there than in water high up in the air, which still works. Any rod will do. The
  Sounding Lead reads the depth of the cloud sea too. Without Sky Island, nothing changes.</li>
<li><strong>The Golden Fruit tree grows on the heights of the Upper Yard</strong>, if you also play with <em>Mine Mine no Mi: Sky
  Island</em>: among the giant trees, up where its fruit belongs. With Sky Island it no longer grows on the mountains of the Overworld; the trees
  already there stay, and a sapling can still be planted anywhere. Without Sky Island, nothing changes.</li>
</ul>
<h3>Changed</h3>
<ul>
<li><strong>Minecraft's own villages no longer generate.</strong> A world now has Cruise's villages alone: they grow in the same
  lands, each in its land's look, and about one more in six stands where a vanilla village would have taken the
  room. With the vanilla villages go the villagers and their trades, the iron golems and the raids. Villages
  already generated stay as they are, and the log book no longer counts the vanilla villages among the places to
  find. To have both kinds, set <code>withVanillaVillages = true</code> in <code>inocruise-common.toml</code>, under <code>villages</code>; the
  older <code>vanillaVillages</code> setting is no longer read.</li>
<li><strong>Every trade now climbs at the same pace.</strong> From level 1 to 50 a trade takes about fifteen hours of work, whichever
  it is. Until now the Miner needed three times as long as the others, and the Farmer, the Fisher and the Hunter much
  less.</li>
<li><strong>Miner</strong>: an ore, and what you find in it, pays three and a half times as much XP.</li>
<li><strong>Fisher</strong>: a catch pays 40 % less XP.</li>
<li><strong>Hunter</strong>: a capture pays 20 % less XP.</li>
<li><strong>Farmer</strong>: a harvest pays half as much XP, and a plant grown old to you pays less still. It pays in full up to
    ten levels above the level it asks for, then 5 % less for each level, down to a quarter. What you sow tells you
    so in its tooltip. Grow what your level opens: from level 30, the Golden Fruit.</li>
<li>First catches and first captures, the rewards of the bestiary and of the log book, and the villages' orders pay
    as before. Your levels do not change, and neither do the prices of goods.</li>
<li>JEI and the trade book show the new XP.</li>
<li><strong>The Carpenter's first boats come sooner.</strong> The Reinforced Fishing Boat opens at level 4 (it was 8), the Cargo Boat
  at 7 (12) and the Longboat at 13 (15): no more building the same boat over and over to get started.</li>
<li><strong>Three plants come later in a Farmer's life</strong>, so that there is something new to sow all the way up: Cactus Pulp at
  level 22 (it was 12), the Lotus Seed at 28 (15), the Horrific Pear's sapling at 20 (5). What you have already planted
  stays, and reaping needs no level. They are worth more XP and more Belly than before, and their wild plants are
  rarer.</li>
<li><strong>The coconut palm has a new shape.</strong> A slender trunk, 6 to 12 blocks tall, that bends once or twice as it rises; a
  crown of fronds spread like a star, a few of them hanging; and its coconuts under the crown, against the trunk. So
  grow the palms of the beaches and of the deserts in land you have not visited yet, and the ones you plant. The palms
  that already stand in your world stay as they are.</li>
<li><strong>Lighter villages.</strong> Villagers who cannot get where they are going no longer look for a way ten times a second,
  and one who cannot get home at night stays where he is and tries again a little later. Lockers, villages' borders
  and a few other things ask less of a busy server.</li>
</ul>
<h3>Fixed</h3>
<ul>
<li><strong>Killing one of a village's people earns nothing</strong>, whoever it is, and a death that follows your blow by a moment -
  a fall, a fire, your own animals - is counted as yours.</li>
<li><strong>Setting the time by command.</strong> <code>/time set day</code> no longer upsets the villages: before, on a world a hundred days
  old, it left a village that was closed to you for a day closed for a hundred, and froze a merchant's purse and
  orders for as long. Now such a command changes the hour and leaves the count of the days alone.</li>
<li><strong>A board two players read.</strong> With several players reading the same notice board, the same doctor's list or the
  Auction House at once, each window now follows what the others do: an order taken, a remedy brought or a lot sold
  shows at once on everyone's window. Before, the others went on seeing it as it was until they clicked.</li>
</ul>
</div>

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

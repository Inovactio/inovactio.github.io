---
# Hidden search keywords: the search weighs them heavily; the page does not show them.
tags:
  - seaking
  - sea king
  - sea kings
  - fishing
  - fish
---

# Fisher

The Fisher lands the islands' own catches (fish, shellfish, crustaceans, even a whale) with an ordinary fishing rod, measures each one in centimetres, and at the top of the trade hooks the **Sea Kings** of the deep sea and fights them.

| | |
|---|---|
| Workstation | none: any fishing rod |
| Rods | made by the [Inventor](inventor.md) at the Workshop |
| Levels | 1 to 100; new catches up to level 50 |

Fisher XP comes **only** from Cruise's catches, from Sea Kings, from a [fishing tournament](../village-events.md#a-fishing-tournament)'s medals and from the Bestiary (see [Bestiary and Log Book](../bestiary-and-logbook.md)). A vanilla cod, salmon or pufferfish, and any junk or treasure, gives none.

## How a catch is decided

There is **no fishing minigame**: you cast, wait for the bite and pull in exactly as in vanilla. Cruise decides only *what* comes up.

1. When vanilla's roll gives you **a fish**, Cruise may swap it for one of its own catches. Junk and treasure are never swapped.
2. Each possible catch is checked against where your bobber is:
    - **Biome**: the biome the bobber is in. The sky fish and the lava fish ignore it.
    - **Depth**: how many blocks of water (or lava, for the lava fish) lie straight down from the bobber, up to 256. A bobber on a one-block puddle fishes at depth 1: deep-sea catches need a real column of water under the hook, not just a deep-ocean biome. The [Navigator](navigator.md#level-10-the-sounding-lead)'s **Sounding Lead** tells you that depth; anyone can use it.
    - **Height**: a few catches need the bobber above or below a height (the sky fish want y 150 and up; some cave fish want low water).
    - **Your Fisher level**: a catch above your level stays in the water.
3. Every catch that passes gets its **chance**. If the chances of everything that bites there add up to less than 100 %, each comes up with its own chance and the rest of the time you keep vanilla's fish. If they add up to more, they share the catch in proportion and you never get a vanilla fish there.
4. Anything that raises chances (see [Better odds](#better-odds)) multiplies all of Cruise's chances in that spot at once, so it pushes out vanilla fish, not other Cruise fish.

In Crew mode, a player of another trade still lands the level-1 catches (Forked-Tail Killifish, Striped Clam) but earns no Fisher XP; their catches still fill their Bestiary.

## Size

Every Cruise catch comes up with a **size in centimetres**, shown in its tooltip ("Size: 12.3 cm"). Sizes are drawn between the catch's minimum and maximum, **most often near the middle**. Two fish of different sizes don't stack.

- **Fisher XP**: a catch pays 75 % of its XP at the smallest size, up to 125 % at the biggest.
- **Price**: the Fishmonger pays 75 % of the average price for the smallest, up to 150 % for the biggest (see [Merchants and contracts](../merchants-and-contracts.md)).
- **Cooking**: a dish's quality depends on where its fish sit in their size ranges, on average: halfway up or more gives a **Fine** dish, four fifths up or more a **Superb** one. A fish with no size (bought, or given by command) counts for nothing. The quality of the [Farmer](farmer.md#harvests-of-quality)'s produce in the dish counts too, but a dish is never worse than its fish alone would make it.

The bigger-catch bonuses (rods, rod parts, the Bigger catch and Whopper talents) pull each catch toward the top of its range: a bonus of 0.35 closes 35 % of the gap between the rolled size and the maximum. Once the bonuses add up to 1, every catch comes up at the maximum size.

## The rods

Any fishing rod works, the vanilla one included. The two Cruise rods are made by the **[Inventor](inventor.md)** at the Workshop, so in Crew mode a Fisher gets them from an Inventor.

| Rod | Made from (Workshop) | Inventor level | Durability | Bigger catches | Special |
|---|---|---|---|---|---|
| Fishing Rod (vanilla) | crafting table | — | 64 | — | — |
| ![](../icons/whopper_fishing_rod.png){ .item-icon }**Whopper Fishing Rod** | Reel, Raw Iron | 5 | 128 | +0.35 | turns steel-coloured with a Whopper Rod Upgrade |
| ![](../icons/sea_king_fishing_rod.png){ .item-icon }**Sea King Fishing Rod** | Ultimate Reel, Cola | 32 | 320 | +0.50 | the only rod that fishes in **lava** |

No special rod is needed to hook a Sea King: any rod brings one up once your level and the water are right.

### Rod parts

Rod parts are made at the Workshop and fitted at the **Upgrade Bench**: the rod goes in the left slot, the part in the middle, and the fitted rod comes out on the right. The rod keeps its wear, its enchantments and its other parts, and its tooltip lists what is fitted. **Each part fits only once per rod.** Before you take the rod, the bench shows what the part does on *that* rod.

Every part fits every rod, but works best on the rod it was made for ("bigger" adds to the bigger-catch bonus, "chance" multiplies every Cruise catch's chance):

| Part (Inventor level) | on the Fishing Rod | on the Whopper | on the Sea King rod |
|---|---|---|---|
| **Fishing Rod Upgrade** (8) | bigger +0.20 | bigger +0.10 | bigger +0.05 |
| **Fishing Line Upgrade** (8) | chance ×1.50 | chance ×1.35 | chance ×1.25 |
| **Whopper Rod Upgrade** (18) | bigger +0.10 | bigger +0.25 | bigger +0.15 |
| **Sea King Rod Upgrade** (40) | bigger +0.10, chance ×1.10 | bigger +0.20, chance ×1.15 | bigger +0.30, chance ×1.25 |

With all four parts, the Whopper reaches bigger +0.90, and +1.00 with the Whopper talent (+0.10). The Sea King rod reaches +1.00 on its own. At +1.00, **every catch comes up at its maximum size**.

## Better odds

All of these multiply together and apply to every Cruise catch at once:

| Source | Effect |
|---|---|
| Fishing Line Upgrade, Sea King Rod Upgrade | see the parts table |
| The Fisher's **talents**: Good Waters (+20 %), More bites (+4 % each), Deep bites over 20 blocks of water or more and Shore bites over less than 8 (+5 % each) | added together into one factor: ×1.20 with Good Waters alone |
| **Bait** (made by the [Hunter](hunter.md) at the Tannery) | ×1.35 for 2 minutes |
| Riding a **Fishing Boat** (made by the [Carpenter](carpenter.md)) | ×1.25 |

Luck of the Sea and the Musician's Lucky Tune still work on vanilla's own fish, junk and treasure, but do not change Cruise's catch chances.

## Talents

Every 5 Fisher levels give you a **talent point** (10 at level 50, 20 at level 100). Spend them in the Fisher's web of talents, opened by the **Talents** button on the trade's page of the trades book or with the **Talents** key (**J** by default). Each talent costs one point. You can take a talent that starts the web, or one linked to a talent you already have. Small talents of one kind add up. A point stays spent until a [Potion of Second Thoughts](chemist.md#the-potion-of-second-thoughts) gives them back. See [Talents](../trades-and-levels.md#talents).

| Talent | Kind | What it gives | Linked to |
|---|---|---|---|
| Bigger catch 1 | small, start | Your catches run 3% bigger | Whopper |
| More bites 1 | small, start | Cruise fish bite 4% more often | Good Waters |
| Deep bites 1 | small, start | Fish bite 5% more often over 20 blocks of water or more | Long Line |
| Shore bites 1 | small, start | Fish bite 5% more often over less than 8 blocks of water | Low Tide |
| ![](../icons/whopper_fishing_rod.png){ .item-icon }Whopper | **major** | Your catches run 10% bigger | Bigger catch 1, Bigger catch 2, Bigger catch 3, Hook Shot, Big Catch |
| ![](../icons/forkedtail_killifish.png){ .item-icon }Good Waters | **major** | Cruise fish bite 20% more often | More bites 1, Second fish 1, More bites 2, Hook Shot, Line Snare |
| ![](../icons/sounding_lead.png){ .item-icon }Long Line | **major** | The water under your hook counts 50% deeper | Deep bites 1, Sea King slayer 1, Deep bites 2, Line Snare, Harpoon Throw |
| ![](../icons/striped_clam.png){ .item-icon }Low Tide | **major** | 25% of your shellfish come with a second | Shore bites 1, Lasting bait 1, Shore bites 2, Harpoon Throw, Big Catch |
| Bigger catch 2 | small | Your catches run 3% bigger | Whopper, Trophy Fish |
| Bigger catch 3 | small | Your catches run 3% bigger | Whopper, Good eye |
| ![](../icons/whopper_fishing_rod.png){ .item-icon }Hook Shot | **ability** | Needs a fishing rod. Cast the hook at a foe up to 16 blocks away. It hurts him and pulls him to you. Gives the ability **Hook Shot** | Whopper, Good Waters, Fighting Fisher 1 |
| ![](../icons/sea_king_fishing_rod.png){ .item-icon }Big Catch | **ability** | Needs a fishing rod. Lift a hooked foe and slam him down. It hits those around. Gives the ability **Big Catch** | Low Tide, Whopper |
| Second fish 1 | small | 2% more chance of a second fish on the line | Good Waters, Double Hook |
| More bites 2 | small | Cruise fish bite 4% more often | Good Waters, Second fish 2 |
| ![](../icons/reel.png){ .item-icon }Line Snare | **ability** | Needs a fishing rod. Your line binds a foe where he stands for 3 seconds. Gives the ability **Line Snare** | Good Waters, Long Line |
| Sea King slayer 1 | small | You hit Sea Kings 5% harder | Long Line, Sea King Hunter |
| Deep bites 2 | small | Fish bite 5% more often over 20 blocks of water or more | Long Line, Sea King slayer 2 |
| ![](../icons/sea_king_fin.png){ .item-icon }Harpoon Throw | **ability** | Throw a heavy harpoon. It hits harder a foe who is in water. Gives the ability **Harpoon Throw** | Long Line, Low Tide, Fighting Fisher 2 |
| Lasting bait 1 | small | Your bait lasts 15% longer | Low Tide, Patient Angler |
| Shore bites 2 | small | Fish bite 5% more often over less than 8 blocks of water | Low Tide, Lasting bait 2 |
| ![](../icons/golden_whale.png){ .item-icon }Trophy Fish | **major** | A catch at its top size sells 25% dearer | Bigger catch 2, Good eye |
| Good eye | small | A catch gives 5% more Fisher XP | Bigger catch 3, Trophy Fish |
| Fighting Fisher 1 | small | Your Fisher abilities hit 5% harder | Hook Shot |
| ![](../icons/fishing_line_upgrade.png){ .item-icon }Double Hook | **major** | 10% chance of a second fish on the line | Second fish 1, Second fish 2 |
| Second fish 2 | small | 2% more chance of a second fish on the line | More bites 2, Double Hook |
| ![](../icons/sea_king_head_crest.png){ .item-icon }Sea King Hunter | **major** | Sea Kings bite 2 times as often for you | Sea King slayer 1, Sea King slayer 2 |
| Sea King slayer 2 | small | You hit Sea Kings 5% harder | Deep bites 2, Sea King Hunter |
| Fighting Fisher 2 | small | Your Fisher abilities hit 5% harder | Harpoon Throw |
| ![](../icons/bait.png){ .item-icon }Patient Angler | **major** | The bite comes 15% sooner | Lasting bait 1, Lasting bait 2 |
| Lasting bait 2 | small | Your bait lasts 15% longer | Shore bites 2, Patient Angler |

The numbers after the names of small talents only tell them apart on this page: in game, small talents of one kind have the same name.

### Combat abilities

Taking an ability talent puts its ability in the **Profession** tab of the abilities screen, and you place it on your bar yourself. It costs nothing from your bag. Its small "Fighting Fisher" talents make the Fisher's abilities hit harder. Damage is on the base mod's scale, as in the ability screen.

| Ability | What it does | Needs | Cooldown | Damage | Range |
|---|---|---|---|---|---|
| **Hook Shot** | With a fishing rod in hand cast the hook at the enemy you look at. It hurts them and pulls them to you. One too big to be pulled pulls you to them | a fishing rod in hand | 8 s | 20 | 16 blocks |
| **Big Catch** | With a fishing rod in hand swing the enemy you look at up on your line and slam them down. Enemies around them are hit too | a fishing rod in hand | 15 s | 50 / 25 | 6 blocks |
| **Line Snare** | With a fishing rod in hand bind the enemy you look at with your line. They can not move for 3 seconds. A player or a boss is held half as long | a fishing rod in hand | 14 s | 10 | 12 blocks |
| **Harpoon Throw** | Throw a heavy harpoon straight ahead. It hits half as hard again an enemy who is in water | — | 10 s | 45 / 67.5 | — |

### If you had the trade before 0.5.0

The perks by level are gone. The first time you play 0.5.0, your points are put for you on the talents that took their place, level by level, as long as you have points:

| Level | Points first put on |
|---|---|
| 10 | Bigger catch 1, Whopper |
| 25 | More bites 1, Good Waters |
| 40 | Second fish 1, Double Hook |

## The catches

The catches open level by level, water by water: rivers and swamps, jungles and the lush caves, forests and seas, then warm seas, taigas, cherry groves, caves, the frozen north, the deep oceans, the sky and the lava.

How to read the table:

- **Level**: the Fisher level from which it can bite.
- **Where**: the biomes (or groups: all rivers, all oceans…) where it bites; "anywhere" means it ignores the biome. "is cloud sea" is the sea of clouds of Skypiea, which exists only with the *Mine Mine no Mi: Sky Island* mod: without it, those rows never bite (see [The sky and the sea of clouds](#the-sky-and-the-sea-of-clouds)).
- **Depth**: the blocks of water under the bobber it needs, and a height when there is one.
- **Chance**: its share of the bites vanilla would have turned into a fish, before any bonus.
- **Size**: the range in centimetres it is drawn from.
- **XP (first catch)**: the Fisher XP for an average-sized catch, and the one-time bonus the first time you land it. A catch that lives in several places (the Lovely Angel: forest waters, the sky and the sea of clouds) has a row for each, and pays its bonus once for each.

| Catch | Level | Where | Depth | Chance | Size (cm) | XP (first catch) |
|---|---|---|---|---|---|---|
| ![](../icons/forkedtail_killifish.png){ .item-icon }Forked-Tail Killifish | 1 | rivers, beaches, oceans, swamps | 1–64 | 35 % | 4–8 | 6 (50) |
| ![](../icons/striped_clam.png){ .item-icon }Striped Clam | 1 | beaches, oceans | 1–8 | 30 % | 4–9 | 6 (50) |
| ![](../icons/fist_crayfish.png){ .item-icon }Fist Crayfish | 6 | rivers, swamps | 2–64 | 30 % | 8–16 | 12 (100) |
| ![](../icons/cutie_piranha.png){ .item-icon }Cutie Piranha | 8 | jungle, sparse jungle, bamboo jungle, lush caves | 1–32 | 28 % | 15–35 | 14 (120) |
| ![](../icons/glistening_saury.png){ .item-icon }Glistening Saury | 9 | forests, oceans | 2–64 | 30 % | 25–45 | 16 (130) |
| ![](../icons/scissor_shrimp.png){ .item-icon }Scissor Shrimp | 10 | rivers, beaches, stony shore, windswept hills | 1–24 | 25 % | 10–30 | 17 (140) |
| ![](../icons/autumn_leaves_salmon.png){ .item-icon }Autumn Leaves Salmon | 11 | river, frozen river, taigas, cherry grove | 2–32 | 18 % | 45–80 | 18 (150) |
| ![](../icons/butterflyfish.png){ .item-icon }Butterflyfish | 12 | warm ocean, lukewarm ocean, deep lukewarm ocean | 3–48 | 22 % | 10–20 | 19 (160) |
| ![](../icons/pumpkin_octopus.png){ .item-icon }Pumpkin Octopus | 14 | beaches, warm ocean, lukewarm ocean | 4–32 | 16 % | 35–70 | 22 (180) |
| ![](../icons/adventure_fish.png){ .item-icon }Adventure Fish | 16 | rivers, beaches, oceans, lush caves, dripstone caves, mountains | 1–64 | 20 % | 40–90 | 24 (200) |
| ![](../icons/treasure_pargai.png){ .item-icon }Treasure Pargai | 18 | beaches, forests, warm ocean, lukewarm ocean | 2–48 | 14 % | 12–30 | 26 (220) |
| ![](../icons/bone_fish.png){ .item-icon }Bone Fish | 20 | desert, warm ocean, lukewarm ocean, deep lukewarm ocean | 1–64 | 12 % | 20–40 | 29 (240) |
| ![](../icons/smiley_jellyfish.png){ .item-icon }Smiley Jellyfish | 20 | oceans | 8–256 | 10 % | 20–40 | 29 (240) |
| ![](../icons/balloon_catfish.png){ .item-icon }Balloon Catfish | 22 | warm ocean, lukewarm ocean, deep lukewarm ocean, swamp, mangrove swamp | 6–20 | 8 % | 30–60 | 31 (260) |
| ![](../icons/lantern_trilobite.png){ .item-icon }Lantern Trilobite | 22 | lush caves, dripstone caves | 1–32 (below y 45) | 35 % | 8–18 | 31 (260) |
| ![](../icons/guidance_monkfish.png){ .item-icon }Guidance Monkfish | 24 | lush caves, dripstone caves, deep dark | 2–64 (below y 30) | 18 % | 40–90 | 34 (280) |
| ![](../icons/caltrop_starfish.png){ .item-icon }Caltrop Starfish | 25 | warm ocean, lukewarm ocean, beach, desert | 2–256 | 6 % | 15–30 | 35 (290) |
| ![](../icons/lovely_angel.png){ .item-icon }Lovely Angel | 26 | forests, cherry grove, river | 2+ | 8 % | 15–30 | 36 (300) |
| ![](../icons/lovely_angel.png){ .item-icon }Lovely Angel | 26 | is cloud sea | 1+ | 15 % | 15–30 | 36 (300) |
| ![](../icons/lovely_angel.png){ .item-icon }Lovely Angel | 26 | anywhere | 1+ (above y 150) | 10 % | 15–30 | 36 (300) |
| ![](../icons/icefish.png){ .item-icon }Icefish | 27 | frozen river, frozen ocean, deep frozen ocean, snowy plains, snowy taiga, snowy slopes, jagged peaks, frozen peaks, ice spikes | 1–64 | 20 % | 25–50 | 37 (310) |
| ![](../icons/ice_sunfish.png){ .item-icon }Ice Sunfish | 28 | cold ocean, deep cold ocean, frozen ocean, deep frozen ocean | 10–256 | 8 % | 80–180 | 38 (320) |
| ![](../icons/shark.png){ .item-icon }Shark | 30 | deep oceans | 16–256 | 5 % | 150–400 | 41 (340) |
| ![](../icons/missile_manta_ray.png){ .item-icon }Missile Manta Ray | 32 | deep oceans | 20–256 | 6 % | 150–400 | 43 (360) |
| ![](../icons/hydramandrake.png){ .item-icon }Hydramandrake | 34 | swamp, mangrove swamp | 2–256 | 4 % | 80–200 | 46 (380) |
| ![](../icons/salamandrake.png){ .item-icon }Salamandrake | 36 | desert, badlands, warm ocean, deep lukewarm ocean | 3–256 | 4 % | 40–90 | 48 (400) |
| ![](../icons/sky_fish.png){ .item-icon }Sky Fish | 38 | anywhere | 3+ (above y 150) | 8 % | 30–70 | 50 (420) |
| ![](../icons/sky_fish.png){ .item-icon }Sky Fish | 38 | is cloud sea | 3+ | 12 % | 30–70 | 50 (420) |
| ![](../icons/lava_flounder.png){ .item-icon }Lava Flounder | 40 | lava | 1–64 | 35 % | 30–70 | 53 (440) |
| ![](../icons/great_terigius.png){ .item-icon }Great Terigius | 42 | deep cold ocean, deep frozen ocean, deep ocean | 24+ | 3 % | 200–500 | 55 (460) |
| ![](../icons/giant_sky_fish.png){ .item-icon }Giant Sky Fish | 44 | anywhere | 5+ (above y 150) | 3 % | 150–350 | 58 (480) |
| ![](../icons/giant_sky_fish.png){ .item-icon }Giant Sky Fish | 44 | is cloud sea | 5+ | 5 % | 150–350 | 58 (480) |
| ![](../icons/sea_king_scale.png){ .item-icon }Sea King Scale — **summons a Sea King** | 44 | deep oceans | 20–256 | 1 % | — | 120 (1000) |
| ![](../icons/skull_knight.png){ .item-icon }Skull Knight | 45 | stony shore, windswept hills, windswept gravelly hills, river, dripstone caves | 6–64 (below y 60) | 3.5 % | 20–45 | 59 (490) |
| ![](../icons/beat_alligator.png){ .item-icon }Beat Alligator | 46 | swamp, mangrove swamp | 3+ | 2.5 % | 250–600 | 60 (500) |
| ![](../icons/burning_dragon.png){ .item-icon }Burning Dragon | 47 | lava | 2–64 | 12 % | 200–420 | 61 (510) |
| ![](../icons/sea_king_scale.png){ .item-icon }Sea King Scale — **summons a Sea King** | 47 | deep oceans | 24–256 | 0.7 % | — | 180 (1500) |
| ![](../icons/aurora_sunfish.png){ .item-icon }Aurora Sunfish | 49 | deep frozen ocean, frozen ocean, deep cold ocean | 12–256 | 2.5 % | 180–330 | 64 (530) |
| ![](../icons/golden_whale.png){ .item-icon }Golden Whale | 50 | deep oceans | 24–256 | 1.5 % | 800–1400 | 65 (540) |
| ![](../icons/sea_king_scale.png){ .item-icon }Sea King Scale — **summons a Sea King** | 50 | deep oceans | 28–256 | 0.4 % | — | 270 (2250) |

Every catch is food, like a raw cod, except two you **open**:

- **Adventure Fish** (level 16), "Use it to empty its pocket": one random item, from bone and string to, rarely, a Heart of the Sea.
- **Treasure Pargai** (level 18), "Use it to take the pearl out": one random item, from a nautilus shell and prismarine to, rarely, a Heart of the Sea.

### The sky and the sea of clouds

The **sky** catches (the Lovely Angel's second home, the Sky Fish, the Giant Sky Fish) bite in **any water at y 150 or higher**, whatever the biome. The natural place is the **sky lakes**: some of Mine Mine no Mi's sky islands now carry a lake, up to seven blocks deep, dug into their cloud ground.

If you also play with *Mine Mine no Mi: Sky Island*, Skypiea's **sea of clouds** is a fishing ground for the same three fish: the Lovely Angel near the shore (1 block deep or more), the Sky Fish further out (3 or more), the Giant Sky Fish over the deep (5 or more). They bite more often there than in water high up in the air, which still works. Any rod will do, and the Sounding Lead reads the depth of the cloud sea too. Without Sky Island, nothing changes.

### Schools, storms and tournaments

- **A school of fish** passes off a coast or out at sea every few days, for half a day. Cast your line in it and nearly every catch is that fish, bigger than usual, and the bite comes about twice as fast.
- **A storm at sea**: in it, the rare fish of those waters (the ones with a chance of 15 % or less in the table) bite **three times as often**. A storm does not bring more Sea Kings.
- **A fishing tournament** is held now and then on the quay of a village that has a port. Bring the judge your best catch of the day's fish: gold, silver or bronze pays ten, six or three times its worth, in Belly and in Fisher XP. Taking the gold earns the title **Golden Hook**, and the biggest catch of the day takes the **Fishing Trophy**, the fish itself mounted on a plaque to hang on a wall.

See Events at sea for [the schools](../events-at-sea.md#a-school-of-fish) and [the storms](../events-at-sea.md#a-storm-at-sea), and [Village events](../village-events.md#a-fishing-tournament) for the tournament.

Fishing junk can also bring up **Iron Scrap** (1–2, half the time, on top of the vanilla junk) and now and then a **Torn Rumor Map** for a treasure hunt (see [Treasure hunts](../treasure-hunts.md)). This works for everyone, with any rod.

## Lava fishing (level 40)

With the **Sea King Fishing Rod** in either hand, the bobber floats on **lava**, with smoke and flames instead of spray.

- Lava has its own loot instead of vanilla's: charcoal, blackstone, gravel, iron nuggets, Iron Scrap, gold nuggets, magma cream, obsidian, now and then a gold ingot, and magma blocks.
- The two lava fish replace that loot when they bite: the **Lava Flounder** (level 40, 1+ block of lava) and the **Burning Dragon** (level 47, 2+ blocks), in any lava, Nether included. Each pull gives a lava fish **or** a piece of lava loot, never both. Below Fisher level 40, the rod only pulls lava loot.
- Nothing burns on its way out, and the lava fish are fireproof items.

## The Sea Kings (level 44)

Sea Kings are **hooked**; the only other way to meet one is when one **surfaces on its own** off a coast for two days, announced in the chat (see [Events at sea](../events-at-sea.md#a-sea-king-surfaces)). That one is fought without a rod, and killing it pays the same Fisher XP. In a **deep-ocean** biome, with enough water straight under the bobber, a bite can bring up a Sea King instead of a fish: the line comes up empty and the beast surfaces where the hook was, with a roar. Hooking one pays Fisher XP on the spot, and much more the first time you hook each kind.

| Sea King | Level | Water under the hook | Chance | Health | Blow (damage) |
|---|---|---|---|---|---|
| **Sea King** | 44 | 20+ blocks | 1 % | 140 (70 hearts) | 8 |
| **Extra-Large Sea King** | 47 | 24+ | 0.7 % | 200 (100 hearts) | 11 |
| **Goldfish Sea King** (a giant carp) | 50 | 28+ | 0.4 % | 260 (130 hearts) | 14 |


<div class="mob-gallery " markdown>

<figure markdown>
![The Sea King (and the Extra-Large one, bigger)](../pictures/sea-king.png)
<figcaption>The Sea King (and the Extra-Large one, bigger)</figcaption>
</figure>

<figure markdown>
![The Goldfish Sea King](../pictures/goldfish-sea-king.png)
<figcaption>The Goldfish Sea King</figcaption>
</figure>

</div>

<div class="model-viewer" data-models="../../models/" data-ids="sea-king goldfish-sea-king"></div>

| Sea King | Fisher XP on the hook | First hook bonus | On the kill |
|---|---|---|---|
| Sea King | 120 | +1 000 | 900 |
| Extra-Large Sea King | 180 | +1 500 | 1 400 |
| Goldfish Sea King | 270 | +2 250 | 2 000 |

The kill XP goes to the player who lands the killing blow (arrows count), if they practise Fisher. The kill also drops 60 vanilla experience.

### The fight

A boss bar shows its name and health. It never strays more than 32 blocks from the spot where it was hooked, never comes ashore, and fights the nearest player within 32 blocks (in survival or adventure mode).

It fights in a loop:

1. **Circling**: it circles you about 9 blocks out, its back above the water.
2. **Rearing**: for about 2.25 seconds, with a bellow; the water foams along the 14-block line it will take. Halfway through it **stops turning**: step off the line.
3. **Charge**: it runs the line. Anyone it touches takes its full blow and is thrown. A boat in its way takes 100 damage: a vanilla boat breaks and throws its crew into the water; a Carpenter hull that holds keeps its crew aboard.
4. **Winded**: after the charge it lies at the surface, **3 seconds** if it hit someone, **5 seconds** if it missed. Every blow lands in full, and its body is **solid**: climb on its back and fight standing. When it comes to, it dives out from under you.

It also has two answers to where you stand:

- **Tail sweep**: against anyone within about 4.5 blocks. It winds its tail up for 1.2 seconds while the water whitens along the arc (from one flank round the back to the other), then strikes for 60 % of its blow. **Stand at its head** and the tail goes past you. It can sweep again 3 seconds later.
- **Water jet**: below **60 % health**, against a target more than 8 blocks away (up to 30). It aims for 1.25 seconds along a line of bubbles, then fires down it for 50 % of its blow. Step off the line.

Below **30 % health** it charges twice as often.

**Where to hit**: the head takes ×1.4, the chest ×1, the tail ×0.8 and the tail tip ×0.6. While it is **not** winded it takes only **half** of a melee blow and a **quarter** of an arrow's: the fight is won in the winded windows, not from the shore.

**If you leave**: with nobody within 32 blocks it waits at the surface for a minute, then dives and is gone.

### What it drops

| Sea King | Sea King Scale | Sea King Fin | Sea King Head Crest |
|---|---|---|---|
| Sea King | 4–8 | 1–2 | — |
| Extra-Large Sea King | 8–14 | 2–4 | 1 (half the time) |
| Goldfish Sea King | 12–20 | 3–6 | 1–2 |

The [Cook](cook.md) makes feasts of them (Delicacy Assortment, Meat-Lover's Delight, Roasted Meat Festival), the [Tailor](tailor.md) Arlong's Shoes, the Master's Sail and the Bastille Mask, and the [Musician](musician.md) the Hymn of Resolve scores. The Fishmonger buys a Scale for 1 500 Belly, a Fin for 4 000 and a Head Crest for 15 000 (see [Merchants and contracts](../merchants-and-contracts.md)).

## Selling your catch

The **Fishmonger**, a travelling merchant, buys Cruise's fish at prices set by how rare they are (about 30 Belly for the commonest, 20 000 for a Golden Whale of average size), times the size factor. See [Merchants and contracts](../merchants-and-contracts.md).

## Advancements

The **Fisher** tab opens at Fisher level 1: one advancement per notable catch (Clam Up, Pack a Punch, Cute but Deadly, Jaws, Head in the Clouds…), challenges for the rarest (Living Fossil, See You Later, Giant of the Skies, Where the Fire Swims, Colours of the Aurora, All That Is Gold), and **King of the Sea** for killing a Sea King. The catch advancements trigger as soon as the fish is in your inventory, however you got it.

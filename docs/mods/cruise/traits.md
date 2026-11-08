---
# Hidden search keywords: the search weighs them heavily; the page does not show them.
tags:
  - trait
  - traits
  - quality
  - flaw
  - disabledTraits
  - race trait
  - sky trait
  - dial tinkerer
  - will of d
---

# Traits

Since 0.6.0 every player is **born with 2 to 5 traits**, out of 78 (58 before 0.7.0): qualities and flaws of the body and of Haki, of the sea and the trades, of learning, reputation, crew, treasure and the hunt. They are drawn once, when the character is made (or at the next login of a player from before 0.6.0), stay through death, and are drawn so that the qualities outweigh the flaws only a little; two traits that contradict each other never come together.

- **See yours** in Mine Mine no Mi's player screen, where a sheet lists them with what each does. Since 0.7.0 it also says, under your traits, whether today's **Will of D.** is ready, or used and back tomorrow.
- **Traits of a race or of the sky** (since 0.7.0): see [below](#traits-of-the-races). They have the same chance as any other. Characters already made keep the traits they have.
- **A server can turn any trait off**: list its id in `disabledTraits`, under `traits` in the world's `serverconfig/inocruise-server.toml` (in `config/inocruise-common.toml` before 0.7.0), for example `["inocruise:blind"]`. A trait turned off is never drawn for a new character and does nothing on one who has it; they keep it, and it works again once it is turned back on. An id that names no trait is written in the log. See [Configuration](configuration.md#traits).
- **For operators**: `/traits get <player>`, `/traits set <player> <traits>` and `/traits reroll <player>`.

## Body and Haki

| Trait | | What it does | Id |
|---|---|---|---|
| **Agile** | quality | Moves 10 % faster | `inocruise:agile` |
| **Strong** | quality | Hits 20 % harder in melee | `inocruise:strong` |
| **Tough** | quality | 20 % more max health | `inocruise:tough` |
| **Keen Eye** | quality | Shots and throws deal 20 % more damage | `inocruise:keen_eye` |
| **Unbreakable** | quality | Heals much faster when fed | `inocruise:unbreakable` |
| **Lightning Quick** | quality | Moves 30 % faster and sprints longer | `inocruise:lightning_quick` |
| **Colossus** | quality | 30 % more max health and hits 20 % harder in melee | `inocruise:colossus` |
| **Gift of Haki** | quality | Haki grows 50 % faster | `inocruise:gift_of_haki` |
| **Thick Skin** | quality | Takes 10 % less damage | `inocruise:thick_skin` |
| **Reflexes** | quality | Dodges one melee hit in ten | `inocruise:reflexes` |
| **Night Eyes** | quality | Sees in the dark | `inocruise:night_eyes` |
| **Will of D.** | quality | Once a day a deadly hit leaves them standing with 1 health | `inocruise:will_of_d` |
| **Devil's Affinity** | quality | Devil Fruit abilities cool down 15 % faster | `inocruise:devils_affinity` |
| **Chilly** | flaw | 10 % slower in snow and cold places | `inocruise:chilly` |
| **Greedy** | flaw | Gets hungry 10 % faster | `inocruise:greedy` |
| **Short Sighted** | flaw | Far things are lost in a light fog and shots and throws deal 20 % less damage | `inocruise:short_sighted` |
| **Fragile** | flaw | 30 % less max health | `inocruise:fragile` |
| **Lame** | flaw | Moves 30 % slower and sprints shorter | `inocruise:lame` |
| **Blind** | flaw | Sees nothing past a few blocks unless Observation Haki is on | `inocruise:blind` |
| **Heavy** | flaw | Takes 20 % more damage from falls | `inocruise:heavy` |
| **Slow Healer** | flaw | Heals 20 % slower | `inocruise:slow_healer` |
| **Coward** | flaw | Deals 20 % less damage when below 30 % health | `inocruise:coward` |
| **Deaf** | flaw | Hears the world muffled | `inocruise:deaf` |

## The sea and the trades

| Trait | | What it does | Id |
|---|---|---|---|
| **Sea Legs** | quality | Sails 10 % faster at the helm of a boat | `inocruise:sea_legs` |
| **Green Thumb** | quality | Harvests come out Fine or Superb 10 % more often | `inocruise:green_thumb` |
| **Fine Palate** | quality | The buffs of the dishes eaten last 10 % longer | `inocruise:fine_palate` |
| **Lucky** | quality | Luckier at fishing and with loot | `inocruise:lucky` |
| **Navigator's Eye** | quality | Senses a storm at sea an hour before it breaks | `inocruise:navigators_eye` |
| **Haggler** | quality | Gets 10 % better prices from merchants | `inocruise:haggler` |
| **Charismatic** | quality | Villagers pay 10 % more for their errands | `inocruise:charismatic` |
| **Tracker** | quality | Rare creatures within 48 blocks glow for them | `inocruise:tracker` |
| **Born Fisher** | quality | Fish bite 10 % sooner | `inocruise:born_fisher` |
| **Steady Hand** | quality | Wears out tools and weapons 10 % slower | `inocruise:steady_hand` |
| **Music Lover** | quality | The tunes heard last 10 % longer | `inocruise:music_lover` |
| **Seasick** | flaw | Sick now and then aboard a boat in bad weather | `inocruise:seasick` |
| **Clumsy** | flaw | Wears out tools and weapons 20 % faster | `inocruise:clumsy` |
| **No Sense of Direction** | flaw | Compass and Log Pose needles wobble | `inocruise:no_sense_of_direction` |
| **Spendthrift** | flaw | Gets 10 % worse prices from merchants | `inocruise:spendthrift` |
| **Unlucky** | flaw | Unluckier at fishing and with loot | `inocruise:unlucky` |
| **Picky Palate** | flaw | The buffs of the dishes eaten last 10 % shorter | `inocruise:picky_palate` |

## Learning, reputation, crew, treasure and the hunt

| Trait | | What it does | Id |
|---|---|---|---|
| **Quick Learner** | quality | Earns 10 % more XP in every trade | `inocruise:quick_learner` |
| **Silver Tongue** | quality | Wins 20 % more reputation in every village | `inocruise:silver_tongue` |
| **Born Leader** | quality | His crewmates within 16 blocks deal 5 % more damage | `inocruise:born_leader` |
| **Treasure Nose** | quality | The treasure maps they reads are drawn finer and the hints reach a block further | `inocruise:treasure_nose` |
| **Beast Friend** | quality | Creatures let them a block closer and their nets and traps are spared 10 % more often | `inocruise:beast_friend` |
| **Thrifty** | quality | A craft at a workstation gives back an ingredient one time in ten | `inocruise:thrifty` |
| **Iron Stomach** | quality | No bad effect from raw or spoiled food | `inocruise:iron_stomach` |
| **Night Owl** | quality | Earns 10 % more trade XP at night | `inocruise:night_owl` |
| **Strong Swimmer** | quality | Swims 20 % faster unless they ate a Devil Fruit | `inocruise:strong_swimmer` |
| **Light Sleeper** | quality | Wakes up warned when a hostile mob comes near their bed | `inocruise:light_sleeper` |
| **Slow Learner** | flaw | Earns 10 % less XP in every trade | `inocruise:slow_learner` |
| **Bad Name** | flaw | Wins 20 % less reputation in every village | `inocruise:bad_name` |
| **Butterfingers** | flaw | A fish slips off the hook one time in twenty | `inocruise:butterfingers` |
| **Loudmouth** | flaw | Hostile mobs notice them from 20 % further | `inocruise:loudmouth` |
| **Afraid of the Dark** | flaw | 10 % slower in dark places | `inocruise:afraid_of_the_dark` |
| **Superstitious** | flaw | Weakened a while when the ghost ship's fog or a Sea King comes near | `inocruise:superstitious` |
| **Allergic** | flaw | Sneezes among flowers and is slowed now and then | `inocruise:allergic` |
| **Heavy Sleeper** | flaw | Sleeps through anything and wakes up a little hungry | `inocruise:heavy_sleeper` |

## Traits of the races

Since 0.7.0 a new character can be born with a trait of their people: 15 traits, each drawn **only for its races**. The fishmen are Mine Mine no Mi's own race; the other races come with [Race Race no Mi](../race-race-no-mi/index.md), and without it those traits are never drawn. A character who changes race keeps their old race's trait, but it does nothing.

| Trait | | What it does | Races | Id |
|---|---|---|---|---|
| **Kin of the Sea** | quality | Sea Kings never go for them until they strike them | fishmen, Wotan | `inocruise:kin_of_the_sea` |
| **Shoal Caller** | quality | Fishing in a school of fish lands one more fish one time in five | merfolk | `inocruise:shoal_caller` |
| **Hearty Eater** | quality | Food gives 20 % more saturation | giants, Wotan | `inocruise:hearty_eater` |
| **Warm Blood** | quality | Never freezes nor is slowed by the cold | Lunarians | `inocruise:warm_blood` |
| **Fearsome** | quality | A hostile creature weaker than them that goes for them flees for 5 seconds one time in four | oni | `inocruise:fearsome` |
| **Kind Soul** | quality | Their crewmates within 16 blocks heal 10 % faster | buccaneers | `inocruise:kind_soul` |
| **Quick Harvest** | quality | A ripe crop gives one more of its harvest one time in five | tontatta | `inocruise:quick_harvest` |
| **Fearless** | quality | Deals 10 % more damage when below 30 % health | modified humans | `inocruise:fearless` |
| **Light Body** | quality | Takes 20 % less damage from falls | sky people | `inocruise:light_body` |
| **Dry Skin** | flaw | 10 % slower and 10 % hungrier in hot and dry places | fishmen, Wotan | `inocruise:dry_skin` |
| **Hunted** | flaw | Pirates, Marines and bandits notice them from 20 % further | merfolk, Lunarians, buccaneers | `inocruise:hunted` |
| **Sinks the Boat** | flaw | A boat they steer sails 15 % slower | giants, Wotan | `inocruise:sinks_the_boat` |
| **Feared** | flaw | Villagers pay 15 % less for their errands | oni | `inocruise:feared` |
| **Sweet Tooth** | flaw | Food that is not sweet feeds 15 % less | tontatta | `inocruise:sweet_tooth` |
| **Sky Sick** | flaw | 10 % slower below sea level | sky people | `inocruise:sky_sick` |

## Traits of the sky

With [Sky Island](../sky-island/index.md) installed (1.0.2 or later), any character can be born with one of 5 more traits. Without Sky Island they are never drawn and do nothing.

| Trait | | What it does | Id |
|---|---|---|---|
| **Light Foot** | quality | 15 % faster on clouds | `inocruise:light_foot` |
| **Cloud Swimmer** | quality | Swims 30 % faster in the sea of clouds, even with a Devil Fruit | `inocruise:cloud_swimmer` |
| **Dial Tinkerer** | quality | A dial used is kept one time in five: Sky Island's, Mine Mine no Mi's (the item tag `inosky:dials`) and Cruise's Thunder, Jet and Tone Dials | `inocruise:dial_tinkerer` |
| **Altitude Sickness** | flaw | In Skypiea, mines 15 % slower and gets hungry 10 % faster. Never drawn for the sky people | `inocruise:altitude_sickness` |
| **Cloud Sick** | flaw | 10 % slower on clouds | `inocruise:cloud_sick` |

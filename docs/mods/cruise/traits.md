---
# Hidden search keywords: the search weighs them heavily; the page does not show them.
tags:
  - trait
  - traits
  - quality
  - flaw
  - disabledTraits
---

# Traits

Since 0.6.0 every player is **born with 2 to 5 traits**, out of 58: qualities and flaws of the body and of Haki, of the sea and the trades, of learning, reputation, crew, treasure and the hunt. They are drawn once, when the character is made (or at the next login of a player from before 0.6.0), stay through death, and are drawn so that the qualities outweigh the flaws only a little; two traits that contradict each other never come together.

- **See yours** in Mine Mine no Mi's player screen, where a sheet lists them with what each does.
- **A server can turn any trait off**: list its id in `disabledTraits`, under `traits` in `config/inocruise-common.toml`, for example `["inocruise:blind"]`. A trait turned off is never drawn for a new character and does nothing on one who has it; they keep it, and it works again once it is turned back on. See [Configuration](configuration.md#traits).
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

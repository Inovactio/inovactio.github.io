# Farmer

The Farmer plants Cruise's **fruit trees**, from the Red Fruit of the plains to the Golden Fruit of the sky islands, and sows its **crops**, from Bitter Grass to the Wilted Carrot. Only a Farmer picks and reaps them cleanly.

| | |
|---|---|
| Workstation | none: the fields and the orchards |
| Plants | 7 fruit trees and 7 crops, found wild in the world |
| Levels | 1 to 100; new trees and crops up to level 30 |

Farmer XP comes from every clean pick and every clean ripe harvest:

- **Fruit**: 4 + the tree's planting level, per fruit.
- **Crops**: 5 + the crop's level, per harvest.

## Fruit trees

There are seven fruit trees. Each has its own wood, leaves and sapling, and its fruit hangs under the leaves.

| Tree | Fruit | Grows naturally in | Farmer level to plant | Farmer XP per fruit |
|---|---|---|---|---|
| Red Fruit | ![](../icons/red_fruit.png){ .item-icon }Red Fruit | plains, sunflower plains, forests, flower forests | 1 | 5 |
| Blue Fruit | ![](../icons/blue_fruit.png){ .item-icon }Blue Fruit | birch forests, old-growth birch forests, meadows | 1 | 5 |
| Brown Fruit | ![](../icons/brown_fruit.png){ .item-icon }Brown Fruit | swamps, mangrove swamps | 5 | 9 |
| Horrific Pear | ![](../icons/horrific_pear.png){ .item-icon }Horrific Pear | swamps, mangrove swamps | 5 | 9 |
| Palm | ![](../icons/coconut.png){ .item-icon }Coconut | beaches (common), deserts (rarer) | 8 | 12 |
| Rubber Fruit | Rubber Fruit | jungles, sparse jungles, bamboo jungles | 12 | 16 |
| Golden Fruit | ![](../icons/golden_fruit.png){ .item-icon }Golden Fruit | golden orchards on the sky islands; rarely on windswept hills and in mountain biomes, at height 130 or more | 30 | 34 |

### Saplings

**Getting them.** Break the leaves of a fruit tree. As with an oak, each leaf block has an 8 % chance to drop a sapling, up to 15 % with Fortune. Shears or Silk Touch take the leaves themselves instead. A [Lumberjack](lumberjack.md) of level 40 gets saplings from leaves twice as often.

**Planting them.** A **Farmer or a Lumberjack** can plant a fruit sapling, at the level in the table. Anyone else is told "Only a Farmer or a Lumberjack can plant this." Saplings grow on dirt like vanilla ones, and bone meal works on them. Two of them take other ground too:

- the Palm also takes root in **sand**;
- the Golden Fruit also takes root in Mine Mine no Mi's **sky blocks**, the ground of the sky islands.

**The Rubber Fruit** grows on a bush, not a tree: a thin stem 3 or 4 blocks tall, with one leaf on top and one at its side. Exactly one fruit hangs under the side leaf. It isn't food: the [Inventor](inventor.md) works it.

### Picking fruit

A fruit goes through three stages before it is ripe, and is back about ten minutes after being picked. Bone meal hurries it along one stage per use. **Right-click** a ripe fruit to pick it; an unripe one says "Not ripe yet." Picking puts a new bud in its place, so a tree keeps giving.

- A **Farmer** always picks cleanly and earns Farmer XP. Sometimes a Farmer picks **two** fruits, and earns the XP for both: see [Level perks](#level-perks).
- **Anyone else** bruises the fruit half the time: nothing drops and the bud starts again, with "The fruit bruised in your hands: only a Farmer picks it cleanly."
- In Solo mode everyone is a Farmer.

A fruit needs leaves directly above it, and drops if the leaves go. A newly generated tree, or one grown from a sapling, already carries fruit at mixed stages.

The fruits are food, except the Rubber Fruit:

| Fruit | Hunger |
|---|---|
| Red, Blue and Brown Fruit, Horrific Pear | 4 |
| Golden Fruit | 6, with high saturation |
| Coconut | 3 |

### Golden orchards in the sky

The Golden Fruit belongs to the sky. Cruise adds a **golden orchard** to Mine Mine no Mi's sky islands: a lone island planted with golden fruit trees.

- In a sky-island **town**, it can be one of the islands a bridge leads to.
- A **lone** sky island is plain half the time, an orchard a quarter of the time and a sky lake the other quarter.

For worlds without the sky islands, Golden Fruit trees also grow, rarely, on windswept hills and in mountain biomes, but only at height 130 or above.

## Crops

Seven crops are sown from their own produce: you plant Bitter Grass with Bitter Grass, as you plant potatoes with potatoes.

**First seeds come from the wild.** Each crop also grows wild. Anyone can break a wild plant for its produce, but it gives no XP. The higher the crop's level, the scarcer its wild patches: one patch every (6 + the crop's level) chunks of its biomes, so Bitter Grass every 7 and the Wilted Carrot every 26.

**Sowing.** Only a Farmer can sow, at the crop's level. Anyone else is told "Only a Farmer can plant this", or "Requires Farmer level N."

| Crop | Farmer level | Soil | Wild in | Ripe harvest | Farmer XP per ripe harvest |
|---|---|---|---|---|---|
| ![](../icons/bitter_grass.png){ .item-icon }Bitter Grass | 1 | farmland | plains, sunflower plains, meadows, savannas, forests | 1–3 | 6 |
| ![](../icons/medicinal_herb.png){ .item-icon }Medicinal Herb | 3 | farmland | forests, flower forests, birch forests, jungles, sparse jungles, taigas | 1–3 | 8 |
| ![](../icons/ancient_rice.png){ .item-icon }Ancient Rice | 5 | farmland with water right beside it | swamps, mangrove swamps, rivers | 2–4 | 10 |
| ![](../icons/cactus_pulp.png){ .item-icon }Cactus Pulp | 12 | sand | deserts, badlands, eroded and wooded badlands | 1–2, plus a Cactus Flower 15 % of the time | 17 |
| ![](../icons/lotus_seed.png){ .item-icon }Lotus Seed | 15 | farmland with water right beside it | swamps, mangrove swamps, rivers, jungles, sparse jungles | 1–2 | 20 |
| ![](../icons/mystery_mushroom.png){ .item-icon }Mystery Mushroom | 18 | dirt in the shade (light 12 or less) | dark forests, old-growth spruce and pine taigas, swamps, mushroom fields | 1–2, plus a Golden Matsutake 5 % of the time | 23 |
| ![](../icons/wilted_carrot.png){ .item-icon }Wilted Carrot | 20 | farmland | savannas, savanna plateaus, windswept savannas, wooded badlands, forests, birch forests | 1–3 | 25 |

Two crops have their own names in the wild: the wild Cactus Pulp is the **Wild Cactus**, and the wild Lotus Seed the **Wild Lotus**. Wild cacti drop a Cactus Flower 25 % of the time, and wild mushrooms a Golden Matsutake 5 % of the time.

### Harvesting

Crops grow like wheat and take bone meal. When you break a **ripe** crop:

- a **Farmer** reaps it cleanly and earns XP, and sometimes gets one extra produce (see [Level perks](#level-perks));
- **anyone else** spoils the harvest half the time and gets only one produce back to replant: "The harvest spoiled in your hands: only a Farmer reaps it cleanly."

An unripe crop, or one broken by water or a piston, just drops its normal loot.

## What opens when

| Farmer level | Trees | Crops |
|---|---|---|
| 1 | Red Fruit, Blue Fruit | Bitter Grass |
| 3 | | Medicinal Herb |
| 5 | Brown Fruit, Horrific Pear | Ancient Rice |
| 8 | Palm | |
| 12 | Rubber Fruit bush | Cactus Pulp |
| 15 | | Lotus Seed |
| 18 | | Mystery Mushroom |
| 20 | | Wilted Carrot |
| 30 | Golden Fruit | |

The [Lumberjack](lumberjack.md)'s own three trees (the Kuuigosu at Lumberjack 15, the Burning Tree at 25 and the Adam at 50) are covered on the Lumberjack's page; a Farmer can't plant those.

## Level perks

| Level | Perk | What it does |
|---|---|---|
| 1 | "Bonus harvest" | a chance to pick a second fruit, or to reap one more produce from a ripe crop: 20 % at level 1, +1 % per level, up to 75 %. The Farmer's page shows your current chance |
| 10 | "Rare harvests half again as common" | the Cactus Flower and the Golden Matsutake come half again as often from the crops you reap |
| 40 | "Rare harvests twice as common" | the Cactus Flower and the Golden Matsutake come twice as often (replaces the level-10 perk) |

## Advancements

The **Farmer** tab opens at Farmer level 1 and holds 12 advancements, among them **Apprentice Farmer** at level 5.

---
# Hidden search keywords: the search weighs them heavily; the page does not show them.
tags:
  - boat
  - boats
  - ship
  - sailing
---

# Boats

The [Carpenter](trades/carpenter.md)'s boats look and steer like vanilla boats. The difference is the **hull**: it is counted in **blows** (timbers) and takes several hits before it gives, instead of breaking at the first one. There are **sixteen boats**: four hulls, each in four shapes. Anyone can ride them; only a Carpenter builds and mends them.


<div class="mob-gallery small" markdown>

<figure markdown>
![Reinforced, with a Boat Sail](pictures/reinforced-boat-sail.png)
<figcaption>Reinforced, with a Boat Sail</figcaption>
</figure>

<figure markdown>
![Kuuigosu, with a Boat Sail](pictures/kuuigosu-boat-sail.png)
<figcaption>Kuuigosu, with a Boat Sail</figcaption>
</figure>

<figure markdown>
![Burning Tree, with a Fine Sail](pictures/burning-boat-sail.png)
<figcaption>Burning Tree, with a Fine Sail</figcaption>
</figure>

<figure markdown>
![Adam, with a Master's Sail](pictures/adam-boat-sail.png)
<figcaption>Adam, with a Master's Sail</figcaption>
</figure>

</div>

In 3D: the four shapes, each in its four hulls and with or without a sail (drag to turn, scroll or pinch to zoom):

<div class="model-viewer" data-models="../models/" data-ids="boat longboat cargo-boat fishing-boat"></div>

## Hulls

The hull is what the boat is built of.

| Hull | Blows it takes | Speed | Mended with | Special |
|---|---|---|---|---|
| ![](icons/reinforced_boat.png){ .item-icon }Reinforced | 3 | normal | any planks | — |
| ![](icons/kuuigosu_boat.png){ .item-icon }Kuuigosu | 4 | a little faster, about 2 % ("Buoyant: it rides a little faster") | Kuuigosu Planks | — |
| ![](icons/burning_boat.png){ .item-icon }Burning Tree | 6 | normal | Burning Tree Planks | **Fireproof**: fire and lava do not hurt it |
| ![](icons/adam_boat.png){ .item-icon }Adam | 10 | normal | Adam Planks | — |

The Kuuigosu, Burning Tree and Adam woods come from the [Lumberjack](trades/lumberjack.md)'s great trees.

## Shapes

The shape is what the boat was built as, and gives it its name ("Kuuigosu Longboat", "Adam Cargo Boat"…).


<div class="mob-gallery small" markdown>

<figure markdown>
![Boat](pictures/reinforced-boat.png)
<figcaption>Boat</figcaption>
</figure>

<figure markdown>
![Longboat](pictures/reinforced-longboat.png)
<figcaption>Longboat</figcaption>
</figure>

<figure markdown>
![Cargo Boat](pictures/reinforced-cargo-boat.png)
<figcaption>Cargo Boat</figcaption>
</figure>

<figure markdown>
![Fishing Boat](pictures/reinforced-fishing-boat.png)
<figcaption>Fishing Boat</figcaption>
</figure>

</div>

| Shape | Seats | Hold | Notes |
|---|---|---|---|
| … Boat | 2 | none | the smallest and quickest shape |
| … Longboat | 4 | none | the widest (2 blocks); heavier, so slower |
| … Cargo Boat | 2 | 54 slots (like a double chest) | heavy and slow |
| … Fishing Boat | 2 | 27 slots | "This addon's fish bite 25% more often from it" when you fish from it (see the [Fisher](trades/fisher.md)) |

The item's tooltip lists its blows, seats and hold, the fishing bonus, "Buoyant" for a Kuuigosu hull, and every part fitted ("Fitted: …"). Boat items do not stack.

## Placing and riding

- Use the boat item on water (or on a block) to place it, as with a vanilla boat. Any parts fitted on the item go onto the boat.
- If the player who places it is a **Carpenter** with the **Stout Hull** talent, the hull gets one more blow than normal, and one more again with **Ironwood**. Iron Plating adds 2 more on top.
- Right-click to board.
- A **Cargo** or **Fishing** boat opens its hold if you right-click while sneaking, or when all its seats are taken.

!!! note "Fit parts before you place"
    Once a boat is on the water, it cannot be turned back into an item: hitting it only costs timbers, and the end of a boat is the wreck. The Upgrade Bench only takes the boat item, so fit every part first.

## Taking damage

- Every hit costs **one timber**, whatever dealt it: a fist, an arrow or a Sea King's charge.
- Passengers see "Hull X/Y" after each hit or repair. It turns red at one third or less.
- A fall of more than 3 blocks onto land costs one timber, with the crew still aboard (a vanilla boat is destroyed by that). Falling into water costs nothing.
- A Creative player's direct hit removes the boat at once.

## Wrecks and salvage

- When the last timber goes, everyone is thrown into the water and the boat becomes a **wreck**: it floats tilted on its side, seats no one, and keeps its hold.
- Right-click the wreck to **salvage** it. You get everything in the hold, 3 planks of its wood (Oak Planks for a Reinforced hull), and every part that was fitted, returned whole.
- If the wreck is hit again, or left for **5 minutes**, it sinks and its hold spills into the water.

## Mending

Only a [Carpenter](trades/carpenter.md) can mend a hull on the water. Anyone else sees "Only a Carpenter can mend a hull afloat."

- Hold a plank of the hull's wood (any planks for a Reinforced hull) and right-click a damaged boat.
- Each plank restores one timber, or **two** with the Carpenter's **Quick Mending** talent. A hull never goes above its full count.
- Each timber put back pays the Carpenter **2 XP**, twice that with **Mender's Pride**. With **Sound Timber** (and its Good plank small talents) the plank is sometimes not used up.
- The Carpenter's **Quick Repair** ability gives the hull you ride, or the one you look at, 2 timbers back with no plank, for no XP.

## Ships of Valkyrien Skies (optional)

Cruise needs no other mod for its boats. But with [Valkyrien Skies 2](https://www.curseforge.com/minecraft/mc-mods/valkyrien-skies) installed, the [Carpenter](trades/carpenter.md) also works on its ships of blocks, put together with Eureka's helm or any of Valkyrien Skies' own tools. Without Valkyrien Skies none of this is there.

- **A plan of the ship.** When a ship is assembled, Cruise keeps the plan of its blocks, where each one stands.
- **XP for building it.** The player who assembles it (the one with Eureka's helm open, or Valkyrien Skies' assembling tool in hand, within 32 blocks) earns **1 Carpenter XP a block, 200 at most**, once for a ship. A ship taken apart and put together again, the same blocks in the same places, pays nothing more.
- **Mending.** A Carpenter **crouching with a plank** on the ship puts back its missing blocks, the nearest first: 1 block for a plank, 2 with **Quick Mending**. Each block put back is **taken from your bag**, so carry the blocks the ship is made of; nothing is made from nothing. Each pays **2 Carpenter XP**, twice that with Mender's Pride, and Sound Timber may spare the plank. "Nothing missing that you carry" means you have none of the blocks it lacks. The **Quick Repair** ability does the same with no plank, for no XP.
- **Spare blocks.** A ship assembled by a Carpenter with **Stout Hull** holds **1 spare block**, 2 with **Ironwood** too. When an explosion would take a block of its plan, the block stands instead and a spare is spent. A spent spare comes back **one every 2 minutes**.

## Parts

Parts are fitted at the ![](block-models/upgrade-bench.png){ .block-mini }**Upgrade Bench**, which anyone can use: the boat item in the left slot, the part in the middle, the fitted boat on the right. Each boat takes one of each part and **only one sail**: fitting a new sail takes the old one down, and it comes back to you. How to build the bench is on the [Carpenter](trades/carpenter.md) page.

| Part | Made by | Level | From | What it does |
|---|---|---|---|---|
| ![](icons/boat_sail.png){ .item-icon }Boat Sail | [Tailor](trades/tailor.md) (Sewing Table) | 12 | 4 White Wool, 2 String, 2 Stick, 1 plank | "Faster, but only in open water" |
| ![](icons/iron_plating.png){ .item-icon }Iron Plating | [Inventor](trades/inventor.md) (Workshop) | 16 | 4 Iron Ingot, 4 Iron Scrap, 1 plank | "The hull carries 2 blows more" |
| ![](icons/hull_ram.png){ .item-icon }Hull Ram | Inventor (Workshop) | 26 | 3 Iron Ingot, 2 Pure Iron Ore, 2 Mysterious Parts, 2 planks | "A boat under way hurts what it runs down" |
| ![](icons/fine_sail.png){ .item-icon }Fine Sail | Tailor (Sewing Table) | 28 | 1 Boat Sail, 3 White Wool, 2 wings, 2 String | "Faster than a plain sail, in open water" |
| ![](icons/burst_dial.png){ .item-icon }Burst Dial | Inventor (Workshop) | 42 | 1 Jet Dial, 3 Mysterious Parts, 3 Iron Ingot, 2 Iron Scrap | "Right-click a Cola at the tiller: she leaps the way you look" |
| ![](icons/masters_sail.png){ .item-icon }Master's Sail | Tailor (Sewing Table) | 44 | 1 Fine Sail, 2 White Wool, 2 Sea King Scale, 1 Gold Ingot, 2 String | "The fastest sail, in open water" |

"Wings" means any of these [Hunter](trades/hunter.md) catches: Swallowtail Butterfly, Invisible Swallowtail, Crossbone Butterfly, Doze Evil Eye Butterfly, Giant Devil Hand Moth or Flying Penguin. "Planks" means any planks.

- **Sails** make the boat faster, **only in open water**. About every two seconds, the boat looks for water on most sides of it, 5 blocks out: on a river or in a narrow channel, the sail does nothing. A fitted sail shows on the boat as a mast with canvas across the beam: cream for the Boat Sail, white seamed with blue for the Fine Sail, red and gold for the Master's Sail.
- **Iron Plating**: two more blows.
- **Hull Ram**: while the boat is moving fast enough, it hurts living things it runs into (6 damage, at most once a second) and knocks them away. It never hurts its own passengers and does nothing to other boats.
- **Burst Dial**: the pilot right-clicks a **Cola** (Mine Mine no Mi's) while steering. The Cola is used up instead of drunk, and the boat leaps the way the pilot is looking. The dial then needs 5 seconds before it takes more ("The dial needs a moment before it will take more cola.").

## Speed

The hull, the shape, the sail and a [Navigator](trades/navigator.md) at the tiller all multiply a boat's speed. A Navigator of level 10 makes the Carpenter's boats they steer 1 % faster on any water, and 2 % from level 40 (vanilla boats get nothing). The total is capped, so these bonuses do not stack without limit.

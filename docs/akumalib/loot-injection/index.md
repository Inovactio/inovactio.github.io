# Loot injection

How your items reach loot you do not own. The answer depends entirely on the container.

| Container | What to do | Page |
|---|---|---|
| a **Devil Fruit box** (wooden, iron, golden) | **nothing**: registering the fruit is enough | [Devil Fruit boxes](devil-fruit-boxes.md) |
| a **chest** or any container that places every stack it rolled | a JSON modifier using `akumalib:roll_table` | [Chests](chests.md) |

!!! info "Why two mechanisms"
    Minecraft loot tables do not merge: two data packs providing the same table path do not add up, the last one loaded wins. So an addon cannot ship its own copy of somebody else's table. A chest can be extended from the outside by adding a roll on top of what it produced; a Devil Fruit box cannot, because it hands out a single fruit. The library therefore uses a different mechanism for each.

!!! warning "Nothing here can be checked without running the game"
    Neither `javac` nor `gradlew build` sees whether an injection fired, whether a modifier resolved, or whether an item came out. And a rate needs more than one sample: one box proves the wiring, ten start to say something about the odds.

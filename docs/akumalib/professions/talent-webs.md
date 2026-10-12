# Talent webs: points spent in a profession's network of nodes

A profession may have a **talent web**: nodes linked in a network, in which a player spends the points his levels earn. He picks his own way through it, so two masters of one trade are not the same. The classes live in `com.inovactio.akumalib.api.professions.talents`.

- A profession earns **one point every 5 levels** (`TalentWeb.LEVELS_PER_POINT`): 10 points at level 50, 20 at level 100.
- **One point a node.** A node may be taken once it is one of the web's `starts` (linked to the middle) or is linked to a node already taken.
- A point spent stays spent until your addon calls `AkumaTalents.reset`: a potion, a command, whatever you choose.

## A web is a data file

One file per profession, at `data/<namespace>/talent_webs/<path>.json` for the profession `<namespace>:<path>`. A server or a data pack can redraw a web, change its numbers, add or remove nodes, without a recompile. The server sends the webs to each player when he joins and on `/reload`.

```json
{
  "starts": ["size_1", "numbers_1"],
  "nodes": {
    "size_1": { "bonus": "bigger_catch", "value": 0.03, "x": -20, "y": -14 },
    "size_2": { "bonus": "bigger_catch", "value": 0.03, "x": -40, "y": -28 },
    "whopper": { "kind": "major", "value": 0.1, "x": -64, "y": -44, "icon": "mymod:big_rod" },
    "numbers_1": { "bonus": "bites", "value": 0.04, "x": 20, "y": -14 },
    "hook_shot": { "kind": "ability", "ability": "mymod:hook_shot", "x": 0, "y": -56, "icon": "mymod:big_rod" }
  },
  "links": [["size_1", "size_2"], ["size_2", "whopper"], ["whopper", "hook_shot"], ["numbers_1", "hook_shot"]],
  "legacy": [{ "level": 10, "nodes": ["size_1", "size_2", "whopper"] }]
}
```

| Field of a node | Default | What it is |
|---|---|---|
| `kind` | `small` | `small` (a small bonus, repeated), `major` (an effect of its own) or `ability` (a combat ability). It decides how the node is drawn. |
| `bonus` | the node's id | The key of what it gives. Several small nodes share one key and their values add up. It is also the key of its texts. |
| `value` | `1` | How much of the bonus this node gives: `0.03` for 3 %. |
| `x`, `y` | required | Where it is drawn, in GUI pixels from the web's middle, `y` downwards. |
| `icon` | none | An item drawn on a major or an ability node. |
| `ability` | none | For an ability node, the id of the ability your addon gives with it. The node is drawn with that ability's own picture, when the base mod knows the id; giving the ability is your addon's. |

`links` are pairs of node ids, read both ways. A link, a start or a legacy entry that names a node the file has not makes the **whole file** refused, with a line in the log: the profession then has no web.

!!! warning "What a node does is your code"
    The file says where a node is, what it costs to reach and how much it gives. What the bonus key `bigger_catch` *does* is your addon's: read the total where the bonus applies. A data pack can move, remove or retune a node; it cannot invent an effect.

### Texts

A node's title is `talent.<profession namespace>.<profession path>.<bonus>`, its description the same key with `.desc`. The description gets the node's value as its argument, shown as a percentage under 1 (`0.03` reads "3%"):

```json
"talent.mymod.fisher.bigger_catch": "Bigger catch",
"talent.mymod.fisher.bigger_catch.desc": "Your catches run %s bigger"
```

### A web redrawn under a player

When a player joins and after a `/reload`, his talents are put in order with the webs as they are (`AkumaTalents.settle`): a node he took that the web has no more, or that is no longer linked to the middle through his other nodes, is **given back**. Its point is his to spend again.

### Players who had the profession before its web

`legacy` lists, by level, the nodes a player's points are put on **the first time he meets the web**: what he had by his level before there was one. The steps are read lowest level first, node by node, while he has a point left and the node is open. A level-10 player above gets `size_1`, `size_2`; with a third point, `whopper`.

## Reading a player's talents

`AkumaTalents` works on both sides: a client knows what its server last told it.

```java
// where the bonus applies
double bigger = AkumaTalents.total(player, MyProfessions.FISHER.get(), "bigger_catch");
if (AkumaTalents.has(player, MyProfessions.FISHER.get(), "whopper")) {
    // the major node is his
}
```

| Method | Answers |
|---|---|
| `total(player, profession, bonus)` | the sum of the values of the nodes he took that give `bonus`; 0 with no web |
| `has(player, profession, bonus)` | whether he took a node that gives `bonus` |
| `taken(player, profession)` | the ids of the nodes he took |
| `pointsLeft(player, profession)` | the points he has left to spend |
| `canTake(player, profession, node)` | whether he may take that node now |
| `take(serverPlayer, profession, node)` | spends a point on it; false if he may not |
| `reset(serverPlayer, profession)` | gives every point of the profession back |

A profession the player does not practise (Crew mode, another trade) gives him nothing here, whatever he took in it before. A level lost takes no node back: the points left are never under 0.

## Events

On the Forge bus, on the server:

| Event | When |
|---|---|
| `TalentEvent.Taken` | a node is the player's now: `getNode()` |
| `TalentEvent.Reset` | his points of a profession were given back: `getHad()` are the nodes he had |

That is where an addon gives or takes what goes with an ability node.

## The screen

A profession with a web gets a **Talents** button on its page of the professions book, with the points left to spend, and the **Talents** key (J by default, in the AkumaLib category of Controls) opens the web of the profession read last. The web is dragged with the mouse and zoomed with the wheel; a click on a node reads it on the right, where a button spends a point on it.

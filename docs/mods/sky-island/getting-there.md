---
# Hidden search keywords: the search weighs them heavily; the page does not show them.
tags:
  - knockup
  - knock up
  - knock-up
  - geyser
  - way up
  - travel
---

# Getting there and back

## The Knock-Up Stream

A **Knock-Up Stream** is a geyser on the floor of the **deep ocean**. There is one for every island in Skypiea, beside it below: a crater of dark prismarine and tuff round the **Knock-Up Core**.

```
/locate structure inosky:knock_up_stream
```

### An eruption

| Phase | Default | What happens |
|---|---|---|
| Quiet | the rest of the cycle | a bubble column marks the geyser |
| Charge | 30 seconds | bubbles and rumbling: the warning |
| Eruption | 90 seconds | the column rises to the sky |

A cycle lasts **ten minutes** by default, and each geyser is offset in it by its own position: two geysers rarely erupt at the same moment. All three lengths are in the [configuration](configuration.md).

The column lifts **whatever is caught in it**: players, mobs, dropped items, and **boats with everyone aboard**. At the top it sends them on to Skypiea. An eruption always lasts long enough to carry somebody from the sea floor to the top, whatever the configuration says.

### The arrival

You come down on the ground or on the cloud sea, **never inside a block**. On an island with a village, the geyser sets you down in front of its **[Heaven's Gate](angel-islands.md#heavens-gate)**; a boat arrives with its riders still in it.

## The way back

Step off an island and sink through the cloud sea. Below the bottom of Skypiea you **come out high above the same place in the overworld**, with slow falling long enough to land safely — over the sea, since Skypiea only lies above the deep oceans. Boats come back too.

The height of the fall back is `return_y` in the [configuration](configuration.md).

## For operators

| Command | What it does |
|---|---|
| `/geyser` | where the nearest geyser within 64 blocks is, what it is doing and when it erupts |
| `/geyser now` | makes that geyser erupt at once |

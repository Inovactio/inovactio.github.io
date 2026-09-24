# Lines: `AkumaLines`

A line between two anchors (a rope, a thread, a tether), drawn on the client as real geometry.

```java
LineStyle style = LineStyle.builder()
        .color(0xFFD8CFB8)
        .width(0.06F)
        .ropeLength(12.0F)
        .striped(true)
        .build();

UUID line = AkumaLines.open(level, LineAnchor.hand(caster), LineAnchor.center(target), style);
// the target is reeled in; the line follows it every frame with no further packet
AkumaLines.close(level, line);
```

## Why not particles

The usual way to fake a line is to step particles along a segment on the server. That costs **one packet per step** for every client in range, and the line stays **frozen** where it was spawned: it cannot follow a hand that moves or a body being hauled in. Up close it reads as dots, not as a rope.

A line drawn with `AkumaLines` is **one packet**. An end anchored to an entity is resolved on the client every frame, with the partial tick.

## Anchors

| Factory | The end is |
|---|---|
| `LineAnchor.point(vec)` | a fixed point |
| `LineAnchor.entity(entity)` / `entity(entity, offset)` | the entity's feet, plus an offset on the world axes |
| `LineAnchor.body(entity, fraction)` / `center(entity)` | a fraction of the way up the bounding box: 0 is the feet, 1 the top |
| `LineAnchor.hand(living)` / `hand(living, hand)` | the entity's hand |

Prefer `body` to `entity` for a living target. The fraction is read against the box the client sees at render time, so the end stays at the same place on a body that shrinks or changes morph.

`hand` copies `FishingHookRenderer` in first person, so the line leaves the hand on screen. In third person it is an offset from the body yaw, scaled with the body's height.

!!! warning "The third-person hand offset is a first guess"
    `LineRenderer.HAND_SIDE`, `HAND_FORWARD` and `HAND_DROP` still have to be tuned in game.

## Style

| Builder | Default | Meaning |
|---|---|---|
| `color(argb)` | `0xFF7F6650` | the colour of the whole line; alpha is honoured |
| `endColor(argb)` | same as `color` | the colour at the `to` end, for a gradient |
| `width(blocks)` | 0.05 | width in world units (the leash is 0.025), clamped to 0.005 to 2 |
| `taut()` | yes | no gravity: a straight line |
| `sag(blocks)` | | the middle hangs this far below the straight line, at any distance |
| `ropeLength(blocks)` | | a rope of that length: slack while the ends are closer, straight once they are further apart |
| `segments(n)` | 24 | curve resolution, clamped to 1 to 64; a taut line needs only 1 |
| `fullBright(bool)` | false | ignore world light so the line glows |
| `striped(bool)` | false | darken every other segment, the way the leash reads as a twisted rope |
| `lifetime(ticks)` | 0 | the client removes the line on its own; 0 keeps it until `close` |
| `fadeOut(ticks)` | 0 | fade the alpha out over the end of the lifetime |

`ropeLength` is the setting that looks like a real line being hauled in. It uses the parabola approximation of a hanging rope, `sqrt(3·d·(L − d) / 8)`. That formula is floored at `(L − d) / 2`, so a very slack rope still hangs when its ends meet.

Every value is clamped both when the style is built and when it is decoded.

## Calls

| Call | Sent to |
|---|---|
| `open(level, from, to, style)` returns the id | players of the level within the server view distance of either end |
| `update(level, id, from, to, style)` | the same; it opens the line if the client does not have it. ⚠️ The lifetime restarts |
| `close(level, id)` | the whole level, since a player who walked away still holds the line |

All three do nothing when called on a client level, so an ability can call them without a side check.

!!! warning "A player who arrives later does not see the line"
    It was sent when the line opened. That is fine for a line lasting a second or two. Re-send a long-lived line with `update` from time to time.

!!! warning "Give a line with two point ends a lifetime"
    Apart from `close`, the client drops a line in only three cases. Its lifetime runs out. An entity end stays missing for 20 ticks. Or the player leaves the world or the dimension. A line with two point ends, no lifetime and a lost `close` stays on screen until the player disconnects. The client also keeps at most 256 lines, and drops the oldest beyond that.

## Rendering

The line is drawn at `RenderLevelStageEvent.Stage.AFTER_TRANSLUCENT_BLOCKS`. It uses the leash shader, translucent, with no culling, as **quads**. The leash's triangle strip would join two lines written into the same batch with a stray triangle.

The ribbon turns to face the camera at every point, so it keeps its full width from any angle. The leash instead draws two fixed crossed ribbons.

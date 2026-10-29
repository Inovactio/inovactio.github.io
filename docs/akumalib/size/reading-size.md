# Reading a size: `SizeScale` and its curve

Reads an entity's size from the library's `SIZE` attribute:

```java
float scale = SizeScale.get(entity);   // 1.0 when the entity has no SIZE attribute
```

The value is clamped between `SizeScale.MIN_SCALE` (`0.05`) and `SizeScale.MAX_SCALE` (`50`, a body 90 blocks high), the same clamp for the box, the eyes, the drawing and the abilities. A missing attribute, `NaN` or an infinite value all read as `1.0`.

**The curve of the size** (maintainer, 2026-10-28; `[sizeSystem]` `sizeCurveStart` 4, `sizeCurveSoftness` 2, `sizeLimit` 16):
- **The base is never bent**: the attribute's base (an entity's own size: an NPC set to 6.67 stays 6.67) times its lasting body sizes (the race x the creator's slider) and a summon's grown body (`SizeScale.base`).
- **Only what is added is bent**: forms (declared or the base mod's, whose height counts) and effects. It is free while the total stays under 4. Past `S = max(base, 4)` the total `B` becomes `S + 2 ln(1 + (B - S) / 2)`.
- **A technical limit of 16**, a guard against sizes piled up by a command or a pack.
- `SizeScale.get` is the size by the curve, `SizeScale.raw` the attribute as it adds up, and `SizeScale.real(base, total)` the curve itself. `AkumaSize.size` bends the whole total. A form's own box, eyes and model grow by `SizeScale.outsideForm` (the real size / the form's own). Read `SIZE` through `SizeScale`, never through the attribute.
- Examples:
  - a man in a form +3.44 (added) is 4.40;
  - a body of 6.67 in it is 8.67;
  - 16 past the start adds 4.39;
  - a giant (race x4) in the Deka form (18.9) is 8.27, his box 15 blocks high, not 34;
  - a man in the Deka form is 4.61 (4.72 before), in Daibutsu 5.92 (7.22).
- Nothing changes up to a total of 4.
- A softness of 0 takes the curve off; a limit of 0 takes the limit off.

To stop the library resizing an entity while something else drives its dimensions, set `SizeScale.SUSPEND_FLAG` in its persistent data; `SizeScale.isSuspended(entity)` reads it. See [What the library registers](../core-concepts/library-registrations.md#driving-an-entitys-size-yourself).

# Titles

A title is a name a player earns and may wear: shown after their name in the player list, gold on grey, `Name - Chef of the Baratie`. Players pick theirs in the **Titles** screen, the "Titles" plank of Mine Mine no Mi's character screen: titles by category, the held ones in ink, the worn one in gold, the rest greyed with how to earn them.

Titles come from three places, all alike once loaded:

- a mod's code, `AkumaTitles.register`;
- a profession's level titles, `Profession.withTitle`;
- a data pack, `data/<namespace>/titles/<path>.json`.

A player **holds** a title while its condition is met, or once a mod has granted it to them. They wear one at a time; a worn title they stop holding (a level lost, another trade chosen in Crew mode) is hidden, and comes back with it.

## Profession titles

```java
() -> new Profession(ProfessionKind.CRAFTING)
        .withTitle(25, "mymod.title.cook.25")
        .withTitle(100, "mymod.title.cook.100")
```

Each is held from its level on, in a profession the player practises, and listed in the **Professions** category, a trade's titles together. Its id is `<namespace>:profession/<path>/<level>`: `AkumaTitles.professionTitleId(profession, level)`. A profession has at most one title per level: `getTitles()` lists them as `LevelTitle(level, translationKey)`, and `getTitle(level)` gives the one granted at exactly that level, or `null`.

## A mod's titles

```java
AkumaTitles.register(Title.builder(new ResourceLocation(MODID, "sky_king"),
                Component.translatable("mymod.title.sky_king"))
        .category(new ResourceLocation(MODID, "exploration"))
        .icon(() -> new ItemStack(MyItems.CLOUD.get()))
        .description(Component.translatable("mymod.title.sky_king.how"))
        .build());
```

Register once, before the server starts (common setup). Then, on the server:

| Call | Does |
|---|---|
| `AkumaTitles.grant(player, id)` | Gives the title for good, whatever its condition. The id need not be loaded yet. |
| `AkumaTitles.revoke(player, id)` | Takes a granted title back. |
| `AkumaTitles.wear(player, id)` | Wears it, or none with `null`; refused if the player does not hold it. |
| `AkumaTitles.getWorn(player)` | The title worn, if still held. |
| `AkumaTitles.held(player)` | Every title held. |
| `AkumaTitles.refresh(player)` | Checks the conditions again and tells the client and the player list. |

The builder's other options: `iconTexture` (a square texture of any size, drawn in place of the item), `order` (lowest first, then by name), `hidden` (listed only once held), and `condition`:

| Condition | Held when |
|---|---|
| `TitleCondition.GRANTED` (default) | granted only |
| `TitleCondition.professionLevel(profession, level)` | at that level, practising the profession |
| `TitleCondition.advancement(id)` | the advancement is done |
| your own `TitleCondition` | `test(ServerPlayer)` is true |

A `Title` gives all of it back: `getName()`, `getCategory()`, `getOrder()`, `isHidden()` and `getCondition()`.

Conditions are checked again on every profession progress sync, advancement, login and reload. A condition of your own that changes at another time needs an `AkumaTitles.refresh(player)`.

A category's name is the translation of `title_category.<namespace>.<path>`, or its path, capitalised. `akumalib:professions` is listed first, `akumalib:general` (a title's default) last.

## Data pack titles

`data/mypack/titles/storm_chaser.json`:

```json
{
  "name": { "text": "Storm Chaser" },
  "description": { "text": "Sail through a storm" },
  "category": "mypack:events",
  "icon": "minecraft:trident",
  "order": 10,
  "hidden": false,
  "condition": { "type": "advancement", "advancement": "mypack:storm/chaser" }
}
```

Only `name` is needed (a text component, `translate` works too). The conditions are `{"type": "advancement", "advancement": id}`, `{"type": "profession", "profession": id, "level": n}`, and `{"type": "granted"}`, which is also what no condition means. A data pack title cannot replace a mod's; a file that does not parse is logged and skipped. `/reload` picks up changes.

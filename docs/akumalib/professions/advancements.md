# Advancements

AkumaLib fires three advancement triggers itself, from the code that levels a player, crafts at a workstation and catches a creature: an addon only writes advancement JSON.

## `akumalib:profession_level`

```json
"criteria": { "fisher_5": { "trigger": "akumalib:profession_level",
    "conditions": { "profession": "mymod:fisher", "level": { "min": 5 } } } }
```

`profession` is optional (any profession), `level` a vanilla int range. Checked on every progress sync: each XP change, a level set and every login, so a player already past the level gets it on joining.

## `akumalib:profession_craft`

```json
"criteria": { "superb": { "trigger": "akumalib:profession_craft",
    "conditions": { "item": { "nbt": "{CruiseQuality:2}" } } } }
```

Optional `profession` (the workstation's), `recipe` (its id) and `item` (a vanilla item predicate on the result **as given**, after `ProfessionCraftEvent`: NBT your addon adds there can be matched).

## `akumalib:creature_capture`

```json
"criteria": { "golden": { "trigger": "akumalib:creature_capture",
    "conditions": { "creature": { "type": "mymod:hercules_beetle" }, "variant": 1, "tool": { "items": ["mymod:traps"] } } } }
```

Optional `creature` (a vanilla entity predicate on the creature), `variant`, `tool` (an item predicate on what caught it: a net, a trap) and `released` (whether a player had put it back).

# Grafted traits

A trait is grafted on a body over its race: Germa 66's modified children (a steel skin, healing), the Seraphim's Lunarian
traits. The race stays what it is; the trait comes on top. `AkumaTraits` holds which body carries which trait, puts
their stats and size, saves them and tells the clients. It grafts nothing by itself: an addon registers traits, and an
addon's ability grafts them (Missing's Nomi Nomi no Mi). Any addon may graft any registered trait, so a race mod can
declare traits of its own without depending on the one that grafts.

```java
// common setup
AkumaTraits.register(AkumaTraits.Trait.of(new ResourceLocation(MODID, "steel_skin"))
        .tier(2)                                                                  // how hard: read by the grafting ability
        .stat(() -> Attributes.ARMOR, 4.0D, AttributeModifier.Operation.ADDITION)
        .source(e -> e.getType() == EntityType.IRON_GOLEM)                       // whose blood carries it
        .shown(SteelSkinAbility.INSTANCE));                                       // a passive, its numbers in the tooltip

AkumaTraits.register(AkumaTraits.Trait.of(giant).size(1.5D).excludes(dwarf));      // x1.5 over the race's size
AkumaTraits.register(AkumaTraits.Trait.of(lunarian).nativeTo(new ResourceLocation("racemod", "lunarian")));

// the grafting ability, server side
Optional<AkumaTraits.Refusal> why = AkumaTraits.graft(target, id);  // empty: grafted
AkumaTraits.remove(target, id);
AkumaTraits.has(entity, id);                                        // both sides
```

| Part | What it does |
|---|---|
| `stat` | A lasting attribute modifier under an id of the trait's own. |
| `size` | A body size multiplied over the race's (`AkumaSize.setBodySize`): a 1.75 race with a 1.5 trait is 2.625. |
| `source` | The creatures whose blood carries it; `AkumaTraits.sources(creature)` lists them for a syringe. |
| `excludes` | Traits it never sits with, asked both ways. |
| `nativeTo` | Races or sub-races that have it in their blood: never grafted on them. A race no mod registers is never met, so an addon may name another's. |
| `shown` | A passive ability unlocked while the trait is held, kept through the base mod's checks at login and respawn. |
| `tier` | 1 to 3, for the grafting ability to read. |

Refusals: `UNKNOWN` (no such trait), `ALREADY`, `EXCLUDED`, `NATIVE`. A refusal changes nothing.

## Stability

Server config, `[traits]`:

| Key | Default | |
|---|---|---|
| `stableTraits` | 3 | How many traits a body holds with no backlash. No hard cap beyond it. |
| `unstableHealthLoss` | 0.10 | The share of max health each trait over takes (a share, since health goes far above 20). |
| `unstableWeakening` | 0.15 | The share of every trait's numbers each trait over takes: stats and the size's share. |
| `traitsKeptOnDeath` | true | Whether a player keeps his traits when he dies. A change of dimension always keeps them. |

`AkumaTraits.strength(entity)` is what every number is multiplied by (1 while stable); what a trait does beyond stats (a
heal, an immunity) reads it too. `excess(entity)` is the count over.

## Saved and seen

The list lives in the entity's persistent data, so an NPC keeps it with its save; a player's is carried over death and
dimension changes. Every client that sees the body is told (`SyncTraitsPacket`, protocol 22) at a graft, a removal, a
login, a respawn, a change of dimension and when it comes into sight: `has` works on the client, for a layer's
`wears` filter (`WingsLayer`, the horns).

A trait's name is the lang key `trait.<namespace>.<path>`.

## Races' own traits

A race's or a sub-race's own blood (2026-11-15) is declared with `fromRaces` / `fromSubRaces`: its level is set
(`Level.RACE`, `Level.SUB_RACE`), the bodies of those races carry it, and it is never grafted on them.

```java
AkumaTraits.register(AkumaTraits.Trait.of(oni).tier(2).fromRaces(ONI_RACE).shown(ONI_LINEAGE)
        .stat(ModAttributes.PUNCH_DAMAGE, 2.0D, AttributeModifier.Operation.ADDITION));
```

- **Looks**: `AkumaHorns`, `AkumaDwarves`, `AkumaMerfolk`, `AkumaBody`, `AkumaFishmen.declareSubRace` and `AkumaMinks.declareSubRace` take a trait id as they
  take a race's: a body holding it wears that look when its own race gives none, a sub-race's trait before a race's
  (`AkumaTraits.declared`). `AkumaRacialLooks.declare(trait, entity -> race)` draws the base mod's own race features
  (a mink's ears and tail) on a player holding the trait.
- **Passive**: `TraitAbility.entry(modid, description, TraitAbility.TAIL, stage, stats...)` builds the shown passive, its
  icon `<modid>:textures/abilities/<id>.png`, so every addon's traits read alike.
- **The base mod's races** (`BaseRaceTraits`): Human Lineage (+25 % Doriki and Haki experience) and Mink Lineage (+50 %
  speed, +1.6 jump, +2.25 fall resistance, a mink's ears and tail). A fishman's is Missing's Fish-Man Strength; the cyborg
  has none.

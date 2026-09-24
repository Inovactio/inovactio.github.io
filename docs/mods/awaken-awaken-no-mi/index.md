# Awaken Awaken no Mi

**Awaken Awaken no Mi** adds **awakenings** to the Devil Fruits of [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod): new abilities, and for Zoan fruits new awakened forms, that a fruit's user gets once their fruit is awakened.

| | |
|---|---|
| Version documented | **2.0.0** |
| Mod id | `awakenawakennomi` |
| Download | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/awaken-awaken-no-mi) |

## What it adds

- **225 awakened abilities across 70 of the base mod's Devil Fruits** (full list [below](#supported-fruits)).
- **Awakened Zoan forms**: the awakened version of each supported Zoan's point forms, with their own models and animations.
- **Domains**: area abilities that change the ground around the user, such as *Kenzan World*, *Smooth World* or *Sabaku no Okoku*.
- **BakuMetal gear**: a BakuMetal Ingot and a full set of BakuMetal tools and armour, each with a crafting recipe.
- Custom status effects, particles and sounds for the new abilities.

It adds **no new Devil Fruit**: every ability here belongs to a fruit the base mod already has.

## Requirements

| Mod | Version |
|---|---|
| Minecraft | 1.20.1 |
| Forge | 47.4.18 or later |
| [Mine Mine no Mi](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-mod) | 0.11.x (built against `1.20.1-0.11.5`) |
| [AkumaLib](../../akumalib/index.md) | **2.4.0 or later** |

!!! warning "AkumaLib is required"
    AkumaLib is a library: it adds nothing you can see, but this mod is built on it. Without it, Forge stops on its missing-dependency screen. Since 2.0.0, Awaken Awaken no Mi needs AkumaLib **2.4.0 or newer**.

## Getting started

1. Install Forge for Minecraft 1.20.1, then put **Mine Mine no Mi**, **AkumaLib** and **Awaken Awaken no Mi** in your `mods` folder.
2. Eat one of the [supported fruits](#supported-fruits). Its awakened abilities are added to the fruit's kit, but stay **locked**.
3. **Awaken the fruit.** The awakened abilities unlock once the base mod considers your fruit awakened.

!!! info "This mod does not decide when a fruit awakens"
    Awaken Awaken no Mi contains the awakened forms and abilities only. The progression that awakens a fruit lives elsewhere:

    - **In survival**, install [Awaken Path](../awaken-path/index.md). It awakens a player's fruit once they reach a Doriki threshold and have kept the fruit long enough.
    - **Without Awaken Path**, a fruit can only be awakened through the base mod's commands or another addon.

## Configuration

Server-side settings live in `config/awakenawakennomi-common.toml`:

| Section | Setting | Default | What it does |
|---|---|---|---|
| `titan_trample` | `titanTrampleMaxBreakCount` | `256` | Most blocks *Titan Trample* may break in one check. Above it, nothing breaks that tick. `-1` removes the limit. |
| `yomi_yomi_no_mi` | `yomiMaxResurrections` | `-1` | Extra resurrections granted by the awakened Yomi Yomi no Mi. `-1` is unlimited, `0` keeps only the base mod's single resurrection. |
| `dai_hanpatsu` | `minDistance` / `maxDistance` | `100` / `2000` | Range, in blocks, of the *Dai Hanpatsu* teleport. |
| `dai_hanpatsu` | `maxCandidates` | `100` | Random positions tried when looking for an already explored, solid destination. |
| `godland` | `godlandForceWeather` | `true` | Whether *Godland* summons a real thunderstorm. Weather is per dimension, so it affects every player there. |
| `godland` | `godlandRestoreWeather` | `true` | Whether the previous weather comes back when the zone closes. |

## Supported fruits

| Fruit | Awakened abilities |
|---|---|
| **Awa Awa no Mi** | World Wash, Bubble Cage, Squeaky Clean |
| **Baku Baku no Mi** | Bakumetal Genesis, Armor Munch, Iron Stomach |
| **Bane Bane no Mi** | Spring Domain, Spring Fajin, Ricochet |
| **Bara Bara No Mi** | Dislocation Punch, Bara Bara Parade, Severed Grip |
| **Bari Bari no Mi** | Gods Bulwark, Barrier Eruption, Grand Repulsion |
| **Beta Beta no Mi** | Beta Beta Ocean, Beta Beta Surge, Slick Passage |
| **Bomu Bomu no Mi** | Airburst, Blast Jump, Piercing Blast |
| **Chiyu Chiyu no Mi** | Word of Recovery, Cellular Overgrowth, Overflow |
| **Deka Deka no Mi** | Titan, Titan Trample, Titan Smash |
| **Doa Doa no Mi** | Hide and Seek, Living Gate, Backdoor |
| **Doku Doku no Mi** | Venom World, Compound Hydra, Virulence |
| **Doru Doru no Mi** | Candle World, Wax Master, Wick |
| **Gasu Gasu no Mi** | Taiki, Asshuku, Chuwa |
| **Goe Goe no Mi** | High Frequency Wall, Resonating World, Broken Focus |
| **Goro Goro no Mi** | Godland, Stormstep, Storm Sovereign |
| **Gura Gura no Mi** | Tenchi Hokai, Funshin, Aftershock |
| **Hana Hana No Mi** | Diosa Fleur, Bloom Crusher, Clutch Lock |
| **Hie Hie no Mi** | Ice Epoch, Hyosai, Hyoten |
| **Hiso Hiso No Mi** | Ethereal Whisper, Call of the Wild, Eavesdrop |
| **Hito Hito no Mi** | Awaken Human Form, Insight, Adaptive Mind |
| **Hito Hito no Mi, Model: Daibutsu** | Awaken Daibutsu Point, Nyorai Shinshō, Sanctuary |
| **Horo Horo no Mi** | Hollow Shroud, Ghost Legion, Phantom Payload |
| **Horu Horu no Mi** | Hormonal Fog, Hell Wink, Iron Constitution |
| **Ito Ito no Mi** | Ever White, Break White, White Ground |
| **Jiki Jiki no Mi** | Assign World, Scrap Tempest, Ferrous Dominion |
| **Kachi Kachi no Mi** | Aura of Friction, Scalding Steam, Friction Burn |
| **Kage Kage no Mi** | Nightmare Banquet, Shadow Marionette, Sunless Brand |
| **Kame Kame no Mi** | Awaken Kame Walk Point, Awaken Kame Guard Point, Spin, Snapping Jaw |
| **Karu Karu no Mi** | Inga Samsara, Inga Impact, Karmic Return |
| **Kilo Kilo no Mi** | Gravity Zone, Infinity Kilo Punch, Weight Shift |
| **Kira Kira no Mi** | Glittering Storm, Brilliant Meteor, Unscratchable |
| **Kobu Kobu No Mi** | One Man Army, Battlefield Resonance, Never Surrender |
| **Kuku Kuku no Mi** | Living Feast, Cake Transmutation, Gourmet Metabolism |
| **Magu Magu no Mi** | Meigo no Jidai, Kagutsuchi, Netsuryo |
| **Mera Mera no Mi** | Crown of Flames, Crown Flight, Homura |
| **Mero Mero no Mi** | Love's Punishment, Enthralling Gaze, Heart Rebound |
| **Mini Mini No Mi** | Gullivers Nightmare, Lilliput Crush, Tiny Titan |
| **Mogu Mogu no Mi** | Awaken Mogu Heavy Point, Mogu Dig, Subterranean Dash |
| **Moku Moku no Mi** | White Night, White Ash, White Plague |
| **Nagi Nagi no Mi** | Total Isolation, Soundless Step, Dead Air |
| **Neko Neko no Mi, Model: Leopard** | Awaken Leopard Heavy Point, Awaken Leopard Walk Point, Shugan, Hyozan Kyousou |
| **Netsu Netsu no Mi** | Netto Jigoku, Melting Point, Scorching Fist |
| **Nikyu Nikyu no Mi** | Dai Hanpatsu, Nikyu no Itami, Ursus Calamiti |
| **Noro Noro no Mi** | Reverse Slow, Reverse Slow Smash, Noroma Field |
| **Ope Ope no Mi** | K-Room, Shock Wille, Puncture Wille, Anesthesia |
| **Ori Ori no Mi** | Spirit Seal, Iron Tether, Bound Hands |
| **Oto Oto no Mi** | Rhythmic Purgatory, Grand Finale, On the Beat |
| **Pero Pero no Mi** | Candy Transmutation, Sugar Shell, Sugar Coffin |
| **Pika Pika no Mi** | Lightfall Domain, Kousoku, Sun's Blessing |
| **Ryu Ryu no Mi, Model: Allosaurus** | Awaken Allosaurus Heavy Point, Awaken Allosaurus Walk Point, Ancient Spine Saw, Apex Pursuit |
| **Ryu Ryu no Mi, Model: Brachiosaurus** | Awaken Brachiosaurus Heavy Point, Awaken Brachiosaurus Guard Point, Brachio Stomp, Neck Catapult |
| **Ryu Ryu no Mi, Model: Pteranodon** | Awaken Pteranodon Assault Point, Awaken Pteranodon Fly Point, Tei Kasane, Downdraft |
| **Sabi Sabi no Mi** | Empire of Decay, Collapse, Oxidized Plate |
| **Sai Sai no Mi** | Awaken Sai Heavy Point, Awaken Sai Walk Point, Horn Drill, Juggernaut |
| **Sara Sara no Mi, Model: Axolotl** | Awaken Axolotl Heavy Point, Awaken Axolotl Walk Point, Cellular Overload, Toxic Bloom, Toxic Reserve |
| **Sube Sube No Mi** | Smooth World, Slick Disarm, Frictionless |
| **Sui Sui no Mi** | Waterpool Domain, Undertow, Breach |
| **Suke Suke no Mi** | Invisible Touch, Diffraction, Unseen |
| **Suna Suna no Mi** | Sabaku no Okoku, Sabaku no Sousou, Kawaki |
| **Supa Supa no Mi** | Kenzan World, Razor Cyclone, Steel Riposte |
| **Tori Tori no Mi, Model: Phoenix** | Awaken Phoenix Assault Point, Awaken Phoenix Fly Point, Ao no Rakka, Rebirth Blaze |
| **Ushi Ushi no Mi, Model: Bison** | Awaken Bison Heavy Point, Awaken Bison Walk Point, Fiddle Overdrive, Thundering Herd |
| **Ushi Ushi no Mi, Model: Giraffe** | Awaken Giraffe Heavy Point, Awaken Giraffe Walk Point, Longneck Ram, Neck Hammer |
| **Wara Wara no Mi** | Harvest of Fate, Nail of Fate, Shared Fate |
| **Yami Yami no Mi** | Kyomu, Singularity, Gluttony |
| **Yomi Yomi no Mi** | Soulchill Aura, Soul Reap, Undying Soul |
| **Yuki Yuki no Mi** | Yukiro, Gokkan, Kanpa |
| **Zou Zou no Mi** | Awaken Elephant Heavy Point, Awaken Elephant Guard Point, Ivory Catastrophe, Trunk Geyser |
| **Zou Zou no Mi, Model: Mammoth** | Awaken Mammoth Heavy Point, Awaken Mammoth Guard Point, Drought Calamity, Drought Siphon, Ancient Hide |
| **Zushi Zushi no Mi** | Ukiyo, Deadweight, Zenith |

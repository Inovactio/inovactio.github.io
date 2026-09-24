# Configuration

Server-side settings live in `config/awakenawakennomi-common.toml`:

| Section | Setting | Default | What it does |
|---|---|---|---|
| `titan_trample` | `titanTrampleMaxBreakCount` | `256` | Most blocks *Titan Trample* may break in one check. Above it, nothing breaks that tick. `-1` removes the limit. |
| `yomi_yomi_no_mi` | `yomiMaxResurrections` | `-1` | Extra resurrections granted by the awakened Yomi Yomi no Mi. `-1` is unlimited, `0` keeps only the base mod's single resurrection. |
| `dai_hanpatsu` | `minDistance` / `maxDistance` | `100` / `2000` | Range, in blocks, of the *Dai Hanpatsu* teleport. |
| `dai_hanpatsu` | `maxCandidates` | `100` | Random positions tried when looking for an already explored, solid destination. |
| `godland` | `godlandForceWeather` | `true` | Whether *Godland* summons a real thunderstorm. Weather is per dimension, so it affects every player there. |
| `godland` | `godlandRestoreWeather` | `true` | Whether the previous weather comes back when the zone closes. |

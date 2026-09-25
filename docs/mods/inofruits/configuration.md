# Configuration

Settings live in `config/inofruits-common.toml`:

| Section | Setting | Default | What it does |
|---|---|---|---|
| `bai_bai_no_mi` | `fukuseiCooldown` | `6000` (5 min) | Cooldown of *Fukusei*, which makes one permanent copy of the held item. The value that most affects a server's economy. |
| `bai_bai_no_mi` | `baiBunshinCooldown` | `2400` (2 min) | Cooldown of *Bai Bunshin*, which spawns three copies of the user for 30 seconds. |
| `bai_bai_no_mi` | `baizoCooldown` | `1800` (90 s) | Cooldown of *Baizo*, which doubles the clones already standing. |
| `bai_bai_no_mi` | `baizoMaxClones` | `8` | Most clones one player may have at once. A server performance limit. |
| `yuge_yuge_no_mi` | `kumoriSuppression` | `60` (3 s) | How long *Kumori* switches off a soaked Devil Fruit user's powers. `0` removes the suppression. |
| `oki_oki_no_mi` | `okiRadius` | `32` blocks | Radius of the *Oki Oki no Mi*'s law zone around the user, from 8 to 64. Everyone inside obeys the law in force, the user included. Past about 48 blocks, players no longer see the creatures the law acts on. |

Durations are in ticks (20 ticks = 1 second).

!!! warning "Ship the file to your players"
    The file is not synchronised to clients. The server always enforces its own values, but a player's ability tooltips read *their* copy. A server that changes a cooldown should give its players the same file, or their tooltips will show the defaults.

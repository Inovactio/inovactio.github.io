# Configuration

Awaken Path's settings live in **`config/mineminenomiawakenpath-common.toml`**, created the first time the game starts with the mod.

## Unlock

| Setting | Default | What it does |
|---|---|---|
| `"Unlock with Doriki"` | `true` | Whether the Doriki condition applies. |
| `"Doriki Threshold"` | `-1` | Doriki required, from `-1` to `100000`. `-1` means the base mod's *Doriki Limit* (10,000 by default). |
| `"Time With Fruit Threshold"` | `1728000` | Ticks a player must spend **online** with their fruit. `-1` removes this condition. |
| `"Force Enable Awakenings"` | `true` | Forces the base mod's *Enable Awakenings* option on, whatever its own file says. |

With both conditions on, **both** must hold. With both off, no fruit awakens through Awaken Path.

### Ticks for the time threshold

| Duration | Ticks |
|---|---|
| 1 hour | 72,000 |
| 6 hours | 432,000 |
| 1 day | 1,728,000 |
| 3 days | 5,184,000 |
| 1 week | 12,096,000 |
| 2 weeks | 24,192,000 |
| 1 month | 51,840,000 |

## Effects

| Setting | Default | What it does |
|---|---|---|
| `"Awakening Sound"` | `true` | Play a sound when a fruit awakens. |
| `"Awakening Title"` | `true` | Show the *Awakening* title and subtitle on screen. |
| `"Awakening Particles"` | `true` | Spawn particles around the player. |

## The default file

Without its comments, the file the game writes looks like this:

```toml title="config/mineminenomiawakenpath-common.toml"
[Unlock]
	"Unlock with Doriki" = true
	"Doriki Threshold" = -1
	"Time With Fruit Threshold" = 1728000
	"Force Enable Awakenings" = true

[Effects]
	"Awakening Sound" = true
	"Awakening Title" = true
	"Awakening Particles" = true
```

!!! tip "Keys with spaces"
    The keys contain spaces, so they stay **between quotes**. Keep the quotes when you edit a value.

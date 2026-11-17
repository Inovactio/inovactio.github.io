# Shared particles

*Since 6.8.0.* AkumaLib registers four general particles (#899). Look here before drawing one for a fruit; then the base mod's
(`moku`, `mera`, `blue_flame`, `doku`, `awa`, `suna`, `circle`) and vanilla's (`BLOCK`, `SPLASH`, `CRIT`, `POOF`,
`CLOUD`); draw your own only for what is the fruit's identity (a Logia, its matter, a shape a tint cannot make).

| Type | Field | Drawing (4 frames) | For |
|---|---|---|---|
| `akumalib:drop` | `AkumaParticles.DROP` | a round drop, a tear falling, a bounce, a splash | blood, venom, water, syrup |
| `akumalib:puff` | `AkumaParticles.PUFF` | a puff of balls that swells, then breaks up | steam, smoke, round dust |
| `akumalib:glint` | `AkumaParticles.GLINT` | a four-pointed star that opens and closes | a spark, a shine, a charged blade |
| `akumalib:ring` | `AkumaParticles.RING` | a ring that opens | a wave of air, a shock, a spiral |

They are the base mod's `SimpleParticle`: the colour, size, life and motion are given at sending. The drawings are white
and light grey, and the colour **multiplies** them, so the colour you ask for is the one seen.

```java
SimpleParticleData data = new SimpleParticleData(AkumaParticles.DROP.get());
data.setColor(0.9F, 0.15F, 0.15F).setSize(1.2F).setLife(14).setMotion(0.0D, 0.05D, 0.0D);
serverLevel.sendParticles(data, x, y, z, 6, 0.2D, 0.2D, 0.2D, 0.0D);
```

`ParticleBursts.burst(level, AkumaParticles.PUFF, ...)` throws one out all round.

A particle type is never written in a world or a player: it lives in packets and the `/particle` command only, so moving
a mod's particle onto a shared one needs no remap.

## Motions for your own particles

The base mod's `SimpleParticle` has no gravity or growth of its own. `AkumaParticleProviders` (client) gives them to a
provider of your own, registered in your `RegisterParticleProvidersEvent`:

| Helper | What it does |
|---|---|
| `falling(factory, gravity)` | the base mod's gravity (a fixed fall speed, `0.04 x gravity` a tick); a negative gravity rises |
| `growing(texture, frames, grow)` | grows by `grow` of its size over its life |
| `thrown(texture, pullPerSpeed)` | one frame, pulled down each tick by `pullPerSpeed` times its sideways speed: a chip thrown out falls back in step with its throw |
| `pulled(texture, pull)` | one frame, pulled down by `pull` a tick: a bit that hops and falls back |

```java
event.registerSpecial(MyParticles.CHIP.get(), AkumaParticleProviders.falling(new SimpleParticle.Factory(texture("chip")), 0.04F));
```

A gravity on a shared particle is the same: register nothing, and send it with a downward motion, or ask for a shared
falling variant if several fruits need one.

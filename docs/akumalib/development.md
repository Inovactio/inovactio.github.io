# Development

This page covers working on an addon and on AkumaLib at the same time, and building a release that actually works once installed.

## Developing an addon alongside the library

The intended layout is two checkouts side by side:

```text
MineMineNoMi/
├── AkumaLib/     <- the library
└── YourAddon/    <- your addon
```

Your addon's `settings.gradle` includes the library build directly:

```groovy title="YourAddon/settings.gradle"
if (!gradle.startParameter.projectProperties.containsKey('akumalibFromMaven')) {
    includeBuild('../AkumaLib')
}
```

With that, `implementation "com.inovactio:akumalib:${akumalib_version}"` resolves to the sibling checkout rather than to a published jar. Editing the library and rebuilding your addon needs no publish step in between.

!!! warning "The module name must match"
    The library pins `rootProject.name` to `akumalib`. If a checkout ends up with a different module name, the substitution silently fails to match and Gradle falls through to a published artifact that may not exist.

## Two consumption modes

The two ways of consuming the library need different treatment, so the switch is an explicit flag rather than something inferred.

| Mode | Command | What your addon compiles against |
|---|---|---|
| Development (default) | `gradlew build` | the library's **mapped** jar, through `includeBuild` |
| Control build | `gradlew build -PakumalibFromMaven` | the **reobfuscated** published jar, through `fg.deobf` |

```groovy title="YourAddon/build.gradle"
dependencies {
    if (project.hasProperty('akumalibFromMaven')) {
        implementation fg.deobf("com.inovactio:akumalib:${akumalib_version}")
    } else {
        implementation "com.inovactio:akumalib:${akumalib_version}"
    }
}
```

!!! danger "Run the control build before any release"
    The composite build puts the library's classes on the classpath directly, which **completely hides a resource missing from the packaged jar**: the lang file, a texture, `mods.toml` itself. The control build is the only build that catches it.

    ```bash
    cd AkumaLib  && gradlew publishToMavenLocal
    cd YourAddon && gradlew build -PakumalibFromMaven
    ```

## Building AkumaLib from source

!!! note "The source repository is not public yet"
    These steps assume a checkout of the AkumaLib sources.

```bash
cd AkumaLib
./gradlew genIntellijRuns   # IntelliJ IDEA run configurations
./gradlew build
```

### The jar trap

!!! danger "`gradlew build` produces a jar for development only"
    Reobfuscation is deferred to publishing, so `build` leaves a jar in Minecraft's **mapped** names. Installed in a real game, that jar loads and then fails on its first Minecraft call.

    ```bash
    ./gradlew releaseJar   # build/release/ holds the reobfuscated jar, and nothing else
    ```

The deferral exists for the composite build. Reobfuscating the `jar` task in place would hand your addon SRG names (`addAdditionalSaveData` becomes `m_7380_`), and every subclass of a library type would fail to compile with an error that names your class and says nothing about mappings:

```text
MyTornadoEntity is not abstract and does not override abstract method
addAdditionalSaveData(CompoundTag) in Entity
```

The dangerous half is that `build/libs` holds whichever shape the last task left behind: mapped after `build`, reobfuscated after `publish`. Same file name, same size. That is why `releaseJar` copies the release artifact to its own `build/release` directory.

## Mixins

The library ships its own mixin configuration, `mixins.akumalib.json`:

| Mixin | Target | Why it exists |
|---|---|---|
| `AbilityHelperMixin` | `AbilityHelper.emergencyStopAbility` (HEAD) | interrupts a running charge through `AkumaCharges.interrupt`, so a forced stop takes back what the charge started. See [Charges](core-concepts/charges.md#a-charge-stopped-from-outside) |
| `EntitySizeMixin` | `Entity.getDimensions` | applies the `SIZE` attribute, which is inert without it |
| `client.HumanoidArmorLayerMixin` | `HumanoidArmorLayer.renderArmorPiece` | lets an animation hide the wearer's armour |

!!! note "A library mixin runs in every game that installs the library"
    An injection into a hot path is paid by every addon, including those that never use the feature. That cost is weighed before any mixin is added.

## Versioning

**Publishing freezes the API.** A breaking change to the shared surface is a **major** version bump and forces a synchronised release of the library and its addons. In your `mods.toml`, give AkumaLib a version range that excludes the next major:

```toml title="META-INF/mods.toml"
[[dependencies.yourmodid]]
    modId = "akumalib"
    mandatory = true
    versionRange = "[2.7.0,3)"
    ordering = "AFTER"
    side = "BOTH"
```

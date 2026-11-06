# Mixins and new versions of the base mod

AkumaLib accepts any newer Mine Mine no Mi. Its mixins must not stop the game when one of those versions moves
something, and nobody may lose a fix without being told. Three things see to that.

## Stable targets first

A compiled lambda is called `lambda$handle$5`: the number depends on the code around it, and any new lambda moves it. A
mixin does not aim at one when it has a choice. A check on a packet wraps the work that the packet's `handle` queues,
which is the same moment for the same result:

```java
@Protection("a client can equip into a slot that does not exist")
@Redirect(method = "handle", at = @At(value = "INVOKE", target = PacketChecks.ENQUEUE_WORK), require = 0)
private static CompletableFuture<Void> mymod$check(NetworkEvent.Context context, Runnable work, MyPacket message, Supplier<NetworkEvent.Context> ctx) {
    return context.enqueueWork(() -> {
        if (mayDoIt(ctx.get().getSender())) {
            work.run();
        }
    });
}
```

## Optional injections and the report

When only a lambda or an ordinal will do, the injection is optional (`require = 0`), and a lambda is named with its full
descriptor: a lambda of another shape is then no target, where it would otherwise make Mixin refuse the handler and stop
the game whatever `require` says.

Mixin skips an optional injection without a word. `MixinReport` says it when the game has loaded:

- a line per injection that did not apply, as a warning;
- for one marked `@Protection`, a block of errors saying what is open without it;
- if everything applied, one line: `AkumaLib: all N optional mixin injections applied`.

An addon gets the same report from its mixin config, with nothing to list:

```json
"plugin": "com.inovactio.akumalib.api.mixins.MixinReport"
```

The report loads the target classes of optional injections, without initialising them, because a mixin applies only
when its target loads. It reads what really happened, another mod's mixin included.

An addon's MixinExtras injectors are read the same way (#825): a `@WrapOperation`, applied after every other injector,
and any injector with `@Local`, whose annotation MixinExtras rewrites. The report reads the handlers from the mixin's
own class file, and the target only once its class is defined.

The other injections stay required: they name methods the base mod chose, Minecraft or Forge, and moving one is a real
change that the check below shows before anyone plays it.

## The check for a new version

```bash
./gradlew checkMixinTargets -PbaseModJar=<a jar of Mine Mine no Mi>
```

Add `-PmodJar=<jar>` to check another mod's released jar. It needs no game, and compares every mixin target with that
jar: classes, methods, lambdas, ordinals, calls, constants, shadows and accessors. It ends with a tally, and exits with
an error when something is missing. `[required]` means the game will not start with that version; `[optional]` means one
fix is lost, and the report will name it.

Run it first at each new version of Mine Mine no Mi. It cannot see a lambda renumbered to another of the same shape, or a
new call placed before an ordinal: those still look fine, so read the base mod's changes to the hooked methods too.

## Other mods on the same calls

Forge 47 does not ship MixinExtras (checked on 47.4.18 and 47.4.28), and AkumaLib does not carry it, so its mixins use
plain Mixin injectors. Only its own game test server loads MixinExtras, for the report's test. A call takes one `@Redirect` among all mods, so three of AkumaLib's hooks can meet another mod.
They are optional: whichever of the two mods is skipped loses only that hook, and AkumaLib's is named in the report.

| Mixin | Call | Who may hook it | Without it |
| --- | --- | --- | --- |
| `SoundEngineHearingMixin` | `Camera.getPosition` in `SoundEngine.updateSource` | sound mods | a big body hears from the camera |
| `ProjectileDrawSizeMixin` | `EntityRenderer.render` in `EntityRenderDispatcher.render` | render mods | what an ability spawned for a big body is drawn at its normal size |
| `DeferredRegisterMixin` | `Map.putIfAbsent` in `DeferredRegister.register` | mods on Forge's registers | two mods registering at once can lose entries (a protection: the report says it loud) |

If the other mod's hook is the required one and AkumaLib's applied first, that mod is the one to fail: its `@Redirect`
meets a call that is already redirected. That is a known incompatibility, to be solved case by case.

### A mod that replaces a whole method

Mixin stops the game rather than inject into a method another mixin replaced with `@Overwrite` (`require = 0` does
not help: the target is there). A mixin of AkumaLib that meets one is left out while that mod is loaded: `LEFT_TO` in
`MixinReport` maps the mixin to the mod id, `shouldApplyMixin` skips it and the log says so in one line. That mod then
owns the method, our check with it.

| Mixin | Left to | Why | Without it |
| --- | --- | --- | --- |
| `CEquipAbilityPacketMixin` | Mine Mine Extra Slots (`minemineextraslots`, #841) | it rewrites `CEquipAbilityPacket.handle` for its 160 slots | a passive can be put into a slot; a slot past the last is still refused by `fixCrashGuards` (#350) |

# Items and blocks

Techniques that hand out items, craft them, fire a transmutation projectile, or turn block hits into something.

## `ProduceItemAbility`

Hands the user an item the fruit makes out of itself: salt, honey, gum, cotton, bone. There is no recipe and no cost, because the user **is** the material.

```java
public class MySpareBoneAbility extends ProduceItemAbility {

    public MySpareBoneAbility(AbilityCore<MySpareBoneAbility> core) {
        super(core);
        this.cooldown = 10.0F;
    }

    @Override
    protected ItemStack getProducedItem(LivingEntity user) {
        return new ItemStack(Items.BONE);
    }

    @Override
    protected SoundEvent getProduceSound() {
        return SoundEvents.BONE_BLOCK_BREAK;
    }
}
```

- `getProducedItem(user)` is called on each use, so the amount can depend on the user. Return `ItemStack.EMPTY` to produce nothing; the cooldown still runs, so a technique that can fail should tell the player itself.
- A full inventory drops the item at the user's feet instead of deleting it, and a holder without an inventory (a mob using the ability) drops it on the ground.
- `getProduceSound()` is silent by default. Override `getProduceVolume()` (default `0.7`) and `getProducePitch()` (default `1.0`) to shape it.

!!! tip "Produce, not craft"
    If your technique has no recipe and no cost, use this class rather than `CraftingAbility`: the latter would need three methods that return `true` unconditionally, a charge that never starts, and a "missing materials" message that can never appear.

## `CraftingAbility`

Materials in, item out: the technique checks a recipe, takes its cost, and produces a result.

```java
public class MyForgeAbility extends CraftingAbility {

    public MyForgeAbility(AbilityCore<MyForgeAbility> core) {
        super(core);
        this.cooldown = 40.0F;
        this.chargeable = true;
        this.chargeTime = 60.0F;
    }

    @Override
    protected boolean isCraftable(LivingEntity user) {
        return user instanceof Player player && player.getInventory().countItem(Items.IRON_INGOT) >= 3;
    }

    @Override
    protected boolean consummeMaterials(LivingEntity user) {
        // remove the 3 ingots; return false if that failed
        return true;
    }

    @Override
    protected void craftItem(LivingEntity user) {
        // give the result
    }
}
```

- `isCraftable` is checked on the press. When it fails, a player is sent `message`, which defaults to *"You do not have the materials to use this ability."* Set it in the constructor to a translatable component of your own to say what is missing.
- With `chargeable = true`, the ingredients are taken and the item crafted at the **end** of a `chargeTime` charge; otherwise on the press.
- The cooldown (`cooldown`, default `5`) only starts when `consummeMaterials` returned `true`.

!!! note "The method is spelled `consummeMaterials`"
    With a double `m`. Override it under that exact name, or the compiler reports an unimplemented abstract method.

## `TransmutationAbility`

Fires a transmutation projectile and holds a pose until the projectile is gone.

```java
public class MyTransmuteAbility extends TransmutationAbility {

    public MyTransmuteAbility(AbilityCore<MyTransmuteAbility> core) {
        super(core);
    }

    @Override
    protected NuProjectileEntity createProjectile(LivingEntity entity) {
        return new MyTransmutationProjectile(entity.level(), entity, this);
    }

    @Override
    protected SoundEvent getShootSound() {
        return MySounds.TRANSMUTE.get();
    }

    @Override
    protected AnimationId<?> getShootAnimation() {
        return AkumaAnimations.RIGHT_ARM_FORWARD;
    }
}
```

The sound and the pose are asked of the subclass because they belong to the fruit, not to the mechanic. Defaults: a cooldown of `400`, a projectile speed of `2.0` and an inaccuracy of `0.5`. The library's `TransmutationProjectile` is the matching projectile base class.

## `BlockUseAbility`

A state in which **hitting a block does something**: the user activates the technique, then each block they punch triggers `onBlockUsed`, until a use limit or the end of the state.

```java
public class MyPetrifyAbility extends BlockUseAbility {

    public MyPetrifyAbility(AbilityCore<MyPetrifyAbility> core) {
        super(core);
    }

    @Override
    public boolean onBlockUsed(LivingEntity entity, BlockPos pos, Level world) {
        world.setBlock(pos, Blocks.STONE.defaultBlockState(), 3);
        return true;
    }

    @Override public float getPunchCooldown() { return 100.0F; }
    @Override public Predicate<LivingEntity> canActivate() { return entity -> true; }
    @Override public int getUseLimit() { return 3; }
    @Override public boolean GetAllowBlockActivation() { return false; }
}
```

| Member | Meaning |
|---|---|
| `onBlockUsed(entity, pos, world)` | what a punched block does |
| `canActivate()` | whether a hit counts; a failing predicate lets the hit through untouched |
| `getUseLimit()` | uses before the state ends; `0` or less for no limit |
| `getPunchHoldTime()` | how long the state lasts; `-1` (default) until pressed again |
| `getPunchCooldown()` | cooldown started when the state ends |
| `isActive()` | whether the state is running |

The ability's `statsComponent` is applied for the duration of the state, so modifiers added to it in the constructor only count while the technique is active.

Block hits are delivered by the library's `BlockTriggerComponent`, registered under `AkumaAbilityKeys.BLOCK_TRIGGER`, which you can also add to an ability of your own to react to block hits.

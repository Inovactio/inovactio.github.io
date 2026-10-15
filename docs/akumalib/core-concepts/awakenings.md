# Awakening abilities

An awakening ability is a technique a Devil Fruit gives once it is awakened. Mark yours, and the library shows them apart:

- **their own tab** in the abilities screen, "Awakening", right after Devil Fruit. Its picture is the player's fruit outlined in gold light. The tab only appears once the player has one unlocked;
- **off the fruit's tooltip**: hovering a Devil Fruit in the inventory lists its base kit only;
- **a line "Awakening"** under the ability's name in its tooltip.

```java
// your mod's common setup, on both sides
Awakenings.mark(MyAbilities.MY_AWAKENED_ABILITY, MyAbilities.MY_AWAKENED_FORM);

// the ability's core: an ordinary Devil Fruit ability, unlocked by the awakened fruit
new AbilityCore.Builder<>("My Awakened Ability", AbilityCategory.DEVIL_FRUITS, MyAwakenedAbility::new)
        .setUnlockCheck(user -> Awakenings.canUnlock(user, ModFruits.MY_FRUIT))
```

`Awakenings.canUnlock(user, fruit)` is true when the user ate that fruit and his fruit is awakened. The base mod answers no for everybody while its "Enable Awakenings" server option is off, which is its default.

!!! danger "Keep the category `DEVIL_FRUITS`"
    `Awakenings.CATEGORY` exists for the screen's tab only: never build an ability with it. Twelve systems of the base mod read the category `DEVIL_FRUITS`: Seastone and handcuffs, nets, Kairoseki bullets, water, `/remove_df`, one fruit per world, progression. An ability in another category escapes Seastone and outlives the loss of its fruit.

!!! warning "Mark in the common setup, not when adding to the fruit"
    The base mod adds abilities to a fruit (`ModifyDevilFruitEvent`) only when a server starts. A client playing on a dedicated server never sees that event: an ability marked there would have no tab on his screen.

Only the display changes. The gameplay systems see a marked ability exactly as an unmarked one.

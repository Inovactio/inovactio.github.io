# Screens in the base mod's look

Mine Mine no Mi draws its windows on two things: an **open book** and a **parchment note**. `MmnmGui` draws them from the base mod's own textures (referenced, never copied), and two base classes hold what every screen built on them would otherwise write for itself.

Neither base draws anything by itself. A screen keeps its own `render`, calls the pieces in the order it wants, and stays the only place that says what it looks like.

## The open book: `BookScreen`

Two pages, a wooden arrow at the foot of the left one to go back, and - for a book with more than a page - two arrows and a "2 / 5" at the foot of the right one. The profession pages and the Titles screen are built on it.

```java
public class MyBook extends BookScreen {

    public MyBook(Screen parent) {
        super(Component.translatable("mymod.book.title"), parent);   // the back arrow and Escape go to parent
    }

    @Override
    protected int pages() {
        return Math.max(1, (entries().size() + PER_PAGE - 1) / PER_PAGE);
    }

    @Override
    public boolean mouseClicked(double mouseX, double mouseY, int button) {
        if (button == 0 && clickArrows(mouseX, mouseY)) {
            return true;
        }
        return super.mouseClicked(mouseX, mouseY, button);
    }

    @Override
    public void render(GuiGraphics g, int mouseX, int mouseY, float partialTick) {
        renderBackground(g);
        drawBook(g);
        g.drawString(this.font, this.title, left() + LEFT_PAGE, top() + PAGE_TOP, MmnmGui.INK, false);
        small(g, Component.translatable("mymod.book.note"), left() + LEFT_PAGE, top() + PAGE_TOP + 13, MmnmGui.INK_DIM);
        // ... this.page tells which entries the right page shows
        drawBackArrow(g, mouseX, mouseY);
        drawPageArrows(g, mouseX, mouseY);
        super.render(g, mouseX, mouseY, partialTick);                 // the widgets, if it has any
    }
}
```

| It gives | |
|---|---|
| `WIDTH`, `HEIGHT`, `LEFT_PAGE`, `RIGHT_PAGE`, `PAGE_WIDTH`, `PAGE_TOP` | the book is 290 x 182; a page's text begins 22 (left) or 156 (right) from its left edge and 14 from its top, and is 112 wide |
| `left()`, `top()` | the book's corner on the screen |
| `page`, `pages()` | the page it is open at, and how many there are: one, unless the screen says more |
| `clickArrows`, the wheel | the back arrow closes, the two others and the wheel turn the page |
| `drawBook`, `drawBackArrow`, `drawPageArrows` | the pieces, to call from `render` |
| `small(g, text, x, y, colour)` | text at three quarters of the font's size, seven pixels a line; wrap it with `font.split(text, (int) (PAGE_WIDTH / SMALL))` |
| `overArrow`, `over` | where the mouse is |

A book that does not turn pages leaves `pages()` alone and has only its back arrow. One that turns in its own way - by chapters, with a sound - keeps `drawBook` and `drawBackArrow` and draws its own two arrows with `MmnmGui.arrow` at `prevArrowX()` and `nextArrowX()`.

The inks are `MmnmGui.INK`, `INK_DIM` and `GAINED` (the green of what the player has).

## The parchment note: `NoteScreen` and `ParchmentNote`

A sheet in the middle of the screen, its title on the first line, rows of things in the base mod's slot squares, one or two of its plank buttons (`PlankButton`). For a list of things asked or offered.

```java
public class MyNote extends NoteScreen {

    @Override
    protected void init() {
        this.left = (this.width - WIDTH) / 2;
        this.top = (this.height - HEIGHT) / 2;
        this.deliver = addRenderableWidget(new PlankButton(this.left + WIDTH - MARGIN - 56, this.top + 27, 56, 20, label, pressed -> send()));
        refresh();
    }

    @Override
    protected void refresh() {                                        // each tick: what he carries may have changed
        this.deliver.active = carried() > 0;
    }

    @Override
    public void render(GuiGraphics graphics, int mouseX, int mouseY, float partialTick) {
        renderBackground(graphics);
        sheet(graphics, this.left, this.top, WIDTH, HEIGHT);
        title(graphics, this.left, this.top);
        slot(graphics, this.wanted, this.left + MARGIN, this.top + 26);
        graphics.drawString(this.font, fit(name, WIDTH - 2 * MARGIN - SLOT - 4), this.left + MARGIN + SLOT + 4, this.top + 28, INK, false);
        ItemStack hovered = ParchmentNote.overSlot(mouseX, mouseY, this.left + MARGIN, this.top + 26) ? this.wanted : ItemStack.EMPTY;
        renderOver(graphics, mouseX, mouseY, partialTick, hovered, null);   // the widgets, then the tooltip
    }
}
```

The sheet is as wide and as tall as the screen says: its border keeps its size at any height, so a list of three rows and one of nine have the same torn edge. ⚠️ That is not `MmnmGui.parchment`, which stretches the whole texture, border and all.

`NoteScreen` does not pause the game, calls `refresh()` each tick, and brings the constants within reach: `MARGIN` (13), `TITLE_Y` (11), `SLOT` (22), `INSET` (3), and the three inks `INK`, `FADED_INK` (what is done, or cannot be had) and `REWARD_INK` (what is paid: green).

**A container screen cannot extend it** - it already extends the game's `AbstractContainerScreen`. `ParchmentNote` holds the same pieces as plain functions: `sheet`, `title`, `slot`, `overSlot`, `fit`, and the constants. Draw the sheet in `renderBg`, the title in `renderLabels`.

!!! warning "Two sets of inks"
    The book's inks (`MmnmGui.INK`) and the note's (`ParchmentNote.INK`) are not the same brown: each was chosen on its own paper. Use the one of the paper you draw on.

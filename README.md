# inovactio.github.io

Source of <https://inovactio.github.io/>: the player wikis and developer documentation of Inovactio's
Mine Mine no Mi addons (Minecraft 1.20.1, Forge), built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

## Content rules

- Each mod is documented from its **`main` branch**, the published version. A release PR
  `develop` → `main` of a mod comes with a PR here updating that mod's section.
- Every player-facing fact comes from the mod's code, lang files, data or README on `main`.

## Layout

```
docs/
├── index.md       home page, one card per mod
├── mods/<mod>/    player wiki, one folder per mod
└── akumalib/      AkumaLib developer documentation
```

## Building locally

```bash
python -m venv ../site-venv
../site-venv/Scripts/pip install -r requirements.txt   # bin/ instead of Scripts/ outside Windows
../site-venv/Scripts/mkdocs serve
```

Pull requests run `mkdocs build --strict`; merging to `main` deploys to the `gh-pages` branch.

© Inovactio. All Rights Reserved.

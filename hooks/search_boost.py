"""Search ranking by kind of page, so that a player's search lands on the wikis first.

Material ranks every page alike. Most searches are a player's ("fly", "doriki", "box chance"), and the AkumaLib
developer pages use the same words, so the mod wikis are weighted up. The changelogs repeat every name in the
wikis and are weighted down: they say what changed, not what something does. A page's own `search: boost:` front
matter still wins.
"""

WIKI_BOOST = 3
CHANGELOG_BOOST = 0.2


def on_page_markdown(markdown, page, **kwargs):
    search = page.meta.setdefault("search", {})
    if not isinstance(search, dict) or "boost" in search:
        return markdown
    if page.url.endswith("changelog/"):
        search["boost"] = CHANGELOG_BOOST
    elif page.url.startswith("mods/"):
        search["boost"] = WIKI_BOOST
    return markdown

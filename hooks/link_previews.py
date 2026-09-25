"""What a link to the site shows when it is shared (Discord, social networks): a title, a line of description and an
image, read by overrides/main.html.

- Title: the page's title and the mod it belongs to ("Kaze Kaze no Mi · InoFruits").
- Description: a fruit page's summary table in one line ("Logia · Wind · Golden box · 9 abilities (...)"), or else the
  page's first paragraph. A `description:` in the page's front matter wins. It is also the page's meta description.
- Image: the page's own icon (a mod's icon, an InoFruits fruit's sprite), or else the icon of the mod it belongs to.
"""
import html as htmllib
import posixpath
import re

# URL prefix: the name and icon shown for the pages under it. The first match wins; "" is the home page.
SECTIONS = [
    ("mods/awaken-awaken-no-mi/", "Awaken Awaken no Mi", "assets/icons/awaken-awaken-no-mi.png"),
    ("mods/awaken-path/", "Awaken Path", "assets/icons/awaken-path.png"),
    ("mods/inofruits/", "InoFruits", "assets/icons/inofruits.png"),
    ("mods/sky-island/", "Sky Island", "assets/icons/sky-island.png"),
    ("akumalib/", "AkumaLib", "assets/icons/akumalib.png"),
    ("", None, "assets/icons/akumalib.png"),
]
SUMMARY_KEYS = ["Type", "Theme", "Box", "Abilities", "Transformations"]
MAX_DESCRIPTION = 200


def text_of(fragment):
    return re.sub(r"\s+", " ", htmllib.unescape(re.sub(r"<[^>]+>", "", fragment))).strip()


def summary(content):
    """A fruit page's at-a-glance table (the first element after the title), as one line."""
    m = re.match(r"\s*<h1[^>]*>.*?</h1>\s*(?:<p>\s*<img[^>]*>\s*</p>\s*)?<table>(.*?)</table>", content, re.S)
    if not m:
        return None
    rows = dict((text_of(k), text_of(v)) for k, v in
                re.findall(r"<tr>\s*<td><strong>(.*?)</strong></td>\s*<td>(.*?)</td>\s*</tr>", m.group(1), re.S))
    if "Type" not in rows:
        return None
    parts = []
    for key in SUMMARY_KEYS:
        value = rows.get(key)
        if not value:
            continue
        if key == "Box":
            value += " box"
        elif key in ("Abilities", "Transformations"):
            number, _, detail = value.partition(":")
            value = f"{number.strip()} {key.lower()}" + (f" ({detail.strip()})" if detail.strip() else "")
        parts.append(value)
    return " · ".join(parts)


def first_paragraph(content):
    """The first paragraph of prose: not inside a box, a table, a card grid or a collapsible."""
    content = re.sub(r"<(div|table|details)\b.*?</\1>", "", content, flags=re.S)
    for p in re.findall(r"<p>(.*?)</p>", content, re.S):
        text = text_of(p)
        if len(text) > 20:
            return text
    return None


def shorten(text):
    if text.endswith(":"):  # a paragraph that introduces a list
        text = text[:-1] + "…"
    if len(text) <= MAX_DESCRIPTION:
        return text
    return text[:MAX_DESCRIPTION].rsplit(" ", 1)[0].rstrip(",;:") + "…"


def on_page_content(content, page, config, **kwargs):
    site = config["site_url"]
    prefix, name, icon = next(s for s in SECTIONS if page.url.startswith(s[0]))

    title = config["site_name"] if page.is_homepage else page.title
    if name and title != name:
        title = f"{title} · {name}"
    page.meta.setdefault("preview_title", title)

    if not page.meta.get("description"):
        description = summary(content)
        if description and name:
            description = f"{name}: {description}"
        description = description or first_paragraph(content)
        if description:
            page.meta["description"] = shorten(description)

    own = re.search(r'<img\b[^>]*\bclass="mod-icon"[^>]*>', content)
    src = own and re.search(r'\bsrc="([^"]+)"', own.group(0))
    if src:
        image = posixpath.normpath(posixpath.join(page.url, src.group(1)))
    else:
        image = icon
    page.meta.setdefault("preview_image", site + image)
    return content

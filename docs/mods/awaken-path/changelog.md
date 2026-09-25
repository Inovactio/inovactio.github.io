# Changelog

Every Awaken Path release for Minecraft 1.20.1, newest first, as published on [CurseForge](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-awaken-path/files/all). The Minecraft 1.16.5 release (1.0.0) is listed there too.

## 2.2.0 { #v2-2-0 }

<small>Released 2026-06-07 · [Download](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-awaken-path/files/8210898)</small>

<div class="changelog-body" markdown="0">
<p>Fix a related server issue where awakening could not be unlocked, and move were not listed.</p>
</div>

## 2.1.0 { #v2-1-0 }

<small>Released 2026-05-04 · [Download](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-awaken-path/files/8037100)</small>

<div class="changelog-body" markdown="0">
<h3>🆕 What's New</h3>
<p><strong>New Awakening Condition: Time Spent With Your Fruit</strong></p>
<ul>
<li>Awakening can now require a minimum amount of playtime with your Devil Fruit</li>
<li>Only time spent <strong>online</strong> is counted — logging off does not progress the timer</li>
<li>Fully configurable from 1 hour to several years, with a reference table built directly into the config file</li>
<li>Can be disabled independently from the Doriki condition (set to <code>-1</code> to disable)</li>
</ul>
<p><strong>Visual &amp; Sound Effects on Awakening</strong></p>
<ul>
<li>🔊 <strong>Sound</strong> — A mysterious sound plays upon awakening, heard by all nearby players</li>
<li>✨ <strong>Title</strong> — A full-screen title and subtitle appear in both English and French</li>
<li>🌟 <strong>Particles</strong> — END_ROD and SOUL_FIRE_FLAME particles burst around the player</li>
</ul>
<h3>⚙️ Configuration</h3>
<p>New <code>[Effects]</code> section in the config file — each effect can be toggled independently:</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Awakening Sound</code></td>
<td><code>true</code></td>
<td>Play a sound on awakening</td>
</tr>
<tr>
<td><code>Awakening Title</code></td>
<td><code>true</code></td>
<td>Show a full-screen title</td>
</tr>
<tr>
<td><code>Awakening Particles</code></td>
<td><code>true</code></td>
<td>Spawn particles around the player</td>
</tr>
</tbody>
</table>
<p>New option in <code>[Unlock]</code>:</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Time With Fruit Threshold</code></td>
<td><code>1728000</code></td>
<td>Online ticks required (1,728,000 = 1 real day)</td>
</tr>
</tbody>
</table>
<h3>🔧 Fixes &amp; Improvements</h3>
<ul>
<li>Timer automatically initialized for players who already had a fruit when updating from v2.0.0</li>
<li>Awakening conditions are now checked every in-game minute as a fallback</li>
<li>Time counter resets if the player loses their Devil Fruit</li>
</ul>
<hr>
<p><em>Minecraft 1.20.1 — Forge 47.4.18 — Mine Mine no Mi 0.11+</em></p>
</div>

## 2.0.0 { #v2-0-0 }

<small>Released 2026-04-05 · [Download](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-awaken-path/files/7879001)</small>

<div class="changelog-body" markdown="0">
<h3>⚠️ Breaking Changes</h3>
<ul>
<li><strong>Requires Mine Mine no Mi 0.11+</strong> — This version is a full port to <strong>Minecraft 1.20.1</strong> and is <strong>not compatible</strong> with previous versions of the mod or Mine Mine no Mi.</li>
</ul>
<hr>
<h3>✨ What's New</h3>
<h4>🔓 Awakenings now enabled by default</h4>
<p>Awaken Path now <strong>automatically forces the <code>Enable Awakenings</code> option</strong> of Mine Mine no Mi to <code>true</code> for every world, without requiring manual configuration of Mine Mine no Mi's config file.</p>
<p>This behaviour is <strong>fully configurable</strong> via Awaken Path's own config file:</p>
<pre><code>[Unlock]
    # When enabled, forces Mine Mine no Mi's 'Enable Awakenings' option to true,
    # regardless of its config file value.
    # Default: true
    &quot;Force Enable Awakenings&quot; = true
</code></pre>
<p>Set it to <code>false</code> to restore Mine Mine no Mi's default behaviour.</p>
<h4>✅ Awakening unlock check on Devil Fruit consumption</h4>
<p>A new verification is now performed <strong>at the moment a player eats a Devil Fruit</strong> to determine whether they meet the awakening unlock requirements. This ensures the awakening state is evaluated at the right time in the progression flow.</p>
</div>

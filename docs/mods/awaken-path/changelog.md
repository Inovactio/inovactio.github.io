# Changelog

Every Awaken Path release for Minecraft 1.20.1, newest first, as published on [CurseForge](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-awaken-path/files/all). The Minecraft 1.16.5 release (1.0.0) is listed there too.

## 2.3.0 { #v2-3-0 }

<small>Released 2026-10-03 · [Download](https://www.curseforge.com/minecraft/mc-mods/mine-mine-no-mi-awaken-path/files/9051706)</small>

<div class="changelog-body" markdown="0">
<blockquote>
<h3>⚠️ Two new requirements</h3>
<p>This version needs <strong><a href="https://www.curseforge.com/minecraft/mc-mods/akumalib">AkumaLib</a> 4.0.0</strong> or newer, and <strong>Mine Mine no Mi 0.11.5</strong>. Without them the game stops on Forge's missing-dependency screen.</p>
<p>Add the AkumaLib jar to your <code>mods</code> folder, on the client and on the server.</p>
</blockquote>
<p>You can now see how far your fruit is from awakening, the awakening itself is a real moment, and two bugs that could cost you your progress are gone. Your time with your fruit is kept when you update.</p>
<p>Requires Minecraft <strong>1.20.1</strong>, Forge <strong>47+</strong>, <strong>Mine Mine no Mi 0.11.5</strong> and <strong>AkumaLib 4.0.0</strong> or newer. Client and server.</p>
<hr />
<h2>New</h2>
<h3>/awakenpath</h3>
<p>Type <code>/awakenpath</code> to see where you stand: your Doriki and your time with the fruit, each against what is asked, in percent.</p>
<p>You are also told in chat when you reach 50%, 75% and 90% of your awakening.</p>
<p>Operators get five more commands:</p>
<table>
<thead>
<tr>
<th>Command</th>
<th>What it does</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>/awakenpath status &lt;player&gt;</code></td>
<td>shows a player's progress</td>
</tr>
<tr>
<td><code>/awakenpath time set &lt;player&gt; &lt;ticks&gt;</code></td>
<td>sets a player's time with their fruit</td>
</tr>
<tr>
<td><code>/awakenpath time add &lt;player&gt; &lt;ticks&gt;</code></td>
<td>adds to it, or takes from it with a negative number</td>
</tr>
<tr>
<td><code>/awakenpath awaken &lt;player&gt;</code></td>
<td>awakens a player's fruit now</td>
</tr>
<tr>
<td><code>/awakenpath reset &lt;player&gt;</code></td>
<td>removes a player's awakening and puts their time back to zero</td>
</tr>
</tbody>
</table>
<h3>The awakening</h3>
<ul>
<li>A heartbeat grows faster for three seconds, then the fruit awakens.</li>
<li>A shockwave pushes back everything within 6 blocks. It hurts nobody, and nobody takes fall damage from it.</li>
<li>The chat tells you which awakened abilities you just unlocked. If your fruit has none yet, it says so.</li>
<li>A new advancement, <strong>Awakened</strong>.</li>
</ul>
<h3>Time only counts while you play</h3>
<p>A player who has not moved or looked around for 5 minutes is idle, and their time with the fruit stops counting until they move again.</p>
<hr />
<h2>Changed</h2>
<ul>
<li>The big title in the middle of the screen is gone. The chat line and the advancement say it instead.</li>
<li>Fewer particles at the awakening.</li>
</ul>
<hr />
<h2>Fixes</h2>
<ul>
<li><strong>Your time with the fruit was lost when you came back from the End.</strong> It restarted from zero at your next login. It is now kept, like after a death.</li>
<li><strong>The awakening played again and again</strong> on a server where awakenings were switched off, every minute, without awakening anything. Nothing is played there any more.</li>
</ul>
<hr />
<h2>Options</h2>
<p>New options in <code>config/mineminenomiawakenpath-common.toml</code>:</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Default</th>
<th>What it does</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>"Idle Limit"</code></td>
<td><code>6000</code></td>
<td>Ticks without moving after which time stops counting. <code>-1</code> counts all the time online.</td>
</tr>
<tr>
<td><code>"Progress Messages"</code></td>
<td><code>true</code></td>
<td>The chat messages at 50%, 75% and 90%.</td>
</tr>
<tr>
<td><code>"Awakening Heartbeat"</code></td>
<td><code>true</code></td>
<td>The three seconds of heartbeat. Without it the fruit awakens at once.</td>
</tr>
<tr>
<td><code>"Awakening Shockwave"</code></td>
<td><code>true</code></td>
<td>The shockwave.</td>
</tr>
<tr>
<td><code>"Awakening Advancement"</code></td>
<td><code>true</code></td>
<td>The Awakened advancement.</td>
</tr>
<tr>
<td><code>"Awakening Chat Message"</code></td>
<td><code>true</code></td>
<td>The chat line listing the unlocked abilities.</td>
</tr>
</tbody>
</table>
<p>The <code>"Awakening Title"</code> option no longer exists. If it is still in your file, it is ignored.</p>
</div>

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

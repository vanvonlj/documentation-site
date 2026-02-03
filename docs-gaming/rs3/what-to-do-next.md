---
sidebar_position: 4
---

# What to Do Next

Get personalized training recommendations based on your current stats and goals.

## Quick Stat Lookup

<div id="username-form">
  <p>Enter your RuneScape username to view your stats:</p>
  <form id="stats-form" onsubmit="event.preventDefault(); showUserStats();">
    <label htmlFor="stats-username">Username:</label><br/>
    <input type="text" id="stats-username" placeholder="Enter RS3 username" style={{padding: '8px', margin: '10px 0', width: '300px'}} required /><br/>
    <button type="submit" style={{padding: '8px 16px', cursor: 'pointer', marginRight: '10px'}}>Show My Stats</button>
    <button type="button" onclick="resetForm();" style={{padding: '8px 16px', cursor: 'pointer', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px'}}>Clear</button>
  </form>
</div>

<div id="user-stats" style={{display: 'none'}}>
  <p><strong>Viewing stats for: <span id="display-username"></span></strong> <button onclick="resetForm();" style={{padding: '4px 8px', cursor: 'pointer', marginLeft: '10px'}}>Change User</button></p>
  <ul>
    <li><a id="runepixels-link" href="#" target="_blank">View on RunePixels</a> - Comprehensive tracking with XP gains and history</li>
    <li><a id="runemetrics-link" href="#" target="_blank">View on RuneMetrics</a> - Official Jagex player metrics</li>
    <li><a id="hiscores-link" href="#" target="_blank">View on Official Hiscores</a> - Rankings and comparisons</li>
  </ul>
</div>

<script>
{`
function showUserStats() {
  const username = document.getElementById('stats-username').value.trim();
  if (!username) return;

  // Update display username
  document.getElementById('display-username').textContent = username;

  // Update links
  document.getElementById('runepixels-link').href = 'https://runepixels.com/players/' + encodeURIComponent(username);
  document.getElementById('runemetrics-link').href = 'https://apps.runescape.com/runemetrics/app/overview/player/' + encodeURIComponent(username);
  document.getElementById('hiscores-link').href = 'https://secure.runescape.com/m=hiscore/compare?user1=' + encodeURIComponent(username);

  // Toggle visibility
  document.getElementById('username-form').style.display = 'none';
  document.getElementById('user-stats').style.display = 'block';
}

function resetForm() {
  document.getElementById('stats-username').value = '';
  document.getElementById('username-form').style.display = 'block';
  document.getElementById('user-stats').style.display = 'none';
}
`}
</script>

## Training Recommendations

### For Low-Level Stats (Under 50)

If you have skills under level 50, focus on these easy wins:

#### Fast Skills to Train

1. **Cooking** - Very fast, cook fish in Lumbridge
2. **Firemaking** - Jadinko Lair for AFK training
3. **Fletching** - Make arrow shafts or headless arrows
4. **Crafting** - Make leather items or cut gems
5. **Smithing** - Artisans Workshop for fast XP

#### Combat Training

- **Slayer** - Train combat through Slayer for profit
- **ED3 Trash Runs** - Get carried for fast combat XP (levels 70+)
- **Revolution++** - Use auto-combat abilities

### For Mid-Level Stats (50-80)

Focus on unlocking important content:

#### Priority Unlocks

1. **75 Mining** - Required for Plague's End quest
2. **75 Herblore** - Required for Plague's End quest
3. **75 Agility** - Required for Plague's End quest
4. **75 Crafting** - Required for Plague's End quest
5. **75 Construction** - Required for Plague's End quest
6. **80+ Combat stats** - Access to better money-making

#### Quest Goals

- **Plague's End** (Multiple 75s) - Unlocks Prifddinas
- **The World Wakes** - Unlocks combat abilities
- **Temple at Senntisten** - Unlocks Ancient Curses
- **Fate of the Gods** - High XP rewards

### For High-Level Stats (80-99)

Push toward important milestones:

#### Essential 80+ Unlocks

1. **80 Smithing** - Rune armor and better
2. **80 Divination** - Invention unlock
3. **80 Crafting** - Invention unlock
4. **85+ Combat** - Access to high-level Slayer and bosses
5. **90+ Herblore** - Overloads and supremes

#### Priority Training

- Get **96 Herblore** for Overloads (massive combat boost)
- Get **95 Prayer** for Curses (significantly better than normal prayers)
- Get **96 Summoning** for Pack Yak (30-slot familiar)
- Max combat stats for better PvM

### For Near-Max/Max Stats (99+)

Work toward completionist content:

#### 120 Priorities

1. **120 Invention** - Perks unlock at higher levels
2. **120 Slayer** - New creatures and better drops
3. **120 Dungeoneering** - Elite dungeons and rewards
4. **120 Herblore** - Elder overloads
5. **120 Farming** - Tier 92 seeds

#### End-Game Goals

- **Completionist Cape** - All skills 99+, many achievements
- **Trimmed Comp** - All achievements, very time-consuming
- **Master Quest Cape** - All quests completed
- **120 All** - True endgame goal

## Lowest Stat Training Plans

### Finding Your Lowest Stat

Check your stats on RuneClan and identify your 3-5 lowest skills. Focus on these first.

### Quick Training Plans by Skill

#### Combat Skills

- **Attack/Strength/Defence** - ED3 trash runs, Slayer, Shattered Worlds
- **Ranged** - ED3 trash runs, Chinning, Slayer
- **Magic** - ED3 trash runs, Slayer, Player-owned House
- **Prayer** - Cleansing Crystals (Prifddinas), Gilded Altar
- **Constitution** - Trains with all combat
- **Summoning** - Create pouches during Double XP

#### Gathering Skills

- **Mining** - Seren Stones (AFK), Alaea Crablets (active)
- **Fishing** - Waterfall Fishing, Deep Sea Fishing
- **Woodcutting** - Crystal trees (AFK), Acadia trees (active)
- **Farming** - Tree runs twice daily, POF animals
- **Hunter** - Big Game Hunter, Ornate tortle
- **Divination** - Hall of Memories, Cache daily

#### Artisan Skills

- **Smithing** - Artisans Workshop, burial armor
- **Crafting** - Harps (AFK), dragonhide bodies
- **Fletching** - Broad arrows, ascension bolts
- **Runecrafting** - Runespan (AFK), Abyss (active)
- **Cooking** - Sailfish, cooking training at Lumbridge
- **Firemaking** - Jadinko Lair, bonfire training
- **Herblore** - Make overloads if 96+, else super sets
- **Construction** - Mahogany tables, flatpacks

#### Support Skills

- **Agility** - Anachronia Agility Course, Hefin Course (Prifddinas)
- **Thieving** - Safecracking, Prif elves (AFK)
- **Slayer** - Highest level master you can access
- **Dungeoneering** - Daily Sinkholes, ED1/2/3, token farming
- **Invention** - Augment and siphon gear, discover blueprints

## Efficient Leveling Strategy

### The 75+ Method

1. Check your stats and find all skills under 75
2. Get ALL skills to 75 first (unlocks Plague's End and most content)
3. Then push combat and money-making skills to 90+
4. Then work on 99s and 120s

### The Max Efficiency Method

1. Get all skills to 50
2. Get all skills to 70
3. Get all skills to 80
4. Get all skills to 90
5. Max all to 99
6. Work on 120s

### The Enjoyment Method

Train what you enjoy, ignore the meta. It's a game!

## Daily Activities for XP

Do these every day for free XP:

1. **Daily Challenges** - 20-50k XP in various skills
2. **Vis Wax** - Runecrafting daily (250k profit + XP)
3. **Cache** - Divination D&D (200k+ XP for 10 minutes)
4. **Sinkholes** - Dungeoneering D&D (huge XP)
5. **Big Chinchompa** - Hunter D&D
6. **Ports** - Player-owned Ports (passive rewards)
7. **Farming Runs** - Tree runs for passive XP
8. **POF** - Player-owned Farm animals

## Money-Making for Buyable Skills

If you need GP for buyable skills:

### Low-Level Money (Requirements: Low)

- **Vis Wax** - 250k-500k/day (50 Runecrafting)
- **Shop Runs** - 500k-1M/day
- **Herb Runs** - 500k-1M/hr (varied Farming)

### Mid-Level Money (Requirements: Medium)

- **Barrows** - 2-3M/hr (70 combat stats)
- **Slayer** - 2-5M/hr (80+ combat)
- **Elite Dungeons** - 3-5M/hr (85+ combat)

### High-Level Money (Requirements: High)

- **Raksha** - 15-20M/hr (90+ combat, experience)
- **Ambassador (ED3)** - 10-15M/hr (92+ combat)
- **Arch-Glacor** - 8-12M/hr (85+ combat)
- **Croesus** - 10-15M/hr (skilling boss, no combat)

## Recommended Training Order

For maximum efficiency, train in this order:

1. **Quests** - Get major quest unlocks first
2. **Divination 80** - Unlock Invention
3. **Crafting 80** - Unlock Invention
4. **Invention 120** - Get perks while training other skills
5. **Combat 99s** - Money-making and bossing
6. **Herblore 96** - Overloads
7. **Prayer 95** - Curses
8. **Summoning 96** - Pack Yak
9. **All skills to 90** - Balanced progress
10. **Push for Max** - 99 all skills
11. **120s** - Pick your favorites

## Related Pages

- [Character Tracker](character-tracker) - Check your current stats
- [Quest Progress](quest-progress) - See quest requirements
- [All Skill Guides](intro#skill-guides) - Browse detailed leveling guides

## External Calculators

- [Skill Calculator](https://runescape.wiki/w/Calculator:Skill_calculators) - Plan your training
- [Quest Calculator](https://runescape.wiki/w/Calculator:Quest_requirements) - See what quests you can do
- [Combat Level Calculator](https://runescape.wiki/w/Calculator:Combat_level) - Calculate your combat level

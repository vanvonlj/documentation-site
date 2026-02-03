---
sidebar_position: 2
---

# Character Tracker

Track your RuneScape 3 character stats, experience, and rankings using various tracking services.

## VanDuran's Stats

Quick links to view VanDuran's current stats:
- [RuneClan Profile](https://runeclan.com/user/VanDuran)
- [Official Hiscores](https://secure.runescape.com/m=hiscore/compare?user1=VanDuran)
- [RuneMetrics](https://apps.runescape.com/runemetrics/app/overview/player/VanDuran)

## Look Up Any Player

Enter a RuneScape username to view their stats on various tracking sites:

<details>
<summary><strong>RuneClan Stats Lookup</strong></summary>

RuneClan provides comprehensive player tracking, XP gains, and activity monitoring.

<form action="https://runeclan.com/user/" method="get" target="_blank">
  <label for="runeclan-username">Username:</label><br/>
  <input type="text" id="runeclan-username" name="user" placeholder="Enter RS3 username" style={{padding: '8px', margin: '10px 0', width: '300px'}} required /><br/>
  <button type="submit" style={{padding: '8px 16px', cursor: 'pointer'}}>View on RuneClan</button>
</form>

**Note:** The form will redirect to `https://runeclan.com/user/USERNAME`

</details>

<details>
<summary><strong>Official Hiscores Lookup</strong></summary>

View official RuneScape hiscores and rankings.

<form id="hiscores-form" onsubmit="event.preventDefault(); window.open('https://secure.runescape.com/m=hiscore/compare?user1=' + document.getElementById('hiscores-username').value, '_blank');">
  <label for="hiscores-username">Username:</label><br/>
  <input type="text" id="hiscores-username" placeholder="Enter RS3 username" style={{padding: '8px', margin: '10px 0', width: '300px'}} required /><br/>
  <button type="submit" style={{padding: '8px 16px', cursor: 'pointer'}}>View on Hiscores</button>
</form>

</details>

<details>
<summary><strong>RuneMetrics Lookup</strong></summary>

Official Jagex player metrics and activity tracking.

<form id="runemetrics-form" onsubmit="event.preventDefault(); window.open('https://apps.runescape.com/runemetrics/app/overview/player/' + document.getElementById('runemetrics-username').value, '_blank');">
  <label for="runemetrics-username">Username:</label><br/>
  <input type="text" id="runemetrics-username" placeholder="Enter RS3 username" style={{padding: '8px', margin: '10px 0', width: '300px'}} required /><br/>
  <button type="submit" style={{padding: '8px 16px', cursor: 'pointer'}}>View on RuneMetrics</button>
</form>

</details>

## Available Tracking Services

### RuneClan
- **Best for:** XP tracking, gains tracking, clan management
- **Features:**
  - Daily/weekly/monthly XP gains
  - Skill calculators
  - Boss kill counts
  - Activity tracking
- **URL Format:** `https://runeclan.com/user/USERNAME`

### Official RS3 Hiscores
- **Best for:** Official rankings and comparisons
- **Features:**
  - Official skill rankings
  - Minigame scores
  - Boss kill counts
  - Activity hiscores
- **URL Format:** `https://secure.runescape.com/m=hiscore/compare?user1=USERNAME`

### RuneMetrics (Official)
- **Best for:** Detailed activity logs and quest tracking
- **Features:**
  - XP per hour tracking
  - Quest completion status
  - Recent activities
  - Drop logs (requires RuneMetrics Pro subscription)
- **URL Format:** `https://apps.runescape.com/runemetrics/app/overview/player/USERNAME`

## Quick Stats Overview

| Skill | Level | XP | Rank |
|-------|-------|-----|------|
| Overall | - | - | - |
| Attack | - | - | - |
| Defence | - | - | - |
| Strength | - | - | - |
| Constitution | - | - | - |
| Ranged | - | - | - |
| Prayer | - | - | - |
| Magic | - | - | - |
| Cooking | - | - | - |
| Woodcutting | - | - | - |
| Fletching | - | - | - |
| Fishing | - | - | - |
| Firemaking | - | - | - |
| Crafting | - | - | - |
| Smithing | - | - | - |
| Mining | - | - | - |
| Herblore | - | - | - |
| Agility | - | - | - |
| Thieving | - | - | - |
| Slayer | - | - | - |
| Farming | - | - | - |
| Runecrafting | - | - | - |
| Hunter | - | - | - |
| Construction | - | - | - |
| Summoning | - | - | - |
| Dungeoneering | - | - | - |
| Divination | - | - | - |
| Invention | - | - | - |

*Use the links above to view live stats for VanDuran or any other player.*

## Tips for Tracking Progress

1. **Bookmark Your RuneClan Page** - Set up daily/weekly goals and track your gains
2. **Use RuneMetrics Pro** - If you want detailed drop logs and activity tracking (requires subscription)
3. **Check Hiscores Regularly** - Track your ranking improvements
4. **Set XP Goals** - Use the skill calculators to plan your training sessions
5. **Track Boss KC** - Monitor your boss kill counts and rare drops

## Related Pages

- [What to Do Next](what-to-do-next) - Get personalized training recommendations
- [Quest Progress](quest-progress) - Track your quest completion
- [Skill Guides](intro#skill-guides) - Browse all leveling guides

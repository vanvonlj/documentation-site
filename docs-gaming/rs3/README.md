# RuneScape 3 Guide Structure

This directory contains comprehensive guides for RuneScape 3, focused on character VanDuran's progression.

## Structure

```
docs-gaming/rs3/
├── intro.md                    # Main RS3 landing page
├── character-tracker.md         # Stat tracking with username input forms
├── quest-progress.md           # Quest tracking and requirements
├── what-to-do-next.md          # Personalized recommendations based on stats
├── leveling-guides/            # Individual skill guides
│   ├── combat-overview.md      # All combat skills overview
│   ├── mining.md               # Mining 1-120 guide
│   ├── herblore.md             # Herblore 1-120 guide (Overloads!)
│   ├── slayer.md               # Slayer 1-120 guide
│   └── _template.md            # Template for creating new skill guides
└── README.md                   # This file
```

## Key Features

### 1. Character Tracking ([character-tracker.md](character-tracker.md))
- Direct links to VanDuran's stats on various platforms
- Input forms that redirect to RuneClan, RS3 Hiscores, and RuneMetrics
- Stats table for quick reference
- Multiple tracking service integrations:
  - **RuneClan** - XP tracking and gains
  - **RS3 Hiscores** - Official rankings
  - **RuneMetrics** - Jagex's official tracker

### 2. Quest Progress ([quest-progress.md](quest-progress.md))
- Quest completion tracking
- Important quest series (World Guardian, Elf series, etc.)
- Quest point milestones
- Quest rewards and unlocks
- Username lookup form for any player

### 3. What to Do Next ([what-to-do-next.md](what-to-do-next.md))
- Training recommendations by level bracket
- Lowest stat identification strategy
- Daily activities for XP
- Money-making recommendations
- Efficient training order
- External calculator links

### 4. Skill Leveling Guides

Each guide includes:
- Training methods by level range
- Best locations for each level
- Equipment progression
- XP boosts and consumables
- Money-making methods
- Tips for efficient training
- Quest requirements
- Cost breakdowns (where applicable)
- Related resources

**Completed Guides:**
- Combat Overview (all combat skills)
- Mining (1-120)
- Herblore (1-120, includes Overload training)
- Slayer (1-120)

**To Create:**
You can use the `_template.md` file to create guides for:
- Attack, Strength, Defence, Ranged, Magic, Prayer, Constitution, Summoning
- Fishing, Woodcutting, Farming, Hunter, Divination
- Smithing, Crafting, Fletching, Runecrafting, Cooking, Firemaking, Construction
- Agility, Thieving, Dungeoneering, Invention

## Username Input Forms

The character tracker uses HTML forms that redirect to external sites:

```html
<form action="https://runeclan.com/user/" method="get" target="_blank">
  <input type="text" name="user" placeholder="Enter RS3 username" />
  <button type="submit">View on RuneClan</button>
</form>
```

This allows users to:
1. Enter their username on YOUR site
2. Click submit
3. Be redirected to the tracking site with their username in the URL

## External Resources Integrated

- **RuneClan** - `https://runeclan.com/user/USERNAME`
- **RS3 Hiscores** - `https://secure.runescape.com/m=hiscore/compare?user1=USERNAME`
- **RuneMetrics** - `https://apps.runescape.com/runemetrics/app/overview/player/USERNAME`
- **Quest Progress** - `https://apps.runescape.com/runemetrics/app/quests/player/USERNAME`

## Creating New Skill Guides

1. Copy `_template.md` to a new file (e.g., `fishing.md`)
2. Replace all `[SKILL NAME]` placeholders
3. Fill in training methods for each level bracket
4. Add equipment, locations, and tips
5. Include cost estimates if it's a buyable skill
6. Add RS Wiki links and related guides

## Tips for Maintaining

1. **Update GP values** - Prices change with GE markets
2. **Add new content** - When Jagex releases new training methods
3. **Link between guides** - Keep internal navigation smooth
4. **Update VanDuran's progress** - As the character advances
5. **Add screenshots** - If you want to enhance guides visually

## Next Steps

### High Priority Guides to Create
1. **Prayer** - Essential for Curses (95 Prayer)
2. **Farming** - Passive XP gains, herb farming for Herblore
3. **Invention** - Elite skill, very important for perks
4. **Dungeoneering** - Required for many unlocks
5. **Agility** - Required for Plague's End

### Medium Priority
6. **Magic** - Combat training specifics
7. **Ranged** - Combat training specifics
8. **Summoning** - Familiars and Pack Yak
9. **Crafting** - Required for Invention and Plague's End
10. **Divination** - Required for Invention

### Lower Priority
- Individual combat skills (Attack, Strength, Defence)
- Gathering skills (Fishing, Woodcutting)
- Artisan skills (Cooking, Smithing, Fletching, etc.)

## Notes

- All skill guides follow the same structure for consistency
- Forms are styled inline with React-style JSX for Docusaurus compatibility
- External links open in new tabs (`target="_blank"`)
- All guides include "Related Guides" section for navigation
- Cost estimates are approximate and should be updated regularly

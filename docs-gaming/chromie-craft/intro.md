---
sidebar_position: 1
---

# Chromie Craft

[Chromie Craft](https://www.chromiecraft.com/) is a **progressive Wrath of the Lich King PvE server** running the 3.3.5a client, operated by the **AzerothCore team** themselves. It's non-profit, community-driven, fully open-source, and explicitly anti-pay-to-win — every fix and improvement is contributed back to the AzerothCore project.

The progression model is what makes it different. Rather than launching at the WotLK level cap, the server **gradually unlocks content**: Vanilla raids first, then TBC, then Wrath, with the level cap and dungeon/raid tiers rolling out phase by phase over time. As of **May 2026** the server is in **Northrend Phase 2B** with the level 80 cap live and Naxxramas, Eye of Eternity, and Obsidian Sanctum available. The next phases (2C, 3, 4) will roll out Wintergrasp, Ulduar, ToC, and ICC. **The server stops at WotLK** — it will not progress into Cataclysm.

For a guide focused on **dungeons and the warrior class**, this means everything you need is already live: every Vanilla, TBC, and WotLK 5-man, both normal and heroic.

## What's in this section

A practical guide for playing a **Tauren Warrior** focused on **5-man dungeons from level 1 to 80** — both tanking (Protection) and DPSing (Arms or Fury). Raid content is intentionally out of scope.

- [Warrior Tank/DPS Guide](./warrior-tank-dps-guide/overview) — overview, core concepts, and dungeon-by-dungeon notes for Vanilla, TBC, and WotLK content.

## Server features that affect dungeon play

### Rates

- **XP rate: x2 base** through level 80 (verified on the [Rates & Changes](https://www.chromiecraft.com/en/rates-n-changes/) page).
- **"Joyous Journeys" boost:** an extra +50% XP, currently active until **May 20, 2026** — meaning effective XP is **x3** for the moment.
- **Personalize your XP:** use the `.xp on` and `.xp off` commands at any time, free, to disable XP gain entirely (level locking) or re-enable it. You can also set a custom rate from 0.1x to 2x via the `.weekendxp rate <value>` command — e.g. `.weekendxp rate 1` to play at blizzlike pacing.
- **Recruit-A-Friend:** new accounts get permanent rested XP (kills/quests doubled) until level 68 or 30 days, whichever comes first.
- **Returning players:** inactive 6+ months get the Scroll of Resurrection rested boost.

### Level locking and twinking

ChromieCraft has **two ways** to stop XP:

1. **`.xp off` command** — free, instant, toggleable. The modern method.
2. **NPCs in Stormwind and Orgrimmar** — small gold cost. Older mechanism but still works.

For dedicated twinks, the server also provides:

- **`.carboncopy` command** — duplicates your character so you can keep one locked at e.g. level 19/29/39 *and* keep leveling the original. This is unique to ChromieCraft and is the cleanest way to maintain bracket twinks without committing your "main."
- **`.beta activate`** — opt-in early access to unreleased phase content (with the warning that progression earned in early-access may be partially reset later).

### Cross-faction

ChromieCraft is **fully cross-faction** for the things that matter:

- Cross-faction guilds (shared tabard, bank, chat).
- Cross-faction parties, raids, RDF queues, battlegrounds, arenas.
- Cross-faction whisper / chat.

**Caveats:** quests are still faction-locked (Horde can't do Alliance quests and vice versa), and **city guards still attack opposite-faction players** in capitals. So a Tauren Warrior can party with Alliance, but should not stroll into Stormwind unless they want a fight.

### Heroic dungeons

- **WotLK heroics:** auto-unlocked at **level 80**. No key required, no reputation gating. Just queue Heroic via RDF.
- **TBC heroics:** require **Revered with the relevant faction** (Cenarion Expedition, Lower City, Sha'tar, Keepers of Time, Honor Hold/Thrallmar, Sporeggar) and a **purchased heroic key** from the rep quartermaster. Walked-into manually, not via RDF.

### Other quality-of-life

- **Talent reset: FREE.** Respec as often as you like at no cost.
- **Dual specialization:** standard 1000g cost at level 40 (no discount).
- **Transmog:** available at NPCs in tailoring shops in **Stormwind** and **Orgrimmar**. Toggle visuals via `.transmog off` / `.transmog on`.
- **Engineering goggles:** epic goggles are trainer-learned (not player-crafted-only).
- **Karazhan attunement:** the full questline works.
- **Vanilla raid sizes (out of scope for this guide, but worth knowing):** MC, BWL, AQ40 are **25-player**, ZG and AQ20 are **20-player** — sized down from retail to match the actual live population.

### Challenge modes

ChromieCraft offers three opt-in challenge modes that flip rates back to **x1 (blizzlike)** and add unique rules + rewards:

- **Hardcore:** permadeath. One life. Death = character locked.
- **Ironman:** no gear above white quality, no profession use, etc.
- **Bloodthirsty:** PvP-flagged everywhere outside cities; loot drops on death.

Combinations are allowed for those chasing exclusive titles/mounts.

## Quick connection notes

- **Client:** WotLK 3.3.5a. Use the standalone client offered by ChromieCraft directly — easiest path; the realmlist is pre-baked.
- **Realmlist:** check the [Downloads](https://chromiecraft.fandom.com/wiki/Downloads) page on the wiki for the current connection string.
- **Account creation:** at [chromiecraft.com](https://www.chromiecraft.com/) — free.

## Sources

The facts above are pulled from official Chromie Craft pages:

- [Rates & Changes](https://www.chromiecraft.com/en/rates-n-changes/)
- [Progression](https://www.chromiecraft.com/en/progression/)
- [Welcome to ChromieCraft – 2026 update](https://www.chromiecraft.com/en/welcome-to-chromiecraft-2026-update/)
- [Cross-faction guilds live on ChromieCraft](https://www.chromiecraft.com/en/crossfaction-guilds-live-on-chromiecraft/)
- [Custom server commands](https://www.chromiecraft.com/en/custom-server-commands/)
- [About](https://www.chromiecraft.com/en/about/)
- [ChromieCraft Wiki on Fandom](https://chromiecraft.fandom.com/wiki/ChromieCraft_Wiki)

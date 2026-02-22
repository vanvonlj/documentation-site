/**
 * Turtle WoW Hunter Best in Slot (BIS) Item Data
 *
 * AP Equivalent formula (approximate hunter stat weights):
 *   AP Equiv = (AGI * 2) + (STR * 1) + (Crit * 25) + (Hit * 15) + AP
 *
 * Weapon AP Equiv includes weapon DPS contribution:
 *   Weapon AP Equiv = (weaponDps * 14) + stat-based AP Equiv
 *
 * Data sourced from community BIS spreadsheet. Verify stats in-game.
 */

export type ItemQuality =
  | "poor"
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary";

export interface HunterBisItem {
  item: string;
  slot: string;
  location: string;
  quality: ItemQuality;
  agi: number;
  sta: number;
  str: number;
  int: number;
  hit: number;
  crit: number;
  ap: number;
  apEquiv: number;
  // Weapon-specific fields
  minDmg?: number;
  maxDmg?: number;
  speed?: number;
  dps?: number;
  notes?: string;
}

/**
 * Compute AP Equivalent from stats using standard hunter weights.
 * For weapons, pass weaponDps to include weapon contribution.
 */
function calcApEquiv(
  agi: number,
  str: number,
  crit: number,
  hit: number,
  ap: number,
  weaponDps = 0
): number {
  return Math.round(
    agi * 2 + str * 1 + crit * 25 + hit * 15 + ap + weaponDps * 14
  );
}

// Helper to create items with computed AP Equiv
function item(
  name: string,
  slot: string,
  location: string,
  quality: ItemQuality,
  stats: {
    agi?: number;
    sta?: number;
    str?: number;
    int?: number;
    hit?: number;
    crit?: number;
    ap?: number;
    minDmg?: number;
    maxDmg?: number;
    speed?: number;
    dps?: number;
    notes?: string;
  }
): HunterBisItem {
  const agi = stats.agi ?? 0;
  const sta = stats.sta ?? 0;
  const str = stats.str ?? 0;
  const int = stats.int ?? 0;
  const hit = stats.hit ?? 0;
  const crit = stats.crit ?? 0;
  const ap = stats.ap ?? 0;
  const dps = stats.dps ?? 0;

  return {
    item: name,
    slot,
    location,
    quality,
    agi,
    sta,
    str,
    int,
    hit,
    crit,
    ap,
    apEquiv: calcApEquiv(agi, str, crit, hit, ap, dps),
    ...(stats.minDmg !== undefined && { minDmg: stats.minDmg }),
    ...(stats.maxDmg !== undefined && { maxDmg: stats.maxDmg }),
    ...(stats.speed !== undefined && { speed: stats.speed }),
    ...(stats.dps !== undefined && { dps: stats.dps }),
    ...(stats.notes && { notes: stats.notes }),
  };
}

export const hunterBisItems: HunterBisItem[] = [
  // ============================================================
  // HEAD
  // ============================================================
  item("Dragonstalker's Helm", "Head", "BWL", "epic", {
    agi: 28,
    sta: 18,
    int: 9,
    crit: 1,
  }),
  item("Circlet of Applied Force", "Head", "BWL Quest", "rare", {
    agi: 12,
    str: 20,
    crit: 2,
    hit: 1,
    ap: 28,
  }),
  item("Crown of Destruction", "Head", "MC", "rare", {
    crit: 2,
    hit: 1,
    ap: 44,
  }),
  item("Sylvan Crown", "Head", "DM", "rare", {
    agi: 15,
    sta: 14,
    int: 8,
  }),
  item("Beastmaster's Cap", "Head", "UBRS", "rare", {
    agi: 13,
    sta: 18,
    int: 6,
    hit: 1,
  }),
  item("Mask of the Unforgiven", "Head", "Strath", "rare", {
    agi: 20,
    sta: 8,
    crit: 2,
  }),
  item("Helm of Latent Power", "Head", "AQ20", "rare", {
    agi: 18,
    sta: 15,
    hit: 1,
    crit: 1,
  }),
  item("Garona's Guise", "Head", "Quest", "rare", {
    agi: 10,
    sta: 12,
    crit: 1,
    ap: 20,
    notes: "AQ Class Quest",
  }),

  // ============================================================
  // NECK
  // ============================================================
  item("Choker of the Shifting Sands", "Neck", "AQ Quest", "epic", {
    agi: 13,
    sta: 7,
    hit: 1,
  }),
  item("Prestor's Talisman of Connivery", "Neck", "BWL", "epic", {
    agi: 30,
  }),
  item("Onyxia Tooth Pendant", "Neck", "Ony Quest", "rare", {
    agi: 12,
    crit: 1,
    hit: 1,
  }),
  item("Barbed Choker", "Neck", "BWL", "epic", {
    agi: 8,
    sta: 9,
    crit: 1,
    ap: 34,
  }),
  item("Mark of Fordring", "Neck", "Quest", "rare", {
    agi: 10,
    sta: 4,
    crit: 1,
    ap: 20,
  }),

  // ============================================================
  // SHOULDER
  // ============================================================
  item("Dragonstalker's Spaulders", "Shoulder", "BWL", "epic", {
    agi: 18,
    sta: 14,
    int: 6,
    ap: 28,
  }),
  item("Barrage Shoulders", "Shoulder", "AQ40", "epic", {
    agi: 15,
    sta: 16,
    crit: 1,
    ap: 20,
  }),
  item("Truestrike Shoulders", "Shoulder", "UBRS", "rare", {
    str: 12,
    hit: 2,
    ap: 24,
  }),
  item("Highlander's Chain Pauldrons", "Shoulder", "AB", "rare", {
    agi: 11,
    sta: 15,
    ap: 20,
  }),
  item("Black Dragonscale Shoulders", "Shoulder", "Crafted", "rare", {
    sta: 8,
    hit: 1,
    ap: 40,
  }),
  item("Abyssal Leather Shoulders", "Shoulder", "World", "rare", {
    agi: 12,
    sta: 12,
    crit: 1,
    hit: 1,
  }),

  // ============================================================
  // BACK
  // ============================================================
  item("Cloak of the Unseen Path", "Back", "AQ Quest", "epic", {
    agi: 22,
    sta: 7,
  }),
  item("Cloak of Concentrated Hatred", "Back", "BWL", "epic", {
    agi: 11,
    hit: 1,
    ap: 20,
  }),
  item("Cloak of the Shrouded Mists", "Back", "AQ40", "epic", {
    agi: 18,
    sta: 12,
    crit: 1,
  }),
  item("Cloak of Draconic Might", "Back", "BWL", "epic", {
    agi: 16,
    str: 14,
    sta: 8,
  }),
  item("Cloak of Firemaw", "Back", "BWL", "epic", {
    agi: 7,
    sta: 14,
    hit: 1,
    ap: 26,
  }),
  item("Cape of the Trinity", "Back", "AQ40", "epic", {
    agi: 14,
    sta: 10,
    hit: 1,
  }),
  item("Zulian Tigerhide Cloak", "Back", "ZG", "epic", {
    agi: 13,
    sta: 9,
    crit: 1,
  }),
  item("Blackveil Cloak", "Back", "AQ20", "rare", {
    agi: 12,
    sta: 8,
    ap: 14,
  }),

  // ============================================================
  // CHEST
  // ============================================================
  item("Dragonstalker's Breastplate", "Chest", "BWL", "epic", {
    agi: 24,
    sta: 25,
    int: 13,
    crit: 1,
    hit: 1,
  }),
  item("Malfurion's Blessed Bulwark", "Chest", "AQ40", "epic", {
    agi: 20,
    sta: 24,
    crit: 1,
    ap: 40,
  }),
  item("Vest of Swift Execution", "Chest", "AQ40", "epic", {
    agi: 17,
    sta: 15,
    hit: 2,
    ap: 32,
  }),
  item("Black Dragonscale Breastplate", "Chest", "Crafted", "rare", {
    sta: 12,
    hit: 1,
    ap: 50,
  }),
  item("Savage Gladiator Chain", "Chest", "BRD", "rare", {
    agi: 13,
    sta: 14,
    str: 14,
    crit: 2,
  }),
  item("Tombstone Breastplate", "Chest", "Scholo", "rare", {
    agi: 10,
    sta: 15,
    crit: 1,
    ap: 40,
  }),

  // ============================================================
  // WRIST
  // ============================================================
  item("Dragonstalker's Bracers", "Wrist", "BWL", "epic", {
    agi: 15,
    sta: 7,
    int: 4,
    ap: 24,
  }),
  item("Hive Defiler Wristguards", "Wrist", "AQ40", "epic", {
    agi: 14,
    sta: 10,
    hit: 1,
    ap: 20,
  }),
  item("Wristguards of Stability", "Wrist", "AQ40", "epic", {
    agi: 20,
    sta: 10,
    crit: 1,
  }),
  item("Bracers of the Eclipse", "Wrist", "AQ20", "rare", {
    agi: 13,
    sta: 9,
    ap: 22,
  }),
  item("Blackmist Armguards", "Wrist", "LBRS", "rare", {
    agi: 15,
    sta: 7,
    hit: 1,
  }),
  item("Beastmaster's Bindings", "Wrist", "UBRS", "rare", {
    agi: 12,
    sta: 6,
    int: 4,
    ap: 18,
  }),

  // ============================================================
  // HANDS
  // ============================================================
  item("Dragonstalker's Gauntlets", "Hands", "BWL", "epic", {
    agi: 19,
    sta: 14,
    int: 9,
    hit: 1,
  }),
  item("Gauntlets of Annihilation", "Hands", "AQ40", "epic", {
    str: 20,
    crit: 1,
    hit: 1,
    ap: 32,
  }),
  item("Gloves of Enforcement", "Hands", "AQ40", "epic", {
    agi: 16,
    sta: 15,
    hit: 1,
    ap: 26,
  }),
  item("Devilsaur Gauntlets", "Hands", "Crafted", "epic", {
    sta: 9,
    crit: 1,
    hit: 1,
    ap: 28,
  }),
  item("Aged Core Leather Gloves", "Hands", "MC", "epic", {
    agi: 15,
    sta: 13,
    crit: 1,
  }),

  // ============================================================
  // WAIST
  // ============================================================
  item("Sash of the Grand Hunt", "Waist", "AQ", "epic", {
    agi: 15,
    sta: 14,
    hit: 1,
    ap: 30,
  }),
  item("Highlander's Chain Girdle", "Waist", "AB", "rare", {
    agi: 10,
    sta: 15,
    ap: 18,
    hit: 1,
  }),
  item("Light Obsidian Belt", "Waist", "Crafted", "epic", {
    agi: 15,
  }),
  item("Beastmaster's Belt", "Waist", "UBRS", "rare", {
    agi: 11,
    sta: 7,
    int: 5,
    ap: 20,
  }),
  item("Belt of Preserved Heads", "Waist", "ZG", "epic", {
    agi: 12,
    sta: 9,
    crit: 1,
    ap: 20,
  }),
  item("Blooddrenched Grips", "Waist", "AQ20", "rare", {
    agi: 8,
    sta: 12,
    ap: 28,
  }),

  // ============================================================
  // LEGS
  // ============================================================
  item("Dragonstalker's Legguards", "Legs", "BWL", "epic", {
    agi: 22,
    sta: 21,
    int: 13,
    crit: 1,
    ap: 28,
  }),
  item("Scaled Sand Reaver Leggings", "Legs", "AQ40", "epic", {
    agi: 20,
    sta: 18,
    hit: 2,
    ap: 36,
  }),
  item("Leggings of Apocalypse", "Legs", "AQ40", "epic", {
    agi: 18,
    sta: 15,
    crit: 2,
    ap: 32,
  }),
  item("Black Dragonscale Leggings", "Legs", "Crafted", "rare", {
    sta: 14,
    hit: 1,
    ap: 54,
  }),
  item("Devilsaur Leggings", "Legs", "Crafted", "epic", {
    sta: 12,
    crit: 1,
    hit: 1,
    ap: 46,
  }),
  item("Blademaster Leggings", "Legs", "AQ20", "rare", {
    agi: 17,
    sta: 14,
    crit: 1,
    ap: 24,
  }),

  // ============================================================
  // FEET
  // ============================================================
  item("Dragonstalker's Greaves", "Feet", "BWL", "epic", {
    agi: 18,
    sta: 24,
    int: 7,
    hit: 1,
  }),
  item("Boots of the Shadow Flame", "Feet", "BWL", "epic", {
    agi: 14,
    sta: 20,
    hit: 1,
    ap: 44,
  }),
  item("Highlander's Chain Greaves", "Feet", "AB", "rare", {
    agi: 12,
    sta: 15,
    ap: 20,
  }),
  item("Boots of the Fallen Hero", "Feet", "AQ40", "epic", {
    agi: 17,
    sta: 16,
    crit: 1,
    ap: 20,
  }),
  item("Blooddrenched Footpads", "Feet", "AQ20", "rare", {
    agi: 14,
    sta: 12,
    ap: 18,
  }),
  item("Windreaver Greaves", "Feet", "DM", "rare", {
    agi: 15,
    sta: 10,
    str: 8,
    crit: 1,
  }),

  // ============================================================
  // FINGER
  // ============================================================
  item("Ring of the Godslayer", "Finger", "AQ40", "epic", {
    agi: 17,
    sta: 15,
    hit: 1,
  }),
  item("Signet Ring of the Bronze Dragonflight", "Finger", "AQ Quest", "epic", {
    agi: 12,
    hit: 1,
    ap: 24,
  }),
  item("Master Dragonslayer's Ring", "Finger", "BWL Quest", "epic", {
    agi: 15,
    sta: 7,
    crit: 1,
    hit: 1,
  }),
  item("Circle of Applied Force", "Finger", "BWL", "epic", {
    str: 12,
    agi: 12,
    sta: 7,
    ap: 20,
  }),
  item("Quick Strike Ring", "Finger", "MC", "epic", {
    str: 5,
    crit: 1,
    ap: 30,
  }),
  item("Band of Accuria", "Finger", "MC", "epic", {
    agi: 16,
    sta: 10,
    hit: 2,
  }),
  item("Seal of the Gurubashi Berserker", "Finger", "ZG", "epic", {
    sta: 10,
    crit: 1,
    ap: 40,
  }),
  item("Don Julio's Band", "Finger", "PvP", "epic", {
    sta: 7,
    crit: 1,
    hit: 1,
    ap: 16,
  }),
  item("Tarnished Elven Ring", "Finger", "DM", "epic", {
    agi: 15,
    sta: 14,
    hit: 1,
  }),
  item("Band of Jin", "Finger", "ZG", "rare", {
    agi: 9,
    sta: 6,
    crit: 1,
    ap: 14,
  }),

  // ============================================================
  // TRINKET
  // ============================================================
  item("Blackhand's Breadth", "Trinket", "UBRS Quest", "rare", {
    crit: 2,
  }),
  item("Royal Seal of Eldre'Thalas", "Trinket", "DM Quest", "rare", {
    ap: 48,
  }),
  item("Devilsaur Eye", "Trinket", "Quest", "rare", {
    hit: 2,
    notes: "Use: +150 AP for 20 sec",
  }),
  item("Drake Fang Talisman", "Trinket", "BWL", "epic", {
    hit: 2,
    ap: 56,
    notes: "Proc: 2% chance on hit +200 AP for 10 sec",
  }),
  item("Earthstrike", "Trinket", "Cenarion Circle", "epic", {
    notes: "Use: +280 AP for 20 sec",
  }),
  item("Badge of the Swarmguard", "Trinket", "AQ40", "epic", {
    notes: "Use: On-hit proc reduces target armor",
  }),
  item("Jom Gabbar", "Trinket", "AQ40", "epic", {
    notes: "Use: Stacking AP buff every 2 sec",
  }),
  item("Rune of the Guard Captain (Horde)", "Trinket", "Quest", "rare", {
    ap: 20,
    crit: 1,
  }),
  item("Heart of Wyrmthalak", "Trinket", "LBRS", "rare", {
    sta: 12,
    ap: 24,
    notes: "Proc: +200 AP for 10 sec",
  }),
  item("Mark of the Champion (Undead)", "Trinket", "Naxx", "epic", {
    ap: 150,
    notes: "+150 AP vs Undead only",
  }),

  // ============================================================
  // RANGED WEAPONS
  // ============================================================
  item("Huhuran's Stinger", "Ranged", "AQ40", "epic", {
    agi: 0,
    hit: 2,
    ap: 18,
    minDmg: 84,
    maxDmg: 126,
    speed: 2.7,
    dps: 38.89,
  }),
  item("Ashjre'thul, Crossbow of Smiting", "Ranged", "BWL", "epic", {
    crit: 1,
    hit: 2,
    ap: 24,
    minDmg: 89,
    maxDmg: 133,
    speed: 3.4,
    dps: 32.65,
    notes: "Best slow ranged for Aimed Shot",
  }),
  item("Striker's Mark", "Ranged", "MC", "epic", {
    crit: 1,
    ap: 22,
    minDmg: 69,
    maxDmg: 129,
    speed: 2.5,
    dps: 39.6,
  }),
  item("Dragonbreath Hand Cannon", "Ranged", "BWL", "epic", {
    hit: 1,
    ap: 14,
    minDmg: 78,
    maxDmg: 130,
    speed: 2.8,
    dps: 37.14,
  }),
  item("Silithid Husked Launcher", "Ranged", "AQ40", "epic", {
    agi: 7,
    sta: 4,
    hit: 1,
    minDmg: 80,
    maxDmg: 120,
    speed: 2.6,
    dps: 38.46,
  }),
  item("Larvae of the Great Worm", "Ranged", "AQ40", "epic", {
    agi: 9,
    crit: 1,
    minDmg: 76,
    maxDmg: 114,
    speed: 2.9,
    dps: 32.76,
  }),
  item("Crossbow of Imminent Doom", "Ranged", "AQ20", "rare", {
    crit: 1,
    ap: 14,
    minDmg: 64,
    maxDmg: 96,
    speed: 3.2,
    dps: 25.0,
  }),
  item("Bow of Taut Sinew", "Ranged", "DM", "rare", {
    agi: 6,
    hit: 1,
    minDmg: 55,
    maxDmg: 102,
    speed: 2.8,
    dps: 28.04,
  }),
  item("Heartstriker", "Ranged", "UBRS", "rare", {
    agi: 7,
    sta: 3,
    crit: 1,
    minDmg: 51,
    maxDmg: 78,
    speed: 2.6,
    dps: 24.81,
  }),
  item("Blackcrow", "Ranged", "LBRS", "rare", {
    agi: 3,
    hit: 1,
    ap: 14,
    minDmg: 53,
    maxDmg: 80,
    speed: 3.0,
    dps: 22.17,
  }),
  item("Ancient Bone Bow", "Ranged", "Scholo", "rare", {
    hit: 1,
    ap: 20,
    minDmg: 44,
    maxDmg: 67,
    speed: 2.8,
    dps: 19.82,
  }),
  item("Soulstring", "Ranged", "Naxx", "epic", {
    agi: 14,
    crit: 1,
    hit: 1,
    minDmg: 95,
    maxDmg: 143,
    speed: 3.0,
    dps: 39.67,
  }),

  // ============================================================
  // MELEE WEAPONS (Stat Sticks)
  // ============================================================
  item("Barb of the Sand Reaver", "Two-Hand", "AQ40", "epic", {
    agi: 28,
    sta: 12,
    crit: 1,
    ap: 0,
    minDmg: 190,
    maxDmg: 286,
    speed: 3.4,
    dps: 70.0,
    notes: "Best melee stat stick for hunters",
  }),
  item("Dark Edge of Insanity", "Two-Hand", "AQ40", "epic", {
    agi: 15,
    str: 28,
    hit: 2,
    minDmg: 210,
    maxDmg: 316,
    speed: 3.5,
    dps: 75.14,
    notes: "C'Thun drop",
  }),
  item("Chromatically Tempered Sword", "Main Hand", "BWL Quest", "epic", {
    agi: 14,
    str: 14,
    crit: 1,
    hit: 1,
    minDmg: 106,
    maxDmg: 198,
    speed: 2.6,
    dps: 58.46,
  }),
  item("Brutality Blade", "Main Hand", "MC", "epic", {
    agi: 9,
    str: 9,
    crit: 1,
    minDmg: 90,
    maxDmg: 168,
    speed: 2.5,
    dps: 51.6,
  }),
  item("Blessed Qiraji War Axe", "Main Hand", "AQ40", "epic", {
    agi: 14,
    sta: 10,
    crit: 1,
    ap: 28,
    minDmg: 110,
    maxDmg: 205,
    speed: 2.6,
    dps: 60.58,
  }),
  item("Barbarous Blade", "Two-Hand", "DM", "rare", {
    agi: 8,
    str: 22,
    crit: 1,
    ap: 60,
    minDmg: 137,
    maxDmg: 207,
    speed: 3.5,
    dps: 49.14,
  }),
  item("Bone Slicing Hatchet", "Main Hand", "Strath", "rare", {
    agi: 13,
    crit: 1,
    minDmg: 57,
    maxDmg: 107,
    speed: 2.0,
    dps: 41.0,
  }),
  item("Blessed Qiraji Pugio", "Main Hand", "AQ40", "epic", {
    agi: 10,
    sta: 6,
    hit: 1,
    crit: 1,
    minDmg: 72,
    maxDmg: 134,
    speed: 1.7,
    dps: 60.59,
  }),

  // ============================================================
  // PVP ITEMS
  // ============================================================
  item("Marshal's Chain Helm", "Head", "PvP Vendor", "epic", {
    agi: 22,
    sta: 25,
    int: 10,
    crit: 1,
    hit: 1,
  }),
  item("Marshal's Chain Breastplate", "Chest", "PvP Vendor", "epic", {
    agi: 20,
    sta: 30,
    int: 12,
    crit: 1,
    ap: 34,
  }),
  item("Marshal's Chain Legguards", "Legs", "PvP Vendor", "epic", {
    agi: 18,
    sta: 28,
    int: 10,
    crit: 1,
    ap: 28,
  }),
  item("Marshal's Chain Boots", "Feet", "PvP Vendor", "epic", {
    agi: 16,
    sta: 20,
    hit: 1,
    ap: 26,
  }),
  item("Marshal's Chain Grips", "Hands", "PvP Vendor", "epic", {
    agi: 14,
    sta: 18,
    crit: 1,
    ap: 20,
  }),
  item("Knight Captain's Chain Hauberk", "Chest", "PvP Vendor", "rare", {
    agi: 14,
    sta: 20,
    int: 10,
    crit: 1,
    ap: 20,
  }),
  item("Knight Captain's Chain Leggings", "Legs", "PvP Vendor", "rare", {
    agi: 12,
    sta: 18,
    int: 8,
    ap: 24,
    crit: 1,
  }),
  item("Field Marshal's Chain Helm", "Head", "PvP Vendor", "epic", {
    agi: 24,
    sta: 27,
    int: 11,
    crit: 1,
    hit: 1,
    ap: 14,
  }),
  item("Field Marshal's Chain Breastplate", "Chest", "PvP Vendor", "epic", {
    agi: 22,
    sta: 32,
    int: 14,
    crit: 1,
    hit: 1,
    ap: 38,
  }),
  item("Grand Marshal's Hand Cannon", "Ranged", "PvP Vendor", "epic", {
    crit: 1,
    hit: 1,
    ap: 18,
    minDmg: 92,
    maxDmg: 138,
    speed: 2.9,
    dps: 39.66,
  }),
  item("Grand Marshal's Bullseye", "Ranged", "PvP Vendor", "epic", {
    agi: 5,
    crit: 1,
    ap: 24,
    minDmg: 88,
    maxDmg: 132,
    speed: 2.7,
    dps: 40.74,
  }),

  // ============================================================
  // MC ITEMS
  // ============================================================
  item("Giantstalker's Helm", "Head", "MC", "epic", {
    agi: 22,
    sta: 15,
    int: 6,
    crit: 1,
    notes: "Tier 1 set",
  }),
  item("Giantstalker's Breastplate", "Chest", "MC", "epic", {
    agi: 18,
    sta: 22,
    int: 10,
    hit: 1,
    notes: "Tier 1 set",
  }),
  item("Giantstalker's Legguards", "Legs", "MC", "epic", {
    agi: 16,
    sta: 18,
    int: 8,
    crit: 1,
    notes: "Tier 1 set",
  }),
  item("Giantstalker's Epaulets", "Shoulder", "MC", "epic", {
    agi: 14,
    sta: 12,
    int: 6,
    ap: 20,
    notes: "Tier 1 set",
  }),
  item("Giantstalker's Boots", "Feet", "MC", "epic", {
    agi: 14,
    sta: 15,
    int: 5,
    hit: 1,
    notes: "Tier 1 set",
  }),
  item("Giantstalker's Bracers", "Wrist", "MC", "epic", {
    agi: 10,
    sta: 6,
    int: 4,
    ap: 14,
    notes: "Tier 1 set",
  }),
  item("Giantstalker's Gloves", "Hands", "MC", "epic", {
    agi: 15,
    sta: 10,
    int: 7,
    crit: 1,
    notes: "Tier 1 set",
  }),
  item("Giantstalker's Belt", "Waist", "MC", "epic", {
    agi: 12,
    sta: 10,
    int: 5,
    ap: 18,
    notes: "Tier 1 set",
  }),

  // ============================================================
  // NAXXRAMAS ITEMS
  // ============================================================
  item("Cryptstalker Headpiece", "Head", "Naxx", "epic", {
    agi: 30,
    sta: 24,
    int: 12,
    crit: 1,
    hit: 1,
    ap: 14,
    notes: "Tier 3 set",
  }),
  item("Cryptstalker Spaulders", "Shoulder", "Naxx", "epic", {
    agi: 22,
    sta: 18,
    int: 8,
    crit: 1,
    ap: 34,
    notes: "Tier 3 set",
  }),
  item("Cryptstalker Tunic", "Chest", "Naxx", "epic", {
    agi: 28,
    sta: 30,
    int: 14,
    crit: 1,
    hit: 1,
    ap: 42,
    notes: "Tier 3 set",
  }),
  item("Cryptstalker Legguards", "Legs", "Naxx", "epic", {
    agi: 25,
    sta: 25,
    int: 12,
    crit: 1,
    hit: 1,
    ap: 36,
    notes: "Tier 3 set",
  }),
  item("Cryptstalker Handguards", "Hands", "Naxx", "epic", {
    agi: 22,
    sta: 16,
    int: 10,
    crit: 1,
    hit: 1,
    notes: "Tier 3 set",
  }),
  item("Cryptstalker Boots", "Feet", "Naxx", "epic", {
    agi: 20,
    sta: 20,
    int: 8,
    hit: 1,
    ap: 30,
    notes: "Tier 3 set",
  }),
  item("Cryptstalker Wristguards", "Wrist", "Naxx", "epic", {
    agi: 18,
    sta: 10,
    int: 6,
    hit: 1,
    ap: 28,
    notes: "Tier 3 set",
  }),
  item("Cryptstalker Girdle", "Waist", "Naxx", "epic", {
    agi: 16,
    sta: 14,
    int: 7,
    crit: 1,
    ap: 26,
    notes: "Tier 3 set",
  }),

  // ============================================================
  // DUNGEON / QUEST / WORLD DROP
  // ============================================================
  item("Cadaverous Armor", "Chest", "Scholo", "rare", {
    agi: 8,
    sta: 18,
    str: 8,
    crit: 1,
    ap: 20,
  }),
  item("Cadaverous Leggings", "Legs", "Scholo", "rare", {
    agi: 6,
    sta: 16,
    str: 12,
    ap: 28,
  }),
  item("Cadaverous Walkers", "Feet", "Scholo", "rare", {
    agi: 5,
    sta: 12,
    str: 10,
    crit: 1,
  }),
  item("Predator's Cloak", "Back", "Quest", "rare", {
    agi: 10,
    sta: 6,
    ap: 16,
  }),
  item("Carapace Spine Crossbow", "Ranged", "Strath", "rare", {
    agi: 4,
    crit: 1,
    minDmg: 44,
    maxDmg: 67,
    speed: 3.4,
    dps: 16.32,
  }),
  item("Bloodsoaked Pauldrons", "Shoulder", "Strath", "rare", {
    agi: 11,
    sta: 10,
    crit: 1,
    ap: 14,
  }),
  item("Bloodsoaked Greaves", "Feet", "Strath", "rare", {
    agi: 10,
    sta: 12,
    ap: 14,
  }),
  item("Bloodsoaked Gauntlets", "Hands", "Strath", "rare", {
    agi: 9,
    sta: 8,
    crit: 1,
  }),
  item("Mask of the Phaseshifter", "Head", "Scholo", "rare", {
    agi: 16,
    sta: 10,
    crit: 1,
  }),
  item("Wristguards of True Flight", "Wrist", "AQ40", "epic", {
    agi: 17,
    sta: 9,
    crit: 1,
    ap: 24,
  }),
  item("Gauntlets of Accuracy", "Hands", "Quest", "rare", {
    agi: 12,
    hit: 1,
    ap: 22,
  }),
  item("Sovereign's Talisman of Swelling", "Neck", "AQ20", "rare", {
    agi: 10,
    sta: 8,
    ap: 18,
  }),
  item("Primal Batskin Bracers", "Wrist", "Crafted", "epic", {
    agi: 9,
    sta: 4,
    crit: 1,
    hit: 1,
  }),
  item("Primal Batskin Gloves", "Hands", "Crafted", "epic", {
    agi: 11,
    sta: 6,
    crit: 1,
    hit: 1,
  }),
  item("Qiraji Execution Bracers", "Wrist", "AQ40", "epic", {
    str: 16,
    sta: 10,
    crit: 1,
    ap: 24,
  }),
  item("Gloves of the Redeemed Prophecy", "Hands", "Strath", "rare", {
    agi: 14,
    sta: 10,
    hit: 1,
  }),
  item("Leggings of the Demented Mind", "Legs", "AQ20", "rare", {
    agi: 15,
    sta: 12,
    hit: 1,
    ap: 20,
  }),
  item("Cloak of the Savior", "Back", "Naxx", "epic", {
    agi: 16,
    sta: 12,
    hit: 1,
    ap: 18,
  }),
  item("Onslaught Girdle", "Waist", "BWL", "epic", {
    str: 31,
    sta: 11,
    crit: 1,
    hit: 1,
  }),
  item("Bloodcaller", "Main Hand", "AQ20", "rare", {
    agi: 8,
    sta: 6,
    crit: 1,
    ap: 18,
    minDmg: 54,
    maxDmg: 101,
    speed: 1.8,
    dps: 43.06,
  }),
  item("Hatchet of Sundered Bone", "Main Hand", "Naxx", "epic", {
    agi: 16,
    sta: 8,
    crit: 1,
    hit: 1,
    ap: 26,
    minDmg: 85,
    maxDmg: 159,
    speed: 2.6,
    dps: 46.92,
  }),
  item("Nerubian Slavemaker", "Ranged", "Naxx", "epic", {
    agi: 12,
    crit: 1,
    hit: 1,
    ap: 24,
    minDmg: 98,
    maxDmg: 148,
    speed: 3.2,
    dps: 38.44,
    notes: "Naxx ranged weapon",
  }),
  item("Polished Ironwood Crossbow", "Ranged", "World", "rare", {
    agi: 8,
    hit: 1,
    minDmg: 49,
    maxDmg: 74,
    speed: 3.0,
    dps: 20.5,
  }),
  item("Gurubashi Dwarf Destroyer", "Ranged", "ZG", "epic", {
    agi: 10,
    crit: 1,
    minDmg: 65,
    maxDmg: 98,
    speed: 2.8,
    dps: 29.11,
  }),
  item("Fahrad's Reloading Repeater", "Ranged", "Quest", "rare", {
    hit: 1,
    ap: 14,
    minDmg: 41,
    maxDmg: 62,
    speed: 2.6,
    dps: 19.81,
  }),
  item("Rune of the Guard Captain", "Trinket", "Quest", "rare", {
    ap: 20,
    crit: 1,
    notes: "Horde quest reward",
  }),
  item("Warden's Ring", "Finger", "DM", "rare", {
    agi: 8,
    sta: 6,
    ap: 24,
  }),
  item("Painweaver Band", "Finger", "UBRS", "rare", {
    agi: 9,
    crit: 1,
    ap: 16,
  }),
  item("Songstone of Ironforge", "Trinket", "BRD", "rare", {
    crit: 1,
    ap: 20,
  }),
  item("Worb's Chill", "Trinket", "Quest", "rare", {
    hit: 1,
    ap: 28,
  }),
  item(
    "Champion's Pursuance (3% set)",
    "Chest",
    "PvP Vendor",
    "epic",
    {
      agi: 17,
      sta: 22,
      int: 8,
      ap: 24,
      notes: "Part of 3% crit PvP set bonus",
    }
  ),
  item("Might of Cenarius", "Finger", "AQ Quest", "epic", {
    agi: 15,
    sta: 10,
    ap: 20,
    notes: "Requires Exalted Cenarion Circle",
  }),

];

import React, { useState } from "react";
import styles from "./styles.module.css";
import { D4_ITEM_IDS } from "../data/d4-item-ids";

export interface D4ItemProps {
  name: string;
  itemId?: string;
  imageUrl?: string;
  rarity?: "common" | "magic" | "rare" | "legendary" | "unique" | "mythic";
  details?: {
    stats?: string[];
    source?: string;
    notes?: string;
  };
}

// Item name to URL slug for various CDN attempts
function itemNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, "") // Remove apostrophes
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

// Get item image URL from Maxroll's CDN
function getItemImageUrl(name: string, itemId?: string): string {
  // If itemId is provided, use Maxroll's d4-tools image CDN
  // Format: https://assets-ng.maxroll.gg/d4-tools/images/webp/{ID}.webp
  if (itemId) {
    return `https://assets-ng.maxroll.gg/d4-tools/images/webp/${itemId}.webp`;
  }

  // Fallback: no image ID provided
  return "";
}

export default function D4Item({
  name,
  itemId,
  imageUrl,
  rarity = "unique",
  details,
}: D4ItemProps): JSX.Element {
  const [showTooltip, setShowTooltip] = useState(false);
  const [imgError, setImgError] = useState(false);

  const rarityColors = {
    common: "#ffffff",
    magic: "#6969ff",
    rare: "#ffff00",
    legendary: "#ffa800",
    unique: "#bf642f",
    mythic: "#ca45ca",
  };

  // Auto-lookup itemId from mapping if not provided
  // Try exact match first, then partial match
  let resolvedItemId = itemId || D4_ITEM_IDS[name];

  // If no exact match, try to find a partial match
  if (!resolvedItemId) {
    const partialMatch = Object.keys(D4_ITEM_IDS).find(
      (key) => name.includes(key) || key.includes(name)
    );
    if (partialMatch) {
      resolvedItemId = D4_ITEM_IDS[partialMatch];
    }
  }

  // Use provided imageUrl or attempt to fetch from CDN
  const finalImageUrl = imageUrl || getItemImageUrl(name, resolvedItemId);

  // Fallback to generic unique item icon if image fails
  const fallbackUrl =
    "https://assets-ng.maxroll.gg/wordpress/Maxroll_Media_Uniques.webp";

  return (
    <span
      className={styles.d4Item}
      data-d4-id={resolvedItemId}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}>
      <span style={{ color: rarityColors[rarity] }}>{name}</span>
      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipImage}>
            <img
              src={imgError ? fallbackUrl : finalImageUrl}
              alt={name}
              onError={() => setImgError(true)}
            />
          </div>
          <div className={styles.tooltipContent}>
            <div
              className={styles.tooltipName}
              style={{ color: rarityColors[rarity] }}>
              {name}
            </div>
            {details?.stats && (
              <div className={styles.tooltipStats}>
                {details.stats.map((stat, idx) => (
                  <div key={idx} className={styles.tooltipStat}>
                    {stat}
                  </div>
                ))}
              </div>
            )}
            {details?.source && (
              <div className={styles.tooltipSource}>
                <em>{details.source}</em>
              </div>
            )}
            {details?.notes && (
              <div className={styles.tooltipNotes}>{details.notes}</div>
            )}
          </div>
        </div>
      )}
    </span>
  );
}

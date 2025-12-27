import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";
import { D4_ITEM_IDS } from "../../data/d4-item-ids";
import { SlotIcon } from "./SlotIcons";

export interface D4ItemProps {
  name: string;
  itemId?: string;
  imageUrl?: string;
  rarity?: "common" | "magic" | "rare" | "legendary" | "unique" | "mythic";
  slot?: string;
  sockets?: string;
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
  slot,
  sockets,
  details,
}: D4ItemProps): JSX.Element {
  const [showTooltip, setShowTooltip] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const itemRef = useRef<HTMLSpanElement>(null);

  const rarityColors = {
    common: "#ffffff",
    magic: "#6969ff",
    rare: "#ffff00",
    legendary: "#ff8000",
    unique: "#dca779",
    mythic: "#dc9bf2",
  };

  const rarityLabels = {
    common: "Common",
    magic: "Magic",
    rare: "Rare",
    legendary: "Legendary",
    unique: "Unique",
    mythic: "Mythic",
  };


  // Parse sockets string into array of socket items
  const parseSocketsString = (socketsStr: string): string[] => {
    if (!socketsStr || socketsStr === "N/A") return [];

    // Handle patterns like "Neo-Ohm", "Cem-Zec", "Emerald - Royal x2", "Diamond - Royal"
    const sockets: string[] = [];

    // Split by common delimiters
    const parts = socketsStr.split(/[\s,]+/);

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      // Handle hyphen-separated runes like "Neo-Ohm" or "Cem-Zec"
      if (part.includes("-") && !part.match(/Royal|Flawless|Perfect/i)) {
        const runeParts = part.split("-");
        sockets.push(...runeParts);
      }
      // Handle gem with tier and quantity like "Emerald", "Royal", "x2"
      else if (part.match(/^(Diamond|Emerald|Ruby|Sapphire|Topaz|Amethyst|Skull)$/i)) {
        const gemName = part;
        // Check for quantity indicator
        let quantity = 1;
        if (i + 2 < parts.length && parts[i + 2].match(/^x\d+$/)) {
          quantity = parseInt(parts[i + 2].substring(1));
        }
        for (let j = 0; j < quantity; j++) {
          sockets.push(gemName);
        }
      }
      // Handle standalone rune names
      else if (part.match(/^(Neo|Ohm|Cem|Zec|Gar|Poc|Ton)$/i)) {
        sockets.push(part);
      }
    }

    return sockets;
  };

  const parsedSockets = sockets ? parseSocketsString(sockets) : [];

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

  // Update tooltip position when showing
  useEffect(() => {
    if (showTooltip && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top, // Don't add scrollY for fixed positioning
        left: rect.left + rect.width / 2,
      });
    }
  }, [showTooltip]);

  const tooltip = showTooltip && (
    <div
      className={styles.tooltip}
      style={{
        position: "fixed",
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`,
        transform: "translate(-50%, calc(-100% - 0.5rem))",
        borderColor: rarityColors[rarity],
      }}>
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
        {slot && (
          <div className={styles.tooltipSubtitle}>
            <SlotIcon slot={slot} className={styles.slotIcon} />
            {rarityLabels[rarity]} {slot}
          </div>
        )}
        {parsedSockets.length > 0 && (
          <div className={styles.tooltipSockets}>
            {parsedSockets.map((socket, idx) => {
              const socketItemId = D4_ITEM_IDS[socket];
              const socketImageUrl = socketItemId
                ? getItemImageUrl(socket, socketItemId)
                : "";
              return (
                <div key={idx} className={styles.socketSlot}>
                  {socketImageUrl && (
                    <img
                      src={socketImageUrl}
                      alt={socket}
                      className={styles.socketImage}
                      title={socket}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
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
  );

  return (
    <>
      <span
        ref={itemRef}
        className={styles.d4Item}
        data-d4-id={resolvedItemId}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}>
        <span style={{ color: rarityColors[rarity] }}>{name}</span>
      </span>
      {typeof document !== "undefined" &&
        tooltip &&
        createPortal(tooltip, document.body)}
    </>
  );
}

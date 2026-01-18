import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

export type WoWItemQuality = 'poor' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'artifact' | 'heirloom';

export type WoWItemSlot =
  | 'Head' | 'Neck' | 'Shoulder' | 'Back' | 'Chest' | 'Wrist'
  | 'Hands' | 'Waist' | 'Legs' | 'Feet' | 'Finger' | 'Trinket'
  | 'Main Hand' | 'Off Hand' | 'Two-Hand' | 'Ranged';

interface WoWItemDetails {
  stats?: string[];
  source?: string;
  notes?: string;
  itemLevel?: number;
  setBonus?: string;
  enchant?: string;
  gem?: string;
}

interface WoWItemProps {
  name: string;
  quality?: WoWItemQuality;
  slot?: WoWItemSlot;
  itemId?: string;
  details?: WoWItemDetails;
  inline?: boolean;
}

const qualityColors: Record<WoWItemQuality, string> = {
  poor: '#9d9d9d',
  common: '#ffffff',
  uncommon: '#1eff00',
  rare: '#0070dd',
  epic: '#a335ee',
  legendary: '#ff8000',
  artifact: '#e6cc80',
  heirloom: '#00ccff',
};

const WoWItem: React.FC<WoWItemProps> = ({
  name,
  quality = 'epic',
  slot,
  itemId,
  details,
  inline = true,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const itemRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const qualityColor = qualityColors[quality];

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!details) return;
    setShowTooltip(true);
    updateTooltipPosition(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (showTooltip) {
      updateTooltipPosition(e);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const updateTooltipPosition = (e: React.MouseEvent) => {
    const offsetX = 20;
    const offsetY = 20;
    setTooltipPosition({
      x: e.clientX + offsetX,
      y: e.clientY + offsetY,
    });
  };

  // Adjust tooltip position if it goes off-screen
  useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let { x, y } = tooltipPosition;

      if (rect.right > viewportWidth) {
        x = viewportWidth - rect.width - 20;
      }
      if (rect.bottom > viewportHeight) {
        y = viewportHeight - rect.height - 20;
      }

      if (x !== tooltipPosition.x || y !== tooltipPosition.y) {
        setTooltipPosition({ x, y });
      }
    }
  }, [showTooltip, tooltipPosition]);

  const wowheadUrl = itemId ? `https://www.wowhead.com/item=${itemId}` : '#';

  return (
    <>
      <span
        ref={itemRef}
        className={`${styles.wowItem} ${inline ? styles.inline : ''}`}
        style={{ color: qualityColor, borderBottomColor: qualityColor }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <a
          href={wowheadUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: qualityColor }}
          className={styles.wowItemLink}
        >
          {name}
        </a>
      </span>

      {showTooltip && details && (
        <div
          ref={tooltipRef}
          className={styles.tooltip}
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            borderColor: qualityColor,
          }}
        >
          <div className={styles.tooltipHeader}>
            <div className={styles.itemName} style={{ color: qualityColor }}>
              {name}
            </div>
            {details.itemLevel && (
              <div className={styles.itemLevel}>Item Level {details.itemLevel}</div>
            )}
            {slot && <div className={styles.itemSlot}>{slot}</div>}
          </div>

          {details.stats && details.stats.length > 0 && (
            <div className={styles.tooltipSection}>
              {details.stats.map((stat, index) => (
                <div key={index} className={styles.stat}>
                  {stat}
                </div>
              ))}
            </div>
          )}

          {details.enchant && (
            <div className={styles.tooltipSection}>
              <div className={styles.enchant}>Enchant: {details.enchant}</div>
            </div>
          )}

          {details.gem && (
            <div className={styles.tooltipSection}>
              <div className={styles.gem}>Socket: {details.gem}</div>
            </div>
          )}

          {details.setBonus && (
            <div className={styles.tooltipSection}>
              <div className={styles.setBonus}>{details.setBonus}</div>
            </div>
          )}

          {details.source && (
            <div className={styles.tooltipSection}>
              <div className={styles.source}>Source: {details.source}</div>
            </div>
          )}

          {details.notes && (
            <div className={styles.tooltipSection}>
              <div className={styles.notes}>{details.notes}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default WoWItem;

import React, { useState } from "react";
import styles from "./styles.module.css";

export interface MapPin {
  /** CSS percentage for horizontal position (e.g. "35.5%") */
  left: string;
  /** CSS percentage for vertical position (e.g. "37.1%") */
  top: string;
  /** Display name shown on hover */
  name: string;
  /** Link URL (e.g. Wowhead NPC page) */
  href?: string;
  /** Pin type affects the icon style */
  type?: "boss" | "npc" | "object";
}

export interface MapFloor {
  /** Floor display name (e.g. "Nefarian's Lair") */
  name: string;
  /** URL to the map background image */
  image: string;
  /** Pins to display on this floor */
  pins: MapPin[];
}

interface DungeonMapProps {
  /** Array of floors. If only one floor, no floor switcher is shown. */
  floors: MapFloor[];
  /** Max width in pixels (default: 488) */
  maxWidth?: number;
}

const DungeonMap: React.FC<DungeonMapProps> = ({ floors, maxWidth = 488 }) => {
  const [activeFloor, setActiveFloor] = useState(0);
  const [pinsVisible, setPinsVisible] = useState(true);
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  const floor = floors[activeFloor];

  return (
    <div className={styles.mapContainer} style={{ maxWidth }}>
      {/* Floor tabs */}
      {floors.length > 1 && (
        <div className={styles.floorTabs}>
          {floors.map((f, i) => (
            <button
              key={i}
              className={`${styles.floorTab} ${i === activeFloor ? styles.floorTabActive : ""}`}
              onClick={() => setActiveFloor(i)}
            >
              {f.name}
            </button>
          ))}
        </div>
      )}

      {/* Map area */}
      <div className={styles.mapWrapper}>
        <img
          src={floor.image}
          alt={floor.name}
          className={styles.mapImage}
          draggable={false}
        />

        {/* Pins overlay */}
        {pinsVisible &&
          floor.pins.map((pin, i) => {
            const pinContent = (
              <div
                key={i}
                className={`${styles.pin} ${styles[pin.type || "boss"]}`}
                style={{ left: pin.left, top: pin.top }}
                onMouseEnter={() => setHoveredPin(i)}
                onMouseLeave={() => setHoveredPin(null)}
              >
                <div className={styles.pinIcon} />
                {hoveredPin === i && (
                  <span className={styles.pinLabel}>{pin.name}</span>
                )}
              </div>
            );

            if (pin.href) {
              return (
                <a
                  key={i}
                  href={pin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pinLink}
                  style={{ left: pin.left, top: pin.top }}
                  onMouseEnter={() => setHoveredPin(i)}
                  onMouseLeave={() => setHoveredPin(null)}
                >
                  <div className={`${styles.pin} ${styles[pin.type || "boss"]}`}>
                    <div className={styles.pinIcon} />
                    {hoveredPin === i && (
                      <span className={styles.pinLabel}>{pin.name}</span>
                    )}
                  </div>
                </a>
              );
            }

            return pinContent;
          })}

        {/* Controls */}
        <div className={styles.controls}>
          <button
            className={styles.controlButton}
            onClick={() => setPinsVisible(!pinsVisible)}
          >
            {pinsVisible ? "Hide pins" : "Show pins"}
          </button>
        </div>

        {/* Floor name label */}
        <div className={styles.floorLabel}>{floor.name}</div>
      </div>
    </div>
  );
};

export default DungeonMap;

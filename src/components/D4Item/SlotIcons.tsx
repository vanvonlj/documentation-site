import React from "react";

interface SlotIconProps {
  slot: string;
  className?: string;
}

export const SlotIcon: React.FC<SlotIconProps> = ({ slot, className }) => {
  const iconProps = {
    className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    style: { filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8))" },
  };

  switch (slot) {
    case "Helm":
      return (
        <svg {...iconProps}>
          <path d="M12 2C8.5 2 6 4 6 7v3c0 1.5.5 3 2 4v6h8v-6c1.5-1 2-2.5 2-4V7c0-3-2.5-5-6-5zm0 2c2.5 0 4 1.5 4 3v3c0 1-.3 2-1.2 2.8l-.8.7v4.5h-4v-4.5l-.8-.7C8.3 12 8 11 8 10V7c0-1.5 1.5-3 4-3z" />
        </svg>
      );
    case "Chest":
      return (
        <svg {...iconProps}>
          <path d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.2l6 3v9.6l-6 3-6-3V7.2l6-3zM9 10v8h6v-8H9z" />
        </svg>
      );
    case "Gloves":
      return (
        <svg {...iconProps}>
          <path d="M8 4v7l-2 2v7h4v-7h4v7h4v-7l-2-2V4h-2v6h-1V4h-2v6h-1V4H8z" />
        </svg>
      );
    case "Pants":
      return (
        <svg {...iconProps}>
          <path d="M8 2v10l-2 2v8h4v-8l2-2 2 2v8h4v-8l-2-2V2h-3v8h-2V2H8z" />
        </svg>
      );
    case "Boots":
      return (
        <svg {...iconProps}>
          <path d="M8 2v12l-2 2v6h5v-4h2v4h5v-6l-2-2V2h-3v10h-2V2H8z" />
        </svg>
      );
    case "Weapon":
      return (
        <svg {...iconProps}>
          <path d="M6.92 5L3 9l2 2 3.92-4L14 12v4h4v-4l-2-2-9.08-5zM14 2l-2 2 4 4 2-2-4-4z" />
        </svg>
      );
    case "Amulet":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2C10 2 8 3 8 5v2c-2 0-4 2-4 4s2 4 4 4c0 3 2 5 4 5s4-2 4-5c2 0 4-2 4-4s-2-4-4-4V5c0-2-2-3-4-3zm0 2c1 0 2 .5 2 1v2.3c-.6-.2-1.3-.3-2-.3s-1.4.1-2 .3V5c0-.5 1-1 2-1z" />
        </svg>
      );
    case "Ring":
      return (
        <svg {...iconProps}>
          <path d="M12 4C8.7 4 6 6.7 6 10s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 2c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      );
    default:
      return null;
  }
};

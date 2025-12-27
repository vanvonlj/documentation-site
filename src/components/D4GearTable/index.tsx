import React from "react";
import DataTable from "@site/src/components/DataTable";
import D4Item from "@site/src/components/D4Item";

export interface D4GearItem {
  item: string;
  slot: string;
  sockets: string;
  have: boolean;
  rarity?: "common" | "magic" | "rare" | "legendary" | "unique" | "mythic";
  details?: {
    sources?: Array<{
      source: string;
      consumable: string;
    }>;
    stats?: Array<{
      id: string;
      stat: string;
    }>;
  };
}

export interface D4GearTableProps {
  data: D4GearItem[];
}

export default function D4GearTable({
  data,
}: D4GearTableProps): React.ReactElement {
  return (
    <DataTable
      data={data}
      columns={[
        {
          key: "item",
          header: "Item",
          render: (value, row) => (
            <D4Item
              name={value}
              rarity={row.rarity || "unique"}
              slot={row.slot}
              sockets={row.sockets}
              details={
                row.details?.stats
                  ? {
                      stats: row.details.stats.map((s) => s.stat),
                    }
                  : undefined
              }
            />
          ),
        },
        {
          key: "slot",
          header: "Gear Slot",
        },
        {
          key: "sockets",
          header: "Sockets",
        },
        {
          key: "have",
          header: "Have",
          render: (value) => (
            <span
              style={{
                color: value ? "#49cc90" : "#f93e3e",
              }}>
              {value ? "Yes" : "No"}
            </span>
          ),
        },
      ]}
      expandable={true}
      renderExpandedRow={(row) => (
        <>
          {row.details?.sources && row.details.sources.length > 0 && (
            <DataTable
              data={row.details.sources}
              columns={[
                { key: "source", header: "Source" },
                { key: "consumable", header: "Consumable" },
              ]}
              compact={true}
              footerless={true}
              filterable={false}
            />
          )}
          {row.details?.stats && row.details.stats.length > 0 && (
            <DataTable
              data={row.details.stats}
              columns={[
                { key: "id", header: "Id" },
                { key: "stat", header: "Stats" },
              ]}
              compact={true}
              footerless={true}
              filterable={false}
            />
          )}
        </>
      )}
    />
  );
}

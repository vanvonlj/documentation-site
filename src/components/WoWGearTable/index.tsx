import React from 'react';
import DataTable from '@site/src/components/DataTable';
import type { Column } from '@site/src/components/DataTable';
import WoWItem, { WoWItemQuality, WoWItemSlot } from '@site/src/components/WoWItem';
import styles from './styles.module.css';

export interface WoWGearItem {
  item: string;
  slot: WoWItemSlot;
  itemId?: string;
  quality?: WoWItemQuality;
  itemLevel?: number;
  have?: boolean;
  details?: {
    stats?: string[];
    source?: string;
    notes?: string;
    setBonus?: string;
    enchant?: string;
    gem?: string;
    alternatives?: Array<{
      name: string;
      itemId?: string;
      source: string;
      notes?: string;
    }>;
  };
}

interface WoWGearTableProps {
  data: WoWGearItem[];
  showHaveColumn?: boolean;
  title?: string;
}

const WoWGearTable: React.FC<WoWGearTableProps> = ({
  data,
  showHaveColumn = false,
  title,
}) => {
  const columns: Column<WoWGearItem>[] = [
    {
      key: 'slot',
      header: 'Slot',
      sortable: true,
    },
    {
      key: 'item',
      header: 'Item',
      sortable: true,
      render: (value, row) => (
        <WoWItem
          name={value}
          quality={row.quality || 'epic'}
          slot={row.slot}
          itemId={row.itemId}
          details={{
            stats: row.details?.stats,
            source: row.details?.source,
            notes: row.details?.notes,
            itemLevel: row.itemLevel,
            setBonus: row.details?.setBonus,
            enchant: row.details?.enchant,
            gem: row.details?.gem,
          }}
        />
      ),
    },
    {
      key: 'itemLevel',
      header: 'Item Level',
      sortable: true,
    },
  ];

  if (showHaveColumn) {
    columns.push({
      key: 'have',
      header: 'Have',
      sortable: true,
      render: (value) => (
        <span className={value ? styles.haveYes : styles.haveNo}>
          {value ? 'Yes' : 'No'}
        </span>
      ),
    });
  }

  const renderExpandedRow = (row: WoWGearItem) => {
    if (!row.details) return null;

    return (
      <div className={styles.expandedContent}>
        {row.details.stats && row.details.stats.length > 0 && (
          <div className={styles.detailSection}>
            <strong>Stats:</strong>
            <ul>
              {row.details.stats.map((stat, index) => (
                <li key={index}>{stat}</li>
              ))}
            </ul>
          </div>
        )}

        {row.details.enchant && (
          <div className={styles.detailSection}>
            <strong>Recommended Enchant:</strong> {row.details.enchant}
          </div>
        )}

        {row.details.gem && (
          <div className={styles.detailSection}>
            <strong>Recommended Gem:</strong> {row.details.gem}
          </div>
        )}

        {row.details.setBonus && (
          <div className={styles.detailSection}>
            <strong>Set Bonus:</strong> {row.details.setBonus}
          </div>
        )}

        {row.details.source && (
          <div className={styles.detailSection}>
            <strong>Source:</strong> {row.details.source}
          </div>
        )}

        {row.details.notes && (
          <div className={styles.detailSection}>
            <strong>Notes:</strong> {row.details.notes}
          </div>
        )}

        {row.details.alternatives && row.details.alternatives.length > 0 && (
          <div className={styles.detailSection}>
            <strong>Alternative Items:</strong>
            <DataTable
              data={row.details.alternatives}
              columns={[
                {
                  key: 'name',
                  header: 'Item',
                  render: (value, alt) => (
                    <WoWItem
                      name={value}
                      quality={row.quality || 'epic'}
                      slot={row.slot}
                      itemId={alt.itemId}
                      details={{
                        source: alt.source,
                        notes: alt.notes,
                      }}
                    />
                  ),
                },
                { key: 'source', header: 'Source' },
                { key: 'notes', header: 'Notes' },
              ]}
              sortable={false}
              filterable={false}
              compact={true}
              headerless={false}
              footerless={true}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.gearTableContainer}>
      {title && <h3 className={styles.tableTitle}>{title}</h3>}
      <DataTable
        data={data}
        columns={columns}
        sortable={true}
        filterable={true}
        expandable={true}
        renderExpandedRow={renderExpandedRow}
      />
    </div>
  );
};

export default WoWGearTable;

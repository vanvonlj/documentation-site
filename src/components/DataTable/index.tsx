import React, { useState, useMemo } from 'react';
import styles from './styles.module.css';

export interface Column<T = any> {
  key: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  sortable?: boolean;
  filterable?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
}

type SortDirection = 'asc' | 'desc' | null;

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  sortable = true,
  filterable = true,
  striped = true,
  hoverable = true,
  compact = false,
}: DataTableProps<T>): JSX.Element {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleSort = (key: string) => {
    if (!sortable) return;

    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortKey(null);
        setSortDirection(null);
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleFilter = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Apply filters
    if (filterable) {
      Object.entries(filters).forEach(([key, filterValue]) => {
        if (filterValue) {
          result = result.filter(row => {
            const cellValue = String(row[key] || '').toLowerCase();
            return cellValue.includes(filterValue.toLowerCase());
          });
        }
      });
    }

    // Apply sorting
    if (sortKey && sortDirection) {
      result.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (aVal === bVal) return 0;

        let comparison = 0;
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          comparison = aVal - bVal;
        } else {
          comparison = String(aVal).localeCompare(String(bVal));
        }

        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [data, filters, sortKey, sortDirection, filterable]);

  const tableClasses = [
    styles.dataTable,
    striped && styles.striped,
    hoverable && styles.hoverable,
    compact && styles.compact,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.tableWrapper}>
      <table className={tableClasses}>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key} className={styles.th}>
                <div className={styles.headerContent}>
                  <div
                    className={
                      sortable && (column.sortable !== false)
                        ? styles.sortable
                        : undefined
                    }
                    onClick={() =>
                      column.sortable !== false && handleSort(column.key)
                    }
                  >
                    {column.header}
                    {sortable && column.sortable !== false && (
                      <span className={styles.sortIcon}>
                        {sortKey === column.key ? (
                          sortDirection === 'asc' ? (
                            ' ↑'
                          ) : (
                            ' ↓'
                          )
                        ) : (
                          <span className={styles.sortIconInactive}> ↕</span>
                        )}
                      </span>
                    )}
                  </div>
                  {filterable && column.filterable !== false && (
                    <input
                      type="text"
                      className={styles.filterInput}
                      placeholder={`Filter ${column.header}...`}
                      value={filters[column.key] || ''}
                      onChange={e => handleFilter(column.key, e.target.value)}
                      onClick={e => e.stopPropagation()}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.noData}>
                No data found
              </td>
            </tr>
          ) : (
            filteredAndSortedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map(column => (
                  <td key={column.key} className={styles.td}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {filteredAndSortedData.length > 0 && (
        <div className={styles.tableFooter}>
          Showing {filteredAndSortedData.length} of {data.length} rows
        </div>
      )}
    </div>
  );
}

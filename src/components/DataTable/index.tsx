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
  expandable?: boolean;
  renderExpandedRow?: (row: T) => React.ReactNode;
  headerless?: boolean;
  footerless?: boolean;
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
  expandable = false,
  renderExpandedRow,
  headerless = false,
  footerless = false,
}: DataTableProps<T>): JSX.Element {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

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

  const toggleRowExpansion = (rowIndex: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowIndex)) {
        newSet.delete(rowIndex);
      } else {
        newSet.add(rowIndex);
      }
      return newSet;
    });
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Apply filters
    if (filterable) {
      Object.entries(filters).forEach(([key, filterValue]) => {
        if (filterValue) {
          result = result.filter(row => {
            const cellValue = row[key];
            const filterLower = filterValue.toLowerCase().trim();

            // Handle boolean values with yes/no matching
            if (typeof cellValue === 'boolean') {
              // Check if filter matches 'yes' or 'true' (partial match)
              if ('yes'.startsWith(filterLower) || 'true'.startsWith(filterLower)) {
                return cellValue === true;
              }
              // Check if filter matches 'no' or 'false' (partial match)
              if ('no'.startsWith(filterLower) || 'false'.startsWith(filterLower)) {
                return cellValue === false;
              }
              // No match
              return false;
            }

            // Default string matching
            return String(cellValue || '').toLowerCase().includes(filterLower);
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
        {!headerless && (
          <thead>
            <tr>
              {expandable && <th className={styles.th}></th>}
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
        )}
        <tbody>
          {filteredAndSortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (expandable ? 1 : 0)} className={styles.noData}>
                No data found
              </td>
            </tr>
          ) : (
            filteredAndSortedData.map((row, rowIndex) => {
              const hasExpandableContent = expandable && renderExpandedRow && row.details;
              return (
                <React.Fragment key={rowIndex}>
                  <tr>
                    {expandable && (
                      <td className={styles.td}>
                        {hasExpandableContent ? (
                          <button
                            className={styles.expandButton}
                            onClick={() => toggleRowExpansion(rowIndex)}
                            aria-label={expandedRows.has(rowIndex) ? 'Collapse row' : 'Expand row'}
                          >
                            {expandedRows.has(rowIndex) ? '▼' : '▶'}
                          </button>
                        ) : null}
                      </td>
                    )}
                    {columns.map(column => (
                      <td key={column.key} className={styles.td}>
                        {column.render
                          ? column.render(row[column.key], row)
                          : String(row[column.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                  {hasExpandableContent && expandedRows.has(rowIndex) && (
                    <tr className={styles.expandedRow}>
                      <td colSpan={columns.length + 1} className={styles.expandedContent}>
                        {renderExpandedRow(row)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </table>
      {!footerless && filteredAndSortedData.length > 0 && (
        <div className={styles.tableFooter}>
          Showing {filteredAndSortedData.length} of {data.length} rows
        </div>
      )}
    </div>
  );
}

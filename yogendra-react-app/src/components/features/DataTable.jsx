import { useReducer, useMemo } from 'react';
import { Skeleton } from '../ui/Skeleton';

/**
 * DataTable Component — Reusable Sortable, Filterable Data Table
 *
 * Props:
 * - columns: Array of {key, label, sortable}
 * - data: Array of objects to display
 * - pageSize: Number of rows per page (default: 10)
 * - loading: Boolean for loading state
 * - onRowClick: Callback when row is clicked
 * - emptyMessage: Message to show when no data
 *
 * Features:
 * - Column header sorting (click to toggle asc/desc)
 * - Global search filter
 * - Pagination with prev/next/page numbers
 * - Loading skeleton state
 * - Empty state
 *
 * Why useReducer?
 * "useReducer is better than useState here because we have multiple related state values:
 *  - sortColumn, sortDirection (together control sorting)
 *  - currentPage (pagination)
 *  - searchQuery (filter)
 * All these depend on each other. One action might change multiple values.
 * With useState we'd have 4 separate setters and harder to manage transitions.
 * useReducer keeps them together in one state object with clear actions."
 */

// Initial table state
const initialState = {
  sortColumn: null,
  sortDirection: 'asc', // 'asc' or 'desc'
  currentPage: 1,
  searchQuery: '',
};

// Reducer function to manage all table state transitions
function tableReducer(state, action) {
  switch (action.type) {
    case 'SORT_COLUMN': {
      // If clicking same column, toggle direction. Otherwise, sort by new column
      const newDirection =
        state.sortColumn === action.payload && state.sortDirection === 'asc'
          ? 'desc'
          : 'asc';
      return {
        ...state,
        sortColumn: action.payload,
        sortDirection: newDirection,
        currentPage: 1, // Reset to page 1 when sorting changes
      };
    }
    case 'SEARCH':
      return {
        ...state,
        searchQuery: action.payload,
        currentPage: 1, // Reset to page 1 when search changes
      };
    case 'GO_TO_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'NEXT_PAGE':
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case 'PREV_PAGE':
      return {
        ...state,
        currentPage: Math.max(1, state.currentPage - 1),
      };
    default:
      return state;
  }
}

export function DataTable({
  columns,
  data,
  pageSize = 10,
  loading = false,
  onRowClick,
  emptyMessage = 'No data found',
}) {
  // Use single reducer for all table state
  const [state, dispatch] = useReducer(tableReducer, initialState);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!state.searchQuery.trim()) return data;

    return data.filter((row) => {
      return Object.values(row).some((value) =>
        String(value).toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    });
  }, [data, state.searchQuery]);

  // Sort data based on current sort column and direction
  const sortedData = useMemo(() => {
    if (!state.sortColumn) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[state.sortColumn];
      const bValue = b[state.sortColumn];

      // Handle numbers
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return state.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle strings
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      return state.sortDirection === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

    return sorted;
  }, [filteredData, state.sortColumn, state.sortDirection]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (state.currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageData = sortedData.slice(startIndex, endIndex);

  // Helper to render sort arrow indicator
  const renderSortArrow = (columnKey) => {
    if (state.sortColumn !== columnKey) {
      return <span className="text-gray-400 ml-1">↕</span>;
    }
    return (
      <span className={state.sortDirection === 'asc' ? 'text-blue-600 ml-1' : 'text-blue-600 ml-1 rotate-180'}>
        ↑
      </span>
    );
  };

  // Defense Q&A about component API design
  // Q: "Reusable table component design garda ke ke props expose garne?"
  // A: "Must expose:
  //  1. Data + columns: What to display, where
  //  2. Sorting/filtering API: How user interacts (onSort, onFilter callbacks)
  //  3. Pagination: How user navigates (pageSize, currentPage)
  //  4. Visual customization: className, headerClass, rowClass for styling
  //  5. Events: onRowClick for row selection, onSort for sorting
  //  6. Loading/Empty states: Show meaningful UI while loading/no data
  //  7. Don't expose: Internal state management details (reducer, internal handlers)
  //  Keep API simple - user just passes data and columns, component handles the rest."

  return (
    <div className="w-full">
      {/* Search input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search table data..."
          value={state.searchQuery}
          onChange={(e) => dispatch({ type: 'SEARCH', payload: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3 text-left">
                  {col.sortable ? (
                    <button
                      onClick={() => dispatch({ type: 'SORT_COLUMN', payload: col.key })}
                      className="font-semibold text-gray-900 hover:text-blue-600 flex items-center gap-2 group"
                    >
                      {col.label}
                      {renderSortArrow(col.key)}
                    </button>
                  ) : (
                    <span className="font-semibold text-gray-900">{col.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading
              ? // Loading skeletons
                Array(pageSize)
                  .fill(0)
                  .map((_, idx) => (
                    <tr key={`skeleton-${idx}`} className="border-b border-gray-200 hover:bg-gray-50">
                      {columns.map((col) => (
                        <td key={`${col.key}-${idx}`} className="px-6 py-4">
                          <Skeleton variant="text" />
                        </td>
                      ))}
                    </tr>
                  ))
              : pageData.length > 0
              ? // Actual data rows
                pageData.map((row, idx) => (
                  <tr
                    key={idx}
                    onClick={() => onRowClick?.(row)}
                    className="border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    {columns.map((col) => (
                      <td key={`${col.key}-${idx}`} className="px-6 py-4 text-gray-700">
                        {String(row[col.key] || '-')}
                      </td>
                    ))}
                  </tr>
                ))
              : // Empty state
                <tr>
                  <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                    {emptyMessage}
                  </td>
                </tr>
            }
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && sortedData.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of{' '}
            {sortedData.length} results
          </div>

          <div className="flex gap-2">
            {/* Previous button */}
            <button
              onClick={() => dispatch({ type: 'PREV_PAGE' })}
              disabled={state.currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {/* Page numbers */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  // Show first page, last page, current page, and neighbors
                  return (
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - state.currentPage) <= 1
                  );
                })
                .map((page, idx, filtered) => {
                  // Add ellipsis if there's a gap
                  if (idx > 0 && filtered[idx - 1] !== page - 1) {
                    return <span key={`ellipsis-${page}`} className="px-2 py-2">...</span>;
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => dispatch({ type: 'GO_TO_PAGE', payload: page })}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        state.currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
            </div>

            {/* Next button */}
            <button
              onClick={() => dispatch({ type: 'NEXT_PAGE' })}
              disabled={state.currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

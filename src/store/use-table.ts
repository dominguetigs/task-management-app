import { create } from 'zustand';

import { DEFAULT_PAGINATION, DEFAULT_SORT } from '@/constants';
import { retrieveFilters, retrieveTableColumns } from '@/services';
import { CustomField, Filter, Pagination, Sort, TableColumn, Task } from '@/types';
import { filterTasks, sortTasks, updateLocalStorage } from '@/utils';

type SelectionState = {
  selectedRows: Set<number>;
  selectedAllRows: boolean;
  toggleRowSelection: (taskId: number) => void;
  toggleSelectAll: (taskIds: number[], isIndeterminate?: boolean) => void;
  clearSelection: () => void;
};

type FilterState = {
  filters: Filter[];
  addFilter: (filter: Filter) => void;
  updateFilter: (filter: Filter) => void;
  removeFilter: (filterKey: keyof Task) => void;
  resetFilters: () => void;
};

type ColumnState = {
  columns: TableColumn[];
  addColumn: (column: CustomField) => void;
  updateColumn: (column: CustomField) => void;
  removeColumn: (columnId: string) => void;
};

type RowState = {
  rows: Task[];
  updateRows: (tasks: Task[]) => void;
};

type PaginationState = {
  pagination: Pagination;
  setPagination: (pagination: Pagination) => void;
};

type SortState = {
  sort: Sort | null;
  setSort: (sort: Sort | null) => void;
};

type TableStore = SelectionState &
  FilterState &
  ColumnState &
  RowState &
  PaginationState &
  SortState;

export const useTable = create<TableStore>(set => ({
  columns: retrieveTableColumns(),
  rows: [],
  filters: retrieveFilters(),
  sort: DEFAULT_SORT,
  pagination: DEFAULT_PAGINATION,
  selectedRows: new Set<number>(),
  selectedAllRows: false,

  toggleRowSelection: taskId =>
    set(state => {
      const updatedSelection = new Set(state.selectedRows);

      if (updatedSelection.has(taskId)) {
        updatedSelection.delete(taskId);
      } else {
        updatedSelection.add(taskId);
      }

      return { selectedRows: updatedSelection };
    }),

  toggleSelectAll: (taskIds, isIndeterminate = false) =>
    set(state => {
      const isAllSelected = taskIds.length === state.rows.length;

      if (isAllSelected) {
        return state.selectedAllRows
          ? { selectedRows: new Set(), selectedAllRows: false }
          : { selectedRows: new Set(taskIds), selectedAllRows: true };
      }

      if (isIndeterminate) {
        taskIds.forEach(id => state.selectedRows.delete(id));
        return { selectedRows: new Set([...state.selectedRows]) };
      }

      const allSelected = taskIds.every(id => state.selectedRows.has(id));

      taskIds.forEach(id =>
        allSelected ? state.selectedRows.delete(id) : state.selectedRows.add(id),
      );

      return { selectedRows: new Set([...state.selectedRows]) };
    }),

  clearSelection: () => set(() => ({ selectedRows: new Set(), selectedAllRows: false })),

  addFilter: filter =>
    set(state => ({ filters: updateLocalStorage('filters', [...state.filters, filter]) })),
  updateFilter: filter =>
    set(state => ({
      filters: updateLocalStorage(
        'filters',
        state.filters.map(f => (f.key === filter.key ? filter : f)),
      ),
    })),
  removeFilter: filterKey =>
    set(state => ({
      filters: updateLocalStorage(
        'filters',
        state.filters.filter(f => f.key !== filterKey),
      ),
    })),
  resetFilters: () => set(() => ({ filters: updateLocalStorage('filters', []) })),

  setSort: (sort = DEFAULT_SORT) => set(() => ({ sort })),
  setPagination: (pagination = DEFAULT_PAGINATION) => set(() => ({ pagination })),

  addColumn: column =>
    set(state => ({
      columns: updateLocalStorage('table-columns', [...state.columns, column]),
    })),
  updateColumn: column =>
    set(state => ({
      columns: updateLocalStorage(
        'table-columns',
        state.columns.map(c => (c.id === column.id ? column : c)),
      ),
    })),
  removeColumn: columnId =>
    set(state => ({
      columns: updateLocalStorage(
        'table-columns',
        state.columns.filter(c => c.id !== columnId),
      ),
    })),

  updateRows: rows =>
    set(state => {
      const filteredTasks = filterTasks(rows, state.filters);
      const sortedTasks = state.sort ? sortTasks(filteredTasks, state.sort) : filteredTasks;
      return { rows: sortedTasks };
    }),
}));

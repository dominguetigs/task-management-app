import { create } from 'zustand';

import { DEFAULT_PAGINATION, DEFAULT_SORT, DEFAULT_TABLE_COLUMNS } from '@/constants';
import { Filter, Pagination, Sort, TableColumn, Task } from '@/types';
import { filterTasks, sortTasks } from '@/utils';

type TableStore = {
  columns: TableColumn[];
  rows: Task[];
  filters: Filter[];
  sort: Sort | null;
  pagination: Pagination;

  addFilter: (filter: Filter) => void;
  updateFilter: (filter: Filter) => void;
  removeFilter: (filter: Filter) => void;
  resetFilters: () => void;
  setSort: (sort: Sort | null) => void;
  setPagination: (pagination: Pagination) => void;

  addColumn: (column: TableColumn) => void;
  updateColumn: (column: TableColumn) => void;
  removeColumn: (column: TableColumn) => void;

  updateRows: (tasks: Task[]) => void;
};

export const useTable = create<TableStore>()(set => ({
  columns: DEFAULT_TABLE_COLUMNS,
  rows: [],
  filters: [],
  sort: DEFAULT_SORT,
  pagination: DEFAULT_PAGINATION,

  addFilter: filter => set(state => ({ filters: [...state.filters, filter] })),
  updateFilter: filter =>
    set(state => ({ filters: state.filters.map(f => (f.key === filter.key ? filter : f)) })),
  removeFilter: filter =>
    set(state => ({ filters: state.filters.filter(f => f.key !== filter.key) })),
  resetFilters: () => set(() => ({ filters: [] })),
  setSort: (sort = DEFAULT_SORT) => set(() => ({ sort })),
  setPagination: (pagination = DEFAULT_PAGINATION) => set(() => ({ pagination })),

  addColumn: column => set(state => ({ columns: [...state.columns, column] })),
  updateColumn: column =>
    set(state => ({
      columns: state.columns.map(c => (c.id === column.id ? column : c)),
    })),
  removeColumn: column =>
    set(state => ({ columns: state.columns.filter(c => c.id !== column.id) })),

  updateRows: rows =>
    set(state => {
      const filteredTasks = filterTasks(rows, state.filters);
      const sortedTasks = state.sort ? sortTasks(filteredTasks, state.sort) : filteredTasks;
      return { rows: sortedTasks };
    }),
}));

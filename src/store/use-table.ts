import { create } from 'zustand';

import { DEFAULT_PAGINATION, DEFAULT_SORT } from '@/constants';
import { CustomField, Filter, Pagination, Sort, TableColumn, Task } from '@/types';
import { filterTasks, setToLocalstorage, sortTasks } from '@/utils';
import { retrieveFilters, retrieveTableColumns } from '@/services';

type TableStore = {
  columns: TableColumn[];
  rows: Task[];
  filters: Filter[];
  sort: Sort | null;
  pagination: Pagination;

  addFilter: (filter: Filter) => void;
  updateFilter: (filter: Filter) => void;
  removeFilter: (filterKey: keyof Task) => void;
  resetFilters: () => void;
  setSort: (sort: Sort | null) => void;
  setPagination: (pagination: Pagination) => void;

  addColumn: (column: CustomField) => void;
  updateColumn: (column: CustomField) => void;
  removeColumn: (columnId: string) => void;

  updateRows: (tasks: Task[]) => void;
};

export const useTable = create<TableStore>()(set => ({
  columns: retrieveTableColumns(),
  rows: [],
  filters: retrieveFilters(),
  sort: DEFAULT_SORT,
  pagination: DEFAULT_PAGINATION,

  addFilter: filter =>
    set(state => {
      const updatedFilters = [...state.filters, filter];
      setToLocalstorage('filters', updatedFilters);
      return { filters: updatedFilters };
    }),
  updateFilter: filter =>
    set(state => {
      const updatedFilters = state.filters.map(f => (f.key === filter.key ? filter : f));
      setToLocalstorage('filters', updatedFilters);
      return { filters: updatedFilters };
    }),
  removeFilter: filterKey =>
    set(state => {
      const updatedFilters = state.filters.filter(f => f.key !== filterKey);
      setToLocalstorage('filters', updatedFilters);
      return { filters: updatedFilters };
    }),
  resetFilters: () =>
    set(() => {
      setToLocalstorage('filters', []);
      return { filters: [] };
    }),
  setSort: (sort = DEFAULT_SORT) => set(() => ({ sort })),
  setPagination: (pagination = DEFAULT_PAGINATION) => set(() => ({ pagination })),

  addColumn: column =>
    set(state => {
      const updatedColumns = [...state.columns, column];
      setToLocalstorage('table-columns', updatedColumns);
      return { columns: updatedColumns };
    }),
  updateColumn: column =>
    set(state => {
      const updatedColumns = state.columns.map(c => (c.id === column.id ? column : c));
      setToLocalstorage('table-columns', updatedColumns);
      return { columns: updatedColumns };
    }),
  removeColumn: columnId =>
    set(state => {
      const updatedColumns = state.columns.filter(c => c.id !== columnId);
      setToLocalstorage('table-columns', updatedColumns);
      return { columns: updatedColumns };
    }),

  updateRows: rows =>
    set(state => {
      const filteredTasks = filterTasks(rows, state.filters);
      const sortedTasks = state.sort ? sortTasks(filteredTasks, state.sort) : filteredTasks;
      return { rows: sortedTasks };
    }),
}));

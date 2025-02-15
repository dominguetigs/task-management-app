import { create } from 'zustand';

import { DEFAULT_TABLE_COLUMNS } from '@/constants';
import { TableColumn } from '@/types';

type TableStore = {
  columns: TableColumn[];
  addColumn: (column: TableColumn) => void;
  updateColumn: (column: TableColumn) => void;
  removeColumn: (column: TableColumn) => void;
};

export const useTable = create<TableStore>()(set => ({
  columns: DEFAULT_TABLE_COLUMNS,
  addColumn: column => set(state => ({ columns: [...state.columns, column] })),
  updateColumn: column =>
    set(state => ({
      columns: state.columns.map(c => (c.id === column.id ? column : c)),
    })),
  removeColumn: column =>
    set(state => ({ columns: state.columns.filter(c => c.id !== column.id) })),
}));

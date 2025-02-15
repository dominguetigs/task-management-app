'use client';

import { useTable } from '@/store';

export function TableHeaderData() {
  const tableColumns = useTable(state => state.columns);

  return tableColumns.map(column => (
    <th key={column.id} scope="col" className="px-2 py-1 text-left text-sm">
      {column.name}
    </th>
  ));
}

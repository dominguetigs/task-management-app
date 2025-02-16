'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useTable, useTasks } from '@/store';

export function TableHeaderData() {
  const tableColumns = useTable(state => state.columns);
  const tasks = useTasks(state => state.tasks);

  return (
    <tr>
      <th scope="col" className="p-1 text-center">
        {tasks.length > 0 && <Checkbox />}
      </th>

      {tableColumns.map(column => (
        <th key={column.id} scope="col" className="px-2 py-1 text-left text-sm">
          {column.name}
        </th>
      ))}

      <th scope="col" className="p-1"></th>
    </tr>
  );
}

'use client';

import React from 'react';

import { ArrowDown, ArrowUp } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { TABLE_COLUMN_ICONS } from '@/constants';
import { useTable } from '@/store';
import { Task } from '@/types';

export function TableHeaderData() {
  const tableColumns = useTable(state => state.columns);
  const tableRows = useTable(state => state.rows);
  const sort = useTable(state => state.sort);
  const setSort = useTable(state => state.setSort);

  function handleSort(columnId: keyof Task) {
    if (sort?.key === columnId) {
      setSort({ key: columnId, order: sort.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ key: columnId, order: 'asc' });
    }
  }

  return (
    <tr>
      <th scope="col" className="p-1 text-center">
        {tableRows.length > 0 && <Checkbox />}
      </th>

      {tableColumns.map(column => {
        const columnIcon = TABLE_COLUMN_ICONS[column.id];

        return (
          <th
            key={column.id}
            scope="col"
            className="px-2 py-1 text-left text-sm hover:bg-slate-100 transition"
          >
            <div className="flex items-center gap-1">
              {columnIcon && React.createElement(columnIcon, { className: 'w-3 h-3' })}

              <span>{column.name}</span>
              <button
                type="button"
                onClick={() => handleSort(column.id)}
                className="text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                {sort && sort.key === column.id ? (
                  sort.order === 'asc' ? (
                    <ArrowUp className="w-4 h-4 text-slate-700" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-slate-700" />
                  )
                ) : (
                  <ArrowUp className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                )}
              </button>
            </div>
          </th>
        );
      })}

      <th scope="col" className="p-1"></th>
    </tr>
  );
}

'use client';

import React, { useEffect } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { UpdateTaskAction } from '@/components/update-task-action';
import { RemoveTaskAction } from '@/components/remove-task-action';
import { useTable, useTasks } from '@/store';
import { paginateTasks } from '@/utils';

import { EditableField } from './editable-field';

export function TableBodyData() {
  const {
    columns: tableColumns,
    rows: tableRows,
    updateRows,
    filters,
    sort,
    pagination,
  } = useTable();
  const tasks = useTasks(state => state.tasks);

  useEffect(() => {
    if (tasks) {
      updateRows(tasks);
    }
  }, [tasks, updateRows, filters, sort]);

  if (tableRows.length === 0) {
    return (
      <tr>
        <td className="border border-slate-200 p-1 text-center" colSpan={5}>
          No tasks found.
        </td>
      </tr>
    );
  }

  const paginatedTasks = paginateTasks(tableRows, pagination);

  return paginatedTasks.map((task, index) => {
    const taskKey = `task-key-${task.id}-${index}`;

    return (
      <tr
        key={taskKey}
        className="[&>td]:first:border-l-transparent [&>td]:last:border-r-transparent"
      >
        <td className="border border-slate-200 p-1 text-center">
          <Checkbox />
        </td>

        {tableColumns.map((column, index) => {
          const key = `task-table-column-key-${task.id}-${column.id}-${index}`;

          return (
            <React.Fragment key={key}>
              {column.id === 'id' ? (
                <td className="w-20 border border-slate-200 px-2 py-1 text-xs font-semibold">
                  {task.id}
                </td>
              ) : (
                <EditableField column={column} task={task} />
              )}
            </React.Fragment>
          );
        })}

        <td className="w-30 border border-slate-200 px-2 py-1 text-center text-xs">
          <UpdateTaskAction task={task} />
          <RemoveTaskAction task={task} variant="icon" />
        </td>
      </tr>
    );
  });
}

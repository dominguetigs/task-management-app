'use client';

import React, { useEffect } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { UpdateTaskAction } from '@/components/update-task-action';
import { RemoveTaskAction } from '@/components/remove-task-action';
import { useTable, useTasks } from '@/store';
import { paginateTasks } from '@/utils';

import { EditableField } from './editable-field';
import { cn } from '@/lib/utils';

export function TableBodyData() {
  const {
    columns: tableColumns,
    rows: tableRows,
    updateRows,
    filters,
    sort,
    pagination,
    selectedRows,
    toggleRowSelection,
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
        <td
          className="border border-slate-200 px-2 py-1 text-left"
          colSpan={tableColumns.length + 2}
        >
          No tasks found.
        </td>
      </tr>
    );
  }

  const paginatedTasks = paginateTasks(tableRows, pagination);

  return paginatedTasks.map((task, index) => {
    const taskKey = `task-key-${task.id}-${index}`;
    const isSelected = selectedRows[pagination.page]?.has(task.id);

    return (
      <tr
        key={taskKey}
        className={cn(
          '[&>td]:first:border-l-transparent [&>td]:last:border-r-transparent',
          isSelected && 'bg-slate-100',
        )}
      >
        <td
          className={cn(
            'p-1 border border-slate-200 text-center sticky -left-[1px] bg-white z-10',
            isSelected && 'bg-slate-100',
          )}
        >
          <Checkbox checked={isSelected} onCheckedChange={() => toggleRowSelection(task.id)} />
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
          <RemoveTaskAction taskId={task.id} variant="icon" />
        </td>
      </tr>
    );
  });
}

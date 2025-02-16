'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { UpdateTaskAction } from '@/components/update-task-action';
import { RemoveTaskAction } from '@/components/remove-task-action';
import { useTable, useTasks } from '@/store';
import { EditableField } from './editable-field';

export function TableBodyData() {
  const tableColumns = useTable(state => state.columns);
  const tasks = useTasks(state => state.tasks);

  if (tasks.length === 0) {
    return (
      <tr>
        <td className="border border-slate-200 p-1 text-center" colSpan={5}>
          No tasks found.
        </td>
      </tr>
    );
  }

  return tasks.map(task => (
    <tr
      key={task.id}
      className="[&>td]:first:border-l-transparent [&>td]:last:border-r-transparent"
    >
      <td className="border border-slate-200 p-1 text-center">
        <Checkbox />
      </td>

      {tableColumns.map(column => (
        <EditableField key={column.id} field={column.id} task={task} />
      ))}

      <td className="border border-slate-200 px-2 py-1 text-center text-xs">
        <UpdateTaskAction task={task} />
        <RemoveTaskAction task={task} />
      </td>
    </tr>
  ));
}

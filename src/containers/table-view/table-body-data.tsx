'use client';

import { Priority } from '@/components/priority';
import { Status } from '@/components/status';
import { useTasks } from '@/store';

export function TableBodyData() {
  const tasks = useTasks(state => state.tasks);

  return tasks.map(task => (
    <tr key={task.id}>
      <td className="border border-zinc-300 px-2 py-1 text-xs">{task.title}</td>
      <td className="border border-zinc-300 px-2 py-1 text-xs">
        <Status type={task.status} />
      </td>
      <td className="border border-zinc-300 px-2 py-1 text-xs">
        <Priority type={task.priority} />
      </td>
    </tr>
  ));
}

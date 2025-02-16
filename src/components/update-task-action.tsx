'use client';

import { Pencil } from 'lucide-react';

import { useSheet } from '@/store';
import { Task } from '@/types';

interface UpdateTaskActionProps {
  task: Task;
}

export function UpdateTaskAction({ task }: UpdateTaskActionProps) {
  const onOpenChange = useSheet(state => state.onOpenChange);

  return (
    <button
      className="p-1 mr-1 rounded hover:bg-slate-200 cursor-pointer"
      onClick={() => onOpenChange(true, task)}
    >
      <Pencil className="w-3 h-3 text-slate-600" />
    </button>
  );
}

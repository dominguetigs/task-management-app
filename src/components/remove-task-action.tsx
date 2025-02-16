'use client';

import { Trash } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useTasks } from '@/store';
import { Task } from '@/types';

interface RemoveTaskActionProps {
  task: Task;
}

export function RemoveTaskAction({ task }: RemoveTaskActionProps) {
  const removeTask = useTasks(state => state.removeTask);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="p-1 rounded hover:bg-red-200 cursor-pointer">
          <Trash className="w-3 h-3 text-red-600" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeTask(task)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

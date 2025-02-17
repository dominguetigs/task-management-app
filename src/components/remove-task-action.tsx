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

import { Button } from './ui/button';

interface RemoveTaskActionProps {
  task: Task;
  variant?: 'default' | 'icon';
  onRemoved?: () => void;
}

export function RemoveTaskAction({ task, variant = 'default', onRemoved }: RemoveTaskActionProps) {
  const removeTask = useTasks(state => state.removeTask);

  function handleRemoveTask(task: Task): void {
    removeTask(task);

    if (onRemoved) {
      onRemoved();
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="inline-block">
          {variant === 'default' && (
            <Button type="button" className="cursor-pointer" variant="destructive" size="icon">
              <Trash />
            </Button>
          )}

          {variant === 'icon' && (
            <button type="button" className="p-1 rounded hover:bg-red-200 cursor-pointer">
              <Trash className="w-3 h-3 text-red-600" />
            </button>
          )}
        </div>
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
          <AlertDialogAction onClick={() => handleRemoveTask(task)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

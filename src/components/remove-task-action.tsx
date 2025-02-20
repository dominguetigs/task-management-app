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

import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface RemoveTaskActionProps {
  taskId: number | number[];
  variant?: 'default' | 'icon';
  className?: string;
  onRemoved?: () => void;
}

export function RemoveTaskAction({
  taskId,
  variant = 'default',
  className,
  onRemoved,
}: RemoveTaskActionProps) {
  const { removeTask, removeMultipleTasks } = useTasks();

  const isMultiple = Array.isArray(taskId);

  function handleRemoveTask(): void {
    if (isMultiple) {
      removeMultipleTasks(taskId);
    } else {
      removeTask(taskId);
    }

    if (onRemoved) {
      onRemoved();
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className={cn('inline-block', className)}>
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
            This action cannot be undone. This will permanently delete
            {isMultiple ? 'these tasks' : 'this task'}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveTask}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

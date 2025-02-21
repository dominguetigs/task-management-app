'use client';

import { Trash } from 'lucide-react';

import { toast } from 'sonner';

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
import { useTasks } from '@/stores';
import { cn } from '@/lib/utils';
import { toastRedo, toastUndo } from '@/utils';

import { Button } from './ui/button';

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
  const { removeTask, removeMultipleTasks, undo, redo } = useTasks();

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

    toastUndo(
      `${isMultiple && taskId.length > 1 ? 'Tasks' : 'Task'} removed successfully`,
      null,
      () => {
        undo();

        if (!isMultiple || (isMultiple && taskId.length === 1)) {
          toastRedo('Task remove undone', null, () => {
            redo();
            toast('Task remove redone');
          });
        } else {
          toast('Tasks remove undone');
        }
      },
    );
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
            This action cannot be undone. This will permanently delete{' '}
            {isMultiple && taskId.length > 1 ? 'these tasks' : 'this task'}.
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

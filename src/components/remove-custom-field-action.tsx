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
import { useTable, useTasks } from '@/store';
import { CustomField } from '@/types';

import { Icon } from './icon';
import { Button } from './ui/button';

interface RemoveTaskActionProps {
  customField: CustomField;
  variant?: 'default' | 'minimal';
  onRemoved?: () => void;
}

export function RemoveCustomFieldAction({
  customField,
  variant = 'default',
  onRemoved,
}: RemoveTaskActionProps) {
  const { removeColumn, removeFilter } = useTable();
  const removeCustomField = useTasks(state => state.removeCustomField);

  function handleRemoveCustomField(): void {
    removeColumn(customField.id);
    removeCustomField(customField.id);
    removeFilter(customField.id);

    if (onRemoved) {
      onRemoved();
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="inline-block">
          {variant === 'default' && (
            <div className="flex items-center gap-2">
              <Icon name="trash" size={16} />
              <span>Remove</span>
            </div>
          )}

          {variant === 'minimal' && (
            <Button type="button" className="cursor-pointer" variant="destructive" size="icon">
              <Trash />
            </Button>
          )}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your custom field.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveCustomField}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

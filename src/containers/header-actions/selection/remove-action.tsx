'use client';

import { RemoveTaskAction } from '@/components/remove-task-action';
import { useTable } from '@/stores';

interface RemoveActionProps {
  selectedRowsIds: number[];
  className?: string;
}

export function RemoveAction({ selectedRowsIds, className }: RemoveActionProps) {
  const { clearSelection, setPagination, pagination } = useTable();

  return (
    <RemoveTaskAction
      className={className}
      taskId={selectedRowsIds}
      onRemoved={() => {
        clearSelection();
        setPagination({ ...pagination, page: 1 });
      }}
    />
  );
}

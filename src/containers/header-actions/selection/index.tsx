'use client';

import { useTable } from '@/stores';

import { RemoveAction } from './remove-action';
import { SelectionButton } from './selection-button';
import { SelectionMenu } from './selection-menu';
import { SelectionAllButton } from './selection-all-button';

export function Selection() {
  const { selectedRows } = useTable();

  const selectedCount = selectedRows?.size ?? 0;
  const selectedRowsIds = Array.from(selectedRows);

  return (
    <div className="flex items-center flex-wrap gap-2 my-4">
      <div className="flex w-full sm:w-auto gap-2">
        <SelectionButton selectedCount={selectedCount} />
        <RemoveAction className="sm:hidden" selectedRowsIds={selectedRowsIds} />
      </div>

      <SelectionMenu selectedRowsIds={selectedRowsIds} />

      <RemoveAction className="hidden sm:block" selectedRowsIds={selectedRowsIds} />

      <SelectionAllButton />
    </div>
  );
}

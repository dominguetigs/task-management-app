'use client';

import { useTable } from '@/store';

import { RemoveAction } from './remove-action';
import { SelectionButton } from './selection-button';
import { SelectionMenu } from './selection-menu';

export function Selection() {
  const { selectedRows } = useTable();

  const selectedRowsIds = Object.values(selectedRows).reduce((acc, selected) => {
    const selectedRows = Array.from(selected).map(selectedRow => +selectedRow);
    return [...acc, ...selectedRows];
  }, [] as number[]);

  const selectedCount = selectedRowsIds.length;

  return (
    <div className="flex items-center flex-wrap gap-2 my-4">
      <div className="flex w-full sm:w-auto gap-2">
        <SelectionButton selectedCount={selectedCount} />
        <RemoveAction className="sm:hidden" selectedRowsIds={selectedRowsIds} />
      </div>

      <SelectionMenu selectedRowsIds={selectedRowsIds} />

      <RemoveAction className="hidden sm:block" selectedRowsIds={selectedRowsIds} />
    </div>
  );
}

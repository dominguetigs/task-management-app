'use cleint';

import { Button } from '@/components/ui/button';

import { useTable } from '@/stores';

export function SelectionAllButton() {
  const { rows, selectedAllRows, toggleSelectAll } = useTable();

  if (selectedAllRows) {
    return null;
  }

  const rowsIds = rows.map(row => row.id);

  return (
    <Button
      type="button"
      className="sm:ml-auto"
      variant="outline"
      onClick={() => toggleSelectAll(rowsIds)}
    >
      Select all {rows.length} tasks
    </Button>
  );
}

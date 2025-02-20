'use client';

import { Button } from '@/components/ui/button';
import { useTable } from '@/store';

interface SelectionButtonProps {
  selectedCount: number;
}

export function SelectionButton({ selectedCount }: SelectionButtonProps) {
  const clearSelection = useTable(state => state.clearSelection);

  return (
    <Button type="button" className="cursor-pointer" onClick={() => clearSelection()}>
      {selectedCount}
      <span>selected</span>
    </Button>
  );
}

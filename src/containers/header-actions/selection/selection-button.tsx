'use client';

import { Icon } from '@/components/icon';
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
      <Icon className="block sm:hidden" name="check" size={16} />
      <span className="hidden sm:block">selected</span>
    </Button>
  );
}

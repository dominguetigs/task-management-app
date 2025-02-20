'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTable, useTaskFormPanel } from '@/store';

import { Filter } from './filter';
import { Selection } from './selection';

export function HeaderActions() {
  const onOpenChange = useTaskFormPanel(state => state.onOpenChange);
  const selectedRows = useTable(state => state.selectedRows);

  const hasSomeSelection = selectedRows?.size > 0;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <header className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button className="block ml-auto" onClick={() => onOpenChange(true)}>
          New
        </Button>
      </header>

      <Separator className="mt-4" />

      <Filter />

      {hasSomeSelection && <Selection />}
    </div>
  );
}

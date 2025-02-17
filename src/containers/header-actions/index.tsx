'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSheet } from '@/store';

import { Filter } from './filter';

export function HeaderActions() {
  const onOpenChange = useSheet(state => state.onOpenChange);

  return (
    <>
      <header className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button className="block ml-auto" onClick={() => onOpenChange(true)}>
          New
        </Button>
      </header>

      <Separator className="mt-4" />

      <Filter />
    </>
  );
}

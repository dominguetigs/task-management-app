'use client';

import { Button } from '@/components/ui/button';
import { useSheet } from '@/store';

export function HeaderActions() {
  const onOpenChange = useSheet(state => state.onOpenChange);

  return (
    <>
      <Button className="block ml-auto" onClick={() => onOpenChange(true)}>
        New
      </Button>
    </>
  );
}

import { create } from 'zustand';

import { CustomField, Task } from '@/types';

type PanelStore<T> = {
  open: boolean;
  data: T | undefined;
  onOpenChange: (open: boolean, data?: T) => void;
};

function createPanelStore<T>() {
  return create<PanelStore<T>>()(set => ({
    open: false,
    data: undefined,
    onOpenChange: (open, data) => set({ open, data }),
  }));
}

export const useTableCustomColumnFormPanel = createPanelStore<CustomField>();
export const useTaskFormPanel = createPanelStore<Task>();

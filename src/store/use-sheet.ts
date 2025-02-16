import { create } from 'zustand';

import { Task } from '@/types';

type SheetStore = {
  open: boolean;
  data: Task | undefined;
  onOpenChange: (open: boolean, data?: Task) => void;
};

export const useSheet = create<SheetStore>()(set => ({
  open: false,
  data: undefined,
  onOpenChange: (open, data) => set({ open, data }),
}));

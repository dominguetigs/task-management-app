import { create } from 'zustand';

type SheetStore = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const useSheet = create<SheetStore>()(set => ({
  open: false,
  onOpenChange: open => set({ open }),
}));

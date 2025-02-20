import { toast } from 'sonner';

const DURATION = 5000;

export function toastUndo(message: string, description = null, undo: VoidFunction) {
  toast(message, {
    duration: DURATION,
    description,
    action: {
      label: 'Undo',
      onClick: () => {
        undo();
      },
    },
  });
}

export function toastRedo(message: string, description = null, redo: VoidFunction) {
  toast(message, {
    duration: DURATION,
    description,
    action: {
      label: 'Redo',
      onClick: () => {
        redo();
      },
    },
  });
}

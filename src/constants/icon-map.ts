import {
  AArrowDown,
  AArrowUp,
  Check,
  EllipsisVertical,
  Hash,
  Hourglass,
  LucideIcon,
  Pencil,
  Pin,
  Text,
  Trash,
} from 'lucide-react';

import { IconNames } from '@/types';

export const ICON_MAP: Record<IconNames, LucideIcon> = {
  'a-arrow-down': AArrowDown,
  'a-arrow-up': AArrowUp,
  check: Check,
  text: Text,
  hash: Hash,
  hourglass: Hourglass,
  pin: Pin,
  trash: Trash,
  pencil: Pencil,
  'ellipsis-vertical': EllipsisVertical,
};

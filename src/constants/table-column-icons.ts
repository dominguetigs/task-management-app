import { Task } from '@/types';
import { Hash, Hourglass, LucideIcon, Pin, Text } from 'lucide-react';

export const TABLE_COLUMN_ICONS: Record<keyof Task, LucideIcon> = {
  id: Hash,
  priority: Pin,
  status: Hourglass,
  title: Text,
};

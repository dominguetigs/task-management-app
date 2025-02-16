import { TaskPriority } from '@/types/task';

export const TASK_PRIORITY: Record<TaskPriority, string> = {
  none: 'None',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

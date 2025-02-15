import { TaskStatus } from '@/types/task';

export const TASK_STATUS: Record<TaskStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  completed: 'Completed',
};

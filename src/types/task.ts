export type TaskStatus = 'not_started' | 'in_progress' | 'completed';

export type TaskPriority = 'none' | 'low' | 'medium' | 'high' | 'urgent';

export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
};

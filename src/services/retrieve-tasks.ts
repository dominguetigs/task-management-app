import { TASKS } from '@/constants';
import { Task } from '@/types';
import { getFromLocalstorage } from '@/utils';

export function retrieveTasks(): Task[] {
  const storedTasks = getFromLocalstorage<Task[]>('tasks');
  return storedTasks || TASKS;
}

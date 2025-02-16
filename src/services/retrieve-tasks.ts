import { TASKS } from '@/constants';
import { Task } from '@/types';
import { getFromLocalstorage, setToLocalstorage } from '@/utils';

export function retrieveTasks(): Task[] {
  const storedTasks = getFromLocalstorage<Task[]>('tasks');

  if (!storedTasks) {
    setToLocalstorage('tasks', TASKS);
    return TASKS;
  }

  return storedTasks;
}

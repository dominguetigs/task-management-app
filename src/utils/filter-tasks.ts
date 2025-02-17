import { Filter, Task } from '@/types';

export function filterTasks(data: Task[], filters: Filter[]): Task[] {
  return data.filter(item => {
    return filters.every(({ key, value }) => {
      if (value === '') {
        return true;
      }

      return item[key as keyof Task].toString().toLowerCase().includes(value.toLowerCase());
    });
  });
}

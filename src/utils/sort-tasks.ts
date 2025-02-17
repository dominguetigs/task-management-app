import { Sort, Task } from '@/types';

export function sortTasks(data: Task[], sort: Sort): Task[] {
  return [...data].sort((a, b) => {
    const valueA = a[sort.key];
    const valueB = b[sort.key];

    const multiplier = sort.order === 'asc' ? 1 : -1;

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB) * multiplier;
    }

    return (Number(valueA) - Number(valueB)) * multiplier;
  });
}

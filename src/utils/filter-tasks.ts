import { Filter, Task } from '@/types';

export function filterTasks(data: Task[], filters: Filter[]): Task[] {
  return data.filter(task =>
    filters.every(({ key, value }) => {
      const fieldValue = task[key as keyof Task];

      if (
        value === undefined ||
        value === null ||
        value === '' ||
        fieldValue === undefined ||
        fieldValue === null ||
        fieldValue === ''
      ) {
        return true;
      }

      switch (typeof fieldValue) {
        case 'number':
          return fieldValue === value;
        case 'boolean':
          return fieldValue === value;
        case 'string':
          return fieldValue.toLowerCase().includes(String(value).toLowerCase());
        default:
          return true;
      }
    }),
  );
}

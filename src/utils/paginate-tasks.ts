import { Pagination, Task } from '@/types';

export function paginateTasks(data: Task[], pagination: Pagination): Task[] {
  const { page, limit } = pagination;
  const start = (page - 1) * limit;
  const end = start + limit;

  return data.slice(start, end);
}

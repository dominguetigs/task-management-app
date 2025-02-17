import { Task } from './task';

export type SortOrder = 'asc' | 'desc';

export type Sort = {
  key: keyof Task;
  order: SortOrder;
};

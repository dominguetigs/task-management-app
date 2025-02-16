import { Task } from './task';

export type TableColumn = {
  id: keyof Task;
  name: string;
};

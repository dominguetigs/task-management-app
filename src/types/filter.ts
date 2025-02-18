import { Task } from './task';

export type Filter = {
  key: keyof Task;
  value: string | number | boolean;
};

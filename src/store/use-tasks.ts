import { create } from 'zustand';

import { retrieveTasks } from '@/services';
import { Task } from '@/types/task';

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (task: Task) => void;
  updateTask: (task: Task) => void;
};

export const useTasks = create<TaskStore>()(set => ({
  tasks: retrieveTasks(),
  addTask: task => set(state => ({ tasks: [...state.tasks, task] })),
  removeTask: task => set(state => ({ tasks: state.tasks.filter(t => t.id !== task.id) })),
  updateTask: task =>
    set(state => ({
      tasks: state.tasks.map(t => (t.id === task.id ? task : t)),
    })),
}));

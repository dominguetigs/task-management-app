import { create } from 'zustand';

import { retrieveTasks } from '@/services';
import { Task } from '@/types/task';
import { setToLocalstorage } from '@/utils';

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (task: Task) => void;
  updateTask: (task: Task) => void;
};

export const useTasks = create<TaskStore>()(set => ({
  tasks: retrieveTasks(),
  addTask: task =>
    set(state => {
      const maxId = state.tasks.length > 0 ? Math.max(...state.tasks.map(t => t.id)) : 0;
      const newTask = { ...task, id: maxId + 1 };
      const updatedTasks = [...state.tasks, newTask];
      setToLocalstorage('tasks', updatedTasks);

      return { tasks: updatedTasks };
    }),
  removeTask: task => set(state => ({ tasks: state.tasks.filter(t => t.id !== task.id) })),
  updateTask: task =>
    set(state => ({
      tasks: state.tasks.map(t => (t.id === task.id ? task : t)),
    })),
}));

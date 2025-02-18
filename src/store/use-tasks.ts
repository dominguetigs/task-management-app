'use client';

import { create } from 'zustand';

import { Task, CustomField } from '@/types';
import { retrieveTasks } from '@/services';
import { getDefaultValueByFieldType, setToLocalstorage } from '@/utils';

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (task: number) => void;
  updateTask: (task: Task) => void;

  addCustomField: (field: CustomField) => void;
  removeCustomField: (fieldId: string) => void;
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
  removeTask: taskId =>
    set(state => {
      const updatedTasks = state.tasks.filter(t => t.id !== taskId);
      setToLocalstorage('tasks', updatedTasks);
      return { tasks: updatedTasks };
    }),
  updateTask: task =>
    set(state => {
      const updatedTasks = state.tasks.map(t => (t.id === task.id ? task : t));
      setToLocalstorage('tasks', updatedTasks);
      return { tasks: updatedTasks };
    }),

  addCustomField: field =>
    set(state => {
      const updatedTasks = state.tasks.map(t => {
        return {
          ...t,
          [field.id]: getDefaultValueByFieldType(field.type),
        };
      });
      setToLocalstorage('tasks', updatedTasks);
      return { tasks: updatedTasks };
    }),
  removeCustomField: fieldId =>
    set(state => {
      const updatedTasks = state.tasks.map(t => {
        const updatedTask = { ...t };
        delete updatedTask[fieldId];
        return updatedTask;
      });
      setToLocalstorage('tasks', updatedTasks);
      return { tasks: updatedTasks };
    }),
}));

'use client';

import { create } from 'zustand';

import { Task, CustomField } from '@/types';
import { retrieveTasks } from '@/services';
import { getDefaultValueByFieldType, updateLocalStorage } from '@/utils';

type TaskState = {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (taskId: number) => void;
  updateTask: (task: Task) => void;
  updateMultipleTasks: (
    taskIds: number[],
    field: keyof Task,
    value: string | number | boolean | null | undefined,
  ) => void;
  removeMultipleTasks: (taskIds: number[]) => void;
};

type CustomFieldState = {
  addCustomField: (field: CustomField) => void;
  removeCustomField: (fieldId: string) => void;
};

type TaskStore = TaskState & CustomFieldState;

export const useTasks = create<TaskStore>()(set => ({
  tasks: retrieveTasks(),

  addTask: task =>
    set(state => {
      const newTask = { ...task, id: (state.tasks.at(-1)?.id || 0) + 1 };
      const updatedTasks = [...state.tasks, newTask];
      return { tasks: updateLocalStorage('tasks', updatedTasks) };
    }),
  removeTask: taskId =>
    set(state => {
      const updatedTasks = state.tasks.filter(t => t.id !== taskId);
      return { tasks: updateLocalStorage('tasks', updatedTasks) };
    }),
  updateTask: task =>
    set(state => {
      const updatedTasks = state.tasks.map(t => (t.id === task.id ? task : t));
      return { tasks: updateLocalStorage('tasks', updatedTasks) };
    }),

  updateMultipleTasks: (
    taskIds: number[],
    field: keyof Task,
    value: string | number | boolean | null | undefined,
  ) =>
    set(state => {
      const updatedTasks = state.tasks.map(task =>
        taskIds.includes(task.id) ? { ...task, [field]: value } : task,
      );

      return { tasks: updateLocalStorage('tasks', updatedTasks) };
    }),
  removeMultipleTasks: (selectedTaskIds: number[]) =>
    set(state => {
      const updatedTasks = state.tasks.filter(task => !selectedTaskIds.includes(task.id));

      return { tasks: updateLocalStorage('tasks', updatedTasks) };
    }),

  addCustomField: field =>
    set(state => {
      const updatedTasks = state.tasks.map(t => {
        return {
          ...t,
          [field.id]: getDefaultValueByFieldType(field.type),
        };
      });

      return { tasks: updateLocalStorage('tasks', updatedTasks) };
    }),
  removeCustomField: fieldId =>
    set(state => {
      const updatedTasks = state.tasks.map(t => {
        const updatedTask = { ...t };
        delete updatedTask[fieldId];
        return updatedTask;
      });

      return { tasks: updateLocalStorage('tasks', updatedTasks) };
    }),
}));

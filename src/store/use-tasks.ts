'use client';

import { create } from 'zustand';

import { Task, CustomField } from '@/types';
import { retrieveTasks } from '@/services';
import { getDefaultValueByFieldType, setToLocalstorage } from '@/utils';

type TaskStore = {
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

  updateMultipleTasks: (
    taskIds: number[],
    field: keyof Task,
    value: string | number | boolean | null | undefined,
  ) =>
    set(state => {
      const updatedTasks = state.tasks.map(task =>
        taskIds.includes(task.id) ? { ...task, [field]: value } : task,
      );

      setToLocalstorage('tasks', updatedTasks);
      return { tasks: updatedTasks };
    }),
  removeMultipleTasks: (selectedTaskIds: number[]) =>
    set(state => {
      const updatedTasks = state.tasks.filter(task => !selectedTaskIds.includes(task.id));

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

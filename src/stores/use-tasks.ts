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

type UndoRedoState = {
  undoHistory: Task[][];
  redoHistory: Task[][];
  undo: () => void;
  redo: () => void;
};

type TaskStore = TaskState & CustomFieldState & UndoRedoState;

export const useTasks = create<TaskStore>()(set => ({
  tasks: retrieveTasks(),
  undoHistory: [],
  redoHistory: [],

  undo: () =>
    set(state => {
      const previousTasks = state.undoHistory.pop();

      if (previousTasks) {
        return {
          tasks: updateLocalStorage('tasks', previousTasks),
          redoHistory: [...state.redoHistory, state.tasks],
        };
      }

      return state;
    }),
  redo: () =>
    set(state => {
      const previousTasks = state.redoHistory.pop();

      if (previousTasks) {
        return {
          tasks: updateLocalStorage('tasks', previousTasks),
          undoHistory: [...state.undoHistory, state.tasks],
        };
      }

      return state;
    }),

  addTask: task =>
    set(state => {
      const newTask = { ...task, id: (state.tasks.at(-1)?.id || 0) + 1 };
      const updatedTasks = [...state.tasks, newTask];
      return {
        undoHistory: [...state.undoHistory, state.tasks],
        tasks: updateLocalStorage('tasks', updatedTasks),
      };
    }),
  removeTask: taskId =>
    set(state => {
      const updatedTasks = state.tasks.filter(task => task.id !== taskId);
      return {
        undoHistory: [...state.undoHistory, state.tasks],
        tasks: updateLocalStorage('tasks', updatedTasks),
      };
    }),
  updateTask: task =>
    set(state => {
      const updatedTasks = state.tasks.map(taskItem => (taskItem.id === task.id ? task : taskItem));
      return {
        undoHistory: [...state.undoHistory, state.tasks],
        tasks: updateLocalStorage('tasks', updatedTasks),
      };
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

      return {
        undoHistory: [...state.undoHistory, state.tasks],
        tasks: updateLocalStorage('tasks', updatedTasks),
      };
    }),
  removeMultipleTasks: (selectedTaskIds: number[]) =>
    set(state => {
      const updatedTasks = state.tasks.filter(task => !selectedTaskIds.includes(task.id));

      return {
        undoHistory: [...state.undoHistory, state.tasks],
        tasks: updateLocalStorage('tasks', updatedTasks),
      };
    }),

  addCustomField: field =>
    set(state => {
      const updatedTasks = state.tasks.map(task => {
        return {
          ...task,
          [field.id]: getDefaultValueByFieldType(field.type),
        };
      });

      return {
        undoHistory: [...state.undoHistory, state.tasks],
        tasks: updateLocalStorage('tasks', updatedTasks),
      };
    }),
  removeCustomField: fieldId =>
    set(state => {
      const updatedTasks = state.tasks.map(task => {
        const updatedTask = { ...task };
        delete updatedTask[fieldId];
        return updatedTask;
      });

      return {
        undoHistory: [...state.undoHistory, state.tasks],
        tasks: updateLocalStorage('tasks', updatedTasks),
      };
    }),
}));

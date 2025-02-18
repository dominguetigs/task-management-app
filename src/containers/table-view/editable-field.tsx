'use client';

import { useEffect, useState } from 'react';

import { useTasks } from '@/store';
import { TableColumn, Task, TaskPriority, TaskStatus } from '@/types';
import { Status } from '@/components/status';
import { Priority } from '@/components/priority';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TASK_PRIORITY, TASK_STATUS } from '@/constants';
import { Switch } from '@/components/ui/switch';

interface EditableFieldProps {
  task: Task;
  column: TableColumn;
}

export function EditableField({ task, column }: EditableFieldProps) {
  const tasks = useTasks(state => state.tasks);
  const updateTask = useTasks(state => state.updateTask);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task[column.id]);

  function handleSave(value: string | number | boolean | TaskStatus | TaskPriority): void {
    if (!value && typeof value !== 'boolean') {
      return;
    }

    updateTask({ ...task, [column.id]: value });
    setIsEditing(false);
  }

  useEffect(() => {
    const filteredTask = tasks.find(t => t.id === task.id);

    if (filteredTask) {
      setValue(filteredTask[column.id]);
    }
  }, [tasks, task, column]);

  if (column.type === 'boolean') {
    return (
      <td className="border border-slate-200 px-2 py-1 text-xs cursor-pointer">
        <Switch
          checked={value as boolean}
          onCheckedChange={checked => {
            setValue(checked);
            handleSave(checked);
          }}
        />
      </td>
    );
  }

  return (
    <td
      className="border border-slate-200 px-2 py-1 text-xs cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <div>
          {column.type === 'text' && (
            <Input
              type="text"
              mode="minimal"
              value={value as string}
              onBlur={() => handleSave(value as string)}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave(value as string)}
              autoFocus
            />
          )}

          {column.type === 'number' && (
            <Input
              type="number"
              mode="minimal"
              value={value as number}
              onBlur={() => handleSave(Number(value) as number)}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave(Number(value) as number)}
              autoFocus
            />
          )}

          {column.type === 'status' && (
            <Select
              defaultOpen
              value={value as TaskStatus}
              onValueChange={(value: TaskStatus) => {
                setValue(value);
                handleSave(value as TaskStatus);
              }}
              onOpenChange={setIsEditing}
            >
              <SelectTrigger mode="minimal">
                <SelectValue placeholder={`Select ${column.name}`} />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(TASK_STATUS).map(key => (
                  <SelectItem key={key} value={key}>
                    <Status type={key as TaskStatus} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {column.type === 'priority' && (
            <Select
              defaultOpen
              value={value as TaskPriority}
              onValueChange={(value: TaskPriority) => {
                setValue(value);
                handleSave(value as TaskPriority);
              }}
              onOpenChange={setIsEditing}
            >
              <SelectTrigger mode="minimal">
                <SelectValue placeholder={`Select ${column.name}`} />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(TASK_PRIORITY).map(key => (
                  <SelectItem key={key} value={key}>
                    <Priority type={key as TaskPriority} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      ) : (
        <>
          {(column.type === 'text' || column.type === 'number') && task[column.id]}
          {column.type === 'status' && <Status type={task.status} />}
          {column.type === 'priority' && <Priority type={task.priority} />}
        </>
      )}
    </td>
  );
}

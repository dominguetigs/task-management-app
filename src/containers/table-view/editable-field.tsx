'use client';

import { useEffect, useState } from 'react';

import { useTasks } from '@/store';
import { Task, TaskPriority, TaskStatus } from '@/types';
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

interface EditableFieldProps {
  task: Task;
  field: keyof Task;
}

export function EditableField({ task, field }: EditableFieldProps) {
  const tasks = useTasks(state => state.tasks);
  const updateTask = useTasks(state => state.updateTask);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task[field]);

  function handleSave(value: string | TaskStatus | TaskPriority): void {
    if (!value) {
      return;
    }

    updateTask({ ...task, [field]: value });
    setIsEditing(false);
  }

  useEffect(() => {
    const filteredTask = tasks.find(t => t.id === task.id);

    if (filteredTask) {
      setValue(filteredTask[field]);
    }
  }, [tasks, task, field]);

  return (
    <td
      className="border border-slate-200 px-2 py-1 text-xs cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <div>
          {field === 'title' && (
            <Input
              mode="minimal"
              value={value}
              onBlur={() => handleSave(value as string)}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave(value as string)}
              autoFocus
            />
          )}

          {field === 'status' && (
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
                <SelectValue placeholder={`Select ${field}`} />
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

          {field === 'priority' && (
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
                <SelectValue placeholder={`Select ${field}`} />
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
          {field === 'title' && task.title}
          {field === 'status' && <Status type={task.status} />}
          {field === 'priority' && <Priority type={task.priority} />}
        </>
      )}
    </td>
  );
}

'use client';

import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Status } from '@/components/status';
import { Priority } from '@/components/priority';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RemoveTaskAction } from '@/components/remove-task-action';

import { useTaskFormPanel, useTasks } from '@/store';

import { TASK_PRIORITY, TASK_STATUS } from '@/constants';
import { Task, TaskPriority, TaskStatus } from '@/types';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  id: z.number(),
  title: z.string().min(1, {
    message: 'Title is required.',
  }),
  status: z.string(),
  priority: z.string(),
});

const FORM_DEFAULT_VALUES: Task = {
  id: -1,
  title: '',
  status: 'not_started',
  priority: 'none',
};

export function TaskForm() {
  const { open, data, onOpenChange } = useTaskFormPanel();
  const addTask = useTasks(state => state.addTask);
  const updateTask = useTasks(state => state.updateTask);
  const isEditing = !!data;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: FORM_DEFAULT_VALUES,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditing) {
      updateTask(values as Task);
    } else {
      addTask(values as Task);
    }

    closeSheet();
  }

  function closeSheet() {
    updateForm(FORM_DEFAULT_VALUES);
    onOpenChange(false);
  }

  const updateForm = useCallback(
    (data: Task) => {
      form.reset({
        id: data.id || FORM_DEFAULT_VALUES.id,
        title: data.title || FORM_DEFAULT_VALUES.title,
        status: data.status || FORM_DEFAULT_VALUES.status,
        priority: data.priority || FORM_DEFAULT_VALUES.priority,
      });
    },
    [form],
  );

  useEffect(() => {
    if (data) {
      updateForm(data);
    }
  }, [data, form, updateForm]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader className="text-left">
          <SheetTitle>{isEditing ? 'Edit' : 'Create'} task</SheetTitle>
        </SheetHeader>

        <SheetDescription>
          {isEditing ? 'Update the task details' : 'Fill in the details of the new task'}
        </SheetDescription>

        <Separator className="-ml-6 my-6 w-[calc(100%+3rem)]" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title*</FormLabel>
                  <FormControl>
                    <Input placeholder="Fix login redirect" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={value => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(TASK_STATUS).map(key => (
                          <SelectItem key={key} value={key}>
                            <Status type={key as TaskStatus} />
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={value => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(TASK_PRIORITY).map(key => (
                          <SelectItem key={key} value={key}>
                            <Priority type={key as TaskPriority} />
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="-ml-6 my-6 w-[calc(100%+3rem)]" />

            <div
              className={cn('flex items-center justify-end gap-4', isEditing && 'justify-between')}
            >
              {isEditing && <RemoveTaskAction taskId={data.id} onRemoved={() => closeSheet()} />}

              <div className="flex items-center justify-between gap-4">
                <Button type="button" variant="outline" onClick={() => closeSheet()}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

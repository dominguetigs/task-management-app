'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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

import { useSheet, useTasks } from '@/store';

import { TASK_PRIORITY, TASK_STATUS } from '@/constants';
import { Task, TaskPriority, TaskStatus } from '@/types';

const formSchema = z.object({
  id: z.number(),
  title: z.string().min(1, {
    message: 'Title is required.',
  }),
  status: z.string(),
  priority: z.string(),
});

export function TaskForm() {
  const { open, onOpenChange } = useSheet();
  const addTask = useTasks(state => state.addTask);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: -1,
      title: '',
      status: 'not_started',
      priority: 'none',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addTask(values as Task);
  }

  function closeSheet() {
    form.reset();
    form.clearErrors();
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader className="mb-6">
          <SheetTitle>Create task</SheetTitle>
        </SheetHeader>

        <Separator className="-ml-6 mb-6 w-[calc(100%+3rem)]" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Fix login redirect" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center gap-4">
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

            <div className="flex items-center justify-end gap-4">
              <Button variant="outline" type="submit" onClick={() => closeSheet()}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

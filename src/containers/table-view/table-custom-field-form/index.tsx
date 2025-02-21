'use client';

import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { toast } from 'sonner';

import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RemoveCustomFieldAction } from '@/components/remove-custom-field-action';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
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

import { CUSTOM_FIELD_TYPES } from '@/constants';
import { useTableCustomColumnFormPanel, useTable, useTasks } from '@/store';
import { CustomField } from '@/types';
import { UUID } from '@/utils';

const FORM_DEFAULT_VALUES: CustomField = {
  id: '',
  name: '',
  type: 'text',
  canInteract: true,
  icon: 'text',
};

export function TableCustomFieldForm() {
  const { open, data, onOpenChange } = useTableCustomColumnFormPanel();
  const { addColumn, updateColumn, removeColumn, removeFilter, columns } = useTable();
  const { addCustomField, removeCustomField } = useTasks();
  const isEditing = !!data;

  const formSchema = z.object({
    id: z.string(),
    name: z
      .string()
      .min(1, {
        message: 'Name is required',
      })
      .refine(
        name => {
          const columnNames = columns.map(column => column.name.toLowerCase());
          return !columnNames.includes(name.toLowerCase());
        },
        {
          message: 'Name must be unique',
        },
      ),
    type: z.union([z.literal('text'), z.literal('number'), z.literal('boolean')]),
    canInteract: z.boolean(),
    // icon: z.any().optional().nullable(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: FORM_DEFAULT_VALUES,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const uuid = UUID();
    const customFieldData: CustomField = {
      ...values,
      id: isEditing ? data!.id : uuid,
    };

    if (isEditing) {
      handleEdit(customFieldData);
    } else {
      handleCreate(customFieldData);
    }

    closeSheet();

    toast(isEditing ? 'Custom field updated successfully' : 'Custom field created successfully');
  }

  function handleCreate(customField: CustomField) {
    addColumn(customField);
    addCustomField(customField);
  }

  function handleEdit(customField: CustomField) {
    if (!data) return;

    const hasTypeChanged = data.type !== customField.type;

    if (hasTypeChanged) {
      removeFilter(data.id);
      removeColumn(data.id);
      removeCustomField(data.id);
      handleCreate(customField);
    } else {
      updateColumn(customField);
    }
  }

  function closeSheet() {
    updateForm(FORM_DEFAULT_VALUES);
    onOpenChange(false);
  }

  const updateForm = useCallback(
    (data: CustomField) => {
      form.reset({
        id: data.id || FORM_DEFAULT_VALUES.id,
        name: data.name || FORM_DEFAULT_VALUES.name,
        type: data.type || FORM_DEFAULT_VALUES.type,
        // icon: data.icon || FORM_DEFAULT_VALUES.icon,
        canInteract: true,
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
          <SheetTitle>{isEditing ? 'Edit' : 'Create'} custom field</SheetTitle>
        </SheetHeader>

        <SheetDescription>
          {isEditing
            ? 'Edit the custom field details'
            : 'Create a new custom field to add more information to your tasks'}
        </SheetDescription>

        <Separator className="-ml-6 my-6 w-[calc(100%+3rem)]" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Type*</FormLabel>
                  <Select onValueChange={value => field.onChange(value)} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(CUSTOM_FIELD_TYPES).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Custom field name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="-ml-6 my-6 w-[calc(100%+3rem)]" />

            <div
              className={cn('flex items-center justify-end gap-4', isEditing && 'justify-between')}
            >
              {isEditing && (
                <RemoveCustomFieldAction
                  customField={data as CustomField}
                  variant="minimal"
                  onRemoved={() => closeSheet()}
                />
              )}

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

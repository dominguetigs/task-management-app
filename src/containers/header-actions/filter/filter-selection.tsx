'use client';

import { Trash } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { TASK_PRIORITY, TASK_STATUS } from '@/constants';
import { Filter, TableColumn, Task, TaskPriority, TaskStatus } from '@/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icon';

import { BooleanFilter } from './boolean-filter';
import { NumberFilter } from './number-filter';
import { TextFilter } from './text-filter';
import { StatusFilter } from './status-filter';
import { PriorityFilter } from './priority-filter';

interface FilterSelectionProps {
  field: keyof Task;
  filters: Filter[];
  tableColumns: TableColumn[];
  defaultOpen: boolean;
  updateFilter: (filter: Filter) => void;
  removeFilter: (filterKey: keyof Task) => void;
}

export function FilterSelection({
  field,
  filters,
  tableColumns,
  defaultOpen = false,
  updateFilter,
  removeFilter,
}: FilterSelectionProps) {
  const selectedFilter = filters.find(f => f.key === field);
  const tableColumn = tableColumns.find(column => column.id === field);

  function getLabel(): string {
    if (
      tableColumn?.type === 'status' ||
      tableColumn?.type === 'priority' ||
      tableColumn?.type === 'boolean' ||
      tableColumn?.type === 'text' ||
      tableColumn?.type === 'number'
    ) {
      return `${tableColumn?.name} is:`;
    }

    return `${tableColumn?.name} contains:`;
  }

  function getSelectedFilterValue(): string | undefined {
    const filterValue = selectedFilter?.value;

    if (tableColumn?.type === 'status') {
      return TASK_STATUS[filterValue as TaskStatus];
    }

    if (tableColumn?.type === 'priority') {
      return TASK_PRIORITY[filterValue as TaskPriority];
    }

    if (tableColumn?.type === 'boolean') {
      return filterValue ? 'Checked' : 'Unchecked';
    }

    return filterValue as string;
  }

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>
        <Badge
          className={cn(
            'bg-slate-300 text-slate-700 cursor-pointer hover:bg-slate-400 hover:text-slate-800',
            selectedFilter?.value !== null &&
              selectedFilter?.value !== undefined &&
              selectedFilter?.value !== '' &&
              'bg-slate-800 text-slate-200 hover:bg-slate-900 hover:text-slate-100',
          )}
        >
          <Icon name={tableColumn?.icon} size={14} className="mr-1" />
          <span className="capitalize">{tableColumn?.name}</span>
          {<span>: {getSelectedFilterValue()}</span>}
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-36 w-auto" align="start">
        <DropdownMenuLabel className="flex items-center justify-between">
          {getLabel()}
          <TooltipProvider>
            <Tooltip delayDuration={150}>
              <TooltipTrigger asChild>
                <Button
                  className="w-7 h-7 cursor-pointer"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFilter(selectedFilter?.key as keyof Task)}
                >
                  <Trash />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove filter</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="p-2">
          {tableColumn?.type === 'text' && (
            <TextFilter
              value={selectedFilter?.value as string}
              updateFilter={value => updateFilter({ key: field, value })}
            />
          )}

          {tableColumn?.type === 'number' && (
            <NumberFilter
              value={selectedFilter?.value as number}
              updateFilter={value => updateFilter({ key: field, value })}
            />
          )}

          {tableColumn?.type === 'status' && (
            <StatusFilter
              value={selectedFilter?.value as string}
              updateFilter={value => updateFilter({ key: field, value })}
            />
          )}

          {tableColumn?.type === 'priority' && (
            <PriorityFilter
              value={selectedFilter?.value as string}
              updateFilter={value => updateFilter({ key: field, value })}
            />
          )}

          {tableColumn?.type === 'boolean' && (
            <BooleanFilter
              value={selectedFilter?.value as boolean}
              updateFilter={value => {
                return updateFilter({ key: field, value: value === 'true' });
              }}
            />
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

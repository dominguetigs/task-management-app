'use client';

import { createElement } from 'react';

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { TABLE_COLUMN_ICONS, TASK_PRIORITY, TASK_STATUS } from '@/constants';
import { useTable } from '@/store';
import { Filter, Task, TaskPriority, TaskStatus } from '@/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface FilterSelectionProps {
  filter: keyof Task;
  options?: TaskPriority[] | TaskStatus[] | null;
  label: string;
  renderOption?: (value: string) => React.ReactNode;
}

export function FilterSelection({ filter, options, label, renderOption }: FilterSelectionProps) {
  const filters = useTable(state => state.filters);
  const updateFilter = useTable(state => state.updateFilter);
  const removeFilter = useTable(state => state.removeFilter);

  function getFilter(filter: keyof Task): Filter | undefined {
    return filters.find(f => f.key === filter);
  }

  function getSelectedFilter(): string | undefined {
    const filterValue = getFilter(filter)?.value;

    if (filter === 'status') {
      return TASK_STATUS[filterValue as TaskStatus];
    }

    if (filter === 'priority') {
      return TASK_PRIORITY[filterValue as TaskPriority];
    }

    return filterValue;
  }

  function handleRemoveFilter(): void {
    const selectedFilter = getFilter(filter) as Filter;
    removeFilter(selectedFilter);
  }

  return (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <Badge
          className={cn(
            'bg-slate-300 text-slate-700 cursor-pointer hover:bg-slate-400 hover:text-slate-800',
            getFilter(filter)?.value &&
              'bg-slate-800 text-slate-200 hover:bg-slate-900 hover:text-slate-100',
          )}
        >
          {TABLE_COLUMN_ICONS[filter] &&
            createElement(TABLE_COLUMN_ICONS[filter], { className: 'w-3 h-3 mr-1' })}
          <span className="capitalize">{filter}</span>

          {getFilter(filter)?.value && <span>: {getSelectedFilter()}</span>}
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel className="flex items-center justify-between">
          {label}
          <TooltipProvider>
            <Tooltip delayDuration={150}>
              <TooltipTrigger asChild>
                <Button
                  className="w-7 h-7 cursor-pointer"
                  variant="destructive"
                  size="icon"
                  onClick={handleRemoveFilter}
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
          {!options ? (
            <input
              type="text"
              className="w-full px-2 py-1 border rounded"
              placeholder="Type a value..."
              value={getFilter(filter)?.value || ''}
              onChange={e => {
                const filterData = { key: filter, value: e.target.value };
                updateFilter(filterData);
              }}
              autoFocus
            />
          ) : (
            <RadioGroup
              value={getFilter(filter)?.value}
              onValueChange={value => {
                const filterData = { key: filter, value };
                updateFilter(filterData);
              }}
            >
              {options?.map(key => (
                <div key={key} className="flex items-center gap-2">
                  <RadioGroupItem value={key} id={key} />
                  <label htmlFor={key}>{renderOption ? renderOption(key) : key}</label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

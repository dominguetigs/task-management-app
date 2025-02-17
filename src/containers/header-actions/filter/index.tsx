'use client';

import React, { useEffect, useState } from 'react';

import { Plus, Trash } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Priority } from '@/components/priority';
import { Status } from '@/components/status';

import { TABLE_COLUMN_ICONS, TASK_PRIORITY, TASK_STATUS } from '@/constants';
import { useTable } from '@/store';
import { Task, TaskPriority, TaskStatus } from '@/types';

import { FilterSelection } from './filter-selection';
import { FilterActionButton } from './filter-action-button';

const FILTER_LABELS: Record<keyof Omit<Task, 'id'>, string> = {
  priority: 'Priority is:',
  status: 'Status is:',
  title: 'Title contains:',
};

const FILTER_OPTIONS: Record<keyof Omit<Task, 'id'>, TaskPriority[] | TaskStatus[] | null> = {
  priority: Object.keys(TASK_PRIORITY) as TaskPriority[],
  status: Object.keys(TASK_STATUS) as TaskStatus[],
  title: null,
};

export function Filter() {
  const filters = useTable(state => state.filters);
  const addFilter = useTable(state => state.addFilter);
  const resetFilters = useTable(state => state.resetFilters);

  const [selectedFilters, setSelectedFilters] = useState<Array<keyof Omit<Task, 'id'>>>([]);
  const filterOptions: Array<keyof Omit<Task, 'id'>> = ['title', 'status', 'priority'];

  function handleFilterOptionVisibility(filter: keyof Omit<Task, 'id'>): boolean {
    return selectedFilters.includes(filter);
  }

  function handleSelectFilter(filter: keyof Omit<Task, 'id'>): void {
    setSelectedFilters([...selectedFilters, filter]);
    addFilter({ key: filter, value: '' });
  }

  useEffect(() => {
    setSelectedFilters(filters.map(filter => filter.key) as Array<keyof Omit<Task, 'id'>>);
  }, [filters]);

  return (
    <div className="flex flex-wrap items-center gap-2 my-2">
      {selectedFilters.map(filter => (
        <FilterSelection
          key={filter}
          filter={filter}
          label={FILTER_LABELS[filter]}
          options={FILTER_OPTIONS[filter]}
          renderOption={value =>
            filter === 'status' ? (
              <Status type={value as TaskStatus} />
            ) : filter === 'priority' ? (
              <Priority type={value as TaskPriority} />
            ) : (
              value
            )
          }
        />
      ))}

      {selectedFilters.length === 3 && (
        <FilterActionButton
          icon={Trash}
          label="Clear filters"
          onClick={() => {
            setSelectedFilters([]);
            resetFilters();
          }}
        />
      )}

      <DropdownMenu>
        {filterOptions.length !== selectedFilters.length && (
          <DropdownMenuTrigger asChild>
            <div>
              <FilterActionButton icon={Plus} label="Add filter" />
            </div>
          </DropdownMenuTrigger>
        )}

        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>Filters</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {filterOptions.map(filter => (
              <DropdownMenuItem
                className={handleFilterOptionVisibility(filter) ? 'hidden' : ''}
                key={filter}
                onClick={() => handleSelectFilter(filter)}
              >
                {TABLE_COLUMN_ICONS[filter] &&
                  React.createElement(TABLE_COLUMN_ICONS[filter], { className: 'w-3 h-3' })}
                {filter}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

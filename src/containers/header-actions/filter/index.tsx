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
import { Icon } from '@/components/icon';

import { useTable } from '@/stores';
import { Task } from '@/types';

import { FilterActionButton } from './filter-action-button';
import { FilterSelection } from './filter-selection';

export function Filter() {
  const {
    columns: tableColumns,
    filters,
    addFilter,
    updateFilter,
    removeFilter,
    resetFilters,
    selectedRows,
    clearSelection,
  } = useTable();

  const [selectedFields, setSelectedFields] = useState<Array<keyof Omit<Task, 'id'>>>([]);
  const [defaultOpen, setDefaultOpen] = useState<Record<string, boolean>>({});
  const filterOptions = tableColumns.filter(column => column.id !== 'id');
  const hasSomeSelectedRows = selectedRows?.size > 0;

  function isFilterOptionVisible(field: keyof Omit<Task, 'id'>): boolean {
    return selectedFields.includes(field);
  }

  function handleSelectField(field: keyof Omit<Task, 'id'>): void {
    setSelectedFields([...selectedFields, field]);
    addFilter({ key: field, value: '' });
    setDefaultOpen({ [field]: true });
  }

  useEffect(() => {
    setSelectedFields(filters.map(filter => filter.key as keyof Omit<Task, 'id'>));
  }, [filters]);

  return (
    <div className="flex flex-wrap items-center gap-2 my-2">
      {selectedFields.map(field => (
        <FilterSelection
          defaultOpen={!!defaultOpen?.[field]}
          key={field}
          field={field}
          filters={filters}
          tableColumns={tableColumns}
          updateFilter={updateFilter}
          removeFilter={removeFilter}
        />
      ))}

      {selectedFields.length === tableColumns.length - 1 && (
        <FilterActionButton
          icon={Trash}
          label="Clear filters"
          onClick={() => {
            setSelectedFields([]);
            resetFilters();
          }}
        />
      )}

      <DropdownMenu>
        {filterOptions.length !== selectedFields.length && (
          <DropdownMenuTrigger
            asChild
            onPointerDown={() => {
              if (hasSomeSelectedRows) {
                clearSelection();
              }
            }}
          >
            <div>
              <FilterActionButton icon={Plus} label="Add filter" />
            </div>
          </DropdownMenuTrigger>
        )}

        <DropdownMenuContent className="w-auto" align="start">
          <DropdownMenuLabel>Filters</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {filterOptions.map(({ id, name, icon }) => (
              <DropdownMenuItem
                className={isFilterOptionVisible(id) ? 'hidden' : ''}
                key={id}
                onClick={() => handleSelectField(id)}
              >
                <div className="flex items-center gap-2">
                  <Icon name={icon} size={20} />
                  {name}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
